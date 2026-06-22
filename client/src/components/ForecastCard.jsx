import React from 'react';

const ForecastCard = ({ dayData, delay }) => {
  const { dt, temp, condition, icon } = dayData;

  // Format timestamp into short weekday name (e.g., Mon, Tue)
  const getWeekday = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format timestamp into date string (e.g., Jun 22)
  const getDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '6px',
        animationDelay: `${delay}s`,
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600 }}>
        {getWeekday(dt)}
      </span>
      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {getDateString(dt)}
      </span>

      <img 
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
        alt={condition}
        style={{
          width: '64px',
          height: '64px',
          filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
        }}
      />

      <span style={{ fontSize: '20px', fontWeight: 700 }}>
        {Math.round(temp)}°C
      </span>
      
      <span style={{ 
        fontSize: '12px', 
        fontWeight: 500, 
        textTransform: 'capitalize', 
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%'
      }}>
        {condition}
      </span>
    </div>
  );
};

export default ForecastCard;
