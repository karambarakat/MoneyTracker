import { combineReducers } from "redux";
import userReducer from "./userReducer";
import metaReducer from "./metaReducer";

const rootReducer = combineReducers({
  user: userReducer,
  meta: metaReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
