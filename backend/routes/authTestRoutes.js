import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "✅ /api/auth-test is working!" });
});

export default router;
