import React from "react";
import { motion } from "framer-motion";

// ✅ Corrected imports with proper folder path and casing
import HeaderBar from "./DarkPool/HeaderBar";
import SankeyChart from "./DarkPool/SnakeyChart"; // Make sure file is named SnakeyChart.jsx not SankeyChart.jsx
import FlowCardList from "./DarkPool/FlowCardList";
import ConversionPanel from "./DarkPool/ConversionModule";
import ActivityFeed from "./DarkPool/ActivityFeed";
import SponsorBar from "./DarkPool/SponsorBar";

export default function DarkPool() {
  return (
    <motion.section
      className="bg-[#0f172a] text-white py-10 px-4 md:px-12 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      id="dark-pool"
    >
      <div className="space-y-8">
        {/* HEADER */}
        <HeaderBar />

        {/* SANKEY CHART & HEATMAP */}
        <div className="bg-[#1e293b] rounded-xl backdrop-blur-md p-6 border border-[#1e324b] grid lg:grid-cols-2 gap-8">
          <SankeyChart />
          <ActivityFeed />
        </div>

        {/* FLOW CARDS */}
        <FlowCardList />

        {/* CONVERSION + SPONSOR */}
        <div className="grid md:grid-cols-2 gap-6">
          <ConversionPanel />
          <SponsorBar />
        </div>
      </div>
    </motion.section>
  );
}
