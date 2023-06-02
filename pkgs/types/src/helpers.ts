/**
 * helper function to override properties that have different values in different contexts
 * ex: log.category maybe string before population and of type Cat after population
 */
export type Override<A, B extends Partial<A>> = {
  [K in keyof A]: B[K] extends A[K] ? B[K] : A[K]
}

/**
 * exclude any property that may have be of null type
 * ex: ExcludeNull<{a: number, b: boolean | null}> === {a: number}
 */
export type ExcludeNull<I, T extends keyof I = keyof I> = Pick<
  I,
  T extends T ? (null extends I[T] ? never : T) : never
>
