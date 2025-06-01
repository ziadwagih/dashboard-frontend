import React, { useEffect, useState } from "react";
import clsx from "clsx";

// Mock whale moves
const generateMockHeatmap = () => {
  return Array.from({ length: 36 }, (_, i) => ({
    id: i,
    intensity: Math.random(),
    type: Math.random() > 0.5 ? "buy" : "sell",
  }));
};

export default function HeatMapOverlay() {
  const [zones, setZones] = useState(generateMockHeatmap());

  useEffect(() => {
    const interval = setInterval(() => {
      setZones(generateMockHeatmap());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-6 gap-1 w-full h-[300px] bg-[#0f172a] rounded-xl p-2 shadow-inner border border-[#334155]">
      {zones.map((zone) => {
        const color =
          zone.type === "buy"
            ? `rgba(59, 130, 246, ${zone.intensity.toFixed(2)})` // blue
            : `rgba(239, 68, 68, ${zone.intensity.toFixed(2)})`; // red

        return (
          <div
            key={zone.id}
            className={clsx(
              "rounded-sm transition-all duration-700 ease-in-out",
              "w-full h-full"
            )}
            style={{
              backgroundColor: color,
              boxShadow: `0 0 ${12 * zone.intensity}px ${color}`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
