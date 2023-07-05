import {
  Context,
  ProviderExoticComponent,
  ProviderProps,
  createContext,
  useContext,
} from 'react'

type DefinedContext<T> =
  | {
      value: T
      defined: true
    }
  | {
      value: undefined
      defined: false
    }

export function createDefinedContext<T>() {
  const context = createContext<DefinedContext<T>>({
    value: undefined,
    defined: false,
  })

  return {
    ...context,
    Provider: (({ value, ...props }: ProviderProps<T>) => {
      return <context.Provider value={{ defined: true, value }} {...props} />
    }) as ProviderExoticComponent<ProviderProps<T>>,
  }
}

export function useDefinedContext<T>(
  ctx: Omit<Context<DefinedContext<T>>, 'Provider'>,
) {
  const context = useContext(ctx as Context<DefinedContext<T>>)

  if (context.defined) return context.value

  throw new Error('undefined context, use inside a Provider')
}
