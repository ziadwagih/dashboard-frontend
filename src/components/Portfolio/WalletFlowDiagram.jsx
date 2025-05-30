import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaArrowRight } from "react-icons/fa";

const WalletFlowDiagram = () => {
  const wallets = [
    { id: "wallet1", label: "Main Wallet", x: 20, y: 80, color: "#00f0ff" },
    { id: "wallet2", label: "DEX", x: 200, y: 40, color: "#22c55e" },
    { id: "wallet3", label: "Cold Storage", x: 380, y: 80, color: "#facc15" },
  ];

  const flows = [
    { from: "wallet1", to: "wallet2" },
    { from: "wallet2", to: "wallet3" },
  ];

  const findWallet = (id) => wallets.find((w) => w.id === id);

  return (
    <div className="w-full max-w-3xl mx-auto h-[240px] relative mt-8">
      <svg className="absolute inset-0 w-full h-full">
        {flows.map((flow, index) => {
          const from = findWallet(flow.from);
          const to = findWallet(flow.to);
          return (
            <motion.line
              key={index}
              x1={from.x + 40}
              y1={from.y + 20}
              x2={to.x}
              y2={to.y + 20}
              stroke="#00f0ff"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: index * 0.4 }}
            />
          );
        })}
      </svg>

      {wallets.map((wallet, i) => (
        <motion.div
          key={wallet.id}
          className="absolute w-[120px] h-[60px] rounded-xl backdrop-blur-md border border-cyan-400/30 shadow-[0_0_20px_rgba(0,240,255,0.2)] bg-[rgba(10,15,20,0.6)] flex items-center justify-center gap-2 font-sora"
          style={{ left: wallet.x, top: wallet.y }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <FaWallet className="text-cyan-400" />
          <span className="text-sm text-white">{wallet.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default WalletFlowDiagram;
