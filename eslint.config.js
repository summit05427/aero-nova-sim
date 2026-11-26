import js from '@eslint/js';
import globals from 'globals';

// 仅做缺陷与明显问题的检查，不参与格式化（格式化交给 Prettier）
export default [
  { ignores: ['dist/**', 'node_modules/**', 'public/**', 'test-output/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-console': 'off',
    },
  },
  {
    files: ['tools/**/*.mjs', '*.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    // 这些脚本把回调注入浏览器上下文执行，因此同时需要浏览器全局
    files: ['tools/test-browser.mjs', 'tools/shot.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
];
