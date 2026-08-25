'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import type { AmountUnit } from '@/lib/calc/unit-price';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SelectField } from '@/components/tool/fields';
import {
  ResultCallout,
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { comparePrice, findIssues, repeatSavings, type CompareProductInput } from './calc';
import type { ComparePriceCopy } from './copy';

interface ProductState {
  price: string;
  amount: string;
  unit: AmountUnit;
  quantity: string;
  couponPercent: string;
  couponAmount: string;
  cardPercent: string;
  shipping: string;
  pointPercent: string;
}

const emptyProduct: ProductState = {
  price: '',
  amount: '',
  unit: 'g',
  quantity: '1',
  couponPercent: '',
  couponAmount: '',
  cardPercent: '',
  shipping: '',
  pointPercent: '',
};

function toInput(state: ProductState): CompareProductInput {
  return {
    price: parseNumber(state.price),
    amount: parseNumber(state.amount),
    unit: state.unit,
    quantity: parseNumber(state.quantity),
    couponPercent: parseNumber(state.couponPercent),
    couponAmount: parseNumber(state.couponAmount),
    cardPercent: parseNumber(state.cardPercent),
    shipping: parseNumber(state.shipping),
    pointPercent: parseNumber(state.pointPercent),
  };
}

function ProductFields({
  title,
  state,
  onChange,
  copy,
}: {
  title: string;
  state: ProductState;
  onChange: (next: ProductState) => void;
  copy: ComparePriceCopy;
}) {
  const set = <K extends keyof ProductState>(key: K, value: ProductState[K]) =>
    onChange({ ...state, [key]: value });

  return (
    <div className="rounded-lg border border-ink-200 p-4">
      <h3 className="mb-3 text-sm font-bold text-brand-700">{title}</h3>
      <div className="grid gap-4">
        <NumberField
          label={copy.priceLabel}
          value={state.price}
          onChange={(value) => set('price', value)}
          unit={copy.priceUnit}
          placeholder={copy.pricePlaceholder}
          grouped
        />
        <FieldRow>
          <NumberField
            label={copy.amountLabel}
            value={state.amount}
            onChange={(value) => set('amount', value)}
            placeholder={copy.amountPlaceholder}
            allowDecimal
          />
          <NumberField
            label={copy.quantityLabel}
            value={state.quantity}
            onChange={(value) => set('quantity', value)}
            unit={copy.quantityUnit}
          />
        </FieldRow>
        <SelectField
          label={copy.unitLabel}
          value={state.unit}
          onChange={(value) => set('unit', value as AmountUnit)}
          options={[
            { value: 'g', label: copy.unitOptionG },
            { value: 'kg', label: copy.unitOptionKg },
            { value: 'ml', label: copy.unitOptionMl },
            { value: 'l', label: copy.unitOptionL },
            { value: 'ea', label: copy.unitOptionEa },
          ]}
        />

        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-brand-700">
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
            {copy.advancedToggle}
          </summary>
          <div className="mt-3 grid gap-4">
            <FieldRow>
              <NumberField
                label={copy.couponPercentLabel}
                value={state.couponPercent}
                onChange={(value) => set('couponPercent', value)}
                unit="%"
                allowDecimal
              />
              <NumberField
                label={copy.couponAmountLabel}
                value={state.couponAmount}
                onChange={(value) => set('couponAmount', value)}
                unit={copy.priceUnit}
                grouped
              />
            </FieldRow>
            <FieldRow>
              <NumberField
                label={copy.cardPercentLabel}
                value={state.cardPercent}
                onChange={(value) => set('cardPercent', value)}
                unit="%"
                allowDecimal
              />
              <NumberField
                label={copy.shippingLabel}
                value={state.shipping}
                onChange={(value) => set('shipping', value)}
                unit={copy.priceUnit}
                grouped
              />
            </FieldRow>
            <NumberField
              label={copy.pointPercentLabel}
              value={state.pointPercent}
              onChange={(value) => set('pointPercent', value)}
              unit="%"
              allowDecimal
            />
          </div>
        </details>
      </div>
    </div>
  );
}

export function Calculator({ locale, copy, common }: CalculatorProps<ComparePriceCopy>) {
  const [productA, setProductA] = useState<ProductState>(emptyProduct);
  const [productB, setProductB] = useState<ProductState>(emptyProduct);
  const [repeat, setRepeat] = useState('1');

  const inputs = useMemo(
    () => ({ a: toInput(productA), b: toInput(productB) }),
    [productA, productB],
  );

  const result = useMemo(() => comparePrice(inputs.a, inputs.b), [inputs]);
  const issues = findIssues(inputs.a, inputs.b);

  const issueMessages = issues.map((issue) => {
    switch (issue) {
      case 'aPrice':
        return copy.issueAPrice;
      case 'aAmount':
        return copy.issueAAmount;
      case 'aQuantity':
        return copy.issueAQuantity;
      case 'bPrice':
        return copy.issueBPrice;
      case 'bAmount':
        return copy.issueBAmount;
      case 'bQuantity':
        return copy.issueBQuantity;
      default:
        return copy.issueUnitMismatch;
    }
  });

  const money = (value: number) => formatMoney(value, locale, value > 0 && value < 100 ? 1 : 0);
  const unitSymbol = productA.unit === 'ea' ? '' : productA.unit === 'g' || productA.unit === 'kg' ? 'g' : 'ml';
  const per100Label = unitSymbol ? `100${unitSymbol}` : copy.perItemLabel;

  const showResult = result !== null && result.comparable;
  const savings = result
    ? repeatSavings(result.savingPerPurchase, parseNumber(repeat) ?? 1)
    : null;

  const winnerText =
    result?.cheaper === 'a' ? copy.winnerA : result?.cheaper === 'b' ? copy.winnerB : copy.tie;

  const rows = result
    ? [
        {
          label: `${copy.productA} · ${copy.finalPriceLabel}`,
          value: money(result.a.purchase.effectiveCost),
        },
        {
          label: `${copy.productA} · ${per100Label} ${copy.perUnitLabel}`,
          value: money(result.a.pricePer100 ?? result.a.pricePerItem),
          emphasis: result.cheaper === 'a',
        },
        {
          label: `${copy.productB} · ${copy.finalPriceLabel}`,
          value: money(result.b.purchase.effectiveCost),
        },
        {
          label: `${copy.productB} · ${per100Label} ${copy.perUnitLabel}`,
          value: money(result.b.pricePer100 ?? result.b.pricePerItem),
          emphasis: result.cheaper === 'b',
        },
        {
          label: copy.differenceLabel,
          value: formatPercent(result.percentCheaper, locale),
        },
      ]
    : [];

  const notes = result
    ? result.cheaper === 'tie'
      ? [copy.noteTie, copy.noteEffective]
      : [
          interpolate(copy.noteWinner, {
            winner: winnerText,
            percent: formatPercent(result.percentCheaper, locale),
          }),
          interpolate(copy.noteSaving, {
            amount: `${formatNumber(result.referenceAmount, locale, { max: 1 })}${unitSymbol}`,
            saving: money(result.savingPerPurchase),
          }),
          ...(savings && savings.monthly > 0
            ? [
                interpolate(copy.noteRepeat, {
                  monthly: money(savings.monthly),
                  yearly: money(savings.yearly),
                }),
              ]
            : []),
          copy.noteEffective,
        ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setProductA(emptyProduct);
        setProductB(emptyProduct);
        setRepeat('1');
      }}
      inputs={
        <>
          <ProductFields
            title={copy.productA}
            state={productA}
            onChange={setProductA}
            copy={copy}
          />
          <ProductFields
            title={copy.productB}
            state={productB}
            onChange={setProductB}
            copy={copy}
          />
          <NumberField
            label={copy.repeatLabel}
            value={repeat}
            onChange={setRepeat}
            unit={copy.repeatUnit}
            hint={copy.repeatHint}
          />
        </>
      }
      results={
        <div className="grid gap-4">
          <ResultIssues title={common.issuesTitle} items={issueMessages} />
          <ResultPanel
            title={common.resultTitle}
            isEmpty={!showResult}
            placeholder={common.placeholder}
          >
            {showResult && result && (
              <>
                <ResultHeadline
                  label={copy.verdictLabel}
                  value={winnerText}
                  sub={
                    result.cheaper === 'tie'
                      ? undefined
                      : `${formatPercent(result.percentCheaper, locale)} · ${money(
                          result.savingPerPurchase,
                        )}`
                  }
                  tone="positive"
                />
                <ResultRows rows={rows} />
                {savings && savings.monthly > 0 && result.cheaper !== 'tie' && (
                  <ResultCallout title={copy.savingTitle}>
                    <ul className="grid gap-1">
                      <li>
                        {copy.savingPerPurchase}: {money(result.savingPerPurchase)}
                      </li>
                      <li>
                        {copy.savingMonthly}: {money(savings.monthly)}
                      </li>
                      <li>
                        {copy.savingYearly}: {money(savings.yearly)}
                      </li>
                    </ul>
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
