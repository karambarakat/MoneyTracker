import store from "../reduxStore";

export default async (action, selector, endpoint) => {
  try {
    // store.dispatch({
    //   type: "http/laoding",
    //   httpId: endpoint,
    // });

    const oldDispatch = await action();

    let _id = oldDispatch.payload._id || oldDispatch.payload;
    endpoint = `${oldDispatch.type} -- ${_id}`;

    store.dispatch(oldDispatch);

    store.dispatch({
      type: "http/seccess",
      httpId: endpoint,
    });

    return selector ? selector(store.getState()) : null;
  } catch (error) {
    console.log("error", error);
    store.dispatch({
      type: "http/error",
      httpId: endpoint,
    });

    return error;
  }
};

//   async (dispatch, state) => {
//   try {
//     dispatch({
//       type: "http/laoding",
//       endpoint,
//     });

//     await action()(dispatch, state);

//     dispatch({
//       type: "http/seccess",
//       endpoint,
//     });
//   } catch (error) {
//     console.log("error");
//     dispatch({
//       type: "http/error",
//       endpoint,
//     });
//   }
// });
