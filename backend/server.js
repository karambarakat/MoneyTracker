require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const connectionDB = require("./Config/connectMongo");
const cors = require("cors");
const path = require("path");

//Initiate things
connectionDB();
const app = express();
// app.use((req, res, next) => setTimeout(() => next(), 3000));

// init error handler
app.use(require("./Middlewares/errorMiddlewares").init);

//CORPS policy
//? i don't this this line of code is needed
app.use(cors({ origin: "react-app-money.herokuapp.com" }));

//Body parser
app.use(express.json());

// todo: add 405 method not allowed response
// Mount routers
app.use("/api/user", require("./Routers/UserRouter"));
app.use("/api/log", require("./Routers/LogRouter"));
app.use("/api/category", require("./Routers/CategoryRouter"));
app.use("/api/meta", require("./Routers/MetaRouter"));
app.use("/api", require("./Middlewares/errorMiddlewares").errors[0]);

// send react app
// prepare for production
// Getting the server starting
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  // ?is it ("*" because of react-router-dom will handle any none existing paths or existing paths
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
} else {
  app.use(morgan("dev"));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handlers
app.use(require("./Middlewares/errorMiddlewares").errors);

const PORT = process.env.PORT || 8811;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
