const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artists");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 10800000 },
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
