# Phase 완료 점검 기록

각 Phase 종료 시 `MASTER_SPEC.md` 33장 형식으로 기록한다.

---

## [PHASE 0 완료 점검] — 프로젝트 규칙

1. **구현 완료 항목**
   - `MASTER_SPEC.md` 프로젝트 루트 보존
   - `README.md`(스택/명령/폴더구조), `CLAUDE.md`(작업 규칙)
   - `.env.example`(사이트/GA/AdSense/Supabase/자동화 구분), `.gitignore`
   - `docs/ARCHITECTURE.md`(렌더링·라우팅·i18n·도구엔진·SEO·광고·DB 결정), `docs/CONVENTIONS.md`, `docs/PHASE-LOG.md`
   - 폴더 구조 확정: `src/app`, `src/components`, `src/lib`, `src/tools`, `src/config`, `src/content`, `docs`, `scripts`
2. **아직 남은 항목**: git 저장소 초기화(사용자 확인 후 진행), Supabase 마이그레이션 폴더(PHASE 8)
3. **빌드 성공 여부**: 해당 없음(코드 없음)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 해당 없음
6. **기존 기능 회귀**: 기존 코드 없음(빈 디렉터리에서 시작)
7. **SEO 영향**: 없음
8. **비용/DB 영향**: 없음
9. **다음 Phase 주의점**: 로케일 세그먼트를 루트 레이아웃으로 쓰기로 결정 → `app/layout.tsx`를 만들지 말 것

---

## [PHASE 1 완료 점검] — Next.js 기본 구조

1. **구현 완료 항목**
   - Next.js 16.3.2(App Router) + React 19 + TypeScript strict(`noUncheckedIndexedAccess` 포함) + Tailwind v4
   - `src/app/[locale]/layout.tsx`를 루트 레이아웃으로 사용 → `<html lang>`이 로케일별로 정확히 출력됨
   - 디자인 토큰(`globals.css`): brand/ink 색상 스케일, 본문 17px, 포커스 링, 모션 감소 대응, number 스피너 제거
   - `Header`(모바일 메뉴는 `<details>`로 JS 없이 동작), `Footer`, `Container`, `Section`, `ToolCard`
   - 404(`[locale]/not-found.tsx` + `global-not-found.tsx`), 에러 바운더리(`[locale]/error.tsx`)
   - GA4 컴포넌트(측정 ID 없으면 스크립트 미로드)
   - 메인 페이지: 히어로 + 빠른 계산 CTA + 시즌/인기 도구 자리 + 카테고리 6개 + 신뢰 포인트
2. **아직 남은 항목**: `/tools`, `/category/[slug]`, `/guide` 라우트(PHASE 2~3, 7) — 헤더/푸터 링크가 그때까지 404
3. **빌드 성공 여부**: 성공 (`/ko`, `/en`, `/ja` 정적 생성)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 테스트 대상 로직 아직 없음(`--passWithNoTests`)
6. **기존 기능 회귀**: 없음
7. **SEO 영향**: metadata 빌더·JSON-LD 헬퍼를 구조 단계에서 선반영. 로케일별 canonical/hreflang 생성 준비 완료
8. **비용/DB 영향**: 전 페이지 정적 생성, 미들웨어 없음, DB 호출 0. 루트 리다이렉트는 `next.config` 라우팅 레이어 처리
9. **다음 Phase 주의점**: 도구/가이드가 없으면 목록 섹션이 비므로 PHASE 3 전까지 `/tools` 공개 금지

---

## [PHASE 2 완료 점검] — 다국어 기반

1. **구현 완료 항목**
   - `/ko` `/en` `/ja` 라우팅(`generateStaticParams` + `dynamicParams=false`), 루트 `/` → `/ko` 리다이렉트(next.config)
   - 사전 3종(ko/en/ja) — 기계번역이 아닌 각 언어에 맞춘 문장으로 작성
   - `buildMetadata()` 단일 진입점: title/description/canonical/hreflang/x-default/OG/Twitter 생성
   - 언어 전환 UI: 현재 경로 유지, 해당 언어에 페이지가 없으면 그 언어 홈으로 이동(404 방지)
   - `sitemap.xml`(로케일 대체 URL 포함), `robots.txt`
2. **아직 남은 항목**: `/guide` 라우트(PHASE 7), 정적 정책 페이지(PHASE 9)
3. **빌드 성공 여부**: 성공
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 18개 통과(포맷/반올림 유틸)
6. **기존 기능 회귀**: 없음
7. **SEO 영향**: 생성 HTML에서 canonical·hreflang(ko/en/ja/x-default)·og:locale 출력 확인
8. **비용/DB 영향**: 미들웨어 없음(로케일 감지 리다이렉트를 라우팅 레이어로 처리), DB 호출 0
9. **다음 Phase 주의점**: 도구는 `locales` 선언에 따라 라우트가 생성되므로, 한국 제도 종속 도구는 ko만 선언

---

## [PHASE 3 완료 점검] — 공통 Tool Engine

1. **구현 완료 항목**
   - 타입 체계: `ToolDefinition`(가벼움/클라이언트 안전) · `ToolContent<TCopy>`(로케일 본문) · `ToolModule` · `KeywordMap`
   - `defineTool()` 헬퍼로 도구별 copy 타입을 고정하면서 레지스트리에는 공통 타입으로 노출
   - 레지스트리 무결성 검사(빌드 중단 조건): 중복 id/slug, 예약어 충돌, slug 형식, 정의↔모듈 불일치, 선언 로케일 본문 누락
   - 공통 UI: `CalculatorShell`(입력/결과 2단, 모바일은 입력→결과), `NumberField`(모바일 숫자 키패드·천단위 자동 구분·커서 보정), `SelectField`, `SegmentedField`, `CheckboxField`, `ResultPanel/Headline/Rows/Notes/Issues/Callout`
   - 설명 섹션 템플릿: 계산 기준 / 공식 / 예시 / 주의사항 / FAQ(details 아코디언) / 관련 도구 / 관련 가이드 / 기준일·출처
   - 광고 슬롯 컴포넌트(환경변수 없으면 렌더 안 함) + 배치 규칙을 페이지 템플릿에 고정
   - 라우트: `/[locale]/[slug]`(도구), `/[locale]/tools`, `/[locale]/category/[category]`
   - JSON-LD: BreadcrumbList / WebApplication / FAQPage(실제 FAQ가 있을 때만)
   - 첫 도구 `unit-price-100g`(ko/en/ja) 구현 및 브라우저 동작 확인(16,800원 600g → 100g당 2,800원)
2. **아직 남은 항목**: 나머지 34개 도구(PHASE 4~6)
3. **빌드 성공 여부**: 성공 (정적 31페이지)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 37개 통과(구매/단가 엔진 + 도구 계산)
6. **기존 기능 회귀**: 없음 — 메인/카테고리/전체도구 페이지 정상
7. **SEO 영향**: 도구 페이지 metadata·JSON-LD·내부링크가 레지스트리에서 자동 생성됨
8. **비용/DB 영향**: 계산은 100% 클라이언트, 도구 페이지는 전부 SSG. 서버 요청/DB 호출 0
9. **다음 Phase 주의점**: 아직 만들지 않은 관련 도구 참조는 경고로만 처리되며 화면에서 자동 숨김. PHASE 6 종료 시 경고 0을 확인할 것

---

## [PHASE 4 완료 점검] — 핵심 쇼핑 도구 10개

1. **구현 완료 항목**
   - `compare-price`(뭐가 더 싼지 비교, ko/en/ja) — 쿠폰·카드할인·배송비·적립 반영 실구매가 → 단가 비교 → 1회/월/연 절약액
   - `unit-price-100g`, `unit-price-ml`(공용 UnitPriceCalculator), `unit-price-each`(하위 단위 지원) — ko/en/ja
   - `discount-price`(ko/en/ja), `card-coupon-price`(카드 할인 한도 반영, ko)
   - `bogo-1plus1`(ko/en/ja), `bogo-2plus1`(ko) — 공용 BogoCalculator, 단순 할인과 비교 기능
   - `bundle-price`(ko), `bulk-vs-small`(ko, 사용률 반영 실질 단가 + 손익분기 사용률)
   - 공용 계산 엔진: `lib/calc/purchase.ts`(할인 적용 순서·카드 한도), `lib/calc/unit-price.ts`, `lib/calc/bogo.ts`
2. **아직 남은 항목**: 없음 (쇼핑 카테고리 10개 완료)
3. **빌드 성공 여부**: 성공
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 101개 통과 (계산 엔진 + 도구별 계산)
6. **기존 기능 회귀**: 없음
7. **SEO 영향**: 도구별 KeywordMap·FAQ·예시 작성, 카테고리/관련도구 내부링크 자동 생성
8. **비용/DB 영향**: 전부 클라이언트 계산 + SSG. 서버 호출 0
9. **다음 Phase 주의점**: 제도 종속(전기·급여) 계산기는 기준값 모듈 + basisDate/출처 표기 필수

---

## [PHASE 5 완료 점검] — 생활비·가족 도구 12개

1. **구현 완료 항목**
   - 생활비·공과금 6개: `electricity-cost`(누진제 3단계·하계 완화·부가세/기금), `aircon-electricity`, `appliance-electricity`(공용 ApplianceElectricityCalculator, 누진 반영 추가요금), `heating-cost`(도시가스/지역난방/전기), `living-cost`(항목 비중·소득 대비), `grocery-budget`(주→월 환산 4.33주)
   - 가족·음식 6개: `meat-per-person`(비용 추정 포함), `rice-per-person`(밥물·계량컵), `camping-food`·`holiday-food`(공용 FoodListCalculator), `kimjang-cabbage`(절임 수율 반영), `kimjang-sauce`(절임배추 10kg 기준 비율)
   - 기준값 모듈 `lib/data/kr-electricity.ts` — basisDate·출처 URL 포함, PHASE 8에서 관리자 편집 대상
   - 계산 엔진: electricity / heating / living-cost / grocery-budget / portion / food-list / kimjang
2. **아직 남은 항목**: 없음 (12개 완료)
3. **빌드 성공 여부**: 성공 (정적 62페이지)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 176개 통과
6. **기존 기능 회귀**: 없음 — 기존 도구/라우트 정상
7. **SEO 영향**: 제도 종속 도구에 기준일·출처 노출, 시즌 도구(김장·에어컨 등)가 메인 시즌 추천과 연결됨
8. **비용/DB 영향**: 변화 없음(클라이언트 계산·SSG 유지)
9. **다음 Phase 주의점**
   - 전기요금 기준값은 2023-11-16 인상 기준. **공개 전 최신 요금표로 검증 필요**
   - `living-cost → salary-net` 참조 경고는 PHASE 6에서 해소됨

---

## [PHASE 6 완료 점검] — 직장·사업·집 도구 13개

1. **구현 완료 항목**
   - 직장·급여 5개: `salary-net`(연봉), `monthly-salary`(월급) — 공용 SalaryCalculator / `hourly-wage`(월↔시급 양방향, 209시간 기준) / `weekly-holiday-pay`(주 15시간 기준) / `severance-pay`(평균임금 기준)
   - 사업·판매 5개: `margin`(ko/en/ja), `target-price`(ko/en/ja), `break-even`(ko/en/ja), `cost-ratio`(ko), `roas`(ko, 손익분기 ROAS 포함)
   - 집·이사 3개: `area-converter`(평/㎡/sq ft, ko/en/ja), `moving-cost`(범위 ±25% 제시), `wallpaper`(로스 10% 반영)
   - 기준값 모듈 `lib/data/kr-payroll.ts` — 4대보험 요율·소득세 구간·최저임금, basisDate 표기
   - 계산 엔진: payroll(근로소득공제·세액공제 반영 근사) / wage / business / area
   - `DateField` 컴포넌트 추가(퇴직금 입·퇴사일)
2. **아직 남은 항목**: 없음 — **초기 35개 도구 전부 완료**
3. **빌드 성공 여부**: 성공 (정적 83페이지)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 271개 통과 (27개 테스트 파일)
6. **기존 기능 회귀**: 없음. 레지스트리 경고 0 (모든 관련 도구 참조가 실제 도구로 연결됨)
7. **SEO 영향**: 35개 도구 × 로케일 조합으로 도구 상세 페이지 생성, 카테고리 6개가 모두 채워짐
8. **비용/DB 영향**: 변화 없음 — 전 페이지 SSG, 계산은 클라이언트
9. **다음 Phase 주의점**
   - 급여·전기요금 기준값은 **공개 전 최신 고시로 검증** 필요 (요율은 매년 변경)
   - 소득세는 간이세액표가 아닌 근사 계산임을 각 페이지에 명시함
   - 가이드(PHASE 7)에서 `relatedGuides`에 이미 참조된 slug를 실제로 만들어야 링크가 살아남

---

## [PHASE 7 완료 점검] — 콘텐츠/가이드 15개

1. **구현 완료 항목**
   - 가이드 시스템: `src/guides/<slug>/{meta,content.<locale>,index}` + 라이트 메타 인덱스(`metas.ts`) / 서버 모듈(`index.ts`) 분리
   - 라우트: `/[locale]/guide`(목록), `/[locale]/guide/[slug]`(본문, 본문 있는 로케일만 생성)
   - 가이드 본문 구조: 리드 → 핵심 요약 → 섹션(H2 + 문단 + 목록) → FAQ → 관련 도구 → 면책
   - JSON-LD: Article + BreadcrumbList + FAQPage, 읽는 시간 자동 계산
   - 한국어 가이드 15편 (단가/대용량/1+1/쿠폰·카드/전기요금/에어컨/생활비/고기량/김장/실수령액/주휴수당/마진/판매가/손익분기/ROAS)
   - 영어·일본어 각 3편 (단가 기본, 대용량, 마진, 손익분기 중 핵심)
   - 메인 화면에 '최신 가이드' 섹션 추가
   - 도구 페이지의 `relatedGuides` 참조가 모두 실제 가이드로 연결됨 (깨진 링크 0)
2. **아직 남은 항목**: en/ja 가이드 확대(현재 각 3~4편), 스펙 21장의 나머지 주제는 기존 15편에 통합
3. **빌드 성공 여부**: 성공 (정적 109페이지)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 271개 통과 (가이드는 데이터 모듈이라 별도 단위 테스트 불필요, 레지스트리 검증이 빌드 타임에 수행)
6. **기존 기능 회귀**: 없음
7. **SEO 영향**: 도구 ↔ 가이드 상호 내부링크 완성, Article 구조화 데이터 추가
8. **비용/DB 영향**: 없음 — 가이드 본문도 저장소 내 TS 모듈이라 DB 조회 0
9. **다음 Phase 주의점**: 관리자(PHASE 8)에서 가이드를 편집하게 되면, 저장소 모듈과 DB 콘텐츠의 우선순위 규칙을 명확히 정해야 함

---

## [PHASE 8 완료 점검] — Supabase 관리자

1. **구현 완료 항목**
   - 스키마 `supabase/migrations/0001_init.sql`: admin_profiles, basis_values, tool_notes, seasonal_slots, site_settings, search_insights, ai_suggestions, update_log + **RLS 전면 적용**(anon 접근 불가, `is_admin()` 기반)
   - Supabase 클라이언트 3종: 서버 세션용 / 관리자 전용 / **정적 생성 시점 읽기 전용**(service role)
   - `middleware.ts` — `/admin/:path*` 에만 적용(공개 페이지에는 미들웨어 없음)
   - 관리자 화면: 로그인 · 대시보드(도구/언어별 현황·기준값 상태·변경 이력·재생성 버튼) · 도구 검토 메모 · 기준값 편집 · 시즌 추천 편집 · 설정
   - 서버 액션에 관리자 확인 + `update_log` 기록 + `revalidateTag/revalidatePath` 재생성
   - **기준값 주입 파이프라인 완성**: 관리자 저장 → DB → 재생성 시 `getEffectiveBasis()` → 도구 페이지가 계산기에 요율 전달 → 전기요금·급여 계산에 반영
   - 시즌 추천도 동일 방식(`getSeasonalToolIds`)으로 DB 값 우선, 없으면 코드 기본값
   - Supabase 미설정 시: 관리자 화면은 설정 안내, 공개 사이트는 코드 기본값으로 정상 동작
2. **아직 남은 항목**: 가이드 본문 편집(현재는 저장소 관리), 검색 데이터·AI 제안 화면(PHASE 10)
3. **빌드 성공 여부**: 성공 (정적 110페이지 + 관리자 동적 라우트)
4. **TypeScript 오류**: 없음
5. **테스트 결과**: 271개 통과
6. **기존 기능 회귀**: 없음. 공개 페이지는 여전히 SSG이며 런타임 DB 호출 0
7. **SEO 영향**: 관리자 영역은 `robots: noindex`, sitemap 제외, robots.txt에서 `/admin` disallow
8. **비용/DB 영향**
   - 공개 페이지: DB 호출 0 (빌드/재생성 시점에만 조회, `unstable_cache`로 1일 캐시)
   - 미들웨어: `/admin`에만 실행 → 일반 트래픽에 함수 실행 비용 없음
9. **다음 Phase 주의점**: 실제 Supabase 프로젝트 연결 후 `supabase/README.md` 절차대로 관리자 계정을 등록해야 접근 가능

---

## [PHASE 9 완료 점검] — SEO / AdSense 준비

1. **구현 완료 항목**
   - 정적 페이지 5종 × 3언어: `/about` `/contact` `/privacy` `/terms` `/disclaimer` (플레이스홀더가 아닌 실제 초안)
     - privacy: 계산 입력값 비전송 원칙, GA4·Search Console·AdSense 쿠키 고지, 광고 개인설정 해제 안내
     - disclaimer: 참고용 고지, 제도 종속 값의 기준일, 입력 오류 가능성, 공식기관 확인 안내
   - 푸터에 정책 링크 노출, 사이트맵에 정적 페이지 포함 (총 120 URL)
   - AdSense 로더 스크립트를 레이아웃에 추가(게시자 ID 없으면 미로드), 광고 슬롯은 결과 이후 위치에만 배치
   - 로케일별 OG 이미지(`opengraph-image`)를 빌드 시점에 정적 생성
   - robots.txt: `/admin`, `/api/` 차단 + 사이트맵 지정
2. **아직 남은 항목**: 실제 AdSense 게시자·슬롯 ID 입력(승인 후), 쿠키 동의 배너(EU 트래픽 발생 시)
3. **빌드 성공 여부**: 성공 (정적 128페이지)
4. **TypeScript 오류**: 없음 / 5. **테스트**: 271개 통과 / 6. **회귀**: 없음
7. **SEO 영향**: canonical·hreflang·OG·Twitter·JSON-LD 전 페이지 적용 확인, 사이트맵 120 URL
8. **비용/DB 영향**: 변화 없음
9. **다음 Phase 주의점**: AdSense 심사 전 도메인·연락처·브랜드명을 실제 값으로 교체할 것

---

## [PHASE 10 완료 점검] — 자동화 기반

1. **구현 완료 항목**
   - Search Console 연동(`lib/automation/search-console.ts`): 서비스 계정 JWT 서명 → 액세스 토큰 → searchAnalytics 조회. 미설정 시 null 반환
   - 규칙 기반 분석(`analyze.ts`): 저 CTR(노출 100+ / CTR 2% 미만) → SEO 개선, 평균순위 5~20위 → 본문 보강, 미대응 검색어 → 신규 도구 후보
   - AI 보강(`ai.ts`): `ANTHROPIC_API_KEY`가 있을 때만 제안 '설명'을 다듬음. 실패해도 규칙 기반 결과로 진행. 공개 콘텐츠를 자동 변경하지 않음
   - Cron 라우트 `/api/cron/search-insights`: CRON_SECRET 인증, 지표 upsert, 중복 제안 방지, update_log 기록
   - `vercel.json` — 주 1회(월요일 03:00 UTC) 실행
   - 관리자 `/admin/insights`: 연동 상태, 검토 대기 제안(승인/거절), 검색 성과 상위 30
2. **아직 남은 항목**: 승인된 제안을 실제 도구/가이드로 만드는 것은 코드 작업(의도된 설계)
3. **빌드 성공 여부**: 성공 / 4. **TypeScript 오류**: 없음 / 5. **테스트**: 271개 통과 / 6. **회귀**: 없음
7. **SEO 영향**: 검색 데이터 기반 개선 루프 확보 (Search Console → 분석 → 관리자 승인)
8. **비용/DB 영향**: cron 주 1회만 외부 API 호출. 공개 페이지 영향 0
9. **다음 Phase 주의점**: AI 승인 흐름은 "AI 초안 → 관리자 검토 → 승인 → 공개" 원칙을 코드로 강제함(자동 공개 경로 없음)

---

## [PHASE 11 완료 점검] — 전체 품질 검사

1. **구현 완료 항목**
   - 자동 검사 스크립트 `scripts/check-static-site.mjs` 추가, `npm run verify`에 편입
     (typecheck → lint → test → build → 정적 사이트 검사)
   - 검사 결과: HTML 122개 / 라우트 120개 / **내부 링크 2,514건 중 깨진 링크 0**
   - 페이지당 H1 1개, canonical·hreflang(x-default 포함)·title·description 전 페이지 존재
   - 클라이언트 번들 22개에서 비밀키 문자열(SUPABASE_SERVICE_ROLE_KEY / ANTHROPIC_API_KEY / CRON_SECRET / GSC_*) 참조 0건
   - 404 개선: 로케일 밖 경로도 경로에서 언어를 인식해 해당 언어 404를 표시(도구 목록 CTA 포함)
2. **모바일 점검** (375×812)
   - 가로 스크롤 0px, 뷰포트 초과 요소 0개
   - 입력/버튼 컨트롤 높이 40px 미만 0개 (터치 타깃 확보)
   - 본문 기본 글자 크기 17px
3. **기능 점검 (실제 브라우저)**
   - `/ko/salary-net` 연봉 4,000만원 → 월 실수령 2,920,613원, 공제율 12.4% (공제 항목별 내역 표시)
   - `/ko/compare-price` 600g 16,800원 vs 1.2kg 30,000원 → B 10.7% 저렴, 연 21,600원 차이
   - `/ja/margin` 2,000엔·원가 1,000엔·수수료 10%·송료 300엔 → 이익 500엔, 이익률 25%, 손익분기 1,444엔
   - 콘솔 오류 0건 (신규 탭 기준)
4. **성능**
   - 전 공개 페이지 정적 생성(SSG), 미들웨어는 `/admin`에만 적용
   - 페이지 JS: 홈 742KB(비압축) / gzip 기준 약 200KB — Next.js + React 런타임이 대부분
   - 도구 계산기는 페이지별 청크로 분리, 사전(dictionary)은 서버에서만 로드
5. **보안**
   - 서비스 롤 키·API 키는 서버 전용 모듈에서만 참조, 클라이언트 번들 미포함(자동 검사)
   - Supabase RLS 전 테이블 적용, anon 접근 불가
   - 보안 헤더(X-Content-Type-Options / Referrer-Policy / X-Frame-Options) 적용
   - cron 라우트는 CRON_SECRET Bearer 인증
6. **DB 사용 감사**
   - 공개 페이지 런타임 DB 호출 **0건** (빌드/ISR 재생성 시점에만 조회, `unstable_cache` 1일)
   - 계산은 100% 브라우저에서 수행, 입력값 서버 전송 없음
7. **서버 비용 감사**
   - 정적 페이지 128개 → CDN 제공, 사용자 트래픽당 함수 실행 없음
   - 함수 실행 경로: `/admin/*`(관리자), `/api/cron/*`(주 1회), 미들웨어(`/admin`만)
8. **남은 확인 사항 (공개 전 필수)**
   - 전기요금·4대보험·최저임금 기준값을 최신 고시로 검증 (현재 각각 2023-11-16 / 2025-01-01 기준)
   - `NEXT_PUBLIC_SITE_URL`, 브랜드명, 연락처 이메일을 실제 값으로 교체
   - Supabase 프로젝트 연결 + 마이그레이션 적용 + 관리자 계정 등록
   - AdSense 승인 후 게시자·슬롯 ID 입력
9. **결론**: 빌드·타입·린트·테스트(271개)·정적 사이트 검사 모두 통과. 초기 공개 가능한 상태

---

## [기준값 검증] 2026-08-25 — 제도 종속 값 최신화

공개 전 필수 항목이던 "기준값 검증"을 공식 출처와 대조해 완료했다.

### 변경된 값

| 항목 | 이전 | 변경 | 근거 |
| --- | --- | --- | --- |
| 국민연금 (근로자) | 4.5% | **4.75%** | 연금개혁으로 2026년 9%→9.5%, 2033년까지 매년 0.5%p 인상 |
| 건강보험 (근로자) | 3.545% | **3.595%** | 보건복지부 발표 2026년 건강보험료율 7.19% |
| 장기요양보험 | 건보료의 12.95% | **13.14%** | 2026년 장기요양보험료율 0.9448% ÷ 7.19% |
| 국민연금 기준소득월액 | 39만~617만 | **41만~659만** | 2026-07-01 ~ 2027-06-30 적용 |
| 최저임금 | 10,030원 | **10,320원** | 고용노동부 2026년 적용 최저임금 고시 |
| 전력산업기반기금 | 3.7% | **2.7%** | 2024-07 3.2% → 2025-07 2.7% 인하 |
| 자녀세액공제 | 15/35/+30만 | **25/55/+40만** | 2026년 귀속 인상 |
| 자녀세액공제 연령 | 8~20세 | **9~20세** | 2026년 귀속부터 매년 1세씩 상향 |

### 확인 결과 변경 없음

- 주택용 전기 요금표(저압 910/1,600/7,300 · 120.0/214.6/307.3, 고압 730/1,260/6,060 · 105.0/174.0/242.3) — 2023-11-16 인상분이 계속 적용(민수용 요금 연속 동결)
- 기후환경요금 9.0원/kWh, 연료비조정요금 +5원/kWh
- 고용보험 실업급여 근로자 0.9% (동결)
- 소득세 기본세율 8구간(6~45%) — 2023년 귀속분부터 유지, 2026년 개인 소득세율 변경 없음

### 기능 추가

- **슈퍼유저 요금 구간 신설**: 하계(7~8월)·동계(12~2월) 1,000kWh 초과분에 저압 736.2원/kWh, 고압 601.3원/kWh 적용.
  `ElectricityTariff.winterTiers` 추가, `calcElectricity`가 하계/동계/평시를 구분.

### 함께 고친 구조적 결함 (중요)

`getEffectiveBasis()`가 **코드 기본값까지 포함한 결과를 `unstable_cache`에 담고 있었다.**
그 결과 요율 상수를 고쳐도 캐시(1일)가 만료될 때까지 옛 요율이 계산기에 주입되어,
빌드 산출물에 구 요율(0.045 등)이 그대로 남는 문제가 실제로 발생했다.

→ **캐시에는 DB에서 읽은 원본만 담고, 코드 기본값은 캐시 밖에서 매번 합치도록 변경**했다.
`getSeasonalToolIds()`도 같은 방식으로 수정했다.

### 검증

- 단위 테스트 275개 통과 (슈퍼유저·2026 요율 케이스 4개 추가)
- 빌드 산출물에서 요율 확인: `0.0475` / `0.03595` / `0.1314` / `powerFundRate:0.027`
- 브라우저 실측
  - 연봉 4,000만원 → 월 실수령 **2,912,418원** (공제율 12.6%) — 본문 예시와 일치
  - 고압 350kWh 5월 → **60,010원** — 본문 예시와 일치
  - 고압 1,100kWh 8월 → 1,000kWh 초과 100kWh에 슈퍼유저 601.3원 적용 확인
- `npm run verify` 전체 통과 (깨진 링크 0, 메타데이터 정상, 비밀키 노출 없음)

---

## [생활백과 통합] 2026-08-25 — "어떻게 하지?" 축 추가

계산 도구('얼마지?')만 있던 사이트에 생활 문제 해결 콘텐츠를 같은 도메인으로 통합했다.
새 도메인·서브도메인·새 Vercel 프로젝트를 만들지 않았다.

### 구조

기존 가이드 시스템과 동일한 4파일 규약을 따랐다.

```
src/lib/life/   categories(7) · types · index(가벼운 메타) · registry(서버 전용) · seasonal
src/life/<slug>/  meta.ts / content.ko.ts / index.ts
```

`registry.ts`가 빌드 시 검증한다: 중복 slug, 존재하지 않는 관련 문서·도구 참조,
자기 자신 참조, 선언된 로케일의 본문 누락.

### 라우트 (+20, 전부 정적)

| 경로 | 수 |
| --- | --- |
| `/[locale]/life` | 1 |
| `/[locale]/life/[category]` | 7 |
| `/[locale]/life/[category]/[slug]` | 12 |

- 문서가 없는 로케일/카테고리는 라우트를 만들지 않는다(en/ja `/life`는 404).
- URL의 카테고리와 문서의 실제 카테고리가 다르면 404 — 중복 URL을 만들지 않는다.
- `life`를 도구 예약 슬러그에 추가해 라우팅 충돌을 막았다.

### 콘텐츠 12편

7개 카테고리를 모두 채워 빈 카테고리가 생기지 않게 배분했다.
모든 문서가 같은 구조를 따른다: 한 줄 답 → 빠른 해결 → 준비물 → 단계 →
주의사항 → 상황별 → 원인 → 재발 방지 → FAQ → 관련 문서 → 관련 도구 → 출처.

안전 원칙(명세 18장)에 따라 염소계 + 산성 세정제 혼합 금지를 개별 주의사항과
공통 안내 문구 양쪽에 배치했다.

### 탐색 UX

검색과 선택형 도우미(어디에/무슨 문제)를 **클라이언트 정적 필터**로 구현했다.
검색 인덱스는 빌드 시점에 만들어 props로 전달한다 — 입력마다 발생하는 네트워크 요청 0건을
브라우저에서 실측 확인했다.

### 내부링크

문서 → 도구, 도구 → 문서 양방향. `relatedTools`에 **선언된 관계만** 사용하고
추측으로 잇지 않는다. 실제 연결 예:

- 가전제품 전기료 계산기 ↔ 수건 쉰내 / 세탁기 냄새 / 드럼세탁기 청소
- 벽지 필요량 계산기 ↔ 욕실 곰팡이 제거

### 검증

- 라우트 114 → 134, 내부 링크 2,268 → 2,836, **깨진 링크 0**
- 모바일 360/390/430 × 10페이지 **가로 스크롤 0**
- 콘솔 에러 0 (하이드레이션 오류 없음)
- JSON-LD: BreadcrumbList + Article + FAQPage
- **기존 계산기 회귀 없음**: 연봉 4,000만 → 2,912,418원 (변경 전과 동일)
- 사이트맵 134개 URL 전수 응답 200
- 페이지뷰당 DB/API 호출 0건 (본문이 저장소 TS 모듈이라 트래픽이 늘어도 비용이 늘지 않는다)
