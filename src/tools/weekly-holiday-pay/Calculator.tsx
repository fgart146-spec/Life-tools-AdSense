'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcHolidayPay } from '@/lib/calc/wage';
import { MINIMUM_WAGE } from '@/lib/data/kr-payroll';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { HolidayPayCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<HolidayPayCopy>) {
  const [hourly, setHourly] = useState(String(MINIMUM_WAGE.hourly));
  const [weeklyHours, setWeeklyHours] = useState('20');

  const hourlyValue = parseNumber(hourly);
  const hoursValue = parseNumber(weeklyHours);

  const result = useMemo(
    () => calcHolidayPay({ hourlyWage: hourlyValue, weeklyHours: hoursValue }),
    [hourlyValue, hoursValue],
  );

  const issueMessages: string[] = [];
  if (hourlyValue !== null && hourlyValue < 0) issueMessages.push(copy.issueHourly);
  if (hoursValue !== null && (hoursValue <= 0 || hoursValue > 68)) {
    issueMessages.push(copy.issueHours);
  }

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        {
          label: copy.holidayHoursLabel,
          value: `${formatNumber(result.holidayHours, locale, { max: 1 })} 시간`,
        },
        { label: copy.weeklyWorkPayLabel, value: money(result.weeklyWorkPay) },
        { label: copy.weeklyTotalLabel, value: money(result.weeklyTotal), emphasis: true },
        { label: copy.monthlyAmountLabel, value: money(result.monthlyAmount) },
      ]
    : [];

  const notes = result
    ? result.eligible
      ? [
          interpolate(copy.noteAmount, { amount: money(result.weeklyAmount) }),
          interpolate(copy.noteHours, {
            hours: formatNumber(result.holidayHours, locale, { max: 1 }),
          }),
          interpolate(copy.noteMonthly, { monthly: money(result.monthlyAmount) }),
          copy.noteCondition,
        ]
      : [copy.noteNotEligible, copy.noteCondition]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setHourly(String(MINIMUM_WAGE.hourly));
        setWeeklyHours('20');
      }}
      inputs={
        <FieldRow>
          <NumberField
            label={copy.hourlyLabel}
            value={hourly}
            onChange={setHourly}
            unit={copy.hourlyUnit}
            hint={copy.hourlyHint}
            placeholder={copy.hourlyPlaceholder}
            grouped
          />
          <NumberField
            label={copy.weeklyHoursLabel}
            value={weeklyHours}
            onChange={setWeeklyHours}
            unit={copy.weeklyHoursUnit}
            hint={copy.weeklyHoursHint}
            allowDecimal
          />
        </FieldRow>
      }
      results={
        <div className="grid gap-4">
          <ResultIssues title={common.issuesTitle} items={issueMessages} />
          <ResultPanel
            title={common.resultTitle}
            isEmpty={!result}
            placeholder={common.placeholder}
          >
            {result && (
              <>
                <ResultHeadline
                  label={copy.weeklyAmountLabel}
                  value={money(result.weeklyAmount)}
                  tone={result.eligible ? 'positive' : 'warning'}
                />
                <ResultRows rows={rows} />
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
