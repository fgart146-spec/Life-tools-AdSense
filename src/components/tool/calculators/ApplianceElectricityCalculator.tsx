'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcAdditionalCost, calcElectricity, usageFromWatt } from '@/lib/calc/electricity';
import type { ElectricityContractType } from '@/lib/data/kr-electricity';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { ApplianceElectricityCopy } from '@/lib/tools/shared/appliance-copy';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField, SegmentedField, SelectField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';

const CURRENT_MONTH = String(new Date().getMonth() + 1);

/**
 * 가전제품 추가 전기료 계산기.
 * 누진제 때문에 "추가 요금"은 기존 사용량에 따라 달라지므로,
 * (기존 + 추가) 요금에서 기존 요금을 뺀 값을 보여준다.
 */
export function ApplianceElectricityCalculator({
  locale,
  copy,
  common,
  basis,
  defaultHours,
  defaultDays,
}: CalculatorProps<ApplianceElectricityCopy> & {
  defaultHours: string;
  defaultDays: string;
}) {
  const firstPreset = copy.presets[0];
  const [preset, setPreset] = useState(firstPreset ? String(firstPreset.watt) : 'custom');
  const [watt, setWatt] = useState(firstPreset ? String(firstPreset.watt) : '');
  const [hours, setHours] = useState(defaultHours);
  const [days, setDays] = useState(defaultDays);
  const [baseUsage, setBaseUsage] = useState('');
  const [contract, setContract] = useState<ElectricityContractType>('high');
  const [month, setMonth] = useState(CURRENT_MONTH);

  const wattValue = parseNumber(watt);
  const hoursValue = parseNumber(hours);
  const daysValue = parseNumber(days);
  const baseUsageValue = parseNumber(baseUsage);
  const monthValue = parseNumber(month);
  const safeMonth = monthValue !== null && monthValue >= 1 && monthValue <= 12 ? monthValue : 1;

  const tariffs = useMemo(
    () => (basis ? { low: basis.electricity.low, high: basis.electricity.high } : undefined),
    [basis],
  );

  const result = useMemo(() => {
    if (wattValue === null || hoursValue === null || daysValue === null) return null;
    if (wattValue <= 0 || hoursValue <= 0 || daysValue <= 0) return null;
    if (hoursValue > 24) return null;

    const addedUsage = usageFromWatt(wattValue, hoursValue, daysValue);
    const base = baseUsageValue !== null && baseUsageValue >= 0 ? baseUsageValue : 0;
    const addedCost = calcAdditionalCost(base, addedUsage, contract, safeMonth, tariffs);
    const totalBill = calcElectricity(
      { usageKwh: base + addedUsage, contract, month: safeMonth },
      tariffs,
    );
    if (addedCost === null || !totalBill) return null;

    return {
      addedUsage,
      addedCost,
      perDay: daysValue > 0 ? addedCost / daysValue : 0,
      totalBill: totalBill.total,
      hasBase: baseUsageValue !== null && baseUsageValue > 0,
    };
  }, [wattValue, hoursValue, daysValue, baseUsageValue, contract, safeMonth, tariffs]);

  const issueMessages: string[] = [];
  if (wattValue !== null && wattValue <= 0) issueMessages.push(copy.issueWatt);
  if (hoursValue !== null && (hoursValue <= 0 || hoursValue > 24)) {
    issueMessages.push(copy.issueHours);
  }
  if (daysValue !== null && (daysValue <= 0 || daysValue > 31)) issueMessages.push(copy.issueDays);
  if (baseUsageValue !== null && baseUsageValue < 0) issueMessages.push(copy.issueBaseUsage);

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        {
          label: copy.addedUsageLabel,
          value: `${formatNumber(result.addedUsage, locale, { max: 1 })} kWh`,
        },
        { label: copy.perDayLabel, value: money(result.perDay) },
        ...(result.hasBase ? [{ label: copy.totalBillLabel, value: money(result.totalBill) }] : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteMain, { cost: money(result.addedCost) }),
        interpolate(copy.noteUsage, {
          usage: formatNumber(result.addedUsage, locale, { max: 1 }),
        }),
        interpolate(copy.notePerDay, { perDay: money(result.perDay) }),
        copy.noteProgressive,
        copy.noteEstimate,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setPreset(firstPreset ? String(firstPreset.watt) : 'custom');
        setWatt(firstPreset ? String(firstPreset.watt) : '');
        setHours(defaultHours);
        setDays(defaultDays);
        setBaseUsage('');
        setContract('high');
        setMonth(CURRENT_MONTH);
      }}
      inputs={
        <>
          <SelectField
            label={copy.presetLabel}
            value={preset}
            onChange={(value) => {
              setPreset(value);
              if (value !== 'custom') setWatt(value);
            }}
            options={[
              ...copy.presets.map((item) => ({
                value: String(item.watt),
                label: `${item.label} (${item.watt}W)`,
              })),
              { value: 'custom', label: copy.presetCustom },
            ]}
          />
          <NumberField
            label={copy.wattLabel}
            value={watt}
            onChange={(value) => {
              setWatt(value);
              setPreset('custom');
            }}
            unit={copy.wattUnit}
            hint={copy.wattHint}
            placeholder={copy.wattPlaceholder}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.hoursLabel}
              value={hours}
              onChange={setHours}
              unit={copy.hoursUnit}
              hint={copy.hoursHint}
              allowDecimal
            />
            <NumberField
              label={copy.daysLabel}
              value={days}
              onChange={setDays}
              unit={copy.daysUnit}
              hint={copy.daysHint}
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.baseUsageLabel}
              value={baseUsage}
              onChange={setBaseUsage}
              unit={copy.baseUsageUnit}
              hint={copy.baseUsageHint}
              grouped
            />
            <NumberField
              label={copy.monthLabel}
              value={month}
              onChange={setMonth}
              unit={copy.monthUnit}
              hint={copy.monthHint}
            />
          </FieldRow>
          <SegmentedField
            label={copy.contractLabel}
            value={contract}
            onChange={(value) => setContract(value as ElectricityContractType)}
            options={[
              { value: 'high', label: copy.contractHigh },
              { value: 'low', label: copy.contractLow },
            ]}
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
                  label={copy.addedCostLabel}
                  value={money(result.addedCost)}
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
