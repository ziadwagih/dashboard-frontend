// backend/routes/authRoutes.js
import express from "express";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

// Prefix: /api/auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/register", signup);

export default router;
