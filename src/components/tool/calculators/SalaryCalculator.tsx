'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatPercent, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import { calcSalary, findSalaryIssues } from '@/lib/calc/payroll';
import { DEFAULT_NON_TAXABLE_MONTHLY } from '@/lib/data/kr-payroll';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import type { SalaryToolCopy } from '@/lib/tools/shared/salary-copy';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { FieldRow, NumberField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';

/**
 * 실수령액 계산기.
 * mode에 따라 입력 금액을 연봉 또는 월급으로 해석한다(계산 로직은 동일).
 */
export function SalaryCalculator({
  locale,
  copy,
  common,
  basis,
  mode,
}: CalculatorProps<SalaryToolCopy> & { mode: 'annual' | 'monthly' }) {
  const [amount, setAmount] = useState('');
  const [nonTaxable, setNonTaxable] = useState(String(DEFAULT_NON_TAXABLE_MONTHLY));
  const [dependents, setDependents] = useState('1');
  const [children, setChildren] = useState('0');

  const amountValue = parseNumber(amount);
  const annualSalary =
    amountValue === null ? null : mode === 'annual' ? amountValue : amountValue * 12;

  const input = useMemo(
    () => ({
      annualSalary,
      nonTaxableMonthly: parseNumber(nonTaxable),
      dependents: parseNumber(dependents),
      children: parseNumber(children),
    }),
    [annualSalary, nonTaxable, dependents, children],
  );

  // 관리자 기준값이 있으면 그 요율로 계산한다(없으면 코드 기본값).
  const rates = basis?.payroll.rates;
  const result = useMemo(() => calcSalary(input, rates), [input, rates]);
  const issueMessages = findSalaryIssues(input).map((issue) => {
    if (issue === 'salary') return copy.issueSalary;
    if (issue === 'nonTaxable') return copy.issueNonTaxable;
    if (issue === 'dependents') return copy.issueDependents;
    return copy.issueChildren;
  });

  const money = (value: number) => formatMoney(value, locale);

  const rows = result
    ? [
        { label: copy.grossMonthlyLabel, value: money(result.monthlyGross) },
        { label: copy.pensionLabel, value: `- ${money(result.nationalPension)}` },
        { label: copy.healthLabel, value: `- ${money(result.health)}` },
        { label: copy.careLabel, value: `- ${money(result.longTermCare)}` },
        { label: copy.employmentLabel, value: `- ${money(result.employment)}` },
        { label: copy.incomeTaxLabel, value: `- ${money(result.incomeTax)}` },
        { label: copy.localTaxLabel, value: `- ${money(result.localTax)}` },
        {
          label: copy.totalDeductionLabel,
          value: `- ${money(result.totalDeduction)}`,
          emphasis: true,
        },
        { label: copy.deductionRateLabel, value: formatPercent(result.deductionRate, locale) },
        { label: copy.netAnnualLabel, value: money(result.netAnnual) },
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteNet, { net: money(result.netMonthly) }),
        interpolate(copy.noteDeduction, {
          deduction: money(result.totalDeduction),
          rate: formatPercent(result.deductionRate, locale),
        }),
        interpolate(copy.noteAnnual, { annual: money(result.netAnnual) }),
        copy.noteApprox,
        copy.noteYearEnd,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setAmount('');
        setNonTaxable(String(DEFAULT_NON_TAXABLE_MONTHLY));
        setDependents('1');
        setChildren('0');
      }}
      inputs={
        <>
          <NumberField
            label={copy.amountLabel}
            value={amount}
            onChange={setAmount}
            unit={copy.amountUnit}
            hint={copy.amountHint}
            placeholder={copy.amountPlaceholder}
            grouped
          />
          <NumberField
            label={copy.nonTaxableLabel}
            value={nonTaxable}
            onChange={setNonTaxable}
            unit="원"
            hint={copy.nonTaxableHint}
            grouped
          />
          <FieldRow>
            <NumberField
              label={copy.dependentsLabel}
              value={dependents}
              onChange={setDependents}
              unit={copy.dependentsUnit}
              hint={copy.dependentsHint}
            />
            <NumberField
              label={copy.childrenLabel}
              value={children}
              onChange={setChildren}
              unit={copy.childrenUnit}
              hint={copy.childrenHint}
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
                  label={copy.netMonthlyLabel}
                  value={money(result.netMonthly)}
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
