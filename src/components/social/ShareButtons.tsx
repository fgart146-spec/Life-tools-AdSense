'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { trackEvent } from '@/lib/analytics';

/**
 * 계산 결과 영역 하단의 공유 버튼.
 *
 * 원칙
 * - 공유되는 것은 '계산기 주소'뿐이다. 사용자가 입력한 값이나 계산 결과는
 *   URL query에도, 공유 문구에도 넣지 않는다.
 * - url은 서버에서 canonical과 동일하게 만들어 넘긴다. window.location을 읽지 않는다
 *   (query string이 붙은 주소가 공유되는 것을 막는다).
 * - navigator.share는 SSR에 없고 데스크톱 브라우저에도 대부분 없다.
 *   렌더 중에 확인하면 hydration 불일치가 나므로 mount 후에 판별한다.
 * - 사용자가 공유 시트를 닫는 것(AbortError)은 오류가 아니다. 아무 메시지도 띄우지 않는다.
 * - 존재하지 않는 Instagram 웹 공유는 만들지 않는다. 모바일에서는 OS 공유 시트에
 *   설치된 앱이 뜨므로 그쪽이 정상 경로다.
 */

interface ShareButtonsProps {
  /** 공유할 절대 URL (canonical과 동일, query 없음) */
  url: string;
  /** 공유 제목 */
  title: string;
  /** 공유 문구. 계산값을 포함하지 않는다. */
  text: string;
  labels: {
    heading: string;
    description: string;
    share: string;
    copyLink: string;
    copied: string;
    copyFailed: string;
  };
  /** 분석용 식별자 (도구 slug). 사용자 데이터가 아니다. */
  itemId: string;
}

type Status = 'idle' | 'copied' | 'failed';

const FEEDBACK_MS = 2400;

async function writeToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // 권한 거부·비보안 컨텍스트 등. 아래 대체 경로로 넘어간다.
  }

  // Clipboard API를 쓸 수 없는 환경(구형 브라우저, http 등) 대비
  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * navigator.share 지원 여부는 서버에서 알 수 없다.
 * 서버 스냅샷을 false로 고정해 첫 렌더를 서버와 일치시키고,
 * hydration 이후 실제 값으로 바뀌게 한다 (hydration 불일치 없음).
 */
const subscribeNever = () => () => {};
const canShareOnClient = () =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';
const canShareOnServer = () => false;

export function ShareButtons({ url, title, text, labels, itemId }: ShareButtonsProps) {
  const canShare = useSyncExternalStore(subscribeNever, canShareOnClient, canShareOnServer);
  const [status, setStatus] = useState<Status>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const flash = useCallback((next: Status) => {
    setStatus(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), FEEDBACK_MS);
  }, []);

  const handleCopy = useCallback(async () => {
    const ok = await writeToClipboard(url);
    flash(ok ? 'copied' : 'failed');
    if (ok) trackEvent('copy_link', { item_id: itemId });
  }, [flash, itemId, url]);

  const handleShare = useCallback(async () => {
    if (typeof navigator.share !== 'function') {
      await handleCopy();
      return;
    }
    try {
      await navigator.share({ title, text, url });
      trackEvent('share_click', { method: 'web_share', item_id: itemId });
    } catch (error) {
      // 사용자가 취소한 경우는 실패가 아니다. 조용히 끝낸다.
      if (error instanceof DOMException && error.name === 'AbortError') return;
      // 그 밖의 실패는 링크 복사로 대체한다.
      await handleCopy();
    }
  }, [handleCopy, itemId, text, title, url]);

  const buttonClass =
    'inline-flex min-h-11 items-center justify-center rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700';

  return (
    <div className="mt-6 rounded-[var(--radius-card)] border border-ink-200 bg-ink-50 px-4 py-4">
      <p className="text-sm font-semibold text-ink-800">{labels.heading}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-600">{labels.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {canShare && (
          <button type="button" onClick={handleShare} className={buttonClass}>
            {labels.share}
          </button>
        )}
        <button type="button" onClick={handleCopy} className={buttonClass}>
          {labels.copyLink}
        </button>

        {/* 결과를 알리는 영역. 갱신 전에도 DOM에 있어야 스크린리더가 읽는다. */}
        <span role="status" aria-live="polite" className="text-sm font-medium text-brand-700">
          {status === 'copied' && labels.copied}
          {status === 'failed' && labels.copyFailed}
        </span>
      </div>
    </div>
  );
}
