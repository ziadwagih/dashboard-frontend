import React from "react";
import { motion } from "framer-motion";
import { Lock, Zap, Flame } from "lucide-react";

export default function ConversionModule() {
  return (
    <motion.div
      className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl p-5 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0" />
      
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
        {/* Left side - persuasive copy */}
        <div className="flex items-center gap-4">
          <Zap className="w-6 h-6 text-amber-400 animate-bounce" />
          <div>
            <p className="font-orbitron text-white text-sm tracking-widest uppercase">
              Unlock Deep Whale Flow
            </p>
            <p className="text-gray-400 text-xs font-sora">
              Access full trade trails, real-time alerts, and dark liquidity scans.
            </p>
          </div>
        </div>

        {/* Right side - button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-amber-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full text-xs font-orbitron shadow-sm flex items-center gap-2 transition duration-300"
        >
          <Lock className="w-4 h-4" />
          UPGRADE TO PRO
        </motion.button>
      </div>

      {/* Scarcity progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>3 PRO slots left</span>
          <span>17 taken</span>
        </div>
        <div className="w-full h-2 bg-[#334155] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Flame bottom right */}
      <Flame className="absolute bottom-2 right-3 w-4 h-4 text-red-500 opacity-70 animate-pulse" />
    </motion.div>
  );
}
