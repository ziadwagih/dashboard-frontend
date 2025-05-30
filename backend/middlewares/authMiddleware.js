// backend/middlewares/authMiddleware.js

import dotenv from "dotenv";
dotenv.config(); // Load env first

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("🔐 Incoming Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ Missing or malformed Authorization header.");
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn("⚠️ Bearer format present but token is missing.");
    return res.status(401).json({ error: "Token missing" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("❌ JWT_SECRET is not defined in .env");
    return res.status(500).json({ error: "Internal server error" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    console.log("✅ Token verified:", decoded);

    // Use consistent field naming: decoded.id not decoded._id
    req.user = {
      id: decoded.id,
      email: decoded.email || null,
    };

    next();
  });
};
