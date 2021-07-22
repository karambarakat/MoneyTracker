import store from "../reduxStore";
import { v4 as uuid } from "uuid";

console.log(`store`, store);

const dispatchRegistory = (setHolder) => (actionObj) => {
  setHolder(actionObj);
  store.dispatch(actionObj);
};

const someAsyncFn = (thunkAction) =>
  new Promise((resolve, reject) => {
    const httpId = uuid();
    var holder = {};
    const setHolder = (val) => (holder = val);
    store.dispatch({
      type: "http/request",
      httpId,
    });

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
        console.log("error");
        store.dispatch({
          type: "http/error",
          httpId,
          error,
        });
        reject(error);
      });
  });

const exported = async (thunkAction) => {
  try {
    const done = await someAsyncFn(thunkAction);
    return [done, null];
  } catch (error) {
    return [null, error];
  }
};

export default exported;
