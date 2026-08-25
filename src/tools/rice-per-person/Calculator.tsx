'use client';

import { useMemo, useState } from 'react';
import { formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { APPETITE_FACTOR, type Appetite } from '@/lib/calc/portion';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { calcRice, findIssues } from './calc';
import type { RiceCopy } from './copy';

const APPETITES = Object.keys(APPETITE_FACTOR) as Appetite[];

export function Calculator({ locale, copy, common }: CalculatorProps<RiceCopy>) {
  const [adults, setAdults] = useState('4');
  const [children, setChildren] = useState('0');
  const [meals, setMeals] = useState('1');
  const [bowls, setBowls] = useState('1');
  const [appetite, setAppetite] = useState<Appetite>('normal');

  const parsed = useMemo(
    () => ({
      adults: parseNumber(adults),
      children: parseNumber(children),
      appetite,
      meals: parseNumber(meals),
      bowlsPerMeal: parseNumber(bowls),
    }),
    [adults, children, appetite, meals, bowls],
  );

  const result = useMemo(() => calcRice(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'people') return copy.issuePeople;
    if (issue === 'meals') return copy.issueMeals;
    return copy.issueBowls;
  });

  const num = (value: number, max = 0) => formatNumber(value, locale, { max });

  const rows = result
    ? [
        { label: copy.cupsLabel, value: `${num(result.riceCups, 1)} 컵` },
        { label: copy.waterLabel, value: `${num(result.waterMl)} ml` },
        { label: copy.bowlsResultLabel, value: `${num(result.totalBowls, 1)} 공기` },
        { label: copy.cookedLabel, value: `${num(result.cookedGram)} g` },
        { label: copy.personsLabel, value: num(result.persons, 1) },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteRice, {
          kg: num(result.riceKg, 2),
          gram: num(result.riceGram),
        }),
        interpolate(copy.noteCups, {
          cups: num(result.riceCups, 1),
          water: num(result.waterMl),
        }),
        interpolate(copy.noteBowls, { bowls: num(result.totalBowls, 1) }),
        copy.noteWater,
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
        setMeals('1');
        setBowls('1');
        setAppetite('normal');
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
          <FieldRow>
            <NumberField
              label={copy.mealsLabel}
              value={meals}
              onChange={setMeals}
              unit={copy.mealsUnit}
              hint={copy.mealsHint}
            />
            <NumberField
              label={copy.bowlsLabel}
              value={bowls}
              onChange={setBowls}
              unit={copy.bowlsUnit}
              hint={copy.bowlsHint}
              allowDecimal
            />
          </FieldRow>
          <SegmentedField
            label={copy.appetiteLabel}
            value={appetite}
            onChange={(value) => setAppetite(value as Appetite)}
            options={APPETITES.map((option) => ({
              value: option,
              label: copy.appetiteOptions[option],
            }))}
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
                  label={copy.riceLabel}
                  value={`${num(result.riceGram)} g`}
                  sub={`${num(result.riceKg, 2)} kg`}
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
