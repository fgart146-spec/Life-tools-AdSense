import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * siteConfig가 모듈 로드 시점에 process.env를 읽으므로
 * 케이스마다 모듈 캐시를 비우고 다시 import한다.
 */
async function loadSocial(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) vi.stubEnv(key, '');
    else vi.stubEnv(key, value);
  }
  return import('./social');
}

describe('socialLinks', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_INSTAGRAM_URL', '');
    vi.stubEnv('NEXT_PUBLIC_THREADS_URL', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('값이 없으면 링크를 만들지 않는다', async () => {
    const { socialLinks, hasSocialLinks } = await loadSocial({});
    expect(socialLinks()).toEqual([]);
    expect(hasSocialLinks()).toBe(false);
  });

  it('정상 주소는 그대로 노출한다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: 'https://www.instagram.com/eolmaji',
      NEXT_PUBLIC_THREADS_URL: 'https://www.threads.com/@eolmaji',
    });
    expect(socialLinks().map((link) => link.platform)).toEqual(['instagram', 'threads']);
  });

  it('threads.net과 threads.com을 모두 허용한다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_THREADS_URL: 'https://www.threads.net/@eolmaji',
    });
    expect(socialLinks()).toHaveLength(1);
  });

  it('앞뒤 공백/개행이 섞여도 처리한다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: '  https://www.instagram.com/eolmaji \n',
    });
    expect(socialLinks()[0]?.url).toBe('https://www.instagram.com/eolmaji');
  });

  it('https가 아니면 링크를 만들지 않는다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: 'http://www.instagram.com/eolmaji',
    });
    expect(socialLinks()).toEqual([]);
  });

  it('플랫폼 도메인이 아니면 링크를 만들지 않는다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: 'https://instagram.com.evil.example/eolmaji',
      NEXT_PUBLIC_THREADS_URL: 'https://example.com/@eolmaji',
    });
    expect(socialLinks()).toEqual([]);
  });

  it('URL 형식이 아니면 링크를 만들지 않는다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: '@eolmaji',
    });
    expect(socialLinks()).toEqual([]);
  });

  it('한쪽만 설정돼 있으면 그쪽만 노출한다', async () => {
    const { socialLinks } = await loadSocial({
      NEXT_PUBLIC_INSTAGRAM_URL: 'https://www.instagram.com/eolmaji',
    });
    expect(socialLinks()).toHaveLength(1);
    expect(socialLinks()[0]?.platform).toBe('instagram');
  });
});
