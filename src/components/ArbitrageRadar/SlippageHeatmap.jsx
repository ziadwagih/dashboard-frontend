import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const mockExchanges = [
  "Binance",
  "Coinbase",
  "Kraken",
  "Bybit",
  "KuCoin",
  "Gate.io",
  "Bitfinex",
  "OKX",
];

const getRandomSlippage = () => +(Math.random() * 2).toFixed(2); // 0% – 2%

const getHeatColor = (value) => {
  if (value < 0.5) return "bg-green-500/80";
  if (value < 1) return "bg-yellow-500/80";
  return "bg-red-500/80";
};

const SlippageHeatmap = () => {
  const [slippageData, setSlippageData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const updated = mockExchanges.map((name) => ({
        name,
        slippage: getRandomSlippage(),
      }));
      setSlippageData(updated);
    };

    generateData();
    const interval = setInterval(generateData, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#222] shadow-md">
      <h3 className="text-sm font-bold font-orbitron text-gray-300 mb-4 uppercase tracking-wide">
        Slippage Heatmap
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slippageData.map(({ name, slippage }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl p-3 text-sm font-sora font-semibold text-black ${getHeatColor(
              slippage
            )} transition-all duration-300 shadow-md`}
          >
            <p className="text-xs text-gray-900/70">{name}</p>
            <p className="text-base font-bold">{slippage.toFixed(2)}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SlippageHeatmap;
