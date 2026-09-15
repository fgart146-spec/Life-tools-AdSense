import type { Metadata } from 'next';
import Link from 'next/link';
import { guides, planFacts, plans, unconfirmed } from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactButton } from '@/components/Cta';
import { Container, Notice } from '@/components/ui';

const guide = guides.find((item) => item.slug === 'lifetime-vs-ai');
if (!guide) throw new Error('guide meta missing: lifetime-vs-ai');
const meta = guide;

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.summary,
  path: '/guide/lifetime-vs-ai/',
  type: 'article',
});

const misconceptions = [
  {
    wrong: '영구 이용권은 기본 기능만, AI 이용권은 모든 기능을 준다',
    right: planFacts.sameTierSameFeatures,
  },
  {
    wrong: '영구 이용권은 자동작업이 안 된다',
    right: planFacts.lifetimeIsAutomated,
  },
  {
    wrong: '영구 이용권은 AI를 무제한으로 쓸 수 있다',
    right: '영구 이용권은 AI를 쓰지 않습니다. AI 문구 생성은 AI 이용권의 기능입니다.',
  },
  {
    wrong: 'AI 한도가 없으니 무제한으로 작업된다',
    right: planFacts.lifetimeNoAiLimit,
  },
];

export default function LifetimeVsAiPage() {
  return (
    <Container size="narrow" className="py-6 sm:py-8">
      <Breadcrumbs
        items={[
          { name: '이용 가이드', path: '/guide/' },
          { name: meta.title, path: '/guide/lifetime-vs-ai/' },
        ]}
      />
      <article className="mt-4">
        <header>
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{meta.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{meta.summary}</p>
          <p className="mt-2 text-sm text-ink-500">
            <time dateTime={meta.updatedAt}>{meta.updatedAt}</time> 업데이트
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">먼저, 같은 점</h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {planFacts.threeTiers} {planFacts.sameTierSameFeatures} 그러니 &ldquo;어느 쪽이 기능이
            더 많은가&rdquo;로 고르는 게 아니라, <strong>댓글·인사에 쓰는 문구를 어떻게 만들고
            싶은가</strong>와 <strong>결제 방식</strong>으로 고르면 됩니다.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">다른 점 세 가지</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(['lifetime', 'ai'] as const).map((id) => (
              <div key={id} className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5">
                <h3 className="text-xl font-bold text-ink-900">{plans[id].name}</h3>
                <dl className="mt-3 grid gap-2 text-[15px]">
                  <div>
                    <dt className="font-semibold text-ink-700">결제</dt>
                    <dd className="text-ink-600">{plans[id].billingLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-700">문구 생성</dt>
                    <dd className="text-ink-600">{plans[id].phraseMethod}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-700">AI 사용량</dt>
                    <dd className="text-ink-600">{plans[id].aiUsage}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">이렇게 고르세요</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(['lifetime', 'ai'] as const).map((id) => (
              <div key={id}>
                <h3 className="text-lg font-bold text-brand-700">{plans[id].name}이 맞는 분</h3>
                <ul className="mt-2 grid gap-1.5 text-base leading-relaxed text-ink-700">
                  {plans[id].fitFor.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-base leading-relaxed text-ink-700">
            등급(STANDARD·DELUXE·PREMIUM)은 이용 방식과 별개로 고릅니다. 등급별 제공 범위와 AI 일일
            한도는 문의 시 안내드립니다.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">흔한 오해</h2>
          <dl className="mt-4 grid gap-3">
            {misconceptions.map((item) => (
              <div key={item.wrong} className="rounded-xl border border-ink-200 bg-white p-5">
                <dt className="text-base font-semibold text-ink-500 line-through decoration-ink-400">
                  {item.wrong}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-ink-800">{item.right}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">확인 후 안내드리는 것</h2>
          <div className="mt-4">
            <Notice>
              {unconfirmed.prices} {unconfirmed.aiLimits} {unconfirmed.subscriptionPeriod}{' '}
              {unconfirmed.updates}
            </Notice>
          </div>
        </section>

        <footer className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-8">
          <ContactButton placement="guide_lifetime_vs_ai" label="이용권 상담 문의" variant="primary" />
          <Link href="/pricing/" className="prose-link font-semibold">
            이용권 안내 페이지로 →
          </Link>
        </footer>
      </article>
    </Container>
  );
}
