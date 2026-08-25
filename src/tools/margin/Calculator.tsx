'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcMargin, findMarginIssues } from '@/lib/calc/business';
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
import type { MarginCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<MarginCopy>) {
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [fee, setFee] = useState('');
  const [shipping, setShipping] = useState('');
  const [other, setOther] = useState('');
  const [quantity, setQuantity] = useState('1');

  const input = useMemo(
    () => ({
      sellingPrice: parseNumber(price),
      cost: parseNumber(cost),
      feePercent: parseNumber(fee),
      shipping: parseNumber(shipping),
      otherCost: parseNumber(other),
      quantity: parseNumber(quantity),
    }),
    [price, cost, fee, shipping, other, quantity],
  );

  const result = useMemo(() => calcMargin(input), [input]);
  const issueMessages = findMarginIssues(input).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'cost') return copy.issueCost;
    if (issue === 'fee') return copy.issueFee;
    if (issue === 'quantity') return copy.issueQuantity;
    return copy.issueAmount;
  });

  const money = (value: number) => formatMoney(value, locale);
  const quantityValue = input.quantity ?? 1;

  const rows = result
    ? [
        { label: copy.revenueLabel, value: money(result.revenue) },
        ...(result.feeAmount > 0
          ? [{ label: copy.feeAmountLabel, value: `- ${money(result.feeAmount)}` }]
          : []),
        { label: copy.totalCostLabel, value: `- ${money(result.totalCost)}` },
        { label: copy.marginRateLabel, value: formatPercent(result.marginRate, locale), emphasis: true },
        { label: copy.costRateLabel, value: formatPercent(result.costRate, locale) },
        { label: copy.markupRateLabel, value: formatPercent(result.markupRate, locale) },
        ...(quantityValue > 1
          ? [{ label: copy.profitPerUnitLabel, value: money(result.profitPerUnit) }]
          : []),
        { label: copy.breakEvenPriceLabel, value: money(result.breakEvenPrice) },
      ]
    : [];

  const notes = result
    ? [
        result.profit >= 0
          ? interpolate(copy.noteProfit, {
              profit: money(result.profit),
              rate: formatPercent(result.marginRate, locale),
            })
          : copy.noteLoss,
        ...(quantityValue > 1
          ? [interpolate(copy.notePerUnit, { perUnit: money(result.profitPerUnit) })]
          : []),
        interpolate(copy.noteBreakEven, { breakEven: money(result.breakEvenPrice) }),
        copy.noteVat,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setPrice('');
        setCost('');
        setFee('');
        setShipping('');
        setOther('');
        setQuantity('1');
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
              label={copy.costLabel}
              value={cost}
              onChange={setCost}
              unit={copy.priceUnit}
              hint={copy.costHint}
              placeholder={copy.costPlaceholder}
              grouped
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.feeLabel}
              value={fee}
              onChange={setFee}
              unit="%"
              hint={copy.feeHint}
              allowDecimal
            />
            <NumberField
              label={copy.shippingLabel}
              value={shipping}
              onChange={setShipping}
              unit={copy.priceUnit}
              hint={copy.shippingHint}
              grouped
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.otherLabel}
              value={other}
              onChange={setOther}
              unit={copy.priceUnit}
              hint={copy.otherHint}
              grouped
            />
            <NumberField
              label={copy.quantityLabel}
              value={quantity}
              onChange={setQuantity}
              unit={copy.quantityUnit}
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
                  label={copy.profitLabel}
                  value={money(result.profit)}
                  sub={`${copy.marginRateLabel}: ${formatPercent(result.marginRate, locale)}`}
                  tone={result.profit >= 0 ? 'positive' : 'warning'}
                />
                <ResultRows rows={rows} title={common.breakdownTitle} />
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
