/**
 * @license MIT
 * @author Vitaly Rtishchev <rtivital@gmail.com>
 * this code is taken from github.com/mantinedev/mantine with minimum editing
 * I don't want my package to depend on mantine/core but this set of functionality is very important
 * @see https://github.com/mantinedev/mantine/tree/master/src/mantine-core/src/Transition
 */

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDidUpdate } from '@mantine/hooks'
import usePreferReducedMotion from '../../utils/usePreferReducedMotion'

interface TransitionProps {
  /** If set element will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean

  /** Predefined transition name or transition styles */
  transition: TransitionStyles

  /** Transition duration in ms */
  duration?: number

  /** Exit transition duration in ms */
  exitDuration?: number

  /** Transition timing function, defaults to theme.transitionTimingFunction */
  timingFunction?: string

  /** When true, component will be mounted */
  mounted: boolean

  /** Render function with transition styles argument */
  children(styles: React.CSSProperties): React.ReactElement<any, any>

  /** Calls when exit transition ends */
  onExited?: () => void

  /** Calls when exit transition starts */
  onExit?: () => void

  /** Calls when enter transition starts */
  onEnter?: () => void

  /** Calls when enter transition ends */
  onEntered?: () => void
}

export interface TransitionStyles {
  common?: React.CSSProperties
  in: React.CSSProperties
  out: React.CSSProperties
  transitionProperty: React.CSSProperties['transitionProperty']
}

export function Transition({
  keepMounted,
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited,
}: TransitionProps) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } =
    useTransition({
      mounted,
      exitDuration,
      duration,
      timingFunction,
      onExit,
      onEntered,
      onEnter,
      onExited,
    })

  if (transitionDuration === 0) {
    return mounted ? (
      <>{children({})}</>
    ) : keepMounted ? (
      children({ display: 'none' })
    ) : null
  }

  return transitionStatus === 'exited' ? (
    keepMounted ? (
      children({ display: 'none' })
    ) : null
  ) : (
    <>
      {children(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: transitionStatus,
          timingFunction: transitionTimingFunction,
        }),
      )}
    </>
  )
}

// import { MantineTransition, transitions } from '../transitions';

const transitionStatuses = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  'pre-exiting': 'out',
  'pre-entering': 'out',
} as const

function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: TransitionStyles
  state: keyof typeof transitionStatuses
  duration: number
  timingFunction: React.CSSProperties['transitionTimingFunction']
}): React.CSSProperties {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  }

  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  }
}

type TransitionStatus =
  | 'entered'
  | 'exited'
  | 'entering'
  | 'exiting'
  | 'pre-exiting'
  | 'pre-entering'

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

function useTransition({
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
