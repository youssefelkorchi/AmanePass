// Update the import section
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import BreachCheck from './components/BreachCheck';
import PasswordSuggestions from './components/PasswordSuggestions';
import PasswordInput from './components/PasswordInput'; // New import
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const checkPassword = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/check-password', { password });
      setResult(response.data);
      
      // Get password suggestions
      const suggestionsResponse = await axios.get(`/api/suggest-passwords?basePassword=${encodeURIComponent(password)}`);
      setSuggestions(suggestionsResponse.data.suggestions);
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error checking password. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword();
  };

  return (
    <div className="app">
      <header className="app-header">
        <ThemeToggle /> {/* Add the theme toggle */}
        <h1>Password Guardian</h1>
        <p className="subtitle">Check your password strength and breach status - 100% offline and private</p>
      </header>

      <main className="app-main">
        <section className="password-check-section">
          <form onSubmit={handleSubmit} className="password-form">
            <div className="input-group">
              {/* Replace the input with our new PasswordInput component */}
              <PasswordInput 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button type="submit" className="check-button" disabled={loading}>
                {loading ? 'Checking...' : 'Check Password'}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>

          {password && !result && !loading && (
            <div className="realtime-feedback">
              <PasswordStrengthMeter password={password} />
              <p className="privacy-note">
                <strong>Privacy Note:</strong> Your password is analyzed locally in your browser and is never sent to any server until you click "Check Password".
              </p>
            </div>
          )}

          {result && (
            <div className="results-container">
              <div className="result-card strength-card">
                <h2>Password Strength</h2>
                <PasswordStrengthMeter score={result.strength.score} />
                {result.strength.warning && (
                  <p className="warning">{result.strength.warning}</p>
                )}
                {result.strength.suggestions && result.strength.suggestions.length > 0 && (
                  <div className="suggestions">
                    <h3>Suggestions to improve:</h3>
                    <ul>
                      {result.strength.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="result-card breach-card">
                <h2>Breach Check</h2>
                <BreachCheck breachData={result.breach} />
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="suggestions-container">
              <h2>Alternative Strong Passwords</h2>
              <PasswordSuggestions suggestions={suggestions} />
            </div>
          )}
        </section>

        <section className="info-section">
          <div className="info-card">
            <h2>How It Works</h2>
            <p>
              Password Guardian checks your password's strength using the zxcvbn library and verifies if it has appeared in known data breaches using a local database of leaked passwords.
            </p>
            <p>
              <strong>100% Private:</strong> All processing happens locally on your device. Your passwords are never stored or sent to external servers.
            </p>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Password Guardian - A secure, offline password strength checker and breach detector</p>
        <p className="disclaimer">
          Uses the Have I Been Pwned password dataset for breach checking, in compliance with their offline use policy.
        </p>
      </footer>
    </div>
  );
}

export default App;