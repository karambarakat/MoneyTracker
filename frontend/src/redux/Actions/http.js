import store from "../reduxStore";
import { v4 as uuid } from "uuid";

const dispatchRegistory = (setHolder) => (actionObj) => {
  setHolder(actionObj);
  store.dispatch(actionObj);
};

const someAsyncFn = (thunkAction, httpId) => {
  return new Promise((resolve, reject) => {
    var holder = {};
    const setHolder = (val) => (holder = val);

    thunkAction(dispatchRegistory(setHolder), store.getState)
      .then((data) => {
        store.dispatch({
          type: "http/seccess",
          httpId,
          action: holder,
        });
        resolve(data);
      })
      .catch((error) => {
        console.log("error", error);
        store.dispatch({
          type: "http/error",
          httpId,
          error,
        });
        reject(error);
      });
  });
};

const exported = async (thunkAction, id) => {
  const httpId = id || uuid();
  store.dispatch({
    type: "http/request",
    httpId,
  });

  try {
    const done = await someAsyncFn(thunkAction, httpId);
    return [done, null];
  } catch (error) {
    return [null, error];
  }
};

export default exported;
