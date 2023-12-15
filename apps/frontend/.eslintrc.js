/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    serviceworker: true,
  },
  root: true,
  extends: [
    'custom',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    '@tanstack/query/exhaustive-deps': 'off',
  },
}
