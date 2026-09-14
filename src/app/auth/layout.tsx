import type { Metadata } from 'next';
import '@/app/globals.css';
import { absoluteUrl, siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `이메일 인증 | ${siteConfig.brand.ko}`,
  description: '이웃부스터 회원가입 및 비밀번호 재설정 이메일 인증 결과를 안내합니다.',
  alternates: {
    canonical: absoluteUrl('/auth/callback'),
    languages: { 'x-default': absoluteUrl('/auth/callback') },
  },
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-ink-50 text-ink-800">{children}</body>
    </html>
  );
}
