import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, country, temp, condition, description, icon, timezone } = weather;

  // Compute local time in the queried city
  const getCityLocalTime = (offsetInSeconds) => {
    const d = new Date();
    // Get UTC milliseconds
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // Add timezone offset (seconds * 1000)
    const localTime = new Date(utc + (offsetInSeconds * 1000));
    
    return localTime.toLocaleString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formattedTime = getCityLocalTime(timezone);

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* City & Country */}
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
        {name}, {country}
      </h2>

      {/* Date & Time */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>
        {formattedTime}
      </p>

      {/* Temperature & Icon */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px' 
        }}
      >
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
          alt={condition}
          style={{
            width: '120px',
            height: '120px',
            filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))',
          }}
          className="animate-pulse-slow"
        />
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <span style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1 }}>
            {Math.round(temp)}
          </span>
          <span style={{ fontSize: '28px', fontWeight: 600, marginTop: '8px' }}>
            °C
          </span>
        </div>
      </div>

      {/* Weather Condition */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, textTransform: 'capitalize' }}>
          {condition}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'capitalize' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
