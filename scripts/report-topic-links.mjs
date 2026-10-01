#!/usr/bin/env node
/** 생활백과→계산기 추천 선언을 사람이 검토할 수 있는 목록으로 만든다. 의미적 관련성은 자동 판정하지 않는다. */
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const locales = ['ko', 'en', 'ja'];

function listField(code, field) {
  const text = code.match(new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`))?.[1] ?? '';
  return [...text.matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

async function readMetas(kind) {
  const dir = path.join(root, 'src', kind);
  const names = await readdir(dir, { withFileTypes: true });
  const rows = [];
  for (const name of names) {
    if (!name.isDirectory()) continue;
    const code = await readFile(path.join(dir, name.name, kind === 'life' ? 'meta.ts' : 'definition.ts'), 'utf8');
    rows.push({
      slug: code.match(/slug:\s*'([^']+)'/)?.[1] ?? name.name,
      locales: listField(code, 'locales'),
      relatedTools: kind === 'life' ? listField(code, 'relatedTools') : [],
    });
  }
  return rows;
}

async function main() {
  const life = await readMetas('life');
  const tools = await readMetas('tools');
  const toolLocales = new Map(tools.map((tool) => [tool.slug, tool.locales]));
  const edges = [];
  for (const article of life) {
    for (const tool of article.relatedTools) {
      for (const locale of article.locales) {
        edges.push({ article: article.slug, tool, locale, rendered: toolLocales.get(tool)?.includes(locale) ?? false });
      }
    }
  }
  const out = path.join(root, '.next', 'topic-link-report.json');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), edges }, null, 2), 'utf8');
  const counts = Object.fromEntries(locales.map((locale) => [locale, edges.filter((edge) => edge.locale === locale && edge.rendered).length]));
  console.log(`생활백과→계산기 주제 연결: 실제 표시 ${JSON.stringify(counts)} / 언어 불일치로 표시되지 않음 ${edges.filter((edge) => !edge.rendered).length}개`);
  console.log(`쌍별 검토 목록: ${path.relative(root, out).replace(/\\/g, '/')}`);
  if (edges.some((edge) => !toolLocales.has(edge.tool))) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
