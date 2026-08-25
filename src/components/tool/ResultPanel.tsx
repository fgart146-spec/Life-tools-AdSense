import type { ReactNode } from 'react';

/**
 * 계산 결과 표시 공통 컴포넌트.
 * - 결과 영역은 aria-live로 변경을 알린다.
 * - 숫자만 보여주지 않고 항상 해석 문장(ResultNotes)을 함께 배치한다.
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
      className="rounded-[var(--radius-card)] border border-brand-200 bg-brand-50/60 p-4 sm:p-5"
    >
      <h3 className="text-sm font-semibold text-brand-800">{title}</h3>
      {isEmpty ? (
        <p className="mt-3 text-sm text-ink-500">{placeholder}</p>
      ) : (
        <div className="mt-3">{children}</div>
      )}
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
      <p className="text-sm text-ink-600">{label}</p>
      <p className={`tabular mt-0.5 text-3xl font-bold sm:text-4xl ${valueColor}`}>{value}</p>
      {sub && <p className="mt-1 text-sm text-ink-500">{sub}</p>}
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
    <div className="mt-4">
      {title && <h4 className="mb-2 text-sm font-semibold text-ink-700">{title}</h4>}
      <dl className="divide-y divide-brand-200/70 rounded-lg bg-white/70">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-3 px-3 py-2.5"
          >
            <dt className="text-sm text-ink-600">
              {row.label}
              {row.hint && <span className="ml-1 text-xs text-ink-400">{row.hint}</span>}
            </dt>
            <dd
              className={`tabular text-right text-base ${
                row.emphasis ? 'font-bold text-brand-700' : 'font-medium text-ink-900'
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
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-700">
          <span aria-hidden="true" className="text-brand-500">
            •
          </span>
          <span>{item}</span>
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
      <h3 className="text-sm font-semibold text-amber-900">{title}</h3>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-amber-900">
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
    <div className="mt-4 rounded-lg border border-brand-300 bg-white p-3">
      <h4 className="text-sm font-semibold text-brand-800">{title}</h4>
      <div className="mt-1 text-sm text-ink-700">{children}</div>
    </div>
  );
}
