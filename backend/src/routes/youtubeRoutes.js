const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getYouTubeSuggestions } = require('../controllers/youtubeController');

router.get('/:doubtId', auth, getYouTubeSuggestions);

module.exports = router;
