import React from "react";
import { motion } from "framer-motion";
import FlowCard from "./FlowCard";

const mockFlowData = [
  {
    id: 1,
    otcDesk: "Genesis",
    coin: "BTC",
    amount: 427,
    price: "$62,140",
    change: -1.2,
    wallet: "0xA1b...73f",
    status: "completed",
  },
  {
    id: 2,
    otcDesk: "Jump Crypto",
    coin: "ETH",
    amount: 12000,
    price: "$3,210",
    change: 0.8,
    wallet: "0x9dF...4eC",
    status: "pending",
  },
  {
    id: 3,
    otcDesk: "Cumberland",
    coin: "SOL",
    amount: 89100,
    price: "$158.22",
    change: 2.1,
    wallet: "0x7cA...b9D",
    status: "failed",
  },
];

export default function FlowCardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {mockFlowData.map((flow, index) => (
        <motion.div
          key={flow.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <FlowCard {...flow} />
        </motion.div>
      ))}
    </div>
  );
}
