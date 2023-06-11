/**
 * @license MIT
 * @author Vitaly Rtishchev <rtivital@gmail.com>
 * this code is taken from github.com/mantinedev/mantine with minimum editing
 * I don't want my package to depend on mantine/core but this set of functionality is very important
 * @see https://github.com/mantinedev/mantine/tree/master/src/mantine-core/src/Transition
 */

import React from 'react'
import { TransitionStyles, useTransition } from './use-transition'

export interface TransitionProps {
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

export type TransitionOverride = Partial<Omit<TransitionProps, 'mounted'>>

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

export function getTransitionStyles({
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
