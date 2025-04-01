import React from 'react';
import './BreachCheck.css';

const BreachCheck = ({ breachData }) => {
  if (!breachData) return null;

  const { found, message } = breachData;

  return (
    <div className={`breach-check ${found ? 'breach-found' : 'breach-safe'}`}>
      <div className="breach-icon">
        {found ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z" />
          </svg>
        )}
      </div>
      <div className="breach-message">{message}</div>
    </div>
  );
};

export default BreachCheck;