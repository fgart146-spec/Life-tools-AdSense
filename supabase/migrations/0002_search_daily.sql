-- =============================================================================
-- 일별 검색 유입 (관리자 대시보드 그래프용)
--
-- search_insights는 '기간 집계'라 시계열 그래프를 그릴 수 없다.
-- 이 테이블은 날짜별로 한 줄만 저장한다(주 1회 cron이 최근 28일을 다시 upsert).
-- 1년 치라도 365행이므로 트래픽이 늘어도 저장 비용이 늘지 않는다.
-- =============================================================================

create table if not exists public.search_daily (
  date date primary key,
  clicks integer not null default 0,
  impressions integer not null default 0,
  ctr numeric(6, 4),
  position numeric(6, 2),
  updated_at timestamptz not null default now()
);

comment on table public.search_daily is
  'Search Console 일별 지표. cron이 최근 28일을 주기적으로 갱신한다(지연 반영 보정 포함).';

alter table public.search_daily enable row level security;

-- 관리자만 읽고 쓸 수 있다. anon은 정책이 없으므로 접근 불가.
create policy "admin all search daily" on public.search_daily
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create index if not exists search_daily_date_idx on public.search_daily (date desc);
