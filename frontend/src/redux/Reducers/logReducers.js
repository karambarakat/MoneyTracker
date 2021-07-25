const isEmpty = (state) =>
  !state ||
  (Object.prototype.toString.call(state) === "[object Array]" &&
    state.length === 0) ||
  Object.keys(state).length === 0;

export const logsReducer = function (state = [], action) {
  const _id = action.payload?._id;
  state = state || [];
  switch (action.type) {
    case "log/add":
      return [...state, ...action.payload];

    case "log/delete":
      return state.filter((e) => e._id != _id);

    case "log/update":
      return state.map((e) => (e._id == _id ? action.payload : e));

    case "log/updateOrAdd":
      let isExist = false;
      const newList = state.map((e) => {
        if (e._id == _id) {
          isExist = true;
          return action.payload;
        } else {
          return e;
        }
      });
      if (!isExist) newList.push(action.payload);
      return newList;

    case "log/replace":
      return action.payload;

    default:
      //if the state is empty (i.e. undefined, null, [], {}) return zero
      if (isEmpty(state)) {
        return "";
      } else {
        return state;
      }
  }
};
