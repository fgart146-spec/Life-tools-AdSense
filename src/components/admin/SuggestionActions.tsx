'use client';

import { useActionState } from 'react';
import { reviewSuggestionAction, type ActionResult } from '@/app/admin/actions';

/** 제안 승인/거절 버튼. 승인해도 공개 콘텐츠가 자동으로 바뀌지는 않는다. */
export function SuggestionActions({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    reviewSuggestionAction,
    null,
  );

  return (
    <form action={formAction} className="mt-3 flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        name="status"
        value="approved"
        disabled={pending}
        className="h-10 rounded-md bg-brand-600 px-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        승인
      </button>
      <button
        type="submit"
        name="status"
        value="rejected"
        disabled={pending}
        className="h-10 rounded-md border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-100 disabled:opacity-60"
      >
        거절
      </button>
      {state && (
        <span className={`text-sm ${state.ok ? 'text-brand-700' : 'text-red-700'}`}>
          {state.message}
        </span>
      )}
    </form>
  );
}
