import type { ReactNode } from 'react';
import type { LifeContent } from '@/lib/life/types';
import type { Dictionary } from '@/lib/i18n/types';
import type { FaqItem, SourceRef } from '@/lib/tools/types';
import { formatDate } from '@/lib/format/number';
import type { Locale } from '@/lib/i18n/config';

/**
 * 생활백과 문서의 본문 섹션 (서버 컴포넌트).
 * 모든 문서가 같은 순서로 같은 정보를 제공하도록 템플릿을 고정한다.
 * 핵심 본문은 JS 없이도 읽히도록 전부 서버에서 렌더한다.
 */

function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold sm:text-[1.5rem]">
      {children}
    </h2>
  );
}

function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3.5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-6">
      {children}
    </div>
  );
}

/** 한 줄 핵심 답변 — H1 바로 아래. 이것만 읽어도 방향이 잡혀야 한다. */
export function LifeSummary({ text }: { text: string }) {
  return (
    <p className="mt-3 text-[1.0625rem] font-medium leading-relaxed text-ink-700 sm:text-lg">
      {text}
    </p>
  );
}

/** 빠른 해결 방법 — 페이지에서 가장 강한 블록 */
export function QuickAnswerCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-6 overflow-hidden rounded-[var(--radius-card)] border-2 border-brand-200 bg-white shadow-[var(--shadow-card)]">
      <h2 className="border-b border-brand-100 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-800 sm:px-6">
        {title}
      </h2>
      <ol className="grid gap-3 p-4 sm:p-6">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <span className="min-w-0 leading-relaxed text-ink-800">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SuppliesSection({
  title,
  items,
}: {
  title: string;
  items?: readonly string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="supplies">{title}</SectionHeading>
      <SectionCard>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-ink-200 bg-ink-50 px-3.5 py-1.5 text-[0.9375rem] text-ink-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

export function StepsSection({
  title,
  steps,
}: {
  title: string;
  steps: LifeContent['steps'];
}) {
  if (steps.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="steps">{title}</SectionHeading>
      <ol className="mt-3.5 grid gap-3">
        {steps.map((step) => (
          <li
            key={step.title}
            className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-5"
          >
            <h3 className="text-[1.0625rem] font-bold text-ink-900">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-700">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CautionsSection({
  title,
  items,
  safetyNote,
}: {
  title: string;
  items?: readonly string[];
  safetyNote: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="cautions">{title}</SectionHeading>
      <div className="mt-3.5 rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-4 sm:p-5">
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 leading-relaxed text-amber-900">
              <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">
                !
              </span>
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-amber-300/70 pt-3 text-sm leading-relaxed text-amber-900/90">
          {safetyNote}
        </p>
      </div>
    </section>
  );
}

export function SituationTipsSection({
  title,
  tips,
}: {
  title: string;
  tips?: LifeContent['situationTips'];
}) {
  if (!tips || tips.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id="situations">{title}</SectionHeading>
      <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-5"
          >
            <h3 className="text-[1.0625rem] font-bold text-ink-900">{tip.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProseListSection({
  title,
  items,
  id,
  tone = 'default',
}: {
  title: string;
  items?: readonly string[];
  id?: string;
  tone?: 'default' | 'brand';
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionHeading id={id}>{title}</SectionHeading>
      <SectionCard>
        <ul className="grid gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 leading-relaxed text-ink-700">
              <span
                aria-hidden="true"
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                  tone === 'brand' ? 'bg-brand-500' : 'bg-ink-300'
                }`}
              />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

/** FAQ. JS 없이 동작하는 details/summary 아코디언. */
export function LifeFaqSection({
  title,
  items,
}: {
  title: string;
  items: readonly FaqItem[];
}) {
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

/** 업데이트 기준일 / 참고 출처 */
export function LifeSourceInfo({
  locale,
  dict,
  updatedAt,
  sources,
}: {
  locale: Locale;
  dict: Dictionary;
  updatedAt: string;
  sources?: readonly SourceRef[];
}) {
  return (
    <section className="mt-12 rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-600 sm:p-5">
      <p>
        <span className="font-semibold text-ink-700">{dict.common.updatedAt}:</span>{' '}
        {formatDate(updatedAt, locale)}
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
    </section>
  );
}
