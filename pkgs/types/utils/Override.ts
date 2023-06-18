/**
 * helper function to override properties that have different values in different contexts
 * ex: log.category maybe string before population and of type Cat after population
 */
export type Override<A, B extends Partial<Record<keyof A, unknown>>> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K]
}
