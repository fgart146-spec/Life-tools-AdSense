import { createSign } from 'node:crypto';

/**
 * Google Search Console 연동.
 *
 * 서비스 계정 JSON(GSC_SERVICE_ACCOUNT_JSON)과 속성 URL(GSC_SITE_URL)이 설정된 경우에만 동작한다.
 * 호출은 cron(주 1회)에서만 이루어지며, 공개 페이지 렌더링과는 무관하다.
 */
export interface SearchConsoleRow {
  query: string;
  page: string | null;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  try {
    // base64로 넣은 경우도 지원한다(줄바꿈 때문에 환경변수에 넣기 까다로움).
    const json = raw.trim().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');
    const parsed = JSON.parse(json) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isSearchConsoleConfigured(): boolean {
  return Boolean(readServiceAccount() && process.env.GSC_SITE_URL);
}

function base64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** 서비스 계정으로 액세스 토큰을 발급받는다 (JWT Bearer 방식). */
async function getAccessToken(account: ServiceAccount): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  );

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = base64Url(signer.sign(account.private_key.replace(/\n/g, '\n')));

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claim}.${signature}`,
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export interface SearchConsoleQuery {
  startDate: string;
  endDate: string;
  rowLimit?: number;
}

interface RawRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/** searchAnalytics.query 공통 호출. dimensions만 바꿔 재사용한다. */
async function querySearchAnalytics(
  dimensions: string[],
  params: SearchConsoleQuery,
): Promise<RawRow[] | null> {
  const account = readServiceAccount();
  const siteUrl = process.env.GSC_SITE_URL;
  if (!account || !siteUrl) return null;

  const token = await getAccessToken(account);
  if (!token) return null;

  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl,
  )}/searchAnalytics/query`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      dimensions,
      rowLimit: params.rowLimit ?? 500,
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as { rows?: RawRow[] };
  return data.rows ?? [];
}

/** 검색어별 성과를 가져온다. 설정이 없으면 null. */
export async function fetchSearchAnalytics(
  params: SearchConsoleQuery,
): Promise<SearchConsoleRow[] | null> {
  const rows = await querySearchAnalytics(['query', 'page'], params);
  if (!rows) return null;

  return rows.map((row) => ({
    query: row.keys[0] ?? '',
    page: row.keys[1] ?? null,
    impressions: row.impressions,
    clicks: row.clicks,
    ctr: row.ctr,
    position: row.position,
  }));
}

export interface SearchConsoleDailyRow {
  /** YYYY-MM-DD */
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

/**
 * 일별 성과를 가져온다 (대시보드 시계열용).
 * Search Console 데이터는 2~3일 지연되므로, 최근 며칠은 값이 나중에 올라갈 수 있다.
 * cron이 매번 같은 구간을 다시 upsert하는 이유다.
 */
export async function fetchSearchAnalyticsDaily(
  params: SearchConsoleQuery,
): Promise<SearchConsoleDailyRow[] | null> {
  const rows = await querySearchAnalytics(['date'], { ...params, rowLimit: params.rowLimit ?? 400 });
  if (!rows) return null;

  return rows
    .map((row) => ({
      date: row.keys[0] ?? '',
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position,
    }))
    .filter((row) => row.date !== '')
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}
