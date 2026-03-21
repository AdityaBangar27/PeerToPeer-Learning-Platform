const db = require('../config/db');
require('dotenv').config();

exports.createDoubt = async (req, res) => {
  const { title, description, subject, topic, image_url, request_type } = req.body;
  const user_id = req.user.id;
  try {
    const result = await db.query(
      'INSERT INTO doubts (user_id, title, description, subject, topic, image_url, request_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, title, description, subject, topic, image_url, request_type || 'text']
    );

    const newDoubt = result.rows[0];

    // Emit to all users that a new doubt is posted
    const { io } = require('../app');
    io.emit('doubt:new', newDoubt);

    res.status(201).json(newDoubt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoubts = async (req, res) => {
  try {
    const result = await db.query('SELECT d.*, u.name as solicitor_name FROM doubts d JOIN users u ON d.user_id = u.id ORDER BY d.created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoubtById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT d.*, u.name as solicitor_name FROM doubts d JOIN users u ON d.user_id = u.id WHERE d.id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Doubt not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptDoubt = async (req, res) => {
  const { id } = req.params;
  const solver_id = req.user.id;
  try {
    const result = await db.query(
      'UPDATE doubts SET status = \'accepted\' WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Doubt not found' });
    
    const updatedDoubt = result.rows[0];
    
    // Emit to the solicitor specifically (or generally for feed refresh)
    const { io } = require('../app');
    io.emit('doubt:accepted', { doubtId: id, solverId: solver_id });

    res.json({ updatedDoubt, message: 'Doubt accepted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
