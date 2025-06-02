import React from "react";
import { motion } from "framer-motion";
import bloomberg from "../../assets/sponsors/bloomberg.png";
import coindesk from "../../assets/sponsors/coindesk.png";
import wsj from "../../assets/sponsors/wsj.png";

export default function SponsorBar() {
  return (
    <motion.div
      className="w-full bg-[#0f172a] border-t border-b border-[#334155] py-4 px-6 flex items-center justify-between flex-wrap gap-y-4 gap-x-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Left: Tagline */}
      <div className="text-gray-400 text-sm font-sora tracking-wider uppercase whitespace-nowrap">
        Trusted by analysts from:
      </div>

      {/* Right: Sponsor logos */}
      <div className="flex items-center gap-8 flex-wrap">
        <img
          src={bloomberg}
          alt="Bloomberg"
          className="h-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
        />
        <img
          src={coindesk}
          alt="CoinDesk"
          className="h-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
        />
        <img
          src={wsj}
          alt="WSJ"
          className="h-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
        />
      </div>
    </motion.div>
  );
}
