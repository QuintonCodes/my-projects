const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateUser);

module.exports = router;
