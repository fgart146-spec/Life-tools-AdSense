'use client';

import type { ReactNode } from 'react';

/**
 * 계산기 공통 레이아웃.
 * - 데스크톱: 입력(좌) / 결과(우, 스티키)
 * - 모바일: 입력 → 결과 순서. 결과가 화면 위쪽에서 바로 보이도록 광고/설명보다 앞에 둔다.
 * - 계산은 입력 즉시 반영되므로 '계산' 버튼이 필요 없다(오클릭 유발 요소 감소).
 */
export function CalculatorShell({
  inputTitle,
  inputs,
  results,
  onReset,
  resetLabel,
}: {
  inputTitle: string;
  inputs: ReactNode;
  results: ReactNode;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-ink-900">{inputTitle}</h2>
            {onReset && resetLabel && (
              <button
                type="button"
                onClick={onReset}
                className="min-h-11 rounded-md px-3 text-sm font-medium text-ink-500 hover:bg-ink-100 hover:text-ink-800"
              >
                {resetLabel}
              </button>
            )}
          </div>
          <div className="grid gap-5">{inputs}</div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-20">{results}</div>
      </div>
    </div>
  );
}
