import { TransitionStyles } from '../transition'

export const fade_from_right: TransitionStyles = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(100%)' },
  common: {},
  transitionProperty: 'opacity, transform',
}

export const fade_from_bottom: TransitionStyles = {
  in: { opacity: 1 },
  out: { opacity: 0 },
  common: {},
  transitionProperty: 'opacity',
}
