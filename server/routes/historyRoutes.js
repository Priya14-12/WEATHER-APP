const express = require('express');
const router = express.Router();
const {
  getSearchHistory,
  deleteHistoryItem,
  clearSearchHistory,
} = require('../controllers/historyController');

// Routes for /api/history
router.route('/')
  .get(getSearchHistory)
  .delete(clearSearchHistory);

router.route('/:id')
  .delete(deleteHistoryItem);

module.exports = router;
