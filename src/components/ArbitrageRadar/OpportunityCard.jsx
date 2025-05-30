import React from "react";
import { ArrowTrendingUpIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const getHeatColor = (profit) => {
  if (profit > 1000) return "from-red-500 to-red-700"; // Whale
  if (profit > 100) return "from-yellow-400 to-yellow-600"; // Shark
  return "from-green-400 to-green-600"; // Dolphin
};

const OpportunityCard = ({ opportunity }) => {
  const {
    coin,
    buyExchange,
    sellExchange,
    buyPrice,
    sellPrice,
    profit,
    volume,
    timestamp,
  } = opportunity;

  const gradient = getHeatColor(profit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-4 bg-gradient-to-br ${gradient} text-white shadow-lg border border-[#1f1f1f] w-full`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold font-orbitron uppercase">{coin}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-200">
          <CurrencyDollarIcon className="h-4 w-4" />
          <span className="font-sora">${profit.toFixed(2)} Profit</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-4 mt-4 font-sora">
        {/* Buy Info */}
        <div className="bg-[#1a1b20] p-3 rounded-xl">
          <p className="text-xs text-gray-400">Buy From</p>
          <p className="text-sm font-semibold">{buyExchange}</p>
          <p className="text-sm text-green-400">${buyPrice.toFixed(4)}</p>
        </div>

        {/* Sell Info */}
        <div className="bg-[#1a1b20] p-3 rounded-xl">
          <p className="text-xs text-gray-400">Sell On</p>
          <p className="text-sm font-semibold">{sellExchange}</p>
          <p className="text-sm text-red-400">${sellPrice.toFixed(4)}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-300">
        <span>Volume: ${volume.toLocaleString()}</span>
        <span>{new Date(timestamp).toLocaleTimeString()}</span>
      </div>

      {/* Pulse Arrow */}
      <ArrowTrendingUpIcon className="absolute top-2 right-2 h-5 w-5 text-white opacity-20" />
    </motion.div>
  );
};

export default OpportunityCard;
