'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
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
import { calcCostRatio, findIssues } from './calc';
import type { CostRatioCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<CostRatioCopy>) {
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [target, setTarget] = useState('');

  const input = useMemo(
    () => ({
      price: parseNumber(price),
      cost: parseNumber(cost),
      targetRatio: parseNumber(target),
    }),
    [price, cost, target],
  );

  const result = useMemo(() => calcCostRatio(input), [input]);
  const issueMessages = findIssues(input).map((issue) => {
    if (issue === 'price') return copy.issuePrice;
    if (issue === 'cost') return copy.issueCost;
    return copy.issueTarget;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.grossMarginLabel, value: formatPercent(result.grossMarginRate, locale) },
        { label: copy.grossProfitLabel, value: money(result.grossProfit), emphasis: true },
        ...(result.targetCost !== null
          ? [{ label: copy.targetCostLabel, value: money(result.targetCost) }]
          : []),
        ...(result.targetPrice !== null
          ? [{ label: copy.targetPriceLabel, value: money(result.targetPrice) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteRate, { rate: formatPercent(result.costRate, locale) }),
        interpolate(copy.noteProfit, { profit: money(result.grossProfit) }),
        ...(result.targetCost !== null && result.targetPrice !== null
          ? [
              interpolate(copy.noteTarget, {
                cost: money(result.targetCost),
                price: money(result.targetPrice),
              }),
            ]
          : []),
        ...(result.costRate >= 100 ? [copy.noteHighRate] : []),
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setPrice('');
        setCost('');
        setTarget('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.priceLabel}
              value={price}
              onChange={setPrice}
              unit={copy.priceUnit}
              hint={copy.priceHint}
              placeholder={copy.pricePlaceholder}
              grouped
            />
            <NumberField
              label={copy.costLabel}
              value={cost}
              onChange={setCost}
              unit={copy.priceUnit}
              hint={copy.costHint}
              placeholder={copy.costPlaceholder}
              grouped
            />
          </FieldRow>
          <NumberField
            label={copy.targetLabel}
            value={target}
            onChange={setTarget}
            unit="%"
            hint={copy.targetHint}
            allowDecimal
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
                  label={copy.costRateLabel}
                  value={formatPercent(result.costRate, locale)}
                  tone={result.costRate >= 100 ? 'warning' : 'positive'}
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
