import Link from 'next/link';
import { navItems } from '@/config/site';
import { Logo } from '@/components/Logo';
import { TrialButton } from '@/components/Cta';
import { Container } from '@/components/ui';

/**
 * 헤더. 모바일 메뉴는 <details> 로 만들어 자바스크립트 없이도 열리고 키보드로 다룰 수 있다.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        본문 바로가기
      </a>
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="주 메뉴" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <TrialButton size="compact" placement="header" />
        </div>

        {/* 모바일 메뉴 */}
        <details className="group relative md:hidden">
          <summary
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-ink-300 text-sm font-semibold text-ink-800"
            aria-label="메뉴 열기"
          >
            메뉴
          </summary>
          <nav
            aria-label="모바일 메뉴"
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-ink-200 bg-white p-2 shadow-[var(--shadow-card)]"
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-800 hover:bg-ink-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
