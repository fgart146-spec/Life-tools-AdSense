'use client';

import type { ReactNode } from 'react';

/**
 * 계산기 공통 레이아웃.
 * - 데스크톱: 입력(좌) / 결과(우, 스티키)
 * - 모바일: 입력 → 결과 순서. 결과가 화면 위쪽에서 바로 보이도록 광고/설명보다 앞에 둔다.
 * - 계산은 입력 즉시 반영되므로 '계산' 버튼이 필요 없다(오클릭 유발 요소 감소).
 *
 * 디자인 원칙: 입력 카드와 결과 카드가 한눈에 구분돼야 한다.
 * 입력은 흰 카드 + 얇은 테두리, 결과는 굵은 테두리 + 컬러 헤더로 대비를 준다.
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
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-4 shadow-[var(--shadow-card)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-ink-100 pb-3">
            <h2 className="text-base font-bold text-ink-900">{inputTitle}</h2>
            {onReset && resetLabel && (
              <button
                type="button"
                onClick={onReset}
                className="-mr-2 min-h-11 shrink-0 rounded-lg px-3 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
              >
                {resetLabel}
              </button>
            )}
          </div>
          <div className="grid gap-5">{inputs}</div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">{results}</div>
      </div>
    </div>
  );
}
