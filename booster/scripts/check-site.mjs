/**
 * 빌드 산출물 검사 — 배포 환경별로 실행한다.
 *   node scripts/check-site.mjs --expect=production
 *   node scripts/check-site.mjs --expect=preview
 *
 * 검사 항목
 *  - 공개 페이지 전부 생성됐는가, 404 페이지가 있는가
 *  - 페이지마다 <title>·description 이 있고 title 이 고유한가, H1 이 정확히 1개인가
 *  - canonical / og:url 이 정식 호스트(https://booster.eolmaji.com)의 후행 슬래시 주소인가
 *  - production: 공개 페이지에 noindex 가 없다 / preview: 모든 페이지에 noindex 가 있다
 *  - robots.txt 가 환경에 맞고, production 이면 사이트맵 주소를 가리키는가
 *  - 사이트맵이 공개 페이지와 정확히 일치하고 lastmod 가 있는가
 *  - 내부 링크가 전부 실제 페이지로 가는가
 *  - 공개 화면에 '0원' 'TODO' 'localhost' 'undefined' 같은 금지 문자열이 없는가
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const PRODUCTION_URL = 'https://booster.eolmaji.com';
const PUBLIC_PATHS = [
  '/',
  '/features/',
  '/pricing/',
  '/guide/',
  '/guide/getting-started/',
  '/guide/lifetime-vs-ai/',
  '/faq/',
  '/contact/',
];
const FORBIDDEN_TEXT = ['0원', 'TODO', 'localhost', 'undefined', 'vercel.app', 'eolmaji.com/ko'];

const expect = (process.argv.find((a) => a.startsWith('--expect=')) ?? '--expect=production').split('=')[1];
if (expect !== 'production' && expect !== 'preview') {
  console.error('사용법: --expect=production | --expect=preview');
  process.exit(2);
}

const appDir = join(process.cwd(), '.next', 'server', 'app');
if (!existsSync(appDir)) {
  console.error('.next/server/app 이 없습니다. 먼저 next build 를 실행하세요.');
  process.exit(2);
}

const errors = [];
const fail = (msg) => errors.push(msg);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** 파일 경로 → 공개 URL 경로 ('/features/'). index.html → '/'. */
function toPath(file) {
  const rel = relative(appDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel === '_not-found.html') return null; // 404 페이지
  if (rel.startsWith('_')) return null; // _global-error.html 등 Next 내부 산출물
  const m = rel.match(/^(.*)\.html$/);
  if (!m) return null;
  return `/${m[1]}/`;
}

const htmlFiles = walk(appDir).filter((f) => f.endsWith('.html'));
const pages = new Map(); // path → html
let notFoundHtml = null;
for (const file of htmlFiles) {
  const rel = relative(appDir, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  if (rel === '_not-found.html') {
    notFoundHtml = html;
    continue;
  }
  if (rel.startsWith('_')) continue; // Next 내부 산출물은 검사 대상이 아니다
  const path = toPath(file);
  if (path) pages.set(path, html);
}

// 1) 페이지 존재
for (const path of PUBLIC_PATHS) {
  if (!pages.has(path)) fail(`공개 페이지가 생성되지 않음: ${path}`);
}
for (const path of pages.keys()) {
  if (!PUBLIC_PATHS.includes(path)) fail(`예상 밖의 페이지가 생성됨: ${path}`);
}
if (!notFoundHtml) fail('404 페이지(_not-found.html)가 없음');
else if (!/찾을 수 없습니다/.test(notFoundHtml)) fail('404 페이지 본문이 비어 있음');

// 2) 페이지별 메타·구조
const titles = new Map();
const attr = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};
for (const [path, html] of pages) {
  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) fail(`${path}: <title> 없음`);
  else {
    if (titles.has(title)) fail(`${path}: title 중복 (${titles.get(title)} 와 동일: "${title}")`);
    titles.set(title, path);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${path}: meta description 없음`);
  if (!/<html lang="ko"/.test(html)) fail(`${path}: <html lang="ko"> 아님`);

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) fail(`${path}: H1 이 ${h1Count}개`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const expectedCanonical = `${PRODUCTION_URL}${path}`;
  if (canonical !== expectedCanonical) fail(`${path}: canonical 불일치 → ${canonical} (기대 ${expectedCanonical})`);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
  if (ogUrl !== expectedCanonical) fail(`${path}: og:url 불일치 → ${ogUrl}`);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]+)"/);
  if (!ogImage || !ogImage.startsWith(`${PRODUCTION_URL}/opengraph-image`)) fail(`${path}: og:image 호스트 불일치 → ${ogImage}`);

  const hasNoindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (expect === 'production' && hasNoindex) fail(`${path}: 운영 빌드인데 noindex 가 있음`);
  if (expect === 'preview' && !hasNoindex) fail(`${path}: 미리보기 빌드인데 noindex 가 없음`);

  // 화면 텍스트만 검사 (스크립트·속성 제외)
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const bad of FORBIDDEN_TEXT) {
    if (text.includes(bad)) fail(`${path}: 화면 텍스트에 금지 문자열 "${bad}"`);
  }

  // 내부 링크
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const href = m[1];
    if (href.startsWith('/_next/') || href === '/opengraph-image' || href === '/icon' || href.startsWith('/icon?') || href.startsWith('/opengraph-image?')) continue;
    if (href === '/sitemap.xml' || href === '/robots.txt') continue;
    const normalized = href.endsWith('/') ? href : `${href}/`;
    if (!PUBLIC_PATHS.includes(normalized)) fail(`${path}: 내부 링크가 페이지로 이어지지 않음 → ${href}`);
  }
}

// 3) robots.txt
const robotsFile = join(appDir, 'robots.txt.body');
if (!existsSync(robotsFile)) fail('robots.txt 산출물 없음');
else {
  const robots = readFileSync(robotsFile, 'utf8');
  if (expect === 'production') {
    if (!/Allow: \//.test(robots)) fail('운영 robots.txt 에 Allow: / 없음');
    if (/Disallow: \/\s*$/m.test(robots)) fail('운영 robots.txt 가 전체 차단');
    if (!robots.includes(`Sitemap: ${PRODUCTION_URL}/sitemap.xml`)) fail('운영 robots.txt 의 사이트맵 주소 불일치');
  } else if (!/Disallow: \/\s*$/m.test(robots)) fail('미리보기 robots.txt 가 전체 차단이 아님');
}

// 4) sitemap.xml (production 기준으로 항상 검사 — 주소는 상수라 환경과 무관)
const sitemapFile = join(appDir, 'sitemap.xml.body');
if (!existsSync(sitemapFile)) fail('sitemap.xml 산출물 없음');
else {
  const xml = readFileSync(sitemapFile, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = PUBLIC_PATHS.map((p) => `${PRODUCTION_URL}${p}`);
  for (const u of expected) if (!locs.includes(u)) fail(`사이트맵에 누락: ${u}`);
  for (const u of locs) if (!expected.includes(u)) fail(`사이트맵에 예상 밖 URL: ${u}`);
  const lastmods = (xml.match(/<lastmod>/g) ?? []).length;
  if (lastmods !== locs.length) fail(`사이트맵 lastmod 누락 (${lastmods}/${locs.length})`);
}

console.log(`검사 대상: 페이지 ${pages.size}개 (+404), 기대 환경: ${expect}`);
if (errors.length) {
  console.error(`\n문제 ${errors.length}건:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('문제 없음: 페이지·메타·canonical·robots·사이트맵·내부 링크·금지 문자열 검사 통과');
