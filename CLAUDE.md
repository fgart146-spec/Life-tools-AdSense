# CLAUDE.md — 이 저장소에서 작업할 때의 규칙

## 기준 문서
1. `MASTER_SPEC.md` — 최상위 제품 명세. **임의 축소/변경 금지.**
2. `docs/ARCHITECTURE.md` — 구조 결정. 구조를 바꾸려면 이 문서를 먼저 갱신.
3. `docs/CONVENTIONS.md` — 코딩 규칙.
4. `docs/PHASE-LOG.md` — Phase별 점검 기록.

## 작업 방식
- 작업 종료 전 `npm run verify`(typecheck → lint → test → build → 정적 사이트 검사)를 통과시킨다.
- 빌드가 깨진 상태로 다음 작업을 시작하지 않는다.
- 새 도구를 추가할 때는 기존 도구 폴더 구조를 따른다:
  `definition.ts` / `calc.ts` / `calc.test.ts` / `Calculator.tsx` / `content.<locale>.ts` / `index.tsx`
  추가 후 `src/lib/tools/definitions.ts`(가벼운 목록)와 `src/lib/tools/registry.ts`(모듈)에 등록하면
  라우트·사이트맵·내부링크·카테고리 목록이 자동 반영된다.
- 같은 계산 구조가 반복되면 `src/components/tool/calculators/`의 공용 계산기를 재사용한다.

## 절대 하지 말 것
- 사용자 계산을 서버/DB로 보내기
- 공개 페이지 렌더 경로에서 Supabase 호출 (허용: 빌드/ISR 시점의 `lib/admin/*` 로더)
- 공개 경로에 미들웨어 추가 (`/admin`만 허용)
- 미완성·빈 페이지 공개 (`status: 'draft'`는 라우트가 생성되지 않는다)
- 기계번역만으로 en/ja 페이지 생성 — 로케일 content가 없으면 그 로케일 라우트를 만들지 않는다
- 계산 버튼/결과 옆 광고 배치
- 브랜드명·도메인 하드코딩 (`src/config/site.ts` 사용)
- AI 제안을 관리자 승인 없이 공개에 반영

## 자주 쓰는 명령
```bash
npm run dev
npm run verify
npm run test -- src/tools/unit-price-100g
npm run check:site
```
