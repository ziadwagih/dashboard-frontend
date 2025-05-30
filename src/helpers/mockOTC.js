/**
 * Generates a list of fake OTC trades with realistic values.
 * These can be used to power Sankey diagrams, FlowCards, Heatmaps, etc.
 */

const otcDesks = ["Genesis", "Cumberland", "Jump Crypto", "Amber Group", "Galaxy"];
const coins = ["BTC", "ETH", "SOL", "AVAX", "MATIC"];
const directions = ["buy", "sell"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomAmount = (coin) => {
  switch (coin) {
    case "BTC": return Math.floor(Math.random() * 1000) + 50;
    case "ETH": return Math.floor(Math.random() * 15000) + 1000;
    case "SOL": return Math.floor(Math.random() * 300000) + 10000;
    default: return Math.floor(Math.random() * 1000000) + 50000;
  }
};
const getRandomPrice = (coin) => {
  switch (coin) {
    case "BTC": return (61000 + Math.random() * 3000).toFixed(2);
    case "ETH": return (3000 + Math.random() * 200).toFixed(2);
    case "SOL": return (120 + Math.random() * 15).toFixed(2);
    case "AVAX": return (35 + Math.random() * 10).toFixed(2);
    case "MATIC": return (0.75 + Math.random() * 0.2).toFixed(3);
    default: return "0";
  }
};

export function generateMockOTCTrades(count = 10) {
  const trades = [];

  for (let i = 0; i < count; i++) {
    const coin = getRandomElement(coins);
    const amount = getRandomAmount(coin);
    const price = getRandomPrice(coin);
    const desk = getRandomElement(otcDesks);
    const type = getRandomElement(directions);
    const counterparty = `anon${Math.floor(Math.random() * 9999)}`;

    trades.push({
      id: `${desk}-${coin}-${i}-${Date.now()}`,
      desk,
      coin,
      amount,
      price,
      type,
      timestamp: new Date().toISOString(),
      counterparty,
    });
  }

  return trades;
}
