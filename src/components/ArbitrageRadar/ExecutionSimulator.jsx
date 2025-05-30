import React, { useState } from "react";
import { motion } from "framer-motion";

const ExecutionSimulator = () => {
  const [amount, setAmount] = useState(1000);
  const [executionTime, setExecutionTime] = useState(2); // in seconds
  const [slippage, setSlippage] = useState(0.5); // in %
  const [result, setResult] = useState(null);

  const simulateExecution = () => {
    const idealProfit = amount * 0.03; // 3% ideal arbitrage
    const delayPenalty = Math.min(executionTime * 0.2, 1) * idealProfit;
    const slippagePenalty = (slippage / 100) * amount;

    const actualProfit = idealProfit - delayPenalty - slippagePenalty;

    setResult({
      ideal: idealProfit,
      actual: actualProfit,
      lost: idealProfit - actualProfit,
    });
  };

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] border border-[#2a2a2a] shadow-lg">
      <h3 className="text-sm font-bold font-orbitron text-gray-300 mb-4 uppercase tracking-wide">
        Execution Simulator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-sora text-white mb-4">
        <div>
          <label className="block mb-1 text-gray-400">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-xl px-3 py-2 bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-400">Execution Time (s)</label>
          <input
            type="number"
            value={executionTime}
            onChange={(e) => setExecutionTime(Number(e.target.value))}
            className="w-full rounded-xl px-3 py-2 bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-400">Slippage (%)</label>
          <input
            type="number"
            value={slippage}
            step={0.1}
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="w-full rounded-xl px-3 py-2 bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={simulateExecution}
        className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold tracking-wide font-orbitron shadow-lg transition-all duration-300"
      >
        Run Simulation
      </motion.button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-4 rounded-xl bg-black/30 border border-gray-700 text-sm font-sora text-gray-200"
        >
          <p><strong>Ideal Profit:</strong> ${result.ideal.toFixed(2)}</p>
          <p><strong>Actual Profit:</strong> ${result.actual.toFixed(2)}</p>
          <p className="text-red-400 font-semibold">
            <strong>Lost Edge:</strong> -${result.lost.toFixed(2)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ExecutionSimulator;
