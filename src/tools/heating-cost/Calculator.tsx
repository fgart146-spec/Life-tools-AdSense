'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcHeating, findIssues, HEATING_DEFAULTS, type HeatingType } from '@/lib/calc/heating';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { CheckboxField, FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { HeatingCostCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<HeatingCostCopy>) {
  const [type, setType] = useState<HeatingType>('gas');
  const [usage, setUsage] = useState('');
  const [unitRate, setUnitRate] = useState(String(HEATING_DEFAULTS.gas.unitRate));
  const [heatValue, setHeatValue] = useState(String(HEATING_DEFAULTS.gas.heatValue ?? 43.1));
  const [baseCharge, setBaseCharge] = useState(String(HEATING_DEFAULTS.gas.baseCharge));
  const [days, setDays] = useState('30');
  const [vatIncluded, setVatIncluded] = useState(false);

  function changeType(next: HeatingType) {
    setType(next);
    setUnitRate(String(HEATING_DEFAULTS[next].unitRate));
    setBaseCharge(String(HEATING_DEFAULTS[next].baseCharge));
    if (next === 'gas') setHeatValue(String(HEATING_DEFAULTS.gas.heatValue ?? 43.1));
  }

  const parsed = useMemo(
    () => ({
      type,
      usage: parseNumber(usage),
      unitRate: parseNumber(unitRate),
      heatValue: parseNumber(heatValue),
      baseCharge: parseNumber(baseCharge),
      vatIncluded,
      days: parseNumber(days),
    }),
    [type, usage, unitRate, heatValue, baseCharge, vatIncluded, days],
  );

  const result = useMemo(() => calcHeating(parsed), [parsed]);
  const issueMessages = findIssues(parsed).map((issue) => {
    if (issue === 'usage') return copy.issueUsage;
    if (issue === 'unitRate') return copy.issueUnitRate;
    if (issue === 'heatValue') return copy.issueHeatValue;
    if (issue === 'baseCharge') return copy.issueBaseCharge;
    return copy.issueDays;
  });

  const money = (value: number) => formatMoney(value, locale);
  const usageUnit =
    type === 'gas' ? copy.unitGas : type === 'district' ? copy.unitDistrict : copy.unitElectric;
  const rateUnit =
    type === 'gas'
      ? copy.rateUnitGas
      : type === 'district'
        ? copy.rateUnitDistrict
        : copy.rateUnitElectric;

  const rows = result
    ? [
        { label: copy.energyChargeLabel, value: money(result.energyCharge) },
        ...(result.baseCharge > 0
          ? [{ label: copy.baseChargeRowLabel, value: money(result.baseCharge) }]
          : []),
        ...(result.vat > 0 ? [{ label: copy.vatRowLabel, value: money(result.vat) }] : []),
        { label: copy.perDayLabel, value: money(result.perDay), emphasis: true },
        ...(result.totalMj !== null
          ? [
              {
                label: copy.totalMjLabel,
                value: `${formatNumber(result.totalMj, locale, { max: 1 })} MJ`,
              },
            ]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteTotal, { total: money(result.total) }),
        interpolate(copy.notePerDay, { perDay: money(result.perDay) }),
        copy.noteRate,
        ...(type === 'electric' ? [copy.noteElectric] : []),
        copy.noteEstimate,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        changeType('gas');
        setUsage('');
        setDays('30');
        setVatIncluded(false);
      }}
      inputs={
        <>
          <SegmentedField
            label={copy.typeLabel}
            value={type}
            onChange={(value) => changeType(value as HeatingType)}
            options={[
              { value: 'gas', label: copy.typeGas },
              { value: 'district', label: copy.typeDistrict },
              { value: 'electric', label: copy.typeElectric },
            ]}
            hint={copy.typeHint}
          />
          <FieldRow>
            <NumberField
              label={copy.usageLabel}
              value={usage}
              onChange={setUsage}
              unit={usageUnit}
              hint={copy.usageHint}
              allowDecimal
              grouped
            />
            <NumberField
              label={copy.unitRateLabel}
              value={unitRate}
              onChange={setUnitRate}
              unit={rateUnit}
              hint={copy.unitRateHint}
              allowDecimal
            />
          </FieldRow>
          {type === 'gas' && (
            <NumberField
              label={copy.heatValueLabel}
              value={heatValue}
              onChange={setHeatValue}
              unit="MJ/㎥"
              hint={copy.heatValueHint}
              allowDecimal
            />
          )}
          <FieldRow>
            <NumberField
              label={copy.baseChargeLabel}
              value={baseCharge}
              onChange={setBaseCharge}
              unit="원"
              hint={copy.baseChargeHint}
              grouped
            />
            <NumberField
              label={copy.daysLabel}
              value={days}
              onChange={setDays}
              unit={copy.daysUnit}
            />
          </FieldRow>
          <CheckboxField
            label={copy.vatLabel}
            checked={vatIncluded}
            onChange={setVatIncluded}
            hint={copy.vatHint}
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
