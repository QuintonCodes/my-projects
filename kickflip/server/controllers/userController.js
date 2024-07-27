const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const validPassword = await bcrypt.compare(password, user.password);

  if (user && validPassword) {
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  const updatedUser = await user.save();

  const { accessToken, refreshToken } = generateTokens(updatedUser._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: accessToken,
  });
});

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  generateTokens,
};
