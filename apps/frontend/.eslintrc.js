/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'custom',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@tanstack/query'],
}
