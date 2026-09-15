import Link from 'next/link';
import { navItems, siteConfig } from '@/config/site';
import { dataAsOf } from '@/data/product';
import { LogoMark } from '@/components/Logo';
import { Container } from '@/components/ui';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-ink-200 bg-white">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-lg font-bold text-ink-900">
              <LogoMark size={24} />
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              {siteConfig.independenceNotice} 이용 시 네이버의 정책과 다른 이용자의 의사를 존중해야
              합니다.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500">바로가기</h2>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-0.5 text-sm text-ink-700 hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.contact.kakaoOpenChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-0.5 text-sm text-ink-700 hover:text-brand-700"
                >
                  카카오톡 문의 (새 창)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
          이 홈페이지는 제품 소개용이며 회원가입·결제·개인정보 수집 기능이 없습니다. 안내 정보 기준일{' '}
          {dataAsOf}.
        </p>
        <p className="mt-2 text-xs text-ink-500">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
