const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "user/login":
      return payload;
    case "user/logout":
      return {};

    default:
      return state;
  }
};
