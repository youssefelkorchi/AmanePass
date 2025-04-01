import React from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password, score }) => {
  // If score is provided directly, use it; otherwise calculate from password
  const calculatedScore = score !== undefined ? score : password ? zxcvbn(password).score : 0;
  
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

  const getStrengthColor = (score) => {
    switch (score) {
      case 0: return '#bf616a'; // Red
      case 1: return '#d08770'; // Orange
      case 2: return '#ebcb8b'; // Yellow
      case 3: return '#a3be8c'; // Light Green
      case 4: return '#5e81ac'; // Blue/Green
      default: return '#d8dee9'; // Gray
    }
  };

  return (
    <div className="password-strength-meter">
      <div className="strength-label">
        Password Strength: <span style={{ color: getStrengthColor(calculatedScore) }}>{getStrengthLabel(calculatedScore)}</span>
      </div>
      <div className="strength-meter">
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={index} 
            className={`strength-segment ${index <= calculatedScore ? 'filled' : ''}`}
            style={{ backgroundColor: index <= calculatedScore ? getStrengthColor(calculatedScore) : undefined }}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;