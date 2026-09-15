import Link from 'next/link';
import { siteConfig } from '@/config/site';

/**
 * 이웃부스터 로고 — 생활계산소와 무관한 독립 마크.
 * 누르면 항상 이 사이트의 홈('/')으로 간다.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="var(--color-brand-600)" />
      {/* 두 사람이 이웃한 형태를 단순화한 마크 */}
      <circle cx="12" cy="12.5" r="4" fill="white" />
      <circle cx="21" cy="12.5" r="4" fill="white" opacity="0.85" />
      <path
        d="M5.5 24.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.5 24.5c0-3.6 2.5-6.5 5.5-6.5s5.5 2.9 5.5 6.5"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-lg text-lg font-bold text-ink-900 ${className}`}
      aria-label={`${siteConfig.name} 홈`}
    >
      <LogoMark />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
