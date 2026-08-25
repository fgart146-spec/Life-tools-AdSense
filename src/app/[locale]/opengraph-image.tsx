import { ImageResponse } from 'next/og';
import { brandName } from '@/config/site';
import { defaultLocale, isLocale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';

/** 로케일마다 미리 생성한다(요청 시 생성되지 않도록). */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = 'Open Graph image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * 로케일별 대표 OG 이미지.
 * 빌드 시점에 한 번 생성되며 이후에는 정적 파일로 제공된다.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 36 }}>
          <span>🧮</span>
          <span style={{ fontWeight: 700 }}>{brandName(locale)}</span>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: 900,
          }}
        >
          {dict.home.heading}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: '#475569', maxWidth: 900 }}>
          {dict.footer.tagline}
        </div>
      </div>
    ),
    size,
  );
}
