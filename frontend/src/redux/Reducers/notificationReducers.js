const initialState = [];

/**
 * 1.listen to action with payload of 'hhtp/seccess'
 * 2.if action's type begins with "notification/":
 *      'notification/push' : payload is Object that has /message/:String and action:/Object/ (with /text/:String, /fn/:Function and /args/:List) on it
 */
export const notifications = (state = initialState, action) => {
  if (/^notification\//.test(action.type)) {
    switch (action.type) {
      case "notification/push":
        state.push(action.payload);
        return [...state];
      default:
        return [...state];
    }
  } else if (action.type === "http/seccess") {
    switch (action.action.type) {
      case "category/add":
        state.push({
          message: `Category "${action.action.payload[0].title}" has been added`,
          action: {
            text: "DELETE",
            fn: "deleteCategory",
            args: [action.action.payload[0]._id],
          },
        });
        return [...state];

      case "category/update":
        state.push({
          message: `Category "${action.action.payload.title}" has been updated`,
          action: {
            text: "UNDO",
            fn: "updateCategory",
            //todo: the args here is the 'OLD' data
            args: [action.action.payload],
          },
        });
        return [...state];

      case "category/delete":
        state.push({
          message: `Category has been deleted`,
          action: {
            text: "UNDO",
            fn: "revertDeleteCategory",
            args: [action.action.payload],
          },
        });
        return [...state];

      case "log/add":
        state.push({
          message: `Log "${action.action.payload[0].title}" has been added`,
          action: {
            text: "DELETE",
            fn: "deleteLog",
            args: [action.action.payload[0]._id],
          },
        });
        return [...state];

      case "log/update":
        state.push({
          message: `Log "${action.action.payload.title}" has been updated`,
          action: {
            text: "UNDO",
            fn: "updateLog",
            //todo: the args here is the 'OLD' data
            args: [action.action.payload],
          },
        });
        return [...state];

      case "log/delete":
        state.push({
          message: `Log has been deleted`,
          action: {
            text: "UNDO",
            fn: "revertDeleteLog",
            args: [action.action.payload],
          },
        });
        return [...state];
    }
  }

  //todo: what if something has failed??
  if (action.type === "http/error") {
    state.push({
      message: `${action.error.status} | ${action.error.body.msg}`,
    });
    return [...state];
  }

  return state;
};
