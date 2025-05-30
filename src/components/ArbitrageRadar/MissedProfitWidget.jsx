import React, { useEffect, useState } from "react";
import { FireIcon } from "@heroicons/react/24/solid";
import { motion, useAnimation } from "framer-motion";

const MissedProfitWidget = () => {
  const [missedTotal, setMissedTotal] = useState(0);
  const [recentMiss, setRecentMiss] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      const newMiss = Math.random() * 300 + 50; // simulate missed profits
      setRecentMiss(newMiss);
      setMissedTotal((prev) => prev + newMiss);

      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.4 },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="w-full rounded-2xl p-4 bg-gradient-to-br from-[#2a0000] to-[#4d0000] text-red-200 border border-[#440000] shadow-lg relative overflow-hidden"
    >
      {/* Icon */}
      <div className="absolute top-2 right-2 opacity-10">
        <FireIcon className="w-16 h-16" />
      </div>

      {/* Main Info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold font-orbitron uppercase">Missed Profits</h3>
        <p className="text-2xl font-bold font-sora text-red-400">
          ${missedTotal.toFixed(2)}
        </p>
        {recentMiss && (
          <p className="text-xs italic text-gray-400 font-sora">
            Missed opportunity: +${recentMiss.toFixed(2)}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MissedProfitWidget;