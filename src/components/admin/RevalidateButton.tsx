'use client';

import { useState, useTransition } from 'react';
import { revalidateAllAction } from '@/app/admin/actions';

export function RevalidateButton() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const result = await revalidateAllAction();
            setMessage(result.message);
          })
        }
        className="h-11 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? '요청 중…' : '지금 재생성'}
      </button>
      {message && <p className="mt-2 text-sm text-ink-600">{message}</p>}
    </div>
  );
}
