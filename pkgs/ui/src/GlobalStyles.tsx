// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

// src/styles/GlobalStyles.tsx
import { Global } from '@emotion/react'
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    ...tw`bg-slate-50`,
  },
  '.dark body': {
    ...tw`bg-slate-700 text-white`,
  },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
