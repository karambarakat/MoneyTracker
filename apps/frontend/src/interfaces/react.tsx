import { ComponentType } from 'react'

/**
 * @deprecated dead code; remove when done refactoring the code
 */
export type lazyLoadingFunction = () => Promise<{
  default: ComponentType<any>
}>
