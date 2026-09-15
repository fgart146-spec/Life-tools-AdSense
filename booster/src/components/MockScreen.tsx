import { assets } from '@/data/product';
import { IllustrativeBadge } from '@/components/ui';

/**
 * 설명용 예시 화면. 실제 프로그램 캡처가 없으므로 HTML/CSS 로 '이런 종류의 화면'을 보여준다.
 * 실제 고객 데이터·실측 성과처럼 보이는 숫자를 넣지 않는다. 항상 배지로 예시임을 표시한다.
 */

type Row = { label: string; state: string };

export function MockScreen({
  title,
  rows,
  className = '',
}: {
  title: string;
  rows: readonly Row[];
  className?: string;
}) {
  return (
    <figure className={`w-full ${className}`}>
      <div
        className="overflow-hidden rounded-xl border border-ink-300 bg-white shadow-[var(--shadow-card)]"
        aria-hidden="true"
      >
        {/* 창 상단 바 */}
        <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-100 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
          <span className="ml-2 text-xs font-medium text-ink-500">{title}</span>
        </div>
        <div className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr]">
          {/* 왼쪽 메뉴 */}
          <div className="border-r border-ink-200 bg-ink-50 p-2.5">
            {['탐색', '댓글', '답방', '이웃', '기록'].map((item, index) => (
              <div
                key={item}
                className={`mb-1 rounded-md px-2 py-1.5 text-xs ${
                  index === 0 ? 'bg-brand-100 font-semibold text-brand-800' : 'text-ink-500'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          {/* 본문 목록 */}
          <div className="p-3">
            <div className="mb-2 h-2 w-24 rounded bg-ink-200" />
            <ul className="space-y-1.5">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between rounded-md border border-ink-200 px-2.5 py-2 text-xs"
                >
                  <span className="text-ink-700">{row.label}</span>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                    {row.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="mt-3">
        <IllustrativeBadge label={assets.illustrativeLabel} />
      </figcaption>
    </figure>
  );
}
