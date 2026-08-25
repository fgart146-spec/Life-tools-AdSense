'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import {
  computeUnitPrice,
  findUnitPriceIssues,
  type AmountUnit,
} from '@/lib/calc/unit-price';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';

/**
 * 용량 단가 계산기 (100g당 / 100ml당).
 * 무게·부피만 다르고 입력·결과 구조가 같아 컴포넌트를 공유한다.
 * 도구별 문구는 content.ui(UnitPriceToolCopy)에서 주입한다.
 */
export function UnitPriceCalculator({
  locale,
  copy,
  common,
  variant,
}: CalculatorProps<UnitPriceToolCopy> & { variant: 'mass' | 'volume' }) {
  const smallUnit: AmountUnit = variant === 'mass' ? 'g' : 'ml';
  const largeUnit: AmountUnit = variant === 'mass' ? 'kg' : 'l';
  const smallSymbol = variant === 'mass' ? 'g' : 'ml';

  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<AmountUnit>(smallUnit);
  const [quantity, setQuantity] = useState('1');

  const parsed = useMemo(
    () => ({
      price: parseNumber(price),
      amount: parseNumber(amount),
      quantity: parseNumber(quantity),
    }),
    [price, amount, quantity],
  );

  const result = useMemo(() => {
    if (parsed.price === null || parsed.amount === null) return null;
    return computeUnitPrice({
      cost: parsed.price,
      amountPerItem: parsed.amount,
      unit,
      quantity: parsed.quantity ?? 1,
    });
  }, [parsed, unit]);

  const issueMessages = findUnitPriceIssues(parsed).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'amount') return copy.issueAmount;
    return copy.issueQuantity;
  });

  const money = (value: number) => formatMoney(value, locale, value > 0 && value < 100 ? 1 : 0);
  const quantityValue = parsed.quantity ?? 1;

  const primary = result?.pricePer100 ?? null;
  const secondary = result?.pricePer1000 ?? null;

  const rows =
    result && secondary !== null
      ? [
          { label: copy.secondaryLabel, value: money(secondary) },
          {
            label: copy.totalLabel,
            value: `${formatNumber(result.totalBaseAmount, locale, { max: 1 })} ${smallSymbol}`,
          },
          ...(quantityValue > 1
            ? [{ label: copy.perItemLabel, value: money(result.pricePerItem) }]
            : []),
        ]
      : [];

  const notes =
    result && primary !== null && secondary !== null
      ? [
          interpolate(copy.noteMain, { primary: money(primary) }),
          interpolate(copy.noteSecondary, { secondary: money(secondary) }),
          ...(quantityValue > 1
            ? [
                interpolate(copy.noteQuantity, {
                  quantity: formatNumber(quantityValue, locale),
                  perItem: money(result.pricePerItem),
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
        setAmount('');
        setUnit(smallUnit);
        setQuantity('1');
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
              label={copy.amountLabel}
              value={amount}
              onChange={setAmount}
              unit={unit === smallUnit ? copy.unitSmall : copy.unitLarge}
              hint={copy.amountHint}
              placeholder={copy.amountPlaceholder}
              allowDecimal
            />
            <NumberField
              label={copy.quantityLabel}
              value={quantity}
              onChange={setQuantity}
              unit={copy.quantityUnit}
              hint={copy.quantityHint}
            />
          </FieldRow>
          <SegmentedField
            label={copy.unitLabel}
            value={unit}
            onChange={(value) => setUnit(value as AmountUnit)}
            options={[
              { value: smallUnit, label: copy.unitSmall },
              { value: largeUnit, label: copy.unitLarge },
            ]}
          />
        </>
      }
      results={
        <div className="grid gap-4">
          <ResultIssues title={common.issuesTitle} items={issueMessages} />
          <ResultPanel
            title={common.resultTitle}
            isEmpty={primary === null}
            placeholder={common.placeholder}
          >
            {primary !== null && (
              <>
                <ResultHeadline
                  label={copy.primaryLabel}
                  value={money(primary)}
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
