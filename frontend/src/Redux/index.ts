import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  combineReducers,
  Reducer,
} from 'redux'
import { save, load } from 'redux-localstorage-simple'
import ClearDataMiddleware from './extra/clearData'
import LoggerMiddleware from './extra/LoggerMiddleware'
import myThunk from './extra/myThunk'
import categoryReducer from './reducers/categoryReducer'
import logReducer from './reducers/logReducer'
import metaReducer from './reducers/metaReducer'
import userReducer from './reducers/userReducer'
import { Actions, RootState } from './types'

const initialState = {
  ...load({ namespace: 'VITE_REDUX_', states: ['user'] }),
}

const middleware: Middleware[] = [
  myThunk,
  save({ namespace: 'VITE_REDUX_', states: ['user'] }),
  ClearDataMiddleware,
  LoggerMiddleware,
]

// @ts-ignore
const rootReducer: Reducer<RootState, Actions> = combineReducers({
  user: userReducer,
  logs: logReducer,
  categories: categoryReducer,
  meta: metaReducer,
})

export const store = createStore(
  rootReducer,
  // @ts-ignore
  initialState,
  compose(
    applyMiddleware(...middleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
