'use client';

import { useMemo, useState } from 'react';
import { formatMoney, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
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
import { calcMovingCost, findIssues, type MovingType } from './calc';
import type { MovingCostCopy } from './copy';

const TYPES: MovingType[] = ['full', 'semi', 'basic'];

export function Calculator({ locale, copy, common }: CalculatorProps<MovingCostCopy>) {
  const [type, setType] = useState<MovingType>('full');
  const [pyeong, setPyeong] = useState('25');
  const [distance, setDistance] = useState('');
  const [aircon, setAircon] = useState('');
  const [needLadder, setNeedLadder] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [premiumDay, setPremiumDay] = useState(false);

  const input = useMemo(
    () => ({
      type,
      pyeong: parseNumber(pyeong),
      distanceKm: parseNumber(distance),
      needLadder,
      airconCount: parseNumber(aircon),
      cleaning,
      premiumDay,
    }),
    [type, pyeong, distance, aircon, needLadder, cleaning, premiumDay],
  );

  const result = useMemo(() => calcMovingCost(input), [input]);
  const issueMessages = findIssues(input).map((issue) => {
    if (issue === 'pyeong') return copy.issuePyeong;
    if (issue === 'distance') return copy.issueDistance;
    return copy.issueAircon;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.baseCostLabel, value: money(result.baseCost) },
        ...(result.distanceCost > 0
          ? [{ label: copy.distanceCostLabel, value: money(result.distanceCost) }]
          : []),
        ...(result.ladderCost > 0
          ? [{ label: copy.ladderCostLabel, value: money(result.ladderCost) }]
          : []),
        ...(result.airconCost > 0
          ? [{ label: copy.airconCostLabel, value: money(result.airconCost) }]
          : []),
        ...(result.cleaningCost > 0
          ? [{ label: copy.cleaningCostLabel, value: money(result.cleaningCost) }]
          : []),
        ...(result.premiumAmount > 0
          ? [{ label: copy.premiumCostLabel, value: money(result.premiumAmount) }]
          : []),
        {
          label: copy.rangeLabel,
          value: `${money(result.min)} ~ ${money(result.max)}`,
          emphasis: true,
        },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteTotal, { total: money(result.total) }),
        interpolate(copy.noteRange, { min: money(result.min), max: money(result.max) }),
        ...(result.premiumAmount > 0 ? [copy.notePremium] : []),
        copy.noteQuote,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setType('full');
        setPyeong('25');
        setDistance('');
        setAircon('');
        setNeedLadder(false);
        setCleaning(false);
        setPremiumDay(false);
      }}
      inputs={
        <>
          <SegmentedField
            label={copy.typeLabel}
            value={type}
            onChange={(value) => setType(value as MovingType)}
            options={TYPES.map((item) => ({ value: item, label: copy.typeOptions[item] }))}
            hint={copy.typeHint}
          />
          <FieldRow>
            <NumberField
              label={copy.pyeongLabel}
              value={pyeong}
              onChange={setPyeong}
              unit={copy.pyeongUnit}
              hint={copy.pyeongHint}
              allowDecimal
            />
            <NumberField
              label={copy.distanceLabel}
              value={distance}
              onChange={setDistance}
              unit={copy.distanceUnit}
              hint={copy.distanceHint}
              allowDecimal
            />
          </FieldRow>
          <NumberField
            label={copy.airconLabel}
            value={aircon}
            onChange={setAircon}
            unit={copy.airconUnit}
            hint={copy.airconHint}
          />
          <CheckboxField
            label={copy.ladderLabel}
            checked={needLadder}
            onChange={setNeedLadder}
            hint={copy.ladderHint}
          />
          <CheckboxField
            label={copy.cleaningLabel}
            checked={cleaning}
            onChange={setCleaning}
            hint={copy.cleaningHint}
          />
          <CheckboxField
            label={copy.premiumLabel}
            checked={premiumDay}
            onChange={setPremiumDay}
            hint={copy.premiumHint}
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
                  sub={`${money(result.min)} ~ ${money(result.max)}`}
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
