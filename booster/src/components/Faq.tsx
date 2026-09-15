import type { FaqItem } from '@/data/product';

/**
 * FAQ 목록. <details>/<summary> 라 자바스크립트 없이 동작하고 키보드로 열 수 있으며,
 * 답변 본문이 초기 HTML 에 그대로 들어간다.
 */
export function FaqList({ items, openFirst = false }: { items: readonly FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200 bg-white">
      {items.map((item, index) => (
        <details key={item.id} id={`faq-${item.id}`} className="group" open={openFirst && index === 0}>
          <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-semibold text-ink-900 hover:bg-ink-50">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-ink-400 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-base leading-relaxed text-ink-700">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
