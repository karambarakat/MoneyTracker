import { createContext, useContext } from 'react'
import { WithChildren } from './WithChildren'

type DefinedContextType<T> =
  | {
      value: T
      defined: true
    }
  | {
      value: undefined
      defined: false
    }

export class DefinedContext<T> {
  _context = createContext<DefinedContextType<T>>({
    value: undefined,
    defined: false,
  })

  Provider = ({ value, ...p }: WithChildren<{ value: T }>) => {
    return (
      <this._context.Provider
        value={{
          defined: true,
          value: value,
        }}
        {...p}
      />
    )
  }

  use() {
    const context = useContext(this._context)

    if (context.defined) return context.value

    throw new Error('undefined context, use inside a Provider')
  }
}
