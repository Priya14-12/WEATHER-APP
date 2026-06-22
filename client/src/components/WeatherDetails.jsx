import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Gauge, ArrowDown, ArrowUp } from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const { feelsLike, humidity, windSpeed, pressure, visibility, tempMin, tempMax } = weather;

  // Convert visibility from meters to kilometers
  const visibilityKm = (visibility / 1000).toFixed(1);

  const detailItems = [
    {
      icon: <Thermometer size={24} style={{ color: '#f97316' }} />,
      label: 'Feels Like',
      value: `${Math.round(feelsLike)}°C`,
    },
    {
      icon: <Wind size={24} style={{ color: '#38bdf8' }} />,
      label: 'Wind Speed',
      value: `${windSpeed} m/s`,
    },
    {
      icon: <Droplets size={24} style={{ color: '#0ea5e9' }} />,
      label: 'Humidity',
      value: `${humidity}%`,
    },
    {
      icon: <Eye size={24} style={{ color: '#a855f7' }} />,
      label: 'Visibility',
      value: `${visibilityKm} km`,
    },
    {
      icon: <Gauge size={24} style={{ color: '#10b981' }} />,
      label: 'Pressure',
      value: `${pressure} hPa`,
    },
    {
      icon: (
        <div style={{ display: 'flex', gap: '2px' }}>
          <ArrowDown size={14} style={{ color: '#3b82f6' }} />
          <ArrowUp size={14} style={{ color: '#ef4444' }} />
        </div>
      ),
      label: 'Min / Max',
      value: `${Math.round(tempMin)}° / ${Math.round(tempMax)}°`,
    },
  ];

  return (
    <div className="stats-grid">
      {detailItems.map((item, index) => (
        <div 
          key={index} 
          className="glass-panel animate-fade-in"
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div 
            style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {item.label}
            </span>
            <span style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
