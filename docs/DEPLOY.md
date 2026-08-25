# 배포 가이드 (GitHub → Vercel)

## 1. GitHub 저장소 만들기

<https://github.com/new> 에서 **빈 저장소**를 만든다.

- 저장소 이름: 예 `life-tools`
- 공개/비공개: 어느 쪽이든 상관없다. Vercel 배포와 AdSense 심사에 영향 없다.
- ⚠ **README·.gitignore·license를 추가하지 않는다.** 이미 로컬에 커밋이 있어 충돌한다.

만든 뒤 저장소 주소를 확인한다: `https://github.com/<계정>/<저장소>.git`

## 2. 밀어 올리기

```bash
git remote add origin https://github.com/<계정>/<저장소>.git
git push -u origin main
```

## 3. Vercel에 연결

1. <https://vercel.com/new> 접속 → GitHub 계정 연결
2. 방금 만든 저장소 **Import**
3. 빌드 설정은 자동 감지된 값을 그대로 둔다 (Framework: Next.js / Build: `npm run build`)
4. **Deploy 누르기 전에 환경변수부터 넣는다** (아래 4번)

## 4. 환경변수 (Vercel → Settings → Environment Variables)

값은 Vercel 화면에서 직접 입력한다. 저장소에는 절대 넣지 않는다.

### 지금 넣어야 하는 것

| 이름 | 값 | 환경 | 없으면 |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | `생활계산소` | 전체 | 기본값 사용(동일) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 문의용 이메일 | 전체 | `hello@example.com`이 노출됨 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 전체 | 관리자 로그인 불가 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 키 | 전체 | 관리자 로그인 불가 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role 키 | 전체 | 기준값 DB 반영 불가 |
| `CRON_SECRET` | 아래 명령으로 생성 | Production | cron 라우트가 401 반환 |

`CRON_SECRET` 생성:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

> ⚠ `SUPABASE_SERVICE_ROLE_KEY` 에는 절대 `NEXT_PUBLIC_` 를 붙이지 않는다.
> 붙이면 클라이언트 번들에 그대로 실려 RLS가 무력화된다.

### `NEXT_PUBLIC_SITE_URL` — 넣지 않는다

넣지 않으면 `next.config.ts` 가 Vercel의 운영 도메인
(`VERCEL_PROJECT_PRODUCTION_URL`)을 자동으로 사용한다.
**로컬 값인 `http://localhost:3000` 을 그대로 복사해 넣으면
canonical·sitemap·OG 태그가 전부 localhost로 나가 색인이 망가진다.**

직접 도메인을 연결한 뒤에는 그때 실제 도메인 값으로 넣는다.

### 나중에 넣는 것

| 이름 | 시점 |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | GA4 속성 만든 뒤 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console 소유확인 시 |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | 네이버 서치어드바이저 등록 시 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense **승인 후** |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | 광고 단위 만든 뒤 |
| `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL` | 검색 유입 자동 분석을 켤 때 |
| `ANTHROPIC_API_KEY` | AI 보강 제안을 켤 때 (주 1회 배치에서만 호출) |

환경변수를 추가·수정한 뒤에는 **재배포해야 반영된다**
(`NEXT_PUBLIC_*` 는 빌드 시점에 번들에 박히기 때문).

## 5. 배포 후 확인

| 확인 | 기대 결과 |
| --- | --- |
| `/` 접속 | `/ko` 로 리다이렉트 |
| `/ko/salary-net` 계산 | 연봉 4,000만 → 월 실수령 2,912,418원 |
| 페이지 소스의 `<link rel="canonical">` | `https://<배포도메인>/...` (localhost 아님) |
| `/sitemap.xml` | 120개 URL, 도메인 정상 |
| `/robots.txt` | `/admin` 차단, sitemap 주소 정상 |
| `/admin` 접속 | 로그인 화면으로 이동 |
| 관리자 로그인 | 등록한 계정으로 진입 |
| DevTools → Network | 계산 버튼을 눌러도 요청이 발생하지 않음 |

## 6. 다음 단계

1. 도메인 연결 (Vercel → Settings → Domains) → `NEXT_PUBLIC_SITE_URL` 를 실제 도메인으로 설정
2. Google Search Console 등록 → 사이트맵 제출
3. GA4 속성 생성 → `NEXT_PUBLIC_GA_ID` 입력
4. 콘텐츠가 색인되고 실제 유입이 생긴 뒤 AdSense 신청
   (`*.vercel.app` 서브도메인으로는 승인이 어렵다. 본인 소유 도메인이 필요하다.)
