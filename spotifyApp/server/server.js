const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artists");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: "auto", httpOnly: true, sameSite: "lax" },
  })
);

// Homepage route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use("/auth", authRoutes);
app.use("/artists", artistRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
