import { NextResponse } from 'next/server';
import { createSupabaseReadOnlyClient } from '@/lib/supabase/read-only';
import {
  fetchSearchAnalytics,
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

  // 2) 규칙 기반 제안 생성 → (설정된 경우) AI가 설명만 보강
  const drafts = buildSuggestions(rows).slice(0, 20);
  const enriched = await enrichSuggestions(drafts);

  // 3) 이미 대기 중인 같은 제안은 다시 만들지 않는다.
  const { data: pending } = await supabase
    .from('ai_suggestions')
    .select('kind, source_query')
    .eq('status', 'pending');

  const existing = new Set(
    (pending ?? []).map((row) => `${row.kind}:${row.source_query ?? ''}`),
  );

  const newSuggestions = enriched
    .filter((draft) => !existing.has(`${draft.kind}:${draft.sourceQuery}`))
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
      suggestions: newSuggestions.length,
      aiEnabled: isAiConfigured(),
    },
  });

  return NextResponse.json({
    ok: true,
    period: { start: periodStart, end: periodEnd },
    rows: rows.length,
    newSuggestions: newSuggestions.length,
    aiEnabled: isAiConfigured(),
  });
}
