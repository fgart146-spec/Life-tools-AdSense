'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { findWageIssues, hourlyToMonthly, monthlyToHourly } from '@/lib/calc/wage';
import { MINIMUM_WAGE } from '@/lib/data/kr-payroll';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { CheckboxField, FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { HourlyWageCopy } from './copy';

type Mode = 'toHourly' | 'toMonthly';

export function Calculator({ locale, copy, common }: CalculatorProps<HourlyWageCopy>) {
  const [mode, setMode] = useState<Mode>('toHourly');
  const [amount, setAmount] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('40');
  const [includeHoliday, setIncludeHoliday] = useState(true);

  const input = useMemo(
    () => ({
      amount: parseNumber(amount),
      weeklyHours: parseNumber(weeklyHours),
      includeHolidayPay: includeHoliday,
    }),
    [amount, weeklyHours, includeHoliday],
  );

  const result = useMemo(
    () =>
      mode === 'toHourly'
        ? monthlyToHourly(input, MINIMUM_WAGE.hourly)
        : hourlyToMonthly(input, MINIMUM_WAGE.hourly),
    [mode, input],
  );

  const issueMessages = findWageIssues(input).map((issue) =>
    issue === 'amount' ? copy.issueAmount : copy.issueHours,
  );

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        {
          label: mode === 'toHourly' ? copy.monthlyLabel : copy.hourlyLabel,
          value: money(mode === 'toHourly' ? result.monthly : result.hourly),
        },
        { label: copy.dailyLabel, value: money(result.daily8h) },
        { label: copy.weeklyLabel, value: money(result.weekly) },
        { label: copy.annualLabel, value: money(result.annual) },
        {
          label: copy.monthlyHoursLabel,
          value: `${formatNumber(result.monthlyHours, locale, { max: 1 })} 시간`,
        },
        ...(result.minimumWageRatio !== null
          ? [
              {
                label: copy.minimumRatioLabel,
                value: formatPercent(result.minimumWageRatio, locale),
                emphasis: result.minimumWageRatio < 100,
              },
            ]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteHourly, { hourly: money(result.hourly) }),
        interpolate(copy.noteMonthly, { monthly: money(result.monthly) }),
        interpolate(copy.noteHours, {
          hours: formatNumber(result.monthlyHours, locale, { max: 1 }),
        }),
        ...(result.minimumWageRatio !== null
          ? [
              result.minimumWageRatio < 100
                ? copy.noteBelowMinimum
                : interpolate(copy.noteMinimum, {
                    ratio: formatPercent(result.minimumWageRatio, locale),
                    minimum: money(MINIMUM_WAGE.hourly),
                  }),
            ]
          : []),
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setMode('toHourly');
        setAmount('');
        setWeeklyHours('40');
        setIncludeHoliday(true);
      }}
      inputs={
        <>
          <SegmentedField
            label={copy.modeLabel}
            value={mode}
            onChange={(value) => setMode(value as Mode)}
            options={[
              { value: 'toHourly', label: copy.modeToHourly },
              { value: 'toMonthly', label: copy.modeToMonthly },
            ]}
          />
          <FieldRow>
            <NumberField
              label={mode === 'toHourly' ? copy.amountLabelMonthly : copy.amountLabelHourly}
              value={amount}
              onChange={setAmount}
              unit={copy.amountUnit}
              hint={copy.amountHint}
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
          <CheckboxField
            label={copy.includeHolidayLabel}
            checked={includeHoliday}
            onChange={setIncludeHoliday}
            hint={copy.includeHolidayHint}
          />
        </>
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
                  label={mode === 'toHourly' ? copy.hourlyLabel : copy.monthlyLabel}
                  value={money(mode === 'toHourly' ? result.hourly : result.monthly)}
                  tone="positive"
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
