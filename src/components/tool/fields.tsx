'use client';

import { useId, type ChangeEvent, type ReactNode } from 'react';
import { groupDigits } from '@/lib/format/number';

/* -------------------------------------------------------------------------- */
/* 공통 래퍼                                                                    */
/* -------------------------------------------------------------------------- */

export function FieldGroup({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={`min-w-0 ${className}`}>
      {title && (
        <legend className="mb-2.5 text-sm font-semibold text-ink-700">{title}</legend>
      )}
      <div className="grid gap-5">{children}</div>
    </fieldset>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function FieldFrame({
  htmlFor,
  label,
  hint,
  error,
  optional,
  children,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-[0.9375rem] font-semibold text-ink-800"
      >
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink-500">{optional}</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

/**
 * 입력창 공통 스타일.
 * 높이 56px는 모바일 터치 타깃과 40~60대 가독성을 함께 고려한 값이다.
 * focus 상태는 테두리+링을 함께 써서 어디에 입력 중인지 분명히 보이게 한다.
 */
const inputClass =
  'h-14 w-full rounded-[var(--radius-field)] border bg-white px-4 text-lg text-ink-900 tabular transition-colors placeholder:text-base placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100';

/* -------------------------------------------------------------------------- */
/* 숫자 입력                                                                    */
/* -------------------------------------------------------------------------- */

function countDigits(text: string): number {
  return (text.match(/\d/g) ?? []).length;
}

function caretAfterDigits(text: string, digits: number): number {
  if (digits <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (/\d/.test(text[index] ?? '')) {
      seen += 1;
      if (seen === digits) return index + 1;
    }
  }
  return text.length;
}

function sanitizeNumeric(raw: string, allowDecimal: boolean, allowNegative: boolean): string {
  let result = '';
  let hasDot = false;
  for (const char of raw) {
    if (char >= '0' && char <= '9') {
      result += char;
      continue;
    }
    if (allowDecimal && char === '.' && !hasDot) {
      hasDot = true;
      result += '.';
      continue;
    }
    if (allowNegative && char === '-' && result === '') {
      result += '-';
    }
  }
  return result;
}

export interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** 입력 오른쪽에 표시할 단위 (원, g, % 등) */
  unit?: string;
  hint?: string;
  placeholder?: string;
  /** 소수 입력 허용 */
  allowDecimal?: boolean;
  allowNegative?: boolean;
  /** 천단위 구분 표시 (금액에 사용) */
  grouped?: boolean;
  error?: string;
  optional?: string;
  id?: string;
}

/**
 * 숫자 입력 필드.
 * - 모바일 숫자 키패드(inputMode="decimal")
 * - 금액은 입력 중에도 천단위 구분을 유지하고 커서 위치를 보정한다.
 */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  placeholder,
  allowDecimal = false,
  allowNegative = false,
  grouped = false,
  error,
  optional,
  id,
}: NumberFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const caret = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = countDigits(input.value.slice(0, caret));

    const sanitized = sanitizeNumeric(input.value, allowDecimal, allowNegative);
    const next = grouped ? groupDigits(sanitized) : sanitized;

    onChange(next);

    if (grouped) {
      // 포맷팅으로 길이가 바뀌므로 '앞쪽 숫자 개수' 기준으로 커서를 복원한다.
      const nextCaret = caretAfterDigits(next, digitsBeforeCaret);
      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          input.setSelectionRange(nextCaret, nextCaret);
        }
      });
    }
  }

  return (
    <FieldFrame htmlFor={fieldId} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <input
          id={fieldId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          enterKeyHint="done"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          className={`${inputClass} ${unit ? 'pr-14' : ''} ${
            error ? 'border-red-400' : 'border-ink-300'
          }`}
        />
        {unit && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base font-medium text-ink-500"
          >
            {unit}
          </span>
        )}
      </div>
    </FieldFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 선택 입력                                                                    */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  hint?: string;
  id?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldFrame htmlFor={fieldId} label={label} hint={hint}>
      <select
        id={fieldId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} cursor-pointer border-ink-300 pr-10`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

/** 2~4개 선택지를 한 줄로 보여주는 세그먼트 컨트롤 (단위 전환 등) */
export function SegmentedField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  hint?: string;
}) {
  const groupId = useId();

  return (
    <div className="min-w-0">
      <p id={groupId} className="mb-2 text-[0.9375rem] font-semibold text-ink-800">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        className="flex flex-wrap gap-1 rounded-[var(--radius-field)] bg-ink-100 p-1"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`min-h-12 flex-1 rounded-lg px-3 text-[0.9375rem] font-semibold transition-colors ${
                selected
                  ? 'bg-white text-brand-700 shadow-[var(--shadow-card)]'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-2 text-sm leading-relaxed text-ink-500">{hint}</p>}
    </div>
  );
}

/** 체크박스 (옵션 토글) */
export function CheckboxField({
  label,
  checked,
  onChange,
  hint,
  id,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  id?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="min-w-0">
      <label
        htmlFor={fieldId}
        className="flex min-h-12 cursor-pointer items-center gap-3 text-base text-ink-800"
      >
        <input
          id={fieldId}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-5 w-5 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-200"
        />
        {label}
      </label>
      {hint && <p className="mt-1 text-sm leading-relaxed text-ink-500">{hint}</p>}
    </div>
  );
}
