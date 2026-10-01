#!/usr/bin/env node
/**
 * 빌드 결과(.next/server/app)의 정적 HTML을 검사한다.
 *
 * 검사 항목
 *  1) 내부 링크가 실제로 생성된 페이지를 가리키는지 (깨진 링크 0)
 *  2) 페이지마다 H1이 정확히 하나인지
 *  3) 공개 URL의 self canonical / 상호 hreflang / noindex / sitemap 일치
 *  4) 공개 페이지의 고아 여부와 클라이언트 번들 비밀키
 *
 * 사용: node scripts/check-static-site.mjs
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const APP_DIR = path.join(process.cwd(), '.next', 'server', 'app');
const STATIC_DIR = path.join(process.cwd(), '.next', 'static');

/** 라우팅에는 없지만 정상인 외부/특수 링크 */
const IGNORED_PREFIXES = ['http://', 'https://', 'mailto:', 'tel:', '#', '/_next/'];
/** 정적 HTML로 생성되지 않는 동적 경로 */
const DYNAMIC_ALLOWED = ['/admin'];

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

function toRoute(file) {
  const relative = path.relative(APP_DIR, file).replace(/\\/g, '/');
  if (!relative.endsWith('.html')) return null;
  const withoutExt = relative.slice(0, -'.html'.length);
  if (withoutExt.startsWith('_')) return null;
  return `/${withoutExt}`;
}

function extractHrefs(html) {
  const hrefs = new Set();
  const regex = /href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) hrefs.add(match[1]);
  return [...hrefs];
}

function countMatches(html, regex) {
  return (html.match(regex) ?? []).length;
}

async function main() {
  const files = (await walk(APP_DIR)).filter((file) => file.endsWith('.html'));
  if (files.length === 0) {
    console.error('빌드 결과가 없습니다. 먼저 `npm run build`를 실행하세요.');
    process.exit(1);
  }

  const routes = new Set();
  for (const file of files) {
    const route = toRoute(file);
    if (route) routes.add(route);
  }

  const problems = [];
  let checkedLinks = 0;
  const inbound = new Map();
  const alternatesByRoute = new Map();
  const publicRoutes = new Set([...routes].filter((route) => /^\/(ko|en|ja)(\/|$)/.test(route)));

  for (const file of files) {
    const route = toRoute(file);
    if (!route) continue;
    const html = await readFile(file, 'utf8');

    // 1) 내부 링크
    for (const href of extractHrefs(html)) {
      if (IGNORED_PREFIXES.some((prefix) => href.startsWith(prefix))) continue;
      if (!href.startsWith('/')) continue;
      const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
      if (DYNAMIC_ALLOWED.some((prefix) => clean.startsWith(prefix))) continue;
      checkedLinks += 1;
      if (!routes.has(clean)) {
        problems.push(`깨진 링크: ${route} → ${href}`);
      } else if (route !== clean && publicRoutes.has(route) && publicRoutes.has(clean)) {
        inbound.set(clean, (inbound.get(clean) ?? 0) + 1);
      }
    }

    // 2) H1 개수
    const h1Count = countMatches(html, /<h1[\s>]/g);
    if (h1Count !== 1) problems.push(`H1 개수 이상(${h1Count}): ${route}`);

    // 3) 필수 메타데이터
    if (!html.includes('rel="canonical"')) problems.push(`canonical 없음: ${route}`);
    if (!/hrefLang="x-default"|hreflang="x-default"/i.test(html)) {
      problems.push(`hreflang x-default 없음: ${route}`);
    }
    if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`title 없음: ${route}`);
    if (!/name="description"/.test(html)) problems.push(`description 없음: ${route}`);

    if (publicRoutes.has(route)) {
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      if (canonical && new URL(canonical[1]).pathname.replace(/\/$/, '') !== route) {
        problems.push(`self canonical 불일치: ${route} → ${canonical[1]}`);
      }
      if (/<meta[^>]+name="(?:robots|googlebot)"[^>]+content="[^"]*noindex/i.test(html)) {
        problems.push(`공개 URL에 noindex: ${route}`);
      }
      const alternates = new Map();
      for (const match of html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)) {
        alternates.set(match[1], new URL(match[2]).pathname.replace(/\/$/, ''));
      }
      alternatesByRoute.set(route, alternates);
    }
  }

  const sitemapXml = await readFile(path.join(APP_DIR, 'sitemap.xml.body'), 'utf8');
  const sitemapRoutes = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname.replace(/\/$/, '')));
  for (const route of publicRoutes) {
    if (!sitemapRoutes.has(route)) problems.push(`사이트맵에서 빠진 공개 URL: ${route}`);
    if (!inbound.has(route)) problems.push(`내부 유입 링크가 없는 공개 URL: ${route}`);
    const sourceLocale = route.split('/')[1];
    for (const [locale, target] of alternatesByRoute.get(route) ?? []) {
      if (locale === 'x-default') continue;
      if (!publicRoutes.has(target)) problems.push(`hreflang 대상 없음: ${route} → ${target}`);
      else if (alternatesByRoute.get(target)?.get(sourceLocale) !== route) {
        problems.push(`hreflang 상호 연결 불일치: ${route} ↔ ${target}`);
      }
    }
  }
  for (const route of sitemapRoutes) {
    if (!publicRoutes.has(route)) problems.push(`공개 HTML이 없는 사이트맵 URL: ${route}`);
  }

  // 4) 클라이언트 번들 비밀키 점검
  const secretPatterns = [
    ['SUPABASE_SERVICE_ROLE_KEY', /SUPABASE_SERVICE_ROLE_KEY/],
    ['ANTHROPIC_API_KEY', /ANTHROPIC_API_KEY/],
    ['CRON_SECRET', /CRON_SECRET/],
    ['GSC_SERVICE_ACCOUNT_JSON', /GSC_SERVICE_ACCOUNT_JSON/],
  ];
  const staticFiles = (await walk(STATIC_DIR)).filter((file) => file.endsWith('.js'));
  for (const file of staticFiles) {
    const code = await readFile(file, 'utf8');
    for (const [name, pattern] of secretPatterns) {
      if (pattern.test(code)) {
        problems.push(`클라이언트 번들에 비밀키 참조: ${name} (${path.basename(file)})`);
      }
    }
  }

  const stats = await stat(APP_DIR);
  console.log(`검사 대상: HTML ${files.length}개, 라우트 ${routes.size}개, 내부 링크 ${checkedLinks}건`);
  console.log(`클라이언트 JS ${staticFiles.length}개 검사`);
  console.log(`빌드 시각: ${stats.mtime.toISOString()}`);

  if (problems.length > 0) {
    console.error(`\n문제 ${problems.length}건:`);
    for (const problem of [...new Set(problems)]) console.error(` - ${problem}`);
    process.exit(1);
  }

  console.log('\n문제 없음: 깨진 링크 0, H1 1개, 메타데이터 정상, 비밀키 노출 없음');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
