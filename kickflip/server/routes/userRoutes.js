const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
} = require("../controllers/userController");
const { protect, refresh } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);
router.put("/me", protect, updateUser);
router.post("/logout", logoutUser);

module.exports = router;
