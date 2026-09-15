import type { Metadata } from 'next';
import Link from 'next/link';
import {
  aiLimitLabel,
  dataAsOf,
  planFacts,
  planOrder,
  plans,
  priceLabel,
  unconfirmed,
  type Plan,
} from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { ViewPing } from '@/components/Analytics';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PurchaseButton, TrialButton } from '@/components/Cta';
import { PlanSwitch } from '@/components/PlanSwitch';
import { Container, Notice, Section } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: '이용권 안내 — 영구 이용권 · AI 이용권',
  description:
    '영구 이용권(한 번 구매)과 AI 이용권(구독형)의 차이, STANDARD·DELUXE·PREMIUM 3개 등급, 요금 문의 방법을 안내합니다. 같은 등급이면 기능 범위는 동일합니다.',
  path: '/pricing/',
});

function TierCards({ plan }: { plan: Plan }) {
  return (
    <div>
      <p className="text-base leading-relaxed text-ink-700">{plan.summary}</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {plan.tiers.map((tier) => (
          <li
            key={tier.id}
            className="flex flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-card)]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{tier.name}</p>
            <p className="mt-2 text-2xl font-bold text-ink-900">{priceLabel(tier.price)}</p>
            <p className="mt-1 text-sm text-ink-500">{plan.billingLabel}</p>
            <dl className="mt-5 grid gap-3 border-t border-ink-200 pt-5 text-sm">
              <div>
                <dt className="font-semibold text-ink-700">문구 생성</dt>
                <dd className="mt-0.5 text-ink-600">{plan.phraseMethod}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-700">AI 사용량</dt>
                <dd className="mt-0.5 text-ink-600">{aiLimitLabel(plan, tier)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-700">관리 기능 범위</dt>
                <dd className="mt-0.5 text-ink-600">
                  {tier.name} 등급 기준. 영구·AI 이용권 어느 쪽이든 같은 등급이면 동일합니다.
                </dd>
              </div>
            </dl>
            <div className="mt-6 grid gap-2">
              <PurchaseButton placement={`pricing_${plan.id}_${tier.id}`} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-ink-500">
        등급별 제공 범위와 AI 일일 한도의 구체적인 수치는 문의 시 안내드립니다. 확인되지 않은 값을
        추정해 적지 않습니다.
      </p>
    </div>
  );
}

const comparisonRows: { label: string; lifetime: string; ai: string }[] = [
  { label: '결제 방식', lifetime: '한 번 구매, 기간 제한 없음', ai: '구독형' },
  { label: '문구 생성', lifetime: plans.lifetime.phraseMethod, ai: plans.ai.phraseMethod },
  { label: 'AI 사용량 한도', lifetime: '해당 없음 (AI 미사용)', ai: '등급별 일일 한도' },
  { label: '관리 기능 범위', lifetime: '등급 기준 동일', ai: '등급 기준 동일' },
  { label: '등급', lifetime: 'STANDARD · DELUXE · PREMIUM', ai: 'STANDARD · DELUXE · PREMIUM' },
  { label: '이런 분께', lifetime: plans.lifetime.fitFor.join(' / '), ai: plans.ai.fitFor.join(' / ') },
];

export default function PricingPage() {
  return (
    <>
      <ViewPing event="pricing_view" />
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ name: '이용권 안내', path: '/pricing/' }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">이용권 안내</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {planFacts.threeTiers} {planFacts.sameTierSameFeatures}
          </p>
          <p className="mt-2 text-sm text-ink-500">정보 기준일 {dataAsOf}</p>
        </header>
      </Container>

      <Section eyebrow="이용 방식 선택" title="영구 이용권 또는 AI 이용권">
        <PlanSwitch
          panels={planOrder.map((id) => ({
            id,
            label: plans[id].name,
            content: <TierCards plan={plans[id]} />,
          }))}
        />
      </Section>

      <Section tone="tinted" eyebrow="한눈에 비교" title="두 이용 방식의 차이">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
          <table className="cmp-table w-full text-left text-[15px]">
            <thead className="bg-ink-50 text-sm text-ink-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">항목</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink-900">영구 이용권</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink-900">AI 이용권</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-ink-200 align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink-700">
                    {row.label}
                  </th>
                  <td data-label="영구 이용권" className="px-4 py-3 text-ink-700">
                    {row.lifetime}
                  </td>
                  <td data-label="AI 이용권" className="px-4 py-3 text-ink-700">
                    {row.ai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-5 grid gap-2 text-base leading-relaxed text-ink-700">
          <li>· {planFacts.lifetimeIsAutomated}</li>
          <li>· {planFacts.lifetimeNoAiLimit}</li>
        </ul>
        <p className="mt-4">
          <Link href="/guide/lifetime-vs-ai/" className="prose-link font-semibold">
            어떤 이용권이 맞는지 선택 가이드 읽기
          </Link>
        </p>
      </Section>

      <Section eyebrow="확인 후 안내드리는 항목" title="문의 시 안내드리는 것">
        <Notice>
          <ul className="grid gap-1.5">
            <li>· {unconfirmed.prices}</li>
            <li>· {unconfirmed.aiLimits}</li>
            <li>· {unconfirmed.subscriptionPeriod}</li>
            <li>· {unconfirmed.updates}</li>
            <li>· {unconfirmed.refund}</li>
            <li>· {unconfirmed.devices}</li>
          </ul>
        </Notice>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrialButton placement="pricing_bottom" size="large" />
          <PurchaseButton placement="pricing_bottom" size="large" />
        </div>
        <p className="mt-3 text-sm text-ink-500">
          체험은 문의 후 안내에 따라 진행되며, 버튼을 누른다고 즉시 발급되지 않습니다.
        </p>
      </Section>
    </>
  );
}
