import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileCta } from '@/components/MobileCta';

/**
 * 루트 레이아웃. 문서 언어 ko, 브랜드 메타데이터, 파비콘·OG 이미지는 파일 컨벤션(icon.tsx,
 * opengraph-image.tsx)으로 이 앱 안에서만 생성된다. 생활계산소와 공유하는 것이 없다.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionUrl),
  title: {
    default: `${siteConfig.name} | 네이버 블로그 이웃관리·서이추 프로그램`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  robots: siteConfig.isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3448c4',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <Header />
        {/* 모바일 하단 고정 버튼(5.5rem) 만큼 여백을 둬 본문을 가리지 않는다 */}
        <main id="main" className="flex-1 pb-[5.5rem] md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCta />
        <Analytics />
      </body>
    </html>
  );
}
