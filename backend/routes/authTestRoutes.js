//authTestRoutes.js
// backend/routes/authTestRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/test-token", (req, res) => {
  const payload = { id: "123abc" };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET missing" });
  }

  const token = jwt.sign(payload, secret, { expiresIn: "365d" });

  res.json({ message: "Token generated", token });
});

export default router;
