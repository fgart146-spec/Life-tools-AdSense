'use client';

import { trackEvent } from '@/lib/analytics';
import { interpolate } from '@/lib/i18n/dictionary';
import type { SocialLink } from '@/lib/social';

/**
 * SNS 계정 링크.
 *
 * - 링크는 서버에서 검증한 뒤 props로 받는다. 주소를 여기에 하드코딩하지 않는다.
 * - links가 비어 있으면 아무것도 렌더하지 않는다 (깨진 링크·빈 영역 방지).
 * - Instagram은 웹 공유 수단이 없으므로 '방문 링크'로만 다룬다.
 */

type Variant = 'footer' | 'pill';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: Variant;
  /** aria-label 템플릿. %{platform}, %{brand} */
  ariaTemplate: string;
  brand: string;
  /** 어느 위치에서 눌렀는지 (분석용). 사용자 데이터는 넣지 않는다. */
  placement: 'footer' | 'home_cta';
}

const STYLES: Record<Variant, { list: string; link: string }> = {
  footer: {
    list: 'grid gap-1',
    link: 'inline-block py-0.5 text-sm text-ink-600 transition-colors hover:text-brand-700',
  },
  pill: {
    list: 'flex flex-wrap gap-2',
    link: 'inline-flex min-h-11 items-center rounded-full border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700',
  },
};

export function SocialLinks({
  links,
  variant = 'footer',
  ariaTemplate,
  brand,
  placement,
}: SocialLinksProps) {
  if (links.length === 0) return null;

  const styles = STYLES[variant];

  return (
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={interpolate(ariaTemplate, { platform: link.label, brand })}
            className={styles.link}
            onClick={() => trackEvent('social_click', { platform: link.platform, placement })}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
