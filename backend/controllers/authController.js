const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModelFactory = require("../models/userModel");

const createToken = (userId, tenantId) => {
  return jwt.sign({ userId, tenantId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = UserModelFactory(req.db);

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const User = UserModelFactory(req.db);

    const user = await User.findOne({ email });
    console.log(user, "user");
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    console.log(valid, "valid");
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id, req.tenantId);
    console.log(token, "token");
    res.json({ token });
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    console.log("abc logout");
    const User = UserModelFactory(req.db);
    console.log(req.body, User, "reg logout body");
    const user = await User.findById(req.user.userId);
    console.log(user, "check");
    user.lastLogoutAt = new Date();
    await user.save();
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err, "errlogoot");
    res.status(500).json({ message: "Logout error", error: err.message });
  }
};
