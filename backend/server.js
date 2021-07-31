require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const connectionDB = require("./Config/connectMongo");
const cors = require("cors");
const path = require("path");

//Initiate things
connectionDB();
const app = express();

// init error handler
app.use(require("./Middlewares/errorMiddlewares").init);

//CORPS policy
app.use(cors({ origin: "http://localhost:3000" }));
// app.use((req, res, next) => setTimeout(() => next(), 3000));

//Body parser
app.use(express.json());

//Getting the server starting
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// );
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("API is running....");
});
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.use(morgan("dev"));
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

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
