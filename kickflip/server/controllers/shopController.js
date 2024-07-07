const asyncHandler = require("express-async-handler");
const products = require("../products");

const getProducts = asyncHandler(async (req, res) => {
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

module.exports = {
  getProducts,
  getProductById,
};
