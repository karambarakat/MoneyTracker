import { colors, spacing } from './src/utils/tw'

export const darkMode = 'class'

/** @type {import('tailwindcss').Config} */
export const theme = {
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
  plugins: [
    function (
      /** @type {import('tailwindcss/types/config').PluginAPI} */
      { addVariant },
    ) {
      addVariant('child', '&>*')
      addVariant('last-child', '&>*:last-child')
      addVariant('first-child', '&>*:first-child')
    },
  ],
}

export const plugins = []
