import { siteConfig } from '@/config/site';

/**
 * SNS 계정 링크.
 *
 * - 주소를 컴포넌트에 하드코딩하지 않는다. 값은 환경변수에서 온다.
 * - 값이 없거나 형식이 잘못됐으면 아예 링크를 만들지 않는다(깨진 링크 방지).
 * - 플랫폼별 호스트를 검사한다. 오타나 엉뚱한 주소가 들어가도 노출되지 않는다.
 */

export const socialPlatforms = ['instagram', 'threads'] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export interface SocialLink {
  platform: SocialPlatform;
  /** 화면 표시명 (브랜드명이라 로케일별로 번역하지 않는다) */
  label: string;
  url: string;
}

const LABELS: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  threads: 'Threads',
};

/** threads.net은 threads.com으로 이전 중이라 둘 다 허용한다. */
const ALLOWED_HOSTS: Record<SocialPlatform, readonly string[]> = {
  instagram: ['instagram.com', 'www.instagram.com'],
  threads: ['threads.net', 'www.threads.net', 'threads.com', 'www.threads.com'],
};

function normalize(platform: SocialPlatform, raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (!ALLOWED_HOSTS[platform].includes(url.hostname)) return null;
    return url.toString();
  } catch {
    // URL로 파싱되지 않는 값이면 링크를 만들지 않는다.
    return null;
  }
}

/** 설정된 SNS 링크만 돌려준다. 하나도 없으면 빈 배열. */
export function socialLinks(): SocialLink[] {
  return socialPlatforms
    .map((platform) => {
      const url = normalize(platform, siteConfig.social[platform]);
      return url ? { platform, label: LABELS[platform], url } : null;
    })
    .filter((link): link is SocialLink => link !== null);
}

export function hasSocialLinks(): boolean {
  return socialLinks().length > 0;
}
