'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import type { AmountUnit } from '@/lib/calc/unit-price';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { calcBulkVsSmall, findIssues } from './calc';
import type { BulkVsSmallCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<BulkVsSmallCopy>) {
  const [bulkPrice, setBulkPrice] = useState('');
  const [bulkAmount, setBulkAmount] = useState('');
  const [smallPrice, setSmallPrice] = useState('');
  const [smallAmount, setSmallAmount] = useState('');
  const [unit, setUnit] = useState<AmountUnit>('ml');
  const [usage, setUsage] = useState('100');

  const parsed = useMemo(
    () => ({
      bulkPrice: parseNumber(bulkPrice),
      bulkAmount: parseNumber(bulkAmount),
      smallPrice: parseNumber(smallPrice),
      smallAmount: parseNumber(smallAmount),
      unit,
      usagePercent: parseNumber(usage),
    }),
    [bulkPrice, bulkAmount, smallPrice, smallAmount, unit, usage],
  );

  const result = useMemo(() => calcBulkVsSmall(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'bulkPrice') return copy.issueBulkPrice;
    if (issue === 'bulkAmount') return copy.issueBulkAmount;
    if (issue === 'smallPrice') return copy.issueSmallPrice;
    if (issue === 'smallAmount') return copy.issueSmallAmount;
    return copy.issueUsage;
  });

  const unitSymbol = unit === 'g' ? 'g' : unit === 'ml' ? 'ml' : '';
  const per100 = (value: number) => formatMoney(value * 100, locale, value * 100 < 100 ? 1 : 0);
  const usageValue = parsed.usagePercent ?? 100;

  const verdict =
    result?.better === 'bulk'
      ? copy.betterBulk
      : result?.better === 'small'
        ? copy.betterSmall
        : copy.tie;

  const rows = result
    ? [
        { label: `${copy.bulkUnitLabel} (100${unitSymbol})`, value: per100(result.bulkUnitPrice) },
        {
          label: `${copy.smallUnitLabel} (100${unitSymbol})`,
          value: per100(result.smallUnitPrice),
        },
        ...(usageValue < 100
          ? [
              {
                label: `${copy.bulkEffectiveLabel} (100${unitSymbol})`,
                value: per100(result.bulkEffectiveUnitPrice),
                emphasis: true,
              },
            ]
          : []),
        ...(result.breakEvenUsage !== null
          ? [
              {
                label: copy.breakEvenLabel,
                value: formatPercent(Math.min(result.breakEvenUsage, 999), locale),
              },
            ]
          : []),
      ]
    : [];

  const notes = result
    ? result.better === 'tie'
      ? [copy.noteTie, copy.noteCaution]
      : [
          interpolate(copy.noteVerdict, {
            better: verdict,
            diff: formatPercent(result.diffPercent, locale),
          }),
          ...(usageValue < 100
            ? [
                interpolate(copy.noteUsage, {
                  usage: formatPercent(usageValue, locale),
                  effective: per100(result.bulkEffectiveUnitPrice),
                }),
              ]
            : []),
          ...(result.breakEvenUsage !== null && result.breakEvenUsage <= 100
            ? [
                interpolate(copy.noteBreakEven, {
                  breakEven: formatPercent(result.breakEvenUsage, locale),
                }),
              ]
            : []),
          copy.noteCaution,
        ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setBulkPrice('');
        setBulkAmount('');
        setSmallPrice('');
        setSmallAmount('');
        setUnit('ml');
        setUsage('100');
      }}
      inputs={
        <>
          <div className="rounded-lg border border-ink-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-brand-700">{copy.bulkTitle}</h3>
            <FieldRow>
              <NumberField
                label={copy.priceLabel}
                value={bulkPrice}
                onChange={setBulkPrice}
                unit={copy.priceUnit}
                placeholder={copy.bulkPricePlaceholder}
                grouped
              />
              <NumberField
                label={copy.amountLabel}
                value={bulkAmount}
                onChange={setBulkAmount}
                placeholder={copy.bulkAmountPlaceholder}
                allowDecimal
              />
            </FieldRow>
          </div>
          <div className="rounded-lg border border-ink-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-brand-700">{copy.smallTitle}</h3>
            <FieldRow>
              <NumberField
                label={copy.priceLabel}
                value={smallPrice}
                onChange={setSmallPrice}
                unit={copy.priceUnit}
                placeholder={copy.smallPricePlaceholder}
                grouped
              />
              <NumberField
                label={copy.amountLabel}
                value={smallAmount}
                onChange={setSmallAmount}
                placeholder={copy.smallAmountPlaceholder}
                allowDecimal
              />
            </FieldRow>
          </div>
          <SegmentedField
            label={copy.unitLabel}
            value={unit}
            onChange={(value) => setUnit(value as AmountUnit)}
            options={[
              { value: 'ml', label: copy.unitOptionMl },
              { value: 'g', label: copy.unitOptionG },
              { value: 'ea', label: copy.unitOptionEa },
            ]}
          />
          <NumberField
            label={copy.usageLabel}
            value={usage}
            onChange={setUsage}
            unit="%"
            hint={copy.usageHint}
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
                  label={copy.verdictLabel}
                  value={verdict}
                  sub={
                    result.better === 'tie'
                      ? undefined
                      : formatPercent(result.diffPercent, locale)
                  }
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
