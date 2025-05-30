import { useState } from "react";
import { CheckCircle, Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const coins = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    color: "#f7931a",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    color: "#3c3c3d",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    color: "#2775ca",
    image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
  },
];

export default function CryptoCheckout() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2500);
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-16 px-4 z-30 relative text-white font-sora">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-orbitron text-center mb-6"
      >
        Secure Your Upgrade
      </motion.h2>

      <div className="flex justify-center gap-4 mb-8">
        {coins.map((coin) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={coin.id}
            onClick={() => {
              setSelectedCoin(coin);
              setDone(false);
            }}
            className={`flex flex-col items-center border rounded-xl px-4 py-3 backdrop-blur-md bg-[#0f172a]/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition ${
              selectedCoin?.id === coin.id
                ? "border-[#00f0ff] shadow-lg"
                : "border-white/10"
            }`}
          >
            <img src={coin.image} alt={coin.name} className="w-10 h-10 mb-2" />
            <span className="text-sm">{coin.symbol}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCoin && !done && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#0f172a]/60 p-6 rounded-xl border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl mb-4 font-bold">
              Pay with {selectedCoin.name}
            </h3>

            <p className="mb-4 text-sm">
              Send payment to:
              <span className="block mt-1 font-mono text-[#00f0ff] text-sm">
                0xABC...{selectedCoin.id.toUpperCase()}DEAD
              </span>
            </p>

            {!processing ? (
              <motion.button
                onClick={handleCheckout}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] py-2 px-4 rounded-lg font-bold hover:bg-[#00f0ff]/20 transition"
              >
                Confirm Payment
              </motion.button>
            ) : (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin mr-2 w-5 h-5 text-[#00f0ff]" />
                <span className="text-[#00f0ff]">Waiting for confirmations...</span>
              </div>
            )}
          </motion.div>
        )}

        {done && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 bg-[#00f0ff]/10 border border-[#00f0ff]/20 rounded-xl backdrop-blur-md"
          >
            <CheckCircle className="text-green-400 w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-300">
              Payment Confirmed
            </h3>
            <p className="text-sm text-white/80 mt-2">
              You’ve unlocked full Pro access. Welcome to the elite club.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 text-center text-xs text-white/50 flex justify-center items-center gap-1">
        <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
        End-to-end encrypted • 0% fee • Instant access
      </div>
    </section>
  );
}
