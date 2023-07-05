import { Action, AnyAction, Reducer } from 'redux'

function invalidStateReducerEnhancer<
  S = any,
  A extends Action<any> = AnyAction,
>(
  reducer: Reducer<S, A>,
  condition: (state: S) => boolean,
  initialState: S,
): Reducer<S, A> {
  // return reducer
  return (state = initialState, action) => {
    const oldState = state
    const newState = reducer(state, action)
    if (newState !== oldState && !condition(newState)) {
      console.error(
        `Invalid State, the previous action ${action.type} didn't take place`,
      )
      return oldState
    }
    return newState
  }
}

export default invalidStateReducerEnhancer
