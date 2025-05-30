// backend/routes/sendSMS.js
import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER,
    });

    res.status(200).json({ success: true, sid: sms.sid });
  } catch (err) {
    console.error("❌ Twilio SMS error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
