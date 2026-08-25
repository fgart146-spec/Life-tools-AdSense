-- =============================================================================
-- search_insights 조회 인덱스
--
-- 0001의 unique(query, page, period_start, period_end)는 선두 컬럼이 query라
-- ORDER BY period_end DESC 에 쓸 수 없다. 대시보드가 /admin 진입마다 최신 기간을
-- 찾느라 전체 스캔 + 정렬을 하게 되므로 전용 인덱스를 둔다.
--
-- 행 수는 cron의 180일 보존 정책으로 제한된다(route.ts).
-- =============================================================================

create index if not exists search_insights_period_end_idx
  on public.search_insights (period_end desc);
