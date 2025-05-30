import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Optional logo map for popular coins (expand as needed)
const coinLogos = {
  ETH: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  USDT: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  BTC: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
};

const AssetCard = ({
  name = "Unknown Asset",
  symbol = "???",
  balance = 0,
  price = 0,
  change = "0%",
  image, // Optional external image override
}) => {
  const isPositive =
    typeof change === "string"
      ? change.startsWith("+") || parseFloat(change) > 0
      : parseFloat(change) > 0;

  const usdValue = (balance * price).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const fallbackLogo = "/fallback-icon.png"; // Place this static file in your public folder (see note below)
  const logoUrl =
    image || coinLogos[symbol?.toUpperCase()] || fallbackLogo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="rounded-2xl p-6 bg-[rgba(10,10,20,0.6)] border border-cyan-400/20 shadow-2xl backdrop-blur-xl text-white hover:shadow-cyan-400/30 hover:scale-[1.015] transition-all duration-300 ease-in-out group"
    >
      <div className="flex items-center mb-5 gap-4">
        <img
          src={logoUrl}
          alt={`${symbol} logo`}
          className="w-10 h-10 rounded-full border border-cyan-400/30 shadow-md object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackLogo;
          }}
        />
        <div>
          <h3 className="text-xl font-bold font-orbitron tracking-wide">
            {name}
          </h3>
          <p className="text-sm text-cyan-300 font-sora uppercase tracking-widest">
            {symbol}
          </p>
        </div>
      </div>

      <div className="space-y-2 font-sora text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Balance:</span>
          <span className="text-white font-medium">{balance}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Price:</span>
          <span className="text-white font-medium">
            ${price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Value:</span>
          <span className="text-cyan-300 font-bold">{usdValue}</span>
        </div>
      </div>

      <div
        className={`flex items-center justify-end gap-2 text-sm mt-5 ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
        <span className="font-sora tracking-wide">{change}</span>
      </div>
    </motion.div>
  );
};

export default AssetCard;
