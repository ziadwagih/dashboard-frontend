// backend/models/ArbitrageOpportunity.js
import mongoose from 'mongoose';

const OpportunitySchema = new mongoose.Schema({
  exchangeA: {
    type: String,
    required: true,
    trim: true,
  },
  exchangeB: {
    type: String,
    required: true,
    trim: true,
  },
  asset: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  priceA: {
    type: Number,
    required: true,
  },
  priceB: {
    type: Number,
    required: true,
  },
  profitPercent: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  volume: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['open', 'executed', 'missed'],
    default: 'open',
  },
}, {
  timestamps: true,
  versionKey: false,
});

// ✅ ESM export
const ArbitrageOpportunity = mongoose.model('Opportunity', OpportunitySchema);
export default ArbitrageOpportunity;
