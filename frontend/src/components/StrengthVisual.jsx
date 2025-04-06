import React from 'react';
import './StrengthVisual.css';

const StrengthVisual = ({ score }) => {
  const getStrengthColor = (score) => {
    switch (score) {
      case 0: return 'var(--danger-color)';
      case 1: return '#d08770';
      case 2: return 'var(--warning-color)';
      case 3: return 'var(--success-color)';
      case 4: return 'var(--primary-color)';
      default: return 'var(--border-color)';
    }
  };

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return 'None';
    }
  };

  const getCrackTime = (score) => {
    switch (score) {
      case 0: return 'Instantly';
      case 1: return 'Within minutes';
      case 2: return 'Several hours to days';
      case 3: return 'Weeks to months';
      case 4: return 'Years to centuries';
      default: return 'Unknown';
    }
  };

  return (
    <div className="strength-visual">
      <div className="strength-header">
        <span className="strength-label">Password Strength:</span>
        <span className="strength-value" style={{ color: getStrengthColor(score) }}>
          {getStrengthLabel(score)}
        </span>
      </div>
      
      <div className="password-strength-visual">
        {[0, 1, 2, 3, 4].map((level) => (
          <div 
            key={level}
            className={`strength-segment ${level <= score ? 'active' : ''}`}
            style={{ 
              backgroundColor: level <= score ? getStrengthColor(score) : undefined,
              width: `${100/5}%`
            }}
          />
        ))}
      </div>
      
      <div className="crack-time">
        <span className="crack-label">Estimated time to crack:</span>
        <span className="crack-value">{getCrackTime(score)}</span>
      </div>
    </div>
  );
};

export default StrengthVisual;