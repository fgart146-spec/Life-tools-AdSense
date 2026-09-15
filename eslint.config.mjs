import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // booster/ 는 자체 설정을 가진 별도 앱이다 (booster.eolmaji.com).
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts', 'booster/**'],
  },
];

export default eslintConfig;
