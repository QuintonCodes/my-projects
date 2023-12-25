const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order");
const app = express();

dotenv.config();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(
  "/api/auth",
  (req, res, next) => {
    console.log("Request to /api/auth");
    next();
  },
  authRoute
);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
