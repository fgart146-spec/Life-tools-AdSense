'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcRoas, findRoasIssues } from '@/lib/calc/business';
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
import type { RoasCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<RoasCopy>) {
  const [adCost, setAdCost] = useState('');
  const [revenue, setRevenue] = useState('');
  const [contribution, setContribution] = useState('');
  const [conversions, setConversions] = useState('');

  const input = useMemo(
    () => ({
      adCost: parseNumber(adCost),
      revenue: parseNumber(revenue),
      contributionRate: parseNumber(contribution),
      conversions: parseNumber(conversions),
    }),
    [adCost, revenue, contribution, conversions],
  );

  const result = useMemo(() => calcRoas(input), [input]);
  const issueMessages = findRoasIssues(input).map((issue) => {
    if (issue === 'adCost') return copy.issueAdCost;
    if (issue === 'revenue') return copy.issueRevenue;
    if (issue === 'rate') return copy.issueRate;
    return copy.issueConversions;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.adCostRateLabel, value: formatPercent(result.adCostRate, locale) },
        ...(result.breakEvenRoas !== null
          ? [
              {
                label: copy.breakEvenRoasLabel,
                value: formatPercent(result.breakEvenRoas, locale),
                emphasis: true,
              },
            ]
          : []),
        ...(result.profit !== null
          ? [{ label: copy.profitLabel, value: money(result.profit) }]
          : []),
        ...(result.cpa !== null ? [{ label: copy.cpaLabel, value: money(result.cpa) }] : []),
        ...(result.revenuePerConversion !== null
          ? [{ label: copy.aovLabel, value: money(result.revenuePerConversion) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteRoas, { roas: formatPercent(result.roas, locale) }),
        interpolate(copy.noteAdRate, { rate: formatPercent(result.adCostRate, locale) }),
        ...(result.breakEvenRoas !== null
          ? [
              interpolate(copy.noteBreakEven, {
                breakEven: formatPercent(result.breakEvenRoas, locale),
              }),
            ]
          : []),
        ...(result.profit !== null
          ? [
              result.profit >= 0
                ? interpolate(copy.noteProfit, { profit: money(result.profit) })
                : copy.noteLoss,
            ]
          : []),
        ...(result.cpa !== null && result.revenuePerConversion !== null
          ? [
              interpolate(copy.noteCpa, {
                cpa: money(result.cpa),
                aov: money(result.revenuePerConversion),
              }),
            ]
          : []),
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setAdCost('');
        setRevenue('');
        setContribution('');
        setConversions('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.adCostLabel}
              value={adCost}
              onChange={setAdCost}
              unit={copy.adCostUnit}
              hint={copy.adCostHint}
              placeholder={copy.adCostPlaceholder}
              grouped
            />
            <NumberField
              label={copy.revenueLabel}
              value={revenue}
              onChange={setRevenue}
              unit={copy.adCostUnit}
              hint={copy.revenueHint}
              placeholder={copy.revenuePlaceholder}
              grouped
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.contributionLabel}
              value={contribution}
              onChange={setContribution}
              unit="%"
              hint={copy.contributionHint}
              allowDecimal
            />
            <NumberField
              label={copy.conversionsLabel}
              value={conversions}
              onChange={setConversions}
              unit={copy.conversionsUnit}
              hint={copy.conversionsHint}
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
                  label={copy.roasLabel}
                  value={formatPercent(result.roas, locale)}
                  tone={
                    result.breakEvenRoas !== null && result.roas < result.breakEvenRoas
                      ? 'warning'
                      : 'positive'
                  }
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
