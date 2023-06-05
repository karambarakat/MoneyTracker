/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('ui/tailwind.config.js'),
  content: ['./src/**/*.stories.@(js|jsx|ts|tsx|mdx)']
}
