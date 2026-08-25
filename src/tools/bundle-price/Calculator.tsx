'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import type { AmountUnit } from '@/lib/calc/unit-price';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultCallout,
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { calcBundlePrice, findIssues } from './calc';
import type { BundlePriceCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<BundlePriceCopy>) {
  const [bundlePrice, setBundlePrice] = useState('');
  const [count, setCount] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<AmountUnit>('ea');
  const [singlePrice, setSinglePrice] = useState('');

  const parsed = useMemo(
    () => ({
      bundlePrice: parseNumber(bundlePrice),
      count: parseNumber(count),
      amountPerItem: parseNumber(amount),
      unit,
      singlePrice: parseNumber(singlePrice),
    }),
    [bundlePrice, count, amount, unit, singlePrice],
  );

  const result = useMemo(() => calcBundlePrice(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'bundlePrice') return copy.issueBundlePrice;
    if (issue === 'count') return copy.issueCount;
    if (issue === 'amount') return copy.issueAmount;
    return copy.issueSinglePrice;
  });

  const money = (value: number) => formatMoney(value, locale, value > 0 && value < 100 ? 1 : 0);
  const unitSymbol = unit === 'g' ? 'g' : unit === 'ml' ? 'ml' : '';

  const rows = result
    ? [
        ...(result.per100 !== null
          ? [{ label: `100${unitSymbol} ${copy.per100Label}`, value: money(result.per100) }]
          : []),
        ...(result.totalAmount !== null
          ? [
              {
                label: copy.totalAmountLabel,
                value: `${formatNumber(result.totalAmount, locale, { max: 1 })} ${unitSymbol}`,
              },
            ]
          : []),
        ...(result.savingRate !== null
          ? [
              {
                label: copy.savingRateLabel,
                value: formatPercent(result.savingRate, locale),
                emphasis: true,
              },
            ]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteMain, { perItem: money(result.perItem) }),
        ...(result.per100 !== null
          ? [interpolate(copy.notePer100, { per100: money(result.per100), unit: unitSymbol })]
          : []),
        ...(result.savingRate !== null && result.savingAmount !== null
          ? [
              result.savingRate > 0
                ? interpolate(copy.noteSaving, {
                    rate: formatPercent(result.savingRate, locale),
                    amount: money(result.savingAmount),
                  })
                : copy.noteNoSaving,
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
        setBundlePrice('');
        setCount('');
        setAmount('');
        setUnit('ea');
        setSinglePrice('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.bundlePriceLabel}
              value={bundlePrice}
              onChange={setBundlePrice}
              unit={copy.bundlePriceUnit}
              hint={copy.bundlePriceHint}
              placeholder={copy.bundlePricePlaceholder}
              grouped
            />
            <NumberField
              label={copy.countLabel}
              value={count}
              onChange={setCount}
              unit={copy.countUnit}
              hint={copy.countHint}
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.amountLabel}
              value={amount}
              onChange={setAmount}
              hint={copy.amountHint}
              allowDecimal
            />
            <NumberField
              label={copy.singlePriceLabel}
              value={singlePrice}
              onChange={setSinglePrice}
              unit={copy.bundlePriceUnit}
              hint={copy.singlePriceHint}
              grouped
            />
          </FieldRow>
          <SegmentedField
            label={copy.unitLabel}
            value={unit}
            onChange={(value) => setUnit(value as AmountUnit)}
            options={[
              { value: 'ea', label: copy.unitOptionEa },
              { value: 'g', label: copy.unitOptionG },
              { value: 'ml', label: copy.unitOptionMl },
            ]}
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
                  label={copy.perItemLabel}
                  value={money(result.perItem)}
                  tone="positive"
                />
                <ResultRows rows={rows} />
                {result.savingAmount !== null && result.savingAmount > 0 && (
                  <ResultCallout title={common.savingsTitle}>
                    {copy.savingAmountLabel}: {money(result.savingAmount)}
                  </ResultCallout>
                )}
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
