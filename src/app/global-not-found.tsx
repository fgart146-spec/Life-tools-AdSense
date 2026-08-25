import type { Metadata } from 'next';
import '@/app/globals.css';
import { defaultLocale, localeMeta } from '@/lib/i18n/config';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

/**
 * 어떤 라우트와도 매칭되지 않은 요청의 404.
 * 자체 HTML 문서를 렌더하며, 본문은 경로에서 로케일을 읽어 해당 언어로 표시한다.
 */
export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang={localeMeta[defaultLocale].htmlLang}>
      <body className="flex min-h-screen flex-col justify-center bg-ink-50 text-ink-800">
        <NotFoundContent />
      </body>
    </html>
  );
}
