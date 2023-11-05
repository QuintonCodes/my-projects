const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

app.use(express.static(path.join(__dirname, "src")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
