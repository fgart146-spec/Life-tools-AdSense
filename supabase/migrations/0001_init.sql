-- =============================================================================
-- 생활계산소 관리자 스키마 (초기)
--
-- 원칙
--  * 공개 페이지는 이 테이블들을 런타임에 조회하지 않는다.
--    빌드/ISR 재생성 시점에만 읽어 정적 결과에 반영한다.
--  * anon 키로는 아무것도 읽거나 쓸 수 없다(RLS 기본 거부).
--  * 관리자 여부는 admin_profiles 테이블로 판단한다.
-- =============================================================================

create extension if not exists "uuid-ossp";

-- 관리자 계정 -----------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

comment on table public.admin_profiles is '관리자 계정. auth.users에 있어도 이 테이블에 없으면 접근 불가.';

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles where id = auth.uid()
  );
$$;

-- 계산 기준값 (전기요금 요율, 급여 요율 등) ------------------------------------
create table if not exists public.basis_values (
  key text primary key,
  label text not null,
  value jsonb not null,
  basis_date date,
  source_label text,
  source_url text,
  note text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

comment on table public.basis_values is '제도 종속 기준값. 빌드/재생성 시점에만 읽어 정적 페이지에 반영한다.';

-- 도구 운영 메타 (상태 메모·검토 이력) -----------------------------------------
create table if not exists public.tool_notes (
  tool_id text primary key,
  review_status text not null default 'ok' check (review_status in ('ok', 'needs_review', 'blocked')),
  note text,
  last_reviewed_at date,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

comment on table public.tool_notes is '도구별 운영 메모. 라우팅에는 영향을 주지 않는다(공개 여부는 코드에서 관리).';

-- 시즌 추천 구성 --------------------------------------------------------------
create table if not exists public.seasonal_slots (
  id uuid primary key default uuid_generate_v4(),
  month smallint not null check (month between 1 and 12),
  tool_id text not null,
  position smallint not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id),
  unique (month, tool_id)
);

comment on table public.seasonal_slots is '메인 화면 시즌 추천 구성. 비어 있으면 코드 기본값을 사용한다.';

-- 사이트 설정 -----------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

comment on table public.site_settings is '사이트명·연락처 등 운영 설정. 환경변수가 있으면 환경변수가 우선한다.';

-- 검색 데이터 (PHASE 10) -------------------------------------------------------
create table if not exists public.search_insights (
  id uuid primary key default uuid_generate_v4(),
  query text not null,
  page text,
  impressions integer not null default 0,
  clicks integer not null default 0,
  ctr numeric(6, 4),
  position numeric(6, 2),
  period_start date not null,
  period_end date not null,
  created_at timestamptz not null default now(),
  unique (query, page, period_start, period_end)
);

-- AI 제안 (PHASE 10) -----------------------------------------------------------
create table if not exists public.ai_suggestions (
  id uuid primary key default uuid_generate_v4(),
  kind text not null check (kind in ('new_tool', 'improve_tool', 'new_guide', 'seo_fix')),
  title text not null,
  rationale text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'done')),
  source_query text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id)
);

comment on table public.ai_suggestions is 'AI가 만든 제안. 관리자가 승인하기 전에는 공개에 반영되지 않는다.';

-- 변경 이력 -------------------------------------------------------------------
create table if not exists public.update_log (
  id uuid primary key default uuid_generate_v4(),
  entity text not null,
  entity_id text,
  action text not null,
  detail jsonb,
  actor uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index if not exists update_log_created_at_idx on public.update_log (created_at desc);

-- RLS -------------------------------------------------------------------------
alter table public.admin_profiles enable row level security;
alter table public.basis_values enable row level security;
alter table public.tool_notes enable row level security;
alter table public.seasonal_slots enable row level security;
alter table public.site_settings enable row level security;
alter table public.search_insights enable row level security;
alter table public.ai_suggestions enable row level security;
alter table public.update_log enable row level security;

-- 관리자만 읽고 쓸 수 있다. anon은 정책이 없으므로 접근 불가.
create policy "admin read profiles" on public.admin_profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());

create policy "admin all basis" on public.basis_values
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all tool notes" on public.tool_notes
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all seasonal" on public.seasonal_slots
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all insights" on public.search_insights
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all suggestions" on public.ai_suggestions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin all log" on public.update_log
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
