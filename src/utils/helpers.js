// ▼▼▼ src/utils/helpers.js ▼▼▼

export function truncateHash(hash) {
  return hash.slice(0, 6) + "..." + hash.slice(-4);
}

export function classifySentiment(value) {
  const ethValue = parseFloat(value) / 1e18;

  if (ethValue > 5000) {
    return { icon: "🚨", label: "Bearish", confidence: 85 };
  } else if (ethValue > 1000) {
    return { icon: "📉", label: "Slight Bearish", confidence: 65 };
  } else if (ethValue > 100) {
    return { icon: "⚖️", label: "Neutral", confidence: 50 };
  } else {
    return { icon: "📈", label: "Bullish", confidence: 80 };
  }
}
