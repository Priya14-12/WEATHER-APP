import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Fetching weather data...' }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        width: '100%',
      }}
      className="glass-panel animate-fade-in"
    >
      <Loader2 className="animate-spin-fast" size={48} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
      <p style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '16px' }}>
        {message}
      </p>
    </div>
  );
};

export default Loader;
