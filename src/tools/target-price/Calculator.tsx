'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcTargetPrice, findTargetPriceIssues } from '@/lib/calc/business';
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
import type { TargetPriceCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<TargetPriceCopy>) {
  const [cost, setCost] = useState('');
  const [margin, setMargin] = useState('30');
  const [fee, setFee] = useState('');
  const [shipping, setShipping] = useState('');
  const [other, setOther] = useState('');

  const input = useMemo(
    () => ({
      cost: parseNumber(cost),
      targetMarginPercent: parseNumber(margin),
      feePercent: parseNumber(fee),
      shipping: parseNumber(shipping),
      otherCost: parseNumber(other),
    }),
    [cost, margin, fee, shipping, other],
  );

  const result = useMemo(() => calcTargetPrice(input), [input]);
  const issueMessages = findTargetPriceIssues(input).map((issue) => {
    if (issue === 'cost') return copy.issueCost;
    if (issue === 'margin') return copy.issueMargin;
    if (issue === 'fee') return copy.issueFee;
    return copy.issueAmount;
  });

  const marginValue = input.targetMarginPercent ?? 0;
  const feeValue = input.feePercent ?? 0;
  if (marginValue + feeValue >= 100 && input.cost !== null) {
    issueMessages.push(copy.issueImpossible);
  }

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.priceWithVatLabel, value: money(result.priceWithVat) },
        { label: copy.profitLabel, value: money(result.profit), emphasis: true },
        ...(result.feeAmount > 0
          ? [{ label: copy.feeAmountLabel, value: money(result.feeAmount) }]
          : []),
        { label: copy.totalCostLabel, value: money(result.totalCost) },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.notePrice, {
          price: money(result.price),
          margin: formatPercent(marginValue, locale),
        }),
        interpolate(copy.noteProfit, { profit: money(result.profit) }),
        interpolate(copy.noteVat, { vat: money(result.priceWithVat) }),
        ...(feeValue > 0 ? [copy.noteFee] : []),
        copy.noteRound,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setCost('');
        setMargin('30');
        setFee('');
        setShipping('');
        setOther('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.costLabel}
              value={cost}
              onChange={setCost}
              unit={copy.costUnit}
              hint={copy.costHint}
              placeholder={copy.costPlaceholder}
              grouped
            />
            <NumberField
              label={copy.marginLabel}
              value={margin}
              onChange={setMargin}
              unit="%"
              hint={copy.marginHint}
              allowDecimal
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
              unit={copy.costUnit}
              hint={copy.shippingHint}
              grouped
            />
          </FieldRow>
          <NumberField
            label={copy.otherLabel}
            value={other}
            onChange={setOther}
            unit={copy.costUnit}
            hint={copy.otherHint}
            grouped
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
                  label={copy.priceLabel}
                  value={money(result.price)}
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
