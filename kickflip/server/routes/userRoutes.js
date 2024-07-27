const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const { protect, refresh } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);
router.put("/me", protect, updateUser);

module.exports = router;
