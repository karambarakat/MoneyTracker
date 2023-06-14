export type WithChildren<T extends object | 'empty' = 'empty'> =
  T extends 'empty'
    ? { children?: React.ReactNode }
    : { children?: React.ReactNode } & T
