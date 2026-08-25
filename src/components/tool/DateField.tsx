'use client';

import { useId } from 'react';

/** 날짜 입력 필드 (모바일에서 기본 날짜 선택기 사용) */
export function DateField({
  label,
  value,
  onChange,
  hint,
  min,
  max,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  min?: string;
  max?: string;
  id?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="min-w-0">
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <input
        id={fieldId}
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-ink-300 bg-white px-3 text-base text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      {hint && <p className="mt-1.5 text-sm text-ink-500">{hint}</p>}
    </div>
  );
}
