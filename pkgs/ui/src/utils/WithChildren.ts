export type WithChildren<T extends object | '_empty' = '_empty'> =
  T extends '_empty'
    ? { children?: React.ReactNode }
    : { children?: React.ReactNode } & T

export type WithAsChild<T extends object | '_empty' = '_empty'> =
  T extends '_empty'
    ? { children?: React.ReactNode; asChild?: boolean }
    : { children?: React.ReactNode; asChild?: boolean } & T
