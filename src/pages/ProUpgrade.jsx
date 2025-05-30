import React, { useEffect } from "react";
import ProHero from "../components/ProHero";
import AuthCard from "../components/AuthCard";
import TierComparison from "../components/TierComparison";
import CryptoCheckout from "../components/CryptoCheckout";
import AntiChurnFeatures from "../components/AntiChurnFeatures";

export default function ProUpgrade() {
  useEffect(() => {
    window.scrollTo(0, 0); // Auto-scroll to top on page mount
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#0a0f1c] to-black min-h-screen text-white font-sora pb-32">
      {/* 1. Hero with 3D background */}
      <ProHero />

      {/* 2. Tier Comparison section */}
      <section className="relative z-0 px-4 max-w-6xl mx-auto mt-24">
        <TierComparison />
      </section>

      {/* 3. Crypto Checkout with overflow fix */}
      <section className="relative z-0 px-4 max-w-6xl mx-auto mt-32 overflow-hidden">
        <CryptoCheckout />
      </section>

      {/* 4. Auth Card - spaced correctly below coins */}
      <section className="relative z-10 flex justify-center px-4 mt-16 mb-24">
        <div className="w-full max-w-md">
          <AuthCard />
        </div>
      </section>

      {/* 5. Anti-Churn Perks */}
      <section className="relative z-0 px-4 max-w-6xl mx-auto mt-32">
        <AntiChurnFeatures />
      </section>
    </main>
  );
}
