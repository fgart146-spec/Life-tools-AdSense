'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcBogo, findIssues } from '@/lib/calc/bogo';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { BogoToolCopy } from '@/lib/tools/shared/bogo-copy';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';

/**
 * 증정 행사(N+M) 계산기.
 * 도구별로 기본 개수만 다르고 계산·표시 구조가 같아 컴포넌트를 공유한다.
 */
export function BogoCalculator({
  locale,
  copy,
  common,
  defaultBuy,
  defaultFree,
}: CalculatorProps<BogoToolCopy> & { defaultBuy: number; defaultFree: number }) {
  const [price, setPrice] = useState('');
  const [buy, setBuy] = useState(String(defaultBuy));
  const [free, setFree] = useState(String(defaultFree));
  const [compare, setCompare] = useState('');

  const parsed = useMemo(
    () => ({
      unitPrice: parseNumber(price),
      buy: parseNumber(buy),
      free: parseNumber(free),
      compareDiscountPercent: parseNumber(compare),
    }),
    [price, buy, free, compare],
  );

  const result = useMemo(() => calcBogo(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'buy') return copy.issueBuy;
    if (issue === 'free') return copy.issueFree;
    return copy.issueCompare;
  });

  const money = (value: number) => formatMoney(value, locale, value > 0 && value < 100 ? 1 : 0);

  const rows = result
    ? [
        { label: copy.effectiveUnitLabel, value: money(result.effectiveUnitPrice), emphasis: true },
        { label: copy.totalItemsLabel, value: formatNumber(result.totalItems, locale) },
        { label: copy.paidLabel, value: money(result.paid) },
        ...(result.comparison
          ? [{ label: copy.comparePriceLabel, value: money(result.comparison.discountedUnitPrice) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteRate, { rate: formatPercent(result.discountRate, locale) }),
        interpolate(copy.noteUnit, {
          unitPrice: money(result.effectiveUnitPrice),
          items: formatNumber(result.totalItems, locale),
        }),
        ...(result.comparison
          ? [
              result.comparison.better === 'tie'
                ? copy.noteCompareTie
                : interpolate(copy.noteCompare, {
                    better:
                      result.comparison.better === 'bogo' ? copy.betterBogo : copy.betterDiscount,
                    diff: formatPercent(result.comparison.diffPercent, locale),
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
        setPrice('');
        setBuy(String(defaultBuy));
        setFree(String(defaultFree));
        setCompare('');
      }}
      inputs={
        <>
          <NumberField
            label={copy.priceLabel}
            value={price}
            onChange={setPrice}
            unit={copy.priceUnit}
            hint={copy.priceHint}
            placeholder={copy.pricePlaceholder}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.buyLabel}
              value={buy}
              onChange={setBuy}
              unit={copy.buyUnit}
              hint={copy.buyHint}
            />
            <NumberField
              label={copy.freeLabel}
              value={free}
              onChange={setFree}
              unit={copy.freeUnit}
              hint={copy.freeHint}
            />
          </FieldRow>
          <NumberField
            label={copy.compareLabel}
            value={compare}
            onChange={setCompare}
            unit="%"
            hint={copy.compareHint}
            allowDecimal
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
                  label={copy.discountRateLabel}
                  value={formatPercent(result.discountRate, locale)}
                  sub={`${copy.effectiveUnitLabel}: ${money(result.effectiveUnitPrice)}`}
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
