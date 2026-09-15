import type { Metadata } from 'next';
import Link from 'next/link';
import { navItems } from '@/config/site';
import { Container } from '@/components/ui';

/** 존재하지 않는 주소는 실제 404 상태로 이 화면을 돌려준다 (메인으로 200 응답하지 않는다). */
export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container size="narrow" className="py-20 text-center">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-600">
        주소가 바뀌었거나 없는 페이지입니다. 아래에서 필요한 내용을 찾아보세요.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        <li>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-brand-600 px-5 font-semibold text-white hover:bg-brand-700">
            홈으로
          </Link>
        </li>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-xl border border-ink-300 bg-white px-5 font-semibold text-ink-800 hover:border-brand-400"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
