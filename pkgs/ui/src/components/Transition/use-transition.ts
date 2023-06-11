import { useState, useEffect, useRef } from 'react'
import { useDidUpdate } from '@mantine/hooks'
import usePreferReducedMotion from '../../utils/usePreferReducedMotion'

export type TransitionStatus =
  | 'entered'
  | 'exited'
  | 'entering'
  | 'exiting'
  | 'pre-exiting'
  | 'pre-entering'

export interface TransitionStyles {
  common?: React.CSSProperties
  in: React.CSSProperties
  out: React.CSSProperties
  transitionProperty: React.CSSProperties['transitionProperty']
}

interface UseTransition {
  duration: number
  exitDuration: number
  timingFunction?: string
  mounted: boolean
  onEnter?(): void
  onExit?(): void
  onEntered?(): void
  onExited?(): void
}

const defaultTimingFunction = 'ease'

export function useTransition({
  duration,
  exitDuration,
  timingFunction = defaultTimingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited,
}: UseTransition) {
  const reduceMotion = usePreferReducedMotion()
  const [transitionDuration, setTransitionDuration] = useState(
    reduceMotion ? 0 : duration,
  )
  const [transitionStatus, setStatus] = useState<TransitionStatus>(
    mounted ? 'entered' : 'exited',
  )
  const timeoutRef = useRef<number>(-1)

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit
    const handler = shouldMount ? onEntered : onExited

    setStatus(shouldMount ? 'pre-entering' : 'pre-exiting')
    window.clearTimeout(timeoutRef.current)

    const newTransitionDuration = reduceMotion
      ? 0
      : shouldMount
      ? duration
      : exitDuration
    setTransitionDuration(newTransitionDuration)

    if (newTransitionDuration === 0) {
      typeof preHandler === 'function' && preHandler()
      typeof handler === 'function' && handler()
      setStatus(shouldMount ? 'entered' : 'exited')
    } else {
      const preStateTimeout = window.setTimeout(() => {
        typeof preHandler === 'function' && preHandler()
        setStatus(shouldMount ? 'entering' : 'exiting')
      }, 10)

      timeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(preStateTimeout)
        typeof handler === 'function' && handler()
        setStatus(shouldMount ? 'entered' : 'exited')
      }, newTransitionDuration)
    }
  }

  useDidUpdate(() => {
    handleStateChange(mounted)
  }, [mounted])

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || defaultTimingFunction,
  }
}

/**
 * removed code:
```ts
  // two responsibilities for the following code:
  // 1. handle reduced motion
  // 2. provide default timing function
  // return { ...stuff, transitionTimingFunction: timingFunction || theme.transitionTimingFunction}
  const theme = useMantineTheme();
```

'./get-transition-styles/get-transition-styles.ts':
1. a function that returns React.CSSProperties from built-in transitions or `MantineTransition`
```ts
  children(
    getTransitionStyles({
      transition,
      duration: ...,
      transitionStatus: ...,
      transitionTimingFunction: ...,
    })
  )

'./transition.ts':
1. provide interface `MantineTransition`
2. gives set of built-in transitions
 */
