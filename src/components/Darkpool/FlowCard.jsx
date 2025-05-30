import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ArrowRight } from "lucide-react";

export default function FlowCard({ otcDesk, coin, amount, price, change, wallet, status }) {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="bg-[#0f172a] border border-[#334155] rounded-2xl p-5 shadow-xl hover:shadow-cyan-500/20 transition duration-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-orbitron text-sm uppercase tracking-wide text-cyan-400">
          {otcDesk}
        </h3>
        <div className={`text-xs px-2 py-1 rounded-full font-bold ${
          status === "completed"
            ? "bg-green-700 text-green-200"
            : status === "pending"
            ? "bg-yellow-700 text-yellow-200"
            : "bg-red-700 text-red-200"
        }`}>
          {status}
        </div>
      </div>

      {/* Coin & Amount */}
      <div className="flex items-baseline gap-2 mb-1">
        <div className="text-white font-sora text-lg font-semibold">
          {amount.toLocaleString()} {coin}
        </div>
      </div>

      {/* Price & 24h Change */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-sm text-slate-300">{price}</div>
        <div className={`flex items-center text-sm font-semibold ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Wallet */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span className="truncate max-w-[45%]">{wallet}</span>
        <ArrowRight size={18} className="text-cyan-500" />
        <span className="text-right text-cyan-300 font-mono text-xs">On-Chain</span>
      </div>
    </motion.div>
  );
}
