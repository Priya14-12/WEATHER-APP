import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';
import WeatherDetails from '../components/WeatherDetails';
import ForecastSection from '../components/ForecastSection';
import SearchHistory from '../components/SearchHistory';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { weatherApi, historyApi } from '../services/api';

const Home = ({ onBackgroundChange }) => {
  const [weather, setWeather] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch search history on initial load
  const loadSearchHistory = async () => {
    try {
      const res = await historyApi.getHistory();
      if (res.success) {
        setHistoryList(res.data);
      }
    } catch (err) {
      console.error('Failed to load search history:', err);
    }
  };

  useEffect(() => {
    loadSearchHistory();
    // Default search on load
    handleSearch('London');
  }, []);

  // Sync background gradient based on weather condition
  useEffect(() => {
    if (!weather) {
      onBackgroundChange('bg-default');
      return;
    }

    const condition = weather.current.condition.toLowerCase();
    let bgClass = 'bg-default';

    if (condition.includes('clear')) {
      bgClass = 'bg-clear';
    } else if (condition.includes('cloud')) {
      bgClass = 'bg-clouds';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      bgClass = 'bg-rain';
    } else if (condition.includes('snow')) {
      bgClass = 'bg-snow';
    } else if (condition.includes('thunderstorm')) {
      bgClass = 'bg-thunderstorm';
    } else if (
      condition.includes('mist') || 
      condition.includes('fog') || 
      condition.includes('haze') || 
      condition.includes('smoke')
    ) {
      bgClass = 'bg-mist';
    }

    onBackgroundChange(bgClass);
  }, [weather, onBackgroundChange]);

  // Main search function
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const res = await weatherApi.getWeatherByCity(city);
      if (res.success) {
        setWeather(res.data);
        // Refresh history log to display the new item
        await loadSearchHistory();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'City not found. Please try another name.');
    } finally {
      setLoading(false);
    }
  };

  // Location based search function
  const handleGeoSearch = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await weatherApi.getWeatherByCoords(latitude, longitude);
          if (res.success) {
            setWeather(res.data);
            await loadSearchHistory();
          }
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch weather for your location.');
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        let msg = 'Unable to retrieve location.';
        if (err.code === 1) msg = 'Location permission denied by user.';
        setError(msg);
        setGeoLoading(false);
      },
      { timeout: 10000 }
    );
  };

  // Delete search entry
  const handleDeleteHistory = async (id) => {
    try {
      const res = await historyApi.deleteHistoryItem(id);
      if (res.success) {
        setHistoryList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      setError('Failed to delete history item.');
    }
  };

  // Clear all searches
  const handleClearHistory = async () => {
    try {
      const res = await historyApi.clearHistory();
      if (res.success) {
        setHistoryList([]);
      }
    } catch (err) {
      setError('Failed to clear search history.');
    }
  };

  return (
    <>
      <Navbar 
        onSearch={handleSearch} 
        onGeoClick={handleGeoSearch} 
        isGeoLoading={geoLoading} 
      />

      <main className="container" style={{ flexGrow: 1, padding: '24px 20px' }}>
        <ErrorMessage message={error} onClose={() => setError(null)} />

        <div className="dashboard-grid">
          {/* Sidebar Area: Recent searches */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SearchHistory 
              historyList={historyList} 
              onHistoryClick={handleSearch} 
              onDeleteItem={handleDeleteHistory}
              onClearAll={handleClearHistory}
            />
          </section>

          {/* Main Area: Weather Details */}
          <section className="main-weather-section">
            {loading ? (
              <Loader message="Fetching atmospheric data..." />
            ) : weather ? (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '24px',
                }}>
                  {/* Primary weather card */}
                  <WeatherCard weather={weather.current} />
                  
                  {/* Grid details card */}
                  <WeatherDetails weather={weather.current} />
                </div>

                {/* Forecast section */}
                <ForecastSection forecastList={weather.forecast} />
              </>
            ) : (
              <div 
                className="glass-panel"
                style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)'
                }}
              >
                <h2>No Weather Data</h2>
                <p style={{ marginTop: '8px' }}>Use the search bar above to fetch weather details for a city.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
