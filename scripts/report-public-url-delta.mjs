#!/usr/bin/env node
/** 배포 전 공개 URL 증감 보고. 기준 스냅샷은 검토한 배포 뒤에만 갱신한다. */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const baselinePath = path.join(root, 'scripts', 'public-url-baseline.json');
const sitemapPath = path.join(root, '.next', 'server', 'app', 'sitemap.xml.body');

function normalizePath(value) {
  const pathname = new URL(value, 'https://example.invalid').pathname;
  return pathname.replace(/\/+$/, '') || '/';
}

async function main() {
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  const sitemap = await readFile(sitemapPath, 'utf8');
  const previous = new Set(baseline.paths.map(normalizePath));
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizePath(match[1]));
  const current = new Set(locations);

  if (previous.size !== baseline.paths.length || current.size !== locations.length || current.size === 0) {
    throw new Error('URL 기준 목록 또는 빌드 사이트맵에 중복·누락이 있습니다.');
  }

  const added = [...current].filter((item) => !previous.has(item)).sort();
  const removed = [...previous].filter((item) => !current.has(item)).sort();
  console.log(`공개 URL 기준 ${previous.size}개 / 신규 +${added.length}개 / 제외 -${removed.length}개 / 빌드 후 ${current.size}개`);
  if (added.length) console.log(`신규 URL:\n${added.map((item) => ` + ${item}`).join('\n')}`);
  if (removed.length) console.log(`제외 URL:\n${removed.map((item) => ` - ${item}`).join('\n')}`);
  if (added.length >= 10 || removed.length >= 10) {
    console.warn('경고: 공개 URL이 한 번에 10개 이상 변합니다. 의도와 페이지 품질을 배포 전에 검토하세요.');
  }
  console.log(`기준 스냅샷: ${baseline.capturedAt}. 실제 배포를 확인한 뒤에만 기준 목록을 갱신하세요.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
