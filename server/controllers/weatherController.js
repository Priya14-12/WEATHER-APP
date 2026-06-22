const weatherService = require('../services/weatherService');
const SearchHistory = require('../models/SearchHistory');

/**
 * Helper to save a successful search to history.
 * It also prevents clutter by deleting older history if it exceeds 20 items.
 */
const saveSearchToHistory = async (weatherData) => {
  try {
    const { name, country, temp, condition, icon } = weatherData.current;
    
    // Create new search history entry
    await SearchHistory.create({
      cityName: name,
      country,
      temp,
      condition,
      icon,
    });

    // Keep history lean: limit to 20 most recent entries
    const count = await SearchHistory.countDocuments();
    if (count > 20) {
      const oldestEntries = await SearchHistory.find()
        .sort({ createdAt: 1 })
        .limit(count - 20);
      
      const idsToDelete = oldestEntries.map(entry => entry._id);
      await SearchHistory.deleteMany({ _id: { $in: idsToDelete } });
    }
  } catch (error) {
    console.error(`Error saving search history: ${error.message}`);
    // Do not throw error to user; history failure shouldn't crash the weather request
  }
};

/**
 * @desc    Get current weather & forecast by city name
 * @route   GET /api/weather
 * @access  Public
 */
const getWeatherByCity = async (req, res, next) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ success: false, message: 'City name parameter is required' });
  }

  try {
    const data = await weatherService.getWeatherData({ q: city });
    
    // Save to database asynchronously
    await saveSearchToHistory(data);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current weather & forecast by GPS coordinates (lat, lon)
 * @route   GET /api/weather/coords
 * @access  Public
 */
const getWeatherByCoords = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ success: false, message: 'Latitude and longitude parameters are required' });
  }

  try {
    const data = await weatherService.getWeatherData({ lat, lon });
    
    // Save resolved location to history
    await saveSearchToHistory(data);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoords,
};
