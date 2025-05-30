/**
 * Formats a coin name to standardized uppercase abbreviation.
 * Example: "bitcoin" => "BTC"
 * Falls back to original if not in map.
 *
 * @param {string} name - Full coin name (e.g., "bitcoin")
 * @returns {string} Abbreviated coin symbol (e.g., "BTC")
 */
export default function formatCoin(name) {
  if (!name || typeof name !== "string") return "";

  const coinMap = {
    bitcoin: "BTC",
    ethereum: "ETH",
    tether: "USDT",
    solana: "SOL",
    avalanche: "AVAX",
    binancecoin: "BNB",
    cardano: "ADA",
    polkadot: "DOT",
    dogecoin: "DOGE",
    chainlink: "LINK",
    litecoin: "LTC",
    toncoin: "TON",
    arbitrum: "ARB",
    optimism: "OP",
    render: "RNDR",
  };

  const key = name.toLowerCase().trim();
  return coinMap[key] || name.toUpperCase();
}
