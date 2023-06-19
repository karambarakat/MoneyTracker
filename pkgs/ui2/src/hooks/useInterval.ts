import { useEffect } from 'react'
import { useInterval as mantineInterval } from '@mantine/hooks'

/**
 * extending mantine's useInterval hook to include auto start like the useTimeout hook
 */
export default function useInterval(
  fn: Parameters<typeof mantineInterval>[0],
  interval: Parameters<typeof mantineInterval>[1],
  opt?: { autoStart?: boolean },
) {
  const return_ = mantineInterval(fn, interval)

  useEffect(() => {
    if (!opt?.autoStart) return void 0
    return_.start()
    return () => return_.stop()
  }, [])

  return return_
}
