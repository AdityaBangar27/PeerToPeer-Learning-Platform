const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserProfile, rateUser } = require('../controllers/userController');

router.get('/:id', getUserProfile);
router.post('/:id/rate', auth, rateUser);

module.exports = router;
