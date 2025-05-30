// backend/routes/favoritesRoutes.js
import express from 'express';
import Favorite from '../models/Favorite.js';
// ✅ Use the correct export name:
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all favorite coin IDs for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    const coinIds = favorites.map(fav => fav.coinId);
    res.json(coinIds);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// POST - Add a coin to favorites
router.post('/:coinId', authenticateToken, async (req, res) => {
  try {
    const { coinId } = req.params;
    const existing = await Favorite.findOne({ userId: req.user.id, coinId });

    if (existing) {
      return res.status(400).json({ error: 'Already favorited' });
    }

    const newFavorite = new Favorite({ userId: req.user.id, coinId });
    await newFavorite.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// DELETE - Remove coin from favorites
router.delete('/:coinId', authenticateToken, async (req, res) => {
  try {
    const { coinId } = req.params;
    await Favorite.findOneAndDelete({ userId: req.user.id, coinId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

export default router;
