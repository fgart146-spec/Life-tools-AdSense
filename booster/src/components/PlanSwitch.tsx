'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

/**
 * 영구 이용권 / AI 이용권 선택 UI.
 * - 두 패널 모두 초기 HTML 에 렌더된다(검색엔진·자바스크립트 미실행 환경에서도 내용이 읽힌다).
 *   자바스크립트가 있으면 선택하지 않은 패널을 hidden 으로 감춘다.
 * - role=tablist / 화살표 키 이동 / aria-selected 로 키보드 이용을 지원한다.
 */
export interface PlanPanel {
  id: string;
  label: string;
  content: ReactNode;
}

export function PlanSwitch({ panels }: { panels: readonly PlanPanel[] }) {
  const [active, setActive] = useState(panels[0]?.id ?? '');
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = panels.length;
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    const target = panels[next];
    if (!target) return;
    setActive(target.id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="이용 방식 선택"
        className="inline-flex rounded-xl border border-ink-300 bg-white p-1"
      >
        {panels.map((panel, index) => {
          const selected = panel.id === active;
          return (
            <button
              key={panel.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${panel.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${panel.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(panel.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-11 rounded-lg px-5 text-base font-semibold transition-colors ${
                selected ? 'bg-brand-600 text-white' : 'text-ink-700 hover:bg-ink-100'
              }`}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`${baseId}-panel-${panel.id}`}
          aria-labelledby={`${baseId}-tab-${panel.id}`}
          hidden={panel.id !== active}
          className="mt-6"
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
