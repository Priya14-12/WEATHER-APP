const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, 'City name is required'],
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  temp: {
    type: Number,
  },
  condition: {
    type: String,
  },
  icon: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically clean up search history if it grows too large (e.g. limit to last 50 items)
// We will manage it in the controller, but keeping a simple index on createdAt for sorting is good.
searchHistorySchema.index({ createdAt: -1 });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
