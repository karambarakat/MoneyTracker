/**
 * @file workarounds for twin.macro plugins
 * for now using tailwindcss plugin is not working in twin.macro,
 * this is css-in-js workaround
 * plugin I wanted to implement:
 * ```js
 *    function (
 *      { addVariant },
 *    ) {
 *      addVariant('child', '&>*')
 *      addVariant('last-child', '&>*:last-child')
 *      addVariant('first-child', '&>*:first-child')
 *    },
 * ```
 */

import { TwStyle, css } from 'twin.macro'
import { SerializedStyles } from '@emotion/react'

export function child(tw: TwStyle): SerializedStyles {
  return css`
    & > * {
      ${tw}
    }
  `
}

export function lastChild(tw: TwStyle): SerializedStyles {
  return css`
    & > *:last-child {
      ${tw}
    }
  `
}

export function firstChild(tw: TwStyle): SerializedStyles {
  return css`
    & > *:first-child {
      ${tw}
    }
  `
}
