const router = require("express").Router();
const products = require("../products");

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

router.get("/products", getProducts);
router.get("/products/:id", getProductById);

module.exports = router;
