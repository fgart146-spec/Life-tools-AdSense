import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/tools', label: '도구' },
  { href: '/admin/life', label: '생활백과' },
  { href: '/admin/basis', label: '기준값' },
  { href: '/admin/seasonal', label: '시즌 추천' },
  { href: '/admin/insights', label: '검색·제안' },
  { href: '/admin/settings', label: '설정' },
];

export function AdminShell({
  children,
  email,
  active,
}: {
  children: ReactNode;
  email?: string;
  active?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-300 pb-4">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">🛠️</span>
          <h1 className="text-lg font-bold text-ink-900">생활계산소 관리자</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-ink-600">
          {email && <span>{email}</span>}
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-md border border-ink-300 bg-white px-3 py-1.5 font-medium hover:bg-ink-100"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <nav aria-label="관리자 메뉴" className="mt-4 flex flex-wrap gap-2">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active === item.href ? 'page' : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              active === item.href
                ? 'bg-brand-600 text-white'
                : 'bg-white text-ink-700 hover:bg-ink-200'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="mt-6">{children}</main>
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5">
      <h2 className="text-base font-bold text-ink-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function SetupNotice() {
  return (
    <div className="mx-auto mt-16 w-full max-w-2xl rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-6">
      <h2 className="text-lg font-bold text-amber-900">Supabase 설정이 필요합니다</h2>
      <p className="mt-2 text-sm leading-relaxed text-amber-900">
        관리자 기능을 사용하려면 <code>NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>{' '}
        환경변수를 설정하고 <code>supabase/migrations/0001_init.sql</code>을 적용해야 합니다.
      </p>
      <p className="mt-2 text-sm text-amber-900">
        설정 전에도 공개 사이트는 코드 기본값으로 정상 동작합니다.
      </p>
    </div>
  );
}
