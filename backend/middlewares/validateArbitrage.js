// server/middleware/validateArbitrage.js

export const validateArbitrage = (req, res, next) => {
  const { exchangeA, exchangeB, asset, priceA, priceB } = req.body;

  if (!exchangeA || !exchangeB || !asset || !priceA || !priceB) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof priceA !== "number" || typeof priceB !== "number") {
    return res.status(400).json({ error: "Prices must be numbers" });
  }

  next();
};
