import React from "react";
import { ArrowPathIcon, ClockIcon } from "@heroicons/react/24/outline";

const HeaderBar = ({ lastUpdated, onRefresh, loading }) => {
  const formatTime = (date) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full flex items-center justify-between bg-gradient-to-r from-[#0f1116] to-[#13161b] border border-[#1d1f24] rounded-2xl p-4 shadow-md mb-4">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-orbitron text-white tracking-wide">
          Arbitrage Radar
        </h1>
        <p className="text-sm text-gray-400 font-sora">
          Last Updated: {formatTime(lastUpdated)}
        </p>
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1c22] text-white font-sora text-sm hover:bg-[#22242a] transition-all duration-200 shadow ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ArrowPathIcon
          className={`h-5 w-5 ${
            loading ? "animate-spin" : ""
          } text-blue-400 transition`}
        />
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
};

export default HeaderBar;
