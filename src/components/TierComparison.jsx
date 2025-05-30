import { motion } from "framer-motion";
import { useState } from "react";
import { Info } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    perks: ["❌ 3h delay", "❌", "❌"],
    blur: true,
    highlight: false,
    tooltip: "Limited access only",
  },
  {
    name: "Pro",
    price: "$299",
    perks: ["✅ Real-time", "✅ Basic", "❌"],
    blur: false,
    highlight: false,
    tooltip: "Used by 120+ prop firms",
  },
  {
    name: "VIP",
    price: "$999",
    perks: ["✅ + SMS", "✅ Full API", "✅ Auto-trade"],
    blur: false,
    highlight: true,
    tooltip: "Hedge funds choose VIP",
  },
];

const features = ["Whale Alerts", "Dark Pool", "Arbitrage"];

export default function TierComparison() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="w-full max-w-6xl mx-auto mt-20 px-4 z-30 relative">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-3xl font-orbitron text-white mb-8"
      >
        Choose Your Access Level
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.2, duration: 0.6 }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`
              relative rounded-2xl p-6 transition overflow-hidden
              border ${tier.highlight ? "border-yellow-400" : "border-[#00f0ff]/30"}
              bg-[rgba(15,23,42,0.6)] backdrop-blur-xl
              ${tier.blur ? "blur-sm opacity-60" : "opacity-100"}
              ${tier.highlight ? "shadow-[0_0_25px_rgba(255,215,0,0.4)] animate-pulse border-2" : ""}
            `}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-sora">{tier.name}</h3>
              <div className="text-[#00f0ff] font-bold">{tier.price}</div>
            </div>

            <ul className="mt-6 space-y-2 font-sora text-sm text-white">
              {tier.perks.map((perk, idx) => (
                <li key={idx}>{features[idx]}: {perk}</li>
              ))}
            </ul>

            {/* Tooltip hover */}
            {hovered === index && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-4 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs text-white px-3 py-2 rounded-lg backdrop-blur-sm"
              >
                <Info className="w-3 h-3 inline mr-1" />
                {tier.tooltip}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
