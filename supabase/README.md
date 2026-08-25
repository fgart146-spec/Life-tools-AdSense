# Supabase 설정

## 1. 프로젝트 생성
Supabase 대시보드에서 프로젝트를 만들고 아래 값을 `.env.local`(및 Vercel 환경변수)에 넣습니다.

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # 서버 전용. 절대 클라이언트에 노출하지 않는다.
```

## 2. 마이그레이션 적용
Supabase SQL Editor에서 `migrations/ 안의 SQL 파일을 번호 순서대로 전부` 내용을 실행하거나, Supabase CLI를 사용합니다.

```bash
supabase db push
```

## 3. 관리자 계정 등록
1. Authentication → Users에서 관리자 이메일 계정을 생성합니다(초대 또는 직접 생성).
2. SQL Editor에서 해당 사용자를 관리자 테이블에 추가합니다.

```sql
insert into public.admin_profiles (id, email, role)
select id, email, 'owner' from auth.users where email = 'admin@example.com';
```

`admin_profiles`에 없는 계정은 로그인하더라도 관리자 화면에 접근할 수 없습니다.

## 4. 접근 원칙
- 공개 페이지는 런타임에 Supabase를 조회하지 않습니다. 빌드/ISR 재생성 시점에만 읽습니다.
- 환경변수가 없으면 관리자 화면은 설정 안내를 표시하고, 공개 사이트는 코드 기본값으로 정상 동작합니다.
