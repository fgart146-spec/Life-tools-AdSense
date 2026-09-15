'use client';

import { siteConfig } from '@/config/site';
import { sales, trial } from '@/data/product';
import { trackEvent } from '@/lib/analytics';
import { buttonStyles } from '@/components/ui';

/**
 * 문의·체험·구매 버튼. 목적지는 데이터 계층이 정한다.
 * - 3일 체험 문의 / 일반 문의 → 카카오톡 오픈채팅
 * - 구매 → 판매 페이지가 확인되면 그 주소, 아니면 '구매 문의'로 같은 문의 채널
 * 버튼 클릭은 클릭일 뿐이며 체험 발급·구매 완료로 기록하지 않는다.
 */

type Size = 'default' | 'compact' | 'large';

const sizeClass: Record<Size, string> = {
  default: '',
  compact: 'min-h-10 px-4 text-sm',
  large: 'min-h-14 px-7 text-lg',
};

function ExternalButton({
  href,
  children,
  variant,
  size = 'default',
  onClick,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant: keyof typeof buttonStyles;
  size?: Size;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${buttonStyles[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
      <span className="sr-only"> (새 창에서 열림)</span>
    </a>
  );
}

export function TrialButton({
  size = 'default',
  placement,
  className = '',
}: {
  size?: Size;
  placement: string;
  className?: string;
}) {
  return (
    <ExternalButton
      href={siteConfig.contact.kakaoOpenChat}
      variant="primary"
      size={size}
      onClick={() => trackEvent('trial_click', { placement })}
      className={className}
    >
      {trial.label}
    </ExternalButton>
  );
}

export function ContactButton({
  size = 'default',
  placement,
  label = '문의하기',
  variant = 'secondary',
  className = '',
}: {
  size?: Size;
  placement: string;
  label?: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <ExternalButton
      href={siteConfig.contact.kakaoOpenChat}
      variant={variant}
      size={size}
      onClick={() => trackEvent('contact_click', { placement })}
      className={className}
    >
      {label}
    </ExternalButton>
  );
}

export function PurchaseButton({
  size = 'default',
  placement,
  className = '',
}: {
  size?: Size;
  placement: string;
  className?: string;
}) {
  const hasSalesPage = sales.status === 'live' && sales.buttonMode === 'link' && Boolean(sales.url);
  if (hasSalesPage && sales.url) {
    return (
      <ExternalButton
        href={sales.url}
        variant="primary"
        size={size}
        onClick={() => trackEvent('purchase_click', { placement })}
        className={className}
      >
        구매하기
      </ExternalButton>
    );
  }
  // 판매 페이지 미확인 → 가짜 링크를 만들지 않고 문의로 보낸다.
  return (
    <ExternalButton
      href={siteConfig.contact.kakaoOpenChat}
      variant="secondary"
      size={size}
      onClick={() => trackEvent('contact_click', { placement, intent: 'purchase' })}
      className={className}
    >
      구매 문의
    </ExternalButton>
  );
}
