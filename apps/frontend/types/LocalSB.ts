import { queryKeys } from '../src/api'

export interface Parameter {
  query?: { data?: Array<{ key: queryKeys; data: any }> }
}
