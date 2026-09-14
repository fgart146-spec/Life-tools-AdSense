'use client';

import { useEffect, useState } from 'react';

type AuthState = 'loading' | 'confirmed' | 'recovery' | 'error';

function readAuthValues() {
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const value = (name: string) => hash.get(name) ?? query.get(name) ?? '';
  return {
    type: value('type'),
    error: value('error_description') || value('error'),
    hasSession: Boolean(value('access_token')),
  };
}

export default function AuthCallbackPage() {
  const [state, setState] = useState<AuthState>('loading');
  const [message, setMessage] = useState('인증 결과를 확인하고 있습니다.');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const result = readAuthValues();
      if (result.error) {
        setState('error');
        setMessage(decodeURIComponent(result.error.replace(/\+/g, ' ')));
        return;
      }
      if (result.type === 'recovery') {
        setState('recovery');
        setMessage(
          result.hasSession
            ? '비밀번호 재설정 인증이 완료되었습니다.'
            : '비밀번호 재설정 링크가 확인되었습니다.',
        );
        return;
      }
      setState('confirmed');
      setMessage('이메일 인증이 완료되었습니다.');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function copyCurrentAddress() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-ink-200 bg-white p-7 shadow-card sm:p-10">
        <div className="mb-5 text-4xl" aria-hidden="true">
          {state === 'error' ? '⚠️' : state === 'loading' ? '⏳' : '✅'}
        </div>
        <h1 className="text-2xl font-bold text-ink-900">{message}</h1>

        {state === 'confirmed' && (
          <div className="mt-5 space-y-3 text-ink-700">
            <p>이제 이웃부스터 프로그램으로 돌아가 가입한 이메일과 비밀번호로 로그인해 주세요.</p>
            <p className="text-sm text-ink-500">이 페이지는 닫아도 됩니다.</p>
          </div>
        )}

        {state === 'recovery' && (
          <div className="mt-5 space-y-5 text-ink-700">
            <ol className="list-decimal space-y-2 pl-6">
              <li>아래 버튼으로 현재 인증 주소를 복사하세요.</li>
              <li>이웃부스터의 비밀번호 재설정 창으로 돌아가세요.</li>
              <li>메일 코드/링크 칸에 붙여넣고 새 비밀번호를 입력하세요.</li>
            </ol>
            <button
              type="button"
              onClick={copyCurrentAddress}
              className="w-full rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
            >
              {copied ? '인증 주소를 복사했습니다' : '현재 인증 주소 복사'}
            </button>
            <p className="text-sm text-ink-500">
              인증 주소에는 일회용 정보가 포함될 수 있으므로 다른 사람에게 보내지 마세요.
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="mt-5 space-y-3 text-ink-700">
            <p>링크가 만료되었거나 이미 사용되었을 수 있습니다.</p>
            <p>이웃부스터에서 인증메일 또는 비밀번호 재설정 메일을 다시 요청해 주세요.</p>
          </div>
        )}
      </section>
    </main>
  );
}
