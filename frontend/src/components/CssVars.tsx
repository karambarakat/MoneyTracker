import { ReactNode } from 'react'

interface Props {
  obj: any
  children: ReactNode
}

function CssVars({ obj, children }: Props) {
  const styles = Object.keys(obj).reduce((acc: any, key) => {
    acc['--' + key] = obj[key]
    return acc
  }, {})

  return <div style={styles}>{children}</div>
}

export default CssVars
