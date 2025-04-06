import React, { useState, useEffect } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <p>Create strong, unique passwords with customizable options</p>

      <div className="generated-password">
        {password}
        <button 
          className="copy-button" 
          onClick={copyToClipboard}
          aria-label="Copy password to clipboard"
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>

      <div className="generator-controls">
        <div className="control-group">
          <label htmlFor="length">Length: {length}</label>
          <input
            type="range"
            id="length"
            className="range-slider"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              <span className="toggle-slider"></span>
            </div>
            Uppercase Letters (A-Z)
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              <span className="toggle-slider"></span>
            </div>
            Lowercase Letters (a-z)
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <span className="toggle-slider"></span>
            </div>
            Numbers (0-9)
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <span className="toggle-slider"></span>
            </div>
            Special Characters (!@#$%^&*)
          </label>
        </div>
      </div>

      <button className="generate-button" onClick={generatePassword}>
        Generate New Password
      </button>
    </div>
  );
};

export default PasswordGenerator;