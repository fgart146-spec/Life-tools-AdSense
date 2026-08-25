import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { getAdminUser } from '@/lib/supabase/server';
import { locales } from '@/lib/i18n/config';
import { lifeCategories, lifeArticlePath } from '@/lib/life/categories';
import { lifeIndex } from '@/lib/life';
import { getLifeContent } from '@/lib/life/registry';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

/**
 * 생활백과 관리.
 *
 * 본문은 저장소의 TS 모듈이므로 여기서 편집하지 않는다(트래픽이 늘어도 DB 비용이 늘지 않는 구조를 유지).
 * 이 화면은 무엇이 공개돼 있고 무엇이 비어 있는지 한눈에 확인하는 용도다.
 */
export default async function AdminLifePage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const rows = lifeIndex.map((meta) => {
    const category = lifeCategories[meta.category];
    const ko = getLifeContent(meta.slug, 'ko');
    return {
      meta,
      category,
      title: ko?.title ?? meta.slug,
      primaryKeyword: ko?.primaryKeyword ?? '-',
      seoTitle: ko?.seoTitle ?? '-',
      seoDescription: ko?.seoDescription ?? '-',
      path: lifeArticlePath(category.slug, meta.slug),
    };
  });

  const published = rows.filter((row) => row.meta.status === 'published');
  const draft = rows.filter((row) => row.meta.status === 'draft');

  const byCategory = Object.values(lifeCategories)
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      category,
      count: published.filter((row) => row.meta.category === category.id).length,
    }));

  const byLocale = locales.map((locale) => ({
    locale,
    count: published.filter((row) => row.meta.locales.includes(locale)).length,
  }));

  return (
    <AdminShell email={admin.profile.email} active="/admin/life">
      <AdminCard
        title="생활백과 현황"
        description="본문은 저장소의 TS 모듈로 관리합니다(src/life/&lt;slug&gt;/content.&lt;locale&gt;.ts). 여기서는 공개 상태와 SEO 설정을 확인합니다."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-ink-200 bg-white p-4">
            <p className="text-sm text-ink-500">공개</p>
            <p className="tabular mt-1 text-2xl font-bold text-ink-900">{published.length}</p>
          </div>
          <div className="rounded-lg border border-ink-200 bg-white p-4">
            <p className="text-sm text-ink-500">초안(draft)</p>
            <p className="tabular mt-1 text-2xl font-bold text-ink-900">{draft.length}</p>
          </div>
          <div className="rounded-lg border border-ink-200 bg-white p-4">
            <p className="text-sm text-ink-500">로케일별 공개</p>
            <p className="tabular mt-1 text-sm font-medium text-ink-700">
              {byLocale.map((item) => `${item.locale.toUpperCase()} ${item.count}`).join(' · ')}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {byCategory.map((item) => (
            <span
              key={item.category.id}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                item.count === 0
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-ink-200 bg-white text-ink-700'
              }`}
            >
              <span aria-hidden="true" className="mr-1">
                {item.category.emoji}
              </span>
              {item.category.label.ko} {item.count}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          문서가 0개인 카테고리는 라우트와 사이트맵에서 자동으로 제외됩니다(빈 페이지 공개 방지).
        </p>
      </AdminCard>

      <div className="mt-4">
        <AdminCard title="문서 목록" description="제목을 누르면 실제 공개 페이지로 이동합니다.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-ink-500">
                  <th className="py-2 pr-3 font-medium">문서</th>
                  <th className="py-2 pr-3 font-medium">카테고리</th>
                  <th className="py-2 pr-3 font-medium">대표 키워드</th>
                  <th className="py-2 pr-3 font-medium">언어</th>
                  <th className="py-2 pr-3 font-medium">상태</th>
                  <th className="py-2 pr-3 font-medium">수정일</th>
                  <th className="py-2 pr-3 font-medium">관련</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.meta.slug} className="border-b border-ink-100 align-top">
                    <td className="py-2 pr-3">
                      {row.meta.status === 'published' ? (
                        <Link
                          href={`/ko${row.path}`}
                          className="font-medium text-brand-700 hover:underline"
                        >
                          {row.title}
                        </Link>
                      ) : (
                        <span className="font-medium text-ink-700">{row.title}</span>
                      )}
                      <span className="mt-0.5 block text-xs text-ink-500">{row.meta.slug}</span>
                    </td>
                    <td className="py-2 pr-3 text-ink-600">{row.category.label.ko}</td>
                    <td className="py-2 pr-3 text-ink-600">{row.primaryKeyword}</td>
                    <td className="py-2 pr-3 uppercase text-ink-600">
                      {row.meta.locales.join(', ')}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={
                          row.meta.status === 'published' ? 'text-brand-700' : 'text-amber-700'
                        }
                      >
                        {row.meta.status}
                      </span>
                    </td>
                    <td className="tabular py-2 pr-3 text-ink-600">{row.meta.updatedAt}</td>
                    <td className="py-2 pr-3 text-xs text-ink-500">
                      문서 {row.meta.relatedArticles.length} · 도구{' '}
                      {row.meta.relatedTools.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>

      <div className="mt-4">
        <AdminCard
          title="SEO 설정"
          description="title과 description이 문서마다 고유한지 확인합니다."
        >
          <ul className="grid gap-3">
            {published.map((row) => (
              <li key={row.meta.slug} className="rounded-lg border border-ink-200 bg-white p-3">
                <p className="text-sm font-semibold text-ink-900">{row.seoTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{row.seoDescription}</p>
                <p className="mt-1 text-xs text-ink-500">
                  /ko{row.path} · title {row.seoTitle.length}자 · description{' '}
                  {row.seoDescription.length}자
                </p>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <div className="mt-4">
        <AdminCard
          title="새 문서 추가 방법"
          description="자동 공개는 하지 않습니다. 코드 작업 → 검수 → 배포 순서를 지킵니다."
        >
          <ol className="grid gap-2 text-sm leading-relaxed text-ink-700">
            <li>
              1. <code className="rounded bg-ink-100 px-1.5 py-0.5">src/life/&lt;slug&gt;/</code>{' '}
              폴더를 만들고 meta.ts / content.ko.ts / index.ts 를 작성합니다.
            </li>
            <li>
              2. <code className="rounded bg-ink-100 px-1.5 py-0.5">src/life/metas.ts</code> 와{' '}
              <code className="rounded bg-ink-100 px-1.5 py-0.5">src/life/index.ts</code> 에
              등록합니다.
            </li>
            <li>
              3. <code className="rounded bg-ink-100 px-1.5 py-0.5">npm run verify</code> 로 라우트
              · 링크 · 메타데이터를 검사합니다.
            </li>
            <li>
              4. 검수 후 배포하면 라우트 · 사이트맵 · 내부링크에 자동 반영됩니다.
            </li>
          </ol>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
