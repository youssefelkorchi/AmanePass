import React, { useState } from 'react';
import './PasswordSuggestions.css';

const PasswordSuggestions = ({ suggestions }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="password-suggestions">
      <p className="suggestions-intro">
        Here are some strong password alternatives you can use:
      </p>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-item">
            <code className="suggestion-text">{suggestion}</code>
            <button 
              className="copy-button" 
              onClick={() => copyToClipboard(suggestion, index)}
              aria-label="Copy password"
            >
              {copiedIndex === index ? (
                <span className="copied-text">Copied!</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3zm0 2H5v12h10v-2H7V8zm2-2h8v10h2V4H9v2z" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
      <p className="suggestions-note">
        <strong>Note:</strong> Click on any password to copy it to your clipboard.
      </p>
    </div>
  );
};

export default PasswordSuggestions;