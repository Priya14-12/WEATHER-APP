import axios from 'axios';

// Create Axios client pointing to the backend API base url
const apiClient = axios.create({
  baseURL: '', // Empty base URL is resolved locally (works with Vite proxy or relative server host)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherApi = {
  /**
   * Fetch weather details by city name
   */
  getWeatherByCity: async (city) => {
    const response = await apiClient.get('/api/weather', {
      params: { city },
    });
    return response.data;
  },

  /**
   * Fetch weather details by latitude & longitude
   */
  getWeatherByCoords: async (lat, lon) => {
    const response = await apiClient.get('/api/weather/coords', {
      params: { lat, lon },
    });
    return response.data;
  },
};

export const historyApi = {
  /**
   * Retrieve search history log
   */
  getHistory: async () => {
    const response = await apiClient.get('/api/history');
    return response.data;
  },

  /**
   * Delete a single history log item by ID
   */
  deleteHistoryItem: async (id) => {
    const response = await apiClient.delete(`/api/history/${id}`);
    return response.data;
  },

  /**
   * Delete all history log items
   */
  clearHistory: async () => {
    const response = await apiClient.delete('/api/history');
    return response.data;
  },
};
