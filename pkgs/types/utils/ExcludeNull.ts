/**
 * exclude any property that may have be of null type
 * ex: ExcludeNull<{a: number, b: boolean | null}> === {a: number}
 */
export type ExcludeNull<I, T extends keyof I = keyof I> = Pick<
  I,
  T extends T ? (null extends I[T] ? never : T) : never
>
