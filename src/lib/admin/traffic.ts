import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSearchConsoleConfigured } from '@/lib/automation/search-console';
import type { SearchDailyRow, SearchInsightRow } from '@/lib/supabase/types';

/**
 * 관리자 대시보드의 유입량 데이터 로더.
 *
 * - Search Console 데이터는 주 1회 cron이 DB에 적재한다. 이 함수는 읽기만 한다.
 * - /admin은 force-dynamic이므로 요청 시점 조회지만, 공개 페이지 렌더 경로가 아니다.
 *   (공개 페이지에서 Supabase를 호출하지 않는다는 원칙은 그대로 유지된다.)
 * - 설정이 없거나 아직 수집 전이면 빈 상태를 돌려주고 화면이 안내를 띄운다.
 *
 * ⚠ 달력 기준으로 다뤄야 한다
 *   Search Console은 노출이 0인 날의 행을 아예 돌려주지 않는다. 그래서 search_daily에는
 *   날짜 구멍이 생긴다. '최근 28행'을 집계하면 실제로는 몇 달을 거슬러 올라갈 수 있고,
 *   화면의 "최근 28일"이라는 설명과 어긋난다.
 *   → 날짜 범위로 조회하고, 빠진 날짜는 0으로 채워 항상 28일 배열을 만든다.
 */

export interface TrafficPoint {
  /** YYYY-MM-DD */
  date: string;
  clicks: number;
  impressions: number;
}

export interface TrafficTotals {
  clicks: number;
  impressions: number;
  /** 0~1 */
  ctr: number;
  /** 평균 검색 순위. 낮을수록 좋다. */
  position: number;
}

export interface TrafficPageRow {
  page: string;
  clicks: number;
  impressions: number;
}

export interface TrafficQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface TrafficData {
  /** GSC 서비스 계정과 속성 URL이 설정돼 있는가 */
  configured: boolean;
  /** 수집된 일별 데이터가 있는가 */
  hasData: boolean;
  /** 최근 28일 (오래된 → 최신). 수집이 없는 날은 0으로 채워져 있다. */
  daily: TrafficPoint[];
  current: TrafficTotals;
  /** 직전 28일 (증감 비교용) */
  previous: TrafficTotals;
  /**
   * 직전 28일 구간까지 수집이 닿아 있는가.
   * 수집 초기에는 직전 구간이 비어 있어, 그대로 비교하면 -100% 같은 잘못된 증감이 나온다.
   */
  comparable: boolean;
  topPages: TrafficPageRow[];
  topQueries: TrafficQueryRow[];
  /** 마지막으로 수집된 날짜 (기준일) */
  lastDate: string | null;
  /** 현재 구간의 시작일 */
  periodStart: string | null;
}

const WINDOW_DAYS = 28;

const EMPTY_TOTALS: TrafficTotals = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

function emptyData(configured: boolean): TrafficData {
  return {
    configured,
    hasData: false,
    daily: [],
    current: EMPTY_TOTALS,
    previous: EMPTY_TOTALS,
    comparable: false,
    topPages: [],
    topQueries: [],
    lastDate: null,
    periodStart: null,
  };
}

/** 'YYYY-MM-DD' 에서 days만큼 이동한 날짜 문자열 */
function shiftDate(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** start부터 count일치 날짜 문자열 배열 (오래된 → 최신) */
function dateRange(start: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => shiftDate(start, index));
}

function totalsOf(rows: readonly SearchDailyRow[]): TrafficTotals {
  if (rows.length === 0) return EMPTY_TOTALS;

  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);

  // 순위는 단순 평균이 아니라 노출수 가중 평균이어야 실제 체감과 맞는다.
  const weighted = rows.reduce(
    (acc, row) => {
      if (row.position === null || row.impressions <= 0) return acc;
      return { sum: acc.sum + row.position * row.impressions, weight: acc.weight + row.impressions };
    },
    { sum: 0, weight: 0 },
  );

  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: weighted.weight > 0 ? weighted.sum / weighted.weight : 0,
  };
}

export async function getTrafficData(): Promise<TrafficData> {
  const configured = isSearchConsoleConfigured();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return emptyData(configured);

  // 기준일은 '오늘'이 아니라 '마지막으로 수집된 날'이다.
  // Search Console이 2~3일 늦게 제공하고 배치도 주 1회라, 오늘 기준으로 자르면 빈 구간이 생긴다.
  const { data: latestRow } = await supabase
    .from('search_daily')
    .select('date')
    .order('date', { ascending: false })
    .limit(1)
    .maybeSingle();

  const lastDate = (latestRow as { date: string } | null)?.date ?? null;
  if (!lastDate) return emptyData(configured);

  const currentStart = shiftDate(lastDate, -(WINDOW_DAYS - 1));
  const previousStart = shiftDate(lastDate, -(WINDOW_DAYS * 2 - 1));

  const { data, error } = await supabase
    .from('search_daily')
    .select('date, clicks, impressions, ctr, position, updated_at')
    .gte('date', previousStart)
    .lte('date', lastDate)
    .order('date', { ascending: true });

  if (error || !data || data.length === 0) return emptyData(configured);

  const rows = data as SearchDailyRow[];
  const byDate = new Map(rows.map((row) => [row.date, row]));

  const fill = (date: string): SearchDailyRow =>
    byDate.get(date) ?? {
      date,
      clicks: 0,
      impressions: 0,
      ctr: null,
      position: null,
      updated_at: '',
    };

  const currentRows = dateRange(currentStart, WINDOW_DAYS).map(fill);
  const previousRows = dateRange(previousStart, WINDOW_DAYS).map(fill);

  const daily: TrafficPoint[] = currentRows.map((row) => ({
    date: row.date,
    clicks: row.clicks,
    impressions: row.impressions,
  }));

  // 직전 구간까지 수집이 닿아 있어야 증감을 비교한다.
  // 가장 오래된 수집일이 직전 구간 시작보다 뒤라면, 그 구간은 '유입이 없었던 것'이 아니라
  // '아직 수집되지 않은 것'이므로 비교가 성립하지 않는다.
  const earliest = rows[0]?.date ?? lastDate;
  const comparable = earliest <= previousStart;

  // 상위 페이지·검색어는 search_insights의 가장 최근 기간에서만 집계한다.
  // 최신 period_end를 먼저 알아낸 뒤 그 기간만 읽는다(테이블이 커져도 조회량이 늘지 않는다).
  const { data: latestPeriodRow } = await supabase
    .from('search_insights')
    .select('period_end')
    .order('period_end', { ascending: false })
    .limit(1)
    .maybeSingle();

  const latestPeriod = (latestPeriodRow as { period_end: string } | null)?.period_end ?? null;

  const { data: insightData } = latestPeriod
    ? await supabase
        .from('search_insights')
        .select('query, page, clicks, impressions, position')
        .eq('period_end', latestPeriod)
        .order('clicks', { ascending: false })
        .limit(500)
    : { data: null };

  const latest = (insightData ?? []) as Pick<
    SearchInsightRow,
    'query' | 'page' | 'clicks' | 'impressions' | 'position'
  >[];

  const pageTotals = new Map<string, TrafficPageRow>();
  for (const row of latest) {
    if (!row.page) continue;
    const entry = pageTotals.get(row.page) ?? { page: row.page, clicks: 0, impressions: 0 };
    entry.clicks += row.clicks;
    entry.impressions += row.impressions;
    pageTotals.set(row.page, entry);
  }

  const topPages = [...pageTotals.values()]
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 8);

  const queryTotals = new Map<string, TrafficQueryRow & { weight: number }>();
  for (const row of latest) {
    if (!row.query) continue;
    const entry = queryTotals.get(row.query) ?? {
      query: row.query,
      clicks: 0,
      impressions: 0,
      position: 0,
      weight: 0,
    };
    entry.clicks += row.clicks;
    entry.impressions += row.impressions;
    if (row.position !== null && row.impressions > 0) {
      entry.position += row.position * row.impressions;
      entry.weight += row.impressions;
    }
    queryTotals.set(row.query, entry);
  }

  const topQueries = [...queryTotals.values()]
    .map((entry) => ({
      query: entry.query,
      clicks: entry.clicks,
      impressions: entry.impressions,
      position: entry.weight > 0 ? entry.position / entry.weight : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 8);

  return {
    configured,
    hasData: true,
    daily,
    current: totalsOf(currentRows),
    previous: totalsOf(previousRows),
    comparable,
    topPages,
    topQueries,
    lastDate,
    periodStart: currentStart,
  };
}
