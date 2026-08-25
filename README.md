# 생활계산소 (Life Tools Platform)

> 돈 쓰기 전에 한 번 계산해보는 **생활·경제 실용도구 플랫폼**.
> 한국어를 시작점으로 영어·일본어까지 확장 가능한 구조로 개발한다.

최상위 개발 명세는 [`MASTER_SPEC.md`](./MASTER_SPEC.md) 이다.
모든 구현·리팩터링 판단은 이 명세를 최우선 기준으로 한다.

---

## 현재 상태

운영 중: <https://eolmaji.com>

| 항목 | 값 |
| --- | --- |
| 도구 | 35개 (ko 35 / en 10 / ja 10) — "얼마지?" |
| 생활백과 | 50편 · 카테고리 7개 (ko) — "어떻게 하지?" |
| 가이드 | 15편 (ko 15 / en 4 / ja 4) |
| 정적 페이지 | 소개·문의·개인정보·약관·면책 (3언어) |
| 생성 페이지 | 180개 (전부 정적 생성 · 공개 라우트 172) |
| 단위 테스트 | 275개 |
| 내부 링크 | 3,763건 · 깨진 링크 0 |

---

## 기술 스택

| 영역 | 선택 |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 |
| Test | Vitest (계산 로직 단위 테스트) |
| Lint | ESLint 9 + eslint-config-next |
| Hosting | Vercel |
| DB / Admin Auth | Supabase (관리자 전용) |
| Analytics | GA4 + Google Search Console |
| Ads | Google AdSense (슬롯 컴포넌트 준비) |
| Automation | Vercel Cron + Search Console API + Claude API(선택) |

---

## 빠른 시작

```bash
npm install
cp .env.example .env.local   # 값 채우기 (없어도 개발 서버는 뜬다)
npm run dev                  # http://localhost:3000 → /ko 로 리다이렉트
```

Supabase·GA·AdSense 환경변수가 없어도 공개 사이트는 코드 기본값으로 정상 동작한다.

## 명령어

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 빌드 결과 실행 |
| `npm run typecheck` | TypeScript 검사 |
| `npm run lint` | ESLint |
| `npm run test` | Vitest 1회 실행 |
| `npm run check:site` | 빌드 결과 검사(깨진 링크·H1·메타데이터·비밀키 노출) |
| `npm run verify` | typecheck → lint → test → build → check:site (Phase 종료 점검용) |

---

## 폴더 구조

```text
src/
  app/
    [locale]/              # /ko /en /ja — 이 세그먼트가 루트 레이아웃
      page.tsx             # 메인
      [slug]/              # 도구 상세 (SSG)
      category/[category]/ # 카테고리 허브
      guide/               # 가이드 목록 + 상세
      about|contact|privacy|terms|disclaimer/
      opengraph-image.tsx  # 로케일별 OG 이미지(빌드 시 생성)
    admin/                 # 관리자 (동적 · noindex · 자체 루트 레이아웃)
    api/cron/              # 주기 배치 (CRON_SECRET 보호)
    sitemap.ts robots.ts global-not-found.tsx
  components/
    layout/ tool/ tool/calculators/ ui/ ads/ admin/ analytics/
  config/site.ts           # 브랜드·도메인·광고·분석 단일 소스
  content/site-pages/      # 정책 페이지 본문(3언어)
  guides/<slug>/           # 가이드: meta.ts / content.<locale>.ts / index.ts
  life/<slug>/             # 생활백과: meta.ts / content.<locale>.ts / index.ts
  lib/
    calc/                  # 순수 계산 엔진 (테스트 대상)
    data/                  # 제도 종속 기준값 (전기요금·급여)
    admin/                 # 기준값·시즌 로더 (빌드/ISR 시점 조회)
    automation/            # Search Console · 분석 · AI 보강
    guides/ life/ i18n/ seo/ format/ math/ supabase/ tools/
  tools/<tool-id>/
    definition.ts          # 가벼운 메타(클라이언트 안전)
    calc.ts calc.test.ts   # 순수 계산 + 단위 테스트
    Calculator.tsx         # 'use client' 폼 UI
    content.<locale>.ts    # 본문(설명·공식·예시·FAQ·기준일·출처)
supabase/migrations/       # DB 스키마 (RLS 포함)
scripts/                   # 품질 검사 스크립트
docs/                      # 아키텍처·컨벤션·Phase 로그
```

## 문서

- [`MASTER_SPEC.md`](./MASTER_SPEC.md) — 최상위 제품 명세 (기준 문서)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — 렌더링·라우팅·도구 엔진·SEO·비용 설계
- [`docs/CONVENTIONS.md`](./docs/CONVENTIONS.md) — 코딩 규칙
- [`docs/PHASE-LOG.md`](./docs/PHASE-LOG.md) — Phase별 완료 점검 기록
- [`supabase/README.md`](./supabase/README.md) — DB 설정과 관리자 계정 등록 절차
- [`docs/DEPLOY.md`](./docs/DEPLOY.md) — GitHub → Vercel 배포와 환경변수 설정

---

## 핵심 원칙

1. **계산은 전부 브라우저에서.** 페이지뷰·계산 클릭이 DB/서버 호출로 이어지지 않는다.
2. **공개 페이지는 정적 생성(SSG).** 미들웨어는 `/admin`에만 적용한다.
3. **SEO는 구조 단계부터.** metadata·canonical·hreflang·JSON-LD를 페이지 생성 파이프라인에 내장한다.
4. **광고는 기능을 방해하지 않는다.** 계산 버튼/결과 옆 광고 금지, 슬롯 ID가 없으면 렌더하지 않는다.
5. **얇은 자동생성 페이지를 만들지 않는다.** 로케일 본문이 없으면 그 언어의 라우트를 만들지 않는다.
6. **AI는 제안까지만.** 승인은 관리자가 하고, 공개 반영은 코드 작업으로 이어진다.

---

## 공개 전 체크리스트

- [x] 전기요금·4대보험·최저임금 기준값 검증 (2026-08-25 · `docs/PHASE-LOG.md`)
- [x] Supabase 프로젝트 생성 → 마이그레이션 적용 → 관리자 계정 등록
- [x] GitHub → Vercel 배포
- [x] 도메인 연결 `eolmaji.com` (www·vercel.app → apex 308 영구 리다이렉트)
- [x] GA4 연결 (수집 실측 확인)
- [x] Google Search Console 등록 + 사이트맵 제출 + 색인 요청
- [x] 네이버 서치어드바이저 등록 + 사이트맵 제출 + 수집 요청
- [x] IndexNow 제출 (네이버·Bing·Yandex · 114 URL)
- [x] AdSense 코드 삽입 → 심사 신청 (2026-08-25)
- [x] `npm run verify` 통과

### AdSense 승인되면

- [ ] `public/ads.txt` 추가 — **없으면 광고 수익이 크게 줄어든다**
  ```
  google.com, pub-4960740109673485, DIRECT, f08c47fec0942fa0
  ```
- [ ] 광고 단위 생성 → 슬롯 ID를 Vercel 환경변수에 입력
  (`NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP` 등 4개) → 재배포
  슬롯 ID가 없으면 광고 자리가 렌더되지 않는다.
