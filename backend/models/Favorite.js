// backend/models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to the user
    required: true,
  },
  coinId: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
