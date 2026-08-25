'use client';

import { useMemo, useState } from 'react';
import { formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcKimjangSauce } from '@/lib/calc/kimjang';
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
import type { KimjangSauceCopy } from './copy';

type Mode = 'salted' | 'count';

const STRENGTHS = [
  { value: '0.8', key: 'mild' as const },
  { value: '1', key: 'normal' as const },
  { value: '1.2', key: 'strong' as const },
];

export function Calculator({ locale, copy, common }: CalculatorProps<KimjangSauceCopy>) {
  const [mode, setMode] = useState<Mode>('salted');
  const [salted, setSalted] = useState('');
  const [count, setCount] = useState('');
  const [weight, setWeight] = useState('3');
  const [strength, setStrength] = useState('1');

  const saltedValue = parseNumber(salted);
  const countValue = parseNumber(count);
  const weightValue = parseNumber(weight);

  const result = useMemo(
    () =>
      calcKimjangSauce({
        saltedCabbageKg: mode === 'salted' ? saltedValue : null,
        cabbageCount: mode === 'count' ? countValue : null,
        cabbageWeightKg: weightValue,
        strength: parseNumber(strength) ?? 1,
      }),
    [mode, saltedValue, countValue, weightValue, strength],
  );

  const issueMessages: string[] = [];
  if (mode === 'salted' && saltedValue !== null && saltedValue <= 0) {
    issueMessages.push(copy.issueSalted);
  }
  if (mode === 'count' && countValue !== null && countValue <= 0) {
    issueMessages.push(copy.issueCount);
  }
  if (weightValue !== null && (weightValue <= 0 || weightValue > 10)) {
    issueMessages.push(copy.issueWeight);
  }

  const num = (value: number, max = 0) => formatNumber(value, locale, { max });

  const rows = result
    ? result.items.map((item) => {
        const isKg = item.unit === 'g' && item.amount >= 1000;
        const amount = isKg ? item.amount / 1000 : item.amount;
        const unit = isKg ? 'kg' : item.unit === 'ml' ? 'ml' : item.unit === 'ea' ? '개' : 'g';
        return {
          label: copy.itemLabels[item.key] ?? item.key,
          value: `${num(amount, isKg ? 2 : 0)} ${unit}`,
          emphasis: item.key === 'chili',
        };
      })
    : [];

  const chili = result?.items.find((item) => item.key === 'chili');

  const notes = result
    ? [
        ...(chili
          ? [
              interpolate(copy.noteChili, {
                chili:
                  chili.amount >= 1000
                    ? `${num(chili.amount / 1000, 2)}kg`
                    : `${num(chili.amount)}g`,
              }),
            ]
          : []),
        interpolate(copy.noteSalted, { salted: num(result.saltedCabbageKg, 1) }),
        copy.noteTaste,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setMode('salted');
        setSalted('');
        setCount('');
        setWeight('3');
        setStrength('1');
      }}
      inputs={
        <>
          <SegmentedField
            label={copy.modeLabel}
            value={mode}
            onChange={(value) => setMode(value as Mode)}
            options={[
              { value: 'salted', label: copy.modeSalted },
              { value: 'count', label: copy.modeCount },
            ]}
          />
          {mode === 'salted' ? (
            <NumberField
              label={copy.saltedLabel}
              value={salted}
              onChange={setSalted}
              unit={copy.saltedUnit}
              hint={copy.saltedHint}
              allowDecimal
            />
          ) : (
            <FieldRow>
              <NumberField
                label={copy.countLabel}
                value={count}
                onChange={setCount}
                unit={copy.countUnit}
                hint={copy.countHint}
              />
              <NumberField
                label={copy.weightLabel}
                value={weight}
                onChange={setWeight}
                unit={copy.weightUnit}
                hint={copy.weightHint}
                allowDecimal
              />
            </FieldRow>
          )}
          <SegmentedField
            label={copy.strengthLabel}
            value={strength}
            onChange={setStrength}
            options={STRENGTHS.map((item) => ({
              value: item.value,
              label:
                item.key === 'mild'
                  ? copy.strengthMild
                  : item.key === 'normal'
                    ? copy.strengthNormal
                    : copy.strengthStrong,
            }))}
            hint={copy.strengthHint}
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
                  label={copy.primaryLabel}
                  value={
                    chili
                      ? chili.amount >= 1000
                        ? `${num(chili.amount / 1000, 2)} kg`
                        : `${num(chili.amount)} g`
                      : '-'
                  }
                  sub={`${copy.saltedResultLabel}: ${num(result.saltedCabbageKg, 1)} kg`}
                  tone="positive"
                />
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
