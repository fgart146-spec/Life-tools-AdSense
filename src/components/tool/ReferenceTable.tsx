import {
  ELECTRICITY_BASIS,
  RESIDENTIAL_HIGH_VOLTAGE,
  RESIDENTIAL_LOW_VOLTAGE,
  type ElectricityTariff,
} from '@/lib/data/kr-electricity';
import {
  INSURANCE_RATES,
  MINIMUM_WAGE,
  MONTHLY_WORK_HOURS_209,
  PAYROLL_BASIS,
  PENSION_INCOME_LIMIT,
} from '@/lib/data/kr-payroll';
import { calcElectricity } from '@/lib/calc/electricity';
import { calcSalary } from '@/lib/calc/payroll';
import type { Locale } from '@/lib/i18n/config';
import { formatMoney, formatNumber } from '@/lib/format/number';

/**
 * 기준 조견표 (서버 컴포넌트).
 *
 * 계산기와 같은 계산 함수로 빌드 시점에 표를 만든다. 요율이 바뀌면 표도 같이 바뀌므로
 * 화면의 숫자와 계산 결과가 어긋나지 않는다.
 *
 * 한국 제도(전기요금 누진제·4대보험)에 종속되므로 ko 로케일에서만 렌더한다.
 * 해당 계산기들은 실제로 ko 전용이지만, 방어적으로 한 번 더 막는다.
 */

function Table({ children }: { children: React.ReactNode }) {
  // 좁은 화면에서 표가 잘리지 않게 가로 스크롤을 표 자신에게 준다.
  return (
    <div className="mt-3.5 overflow-x-auto rounded-[var(--radius-card)] border border-ink-200 bg-white">
      <table className="w-full min-w-[34rem] text-left text-sm">{children}</table>
    </div>
  );
}

const TH = 'px-3 py-2.5 font-semibold text-ink-700 sm:px-4';
const TD = 'tabular px-3 py-2.5 text-ink-700 sm:px-4';

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs leading-relaxed text-ink-500">{children}</p>;
}

/* ---------------------------------------------------------------------------
 * 전기요금 — 사용량별 예상 청구액 + 누진 구간
 * ------------------------------------------------------------------------- */

const USAGE_STEPS = [100, 200, 300, 350, 400, 450, 500, 600, 800] as const;

/** 평시(3~6월, 9~11월) 기준으로 계산한다. 하계·동계는 구간이 달라 별도 안내. */
const NORMAL_MONTH = 10;
const SUMMER_MONTH = 8;

function tierLabel(tariff: ElectricityTariff, index: number, locale: Locale): string {
  const tiers = tariff.tiers;
  const prev = index === 0 ? 0 : (tiers[index - 1]?.upTo ?? 0);
  const cur = tiers[index]?.upTo ?? null;
  if (cur === null) return `${formatNumber(prev + 1, locale)}kWh 초과`;
  return `${formatNumber(prev + 1, locale)}~${formatNumber(cur, locale)}kWh`;
}

export function ElectricityReferenceTable({ locale }: { locale: Locale }) {
  if (locale !== 'ko') return null;

  const rows = USAGE_STEPS.map((usage) => {
    const low = calcElectricity({ usageKwh: usage, contract: 'low', month: NORMAL_MONTH });
    const high = calcElectricity({ usageKwh: usage, contract: 'high', month: NORMAL_MONTH });
    const highSummer = calcElectricity({ usageKwh: usage, contract: 'high', month: SUMMER_MONTH });
    return { usage, low, high, highSummer };
  });

  return (
    <section className="mt-12">
      <h2 id="reference" className="text-xl font-bold sm:text-[1.5rem]">
        사용량별 전기요금 조견표
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
        위 계산기와 같은 요율·같은 계산식으로 미리 계산한 표입니다. 아파트는 대부분 고압,
        단독주택·빌라는 저압입니다. 누진제 때문에 사용량이 조금만 늘어도 요금이 크게 뜁니다.
      </p>

      <Table>
        <thead className="border-b border-ink-200 bg-ink-50 text-xs">
          <tr>
            <th scope="col" className={TH}>
              월 사용량
            </th>
            <th scope="col" className={`${TH} text-right`}>
              저압(단독·빌라)
            </th>
            <th scope="col" className={`${TH} text-right`}>
              고압(아파트)
            </th>
            <th scope="col" className={`${TH} text-right`}>
              고압 · 7~8월
            </th>
            <th scope="col" className={`${TH} text-right`}>
              고압 kWh당
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ usage, low, high, highSummer }) => (
            <tr key={usage} className="border-b border-ink-100 last:border-0">
              <th scope="row" className={`${TD} font-semibold text-ink-900`}>
                {formatNumber(usage, locale)}kWh
              </th>
              <td className={`${TD} text-right`}>{low ? formatMoney(low.total, locale) : '—'}</td>
              <td className={`${TD} text-right font-semibold text-ink-900`}>
                {high ? formatMoney(high.total, locale) : '—'}
              </td>
              <td className={`${TD} text-right`}>
                {highSummer ? formatMoney(highSummer.total, locale) : '—'}
              </td>
              <td className={`${TD} text-right text-ink-500`}>
                {high ? `${formatNumber(Math.round(high.effectiveUnitPrice), locale)}원` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Caption>
        부가가치세 10%와 전력산업기반기금 2.7%를 포함한 최종 청구금액입니다(10원 미만 절사).
        복지할인·대가족할인·TV수신료는 반영되지 않았습니다. 7~8월은 누진 구간이 넓어져 같은
        사용량이어도 요금이 낮아집니다.
      </Caption>

      <h3 className="mt-8 text-lg font-bold">주택용 누진 구간 (평시 기준)</h3>
      <Table>
        <thead className="border-b border-ink-200 bg-ink-50 text-xs">
          <tr>
            <th scope="col" className={TH}>
              구간
            </th>
            <th scope="col" className={`${TH} text-right`}>
              저압 전력량요금
            </th>
            <th scope="col" className={`${TH} text-right`}>
              고압 전력량요금
            </th>
          </tr>
        </thead>
        <tbody>
          {RESIDENTIAL_LOW_VOLTAGE.tiers.map((tier, index) => (
            <tr key={tier.rate} className="border-b border-ink-100 last:border-0">
              <th scope="row" className={`${TD} font-semibold text-ink-900`}>
                {tierLabel(RESIDENTIAL_LOW_VOLTAGE, index, locale)}
              </th>
              <td className={`${TD} text-right`}>
                {formatNumber(tier.rate, locale, { max: 1 })}원/kWh
              </td>
              <td className={`${TD} text-right`}>
                {formatNumber(RESIDENTIAL_HIGH_VOLTAGE.tiers[index]?.rate ?? 0, locale, {
                  max: 1,
                })}
                원/kWh
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Caption>
        여기에 기본요금(저압 910~7,300원 / 고압 730~6,060원), 기후환경요금{' '}
        {RESIDENTIAL_LOW_VOLTAGE.climateRate}원/kWh, 연료비조정요금{' '}
        {RESIDENTIAL_LOW_VOLTAGE.fuelAdjustRate}원/kWh가 더해집니다. 7~8월과 12~2월에는 1,000kWh
        초과분에 슈퍼유저 요금(저압 736.2원, 고압 601.3원)이 적용됩니다. 요금표 기준일{' '}
        {ELECTRICITY_BASIS.tariffEffectiveDate}, 기금 부담률 기준일{' '}
        {ELECTRICITY_BASIS.fundRateEffectiveDate}.
      </Caption>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 급여 — 연봉별 실수령액 + 4대보험 요율
 * ------------------------------------------------------------------------- */

const SALARY_STEPS = [
  24_000_000, 30_000_000, 36_000_000, 40_000_000, 50_000_000, 60_000_000, 70_000_000, 80_000_000,
  100_000_000,
] as const;

export function SalaryReferenceTable({ locale }: { locale: Locale }) {
  if (locale !== 'ko') return null;

  // 1인 가구·자녀 없음·비과세 식대 20만원 — 가장 흔한 조건을 기준으로 잡는다.
  const rows = SALARY_STEPS.map((annual) => ({
    annual,
    result: calcSalary({
      annualSalary: annual,
      nonTaxableMonthly: 200_000,
      dependents: 1,
      children: 0,
    }),
  }));

  return (
    <section className="mt-12">
      <h2 id="reference" className="text-xl font-bold sm:text-[1.5rem]">
        연봉별 실수령액 조견표 ({PAYROLL_BASIS.rateYear}년 기준)
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
        위 계산기와 같은 요율로 미리 계산한 표입니다. 1인 가구, 부양가족 본인 1명, 자녀 없음, 월
        비과세 식대 20만원을 기준으로 했습니다. 부양가족이나 자녀가 있으면 실수령액이 올라갑니다.
      </p>

      <Table>
        <thead className="border-b border-ink-200 bg-ink-50 text-xs">
          <tr>
            <th scope="col" className={TH}>
              연봉
            </th>
            <th scope="col" className={`${TH} text-right`}>
              월 세전
            </th>
            <th scope="col" className={`${TH} text-right`}>
              월 공제액
            </th>
            <th scope="col" className={`${TH} text-right`}>
              월 실수령액
            </th>
            <th scope="col" className={`${TH} text-right`}>
              공제율
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ annual, result }) => (
            <tr key={annual} className="border-b border-ink-100 last:border-0">
              <th scope="row" className={`${TD} font-semibold text-ink-900`}>
                {annual >= 100_000_000
                  ? `${formatNumber(annual / 100_000_000, locale, { max: 1 })}억원`
                  : `${formatNumber(annual / 10_000, locale)}만원`}
              </th>
              <td className={`${TD} text-right`}>
                {result ? formatMoney(Math.round(result.monthlyGross), locale) : '—'}
              </td>
              <td className={`${TD} text-right text-ink-500`}>
                {result ? `-${formatMoney(result.totalDeduction, locale)}` : '—'}
              </td>
              <td className={`${TD} text-right font-semibold text-ink-900`}>
                {result ? formatMoney(result.netMonthly, locale) : '—'}
              </td>
              <td className={`${TD} text-right text-ink-500`}>
                {result
                  ? `${formatNumber(result.deductionRate, locale, { min: 1, max: 1 })}%`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Caption>
        소득세는 근로소득공제·기본공제·근로소득세액공제를 반영한 근사 계산이며, 실제
        원천징수액은 간이세액표와 개인별 공제 항목에 따라 달라집니다. 최종 세액은 연말정산으로
        정산됩니다.
      </Caption>

      <h3 className="mt-8 text-lg font-bold">
        4대보험 근로자 부담 요율 ({PAYROLL_BASIS.rateYear}년)
      </h3>
      <Table>
        <thead className="border-b border-ink-200 bg-ink-50 text-xs">
          <tr>
            <th scope="col" className={TH}>
              항목
            </th>
            <th scope="col" className={`${TH} text-right`}>
              근로자 부담
            </th>
            <th scope="col" className={TH}>
              부과 기준
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <th scope="row" className={`${TD} font-semibold text-ink-900`}>
              국민연금
            </th>
            <td className={`${TD} text-right`}>
              {formatNumber(INSURANCE_RATES.nationalPension * 100, locale, {
                max: 3,
              })}
              %
            </td>
            <td className={`${TD} text-ink-500`}>
              기준소득월액 {formatNumber(PENSION_INCOME_LIMIT.min / 10_000, locale)}만~
              {formatNumber(PENSION_INCOME_LIMIT.max / 10_000, locale)}만원
            </td>
          </tr>
          <tr className="border-b border-ink-100">
            <th scope="row" className={`${TD} font-semibold text-ink-900`}>
              건강보험
            </th>
            <td className={`${TD} text-right`}>
              {formatNumber(INSURANCE_RATES.health * 100, locale, { max: 3 })}%
            </td>
            <td className={`${TD} text-ink-500`}>보수월액 전액</td>
          </tr>
          <tr className="border-b border-ink-100">
            <th scope="row" className={`${TD} font-semibold text-ink-900`}>
              장기요양보험
            </th>
            <td className={`${TD} text-right`}>
              건강보험료의{' '}
              {formatNumber(INSURANCE_RATES.longTermCare * 100, locale, {
                max: 2,
              })}
              %
            </td>
            <td className={`${TD} text-ink-500`}>건강보험료에 부과</td>
          </tr>
          <tr>
            <th scope="row" className={`${TD} font-semibold text-ink-900`}>
              고용보험
            </th>
            <td className={`${TD} text-right`}>
              {formatNumber(INSURANCE_RATES.employment * 100, locale, { max: 2 })}
              %
            </td>
            <td className={`${TD} text-ink-500`}>실업급여분</td>
          </tr>
        </tbody>
      </Table>
      <Caption>
        국민연금은 연금개혁에 따라 2033년까지 매년 0.5%p씩 올라갑니다(총 요율{' '}
        {formatNumber(INSURANCE_RATES.nationalPension * 2 * 100, locale, {
          max: 1,
        })}
        % 중 절반을 근로자가 부담). 기준일 {PAYROLL_BASIS.basisDate}, 국민연금 기준소득월액 적용
        기간 {PAYROLL_BASIS.pensionLimitPeriod}.
      </Caption>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * 시급·주휴수당 — 최저임금 기준 월급 환산
 * ------------------------------------------------------------------------- */

const WEEKLY_HOURS_STEPS = [15, 20, 25, 30, 35, 40] as const;

export function WageReferenceTable({ locale }: { locale: Locale }) {
  if (locale !== 'ko') return null;

  const hourly = MINIMUM_WAGE.hourly;
  const rows = WEEKLY_HOURS_STEPS.map((weekly) => {
    // 주휴수당: 주 15시간 이상이면 (주 소정근로시간 / 40) × 8시간
    const holidayHours = weekly >= 15 ? (Math.min(weekly, 40) / 40) * 8 : 0;
    const monthlyHours = ((weekly + holidayHours) * 365) / 7 / 12;
    return {
      weekly,
      holidayHours,
      monthlyHours,
      monthlyPay: Math.round((hourly * monthlyHours) / 10) * 10,
      effectiveHourly: weekly > 0 ? (hourly * (weekly + holidayHours)) / weekly : hourly,
    };
  });

  return (
    <section className="mt-12">
      <h2 id="reference" className="text-xl font-bold sm:text-[1.5rem]">
        최저임금 기준 주급·월급 조견표 (2026년)
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
        2026년 최저임금 시간급 <strong>{formatMoney(hourly, locale)}</strong> 기준입니다. 주
        15시간 이상 일하면 주휴수당이 붙어 실질 시급이 표시 시급보다 높아집니다. 주 40시간이면 월
        소정근로시간이 {MONTHLY_WORK_HOURS_209}시간입니다.
      </p>

      <Table>
        <thead className="border-b border-ink-200 bg-ink-50 text-xs">
          <tr>
            <th scope="col" className={TH}>
              주 근로시간
            </th>
            <th scope="col" className={`${TH} text-right`}>
              주휴시간
            </th>
            <th scope="col" className={`${TH} text-right`}>
              월 환산시간
            </th>
            <th scope="col" className={`${TH} text-right`}>
              월급(세전)
            </th>
            <th scope="col" className={`${TH} text-right`}>
              실질 시급
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.weekly} className="border-b border-ink-100 last:border-0">
              <th scope="row" className={`${TD} font-semibold text-ink-900`}>
                {row.weekly}시간
              </th>
              <td className={`${TD} text-right`}>
                {row.holidayHours > 0
                  ? `${formatNumber(row.holidayHours, locale, { max: 1 })}시간`
                  : '없음'}
              </td>
              <td className={`${TD} text-right`}>
                {formatNumber(Math.round(row.monthlyHours), locale)}시간
              </td>
              <td className={`${TD} text-right font-semibold text-ink-900`}>
                {formatMoney(row.monthlyPay, locale)}
              </td>
              <td className={`${TD} text-right text-ink-500`}>
                {formatMoney(Math.round(row.effectiveHourly), locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Caption>
        주 15시간 미만은 주휴수당 대상이 아닙니다. 월 환산시간은 (주 소정근로시간 + 주휴시간) ×
        365 ÷ 7 ÷ 12로 계산했으며, 실제 급여는 근로계약과 사업장 규정에 따라 달라질 수 있습니다.
        {MINIMUM_WAGE.sourceLabel}.
      </Caption>
    </section>
  );
}
