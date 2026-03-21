const db = require('../config/db');
require('dotenv').config();

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT id, name, email, role, interests, photo_url, bio, rating, doubts_asked, doubts_solved, verified, points FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rateUser = async (req, res) => {
  const { id } = req.params; // to_user_id
  const { doubtId, stars, comment } = req.body;
  const from_user_id = req.user.id;

  try {
    // 1. Insert rating
    await db.query(
      'INSERT INTO ratings (doubt_id, from_user_id, to_user_id, stars, comment) VALUES ($1, $2, $3, $4, $5)',
      [doubtId, from_user_id, id, stars, comment]
    );

    // 2. Recalculate User Rating
    const ratingResult = await db.query(
      'SELECT AVG(stars) as avg_rating FROM ratings WHERE to_user_id = $1',
      [id]
    );
    const newRating = ratingResult.rows[0].avg_rating;

    // 3. Update USer and possibly add points
    await db.query(
      'UPDATE users SET rating = $1, points = points + 10 WHERE id = $2',
      [newRating, id]
    );

    res.json({ message: 'Rating submitted and reputation points added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
