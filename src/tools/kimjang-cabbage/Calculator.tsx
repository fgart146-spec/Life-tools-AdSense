'use client';

import { useMemo, useState } from 'react';
import { formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcKimjangCabbage, findCabbageIssues } from '@/lib/calc/kimjang';
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
import type { KimjangCabbageCopy } from './copy';

export function Calculator({ locale, copy, common }: CalculatorProps<KimjangCabbageCopy>) {
  const [members, setMembers] = useState('4');
  const [months, setMonths] = useState('6');
  const [gramPerDay, setGramPerDay] = useState('60');
  const [weight, setWeight] = useState('3');

  const parsed = useMemo(
    () => ({
      members: parseNumber(members),
      months: parseNumber(months),
      gramPerDay: parseNumber(gramPerDay),
      cabbageWeightKg: parseNumber(weight),
    }),
    [members, months, gramPerDay, weight],
  );

  const result = useMemo(() => calcKimjangCabbage(parsed), [parsed]);
  const issueMessages = findCabbageIssues(parsed).map((issue) => {
    if (issue === 'members') return copy.issueMembers;
    if (issue === 'months') return copy.issueMonths;
    if (issue === 'gram') return copy.issueGram;
    return copy.issueWeight;
  });

  const num = (value: number, max = 1) => formatNumber(value, locale, { max });

  const rows = result
    ? [
        { label: copy.kimchiLabel, value: `${num(result.totalKimchiKg)} kg` },
        { label: copy.saltedLabel, value: `${num(result.saltedCabbageKg)} kg` },
        { label: copy.freshLabel, value: `${num(result.freshCabbageKg)} kg` },
        { label: copy.saltLabel, value: `${num(result.saltKg)} kg`, emphasis: true },
        { label: copy.brineLabel, value: `${num(result.brineL)} L` },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteCount, { count: formatNumber(result.cabbageCount, locale) }),
        interpolate(copy.noteKimchi, { kimchi: num(result.totalKimchiKg) }),
        interpolate(copy.noteSalt, { salt: num(result.saltKg), brine: num(result.brineL) }),
        copy.noteSalted,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setMembers('4');
        setMonths('6');
        setGramPerDay('60');
        setWeight('3');
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
              label={copy.monthsLabel}
              value={months}
              onChange={setMonths}
              unit={copy.monthsUnit}
              hint={copy.monthsHint}
              allowDecimal
            />
          </FieldRow>
          <FieldRow>
            <NumberField
              label={copy.gramLabel}
              value={gramPerDay}
              onChange={setGramPerDay}
              unit={copy.gramUnit}
              hint={copy.gramHint}
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
                  label={copy.countLabel}
                  value={`${formatNumber(result.cabbageCount, locale)} 포기`}
                  sub={`${num(result.freshCabbageKg)} kg`}
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
