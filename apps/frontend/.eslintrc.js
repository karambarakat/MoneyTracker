/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    serviceworker: true,
  },
  root: true,
  extends: [
    'localrepo',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    '@tanstack/query/exhaustive-deps': 'off',
  },
}
