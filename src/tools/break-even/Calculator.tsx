'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcBreakEven, findBreakEvenIssues } from '@/lib/calc/business';
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
import type { BreakEvenCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<BreakEvenCopy>) {
  const [fixedCost, setFixedCost] = useState('');
  const [price, setPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');

  const input = useMemo(
    () => ({
      fixedCost: parseNumber(fixedCost),
      unitPrice: parseNumber(price),
      unitVariableCost: parseNumber(variableCost),
    }),
    [fixedCost, price, variableCost],
  );

  const result = useMemo(() => calcBreakEven(input), [input]);
  const issueMessages = findBreakEvenIssues(input).map((issue) => {
    if (issue === 'fixed') return copy.issueFixed;
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'variable') return copy.issueVariable;
    return copy.issueMargin;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.revenueLabel, value: money(result.breakEvenRevenue), emphasis: true },
        { label: copy.contributionLabel, value: money(result.contributionMargin) },
        {
          label: copy.contributionRateLabel,
          value: formatPercent(result.contributionRate, locale),
        },
        {
          label: copy.perDayLabel,
          value: `${formatNumber(result.unitsPerDay, locale, { max: 1 })}`,
        },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteMain, {
          units: formatNumber(Math.ceil(result.breakEvenUnits), locale),
          revenue: money(result.breakEvenRevenue),
        }),
        interpolate(copy.noteContribution, {
          contribution: money(result.contributionMargin),
          rate: formatPercent(result.contributionRate, locale),
        }),
        interpolate(copy.notePerDay, {
          perDay: formatNumber(result.unitsPerDay, locale, { max: 1 }),
        }),
        copy.noteFixed,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setFixedCost('');
        setPrice('');
        setVariableCost('');
      }}
      inputs={
        <>
          <NumberField
            label={copy.fixedCostLabel}
            value={fixedCost}
            onChange={setFixedCost}
            unit={copy.fixedCostUnit}
            hint={copy.fixedCostHint}
            placeholder={copy.fixedCostPlaceholder}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.priceLabel}
              value={price}
              onChange={setPrice}
              unit={copy.fixedCostUnit}
              hint={copy.priceHint}
              placeholder={copy.pricePlaceholder}
              grouped
            />
            <NumberField
              label={copy.variableCostLabel}
              value={variableCost}
              onChange={setVariableCost}
              unit={copy.fixedCostUnit}
              hint={copy.variableCostHint}
              placeholder={copy.variableCostPlaceholder}
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
                  label={copy.unitsLabel}
                  value={`${formatNumber(Math.ceil(result.breakEvenUnits), locale)} ${copy.unitsUnit}`}
                  sub={money(result.breakEvenRevenue)}
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
