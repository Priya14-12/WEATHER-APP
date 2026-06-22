const SearchHistory = require('../models/SearchHistory');

/**
 * @desc    Get search history (sorted by latest search)
 * @route   GET /api/history
 * @access  Public
 */
const getSearchHistory = async (req, res, next) => {
  try {
    const history = await SearchHistory.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a single search history entry by ID
 * @route   DELETE /api/history/:id
 * @access  Public
 */
const deleteHistoryItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const historyItem = await SearchHistory.findById(id);

    if (!historyItem) {
      return res.status(404).json({
        success: false,
        message: `No search history item found with ID: ${id}`,
      });
    }

    await historyItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Search history entry deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all search history
 * @route   DELETE /api/history
 * @access  Public
 */
const clearSearchHistory = async (req, res, next) => {
  try {
    await SearchHistory.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All search history cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSearchHistory,
  deleteHistoryItem,
  clearSearchHistory,
};
