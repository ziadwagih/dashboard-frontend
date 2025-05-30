import React, { useEffect, useState } from "react";
import AssetCard from "./Portfolio/AssetCard";
import MetricBadge from "./Portfolio/MetricBadge";
import WalletFlowDiagram from "./Portfolio/WalletFlowDiagram";
import { motion, useSpring, useMotionValue } from "framer-motion";

// You can customize this list later or make it dynamic via a database
const mockAssets = [
  { name: "Ethereum", symbol: "ETH", id: "ethereum", amount: 2.5, change: 3.2 },
  { name: "Tether", symbol: "USDT", id: "tether", amount: 1500, change: 0.1 },
  { name: "Solana", symbol: "SOL", id: "solana", amount: 50, change: -1.8 },
];

const metrics = [
  { label: "Liquidity Score", value: "98/100" },
  { label: "Portfolio Beta", value: "0.72" },
  { label: "Whale Concentration", value: "12%" },
];

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 15 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionValue.set(value);
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest);
    });
    return () => unsubscribe();
  }, [value]);

  return (
    <span className="text-5xl font-bold text-white">
      ${display.toLocaleString(undefined, { maximumFractionDigits: 0 })}
    </span>
  );
};

const PortfolioTracker = () => {
  const [livePrices, setLivePrices] = useState({});
  const [coinLogos, setCoinLogos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = mockAssets.map((a) => a.id).join(",");
    const fetchData = async () => {
      try {
        const priceRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const priceData = await priceRes.json();

        const logosData = {};
        for (let asset of mockAssets) {
          const metaRes = await fetch(
            `https://api.coingecko.com/api/v3/coins/${asset.id}`
          );
          const metaData = await metaRes.json();
          logosData[asset.id] = metaData.image.large;
        }

        setLivePrices(
          mockAssets.reduce((acc, asset) => {
            acc[asset.id] = priceData[asset.id]?.usd || 0;
            return acc;
          }, {})
        );
        setCoinLogos(logosData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const enhancedAssets = mockAssets.map((a) => {
    const price = livePrices[a.id] || 0;
    return {
      ...a,
      price,
      value: a.amount * price,
      image: coinLogos[a.id] || "", // fallback to empty if not loaded
    };
  });

  const totalValue = enhancedAssets.reduce((acc, a) => acc + a.value, 0);

  return (
    <section className="w-full px-4 py-12 bg-[#0f172a] text-white font-sora space-y-12">
      {/* Top Section */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-orbitron text-cyan-400 drop-shadow-md">Your Portfolio</h2>
        <p className="text-lg text-gray-300">Private Wealth View • Updated Live</p>
        {!loading ? (
          <AnimatedNumber value={totalValue} />
        ) : (
          <div className="text-5xl font-bold text-white animate-pulse">Loading...</div>
        )}
        <div className="text-xs text-amber-400 mt-1">
          🔒 Cold storage: 12.4 ETH ($41,328) not shown
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-4">
        {metrics.map((metric, idx) => (
          <MetricBadge key={idx} label={metric.label} value={metric.value} />
        ))}
      </div>

      {/* Asset Cards */}
      <div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {enhancedAssets.map((asset, idx) => (
          <AssetCard key={idx} {...asset} />
        ))}
      </div>

      {/* Flow Diagram */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-orbitron text-white mb-4">Asset Flow</h3>
        <WalletFlowDiagram />
      </div>
    </section>
  );
};

export default PortfolioTracker;
