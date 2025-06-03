import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import twilio from "twilio";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Routes & Middleware
import favoritesRoutes from "./routes/favoritesRoutes.js";
import arbitrageRoutes from "./routes/arbitrageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authTestRoutes from "./routes/authTestRoutes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

// 🔐 Load .env
dotenv.config();
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET missing from .env");
  process.exit(1);
}

// ⚙️ Express & HTTP Server
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// 🛡️ Security Middleware
app.use(helmet());

// ✅ ✅ CORS — allow multiple trusted frontend origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://dashboard-frontend-inky-eight.vercel.app", // old production
  "https://dashboard-frontend-nwwmef317-ziadwagihs-projects.vercel.app" // preview or new vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "⚠️ Too many requests, try again later.",
  standardHeaders: true,
  legacyHeaders: false,
}));

// 🔌 Attach Socket.IO to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🚦 Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth-test", authTestRoutes);
app.use("/api/favorites", authenticateToken, favoritesRoutes);
app.use("/api/arbitrage", authenticateToken, arbitrageRoutes);

app.get("/api/protected-test", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user?.email}, you're authenticated!` });
});

// 💰 CoinGecko Top Coins
app.get("/api/top-coins", async (req, res) => {
  try {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 30,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("❌ CoinGecko error:", err.message);
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
});

// 📲 Twilio SMS
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
app.post("/api/send-sms", async (req, res) => {
  const { message } = req.body;
  const to = process.env.MY_PHONE_NUMBER;
  if (!message || !to) {
    return res.status(400).json({ error: "Missing message or destination number" });
  }
  try {
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("✅ SMS sent:", sms.sid);
    res.status(200).json({ success: true, sid: sms.sid });
  } catch (err) {
    console.error("❌ SMS error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🤖 Telegram Alerts
app.post("/api/send-telegram-alert", async (req, res) => {
  const { message, chatId } = req.body;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!message || !chatId || !botToken) {
    return res.status(400).json({ error: "Missing message, chatId, or bot token" });
  }
  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    });
    console.log("✅ Telegram message sent");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Telegram error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🧱 Fallback API Route
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// 🔎 Basic root health check
app.get("/", (req, res) => {
  res.send("✅ Crypto Dashboard API is running");
});

// 🚀 Launch
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
