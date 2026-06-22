import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CloudSun, Search, MapPin, Sun, Moon } from 'lucide-react';

const Navbar = ({ onSearch, onGeoClick, isGeoLoading }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <header 
      className="glass-panel"
      style={{
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0 0 20px 20px',
        borderTop: 'none',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand logo */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          cursor: 'pointer'
        }}
        onClick={() => onSearch('London')}
      >
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-color) 0%, #3b82f6 100%)',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)'
        }}>
          <CloudSun size={24} />
        </div>
        <span style={{
          fontSize: '20px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-color) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ClimaGlass
        </span>
      </div>

      {/* Search Input Bar */}
      <form 
        onSubmit={handleSearchSubmit}
        style={{
          display: 'flex',
          flex: '1 1 300px',
          maxWidth: '450px',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search city weather..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="glass-input"
          style={{ paddingRight: '48px' }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '4px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-quick)'
          }}
          className="search-btn-icon"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Control Actions (Geolocation + Dark Mode) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onGeoClick}
          disabled={isGeoLoading}
          className="glass-button"
          title="Use My Location"
        >
          <MapPin size={18} className={isGeoLoading ? 'animate-pulse-slow' : ''} />
          <span className="geo-btn-text" style={{ display: 'inline' }}>
            {isGeoLoading ? 'Locating...' : 'My Location'}
          </span>
        </button>

        {/* Theme Switcher Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sun size={16} style={{ color: theme === 'light' ? 'var(--accent-color)' : 'var(--text-secondary)' }} />
          <label className="theme-switch">
            <input 
              type="checkbox" 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
            <span className="switch-slider"></span>
          </label>
          <Moon size={16} style={{ color: theme === 'dark' ? 'var(--accent-color)' : 'var(--text-secondary)' }} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
