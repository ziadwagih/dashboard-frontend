import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import HeaderBar from "./HeaderBar";
import OpportunityCard from "./OpportunityCard";
import MissedProfitWidget from "./MissedProfitWidget";
import SlippageHeatmap from "./SlippageHeatmap";
import ExecutionSimulator from "./ExecutionSimulator";

const ArbitrageRadar = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ No token found in localStorage.");
        setOpportunities([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/arbitrage", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Unauthorized (status ${response.status})`);
        }

        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("❌ Failed to fetch arbitrage data:", error.message);
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
    }

    socketRef.current.on("new-arbitrage", (newOpportunity) => {
      setOpportunities((prev) => [newOpportunity, ...prev.slice(0, 19)]);
    });

    return () => {
      socketRef.current.off("new-arbitrage");
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <HeaderBar />

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading opportunities...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {opportunities.map((opp) => (
                <OpportunityCard key={opp._id} opp={opp} />
              ))}
            </AnimatePresence>
          </div>
        )}

        <MissedProfitWidget opportunities={opportunities} />
        <SlippageHeatmap opportunities={opportunities} />
        <ExecutionSimulator />
      </div>
    </section>
  );
};

export default ArbitrageRadar;
