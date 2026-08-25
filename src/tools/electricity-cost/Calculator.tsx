'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcElectricity } from '@/lib/calc/electricity';
import type { ElectricityContractType } from '@/lib/data/kr-electricity';
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
import type { ElectricityCostCopy } from './copy';

const CURRENT_MONTH = String(new Date().getMonth() + 1);

export function Calculator({
  locale,
  copy,
  common,
  basis,
}: CalculatorProps<ElectricityCostCopy>) {
  const [usage, setUsage] = useState('');
  const [contract, setContract] = useState<ElectricityContractType>('high');
  const [month, setMonth] = useState(CURRENT_MONTH);

  const usageValue = parseNumber(usage);
  const monthValue = parseNumber(month);

  // 관리자 기준값이 있으면 그 요율로 계산한다(없으면 코드 기본값).
  const tariffs = useMemo(
    () => (basis ? { low: basis.electricity.low, high: basis.electricity.high } : undefined),
    [basis],
  );

  const result = useMemo(() => {
    if (usageValue === null || usageValue < 0) return null;
    const safeMonth = monthValue !== null && monthValue >= 1 && monthValue <= 12 ? monthValue : 1;
    return calcElectricity({ usageKwh: usageValue, contract, month: safeMonth }, tariffs);
  }, [usageValue, contract, monthValue, tariffs]);

  const issueMessages: string[] = [];
  if (usageValue !== null && usageValue < 0) issueMessages.push(copy.issueUsage);
  if (monthValue !== null && (monthValue < 1 || monthValue > 12)) {
    issueMessages.push(copy.issueMonth);
  }

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.baseChargeLabel, value: money(result.baseCharge) },
        { label: copy.energyChargeLabel, value: money(result.energyCharge) },
        { label: copy.climateLabel, value: money(result.climateCharge) },
        { label: copy.fuelLabel, value: money(result.fuelAdjustCharge) },
        { label: copy.subtotalLabel, value: money(result.subtotal), emphasis: true },
        { label: copy.vatLabel, value: money(result.vat) },
        { label: copy.fundLabel, value: money(result.powerFund) },
        { label: copy.unitPriceLabel, value: money(result.effectiveUnitPrice) },
      ]
    : [];

  const tierRows = result
    ? result.tierBreakdown.map((tier) => ({
        label:
          tier.to === null
            ? interpolate(copy.tierRangeLastLabel, { from: formatNumber(tier.from, locale) })
            : interpolate(copy.tierRangeLabel, {
                from: formatNumber(tier.from, locale),
                to: formatNumber(tier.to, locale),
              }),
        value: `${formatNumber(tier.usage, locale, { max: 1 })}kWh · ${money(tier.amount)}`,
      }))
    : [];

  const notes = result
    ? [
        interpolate(copy.noteTotal, { total: money(result.total) }),
        interpolate(copy.noteUnitPrice, { unitPrice: money(result.effectiveUnitPrice) }),
        ...(result.isSummer ? [copy.noteSummer] : []),
        copy.noteProgressive,
        copy.noteEstimate,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setUsage('');
        setContract('high');
        setMonth(CURRENT_MONTH);
      }}
      inputs={
        <>
          <NumberField
            label={copy.usageLabel}
            value={usage}
            onChange={setUsage}
            unit={copy.usageUnit}
            hint={copy.usageHint}
            placeholder={copy.usagePlaceholder}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.monthLabel}
              value={month}
              onChange={setMonth}
              unit={copy.monthUnit}
              hint={copy.monthHint}
            />
            <div />
          </FieldRow>
          <SegmentedField
            label={copy.contractLabel}
            value={contract}
            onChange={(value) => setContract(value as ElectricityContractType)}
            options={[
              { value: 'high', label: copy.contractHigh },
              { value: 'low', label: copy.contractLow },
            ]}
            hint={copy.contractHint}
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
                  label={copy.totalLabel}
                  value={money(result.total)}
                  tone="positive"
                />
                <ResultRows rows={tierRows} title={copy.tierTitle} />
                <ResultRows rows={rows} title={common.breakdownTitle} />
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
