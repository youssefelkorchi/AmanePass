// Update the import section
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import BreachCheck from './components/BreachCheck';
import PasswordSuggestions from './components/PasswordSuggestions';
import PasswordInput from './components/PasswordInput';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import PasswordGenerator from './components/PasswordGenerator';
import PasswordInsights from './components/PasswordInsights';
import PasswordHistory from './components/PasswordHistory';
import StrengthVisual from './components/StrengthVisual';
import zxcvbn from 'zxcvbn';
function App() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  
  // Add a ref for the history component
  const historyRef = useRef(null);

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
      
      // Add to history after successful check
      if (historyRef.current && response.data.strength.score !== undefined) {
        historyRef.current.addToHistory(response.data.strength.score);
      }
      
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

  const handleSubmit = async (e) => {
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
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="button-text">Checking...</span>
                  </>
                ) : (
                  'Check Password'
                )}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>

          {password && !result && !loading && (
            <div className="realtime-feedback">
              <StrengthVisual score={zxcvbn(password).score} />
              <PasswordInsights 
                password={password} 
                strength={zxcvbn(password)} 
              />
              <p className="privacy-note">
                <strong>Privacy Note:</strong> Your password is analyzed locally in your browser and is never sent to any server until you click "Check Password".
              </p>
            </div>
          )}

          {result && (
            <div className="results-container">
              <Card 
                title="Password Strength" 
                accentColor={getStrengthColor(result.strength.score)}
                className="strength-card"
              >
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
              </Card>

              <Card 
                title="Breach Check" 
                accentColor={result.breach.found ? 'var(--danger-color)' : 'var(--success-color)'}
                className="breach-card"
              >
                <BreachCheck breachData={result.breach} />
              </Card>
            </div>
          )}

          {suggestions.length > 0 && (
            <Card 
              title="Alternative Strong Passwords" 
              accentColor="var(--accent-color)"
              className="suggestions-container"
            >
              <PasswordSuggestions suggestions={suggestions} />
            </Card>
          )}
        </section>

        <section className="info-section">
          <Card title="How It Works" accentColor="var(--secondary-color)">
            <p>
              Password Guardian checks your password's strength using the zxcvbn library and verifies if it has appeared in known data breaches using a local database of leaked passwords.
            </p>
            <p>
              <strong>100% Private:</strong> All processing happens locally on your device. Your passwords are never stored or sent to external servers.
            </p>
          </Card>
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

// Add this helper function
function getStrengthColor(score) {
  switch (score) {
    case 0: return 'var(--danger-color)';
    case 1: return '#d08770';
    case 2: return 'var(--warning-color)';
    case 3: return 'var(--success-color)';
    case 4: return 'var(--primary-color)';
    default: return 'var(--primary-color)';
  }
}

export default App;