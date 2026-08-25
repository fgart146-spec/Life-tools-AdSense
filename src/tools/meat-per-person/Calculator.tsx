'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { APPETITE_OPTIONS, calcMeat, findIssues, type MeatType } from './calc';
import type { Appetite } from '@/lib/calc/portion';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField, SelectField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { MeatCopy } from './copy';

const MEAT_TYPES: MeatType[] = [
  'pork-belly',
  'pork-neck',
  'beef-grill',
  'shabu',
  'boiled',
  'steak',
];

export function Calculator({ locale, copy, common }: CalculatorProps<MeatCopy>) {
  const [adults, setAdults] = useState('4');
  const [children, setChildren] = useState('0');
  const [appetite, setAppetite] = useState<Appetite>('normal');
  const [meatType, setMeatType] = useState<MeatType>('pork-belly');
  const [customGram, setCustomGram] = useState('');
  const [price, setPrice] = useState('');

  const parsed = useMemo(
    () => ({
      adults: parseNumber(adults),
      children: parseNumber(children),
      appetite,
      meatType,
      customGram: parseNumber(customGram),
      pricePer100g: parseNumber(price),
    }),
    [adults, children, appetite, meatType, customGram, price],
  );

  const result = useMemo(() => calcMeat(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'people') return copy.issuePeople;
    if (issue === 'customGram') return copy.issueCustomGram;
    return copy.issuePrice;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        {
          label: copy.perPersonLabel,
          value: `${formatNumber(result.perPersonGram, locale)} g`,
        },
        {
          label: copy.personsLabel,
          value: formatNumber(result.persons, locale, { max: 1 }),
        },
        ...(result.estimatedCost !== null
          ? [
              { label: copy.costLabel, value: money(result.estimatedCost), emphasis: true },
              {
                label: copy.costPerPersonLabel,
                value: money(result.costPerPerson ?? 0),
              },
            ]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteTotal, {
          kg: formatNumber(result.totalKg, locale, { max: 2 }),
          gram: formatNumber(result.totalGram, locale),
        }),
        interpolate(copy.notePerPerson, {
          perPerson: formatNumber(result.perPersonGram, locale),
        }),
        ...(result.estimatedCost !== null
          ? [interpolate(copy.noteCost, { cost: money(result.estimatedCost) })]
          : []),
        copy.noteBuffer,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setAdults('4');
        setChildren('0');
        setAppetite('normal');
        setMeatType('pork-belly');
        setCustomGram('');
        setPrice('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.adultsLabel}
              value={adults}
              onChange={setAdults}
              unit={copy.adultsUnit}
            />
            <NumberField
              label={copy.childrenLabel}
              value={children}
              onChange={setChildren}
              unit={copy.childrenUnit}
              hint={copy.childrenHint}
            />
          </FieldRow>
          <SelectField
            label={copy.meatTypeLabel}
            value={meatType}
            onChange={(value) => setMeatType(value as MeatType)}
            options={MEAT_TYPES.map((type) => ({
              value: type,
              label: copy.meatTypeOptions[type],
            }))}
          />
          <SegmentedField
            label={copy.appetiteLabel}
            value={appetite}
            onChange={(value) => setAppetite(value as Appetite)}
            options={APPETITE_OPTIONS.map((option) => ({
              value: option,
              label: copy.appetiteOptions[option],
            }))}
            hint={copy.appetiteHint}
          />
          <FieldRow>
            <NumberField
              label={copy.customGramLabel}
              value={customGram}
              onChange={setCustomGram}
              unit="g"
              hint={copy.customGramHint}
            />
            <NumberField
              label={copy.priceLabel}
              value={price}
              onChange={setPrice}
              unit={copy.priceUnit}
              hint={copy.priceHint}
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
                  label={copy.totalLabel}
                  value={`${formatNumber(result.totalKg, locale, { max: 2 })} kg`}
                  sub={`${formatNumber(result.totalGram, locale)} g`}
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
