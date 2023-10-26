const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//* Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//* Routes
const categoriesRoute = require("./routers/categories");
const productsRoute = require("./routers/products");
const usersRoute = require("./routers/users");
const orderRoute = require("./routers/orders");
const authJwt = require("./helpers/jwt");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/orders`, orderRoute);

//* Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "kickflip-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//* Server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
