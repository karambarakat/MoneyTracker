import { Middleware } from 'redux'
import { Actions } from '../types'

/**
 * provide reducer with the ability of delete all data
 * any reducer can call `action.clearData`
 * this will trigger another actin with `CLEAR_ALL` type when current action completes
 * other reducers have to apply the deleting logic by listening to `CLEAR_ALL` action type
 */
const ClearDataMiddleware: Middleware = (store) => (next) => (action) => {
  let dispatchClearAllAction = false

  function dispatchExtra() {
    if (action.type === 'CLEAR_ALL') return //prevent infinite loops

    if (dispatchClearAllAction) {
      store.dispatch({ type: 'CLEAR_ALL' })
    }
  }

  const actionWithClearData = Object.assign({}, action, {
    fn: {
      clearData: () => {
        dispatchClearAllAction = true
      },
    },
  })

  const res = next(actionWithClearData)

  dispatchExtra()

  return res
}

export type ExtraActionsTypes = {
  type: 'CLEAR_ALL'
}

export type ActionClearAll = {
  clearData(): void
}

export default ClearDataMiddleware
