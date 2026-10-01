#!/usr/bin/env node
/** 숫자·단위가 있으나 원문 링크가 없는 원고를 검토 후보로 보고한다. 내용의 진위를 자동 판정하지 않는다. */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const unitPattern = /\d+(?:[.,]\d+)?\s*(?:°C|℃|°F|분|시간|일|개월|년|mg|mL|kWh|원|%|minutes?|hours?|days?|weeks?|months?|years?|grams?|gallons?|tablespoons?|tbsp)/iu;

async function contentFiles(folder) {
  const base = path.join(root, 'src', folder);
  const dirs = await readdir(base, { withFileTypes: true });
  const paths = [];
  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    for (const name of await readdir(path.join(base, dir.name))) {
      if (/^content\.(ko|en|ja)\.ts$/.test(name)) paths.push(path.join(base, dir.name, name));
    }
  }
  return paths;
}

function propertyName(node) {
  return ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : '';
}

async function analyze(file) {
  const code = await readFile(file, 'utf8');
  const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const strings = [];
  const urls = [];
  let indirectSourceRefs = 0;
  let sourceNotes = 0;
  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) strings.push(node.text);
    if (ts.isPropertyAssignment(node) && propertyName(node) === 'sources' && ts.isArrayLiteralExpression(node.initializer)) {
      for (const entry of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(entry)) continue;
        const url = entry.properties.find((item) => ts.isPropertyAssignment(item) && propertyName(item) === 'url');
        if (url && ts.isPropertyAssignment(url)) {
          if (ts.isStringLiteral(url.initializer)) urls.push(url.initializer.text);
          else indirectSourceRefs += 1;
        } else sourceNotes += 1;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  const numericSnippets = strings.filter((value) => unitPattern.test(value)).map((value) => value.slice(0, 120));
  return {
    file: path.relative(root, file).replace(/\\/g, '/'),
    numericClaimCandidates: numericSnippets.length,
    examples: numericSnippets.slice(0, 3),
    linkedSources: urls,
    indirectSourceRefs,
    unlinkedCheckingNotes: sourceNotes,
    invalidSourceUrls: urls.filter((url) => !url.startsWith('https://')),
  };
}

async function main() {
  const files = [...await contentFiles('life'), ...await contentFiles('tools')];
  const rows = await Promise.all(files.map(analyze));
  const needsReview = rows.filter((row) => row.numericClaimCandidates > 0 && row.linkedSources.length + row.indirectSourceRefs === 0);
  const invalid = rows.filter((row) => row.invalidSourceUrls.length > 0);
  const out = path.join(root, '.next', 'source-gap-report.json');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2), 'utf8');
  console.log(`출처 검토: 원고 ${rows.length}개 / 단위·수치 후보가 있고 원문 링크 없는 원고 ${needsReview.length}개 / 변수로 연결한 출처 ${rows.reduce((sum, row) => sum + row.indirectSourceRefs, 0)}개 / 잘못된 직접 출처 URL ${invalid.length}개`);
  console.log('수치 탐지는 검토 후보만 추립니다. 링크가 있어도 모든 문장을 뒷받침한다는 뜻은 아닙니다.');
  console.log(`상세 목록: ${path.relative(root, out).replace(/\\/g, '/')}`);
  if (invalid.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
