const mongoose = require('mongoose');

/**
 * Breached Password Schema
 * Stores SHA-1 hashed passwords from the HIBP dataset
 */
const breachedPasswordSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    index: true // Add index for faster queries
  },
  count: {
    type: Number,
    default: 1 // How many times this password appeared in breaches
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a text index on the hash field for faster partial matching
breachedPasswordSchema.index({ hash: 'text' });

module.exports = mongoose.model('BreachedPassword', breachedPasswordSchema);