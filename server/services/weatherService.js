const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather and 5-day forecast in parallel
 * @param {Object} params - Query params (e.g. { q: 'London' } or { lat, lon })
 * @returns {Promise<Object>} Combined weather and forecast data
 */
const getWeatherData = async (params) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key is missing. Please set OPENWEATHER_API_KEY in the server env.');
  }

  const commonParams = {
    ...params,
    appid: apiKey,
    units: 'metric', // Use metric units by default
  };

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, { params: commonParams }),
      axios.get(`${BASE_URL}/forecast`, { params: commonParams }),
    ]);

    // Format and combine the response data
    return {
      current: {
        name: weatherRes.data.name,
        country: weatherRes.data.sys.country,
        temp: weatherRes.data.main.temp,
        feelsLike: weatherRes.data.main.feels_like,
        tempMin: weatherRes.data.main.temp_min,
        tempMax: weatherRes.data.main.temp_max,
        condition: weatherRes.data.weather[0].main,
        description: weatherRes.data.weather[0].description,
        icon: weatherRes.data.weather[0].icon,
        humidity: weatherRes.data.main.humidity,
        windSpeed: weatherRes.data.wind.speed,
        pressure: weatherRes.data.main.pressure,
        visibility: weatherRes.data.visibility,
        timezone: weatherRes.data.timezone,
        coord: weatherRes.data.coord,
        dt: weatherRes.data.dt,
      },
      forecast: forecastRes.data.list.map((item) => ({
        dt: item.dt,
        temp: item.main.temp,
        feelsLike: item.main.feels_like,
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        dateText: item.dt_txt,
      })),
    };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || 'Error communicating with OpenWeatherMap';
      const customError = new Error(message);
      customError.statusCode = status;
      throw customError;
    }
    throw error;
  }
};

module.exports = {
  getWeatherData,
};
