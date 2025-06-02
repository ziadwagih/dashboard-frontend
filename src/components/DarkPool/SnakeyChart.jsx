import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const desks = ["Genesis", "Cumberland", "Jump Crypto"];
const coins = ["BTC", "ETH", "SOL"];
const wallets = ["anon1", "anon2", "anon3"];

const generateMockFlow = () => {
  return Array.from({ length: 6 }, () => ({
    from: desks[Math.floor(Math.random() * desks.length)],
    to: wallets[Math.floor(Math.random() * wallets.length)],
    coin: coins[Math.floor(Math.random() * coins.length)],
    amount: Math.floor(Math.random() * 10000 + 500),
    sentiment: Math.random() > 0.5 ? "buy" : "sell",
  }));
};

export default function SankeyChart() {
  const [flows, setFlows] = useState(generateMockFlow());

  useEffect(() => {
    const interval = setInterval(() => {
      setFlows(generateMockFlow());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full py-8 px-4 rounded-2xl bg-[#1e293b]/70 backdrop-blur-md shadow-inner border border-[#334155] overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-white font-[Sora]">
        OTC Institutional Flow (Mock)
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Desks */}
        <div className="space-y-4">
          {desks.map((desk, i) => (
            <div key={i} className="text-[#00f0ff] font-mono text-sm">
              {desk}
            </div>
          ))}
        </div>

        {/* Animated Flows */}
        <div className="relative h-48 col-span-1">
          {flows.map((flow, index) => (
            <motion.div
              key={index}
              className="absolute left-0 right-0 mx-auto w-1 h-full rounded-full"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: 1,
                scaleY: 1,
                backgroundColor:
                  flow.sentiment === "buy" ? "#3b82f6" : "#ef4444",
              }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              style={{
                top: `${index * 20}px`,
                transformOrigin: "top center",
                width: "4px",
              }}
            />
          ))}
        </div>

        {/* Wallets */}
        <div className="space-y-4 text-right">
          {wallets.map((wallet, i) => (
            <div key={i} className="text-[#94a3b8] font-mono text-sm">
              {wallet}
            </div>
          ))}
        </div>
      </div>

      {/* Trade Log */}
      <div className="mt-6 text-sm text-[#e2e8f0] font-[IBM Plex Mono] space-y-2">
        {flows.slice(0, 5).map((flow, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-[#334155] pb-1"
          >
            <span className="text-[#00f0ff]">{flow.from}</span>
            <span>{flow.coin}</span>
            <span>{flow.amount}</span>
            <span
              className={`${
                flow.sentiment === "buy"
                  ? "text-blue-400"
                  : "text-red-400"
              }`}
            >
              {flow.sentiment === "buy" ? "Accumulating" : "Dumping"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
