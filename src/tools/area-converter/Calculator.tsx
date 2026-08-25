'use client';

import { useMemo, useState } from 'react';
import { formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { convertArea, exclusiveArea, findIssues, type AreaUnit } from '@/lib/calc/area';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import type { AreaConverterCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<AreaConverterCopy>) {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<AreaUnit>('pyeong');
  const [ratio, setRatio] = useState('');

  const input = useMemo(() => ({ value: parseNumber(value), unit }), [value, unit]);
  const result = useMemo(() => convertArea(input), [input]);

  const ratioValue = parseNumber(ratio);
  const exclusive =
    result && ratioValue !== null ? exclusiveArea(result.sqm, ratioValue) : null;

  const issueMessages: string[] = findIssues(input).map(() => copy.issueValue);
  if (ratioValue !== null && (ratioValue <= 0 || ratioValue > 100)) {
    issueMessages.push(copy.issueRatio);
  }

  const num = (input_: number, max = 2) => formatNumber(input_, locale, { max });

  const rows = result
    ? [
        { label: copy.pyeongLabel, value: `${num(result.pyeong)} ${copy.unitPyeong}` },
        { label: copy.sqftLabel, value: `${num(result.sqft, 1)} ${copy.unitSqft}` },
        { label: copy.squareSideLabel, value: `${num(result.squareSide)} m` },
        ...(exclusive !== null
          ? [{ label: copy.exclusiveLabel, value: `${num(exclusive)} ${copy.unitSqm}`, emphasis: true }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteMain, { sqm: num(result.sqm), pyeong: num(result.pyeong) }),
        interpolate(copy.noteSqft, { sqft: num(result.sqft, 1) }),
        interpolate(copy.noteSide, { side: num(result.squareSide) }),
        ...(exclusive !== null
          ? [interpolate(copy.noteExclusive, { exclusive: num(exclusive) })]
          : []),
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setValue('');
        setUnit('pyeong');
        setRatio('');
      }}
      inputs={
        <>
          <NumberField
            label={copy.valueLabel}
            value={value}
            onChange={setValue}
            hint={copy.valueHint}
            placeholder={copy.valuePlaceholder}
            allowDecimal
            grouped
          />
          <SegmentedField
            label={copy.unitLabel}
            value={unit}
            onChange={(next) => setUnit(next as AreaUnit)}
            options={[
              { value: 'pyeong', label: copy.unitPyeong },
              { value: 'sqm', label: copy.unitSqm },
              { value: 'sqft', label: copy.unitSqft },
            ]}
          />
          <NumberField
            label={copy.ratioLabel}
            value={ratio}
            onChange={setRatio}
            unit="%"
            hint={copy.ratioHint}
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
                  label={copy.sqmLabel}
                  value={`${num(result.sqm)} ${copy.unitSqm}`}
                  sub={`${num(result.pyeong)} ${copy.unitPyeong}`}
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
