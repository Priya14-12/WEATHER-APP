const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require('../controllers/weatherController');

// Route: /api/weather
router.get('/', getWeatherByCity);

// Route: /api/weather/coords
router.get('/coords', getWeatherByCoords);

module.exports = router;
