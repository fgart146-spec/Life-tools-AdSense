import type { ReactNode } from 'react';

/**
 * 계산 결과 표시 공통 컴포넌트.
 * - 결과 영역은 aria-live로 변경을 알린다.
 * - 숫자만 보여주지 않고 항상 해석 문장(ResultNotes)을 함께 배치한다.
 *
 * 디자인 원칙: 이 페이지에서 시각적으로 가장 강한 영역이다.
 * 입력 카드보다 테두리를 굵게 주고 숫자를 크게 써서, 스크롤 중에도 답이 먼저 눈에 들어오게 한다.
 */

export function ResultPanel({
  title,
  children,
  isEmpty = false,
  placeholder,
}: {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
  placeholder?: string;
}) {
  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-[var(--radius-card)] border-2 border-brand-200 bg-white shadow-[var(--shadow-card)]"
    >
      <h3 className="border-b border-brand-100 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-800 sm:px-5">
        {title}
      </h3>
      <div className="p-4 sm:p-5">
        {isEmpty ? (
          <p className="py-2 text-[0.9375rem] leading-relaxed text-ink-500">{placeholder}</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

/** 가장 중요한 숫자 하나 (가장 크게 표시) */
export function ResultHeadline({
  label,
  value,
  sub,
  tone = 'default',
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'default' | 'positive' | 'warning';
}) {
  const valueColor =
    tone === 'positive'
      ? 'text-brand-700'
      : tone === 'warning'
        ? 'text-amber-700'
        : 'text-ink-900';

  return (
    <div>
      <p className="text-[0.9375rem] font-medium text-ink-500">{label}</p>
      <p className={`amount mt-1 text-[2.125rem] font-extrabold leading-tight sm:text-[2.5rem] ${valueColor}`}>
        {value}
      </p>
      {sub && <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{sub}</p>}
    </div>
  );
}

export interface ResultRow {
  label: string;
  value: string;
  /** 강조 표시 */
  emphasis?: boolean;
  hint?: string;
}

export function ResultRows({ rows, title }: { rows: readonly ResultRow[]; title?: string }) {
  if (rows.length === 0) return null;
  return (
    <div className="mt-5">
      {title && (
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
          {title}
        </h4>
      )}
      <dl className="divide-y divide-ink-200 overflow-hidden rounded-[var(--radius-field)] border border-ink-200">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-3 px-3.5 py-3 ${
              row.emphasis ? 'bg-brand-50/70' : 'bg-white'
            }`}
          >
            <dt className="min-w-0 text-[0.9375rem] text-ink-600">
              {row.label}
              {row.hint && <span className="ml-1 text-xs text-ink-500">{row.hint}</span>}
            </dt>
            <dd
              className={`amount shrink-0 text-right ${
                row.emphasis
                  ? 'text-lg font-bold text-brand-700'
                  : 'text-base font-semibold text-ink-900'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 결과 해석 문장 (자연어) */
export function ResultNotes({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-5 space-y-2 rounded-[var(--radius-field)] bg-ink-50 p-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 입력값 문제 안내. 예외 대신 안내 문구로 처리한다. */
export function ResultIssues({ title, items }: { title: string; items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-4">
      <h3 className="text-sm font-bold text-amber-900">{title}</h3>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-[0.9375rem] leading-relaxed text-amber-900">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 절약액 등 부가 강조 블록 */
export function ResultCallout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5 rounded-[var(--radius-field)] border border-brand-200 bg-brand-50/60 p-3.5">
      <h4 className="text-sm font-bold text-brand-800">{title}</h4>
      <div className="mt-1 text-[0.9375rem] leading-relaxed text-ink-700">{children}</div>
    </div>
  );
}
