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
    <h2 id={id} className="text-xl font-bold sm:text-2xl">
      {children}
    </h2>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-5">
      {children}
    </div>
  );
}

export function HowItWorksSection({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <SectionHeading id="how-it-works">{title}</SectionHeading>
      <SectionCard>
        <ul className="grid gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2 leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-1 text-brand-500">
                ✓
              </span>
              <span>{item}</span>
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
    <section className="mt-10">
      <SectionHeading id="formula">{title}</SectionHeading>
      <SectionCard>
        <dl className="grid gap-4">
          {lines.map((line) => (
            <div key={line.label}>
              <dt className="text-sm font-semibold text-ink-700">{line.label}</dt>
              <dd className="mt-1">
                <code className="tabular block overflow-x-auto rounded-md bg-ink-100 px-3 py-2 font-mono text-sm text-ink-800">
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
    <section className="mt-10">
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
        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2.5 font-semibold text-brand-800">
          {example.conclusion}
        </p>
      </SectionCard>
    </section>
  );
}

export function NotesSection({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <SectionHeading id="notes">{title}</SectionHeading>
      <SectionCard>
        <ul className="grid gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2 leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-0.5 text-amber-500">
                !
              </span>
              <span>{item}</span>
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
    <section className="mt-10">
      <SectionHeading id="faq">{title}</SectionHeading>
      <div className="mt-3 divide-y divide-ink-200 overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-base font-semibold text-ink-800 hover:bg-ink-50">
              <h3 className="text-base font-semibold">{item.question}</h3>
              <span
                aria-hidden="true"
                className="shrink-0 text-ink-400 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-4 pb-4 leading-relaxed text-ink-700">{item.answer}</div>
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
    <section className="mt-10 rounded-[var(--radius-card)] border border-ink-200 bg-ink-100/60 p-4 text-sm text-ink-600">
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
                    className="text-brand-700 underline underline-offset-2"
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
    <section className="mt-10">
      <SectionHeading>{title}</SectionHeading>
      <ul className="mt-3 grid gap-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={localePath(locale, `/guide/${guide.slug}`)}
              className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-800 hover:border-brand-300 hover:text-brand-700"
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
