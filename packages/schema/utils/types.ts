export type filter<F> = F extends (...args: any[]) => any ? F : never
