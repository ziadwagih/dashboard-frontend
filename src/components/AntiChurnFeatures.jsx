import { Flame, Rocket, ShieldCheck, Zap, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Rocket className="text-[#00f0ff] w-6 h-6" />,
    title: "Priority Whale Feeds",
    description: "Instant alerts for large ETH/BTC inflows before public APIs.",
  },
  {
    icon: <Zap className="text-yellow-400 w-6 h-6" />,
    title: "Real-Time Arbitrage Radar",
    description: "Live tracking of exchange price gaps updated every 2s.",
  },
  {
    icon: <ShieldCheck className="text-green-400 w-6 h-6" />,
    title: "Insider AI Advisor",
    description: "Alpha-grade predictions with 87% backtested accuracy.",
  },
  {
    icon: <Flame className="text-red-500 w-6 h-6" />,
    title: "Early Whale Trends",
    description: "Identify recurring wallet clusters days before breakouts.",
  },
];

export default function AntiChurnFeatures() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 mt-24 text-white font-sora z-30">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-orbitron text-center mb-12"
      >
        What You’ll Lose Without Pro
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0f172a]/60 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition"
          >
            <div className="flex items-center gap-3 mb-2">{feature.icon}<h3 className="font-bold text-lg">{feature.title}</h3></div>
            <p className="text-white/70 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="w-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-6 rounded-xl backdrop-blur-md text-center">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Lock className="text-[#00f0ff] w-6 h-6" />
            <div>
              <p className="text-lg font-semibold">These features are locked.</p>
              <p className="text-sm text-white/70">You’re on the free tier. Upgrade to unlock full access.</p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] px-6 py-2 rounded-lg font-bold transition hover:bg-[#00f0ff]/20"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Unlock Pro Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
