import React, { ReactNode } from 'react'
import useCSSVars from 'src/utils/useCSSVars'

interface Props {
  obj: Record<any, string>
  children?: ReactNode
  style?: React.CSSProperties
}

function CssVars({ obj, style, children }: Props) {
  const vars = useCSSVars(obj)

  return <div style={{ ...style, ...vars }}>{children}</div>
}

export default CssVars
