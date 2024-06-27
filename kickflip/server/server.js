const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user");
const shopRoute = require("./routes/shop");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("Welcome to KickFlip server !");
});

app.use("/auth", userRoute);
app.use("/shop", shopRoute);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
