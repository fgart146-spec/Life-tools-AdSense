'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
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
import { calcUnitPriceEach, findIssues } from './calc';
import type { UnitPriceEachCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<UnitPriceEachCopy>) {
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');
  const [subAmount, setSubAmount] = useState('');
  const [subUnit, setSubUnit] = useState('');

  const parsed = useMemo(
    () => ({
      price: parseNumber(price),
      count: parseNumber(count),
      subAmount: parseNumber(subAmount),
    }),
    [price, count, subAmount],
  );

  const result = useMemo(() => calcUnitPriceEach(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'count') return copy.issueCount;
    return copy.issueSubAmount;
  });

  const money = (value: number) => formatMoney(value, locale, value > 0 && value < 100 ? 1 : 0);
  const unitLabel = subUnit.trim();

  const rows =
    result && result.perSub !== null && result.totalSub !== null
      ? [
          {
            label: unitLabel ? `${copy.perSubLabel} (${unitLabel})` : copy.perSubLabel,
            value: money(result.perSub),
            emphasis: true,
          },
          {
            label: copy.totalSubLabel,
            value: `${formatNumber(result.totalSub, locale, { max: 1 })}${unitLabel ? ` ${unitLabel}` : ''}`,
          },
        ]
      : [];

  const notes = result
    ? [
        interpolate(copy.noteMain, { perItem: money(result.perItem) }),
        ...(result.perSub !== null
          ? [
              interpolate(copy.noteSub, {
                perSub: money(result.perSub),
                unit: unitLabel || copy.subUnitPlaceholder,
              }),
            ]
          : []),
        copy.noteCompare,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setPrice('');
        setCount('');
        setSubAmount('');
        setSubUnit('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.priceLabel}
              value={price}
              onChange={setPrice}
              unit={copy.priceUnit}
              hint={copy.priceHint}
              placeholder={copy.pricePlaceholder}
              grouped
            />
            <NumberField
              label={copy.countLabel}
              value={count}
              onChange={setCount}
              unit={copy.countUnit}
              hint={copy.countHint}
              placeholder={copy.countPlaceholder}
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.subAmountLabel}
              value={subAmount}
              onChange={setSubAmount}
              hint={copy.subAmountHint}
              placeholder={copy.subAmountPlaceholder}
              allowDecimal
            />
            <div className="min-w-0">
              <label
                htmlFor="sub-unit"
                className="mb-1.5 block text-sm font-medium text-ink-700"
              >
                {copy.subUnitLabel}
              </label>
              <input
                id="sub-unit"
                type="text"
                value={subUnit}
                onChange={(event) => setSubUnit(event.target.value)}
                placeholder={copy.subUnitPlaceholder}
                maxLength={8}
                className="h-12 w-full rounded-lg border border-ink-300 bg-white px-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
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
                  label={copy.perItemLabel}
                  value={money(result.perItem)}
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
