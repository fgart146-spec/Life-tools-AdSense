import { AdminCard } from '@/components/admin/AdminShell';
import {
  BarList,
  StatTile,
  TableFallback,
  TrendChart,
  formatCount,
  formatPercent,
  formatPosition,
} from '@/components/admin/charts';
import type { TrafficData } from '@/lib/admin/traffic';

/** 검증된 조합 (흰 카드 배경 기준 대비·색각 통과) */
const CLICK_COLOR = '#0f7d53';
const IMPRESSION_COLOR = '#2a78d6';

/** 절대 URL에서 경로만 남긴다. 표에 도메인이 반복되면 읽기 어렵다. */
function toPath(url: string): string {
  try {
    return new URL(url).pathname || '/';
  } catch {
    return url;
  }
}

export function TrafficSection({ data }: { data: TrafficData }) {
  if (!data.configured) {
    return (
      <AdminCard
        title="유입량"
        description="Search Console 연동이 아직 설정되지 않았습니다."
      >
        <p className="text-sm leading-relaxed text-ink-600">
          유입량 그래프는 Google Search Console에서 데이터를 가져옵니다. Vercel 환경변수에 아래 두
          값을 넣고 재배포하면 주 1회 자동으로 수집됩니다.
        </p>
        <ul className="mt-3 grid gap-1.5 text-sm text-ink-700">
          <li>
            <code className="rounded bg-ink-100 px-1.5 py-0.5">GSC_SERVICE_ACCOUNT_JSON</code> —
            서비스 계정 JSON (base64도 가능)
          </li>
          <li>
            <code className="rounded bg-ink-100 px-1.5 py-0.5">GSC_SITE_URL</code> — 속성 URL (예:{' '}
            <code className="rounded bg-ink-100 px-1.5 py-0.5">sc-domain:eolmaji.com</code>)
          </li>
          <li>
            <code className="rounded bg-ink-100 px-1.5 py-0.5">CRON_SECRET</code> — cron 호출 보호용
          </li>
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-ink-500">
          서비스 계정을 Search Console 속성에 &lsquo;전체 사용자&rsquo; 권한으로 추가해야 데이터를
          읽을 수 있습니다. 설정 후 첫 수집까지 최대 일주일이 걸립니다.
        </p>
      </AdminCard>
    );
  }

  if (!data.hasData) {
    return (
      <AdminCard title="유입량" description="아직 수집된 데이터가 없습니다.">
        <p className="text-sm leading-relaxed text-ink-600">
          Search Console 연동은 설정돼 있습니다. 주 1회 실행되는 배치가 데이터를 채우면 이 자리에
          그래프가 표시됩니다.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-500">
          Search Console 자체가 데이터를 2~3일 늦게 제공하고, 새 사이트는 색인이 시작돼야 유입이
          잡힙니다. 배치는 매주 월요일 03:00(UTC)에 실행됩니다.
        </p>
      </AdminCard>
    );
  }

  const { current, previous, comparable, daily, topPages, topQueries } = data;
  // 비교 구간이 짧으면 증감을 숨긴다 (잘못된 급증·급감으로 읽히지 않게)
  const prev = comparable ? previous : undefined;

  return (
    <section aria-labelledby="traffic-heading" className="grid gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="traffic-heading" className="text-base font-bold text-ink-900">
          유입량
        </h2>
        <p className="text-xs text-ink-500">
          Google 검색 기준
          {data.periodStart && data.lastDate && (
            <>
              {' '}
              · {data.periodStart} ~ {data.lastDate}
            </>
          )}
          {!comparable && <> · 직전 구간 수집이 아직 없어 증감은 표시하지 않습니다</>}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="클릭 (실제 방문)"
          value={formatCount(current.clicks)}
          hint="검색 결과에서 실제로 눌러 들어온 횟수"

          current={current.clicks}
          previous={prev?.clicks}
        />
        <StatTile
          label="노출"
          value={formatCount(current.impressions)}
          hint="검색 결과에 표시된 횟수"

          current={current.impressions}
          previous={prev?.impressions}
        />
        <StatTile
          label="클릭률"
          value={formatPercent(current.ctr)}
          current={current.ctr}
          previous={prev?.ctr}
        />
        <StatTile
          label="평균 순위"
          value={formatPosition(current.position)}
          current={current.position}
          previous={prev?.position}
          higherIsBetter={false}
          hint="낮을수록 좋습니다"
        />
      </div>

      {/*
        클릭과 노출은 자릿수가 달라 한 축에 겹쳐 그리면 클릭이 바닥에 눌린다.
        축을 공유하지 않는 차트 두 장으로 나눈다.
      */}
      <AdminCard
        headingLevel={3}
        title="일별 추이"
        description="클릭과 노출은 자릿수가 달라 따로 표시합니다."
      >
        <div className="grid gap-6">
          <TrendChart
            id="clicks"
            title="클릭"
            points={daily.map((d) => ({ date: d.date, value: d.clicks }))}
            color={CLICK_COLOR}
            unitLabel="회"
          />
          <TrendChart
            id="impressions"
            title="노출"
            points={daily.map((d) => ({ date: d.date, value: d.impressions }))}
            color={IMPRESSION_COLOR}
            unitLabel="회"
          />
        </div>

        <TableFallback summary="숫자로 보기">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="text-ink-500 [&>th]:shadow-[inset_0_-1px_0_var(--color-ink-200)]">
                <th className="py-1.5 pl-3 pr-3 font-medium">날짜</th>
                <th className="py-1.5 pr-3 text-right font-medium">클릭</th>
                <th className="py-1.5 pr-3 text-right font-medium">노출</th>
              </tr>
            </thead>
            <tbody>
              {[...daily].reverse().map((point) => (
                <tr key={point.date} className="border-b border-ink-100">
                  <td className="tabular py-1.5 pl-3 pr-3 text-ink-600">{point.date}</td>
                  <td className="tabular py-1.5 pr-3 text-right text-ink-900">
                    {formatCount(point.clicks)}
                  </td>
                  <td className="tabular py-1.5 pr-3 text-right text-ink-600">
                    {formatCount(point.impressions)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableFallback>
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard headingLevel={3} title="유입이 많은 페이지" description="클릭 기준 상위 8개">
          <BarList
            items={topPages.map((row) => ({
              key: row.page,
              label: toPath(row.page),
              value: row.clicks,
              hint: `노출 ${formatCount(row.impressions)}`,
              href: row.page,
            }))}
            color={CLICK_COLOR}
            unitLabel="회"
            emptyText="아직 페이지별 데이터가 없습니다."
          />
        </AdminCard>

        <AdminCard headingLevel={3} title="유입 검색어" description="클릭 기준 상위 8개">
          <BarList
            items={topQueries.map((row) => ({
              key: row.query,
              label: row.query,
              value: row.clicks,
              hint: `순위 ${formatPosition(row.position)}`,
            }))}
            color={IMPRESSION_COLOR}
            unitLabel="회"
            emptyText="아직 검색어 데이터가 없습니다."
          />
        </AdminCard>
      </div>
    </section>
  );
}
