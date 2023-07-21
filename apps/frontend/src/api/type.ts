import * as all_apis from './index'

export type apis<T extends keyof typeof all_apis = keyof typeof all_apis> = [
  T,
  ...Parameters<(typeof all_apis)[T]>,
]
