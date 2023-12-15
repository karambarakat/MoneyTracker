import { useHover } from '@mantine/hooks'
import { useEffect, useState } from 'react'

export default function useHoverInOut(
  timeOut: number,
  action?: (InOrOut: 'in' | 'out') => void,
) {
  const { hovered, ref } = useHover()
  const [state, setState] = useState<'in' | 'out'>('out')
  useEffect(() => {
    let to_in: NodeJS.Timeout
    let to_out: NodeJS.Timeout
    if (hovered) {
      // @ts-ignore
      clearTimeout(to_out)
      to_in = setTimeout(() => {
        action?.('in')
        setState('in')
      }, timeOut)
    } else {
      // @ts-ignore
      clearTimeout(to_in)
      to_out = setTimeout(() => {
        action?.('out')
        setState('out')
      }, timeOut)
    }
    return () => {
      clearTimeout(to_in)
      clearTimeout(to_out)
    }
  }, [hovered])

  return [state, ref]
}
