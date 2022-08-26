// / <reference  types="history"/>

// import * as history from "history"
// import type { Location } from 'history'

declare module 'history' {
  interface Location {
    hash: string
    key: string
    pathname: string
    search: string
    state: {
      backgroundLocation?: Location
      from: Location
    } | null
  }
}
