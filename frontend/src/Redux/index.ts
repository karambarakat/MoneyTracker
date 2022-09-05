import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  combineReducers,
} from 'redux'
import { save, load } from 'redux-localstorage-simple'
import logReducer from './reducers/logReducer'
import metaReducer from './reducers/metaReducer'
import userReducer from './reducers/userReducer'

const initialState = {
  ...load({ namespace: 'VITE_REDUX_', states: ['user'] }),
}

const middleware: Middleware[] = [
  save({ namespace: 'VITE_REDUX_', states: ['user'] }),
]

const rootReducer = combineReducers({
  user: userReducer,
  logs: logReducer,
  meta: metaReducer,
})

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
