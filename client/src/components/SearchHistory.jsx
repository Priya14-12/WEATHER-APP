import React from 'react';
import { Trash2, History, Trash } from 'lucide-react';

const SearchHistory = ({ historyList, onHistoryClick, onDeleteItem, onClearAll }) => {
  
  // Format timestamp into relative or readable format
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        minHeight: '280px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} style={{ color: 'var(--accent-color)' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Searches</h3>
        </div>
        {historyList.length > 0 && (
          <button
            onClick={onClearAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--danger-color)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'var(--transition-quick)'
            }}
            className="clear-all-btn"
          >
            <Trash size={12} />
            Clear
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            color: 'var(--text-secondary)',
            fontSize: '14px',
            textAlign: 'center',
            padding: '32px 16px',
            border: '2px dashed var(--glass-border)',
            borderRadius: '16px'
          }}
        >
          <p>No recent searches.</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Cities you search will appear here.</p>
        </div>
      ) : (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}
        >
          {historyList.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                transition: 'var(--transition-quick)',
                cursor: 'pointer',
              }}
              className="history-item-row"
              onClick={() => onHistoryClick(item.cityName)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.cityName}{item.country ? `, ${item.country}` : ''}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {formatTime(item.createdAt)}
                </span>
              </div>

              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={(e) => e.stopPropagation()} // Prevent triggering search on delete click
              >
                {item.temp !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.icon && (
                      <img 
                        src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                        alt={item.condition} 
                        style={{ width: '28px', height: '28px' }}
                      />
                    )}
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>
                      {Math.round(item.temp)}°C
                    </span>
                  </div>
                )}
                
                <button
                  onClick={() => onDeleteItem(item._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-quick)',
                  }}
                  className="history-delete-btn"
                  title="Remove search"
                >
                  <Trash2 size={14} className="trash-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
