import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './PasswordHistory.css';

const PasswordHistory = forwardRef(({ onSelectPassword }, ref) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('passwordHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (score, timestamp = new Date().toISOString()) => {
    const newEntry = { score, timestamp };
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep only last 10 entries
    setHistory(updatedHistory);
    localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('passwordHistory');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getScoreLabel = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return 'Unknown';
    }
  };

  // Expose addToHistory method to parent component
  useImperativeHandle(ref, () => ({
    addToHistory
  }));

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="password-history">
      <div className="history-title">
        <h2>Password Check History</h2>
        <button className="history-clear" onClick={clearHistory}>Clear History</button>
      </div>
      
      <div className="history-items">
        {history.map((entry, index) => (
          <div key={index} className="history-item">
            <div className="history-date">{formatDate(entry.timestamp)}</div>
            <div className="history-score">
              <div className={`score-badge score-${entry.score}`}>{entry.score}</div>
              <div>{getScoreLabel(entry.score)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PasswordHistory;