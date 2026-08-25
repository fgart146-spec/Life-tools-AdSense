import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { locales } from '@/lib/i18n/config';
import { orderedCategories } from '@/lib/tools/categories';
import { toolDefinitions } from '@/lib/tools/definitions';
import { guideIndex } from '@/lib/guides';
import { getEffectiveBasis } from '@/lib/admin/basis';
import { getTrafficData } from '@/lib/admin/traffic';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { RevalidateButton } from '@/components/admin/RevalidateButton';
import { TrafficSection } from '@/components/admin/TrafficSection';
import type { UpdateLogRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();
  const { data: logs } = (await supabase
    ?.from('update_log')
    .select('id, entity, entity_id, action, created_at')
    .order('created_at', { ascending: false })
    .limit(10)) ?? { data: null };

  const basis = await getEffectiveBasis();
  const traffic = await getTrafficData();

  const published = toolDefinitions.filter((tool) => tool.status === 'published');
  const byCategory = orderedCategories.map((category) => ({
    category,
    count: published.filter((tool) => tool.category === category.id).length,
  }));
  const byLocale = locales.map((locale) => ({
    locale,
    tools: published.filter((tool) => tool.locales.includes(locale)).length,
    guides: guideIndex.filter(
      (guide) => guide.status === 'published' && guide.locales.includes(locale),
    ).length,
  }));

  const recentTools = [...published]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5);

  return (
    <AdminShell email={admin.profile.email} active="/admin">
      <div className="mb-6">
        <TrafficSection data={traffic} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard title="도구 현황" description="코드 레지스트리 기준">
          <p className="text-3xl font-bold text-ink-900">{published.length}개 공개</p>
          <ul className="mt-3 grid gap-1 text-sm text-ink-600">
            {byCategory.map((item) => (
              <li key={item.category.id} className="flex justify-between">
                <span>
                  {item.category.emoji} {item.category.label.ko}
                </span>
                <span className="tabular">{item.count}</span>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="언어별 콘텐츠" description="도구 / 가이드">
          <ul className="grid gap-1 text-sm text-ink-600">
            {byLocale.map((item) => (
              <li key={item.locale} className="flex justify-between">
                <span className="uppercase">{item.locale}</span>
                <span className="tabular">
                  도구 {item.tools} · 가이드 {item.guides}
                </span>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard
          title="기준값 상태"
          description={basis.fromDatabase ? 'DB 값이 적용되고 있습니다.' : '코드 기본값 사용 중'}
        >
          <ul className="grid gap-1 text-sm text-ink-600">
            <li className="flex justify-between">
              <span>전기요금 기준일</span>
              <span className="tabular">{basis.electricity.basisDate}</span>
            </li>
            <li className="flex justify-between">
              <span>급여 요율 기준일</span>
              <span className="tabular">{basis.payroll.basisDate}</span>
            </li>
          </ul>
          <Link
            href="/admin/basis"
            className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline"
          >
            기준값 관리 →
          </Link>
        </AdminCard>

        <AdminCard title="최근 업데이트된 도구" description="updatedAt 기준">
          <ul className="grid gap-1 text-sm text-ink-600">
            {recentTools.map((tool) => (
              <li key={tool.id} className="flex justify-between">
                <span>{tool.id}</span>
                <span className="tabular">{tool.updatedAt}</span>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="변경 이력" description="최근 10건">
          {logs && logs.length > 0 ? (
            <ul className="grid gap-1 text-sm text-ink-600">
              {(logs as Pick<UpdateLogRow, 'id' | 'entity' | 'entity_id' | 'action' | 'created_at'>[]).map(
                (log) => (
                  <li key={log.id} className="flex justify-between gap-3">
                    <span>
                      {log.entity}
                      {log.entity_id ? ` · ${log.entity_id}` : ''} — {log.action}
                    </span>
                    <span className="tabular shrink-0 text-ink-400">
                      {log.created_at.slice(0, 10)}
                    </span>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="text-sm text-ink-500">아직 기록이 없습니다.</p>
          )}
        </AdminCard>

        <AdminCard
          title="공개 페이지 재생성"
          description="기준값·시즌 구성을 바꾼 뒤 실행하면 정적 페이지에 반영됩니다."
        >
          <RevalidateButton />
        </AdminCard>
      </div>
    </AdminShell>
  );
}
