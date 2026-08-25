import type { ReactNode } from 'react';

/**
 * 관리자 대시보드용 차트.
 *
 * 원칙
 * - 차트 라이브러리를 추가하지 않는다. 서버에서 렌더한 순수 SVG/HTML이라 클라이언트 JS가 0이다.
 * - 이중 축(y축 2개)을 쓰지 않는다. 클릭과 노출은 자릿수가 달라 같은 축에 놓으면 왜곡된다.
 *   → 축을 공유하지 않는 '스몰 멀티플'(차트 2개)로 나눈다.
 * - 툴팁은 SVG <title>로 처리한다. 브라우저 기본 툴팁이라 JS가 필요 없다.
 * - 색은 계열 식별용이고, 숫자·라벨은 항상 잉크 색을 쓴다.
 * - 방향(증가/감소)을 색과 화살표로만 전하지 않는다. 스크린리더용 텍스트를 함께 넣는다.
 *
 * 색상은 흰 카드 배경(#ffffff) 기준으로 대비·색각 검증을 통과한 조합이다.
 *   클릭 #0f7d53 (brand-600) / 노출 #2a78d6
 */

const NUMBER = new Intl.NumberFormat('ko-KR');

export function formatCount(value: number): string {
  return NUMBER.format(Math.round(value));
}

export function formatPercent(value: number, digits = 2): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatPosition(value: number): string {
  return value > 0 ? value.toFixed(1) : '-';
}

/**
 * 축 눈금 라벨. 반올림하면 눈금선이 가리키는 값과 라벨이 어긋난다.
 * (상한 5의 중간 눈금은 2.5인데 "3"으로 찍히면 데이터 점이 라벨 위로 올라간다.)
 */
function axisLabel(value: number): string {
  return Number.isInteger(value) ? formatCount(value) : value.toFixed(1);
}

/* -------------------------------------------------------------------------- */
/* 요약 숫자                                                                    */
/* -------------------------------------------------------------------------- */

export function StatTile({
  label,
  value,
  previous,
  current,
  higherIsBetter = true,
  hint,
}: {
  label: string;
  value: string;
  /** 증감 계산용 원값. 비교 불가한 구간이면 넘기지 않는다. */
  previous?: number;
  current?: number;
  higherIsBetter?: boolean;
  /** 지표 해석 안내. 증감 표시 여부와 무관하게 항상 보여준다. */
  hint?: string;
}) {
  const hasBoth = previous !== undefined && current !== undefined;
  const bothPositive = previous !== undefined && current !== undefined && previous > 0 && current > 0;
  const changeRatio =
    previous !== undefined && current !== undefined && previous > 0
      ? (current - previous) / previous
      : 0;
  const rose = changeRatio > 0;
  const showChange = bothPositive && Math.abs(changeRatio) >= 0.005;
  const good = higherIsBetter ? rose : !rose;

  let note: ReactNode;
  if (showChange) {
    note = (
      <span className={good ? 'text-brand-700' : 'text-red-700'}>
        <span aria-hidden="true">{rose ? '↑' : '↓'}</span>
        <span className="sr-only">{rose ? '증가' : '감소'} </span>
        {Math.abs(changeRatio * 100).toFixed(1)}%{' '}
        <span className="font-normal text-ink-500">직전 28일 대비</span>
      </span>
    );
  } else if (bothPositive) {
    note = <span className="font-normal text-ink-500">직전 28일과 비슷합니다</span>;
  } else if (hasBoth && previous === 0 && current > 0) {
    note = <span className="text-brand-700">직전 구간에는 없던 유입입니다</span>;
  } else if (hasBoth && previous > 0 && current === 0) {
    note = <span className="text-red-700">직전 구간에 있던 유입이 사라졌습니다</span>;
  } else {
    note = <span className="font-normal text-ink-500">비교할 직전 구간 데이터가 없습니다</span>;
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-4">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink-900">{value}</p>
      <p className="mt-1 text-xs font-semibold">{note}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 시계열 (스몰 멀티플 한 장)                                                    */
/* -------------------------------------------------------------------------- */

export interface TrendPoint {
  date: string;
  value: number;
}

/** 눈금이 읽기 좋은 수가 되도록 상한을 올림한다. */
function niceCeil(max: number): number {
  if (max <= 0) return 10;
  const exponent = Math.floor(Math.log10(max));
  const base = 10 ** exponent;
  for (const step of [1, 2, 2.5, 5, 10]) {
    const candidate = step * base;
    if (candidate >= max) return candidate;
  }
  return 10 * base;
}

function shortDate(iso: string): string {
  const [, month, day] = iso.split('-');
  return month && day ? `${Number(month)}/${Number(day)}` : iso;
}

export function TrendChart({
  id,
  title,
  points,
  color,
  unitLabel,
}: {
  /** 같은 페이지에 여러 개가 놓이므로 호출부에서 고유한 ASCII id를 넘긴다. */
  id: string;
  title: string;
  points: readonly TrendPoint[];
  color: string;
  unitLabel: string;
}) {
  if (points.length === 0) return null;

  const W = 720;
  const H = 180;
  const PAD = { top: 16, right: 16, bottom: 30, left: 54 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const max = Math.max(...points.map((p) => p.value));
  const ceil = niceCeil(max);
  const n = points.length;

  const x = (index: number) =>
    n === 1 ? PAD.left + plotW / 2 : PAD.left + (index / (n - 1)) * plotW;
  const y = (value: number) => PAD.top + plotH - (value / ceil) * plotH;
  const baseline = PAD.top + plotH;

  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(' ');
  const area = `${line} L ${x(n - 1).toFixed(1)} ${baseline} L ${x(0).toFixed(1)} ${baseline} Z`;

  const lastIndex = n - 1;
  const last = points[lastIndex];
  const peakIndex = points.reduce((best, p, i) => (p.value > (points[best]?.value ?? 0) ? i : best), 0);
  const peak = points[peakIndex];
  // 최고점 라벨은 마지막 점과 겹치지 않을 때만 (숫자를 모든 점에 붙이지 않는다)
  const showPeak = peak !== undefined && peakIndex !== lastIndex && Math.abs(peakIndex - lastIndex) > 2;

  const total = points.reduce((sum, p) => sum + p.value, 0);
  const captionId = `trend-${id}`;

  return (
    <figure className="m-0">
      <figcaption className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink-800">{title}</span>
        <span className="tabular text-xs text-ink-500">
          합계 {formatCount(total)}
          {unitLabel}
        </span>
      </figcaption>

      {/*
        좁은 화면에서 SVG 전체가 균일 축소되면 축 글자가 판독 불가 크기가 된다.
        가로 스크롤을 허용해 원래 배율을 지킨다. 숫자는 아래 '숫자로 보기' 표로도 읽을 수 있다.
      */}
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            role="img"
            aria-labelledby={captionId}
            className="block h-auto w-full"
          >
            <title id={captionId}>
              {title}. {points[0]?.date}부터 {last?.date}까지 합계 {formatCount(total)}
              {unitLabel}, 최고 {formatCount(peak?.value ?? 0)}
              {unitLabel}.
            </title>

            {/* 눈금선: 데이터보다 뒤로 물러나 있어야 한다 */}
            {[0, 0.5, 1].map((ratio) => {
              const gy = PAD.top + plotH - ratio * plotH;
              return (
                <g key={ratio}>
                  <line
                    x1={PAD.left}
                    y1={gy}
                    x2={W - PAD.right}
                    y2={gy}
                    stroke="#e4e4e8"
                    strokeWidth="1"
                  />
                  <text
                    x={PAD.left - 8}
                    y={gy + 5}
                    textAnchor="end"
                    className="tabular"
                    fontSize="13"
                    fill="#6f6f7a"
                  >
                    {axisLabel(ceil * ratio)}
                  </text>
                </g>
              );
            })}

            <path d={area} fill={color} fillOpacity="0.12" />
            <path
              d={line}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* 마지막 점: 흰 링을 둘러 배경과 분리한다 */}
            {last && (
              <circle
                cx={x(lastIndex)}
                cy={y(last.value)}
                r="4"
                fill={color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            )}

            {/* 선택적 직접 라벨 — 모든 점에 숫자를 붙이지 않는다 */}
            {last && (
              <text
                x={Math.min(x(lastIndex), W - PAD.right - 2)}
                y={Math.max(y(last.value) - 12, PAD.top + 12)}
                textAnchor="end"
                className="tabular"
                fontSize="14"
                fontWeight="700"
                fill="#26262c"
              >
                {formatCount(last.value)}
              </text>
            )}
            {showPeak && peak && (
              <text
                x={x(peakIndex)}
                y={Math.max(y(peak.value) - 10, PAD.top + 11)}
                textAnchor="middle"
                className="tabular"
                fontSize="13"
                fill="#6f6f7a"
              >
                {formatCount(peak.value)}
              </text>
            )}

            {/* x축 라벨: 처음 / 가운데 / 마지막만 */}
            {[0, Math.floor((n - 1) / 2), n - 1]
              .filter((index, i, arr) => arr.indexOf(index) === i)
              .map((index) => (
                <text
                  key={index}
                  x={x(index)}
                  y={H - 9}
                  textAnchor={index === 0 ? 'start' : index === n - 1 ? 'end' : 'middle'}
                  className="tabular"
                  fontSize="13"
                  fill="#6f6f7a"
                >
                  {shortDate(points[index]?.date ?? '')}
                </text>
              ))}

            {/* 호버 히트 영역: 브라우저 기본 툴팁으로 값을 보여준다 (JS 없음) */}
            {points.map((p, i) => {
              const bandW = plotW / Math.max(n - 1, 1);
              return (
                <rect
                  key={p.date}
                  x={x(i) - bandW / 2}
                  y={PAD.top}
                  width={bandW}
                  height={plotH}
                  fill="transparent"
                >
                  <title>{`${p.date} · ${formatCount(p.value)}${unitLabel}`}</title>
                </rect>
              );
            })}
          </svg>
        </div>
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* 가로 막대 목록                                                               */
/* -------------------------------------------------------------------------- */

export interface BarItem {
  /** React key 겸 표시 라벨. 호출부에서 고유성을 보장한다. */
  key: string;
  label: string;
  value: number;
  /** 라벨 옆에 덧붙일 보조 수치 */
  hint?: string;
  href?: string;
}

export function BarList({
  items,
  color,
  unitLabel,
  emptyText,
}: {
  items: readonly BarItem[];
  color: string;
  unitLabel: string;
  emptyText: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-ink-500">{emptyText}</p>;
  }

  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="grid gap-2">
      {items.map((item) => {
        const ratio = Math.max(item.value / max, 0.02);
        return (
          <li key={item.key} className="grid gap-1">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-ink-700" title={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700 hover:underline"
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </span>
              <span className="tabular shrink-0 font-semibold text-ink-900">
                {formatCount(item.value)}
                <span className="ml-0.5 font-normal text-ink-500">{unitLabel}</span>
                {item.hint && <span className="ml-2 font-normal text-ink-500">{item.hint}</span>}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-ink-100">
              <div
                className="h-2 rounded-full"
                style={{ width: `${(ratio * 100).toFixed(1)}%`, backgroundColor: color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* 표 보기 (접근성 대체 경로)                                                    */
/* -------------------------------------------------------------------------- */

export function TableFallback({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-xs font-medium text-ink-500 hover:text-ink-800">
        {summary}
      </summary>
      {/* 스크롤 컨테이너 안에 포커스 가능한 요소가 없으면 키보드로 스크롤할 수 없다 */}
      <div
        tabIndex={0}
        role="region"
        aria-label={summary}
        className="mt-2 max-h-64 overflow-auto rounded-md border border-ink-200"
      >
        {children}
      </div>
    </details>
  );
}
