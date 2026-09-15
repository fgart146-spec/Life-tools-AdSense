import type { Metadata } from 'next';
import Link from 'next/link';
import { publishedGuides } from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: '이용 가이드',
  description:
    '이웃부스터를 처음 이용하는 방법과 영구 이용권·AI 이용권 선택 기준 등, 구매 전에 읽어 두면 좋은 안내를 모았습니다.',
  path: '/guide/',
});

export default function GuideIndexPage() {
  const guides = publishedGuides();
  return (
    <>
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ name: '이용 가이드', path: '/guide/' }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">이용 가이드</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            구매 전에 궁금한 것을 순서대로 정리했습니다. 실제 이용 화면과 세부 절차는 체험 문의 시
            안내드립니다.
          </p>
        </header>
      </Container>

      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guide/${guide.slug}/`}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-card)] transition-colors hover:border-brand-300"
              >
                <h2 className="text-xl font-bold leading-snug text-ink-900">{guide.title}</h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-600">{guide.summary}</p>
                <p className="mt-4 text-sm text-ink-500">
                  <time dateTime={guide.updatedAt}>{guide.updatedAt}</time> 업데이트
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
