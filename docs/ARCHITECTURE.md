# 아키텍처 설계서

`MASTER_SPEC.md`의 요구사항을 실제 코드 구조로 옮긴 결정 기록이다.
결정이 바뀌면 이 문서를 먼저 고치고 코드를 고친다.

---

## 1. 렌더링 전략 (비용 최우선)

| 페이지 | 전략 | 이유 |
| --- | --- | --- |
| 메인 `/[locale]` | SSG (+ 시즌 배너는 빌드/ISR 시점 결정) | 페이지뷰당 서버 연산 0 |
| 도구 상세 `/[locale]/[slug]` | SSG (`generateStaticParams`) | 계산은 클라이언트, 서버 호출 없음 |
| 카테고리 허브 | SSG | 레지스트리에서 빌드 타임에 목록 생성 |
| 가이드 | SSG | 원고는 저장소 내 TS 모듈 |
| 정책 페이지 | SSG | 정적 텍스트 |
| `/admin/*` (PHASE 8) | 동적 + 인증 | 관리자만 접근, 트래픽 미미 |

- **미들웨어를 쓰지 않는다.** 로케일 감지/리다이렉트는 `next.config.ts`의 `redirects()`(라우팅 레이어에서 처리, 함수 실행 없음)로 대체한다.
- 공개 라우트에서 Supabase를 호출하지 않는다. 관리자 기준값 변경 → DB 저장 → **재빌드/ISR revalidate** → 정적 페이지 반영 흐름만 사용한다.
- 클라이언트 컴포넌트는 계산기 폼과 언어 스위처 등 상호작용 지점에만 둔다.

## 2. 라우팅 / URL 정책

```text
/                              → /ko (307, next.config redirects)
/[locale]                      메인
/[locale]/tools                전체 도구 목록
/[locale]/category/[category]  카테고리 허브 (6개)
/[locale]/[slug]               도구 상세 (예: /ko/unit-price)
/[locale]/guide                가이드 목록
/[locale]/guide/[slug]         가이드 상세
/[locale]/about|contact|privacy|terms|disclaimer
/sitemap.xml  /robots.txt
```

- 정적 세그먼트(`tools`, `guide`, `about` …)가 동적 `[slug]`보다 우선 매칭되므로 충돌하지 않는다.
  단, **도구 slug는 예약어와 겹치면 안 된다** (`lib/tools/registry.ts`에서 빌드 타임 검증).
- slug는 영문 소문자 + 하이픈. 로케일마다 동일 slug를 쓴다(운영/분석 단순화, hreflang 매칭 명확).
- slug 변경 시 `next.config.ts`에 301 redirect를 남긴다.

## 3. 다국어 (i18n)

- 지원 로케일: `ko`(기본), `en`, `ja`. `src/lib/i18n/config.ts`가 단일 소스.
- UI 문자열은 `src/lib/i18n/dictionaries/*.ts` (서버에서만 import → 클라이언트 번들 부담 없음).
- **도구는 로케일별 제공 여부를 스스로 선언한다** (`ToolDefinition.locales`).
  - 범용 계산(단가/할인/마진/면적 등) → `['ko','en','ja']`
  - 한국 제도 종속(급여 실수령액, 전기요금, 주휴수당 등) → `['ko']`
  - 이렇게 해서 "제도가 다른 계산기를 번역만 해서 노출"하는 금지사항을 구조적으로 차단한다.
- `hreflang`은 **실제 존재하는 로케일 URL만** 출력한다. `x-default`는 기본 로케일(ko) URL.
- 로케일별 본문(`content.<locale>.ts`)이 없으면 그 로케일 라우트를 생성하지 않는다 → 빈 페이지/기계번역 페이지가 생길 수 없다.

## 4. 도구 엔진

```text
ToolDefinition {
  id, slug, category, icon, status, updatedAt, locales[],
  keywords: Record<locale, KeywordMap>,
  content:  Record<locale, ToolContent>,
  related:  toolId[]
}
```

- `src/tools/<id>/calc.ts` — **UI/프레임워크 의존이 없는 순수 함수.** 입력 타입/출력 타입 명시, Vitest로 검증.
- `src/tools/<id>/Calculator.tsx` — `'use client'`. 폼 상태만 관리하고 계산은 `calc.ts` 호출.
- `src/tools/<id>/content.<locale>.ts` — H1/설명/계산기준/공식/예시/주의사항/FAQ/출처.
- `src/lib/tools/registry.ts` — 모든 도구를 모아 조회 헬퍼 제공. 중복 slug/예약어/깨진 relatedTools를 빌드 타임에 검출.
- 페이지 템플릿(`ToolPage`)이 공통 UX 순서를 강제한다:
  `H1 → 설명 → 계산기 → 결과 → 결과 해석 → [광고] → 계산기준/공식/예시 → 주의사항 → FAQ → [광고] → 관련 도구/가이드 → 업데이트 기준일·출처`

## 5. 계산 품질

- 금액은 부동소수점 누적 오차를 피하기 위해 `lib/math/decimal.ts`의 헬퍼(정수 스케일링 + 명시적 반올림)를 쓴다.
- 모든 `calc.ts`는 0/음수/빈값/과대값을 명시적으로 처리하고, 실패 시 예외 대신 `issues[]`를 돌려준다(UI가 안내 문구로 표시).
- 제도 종속 계산기는 `content`에 `basisDate`(기준일)와 `sources[]`를 필수로 갖는다.

## 6. SEO

- `lib/seo/metadata.ts`가 title/description/canonical/alternates/OG/Twitter를 한 곳에서 생성한다.
- JSON-LD: `BreadcrumbList`(전 페이지), `SoftwareApplication` 또는 `WebApplication`(도구), `FAQPage`(FAQ가 실제 존재할 때만), `Article`(가이드).
- `sitemap.ts`는 레지스트리·가이드 목록에서 자동 생성하며 로케일 URL과 `alternates.languages`를 포함한다.
- 내부 링크는 `related` 메타데이터에서 자동 생성 → 고아 페이지가 생기지 않는다.

## 7. 광고

- `components/ads/AdSlot.tsx`는 `NEXT_PUBLIC_ADSENSE_CLIENT`와 해당 슬롯 ID가 모두 있을 때만 렌더한다.
  없으면 **아무것도 렌더하지 않는다**(빈 박스/“광고 자리” 표시 금지 — AdSense 심사에 불리).
- 허용 위치: 결과 해석 아래, 설명 콘텐츠 아래, 페이지 하단. 계산 버튼/결과 카드 인접 배치 금지.

## 8. 데이터 / Supabase (PHASE 8)

- 역할: 관리자 인증, 도구 메타데이터·기준값, 가이드, 시즌 구성, 검색데이터 분석 결과, AI 제안 승인 상태.
- 공개 페이지는 DB를 직접 읽지 않는다. 관리자 저장 → revalidate로 정적 결과 갱신.
- 스키마 변경은 `supabase/migrations/*.sql`로 관리한다.

---

## 9. 관리자·자동화 (PHASE 8·10에서 추가)

### 데이터 흐름 원칙

```text
관리자 저장 → Supabase → (재생성 트리거) → 정적 페이지/계산기에 반영
                                   ↑
                     사용자 요청 경로에는 DB가 없다
```

- 공개 페이지에서 DB를 읽는 지점은 두 곳뿐이며, 모두 `unstable_cache`(1일)로 감싸 **정적 생성/재생성 시점**에만 호출된다.
  - `lib/admin/basis.ts` — 전기요금·4대보험 요율
  - `lib/admin/seasonal.ts` — 메인 시즌 추천 구성
- 두 함수 모두 Supabase 미설정·조회 실패 시 **코드 기본값**으로 되돌아간다. 사이트는 DB 없이도 동작한다.
- 기준값은 `ToolModule.render(locale, { basis })` → `CalculatorProps.basis`로 계산기에 주입된다.
  계산 함수(`calcElectricity`, `calcSalary`)는 요율을 인자로 받아 코드 기본값을 대체할 수 있다.

### 관리자 영역

- `app/admin/*` 는 `[locale]` 트리와 분리된 자체 루트 레이아웃을 가지며 `noindex`이고 sitemap·robots에서 제외된다.
- 인증은 Supabase Auth + `admin_profiles` 테이블 이중 확인(로그인만으로는 접근 불가).
- 세션 갱신을 위한 미들웨어는 `matcher: ['/admin/:path*']` 로 제한한다. 공개 트래픽에는 미들웨어가 실행되지 않는다.
- 모든 쓰기 작업은 서버 액션에서 관리자 확인 → 저장 → `update_log` 기록 → `revalidateTag`/`revalidatePath` 순으로 처리한다.

### 자동화

- `/api/cron/search-insights` (주 1회, `vercel.json`): Search Console → 지표 저장 → 규칙 기반 제안 생성 → (선택) Claude API로 설명 보강 → `ai_suggestions`에 `pending` 저장.
- 승인 흐름은 코드로 강제된다: **AI 초안 → 관리자 승인 → 코드 작업 → 배포**. 자동 공개 경로는 존재하지 않는다.
