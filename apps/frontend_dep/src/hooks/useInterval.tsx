import { useEffect, useState } from 'react'
import { useInterval as mantineInterval } from '@mantine/hooks'

export default function useInterval<T>(
  fn: (arg: T) => T,
  interval: number,
  initialVal: T,
) {
  const [state, setState] = useState<T>(initialVal)
  const rti = mantineInterval(() => setState(fn), interval || 2000)
  useEffect(() => {
    rti.start()
    return rti.stop
  }, [])

  return [state, rti]
}
