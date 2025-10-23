const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware.js");
// const user = require("../models/user.js");

//authentication routes
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10); // salting rounds
    const newuser = new User({ name, email, password: hashPassword });
    await newuser.save();
    return res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not exists" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Login successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Login server" });
  }
});

router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});
module.exports = router;
