import { QueryFunction, QueryFunctionContext } from '@tanstack/react-query'
import * as mutations from './mutations'
export { mutations }
import * as queries from './queries'
export { queries }

export type queryNames = keyof typeof queries

export type queryKeys<T extends queryNames = queryNames> = T extends queryNames
  ? (typeof queries)[T] extends (...args: infer A) => any
    ? [T, ...A]
    : never
  : never

// dead code?
// export type queryReturn<T extends queryNames> = T extends queryNames
//   ? ReturnType<(typeof queries)[T]> extends Promise<infer A>
//     ? A
//     : never
//   : never
