import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { truncateHash, classifySentiment } from "../utils/helpers";

export default function WhaleAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [premiumLocked, setPremiumLocked] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState({
    telegram: true,
    email: false,
    sms: false,
  });

  useEffect(() => {
    fetchWhaleTxs();
  }, []);

  const fetchWhaleTxs = async () => {
    try {
      setLoading(true);
      const ETHERSCAN_API_KEY = "XHEZ25FU3NWP4NC69NTVNTGF7UYTPDUEXZ";
      const address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "1") {
        const topTxs = data.result.slice(0, 10).map((tx) => {
          const valueEth = parseFloat(tx.value) / 1e18;
          return {
            hash: tx.hash,
            value: valueEth * 3000, // mock ETH price
            sentiment: classifySentiment(tx.value),
            advisorNote: generateAiAdvice(valueEth * 3000),
          };
        });
        setAlerts(topTxs);
      } else {
        console.error("Failed to fetch whale txs:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateAiAdvice = (usdValue) => {
    if (usdValue > 1000000)
      return "🔴 AI: Massive whale activity detected. Could trigger market impact.";
    if (usdValue > 100000)
      return "🟡 AI: Large shark transaction — keep a close watch.";
    return "🟢 AI: Dolphin move — minor market footprint.";
  };

  const getHeatmapColor = (usd) => {
    if (usd > 1000000) return "border-red-500/70";
    if (usd > 100000) return "border-yellow-400/60";
    return "border-green-400/60";
  };

  const handleToggle = (type) => {
    setNotifPrefs((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleTestNotif = () => {
    const activeChannels = Object.keys(notifPrefs)
      .filter((k) => notifPrefs[k])
      .join(", ");
    alert("Test notification sent via: " + activeChannels);
  };

  return (
    <section className="p-4 md:p-8 bg-[#0f172a] text-white font-sora relative overflow-x-hidden">
      <h2 className="text-2xl font-orbitron mb-6 tracking-wide">Whale Alerts</h2>

      <div className="flex flex-col md:flex-row gap-5 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-cyan-500/30">
        {/* Sponsored */}
        <div className="min-w-[280px] rounded-2xl p-4 bg-[#1e293b] border border-cyan-400/40 relative hover:scale-[1.03] transition-all duration-300 ease-in-out shadow-cyan-500/10 shadow-sm">
          <span className="absolute top-2 right-2 text-[10px] text-yellow-300 bg-yellow-800/40 px-2 py-0.5 rounded-md shadow-inner border border-yellow-500/30">
            Promoted
          </span>
          <h3 className="font-orbitron text-sm mb-2">TokenX Partnership</h3>
          <p className="text-xs text-white/70">Biggest whale moves sponsored by TokenX</p>
        </div>

        {/* Alerts */}
        {loading ? (
          <div className="min-w-[280px] p-4 rounded-2xl bg-[#1e293b] text-center text-sm text-white/50 animate-pulse border border-white/10 shadow-inner shadow-cyan-400/10">
            Loading whale alerts...
          </div>
        ) : alerts.length > 0 ? (
          alerts.map((tx, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`min-w-[280px] p-4 rounded-2xl border ${getHeatmapColor(
                tx.value
              )} bg-[#1e293b]/60 backdrop-blur-md shadow-md hover:shadow-cyan-400/30 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-2">
                <img src="/eth.svg" className="w-6 h-6" alt="ETH" />
                <span className="text-sm font-semibold tracking-wide text-white/90">
                  ${tx.value.toLocaleString()} USD
                </span>
              </div>

              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center gap-1 text-white/80">
                  {tx.sentiment.icon} {tx.sentiment.label} ({tx.sentiment.confidence}%)
                </span>
                <a
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300 transition"
                >
                  {truncateHash(tx.hash)}
                </a>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-white/60 italic mt-2"
              >
                {tx.advisorNote}
              </motion.p>
            </motion.div>
          ))
        ) : (
          <div className="min-w-[280px] p-4 rounded-2xl bg-[#1e293b] text-center text-sm text-red-400 border border-red-500/30">
            No alerts found.
          </div>
        )}

        {/* Premium Mock */}
        {premiumLocked && (
          <div className="min-w-[280px] p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/10 text-center relative group hover:scale-[1.03] transition">
            <div className="absolute top-2 right-2 text-xs text-white bg-gray-800/80 px-2 py-1 rounded">
              🔒 Locked
            </div>
            <p className="text-sm text-white/70">Advanced Alerts</p>
            <button className="mt-3 px-4 py-1 rounded bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600 transition font-semibold text-sm">
              Upgrade Now
            </button>
            <div className="opacity-0 group-hover:opacity-100 mt-3 text-xs text-white/50 transition-all duration-300">
              + Whale NFT transfers
              <br />
              + Stablecoin swaps
              <br />
              + Cross-chain flows
            </div>
          </div>
        )}
      </div>

      {/* Notification Panel */}
      <div className="mt-10 bg-[#1e293b] p-5 rounded-xl border border-cyan-400/10">
        <h3 className="font-orbitron text-lg mb-3">Notification Settings</h3>
        <div className="flex items-center gap-5 flex-wrap">
          {Object.keys(notifPrefs).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={notifPrefs[type]}
                onChange={() => handleToggle(type)}
                className="w-4 h-4 accent-cyan-500"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleTestNotif}
          className="mt-4 px-5 py-1.5 rounded bg-cyan-500 text-black hover:bg-cyan-400 transition font-semibold text-sm"
        >
          Test Notification
        </button>
      </div>

      
    </section>
  );
}
