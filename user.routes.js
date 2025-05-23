import express from "express";
import User from "./user.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user with the same email or WhatsApp already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email  already exists",
      });
    }

    // Create new user
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ success: true, message: "Lead saved" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving lead",
      error: err.message,
    });
  }
});

export default router;
