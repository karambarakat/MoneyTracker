require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const connectionDB = require("./Config/connectMongo");
const cors = require("cors");

//Initiate things
connectionDB();
const app = express();

//CORPS policy
app.use(cors({ origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
});

//Body parser
app.use(express.json());

//Getting the server starting
if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}
app.all("/", (req, res) => res.json({ msg: "api is working" }));

// init error handler
app.use(require("./Middlewares/errorMiddlewares").init);

// Mount routers
app.use("/api/user", require("./Routers/UserRouter"));
app.use("/api/log", require("./Routers/LogRouter"));
app.use("/api/category", require("./Routers/CategoryRouter"));
app.use("/api/meta", require("./Routers/MetaRouter"));

// Error handlers
app.use(require("./Middlewares/errorMiddlewares").errors);

const PORT = process.env.PORT || 8811;
app.listen(PORT, () => {
  console.log(`connection has been made ${process.env} to ${PORT}`);
});
