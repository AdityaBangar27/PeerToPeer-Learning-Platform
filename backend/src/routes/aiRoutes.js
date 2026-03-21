const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { askAI } = require('../controllers/aiController');

router.post('/ask', auth, askAI);

module.exports = router;
