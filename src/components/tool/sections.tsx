import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import { formatDate } from '@/lib/format/number';
import type { Dictionary } from '@/lib/i18n/types';
import type { FaqItem, FormulaLine, SourceRef, WorkedExample } from '@/lib/tools/types';

/**
 * 도구 상세 페이지의 설명 섹션들 (서버 컴포넌트).
 * 모든 도구가 같은 순서로 같은 정보를 제공하도록 템플릿을 고정한다.
 */

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold sm:text-[1.5rem]">
      {children}
    </h2>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3.5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-6">
      {children}
    </div>
  );
}

export function HowItWorksSection({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="how-it-works">{title}</SectionHeading>
      <SectionCard>
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-brand-500">
                ✓
              </span>
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

export function FormulaSection({
  title,
  lines,
}: {
  title: string;
  lines: readonly FormulaLine[];
}) {
  if (lines.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="formula">{title}</SectionHeading>
      <SectionCard>
        {/* min-w-0: grid 아이템의 기본 min-width:auto 때문에 긴 수식이 컨테이너를 밀어낸다. */}
        <dl className="grid gap-4">
          {lines.map((line) => (
            <div key={line.label} className="min-w-0">
              <dt className="text-[0.9375rem] font-semibold text-ink-800">{line.label}</dt>
              <dd className="mt-1 min-w-0">
                <code className="tabular block overflow-x-auto whitespace-pre rounded-[var(--radius-field)] bg-ink-100 px-3.5 py-2.5 font-mono text-sm leading-relaxed text-ink-800">
                  {line.expression}
                </code>
                {line.note && <p className="mt-1.5 text-sm text-ink-500">{line.note}</p>}
              </dd>
            </div>
          ))}
        </dl>
      </SectionCard>
    </section>
  );
}

export function ExampleSection({
  title,
  example,
}: {
  title: string;
  example: WorkedExample;
}) {
  return (
    <section className="mt-12">
      <SectionHeading id="example">{title}</SectionHeading>
      <SectionCard>
        <p className="font-medium text-ink-800">{example.scenario}</p>
        <ol className="mt-3 grid gap-2">
          {example.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-ink-700">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
              >
                {index + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 rounded-[var(--radius-field)] border border-brand-200 bg-brand-50 px-4 py-3 font-bold leading-relaxed text-brand-800">
          {example.conclusion}
        </p>
      </SectionCard>
    </section>
  );
}

export function NotesSection({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="notes">{title}</SectionHeading>
      <SectionCard>
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold text-amber-500">
                !
              </span>
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

/** FAQ. JS 없이 동작하는 details/summary 아코디언. */
export function FaqSection({ title, items }: { title: string; items: readonly FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="faq">{title}</SectionHeading>
      <div className="mt-3.5 divide-y divide-ink-200 overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-base font-semibold text-ink-800 transition-colors hover:bg-ink-50 sm:px-5">
              <h3 className="text-base font-semibold">{item.question}</h3>
              <span
                aria-hidden="true"
                className="shrink-0 text-xl font-normal text-ink-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-4 pb-5 leading-relaxed text-ink-700 sm:px-5">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** 업데이트 기준일 / 계산 기준 출처 */
export function SourceInfo({
  locale,
  dict,
  updatedAt,
  basisDate,
  sources,
}: {
  locale: Locale;
  dict: Dictionary;
  updatedAt: string;
  basisDate?: string;
  sources?: readonly SourceRef[];
}) {
  return (
    <section className="mt-12 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-600 sm:p-5">
      <p>
        <span className="font-semibold text-ink-700">{dict.common.updatedAt}:</span>{' '}
        {formatDate(basisDate ?? updatedAt, locale)}
      </p>
      {sources && sources.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold text-ink-700">{dict.common.sources}:</span>
          <ul className="mt-1 grid gap-1">
            {sources.map((source) => (
              <li key={source.label}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
                  >
                    {source.label}
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-3 leading-relaxed">{dict.tool.disclaimer}</p>
    </section>
  );
}

/** 관련 가이드 링크 (PHASE 7에서 가이드가 생기면 자동으로 노출된다) */
export function RelatedGuides({
  locale,
  title,
  guides,
}: {
  locale: Locale;
  title: string;
  guides: readonly { slug: string; title: string }[];
}) {
  if (guides.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading>{title}</SectionHeading>
      <ul className="mt-3.5 grid gap-2.5">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={localePath(locale, `/guide/${guide.slug}`)}
              className="flex min-h-14 items-center gap-2.5 rounded-[var(--radius-card)] border border-ink-200 bg-white px-4 py-3 font-medium text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              <span aria-hidden="true">📄</span>
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
