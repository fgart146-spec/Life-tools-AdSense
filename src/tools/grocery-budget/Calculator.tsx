'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcGroceryBudget, findIssues } from '@/lib/calc/grocery-budget';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldGroup, FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultCallout,
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { GroceryBudgetCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<GroceryBudgetCopy>) {
  const [members, setMembers] = useState('4');
  const [groceryTimes, setGroceryTimes] = useState('2');
  const [groceryAmount, setGroceryAmount] = useState('');
  const [diningTimes, setDiningTimes] = useState('1');
  const [diningAmount, setDiningAmount] = useState('');
  const [deliveryTimes, setDeliveryTimes] = useState('1');
  const [deliveryAmount, setDeliveryAmount] = useState('');
  const [target, setTarget] = useState('');

  const parsed = useMemo(
    () => ({
      members: parseNumber(members),
      groceryTimesPerWeek: parseNumber(groceryTimes),
      groceryPerVisit: parseNumber(groceryAmount),
      diningTimesPerWeek: parseNumber(diningTimes),
      diningPerVisit: parseNumber(diningAmount),
      deliveryTimesPerWeek: parseNumber(deliveryTimes),
      deliveryPerOrder: parseNumber(deliveryAmount),
      targetBudget: parseNumber(target),
    }),
    [
      members,
      groceryTimes,
      groceryAmount,
      diningTimes,
      diningAmount,
      deliveryTimes,
      deliveryAmount,
      target,
    ],
  );

  const result = useMemo(() => calcGroceryBudget(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'members') return copy.issueMembers;
    if (issue === 'times') return copy.issueTimes;
    if (issue === 'amount') return copy.issueAmount;
    return copy.issueTarget;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.groceryMonthlyLabel, value: money(result.groceryMonthly) },
        { label: copy.diningMonthlyLabel, value: money(result.diningMonthly) },
        { label: copy.deliveryMonthlyLabel, value: money(result.deliveryMonthly) },
        { label: copy.perPersonLabel, value: money(result.perPerson), emphasis: true },
        { label: copy.perDayLabel, value: money(result.perDay) },
        { label: copy.perPersonPerDayLabel, value: money(result.perPersonPerDay) },
        {
          label: copy.eatingOutShareLabel,
          value: formatPercent(result.eatingOutShare, locale),
        },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteTotal, { total: money(result.total) }),
        interpolate(copy.notePerPerson, {
          perPerson: money(result.perPerson),
          perPersonPerDay: money(result.perPersonPerDay),
        }),
        interpolate(copy.noteEatingOut, {
          share: formatPercent(result.eatingOutShare, locale),
        }),
        ...(result.targetDiff !== null
          ? [
              result.targetDiff > 0
                ? interpolate(copy.noteOverBudget, { over: money(result.targetDiff) })
                : interpolate(copy.noteUnderBudget, { under: money(-result.targetDiff) }),
            ]
          : []),
        copy.noteTip,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setMembers('4');
        setGroceryTimes('2');
        setGroceryAmount('');
        setDiningTimes('1');
        setDiningAmount('');
        setDeliveryTimes('1');
        setDeliveryAmount('');
        setTarget('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.membersLabel}
              value={members}
              onChange={setMembers}
              unit={copy.membersUnit}
            />
            <NumberField
              label={copy.targetLabel}
              value={target}
              onChange={setTarget}
              unit="원"
              hint={copy.targetHint}
              grouped
            />
          </FieldRow>
          <FieldGroup title={copy.groceryTitle}>
            <FieldRow>
              <NumberField
                label={copy.groceryTimesLabel}
                value={groceryTimes}
                onChange={setGroceryTimes}
                unit={copy.groceryTimesUnit}
                allowDecimal
              />
              <NumberField
                label={copy.groceryAmountLabel}
                value={groceryAmount}
                onChange={setGroceryAmount}
                unit="원"
                hint={copy.groceryAmountHint}
                grouped
              />
            </FieldRow>
          </FieldGroup>
          <FieldGroup title={copy.diningTitle}>
            <FieldRow>
              <NumberField
                label={copy.diningTimesLabel}
                value={diningTimes}
                onChange={setDiningTimes}
                unit={copy.groceryTimesUnit}
                allowDecimal
              />
              <NumberField
                label={copy.diningAmountLabel}
                value={diningAmount}
                onChange={setDiningAmount}
                unit="원"
                hint={copy.diningAmountHint}
                grouped
              />
            </FieldRow>
          </FieldGroup>
          <FieldGroup title={copy.deliveryTitle}>
            <FieldRow>
              <NumberField
                label={copy.deliveryTimesLabel}
                value={deliveryTimes}
                onChange={setDeliveryTimes}
                unit={copy.groceryTimesUnit}
                allowDecimal
              />
              <NumberField
                label={copy.deliveryAmountLabel}
                value={deliveryAmount}
                onChange={setDeliveryAmount}
                unit="원"
                grouped
              />
            </FieldRow>
          </FieldGroup>
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
                  value={money(result.total)}
                  tone="positive"
                />
                <ResultRows rows={rows} />
                {result.targetDiff !== null && (
                  <ResultCallout title={copy.targetDiffLabel}>
                    {result.targetDiff > 0
                      ? `+ ${money(result.targetDiff)}`
                      : `- ${money(-result.targetDiff)}`}
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
