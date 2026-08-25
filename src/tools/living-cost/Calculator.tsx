'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import {
  calcLivingCost,
  findIssues,
  LIVING_COST_KEYS,
  type LivingCostKey,
} from '@/lib/calc/living-cost';
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
import type { LivingCostCopy } from './copy';

type AmountState = Record<LivingCostKey, string>;

const emptyAmounts = LIVING_COST_KEYS.reduce((acc, key) => {
  acc[key] = '';
  return acc;
}, {} as AmountState);

export function Calculator({ locale, copy, common }: CalculatorProps<LivingCostCopy>) {
  const [members, setMembers] = useState('4');
  const [income, setIncome] = useState('');
  const [amounts, setAmounts] = useState<AmountState>(emptyAmounts);

  const parsed = useMemo(
    () => ({
      members: parseNumber(members),
      income: parseNumber(income),
      amounts: LIVING_COST_KEYS.reduce<Record<string, number | null>>((acc, key) => {
        acc[key] = parseNumber(amounts[key]);
        return acc;
      }, {}),
    }),
    [members, income, amounts],
  );

  const result = useMemo(() => calcLivingCost(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'members') return copy.issueMembers;
    if (issue === 'amount') return copy.issueAmount;
    return copy.issueIncome;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.perPersonLabel, value: money(result.perPerson), emphasis: true },
        { label: copy.perDayLabel, value: money(result.perDay) },
        { label: copy.annualLabel, value: money(result.annual) },
        ...(result.incomeRatio !== null
          ? [{ label: copy.incomeRatioLabel, value: formatPercent(result.incomeRatio, locale) }]
          : []),
        ...(result.surplus !== null
          ? [{ label: copy.surplusLabel, value: money(result.surplus) }]
          : []),
      ]
    : [];

  const shareRows = result
    ? result.shares.map((share) => ({
        label: copy.categoryLabels[share.key],
        value: `${money(share.amount)} · ${formatPercent(share.share, locale)}`,
      }))
    : [];

  const topShare = result?.shares[0];

  const notes = result
    ? [
        interpolate(copy.noteTotal, {
          total: money(result.total),
          perPerson: money(result.perPerson),
        }),
        interpolate(copy.notePerDay, { perDay: money(result.perDay) }),
        ...(topShare
          ? [
              interpolate(copy.noteTop, {
                top: copy.categoryLabels[topShare.key],
                share: formatPercent(topShare.share, locale),
              }),
            ]
          : []),
        ...(result.incomeRatio !== null && result.surplus !== null
          ? [
              result.surplus >= 0
                ? interpolate(copy.noteIncome, {
                    ratio: formatPercent(result.incomeRatio, locale),
                    surplus: money(result.surplus),
                  })
                : copy.noteDeficit,
            ]
          : []),
        interpolate(copy.noteAnnual, { annual: money(result.annual) }),
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setMembers('4');
        setIncome('');
        setAmounts(emptyAmounts);
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.membersLabel}
              value={members}
              onChange={setMembers}
              unit={copy.membersUnit}
              hint={copy.membersHint}
            />
            <NumberField
              label={copy.incomeLabel}
              value={income}
              onChange={setIncome}
              unit={copy.incomeUnit}
              hint={copy.incomeHint}
              grouped
            />
          </FieldRow>
          <FieldGroup title={copy.categoryTitle}>
            {LIVING_COST_KEYS.map((key) => (
              <NumberField
                key={key}
                label={copy.categoryLabels[key]}
                value={amounts[key]}
                onChange={(value) => setAmounts((prev) => ({ ...prev, [key]: value }))}
                unit="원"
                hint={copy.categoryHints[key]}
                grouped
              />
            ))}
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
                <ResultRows rows={shareRows} title={copy.shareTitle} />
                {result.surplus !== null && result.surplus < 0 && (
                  <ResultCallout title={copy.surplusLabel}>
                    {money(result.surplus)}
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
