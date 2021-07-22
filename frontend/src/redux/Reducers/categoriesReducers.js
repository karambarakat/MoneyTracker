export const categoriesReducer = function (state = [], action) {
  const _id = action.payload?.id;
  switch (action.type) {
    case "category/add":
      return [...state, ...action.payload];

    case "category/delete":
      return state.filter((e) => e._id != _id);

    case "category/update":
      return state.map((e) => (e._id == _id ? action.payload.category : e));

    case "category/replace":
      return action.payload;

    default:
      return state;
  }
};
