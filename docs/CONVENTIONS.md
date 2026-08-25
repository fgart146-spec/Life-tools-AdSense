# 코딩 컨벤션

## 언어/타입
- TypeScript **strict**. `any` 금지(불가피하면 `unknown` + 좁히기).
- 공개 API(함수/컴포넌트 props)는 명시적 타입. 내부 지역변수는 추론에 맡긴다.
- 도메인 타입은 `src/lib/tools/types.ts` 등 한 곳에 두고 재사용한다. 같은 모양의 타입을 재정의하지 않는다.

## 파일/네이밍
- 컴포넌트 파일: `PascalCase.tsx`, 그 외 모듈: `kebab-case.ts`.
- 도구 id: `kebab-case` (예: `unit-price-100g`), URL slug와 별개로 관리(id는 불변, slug는 변경 시 redirect).
- 상수는 `UPPER_SNAKE`, 그 외 `camelCase`.

## 서버/클라이언트 컴포넌트
- 기본은 **서버 컴포넌트**. `'use client'`는 상태·이벤트가 필요한 최말단 컴포넌트에만.
- 클라이언트 컴포넌트에서 사전(dictionary) 전체를 import하지 않는다. 필요한 문자열만 props로 내려준다.
- 서버 전용 값(비밀키)은 `NEXT_PUBLIC_` 접두사 없이 사용하고 클라이언트에서 참조하지 않는다.

## 스타일
- Tailwind 유틸리티 우선. 반복되는 조합만 `components/ui`로 추출한다.
- 모바일 퍼스트. 본문 기본 글자 크기는 16px 이상, 결과 숫자는 크고 대비 높게.
- 터치 타깃 최소 44px. 숫자 입력은 `inputMode="decimal"`.
- 과한 그라데이션/애니메이션 금지. 색상은 `globals.css`의 토큰을 사용한다.

## 계산 로직
- `calc.ts`는 순수 함수만. `window`, `fetch`, React import 금지.
- 입력은 이미 파싱된 숫자 타입으로 받는다(문자열 파싱은 UI 레이어 책임).
- 반올림은 표시 직전에 한 번. 중간 계산에서 반올림 누적 금지.
- 각 `calc.ts`에는 `calc.test.ts`를 같이 둔다. 최소: 정상 케이스, 0/음수, 경계값, 단위 변환.

## SEO
- 페이지는 `lib/seo/metadata.ts`의 빌더를 통해서만 metadata를 만든다(직접 객체 작성 금지).
- H1은 페이지당 1개. 섹션은 H2/H3로 계층 유지.
- 키워드를 억지로 반복하지 않는다. 자연스러운 문장과 검색 의도 충족이 우선.

## 접근성
- 모든 입력에 `<label>` 연결. 아이콘 단독 버튼에는 `aria-label`.
- 결과 영역은 `aria-live="polite"`.
- 색상만으로 정보를 전달하지 않는다(텍스트 라벨 병행).

## 금지
- 사용자 계산을 서버로 보내는 코드
- 페이지뷰마다 DB/외부 API를 호출하는 코드
- 준비중/빈 페이지 공개
- 하드코딩된 비밀키
- 브랜드명·도메인 하드코딩(반드시 `src/config/site.ts` 경유)

## Phase 종료 시 필수 점검
```bash
npm run verify   # typecheck + lint + test + build
```
그리고 `docs/PHASE-LOG.md`에 9개 항목 점검표를 기록한다.

## 기준값(제도 종속 데이터) 취급

- 요율·요금표는 `src/lib/data/*.ts`에 모으고, `basisDate`와 출처를 함께 정의한다.
- 계산 함수는 요율을 **인자로 받을 수 있게** 만든다(관리자 기준값 주입용). 기본값은 코드 상수.
- 도구 content에 `basisDate`/`sources`를 넣으면 페이지 하단에 자동으로 표시된다.

## 새 가이드 추가

1. `src/guides/<slug>/meta.ts` — slug·카테고리·로케일·관련 도구
2. `src/guides/<slug>/content.<locale>.ts` — 리드·핵심 요약·섹션·FAQ
3. `src/guides/<slug>/index.ts` — 모듈 결합
4. `src/guides/metas.ts`, `src/guides/index.ts`에 등록

로케일 본문이 없으면 그 언어의 라우트와 링크는 자동으로 생성되지 않는다(깨진 링크 방지).

## 관리자 화면 작업 규칙

- 서버 액션은 항상 `requireAdmin()`으로 시작하고, 저장 후 `update_log`를 남긴다.
- 공개 페이지에 영향을 주는 저장은 `revalidateTag` + `revalidatePath('/', 'layout')`을 호출한다.
- 라우팅에 영향을 주는 값(공개 여부·slug)은 DB가 아니라 코드에서 관리한다.
