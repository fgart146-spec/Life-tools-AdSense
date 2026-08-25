'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcSeverance, findSeveranceIssues } from '@/lib/calc/wage';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { DateField } from '@/components/tool/DateField';
import { FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { SeverancePayCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<SeverancePayCopy>) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recentPay, setRecentPay] = useState('');
  const [bonus, setBonus] = useState('');
  const [leavePay, setLeavePay] = useState('');

  const input = useMemo(
    () => ({
      startDate,
      endDate,
      recentPay: parseNumber(recentPay),
      annualBonus: parseNumber(bonus),
      annualLeavePay: parseNumber(leavePay),
    }),
    [startDate, endDate, recentPay, bonus, leavePay],
  );

  const result = useMemo(() => calcSeverance(input), [input]);
  const issueMessages = findSeveranceIssues(input).map((issue) => {
    if (issue === 'dates') return copy.issueDates;
    if (issue === 'period') return copy.issuePeriod;
    return copy.issuePay;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        {
          label: copy.workedDaysLabel,
          value: `${formatNumber(result.workedDays, locale)} 일`,
        },
        {
          label: copy.workedYearsLabel,
          value: `${formatNumber(result.workedYears, locale, { max: 2 })} 년`,
        },
        { label: copy.dailyWageLabel, value: money(result.dailyAverageWage), emphasis: true },
        {
          label: copy.averageDaysLabel,
          value: `${formatNumber(result.averageDays, locale)} 일`,
        },
      ]
    : [];

  const notes = result
    ? [
        ...(result.eligible
          ? [interpolate(copy.noteSeverance, { severance: money(result.severance) })]
          : [copy.noteNotEligible]),
        interpolate(copy.notePeriod, {
          years: formatNumber(result.workedYears, locale, { max: 2 }),
          days: formatNumber(result.workedDays, locale),
        }),
        interpolate(copy.noteDaily, { daily: money(result.dailyAverageWage) }),
        copy.noteOrdinaryWage,
        copy.noteTax,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setStartDate('');
        setEndDate('');
        setRecentPay('');
        setBonus('');
        setLeavePay('');
      }}
      inputs={
        <>
          <FieldRow>
            <DateField
              label={copy.startDateLabel}
              value={startDate}
              onChange={setStartDate}
              hint={copy.startDateHint}
            />
            <DateField
              label={copy.endDateLabel}
              value={endDate}
              onChange={setEndDate}
              hint={copy.endDateHint}
            />
          </FieldRow>
          <NumberField
            label={copy.recentPayLabel}
            value={recentPay}
            onChange={setRecentPay}
            unit={copy.recentPayUnit}
            hint={copy.recentPayHint}
            placeholder={copy.recentPayPlaceholder}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.bonusLabel}
              value={bonus}
              onChange={setBonus}
              unit={copy.recentPayUnit}
              hint={copy.bonusHint}
              grouped
            />
            <NumberField
              label={copy.leavePayLabel}
              value={leavePay}
              onChange={setLeavePay}
              unit={copy.recentPayUnit}
              hint={copy.leavePayHint}
              grouped
            />
          </FieldRow>
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
                  label={copy.severanceLabel}
                  value={money(result.severance)}
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
