import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        color: 'var(--text-primary)',
        width: '100%',
        marginBottom: '20px',
      }}
      className="animate-fade-in"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AlertCircle size={20} style={{ color: 'var(--danger-color)', flexShrink: 0 }} />
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{message}</span>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
