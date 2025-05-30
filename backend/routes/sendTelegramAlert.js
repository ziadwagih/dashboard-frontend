// Express route to send Telegram message
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    return res.status(400).json({ error: "Missing message or chatId" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  try {
    await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Telegram send error:", err.message);
    res.status(500).json({ error: "Failed to send Telegram message" });
  }
});

export default router;
