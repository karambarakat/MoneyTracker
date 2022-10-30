import { useMemo } from 'react'

export default (obj: Record<any, string>) => {
  return useMemo(
    () =>
      Object.keys(obj).reduce<Record<any, string>>((acc, key) => {
        acc['--' + key] = obj[key]
        return acc
      }, {}),
    [obj]
  )
}
