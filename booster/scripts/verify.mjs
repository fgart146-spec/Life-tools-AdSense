/**
 * 전체 검증: 타입검사 → 미리보기 빌드+검사(noindex 있어야 함) → 운영 빌드+검사(noindex 없어야 함).
 * 마지막이 운영 빌드라 로컬 .next 는 운영 상태로 남는다.
 */
import { spawnSync } from 'node:child_process';

function run(label, cmd, args, extraEnv = {}) {
  console.log(`\n=============== ${label} ===============`);
  // shell:true 에 args 배열을 넘기면 Node 가 DEP0190 경고를 낸다 — 한 문자열로 합쳐 넘긴다.
  const result = spawnSync([cmd, ...args].join(' '), {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...extraEnv },
  });
  if (result.status !== 0) {
    console.error(`\n${label} 실패 (exit ${result.status})`);
    process.exit(result.status ?? 1);
  }
}

run('typecheck', 'npx', ['tsc', '--noEmit']);
run('build (preview)', 'npx', ['next', 'build'], { SITE_ENV: 'preview' });
run('check (preview)', 'node', ['scripts/check-site.mjs', '--expect=preview']);
run('build (production)', 'npx', ['next', 'build'], { SITE_ENV: 'production' });
run('check (production)', 'node', ['scripts/check-site.mjs', '--expect=production']);
console.log('\n전체 검증 통과');
