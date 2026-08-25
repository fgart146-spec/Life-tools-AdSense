import type { Metadata } from 'next';
import '@/app/globals.css';

/**
 * 관리자 영역의 루트 레이아웃.
 * 공개 사이트(/[locale])와 완전히 분리된 트리이며, 검색엔진에 색인되지 않는다.
 */
export const metadata: Metadata = {
  title: '관리자',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-ink-100 text-ink-800">{children}</body>
    </html>
  );
}
