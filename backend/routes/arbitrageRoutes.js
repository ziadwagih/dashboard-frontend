// backend/routes/arbitrageRoutes.js

import express from "express";
import { postArbitrage, fetchOpportunities } from "../controllers/arbitrageController.js";
import { validateArbitrage } from "../middlewares/validateArbitrage.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authenticateToken, validateArbitrage, postArbitrage);
router.get("/", authenticateToken, fetchOpportunities);

export default router;
