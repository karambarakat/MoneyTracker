import { ReactNode } from 'react'

interface Props {
  obj: any
  children: ReactNode
}

function CssVars({ obj, children }: Props) {
  const styles = Object.keys(obj)
    .map((key) => ({
      key: '--' + key,
      val: obj[key],
    }))
    .reduce((acc: any, obj) => {
      acc[obj.key] = obj.val
      return acc
    }, {})

  return <div style={styles}>{children}</div>
}

export default CssVars
