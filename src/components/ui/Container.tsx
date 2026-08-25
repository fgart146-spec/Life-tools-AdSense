import type { ReactNode } from 'react';

/** 페이지 공통 좌우 여백/최대폭. 본문 가독성을 위해 넓지 않게 유지한다. */
export function Container({
  children,
  className = '',
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}) {
  const width =
    size === 'wide' ? 'max-w-6xl' : size === 'narrow' ? 'max-w-3xl' : 'max-w-5xl';
  return <div className={`mx-auto w-full ${width} px-4 sm:px-6 ${className}`}>{children}</div>;
}
