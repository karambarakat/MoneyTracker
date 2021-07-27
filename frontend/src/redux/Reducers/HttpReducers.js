export const httpReducer = (state = {}, action) => {
  const { httpId, meta, error, action: actionAssociated } = action;

  //if there is no object for this request create one
  if (httpId && !state[httpId]) state[httpId] = {};

  switch (action.type) {
    //http ready status
    case "http/request":
      state[httpId].readyState = "request";
      state[httpId].meta = meta;
      return { ...state };

    case "http/seccess":
      state[httpId].readyState = "success";
      state[httpId].action = actionAssociated;
      return { ...state };

    case "http/error":
      state[httpId].readyState = "error";
      state[httpId].error = error;
      return { ...state };

    //when unmounting the elemnt
    case "http/clean":
      delete state[httpId];
      return { ...state };

    default:
      return state;
  }
};
