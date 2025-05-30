// arbitrageController.js
import ArbitrageOpportunity from "../models/ArbitrageOpportunity.js";

// ✅ POST: Add new arbitrage opportunity
export const postArbitrage = async (req, res) => {
  try {
    const { exchangeA, exchangeB, asset, priceA, priceB, profit } = req.body;

    const opportunity = new ArbitrageOpportunity({
      exchangeA,
      exchangeB,
      asset,
      priceA,
      priceB,
      profitPercent: profit, // ✅ Make sure you're saving to correct field
    });

    const saved = await opportunity.save();

    // ✅ Real-time emit to all clients
    req.io.emit("newArbitrage", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Failed to post arbitrage:", err.message);
    res.status(500).json({ error: "Failed to post arbitrage" });
  }
};

// ✅ GET: Fetch recent arbitrage opportunities
export const fetchOpportunities = async (req, res) => {
  try {
    const data = await ArbitrageOpportunity.find()
      .sort({ createdAt: -1 }) // latest first
      .limit(50); // only return 50 items max
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Failed to fetch arbitrage data:", err.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
