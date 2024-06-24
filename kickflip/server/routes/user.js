const router = require("express").Router();
const UserModel = require("../models/User");

//* Register *//
router.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => {
      console.error("Error during registration:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//* Login *//
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.status(401).send("Wrong Password");
      }
    } else {
      res.status(404).send("User not found!");
    }
  });
});

module.exports = router;
