'use client';

import { useActionState, type ReactNode } from 'react';
import type { ActionResult } from '@/app/admin/actions';

/** 서버 액션 + 결과 메시지를 함께 처리하는 관리자 폼 래퍼 */
export function AdminForm({
  action,
  submitLabel,
  children,
}: {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  children: ReactNode;
}) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );

  return (
    <form action={formAction} className="grid gap-4">
      {children}
      {state && (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            state.ok
              ? 'border border-brand-300 bg-brand-50 text-brand-800'
              : 'border border-red-300 bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? '저장 중…' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export function AdminField({
  label,
  name,
  defaultValue,
  hint,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}

export function AdminTextarea({
  label,
  name,
  defaultValue,
  hint,
  rows = 8,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-ink-300 bg-white p-3 font-mono text-xs leading-relaxed focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}
