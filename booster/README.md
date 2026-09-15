# 이웃부스터 홈페이지 (`booster/`)

`https://booster.eolmaji.com` 에 배포되는 **이웃부스터 전용 제품 홈페이지**입니다.
생활계산소(루트 앱, `eolmaji.com`)와 같은 저장소에 있지만 **별도 앱·별도 빌드·별도 Vercel 프로젝트**로 동작하며,
코드·브랜드·비밀키·분석 ID·robots·sitemap 을 공유하지 않습니다.

## 실행 · 빌드 · 검증

모든 명령은 `booster/` 디렉터리에서 실행합니다.

```bash
cd booster
npm install          # 최초 1회 (루트 node_modules 와 별개)
npm run dev          # http://localhost:3100
npm run build        # 운영 빌드 (Vercel 이 실행하는 명령)
npm run typecheck    # tsc --noEmit
npm run verify       # typecheck → preview 빌드+검사 → production 빌드+검사
```

`npm run verify` 는 두 번 빌드합니다.
- `SITE_ENV=preview` 빌드 → 모든 페이지에 noindex 가 **있어야** 통과
- `SITE_ENV=production` 빌드 → 공개 페이지에 noindex 가 **없어야** 통과, canonical·og:url·사이트맵·robots 가 `https://booster.eolmaji.com` 기준인지, 내부 링크가 전부 실제 페이지인지, `0원`·`TODO` 같은 문자열이 화면에 없는지 검사

배포 환경 판정: `SITE_ENV` 가 있으면 그 값, 없으면 Vercel 의 `VERCEL_ENV`(production / preview). 운영이 아니면 **메타 noindex + `X-Robots-Tag: noindex` 헤더 + robots.txt 전체 차단** 세 가지가 함께 적용됩니다.

## 운영자가 수정할 위치

| 무엇을 | 어디서 |
|---|---|
| 가격, 구독 주기 | `src/data/product.ts` → `plans.*.tiers[].price` (`amount: null` 이면 화면에 "이용 요금 문의") |
| AI 일일 한도 | `plans.ai.tiers[].aiDailyLimit` (`null` 이면 "문의 시 안내") |
| 기능 설명·사용 상황 | `features[]` (`verification` 으로 확인 상태 관리) |
| 체험 조건 | `trial` (`conditions` 가 `null` 이면 "문의 시 안내") |
| 판매 페이지 링크 | `sales` → `status: 'live'`, `buttonMode: 'link'`, `url` 을 넣으면 구매 버튼이 판매 페이지로 감. 그 전엔 "구매 문의" |
| 다운로드 버튼 | `sales.downloadUrl` — 실제 배포 파일 URL 과 조건이 확인되기 전엔 `null` 유지 (버튼 없음) |
| 지원 운영체제·버전 | `support.os`, `support.versions` |
| 실제 캡처 사용 여부 | `assets` — 현재는 설명용 예시 화면만 사용하며 화면에 그렇게 표시됨 |
| 가이드 목록·공개 여부·수정일 | `guides[]` (`status: 'draft'` 면 목록·사이트맵에서 제외) — 본문은 `src/app/guide/<slug>/page.tsx` |
| FAQ | `faq[]` (`featured: true` 면 메인에 노출). FAQ 페이지 구조화 데이터도 같은 배열에서 생성 |
| 문의 채널 URL | `src/config/site.ts` → `contact.kakaoOpenChat` |
| 분석 ID | 환경변수 `NEXT_PUBLIC_GA_ID` (비우면 측정 비활성, 스크립트 미로드) |
| 사이트 이름·설명·독립 제품 고지 | `src/config/site.ts` |

메인 요약·가격표·FAQ·가이드가 모두 `product.ts` 의 같은 값을 읽으므로 한 곳만 고치면 됩니다.
`unconfirmed` 객체의 문구가 미확정 항목의 화면 안내 문장입니다.

## 배포 (Vercel — 별도 프로젝트)

루트 프로젝트(`life-tools-ad-sense`, eolmaji.com)는 그대로 두고 **새 프로젝트를 하나 더** 만듭니다.

1. Vercel → **Add New → Project** → 같은 GitHub 저장소(`fgart146-spec/Life-tools-AdSense`) 선택
2. **Root Directory** 를 `booster` 로 지정 (Edit 버튼) — 이게 핵심입니다
3. Framework Preset: Next.js (자동 감지), Build Command: `next build`(기본), Output: 기본
4. 환경변수: 필수 없음. 선택 `NEXT_PUBLIC_GA_ID`
5. Deploy → `*.vercel.app` 미리보기 주소로 먼저 확인 (이때는 noindex 상태가 정상)
6. 프로젝트 **Settings → Domains** 에 `booster.eolmaji.com` 추가 → Vercel 이 **필요한 DNS 레코드 값을 화면에 표시**합니다

선택: 두 프로젝트가 서로 무관한 변경에 빌드를 낭비하지 않게 **Settings → Git → Ignored Build Step** 을 둘 수 있습니다.
- booster 프로젝트: `git diff --quiet HEAD^ HEAD -- .` (booster/ 변경 없으면 건너뜀)
- 루트 프로젝트: `git diff --quiet HEAD^ HEAD -- . ':(exclude)booster'`

### DNS (가비아)

- `booster` 이름의 **CNAME** 레코드 하나만 추가합니다. **값은 Vercel Domains 화면에 표시된 값을 그대로** 씁니다 — 이 문서에 추정값을 적지 않습니다.
- 기존 `eolmaji.com`, `www`, MX·TXT 레코드는 삭제·교체하지 않습니다. 네임서버 이전, 와일드카드 추가도 하지 않습니다.
- 이미 `booster` 레코드가 있으면 덮어쓰지 말고 무엇을 가리키는지 먼저 확인합니다(충돌).
- 반영 후 Vercel Domains 화면이 "Valid Configuration" 이 되면 HTTPS 인증서가 자동 발급됩니다.

### 확인 방법

```bash
curl -I https://booster.eolmaji.com/            # 200, HTTPS
curl -s https://booster.eolmaji.com/robots.txt   # Allow: / + Sitemap 주소
curl -s https://booster.eolmaji.com/sitemap.xml  # 8개 URL
curl -I https://booster.eolmaji.com/없는페이지/   # 404
```

### 되돌리기

- Vercel booster 프로젝트 → Deployments → 이전 배포 **Promote to Production** (루트 프로젝트와 무관)
- 코드는 `booster/` 와 루트의 격리 설정(`tsconfig.json` exclude, `eslint.config.mjs` ignores, `.gitignore`)만 되돌리면 됩니다

## Search Console · 검색 등록

- 기존 속성 `sc-domain:eolmaji.com` 은 **도메인 속성**이라 하위 도메인 `booster.eolmaji.com` 이 자동으로 범위에 포함됩니다.
- 이웃부스터만 따로 보려면 `https://booster.eolmaji.com/` **URL 접두어 속성**을 추가할 수 있습니다(같은 계정이면 도메인 속성 인증으로 자동 확인).
- 사이트맵 제출: 속성 → Sitemaps → `https://booster.eolmaji.com/sitemap.xml`
- 대표 페이지 URL 검사 → 색인 생성 요청: `/`, `/pricing/`, `/features/`
- 네이버 서치어드바이저: 별도 사이트로 `https://booster.eolmaji.com` 등록 후 사이트맵 제출

배포 → DNS 연결 → HTTPS → 소유권 확인 → 사이트맵 제출 → 실제 색인 → 검색 순위는 각각 다른 단계입니다. 앞 단계가 끝났다고 뒤 단계가 보장되지 않습니다.

## 아직 확인되지 않은 제품·운영 정보

화면에는 전부 "문의 시 안내" 로 표시되며, 확인되면 `product.ts` 한 곳만 고칩니다.

- 이용권별·등급별 가격, AI 이용권 구독 주기
- 등급별 AI 일일 사용량 수치, 등급별 제공 범위 차이
- 3일 체험의 등급·횟수·제공 범위·자동 결제 여부
- 공식 판매 페이지(크몽 등) URL 과 판매 상태
- 프로그램 배포 파일 URL 과 배포 조건 (→ 다운로드 버튼)
- 지원 운영체제·버전, 지원 기기 수
- 환불 조건, 영구 이용권 업데이트·지원 기간, AI 이용권 만료 후 처리
- 기능별 세부 동작·버튼명·실제 화면 (현재 설명용 예시 화면만 사용)
- 이 사이트 전용 GA4 측정 ID (없으면 측정 비활성)
