import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { ToolListItem } from '@/lib/tools/registry';

export function ToolCard({ locale, tool }: { locale: Locale; tool: ToolListItem }) {
  return (
    <Link
      href={localePath(locale, `/${tool.slug}`)}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <span aria-hidden="true" className="text-2xl">
        {tool.emoji}
      </span>
      <span className="mt-2 text-base font-semibold text-ink-900 group-hover:text-brand-700">
        {tool.title}
      </span>
      <span className="mt-1 text-sm leading-relaxed text-ink-500">{tool.summary}</span>
    </Link>
  );
}

export function ToolCardGrid({
  locale,
  tools,
  columns = 3,
}: {
  locale: Locale;
  tools: readonly ToolListItem[];
  columns?: 2 | 3 | 4;
}) {
  if (tools.length === 0) return null;
  const columnClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul className={`grid gap-3 ${columnClass}`}>
      {tools.map((tool) => (
        <li key={tool.id} className="h-full">
          <ToolCard locale={locale} tool={tool} />
        </li>
      ))}
    </ul>
  );
}
