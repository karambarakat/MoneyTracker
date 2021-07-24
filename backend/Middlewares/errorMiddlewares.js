const err404 = (req, res) => {
  res.status(404).json({
    msg: "Resource not found",
  });
};

const init = (req, res, next) => {
  res.error = (first, second, third) => {
    let msg;
    let status;
    let body = third;
    // if i entered non-Number as first arg it will be iterpeted as the message
    // and the status is null so it will be throw 500 error
    if (toString.call(first) === "[object Number]") {
      status = first;
      msg = second;
    } else {
      msg = String(first);
      status = 400;
    }
    let err = new Error();
    err.sign = "custom";
    err.status = status;
    err.msg = msg;
    err.body = body;
    throw err;
  };

  res.errStack = (stack) =>
    stack
      .split("\n ")
      .map((e) => e.trim())
      .filter((e) => /node_modules/.test(e))
      .map((e) => `${e.split("\\").pop()} : ${e}`);

  next();
};

const mongooseError = (errMiddleware, req, res, next) => {
  try {
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
  } catch {
    next(errMiddleware);
  }
};

const customErr = (err, req, res, next) => {
  try {
    if (err.sign === "custom") {
      res.status(err.status || 500).json(
        process.env.ENV === "development"
          ? {
              msg: err.msg || "some error occured.",
              stack: res.errStack(err.stack),
              ...err.body,
            }
          : { msg: err.msg || "some error occured." }
      );
    } else {
      next(err);
    }
  } catch {
    next(err);
  }
};

const err500 = (err, req, res, next) => {
  res.status(500).json(
    process.env.ENV === "development"
      ? {
          msg: err.message || "server error",
          stack: res.errStack && err.stack && res.errStack(err.stack),
        }
      : { msg: "server error" }
  );
};

module.exports = {
  init,
  errors: [err404, mongooseError, customErr, err500],
};
