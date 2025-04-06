import React from 'react';
import './PasswordInsights.css';

const PasswordInsights = ({ password, strength }) => {
  if (!password || !strength) return null;

  const getInsights = () => {
    const insights = [];
    
    // Length check
    if (password.length < 8) {
      insights.push({
        type: 'bad',
        text: 'Password is too short. Use at least 8 characters.'
      });
    } else if (password.length >= 12) {
      insights.push({
        type: 'good',
        text: 'Good password length. Longer passwords are harder to crack.'
      });
    }
    
    // Character variety
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    
    const charTypes = [hasUppercase, hasLowercase, hasNumbers, hasSymbols];
    const charTypeCount = charTypes.filter(Boolean).length;
    
    if (charTypeCount < 3) {
      insights.push({
        type: 'warning',
        text: 'Use a mix of uppercase, lowercase, numbers, and symbols.'
      });
    } else {
      insights.push({
        type: 'good',
        text: 'Good character variety. Using different types of characters increases security.'
      });
    }
    
    // Common patterns
    if (/^[A-Z][a-z]+\d{1,4}$/.test(password)) {
      insights.push({
        type: 'warning',
        text: 'Follows a common pattern (Word + Numbers). Try a more random arrangement.'
      });
    }
    
    // Repeating characters
    if (/(.)\1{2,}/.test(password)) {
      insights.push({
        type: 'warning',
        text: 'Contains repeating characters, which weakens your password.'
      });
    }
    
    // Sequential characters
    const sequences = ['abcdef', '123456', 'qwerty'];
    for (const seq of sequences) {
      if (password.toLowerCase().includes(seq)) {
        insights.push({
          type: 'bad',
          text: 'Contains sequential characters, which are easy to guess.'
        });
        break;
      }
    }
    
    // Add strength-based insight
    if (strength.score <= 1) {
      insights.push({
        type: 'bad',
        text: 'This password could be cracked quickly. Consider using our password generator.'
      });
    } else if (strength.score >= 3) {
      insights.push({
        type: 'good',
        text: 'Strong password! It would take significant resources to crack this password.'
      });
    }
    
    return insights;
  };

  const insights = getInsights();

  return (
    <div className="strength-insights">
      <h3>Password Analysis</h3>
      {insights.map((insight, index) => (
        <div key={index} className="insight-item">
          <div className={`insight-icon ${insight.type}`}>
            {insight.type === 'good' && '✓'}
            {insight.type === 'warning' && '!'}
            {insight.type === 'bad' && '✗'}
          </div>
          <div className="insight-text">{insight.text}</div>
        </div>
      ))}
    </div>
  );
};

export default PasswordInsights;