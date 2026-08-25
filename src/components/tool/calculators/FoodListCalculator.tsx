'use client';

import { useMemo, useState } from 'react';
import { formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcFoodList, prettyAmount, type FoodRule, type FoodUnit } from '@/lib/calc/food-list';
import { adjustedPersons, APPETITE_FACTOR, type Appetite } from '@/lib/calc/portion';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { FoodListCopy } from '@/lib/tools/shared/food-list-copy';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';

const APPETITES = Object.keys(APPETITE_FACTOR) as Appetite[];

const UNIT_LABEL: Record<FoodUnit, string> = {
  g: 'g',
  kg: 'kg',
  ml: 'ml',
  l: 'L',
  ea: '개',
  cup: '컵',
};

/**
 * 인원수에 맞춰 재료 목록을 계산하는 공용 계산기.
 * 규칙(rules)만 바꾸면 캠핑·명절 등 다른 상황에 재사용할 수 있다.
 */
export function FoodListCalculator({
  locale,
  copy,
  common,
  rules,
  primaryKey,
  useMultiplier,
  defaultMultiplier = '1',
  defaultAdults = '4',
}: CalculatorProps<FoodListCopy> & {
  rules: readonly FoodRule[];
  /** 대표로 크게 보여줄 재료 키 */
  primaryKey: string;
  /** 박수·끼니 수 입력 사용 여부 */
  useMultiplier: boolean;
  defaultMultiplier?: string;
  defaultAdults?: string;
}) {
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState('0');
  const [appetite, setAppetite] = useState<Appetite>('normal');
  const [multiplier, setMultiplier] = useState(defaultMultiplier);

  const adultsValue = parseNumber(adults);
  const childrenValue = parseNumber(children);
  const multiplierValue = parseNumber(multiplier);

  const persons = adjustedPersons({
    adults: adultsValue,
    children: childrenValue,
    appetite,
  });

  const items = useMemo(() => {
    const factor = useMultiplier
      ? multiplierValue !== null && multiplierValue > 0
        ? multiplierValue
        : 0
      : 1;
    if (persons <= 0 || factor <= 0) return [];
    return calcFoodList(rules, persons, factor);
  }, [rules, persons, useMultiplier, multiplierValue]);

  const issueMessages: string[] = [];
  const adultsCount = adultsValue ?? 0;
  const childrenCount = childrenValue ?? 0;
  if (adultsCount < 0 || childrenCount < 0 || adultsCount + childrenCount > 100) {
    issueMessages.push(copy.issuePeople);
  }
  if (useMultiplier && multiplierValue !== null && (multiplierValue <= 0 || multiplierValue > 30)) {
    issueMessages.push(copy.issueMultiplier);
  }

  const format = (amount: number, unit: FoodUnit) =>
    `${formatNumber(amount, locale, { max: unit === 'kg' || unit === 'l' ? 2 : 1 })} ${UNIT_LABEL[unit]}`;

  const rows = items.map((item) => {
    const pretty = prettyAmount(item);
    return {
      label: copy.itemLabels[item.key] ?? item.key,
      value: format(pretty.amount, pretty.unit),
      emphasis: item.key === primaryKey,
    };
  });

  const primaryItem = items.find((item) => item.key === primaryKey);
  const primaryPretty = primaryItem ? prettyAmount(primaryItem) : null;

  const notes =
    items.length > 0
      ? [
          interpolate(copy.noteMain, { persons: formatNumber(persons, locale, { max: 1 }) }),
          copy.noteBuffer,
          copy.noteBasis,
        ]
      : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setAdults(defaultAdults);
        setChildren('0');
        setAppetite('normal');
        setMultiplier(defaultMultiplier);
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
          {useMultiplier && (
            <NumberField
              label={copy.multiplierLabel}
              value={multiplier}
              onChange={setMultiplier}
              unit={copy.multiplierUnit}
              hint={copy.multiplierHint}
              allowDecimal
            />
          )}
          <SegmentedField
            label={copy.appetiteLabel}
            value={appetite}
            onChange={(value) => setAppetite(value as Appetite)}
            options={APPETITES.map((option) => ({
              value: option,
              label: copy.appetiteOptions[option],
            }))}
            hint={copy.appetiteHint}
          />
        </>
      }
      results={
        <div className="grid gap-4">
          <ResultIssues title={common.issuesTitle} items={issueMessages} />
          <ResultPanel
            title={common.resultTitle}
            isEmpty={items.length === 0}
            placeholder={common.placeholder}
          >
            {items.length > 0 && (
              <>
                {primaryPretty && (
                  <ResultHeadline
                    label={copy.primaryLabel}
                    value={format(primaryPretty.amount, primaryPretty.unit)}
                    sub={`${copy.personsLabel}: ${formatNumber(persons, locale, { max: 1 })}`}
                    tone="positive"
                  />
                )}
                <ResultRows rows={rows} title={copy.listTitle} />
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
