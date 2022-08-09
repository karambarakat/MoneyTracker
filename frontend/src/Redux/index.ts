import { createStore, applyMiddleware, compose, Middleware } from "redux";
import rootReducer from "./reducers";
import { save, load } from "redux-localstorage-simple";

const initialState = {
  ...load({ namespace: "VITE_REDUX_", states: ["user"] }),
};

const middleware: Middleware[] = [
  save({ namespace: "VITE_REDUX_", states: ["user"] }),
];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
