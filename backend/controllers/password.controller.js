const zxcvbn = require('zxcvbn');
const crypto = require('crypto-js');
const BreachedPassword = require('../models/breachedPassword.model');

/**
 * Check if a password is strong and if it has been leaked
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.checkPassword = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // Check password strength using zxcvbn
    const strengthResult = zxcvbn(password);
    
    // Hash the password with SHA-1 (to match HIBP format)
    const hashedPassword = crypto.SHA1(password).toString().toUpperCase();
    
    // Check if password exists in breach database
    const isBreached = await BreachedPassword.exists({ hash: hashedPassword });
    
    return res.json({
      success: true,
      strength: {
        score: strengthResult.score, // 0-4 (0 = very weak, 4 = very strong)
        feedback: strengthResult.feedback,
        crackTimeDisplay: strengthResult.crack_times_display,
        warning: strengthResult.feedback.warning,
        suggestions: strengthResult.feedback.suggestions
      },
      breach: {
        found: !!isBreached,
        message: isBreached 
          ? 'This password has been found in data breaches. You should change it immediately.'
          : 'Good news! This password was not found in our breach database.'
      }
    });
  } catch (error) {
    console.error('Error checking password:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while checking password'
    });
  }
};

/**
 * Generate alternative strong password suggestions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.suggestPasswords = (req, res) => {
  try {
    const { basePassword } = req.query;
    
    // Generate password suggestions
    const suggestions = generateStrongPasswords(basePassword);
    
    return res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Error suggesting passwords:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while suggesting passwords'
    });
  }
};

/**
 * Generate strong password variations
 * @param {string} basePassword - Optional base password to create variations from
 * @returns {Array} Array of password suggestions
 */
const generateStrongPasswords = (basePassword) => {
  const suggestions = [];
  
  // If no base password provided, generate completely new passwords
  if (!basePassword) {
    // Generate random passwords with different patterns
    suggestions.push(generateRandomPassword(16, true, true, true, true)); // Complex
    suggestions.push(generateRandomPassword(12, true, true, true, false)); // No special chars
    suggestions.push(generateRandomPassword(14, true, true, false, true)); // No numbers
    suggestions.push(generateMemorablePassword());
    suggestions.push(generatePassphrase());
    return suggestions;
  }
  
  // Create variations based on the provided password
  // 1. Add special characters
  suggestions.push(addSpecialChars(basePassword));
  
  // 2. Replace letters with numbers/symbols (l33t speak)
  suggestions.push(leetSpeak(basePassword));
  
  // 3. Add random numbers to the end
  suggestions.push(basePassword + Math.floor(Math.random() * 10000));
  
  // 4. Capitalize random letters
  suggestions.push(randomCapitalize(basePassword));
  
  // 5. Add a completely random password
  suggestions.push(generateRandomPassword(16, true, true, true, true));
  
  return suggestions;
};

/**
 * Generate a random password
 * @param {number} length - Length of the password
 * @param {boolean} useLower - Include lowercase letters
 * @param {boolean} useUpper - Include uppercase letters
 * @param {boolean} useNumbers - Include numbers
 * @param {boolean} useSpecial - Include special characters
 * @returns {string} Generated password
 */
const generateRandomPassword = (length = 16, useLower = true, useUpper = true, useNumbers = true, useSpecial = true) => {
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let chars = '';
  if (useLower) chars += lowerChars;
  if (useUpper) chars += upperChars;
  if (useNumbers) chars += numberChars;
  if (useSpecial) chars += specialChars;
  
  if (chars.length === 0) chars = lowerChars + upperChars + numberChars;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  return password;
};

/**
 * Generate a memorable password using words and numbers
 * @returns {string} Memorable password
 */
const generateMemorablePassword = () => {
  const adjectives = ['Happy', 'Brave', 'Bright', 'Calm', 'Clever', 'Eager', 'Gentle', 'Jolly', 'Kind', 'Lively'];
  const nouns = ['Tiger', 'Mountain', 'River', 'Forest', 'Ocean', 'Desert', 'Planet', 'Galaxy', 'Thunder', 'Rainbow'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  const special = ['!', '@', '#', '$', '%', '&'][Math.floor(Math.random() * 6)];
  
  return `${adjective}${noun}${number}${special}`;
};

/**
 * Generate a passphrase from random words
 * @returns {string} Passphrase
 */
const generatePassphrase = () => {
  const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'watermelon', 'zucchini', 'almond', 'bread', 'cheese',
    'donut', 'egg', 'fudge', 'garlic', 'honey', 'ice', 'jam', 'kale', 'lentil'
  ];
  
  let passphrase = '';
  for (let i = 0; i < 4; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    passphrase += word.charAt(0).toUpperCase() + word.slice(1);
    if (i < 3) passphrase += '-';
  }
  
  // Add a number and special character for extra security
  passphrase += Math.floor(Math.random() * 100) + '!';
  
  return passphrase;
};

/**
 * Add special characters to a password
 * @param {string} password - Base password
 * @returns {string} Enhanced password
 */
const addSpecialChars = (password) => {
  const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
  let enhanced = password;
  
  // Add 2-3 special characters at random positions
  for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
    const pos = Math.floor(Math.random() * enhanced.length);
    const char = specialChars[Math.floor(Math.random() * specialChars.length)];
    enhanced = enhanced.slice(0, pos) + char + enhanced.slice(pos);
  }
  
  return enhanced;
};

/**
 * Convert a password to leet speak (replace letters with numbers/symbols)
 * @param {string} password - Base password
 * @returns {string} Leet speak password
 */
const leetSpeak = (password) => {
  const leetMap = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0',
    'l': '1',
    's': '5',
    't': '7',
    'b': '8',
    'g': '9'
  };
  
  let leetPassword = '';
  for (let i = 0; i < password.length; i++) {
    const char = password[i].toLowerCase();
    leetPassword += leetMap[char] || password[i];
  }
  
  return leetPassword;
};

/**
 * Randomly capitalize letters in a password
 * @param {string} password - Base password
 * @returns {string} Password with random capitalization
 */
const randomCapitalize = (password) => {
  let result = '';
  for (let i = 0; i < password.length; i++) {
    if (Math.random() > 0.5) {
      result += password[i].toUpperCase();
    } else {
      result += password[i].toLowerCase();
    }
  }
  return result;
};