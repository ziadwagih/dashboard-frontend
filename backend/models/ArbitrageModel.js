import mongoose from "mongoose";

const arbitrageSchema = new mongoose.Schema(
  {
    exchangeA: {
      name: String,
      price: Number,
    },
    exchangeB: {
      name: String,
      price: Number,
    },
    asset: String,
    spread: Number, // percentage
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ArbitrageOpportunity", arbitrageSchema);
