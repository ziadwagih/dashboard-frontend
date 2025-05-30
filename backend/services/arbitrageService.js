
// server/services/arbitrageService.js
import Opportunity from "../models/arbitrageModel.js";

/**
 * Saves a new arbitrage opportunity into MongoDB.
 * Also validates the incoming data before saving.
 * @param {Object} data - The opportunity data to store
 * @returns {Object} - The saved opportunity document
 */
export const saveArbitrage = async (data) => {
  try {
    const {
      exchangeA,
      exchangeB,
      asset,
      priceA,
      priceB,
      volume = 0,
    } = data;

    if (!exchangeA || !exchangeB || !asset || !priceA || !priceB) {
      throw new Error("Missing required fields");
    }

    const profitPercent = calculateProfitPercent(priceA, priceB);

    const opportunity = new Opportunity({
      exchangeA,
      exchangeB,
      asset,
      priceA,
      priceB,
      profitPercent,
      volume,
    });

    const saved = await opportunity.save();
    return saved;
  } catch (error) {
    console.error("❌ Service error while saving arbitrage:", error.message);
    throw error;
  }
};

/**
 * Calculates the profit percentage between two prices.
 * @param {number} priceA - First price (buy)
 * @param {number} priceB - Second price (sell)
 * @returns {number} - The % profit (positive or negative)
 */
const calculateProfitPercent = (priceA, priceB) => {
  const diff = priceB - priceA;
  const percent = (diff / priceA) * 100;
  return parseFloat(percent.toFixed(2));
};

/**
 * Fetches the latest arbitrage opportunities (limit 20)
 * @returns {Array} - List of recent opportunities
 */
export const getRecentOpportunities = async () => {
  try {
    return await Opportunity.find()
      .sort({ createdAt: -1 })
      .limit(20);
  } catch (error) {
    console.error("❌ Service error while fetching arbitrages:", error.message);
    throw error;
  }
};

