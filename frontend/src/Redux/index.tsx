import { createStore, applyMiddleware, compose, Middleware } from 'redux'
import rootReducer from './reducers'

const initialState = {}

const middleware: Middleware[] = []

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
