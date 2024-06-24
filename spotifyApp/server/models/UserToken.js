const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresIn: Date,
});

module.exports = mongoose.model("users", userTokenSchema);
