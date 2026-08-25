import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';

export interface BreadcrumbItem {
  name: string;
  /** 로케일 접두사를 제외한 경로. 마지막 항목은 링크하지 않는다. */
  path?: string;
}

export function Breadcrumbs({
  locale,
  items,
  label,
}: {
  locale: Locale;
  items: readonly BreadcrumbItem[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-ink-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1">
              {item.path && !isLast ? (
                <Link
                  href={localePath(locale, item.path)}
                  className="hover:text-brand-700 hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? 'text-ink-700' : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-ink-300">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
