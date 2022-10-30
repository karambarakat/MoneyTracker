import { notification, pushNotification } from '@myHooks/notifications'
import { actions } from './actions/types'
import { store } from './index'
import { ActionsObjects, dispatchFunction, RootState } from './types'

export type ReduxFns = {
  dispatch: (obj: ActionsObjects) => void
  state: () => RootState
}
export type HelpersFns<R> = {
  pushNoti: (noti: notification) => void
  offline: () => void
  online: (
    callBack: (helpers: { token: () => string }) => Promise<Response>
  ) => Promise<R>
}

export type actionModule<
  A extends { type: string; return: unknown; payload: unknown } = any,
  R = A['return'],
  P = A['payload']
> = ((args: P, reduxFns: ReduxFns, myFns: HelpersFns<R>) => Promise<R>) & {
  type: string
}

/**
 *  import all action and throw error if there is any typing error or duplicate names
 */
const modules = Object.entries(
  import.meta.globEager('./actions/**/*.action.ts(x)?')
)
  .map(([fileName, module]) => {
    const moduleName = fileName.slice(2, -3)
    const defaultFn = module.default as actionModule

    if (!defaultFn) {
      throw new Error(`no default export in a the action \`${moduleName}\``)
    }

    if (!Object.prototype.toString.call(defaultFn).includes('AsyncFunction')) {
      throw new Error(`actions is not an async function \`${moduleName}\``)
    }

    if (!defaultFn.type) {
      throw new Error(`actions has no type \`${moduleName}\``)
    }

    return [moduleName, defaultFn] as [string, actionModule]
  })
  .reduce<Record<string, actionModule>>((acc, [name, module]) => {
    if (module.type in acc) {
      throw new Error(`duplicate names \`${module.type}\` \`${name}\``)
    }
    acc[module.type] = module
    return acc
  }, {})

/*
Syntactically Sugar To Invoke Actions:
ex: to invoke action with this typing:

  type ActionType = {
    type: "action:fire"
    return: string

    payload: {
    input: number
  }

you can invoke this action by:

dispatch('action:fire', 100) // returns Promise<'100'>

**/
const dispatch = async function <
  S extends actions['type'],
  P extends actions['payload'] = Extract<actions, { type: S }>['payload'],
  R extends actions['return'] = Extract<actions, { type: S }>['return']
>(type: S, payload: P): Promise<R> {
  if (!(type in modules)) throw new Error("type doesn't exist")
  const module = modules[type]

  // @ts-ignore
  const result = await store.dispatch<dispatchFunction>((redux, helpers) =>
    // @ts-ignore
    module(payload, redux, helpers)
  )
  // @ts-ignore
  return result
}

export default dispatch

export type dispatchSugarFunction = typeof dispatch

type dispatchFnToTupleType = (
  cb: (d: dispatchSugarFunction) => void
) => dispatchTupleArg

// this is to provide better developer experience
export const dispatchFnToTuple: dispatchFnToTupleType = (cb) => {
  let rt: dispatchTupleArg
  // @ts-ignore
  cb((...args) => {
    rt = args
  })
  // @ts-ignore
  return rt
}

export const dispatchTuple = function (tuple: dispatchTupleArg) {
  // @ts-ignore
  return dispatch(...tuple)
}

export type dispatchTupleArg = [string, any]
