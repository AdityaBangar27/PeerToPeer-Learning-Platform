const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createDoubt, getDoubts, getDoubtById, acceptDoubt } = require('../controllers/doubtController');

router.get('/', getDoubts);
router.post('/', auth, createDoubt);
router.get('/:id', getDoubtById);
router.patch('/:id/accept', auth, acceptDoubt);

module.exports = router;
