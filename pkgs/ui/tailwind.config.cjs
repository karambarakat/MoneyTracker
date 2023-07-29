/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const { colors, spacing } = require('./src/utils/tw.cjs')

const darkMode = 'class'

/** @type {import('tailwindcss').Config} */
const theme = {
  colors: colors,
  spacing: spacing,
  screens: {
    // mobile-first
    sm: '640px',
    md: '768px',
    lg: '1024px',

    // desktop-first
    xs_max: { max: '639px' },
    sm_max: { max: '767px' },
    md_max: { max: '1023px' },

    // exact
    sm_exact: { min: '640px', max: '767px' },
    md_exact: { min: '768px', max: '1023px' },

    // other
    print: { raw: 'print' },
    portrait: { raw: '(orientation: portrait)' },
    landscape: { raw: '(orientation: landscape)' },
  },
  extend: {},
}

const plugins = []

module.exports = {
  darkMode,
  theme,
  plugins,
}
