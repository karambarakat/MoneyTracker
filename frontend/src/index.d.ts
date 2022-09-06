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
      from?: Location
    } | null
  }
}

declare type ColorScheme = 'l' | 'i'
