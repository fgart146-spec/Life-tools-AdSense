import { formatDate } from '@/lib/format/number';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';
import type { SourceRef } from '@/lib/tools/types';

/** 원문 링크와 확인 안내를 구분한다. 링크 없는 안내를 출처로 가장하지 않는다. */
export function SourceReferences({
  locale,
  dict,
  sources,
}: {
  locale: Locale;
  dict: Dictionary;
  sources?: readonly SourceRef[];
}) {
  if (!sources?.length) return null;
  const references = sources.filter((source) => source.url);
  const notes = sources.filter((source) => !source.url);

  return (
    <div className="mt-2 space-y-3">
      {references.length > 0 && (
        <div>
          <span className="font-semibold text-ink-700">{dict.common.sources}:</span>
          <ul className="mt-1 grid gap-1">
            {references.map((source) => (
              <li key={`${source.url}-${source.label}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
                >
                  {source.label}
                </a>
                {source.publisher && <span> · {source.publisher}</span>}
                {source.accessedAt && (
                  <span> · {dict.common.sourceAccessedAt} {formatDate(source.accessedAt, locale)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {notes.length > 0 && (
        <div>
          <span className="font-semibold text-ink-700">{dict.common.sourceNotes}:</span>
          <ul className="mt-1 grid gap-1">
            {notes.map((source) => <li key={source.label}>{source.label}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
