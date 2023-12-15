// types/twin.d.ts
import 'twin.macro'
import { SerializedStyles, css as cssImport } from '@emotion/react'
import styledImport from '@emotion/styled'
// @ts-ignore
import { CSSInterpolation } from '@emotion/serialize'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport

  type stylable = SerializedStyles | TwStyle
}

declare module 'react' {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string
    css?: CSSInterpolation
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      tw?: string
      css?: CSSInterpolation
    }
  }
}
