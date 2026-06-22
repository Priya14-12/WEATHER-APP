import React from 'react';
import ForecastCard from './ForecastCard';

const ForecastSection = ({ forecastList }) => {
  if (!forecastList || forecastList.length === 0) return null;

  // Select 5 unique days (ideally midday forecasts)
  const getDailyForecast = (list) => {
    const dailyMap = {};
    const todayDateStr = new Date().toISOString().split('T')[0];

    list.forEach((item) => {
      const dateKey = item.dateText.split(' ')[0]; // extract 'YYYY-MM-DD'
      
      // Target midday forecast (12:00:00) for standard day weather preview
      const isMidday = item.dateText.includes('12:00:00');
      
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = item;
      } else if (isMidday) {
        dailyMap[dateKey] = item;
      }
    });

    const dailyList = Object.values(dailyMap).sort((a, b) => a.dt - b.dt);
    
    // Exclude current day to show 5 upcoming days
    const filteredList = dailyList.filter((item) => {
      const itemDateStr = item.dateText.split(' ')[0];
      return itemDateStr !== todayDateStr;
    });

    // Fallback if filtering out today leaves too few items
    const finalDays = filteredList.length >= 5 ? filteredList : dailyList;
    return finalDays.slice(0, 5);
  };

  const fiveDayForecast = getDailyForecast(forecastList);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.2px' }}>
        5-Day Forecast
      </h3>
      <div className="forecast-grid">
        {fiveDayForecast.map((day, index) => (
          <ForecastCard 
            key={day.dt} 
            dayData={day} 
            delay={0.1 + index * 0.05} 
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
