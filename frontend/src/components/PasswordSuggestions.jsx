import React, { useState } from 'react';
import './PasswordSuggestions.css';
// You'll need to install this package: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const PasswordSuggestions = ({ suggestions }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="password-suggestions">
      <p className="suggestions-intro">
        Here are some stronger alternatives based on your password pattern:
      </p>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-item">
            <div className="suggestion-content">
              <span className="suggestion-text">{suggestion}</span>
              <button 
                className="suggestion-copy-button" 
                onClick={() => copyToClipboard(suggestion, index)}
                aria-label="Copy password to clipboard"
              >
                {copiedIndex === index ? 
                  <FontAwesomeIcon icon={faCheck} /> : 
                  <FontAwesomeIcon icon={faCopy} />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordSuggestions;