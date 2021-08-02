//!bug: **standarise** this doesn't have body.errors.msg like other error responses
const err404 = (req, res) => {
  res.status(404).json({
    status: 404,
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
    err.status = status || 500;
    err.msg = msg || "some error occurred";
    err.body = body || {};
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
        const errors = {};
        Object.keys(errMiddleware.errors)
          .map((e) => [e.split(".").pop(), errMiddleware.errors[e]])
          .forEach(([key, value]) => (errors[key] = value.message));

        //send bad request error
        res.status(400).json({
          status: 400,
          msg:
            process.env.ENV === "development"
              ? errMiddleware.message
              : errMiddleware._message,
          errors,
          productionMsg:
            process.env.ENV === "development" && errMiddleware._message,
          mongooseObj: process.env.ENV === "development" && errMiddleware,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 500,
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
      if (!err.body.errors) err.body.errors = { msg: err.msg };
      res.status(err.status || 500).json(
        process.env.ENV === "development"
          ? {
              status: err.status || 500,
              msg: err.msg || "some error occured.",
              stack: res.errStack(err.stack),
              ...err.body,
            }
          : {
              status: err.status || 500,
              msg: err.msg || "some error occured.",
              ...err.body,
            }
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
          status: 500,
          msg: err.message || "server error",
          stack: res.errStack && err.stack && res.errStack(err.stack),
        }
      : { status: 500, msg: "server error" }
  );
};

module.exports = {
  init,
  errors: [err404, mongooseError, customErr, err500],
};
