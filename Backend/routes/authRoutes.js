import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { loginLimiter, forgotPasswordLimiter } from "../middleware/rateLimiters.js";
import asyncHandler from "../middleware/asyncHandler.js";
import validate, { forgotPasswordSchema, resetPasswordSchema } from "../middleware/validate.js";

const router = express.Router();

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

router.post(
  "/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, role: admin.role });
  })
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validate(forgotPasswordSchema),
  asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email.toLowerCase().trim() });

    if (admin) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      admin.resetPasswordTokenHash = hashToken(rawToken);
      admin.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
      await admin.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
      // Email isn't wired up yet — log the link so it can be used manually for now.
      console.log(`🔑 Password reset link for ${admin.email}: ${resetLink}`);
    }

    // Same response whether or not the email exists, so this endpoint can't be
    // used to enumerate registered admin accounts.
    res.json({ message: "If that email exists, a password reset link has been sent." });
  })
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    const tokenHash = hashToken(token);

    const admin = await Admin.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetPasswordTokenHash = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    res.json({ message: "Password reset successfully." });
  })
);

export default router;
