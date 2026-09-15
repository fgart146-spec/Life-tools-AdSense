import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

/** 공유 이미지 — 빌드 시 한 번 생성된다. 브랜드 표기는 화면·WebSite 구조화 데이터와 같다. */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          backgroundColor: '#1f2a63',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: '#3448c4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 32 32">
              <circle cx="12" cy="12.5" r="4" fill="white" />
              <circle cx="21" cy="12.5" r="4" fill="white" opacity="0.85" />
              <path d="M5.5 24.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M15.5 24.5c0-3.6 2.5-6.5 5.5-6.5s5.5 2.9 5.5 6.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.85" />
            </svg>
          </div>
          <span style={{ fontSize: 44, fontWeight: 700 }}>{siteConfig.name}</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 64, fontWeight: 700, lineHeight: 1.25, maxWidth: 980 }}>
          반복되는 이웃관리, 이제 더 간편하게.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: '#c3d0fb', maxWidth: 980 }}>
          {`${siteConfig.tagline} · booster.eolmaji.com`}
        </div>
      </div>
    ),
    size,
  );
}
