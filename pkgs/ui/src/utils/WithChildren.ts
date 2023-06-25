export type WithChildren<T extends object | 'empty' = 'empty'> =
  T extends 'empty'
    ? { children?: React.ReactNode }
    : { children?: React.ReactNode } & T

export type WithAsChild<T extends object | 'empty' = 'empty'> =
  T extends 'empty'
    ? { children?: React.ReactNode; asChild?: boolean }
    : { children?: React.ReactNode; asChild?: boolean } & T
