/**
 * 사이트 설정 단일 소스.
 *
 * - productionUrl 은 상수다. canonical·OG·사이트맵·robots 의 주소는 전부 여기서만 나온다.
 *   요청 Host, VERCEL_URL, 미리보기 주소를 정식 주소로 쓰지 않는다.
 * - env 는 next.config.ts 가 판정해 NEXT_PUBLIC_SITE_ENV 로 넣어준 값이다.
 */

export type SiteEnv = 'production' | 'preview' | 'development';

function readSiteEnv(): SiteEnv {
  const value = process.env.NEXT_PUBLIC_SITE_ENV;
  return value === 'production' || value === 'preview' ? value : 'development';
}

const env = readSiteEnv();

export const siteConfig = {
  /** 정식 공개 주소. 마지막 슬래시 없음. */
  productionUrl: 'https://booster.eolmaji.com',
  env,
  /** 운영 환경에서만 색인을 허용한다. */
  isIndexable: env === 'production',
  name: '이웃부스터',
  tagline: '네이버 블로그 이웃관리 도우미',
  description:
    '서로이웃 대상 탐색, 공감·댓글, 답방, 이웃관리, 작업 내역 정리까지 — 네이버 블로그 운영에서 반복되는 이웃관리 작업을 돕는 독립 개발 프로그램입니다.',
  locale: 'ko',
  /** 독립 제품임을 화면 곳곳에서 분명히 한다. */
  independenceNotice: '이웃부스터는 네이버와 무관한 독립 개발 소프트웨어입니다.',
  contact: {
    /** 체험·구매·지원 문의 기본 경로 (작업지시서 기준값) */
    kakaoOpenChat: 'https://open.kakao.com/o/g2ZfmeLi',
    /** 확인된 이메일 연락처 없음 → 화면에 표시하지 않는다 */
    email: null as string | null,
  },
  analytics: {
    /** 비어 있으면 측정 비활성. 생활계산소의 ID를 복제하지 않는다. */
    gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || null,
  },
} as const;

export const navItems = [
  { href: '/features/', label: '기능' },
  { href: '/pricing/', label: '이용권' },
  { href: '/guide/', label: '가이드' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: '문의' },
] as const;

/** 정식 절대 URL. path 는 항상 후행 슬래시 형태('/features/')로 넘긴다. 홈은 '/'. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.productionUrl}${normalized}`;
}
