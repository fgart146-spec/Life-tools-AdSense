import type { ReactNode } from 'react';

/** 페이지 섹션 공통 래퍼: 제목(H2) + 설명 + 내용 */
export function Section({
  title,
  description,
  action,
  children,
  className = '',
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-10 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            {title && <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>}
            {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
