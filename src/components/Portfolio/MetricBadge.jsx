import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const MetricBadge = ({ title, value, icon, color = "cyan" }) => {
  const colorMap = {
    cyan: "text-cyan-400 border-cyan-400/40 shadow-cyan-500/20",
    green: "text-green-400 border-green-400/40 shadow-green-500/20",
    yellow: "text-yellow-400 border-yellow-400/40 shadow-yellow-500/20",
    red: "text-red-400 border-red-400/40 shadow-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`rounded-lg px-4 py-2 backdrop-blur-md border ${colorMap[color]} bg-[rgba(15,20,30,0.6)] shadow-md flex items-center gap-3 font-sora`}
    >
      <div className="text-xl">{icon || <FaCheckCircle />}</div>
      <div>
        <h4 className="text-sm text-slate-300">{title}</h4>
        <p className="text-base font-bold font-orbitron">{value}</p>
      </div>
    </motion.div>
  );
};

export default MetricBadge;
