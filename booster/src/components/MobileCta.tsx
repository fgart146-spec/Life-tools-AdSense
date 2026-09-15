import { TrialButton } from '@/components/Cta';

/**
 * 모바일 하단 고정 문의 버튼.
 * - 본문을 가리지 않도록 <main> 에 같은 높이의 하단 여백을 준다 (layout.tsx 의 pb-[5.5rem]).
 * - 키보드가 열리면(입력 요소 포커스) 가릴 수 있으나 이 사이트에는 입력 폼이 없다.
 * - 홈 인디케이터 영역(safe-area)을 피한다.
 */
export function MobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-200 bg-white/95 px-4 pt-3 backdrop-blur md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <TrialButton placement="mobile_bar" className="w-full" />
    </div>
  );
}
