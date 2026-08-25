import { NextResponse } from 'next/server';
import { createSupabaseReadOnlyClient } from '@/lib/supabase/read-only';
import {
  fetchSearchAnalytics,
  fetchSearchAnalyticsDaily,
  isSearchConsoleConfigured,
} from '@/lib/automation/search-console';
import { buildSuggestions } from '@/lib/automation/analyze';
import { enrichSuggestions, isAiConfigured } from '@/lib/automation/ai';

/**
 * 주 1회 실행되는 검색 데이터 수집 · 제안 생성 배치.
 *
 * - Vercel Cron이 호출하며, CRON_SECRET으로 보호한다.
 * - 결과는 DB에 'pending' 상태로만 저장된다. 공개 사이트는 바뀌지 않는다.
 * - 설정이 없으면 아무것도 하지 않고 이유를 돌려준다.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization') ?? '';
  return header === `Bearer ${secret}`;
}

function isoDaysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, reason: 'unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseReadOnlyClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: 'supabase_not_configured' });
  }
  if (!isSearchConsoleConfigured()) {
    return NextResponse.json({ ok: false, reason: 'search_console_not_configured' });
  }

  // Search Console 데이터는 2~3일 지연되므로 3일 전까지를 기준으로 조회한다.
  const periodStart = isoDaysAgo(31);
  const periodEnd = isoDaysAgo(3);

  const rows = await fetchSearchAnalytics({
    startDate: periodStart,
    endDate: periodEnd,
    rowLimit: 500,
  });

  if (!rows) {
    return NextResponse.json({ ok: false, reason: 'search_console_fetch_failed' });
  }

  // 1) 원본 지표 저장 (같은 기간·검색어는 갱신)
  const insightRows = rows.map((row) => ({
    query: row.query,
    page: row.page,
    impressions: row.impressions,
    clicks: row.clicks,
    ctr: row.ctr,
    position: row.position,
    period_start: periodStart,
    period_end: periodEnd,
  }));

  const { error: insertError } = await supabase
    .from('search_insights')
    .upsert(insightRows, { onConflict: 'query,page,period_start,period_end' });

  if (insertError) {
    return NextResponse.json({ ok: false, reason: 'insight_save_failed' }, { status: 500 });
  }

  // 1-2) 일별 지표 저장 (관리자 대시보드 그래프용)
  //      같은 구간을 매번 다시 upsert해 Search Console의 지연 반영을 보정한다.
  const dailyRows = await fetchSearchAnalyticsDaily({
    startDate: periodStart,
    endDate: periodEnd,
  });

  let dailySaved = 0;
  let dailyFailure: string | null = null;
  if (dailyRows && dailyRows.length > 0) {
    const { error: dailyError } = await supabase.from('search_daily').upsert(
      dailyRows.map((row) => ({
        date: row.date,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'date' },
    );
    // 저장 실패해도 배치는 계속 진행하되, 실패 사실은 응답과 로그에 남긴다.
    // (0002 마이그레이션 미적용처럼 흔한 실수가 조용히 묻히면 대시보드가 영원히 빈 상태가 된다.)
    if (dailyError) dailyFailure = dailyError.message;
    else dailySaved = dailyRows.length;
  }

  // 오래된 기간 데이터는 정리한다. 없으면 매주 최대 500행씩 무한히 쌓인다.
  await supabase.from('search_insights').delete().lt('period_end', isoDaysAgo(180));

  // 2) 규칙 기반 제안 생성
  const drafts = buildSuggestions(rows).slice(0, 20);

  // 3) 이미 대기 중인 같은 제안은 먼저 걸러낸다.
  //    AI 보강보다 앞에 두어야 한다. 뒤에 두면 어차피 버릴 제안에도 API 요금이 나간다
  //    (관리자가 검토를 미루는 주마다 같은 제안이 다시 만들어져 매주 과금된다).
  const { data: pending } = await supabase
    .from('ai_suggestions')
    .select('kind, source_query')
    .eq('status', 'pending');

  const existing = new Set(
    (pending ?? []).map((row) => `${row.kind}:${row.source_query ?? ''}`),
  );

  const fresh = drafts.filter((draft) => !existing.has(`${draft.kind}:${draft.sourceQuery}`));

  // 4) 살아남은 제안만 AI가 설명을 보강한다.
  const enriched = fresh.length > 0 ? await enrichSuggestions(fresh) : [];

  const newSuggestions = enriched
    .map((draft) => ({
      kind: draft.kind,
      title: draft.title,
      rationale: draft.rationale,
      payload: draft.payload,
      status: 'pending' as const,
      source_query: draft.sourceQuery,
    }));

  if (newSuggestions.length > 0) {
    const { error } = await supabase.from('ai_suggestions').insert(newSuggestions);
    if (error) {
      return NextResponse.json({ ok: false, reason: 'suggestion_save_failed' }, { status: 500 });
    }
  }

  await supabase.from('update_log').insert({
    entity: 'search_insights',
    entity_id: `${periodStart}~${periodEnd}`,
    action: 'sync',
    detail: {
      rows: rows.length,
      dailyRows: dailySaved,
      dailyError: dailyFailure,
      suggestions: newSuggestions.length,
      aiEnabled: isAiConfigured(),
    },
  });

  return NextResponse.json({
    ok: true,
    period: { start: periodStart, end: periodEnd },
    rows: rows.length,
    dailyRows: dailySaved,
    // 일별 저장이 실패하면 대시보드 그래프가 채워지지 않는다. 응답에서 바로 확인할 수 있게 한다.
    ...(dailyFailure ? { dailyError: dailyFailure } : {}),
    newSuggestions: newSuggestions.length,
    aiEnabled: isAiConfigured(),
  });
}
