import Link from 'next/link';
import { breadcrumbJsonLd, serializeJsonLd, type BreadcrumbEntry } from '@/lib/seo';

/**
 * 화면의 경로 표시와 BreadcrumbList 구조화 데이터를 같은 배열에서 만든다 (불일치 방지).
 * 홈은 항상 첫 항목으로 넣는다.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const entries: BreadcrumbEntry[] = [{ name: '홈', path: '/' }, ...items];
  const last = entries.length - 1;
  return (
    <>
      <nav aria-label="현재 위치" className="text-sm text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {entries.map((entry, index) => (
            <li key={entry.path} className="flex items-center gap-1.5">
              {index < last ? (
                <Link href={entry.path} className="hover:text-brand-700">
                  {entry.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-700">
                  {entry.name}
                </span>
              )}
              {index < last && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(entries)) }}
      />
    </>
  );
}
