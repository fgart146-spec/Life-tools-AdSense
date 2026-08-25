'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldGroup, FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { calcCardCoupon, findIssues } from './calc';
import type { CardCouponCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<CardCouponCopy>) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [couponPercent, setCouponPercent] = useState('');
  const [couponAmount, setCouponAmount] = useState('');
  const [cardPercent, setCardPercent] = useState('');
  const [cardCap, setCardCap] = useState('');
  const [shipping, setShipping] = useState('');
  const [pointPercent, setPointPercent] = useState('');

  const parsed = useMemo(
    () => ({
      price: parseNumber(price),
      quantity: parseNumber(quantity),
      couponPercent: parseNumber(couponPercent),
      couponAmount: parseNumber(couponAmount),
      cardPercent: parseNumber(cardPercent),
      cardCap: parseNumber(cardCap),
      shipping: parseNumber(shipping),
      pointPercent: parseNumber(pointPercent),
    }),
    [price, quantity, couponPercent, couponAmount, cardPercent, cardCap, shipping, pointPercent],
  );

  const result = useMemo(() => calcCardCoupon(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'quantity') return copy.issueQuantity;
    if (issue === 'percent') return copy.issuePercent;
    return copy.issueAmount;
  });

  const money = (value: number) => formatMoney(value, locale);
  const quantityValue = parsed.quantity ?? 1;

  const rows = result
    ? [
        { label: copy.listTotalLabel, value: money(result.listTotal) },
        ...(result.couponDiscount > 0
          ? [{ label: copy.couponDiscountLabel, value: `- ${money(result.couponDiscount)}` }]
          : []),
        ...(result.cardDiscount > 0
          ? [{ label: copy.cardDiscountLabel, value: `- ${money(result.cardDiscount)}` }]
          : []),
        ...(result.shipping > 0
          ? [{ label: copy.shippingRowLabel, value: `+ ${money(result.shipping)}` }]
          : []),
        ...(result.points > 0
          ? [{ label: copy.pointLabel, value: `- ${money(result.points)}` }]
          : []),
        { label: copy.effectiveLabel, value: money(result.effectiveCost), emphasis: true },
        { label: copy.effectiveRateLabel, value: formatPercent(result.effectiveRate, locale) },
        ...(quantityValue > 1
          ? [{ label: copy.perItemLabel, value: money(result.perItem) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.notePayment, { payment: money(result.payment) }),
        interpolate(copy.noteEffective, {
          effective: money(result.effectiveCost),
          rate: formatPercent(result.effectiveRate, locale),
        }),
        ...(result.cardCapped
          ? [interpolate(copy.noteCap, { cap: money(result.cardDiscount) })]
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
        setCouponPercent('');
        setCouponAmount('');
        setCardPercent('');
        setCardCap('');
        setShipping('');
        setPointPercent('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.priceLabel}
              value={price}
              onChange={setPrice}
              unit={copy.priceUnit}
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
          <FieldGroup title={copy.couponPercentLabel}>
            <FieldRow>
              <NumberField
                label={copy.couponPercentLabel}
                value={couponPercent}
                onChange={setCouponPercent}
                unit="%"
                allowDecimal
              />
              <NumberField
                label={copy.couponAmountLabel}
                value={couponAmount}
                onChange={setCouponAmount}
                unit={copy.priceUnit}
                grouped
              />
            </FieldRow>
          </FieldGroup>
          <FieldGroup title={copy.cardPercentLabel}>
            <FieldRow>
              <NumberField
                label={copy.cardPercentLabel}
                value={cardPercent}
                onChange={setCardPercent}
                unit="%"
                allowDecimal
              />
              <NumberField
                label={copy.cardCapLabel}
                value={cardCap}
                onChange={setCardCap}
                unit={copy.priceUnit}
                hint={copy.cardCapHint}
                grouped
              />
            </FieldRow>
          </FieldGroup>
          <FieldRow>
            <NumberField
              label={copy.shippingLabel}
              value={shipping}
              onChange={setShipping}
              unit={copy.priceUnit}
              grouped
            />
            <NumberField
              label={copy.pointPercentLabel}
              value={pointPercent}
              onChange={setPointPercent}
              unit="%"
              hint={copy.pointHint}
              allowDecimal
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
                  label={copy.paymentLabel}
                  value={money(result.payment)}
                  tone="positive"
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
