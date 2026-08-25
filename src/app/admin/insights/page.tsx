import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { isSearchConsoleConfigured } from '@/lib/automation/search-console';
import { isAiConfigured } from '@/lib/automation/ai';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { SuggestionActions } from '@/components/admin/SuggestionActions';
import type { AiSuggestionRow, SearchInsightRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const KIND_LABEL: Record<AiSuggestionRow['kind'], string> = {
  new_tool: '신규 도구',
  improve_tool: '도구 보강',
  new_guide: '신규 가이드',
  seo_fix: 'SEO 개선',
};

export default async function AdminInsightsPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();

  const { data: suggestions } = (await supabase
    ?.from('ai_suggestions')
    .select('id, kind, title, rationale, payload, status, source_query, created_at, reviewed_at')
    .order('created_at', { ascending: false })
    .limit(50)) ?? { data: null };

  const { data: insights } = (await supabase
    ?.from('search_insights')
    .select('id, query, page, impressions, clicks, ctr, position, period_start, period_end, created_at')
    .order('impressions', { ascending: false })
    .limit(30)) ?? { data: null };

  const suggestionRows = (suggestions ?? []) as AiSuggestionRow[];
  const insightRows = (insights ?? []) as SearchInsightRow[];
  const pending = suggestionRows.filter((row) => row.status === 'pending');

  return (
    <AdminShell email={admin.profile.email} active="/admin/insights">
      <div className="grid gap-4">
        <AdminCard title="연동 상태" description="주 1회 cron으로 수집합니다.">
          <ul className="grid gap-1 text-sm text-ink-600">
            <li>
              Search Console:{' '}
              {isSearchConsoleConfigured() ? '연동됨' : '미설정 (GSC_SERVICE_ACCOUNT_JSON, GSC_SITE_URL)'}
            </li>
            <li>AI 설명 보강: {isAiConfigured() ? '사용 중' : '미설정 (ANTHROPIC_API_KEY)'}</li>
            <li>수집 경로: /api/cron/search-insights (CRON_SECRET 필요)</li>
            <li className="text-ink-500">
              AI 제안은 자동으로 공개되지 않습니다. 승인 후 코드 작업으로 반영합니다.
            </li>
          </ul>
        </AdminCard>

        <AdminCard
          title={`검토 대기 제안 (${pending.length}건)`}
          description="승인하면 작업 대상으로 표시되고, 거절하면 목록에서 제외됩니다."
        >
          {pending.length === 0 ? (
            <p className="text-sm text-ink-500">대기 중인 제안이 없습니다.</p>
          ) : (
            <ul className="grid gap-4">
              {pending.map((row) => (
                <li key={row.id} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
                      {KIND_LABEL[row.kind]}
                    </span>
                    {row.source_query && (
                      <span className="text-xs text-ink-500">검색어: {row.source_query}</span>
                    )}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-ink-900">{row.title}</h3>
                  {row.rationale && (
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{row.rationale}</p>
                  )}
                  <SuggestionActions id={row.id} />
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard title="검색 성과 상위 30" description="노출 기준">
          {insightRows.length === 0 ? (
            <p className="text-sm text-ink-500">아직 수집된 데이터가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-3 font-medium">검색어</th>
                    <th className="py-2 pr-3 font-medium">노출</th>
                    <th className="py-2 pr-3 font-medium">클릭</th>
                    <th className="py-2 pr-3 font-medium">CTR</th>
                    <th className="py-2 pr-3 font-medium">평균 순위</th>
                  </tr>
                </thead>
                <tbody>
                  {insightRows.map((row) => (
                    <tr key={row.id} className="border-b border-ink-100">
                      <td className="py-2 pr-3">{row.query}</td>
                      <td className="tabular py-2 pr-3">{row.impressions}</td>
                      <td className="tabular py-2 pr-3">{row.clicks}</td>
                      <td className="tabular py-2 pr-3">
                        {row.ctr === null ? '-' : `${(row.ctr * 100).toFixed(1)}%`}
                      </td>
                      <td className="tabular py-2 pr-3">
                        {row.position === null ? '-' : row.position.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </div>
    </AdminShell>
  );
}
