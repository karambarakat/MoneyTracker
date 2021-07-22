const err404 = (req, res) => {
  res.status(404).json({
    msg: "Resource not found",
  });
};

const mongooseError = (errMiddleware, req, res, next) => {
  if (errMiddleware.name === "ValidationError") {
    try {
      // send all error as a list
      const errors = errMiddleware.errors;
      const errorsList = [];
      for (const error in errors) {
        if (Object.hasOwnProperty.call(errors, error)) {
          const item = errors[error];
          errorsList.push({ error: item.path, message: item.message });
        }
      }

      //send bad request error
      res.status(400).json({
        msg:
          process.env.ENV === "development"
            ? errMiddleware.message
            : errMiddleware._message,
        errorsList,
        productionMsg:
          process.env.ENV === "development" && errMiddleware._message,
        mongooseObj: process.env.ENV === "development" && errMiddleware,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "unknown database error",
        MongooseObj: process.env.ENV === "development" && errMiddleware,
        syntaxObj: process.env.ENV === "development" && error,
      });
    }
  } else next(errMiddleware);
};

const err500 = (err, req, res, next) => {
  const status = res.statusCode || 500;
  if (status !== 500) {
    res.status(status).json({
      msg: err.message,
      stack:
        process.env.ENV === "development" &&
        err.stack.split("\n ").map((e) => e.trim()),
    });
  } else {
    res.status(status).json({
      msg:
        process.env.ENV === "development"
          ? err.massage || "Server error"
          : "Server error",
      stack:
        process.env.ENV === "development" &&
        err.stack.split("\n ").map((e) => e.trim()),
    });
  }
};

module.exports = [err404, mongooseError, err500];
