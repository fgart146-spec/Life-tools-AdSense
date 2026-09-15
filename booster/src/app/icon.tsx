import { ImageResponse } from 'next/og';

/** 파비콘 — 로고 마크와 같은 형태. 이 앱에서만 생성된다. */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#3448c4',
          borderRadius: 8,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32">
          <circle cx="12" cy="12.5" r="4" fill="white" />
          <circle cx="21" cy="12.5" r="4" fill="white" opacity="0.85" />
          <path
            d="M5.5 24.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M15.5 24.5c0-3.6 2.5-6.5 5.5-6.5s5.5 2.9 5.5 6.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </svg>
      </div>
    ),
    size,
  );
}
