const express = require("express");
const path = require("path");

const app = express();
const port = 5174;

const clientDirectory = path.resolve(__dirname, "..", "client");

app.use(express.static(clientDirectory));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientDirectory, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(clientDirectory);
});
