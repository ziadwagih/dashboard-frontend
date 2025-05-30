import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeaderBar() {
  const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center border-b border-[#1e324b] pb-4">
      <h2 className="font-bold text-xl md:text-2xl tracking-widest uppercase text-white font-[Neue Machina]">
        Dark Pool Flow
      </h2>

      <div className="flex items-center space-x-4">
        {/* Last updated */}
        <motion.span
          className="text-sm font-mono text-[#00f0ff]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Last Updated: {lastUpdated}s ago
        </motion.span>

        {/* PRO badge */}
        <motion.a
          href="/pricing"
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-[#FFD700] to-[#f59e0b] text-black px-3 py-1 text-xs rounded-full font-bold tracking-wide shadow-md"
        >
          🔒 PRO
        </motion.a>
      </div>
    </div>
  );
}
