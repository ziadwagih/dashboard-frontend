import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock4, Zap, Eye, LockKeyhole } from "lucide-react";

const desks = ["Genesis", "Cumberland", "Jump Crypto", "Alameda Ghost", "Darknode"];
const coins = ["BTC", "ETH", "SOL", "AVAX", "MATIC", "PEPE"];
const walletIDs = ["0x7f3", "0x1ab", "0xdd2", "0x9f1", "0x42c"];

function generateFakeAlert() {
  const type = Math.random() > 0.5 ? "buy" : "sell";
  const desk = desks[Math.floor(Math.random() * desks.length)];
  const coin = coins[Math.floor(Math.random() * coins.length)];
  const amount = (Math.random() * (type === "buy" ? 800 : 3000) + 100).toFixed(2);
  const wallet = walletIDs[Math.floor(Math.random() * walletIDs.length)];

  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    type,
    desk,
    coin,
    amount,
    wallet,
  };
}

export default function ActivityFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => [generateFakeAlert(), ...prev.slice(0, 6)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 w-full shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-orbitron text-white text-sm tracking-widest">
          LIVE WHALE ALERTS
        </h2>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock4 className="w-4 h-4 text-amber-400 animate-pulse" />
          Updated live
        </span>
      </div>

      <div className="flex flex-col gap-2 h-[250px] overflow-hidden relative">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-sora text-gray-200 px-3 py-2 bg-[#0f172a] border border-[#334155] rounded-md flex justify-between items-center shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Zap
                  className={`w-4 h-4 ${
                    alert.type === "buy"
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                />
                <span>
                  <strong className="text-white">{alert.desk}</strong> {alert.type === "buy" ? "bought" : "sold"}{" "}
                  <strong className="text-white">{alert.amount} {alert.coin}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Eye className="w-3 h-3" />
                Wallet: {alert.wallet}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scarcity Element */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
        <span>
          Last whale moved <span className="text-amber-300 font-semibold">12 mins ago</span>
        </span>
        <span className="flex items-center gap-1">
          <LockKeyhole className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-300">Only 3/20 PRO slots left</span>
        </span>
      </div>
    </div>
  );
}
