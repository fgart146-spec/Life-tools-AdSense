'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
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
import { calcDiscountPrice, findIssues } from './calc';
import type { DiscountPriceCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<DiscountPriceCopy>) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [discount, setDiscount] = useState('');
  const [coupon, setCoupon] = useState('');

  const parsed = useMemo(
    () => ({
      price: parseNumber(price),
      quantity: parseNumber(quantity),
      discountPercent: parseNumber(discount),
      couponAmount: parseNumber(coupon),
    }),
    [price, quantity, discount, coupon],
  );

  const result = useMemo(() => calcDiscountPrice(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'quantity') return copy.issueQuantity;
    if (issue === 'discount') return copy.issueDiscount;
    return copy.issueCoupon;
  });

  const money = (value: number) => formatMoney(value, locale);
  const quantityValue = parsed.quantity ?? 1;

  const rows = result
    ? [
        { label: copy.listTotalLabel, value: money(result.listTotal) },
        { label: copy.discountAmountLabel, value: `- ${money(result.discountAmount)}` },
        {
          label: copy.effectiveRateLabel,
          value: formatPercent(result.effectiveRate, locale),
          emphasis: true,
        },
        ...(quantityValue > 1
          ? [{ label: copy.perItemLabel, value: money(result.perItem) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteFinal, { final: money(result.finalPrice) }),
        interpolate(copy.noteDiscount, {
          amount: money(result.discountAmount),
          rate: formatPercent(result.effectiveRate, locale),
        }),
        ...(quantityValue > 1
          ? [interpolate(copy.notePerItem, { perItem: money(result.perItem) })]
          : []),
        copy.noteOrder,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setPrice('');
        setQuantity('1');
        setDiscount('');
        setCoupon('');
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
              label={copy.quantityLabel}
              value={quantity}
              onChange={setQuantity}
              unit={copy.quantityUnit}
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.discountLabel}
              value={discount}
              onChange={setDiscount}
              unit="%"
              hint={copy.discountHint}
              allowDecimal
            />
            <NumberField
              label={copy.couponLabel}
              value={coupon}
              onChange={setCoupon}
              unit={copy.priceUnit}
              hint={copy.couponHint}
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
                  label={copy.finalLabel}
                  value={money(result.finalPrice)}
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
