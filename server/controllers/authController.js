const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

const loginUser = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    console.log("Token:", token);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signupUser = async (req, res) => {
  try {
    console.log("Signup attempt:", req.body);
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    const newUser = new users({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: { name, email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.findByIdAndUpdate(userId, { password: hashedPassword });
    res.json({ success: true, message: "Password Changed Successfully" });
  } catch (err) {
    console.error("Update password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  updatePassword,
};
