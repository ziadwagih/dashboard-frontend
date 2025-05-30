import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Footer() {
  const [countdown, setCountdown] = useState("12:00:00");
  const [scrollCount, setScrollCount] = useState(0);
  const [showWhaleInvite, setShowWhaleInvite] = useState(false);
  const hasDismissedInvite = useRef(false);

  // Countdown timer logic (fixed to clamp at 00:00:00)
  useEffect(() => {
    const targetTime = Date.now() + 12 * 60 * 60 * 1000; // 12 hours from now

    const updateCountdown = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      const hours = String(Math.floor((remaining / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((remaining / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((remaining / 1000) % 60)).padStart(2, '0');
      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll counter logic
  useEffect(() => {
    const handleScroll = () => setScrollCount(prev => prev + 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger whale invite only once
  useEffect(() => {
    if (scrollCount >= 3 && !hasDismissedInvite.current) {
      setShowWhaleInvite(true);
      hasDismissedInvite.current = true; // Prevent future triggers
    }
  }, [scrollCount]);

  return (
    <footer className="bg-[#0A0A0F] border-t border-[#00F0FF]/20 text-white font-sora">
      
      {/* Panel 1: CTA Ribbon */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FFD700]/80 via-[#FFDC00]/80 to-[#FFD700]/80 shadow-lg py-2 px-4 text-black flex items-center justify-between">
        <div className="text-sm font-bold animate-pulse">
          🚀 Next PRO slot opens in: <span className="font-mono">{countdown}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-[#FFD700] px-4 py-2 rounded-md font-bold hover:bg-[#1c1c1c]"
          onClick={() => window.location.href = 'mailto:ziad75022@gmail.com?subject=Institutional Demo Request'}
        >
          Request Institutional Demo
        </motion.button>
      </div>

      {/* Panel 2: Mega Footer */}
      <div className="grid md:grid-cols-3 gap-6 p-8 border-t border-[#00F0FF]/10">
        {/* Column 1 */}
        <div>
          <h4 className="text-xl font-bold mb-2 text-[#00F0FF]">Product</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="blur-sm hover:blur-none transition">Whale Alerts Pro <span className="text-[#FFD700]">🔒 PRO</span></li>
            <li className="blur-sm hover:blur-none transition">Dark Pool Access <span className="text-[#FFD700]">🔒 PRO</span></li>
            <li className="blur-sm hover:blur-none transition">Arbitrage Toolkit <span className="text-[#FFD700]">🔒 PRO</span></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xl font-bold mb-2 text-[#00F0FF]">Resources</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="cursor-pointer hover:underline" onClick={() => alert("PDF gated - Coming soon")}>How to Track Whales (PDF)</li>
            <li className="cursor-pointer hover:underline" onClick={() => alert("Login required")}>API Docs (Login Required)</li>
            <li className="cursor-pointer hover:underline" onClick={() => alert("Case Studies locked")}>Case Studies (Morgan Stanley)</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xl font-bold mb-2 text-[#00F0FF]">Contact</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><strong>Institutions:</strong> <a href="mailto:ziad75022@gmail.com">ziad75022@gmail.com</a></li>
            <li><strong>Urgent:</strong> <a href="https://t.me/WhaleAlertBot2025bot" target="_blank" rel="noopener noreferrer">Telegram Bot</a></li>
            <li><strong>Partnerships:</strong> <a href="mailto:BD@ziadwagih.com">BD@ziadwagih.com</a></li>
          </ul>
        </div>
      </div>

      {/* Panel 3: Conversion Floor */}
      <div className="px-6 py-4 border-t border-[#00F0FF]/10 text-xs text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-white/70">
          <span>24h Volume Tracked: $1.2B</span>
          <span>• Active Whales: 428</span>
          <span>• Alerts Sent: 12,843</span>
        </div>
        <div className="text-[#FFD700] hidden md:block">⚠️ Your IP: 192.168.1.1 (Basic Tier) • Nearby Institutions: 3 detected</div>
        <div className="text-[10px] opacity-70 text-center">
          By continuing, you agree to be added to our exclusive whale tracking waitlist (Position #142)
        </div>
      </div>

      {/* Whale Watching Easter Egg */}
      {showWhaleInvite && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-[#0f172a] p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-[#FFD700] mb-4">You're Invited to Whale Watching</h2>
            <p className="text-sm text-white/80 mb-4">Ziad personally invites you to the shadow feeds. This feature will unlock after account upgrade.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-semibold"
              onClick={() => setShowWhaleInvite(false)}
            >
              Got it.
            </motion.button>
          </div>
        </div>
      )}

      {/* Final Signature Line */}
      <div className="text-center text-[11px] py-2 border-t border-[#00F0FF]/10 text-white/50">
        Built by <span className="text-purple-400 font-bold">Ziad Wagih</span> • <a className="hover:underline" href="mailto:ziad75022@gmail.com">Email</a> • <a className="hover:underline" href="https://linkedin.com/in/ziad-wagih-361ab5364" target="_blank" rel="noopener noreferrer">LinkedIn</a> • <a className="hover:underline" href="https://github.com/ziadwagih" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
}
