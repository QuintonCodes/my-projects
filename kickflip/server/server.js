const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const shopRoute = require("./routes/shopRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const port = process.env.PORT || 4000;
require("dotenv").config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to KickFlip server !");
});

app.use("/auth", userRoutes);
app.use("/shop", shopRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
