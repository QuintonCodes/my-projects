const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({});

orderSchema.virtual("id").get(() => {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);
