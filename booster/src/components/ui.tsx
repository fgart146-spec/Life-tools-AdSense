import type { ReactNode } from 'react';
import Link from 'next/link';

/** 페이지 폭 래퍼 */
export function Container({
  children,
  className = '',
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow';
}) {
  const max = size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl';
  return <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** 섹션 래퍼: 제목(H2) + 설명 + 내용 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  tone = 'plain',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: 'plain' | 'tinted';
}) {
  const bg = tone === 'tinted' ? 'bg-white border-y border-ink-200' : '';
  return (
    <section id={id} className={`py-14 sm:py-20 ${bg} ${className}`}>
      <Container>
        {(eyebrow || title || description) && (
          <header className="mb-8 max-w-2xl sm:mb-10">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{title}</h2>
            )}
            {description && (
              <p className="mt-3 text-base leading-relaxed text-ink-600 sm:text-lg">{description}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

/** 카드 */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}

const buttonBase =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold transition-colors';

export const buttonStyles = {
  primary: `${buttonBase} bg-brand-600 text-white hover:bg-brand-700`,
  secondary: `${buttonBase} border border-ink-300 bg-white text-ink-800 hover:border-brand-400 hover:bg-brand-50`,
  ghost: `${buttonBase} text-brand-700 hover:bg-brand-50`,
} as const;

/** 내부 링크 버튼 */
export function LinkButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** 안내 상자 (주의사항·미확정 안내) */
export function Notice({
  title,
  children,
  tone = 'info',
}: {
  title?: string;
  children: ReactNode;
  tone?: 'info' | 'caution';
}) {
  const styles =
    tone === 'caution'
      ? 'border-accent-600/30 bg-accent-100 text-ink-800'
      : 'border-brand-200 bg-brand-50 text-ink-800';
  return (
    <div className={`rounded-xl border px-5 py-4 text-sm leading-relaxed ${styles}`} role="note">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}

/** '설명용 예시 화면' 배지 — 실제 캡처로 오인되지 않게 항상 붙인다 */
export function IllustrativeBadge({ label }: { label: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full border border-accent-600/30 bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
      <span aria-hidden="true">ⓘ</span>
      {label}
    </p>
  );
}
