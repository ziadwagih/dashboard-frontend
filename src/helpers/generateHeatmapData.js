/**
 * Generates heatmap intensity based on trade size and direction.
 *
 * - Larger trades = higher intensity
 * - Sell trades = red heat
 * - Buy/accumulation = blue heat
 *
 * @param {Object[]} trades - List of trade objects
 * @param {string} trades[].type - "buy" or "sell"
 * @param {number} trades[].amount - Amount of crypto traded
 * @returns {Object[]} Heatmap-ready data with color + intensity
 */
export default function generateHeatmapData(trades = []) {
  if (!Array.isArray(trades)) return [];

  return trades.map((trade) => {
    const { type, amount } = trade;
    const cappedAmount = Math.min(Math.max(amount, 0), 1000000); // Cap for normalization

    // Intensity scale: 0.1 to 1
    const intensity = (cappedAmount / 1000000).toFixed(2);

    // Color logic
    const color = type === "sell" ? "#ef4444" : "#3b82f6";

    return {
      ...trade,
      intensity: parseFloat(intensity),
      color,
    };
  });
}
