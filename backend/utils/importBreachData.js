/**
 * Import Breached Passwords Script
 * 
 * This script downloads and imports the Have I Been Pwned (HIBP) password dataset
 * into MongoDB. It processes the SHA-1 hashed passwords and stores them in the
 * database for local breach checking.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');
const mongoose = require('mongoose');
const BreachedPassword = require('../models/breachedPassword.model');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/password-guardian';

// HIBP data file paths
const DATA_DIR = path.join(__dirname, '../data/breaches');
const DOWNLOAD_PATH = path.join(DATA_DIR, 'pwned-passwords-sha1-ordered-by-count.txt');

/**
 * Ensure the data directory exists
 */
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    console.log('Creating data directory...');
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

/**
 * Download the HIBP password dataset
 * Note: This is a simplified example. The actual HIBP dataset is very large.
 * In practice, you would download the torrent or use their API with k-anonymity.
 */
const downloadHIBPDataset = () => {
  return new Promise((resolve, reject) => {
    console.log('This is a placeholder for downloading the HIBP dataset.');
    console.log('In a real implementation, you would:');
    console.log('1. Download the dataset from https://haveibeenpwned.com/Passwords');
    console.log('2. Extract the downloaded file');
    console.log('3. Place it in the data/breaches directory');
    console.log('\nFor this demo, please manually download the dataset from:');
    console.log('https://haveibeenpwned.com/Passwords');
    console.log('\nAfter downloading, place the extracted file at:');
    console.log(DOWNLOAD_PATH);
    console.log('\nThen run this script again with the --import flag.');
    
    // Create a small sample file for testing if it doesn't exist
    if (!fs.existsSync(DOWNLOAD_PATH)) {
      const sampleData = [
        '7C4A8D09CA3762AF61E59520943DC26494F8941B:24230577', // 123456
        '5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8:3752262',  // password
        'B1B3773A05C0ED0176787A4F1574FF0075F7521E:3226306',  // qwerty
        'F7C3BC1D808E04732ADF679965CCC34CA7AE3441:2562301',  // 12345678
        '5CB138284D431ABB5C229ED018E70D5C05FC5A8E:1648964',  // 111111
        '6367C48DD193D56EA7B0BAAD25B19455E529F5EE:1384963',  // abc123
        'E38AD214943DAAD1D64C102FAEC29DE4AFE9DA3D:1162145',  // 123123
        '8CB2237D0679CA88DB6464EAC60DA96345513964:1070342',  // 12345
        '3D4F2BF07DC1BE38B20CD6E46949A1071F9D0E3D:1014566',  // 1234567
        '7110EDA4D09E062AA5E4A390B0A572AC0D2C0220:994684'   // 1234
      ];
      
      fs.writeFileSync(DOWNLOAD_PATH, sampleData.join('\n'));
      console.log('\nCreated a small sample dataset for testing purposes.');
    }
    
    resolve();
  });
};

/**
 * Import the HIBP dataset into MongoDB
 */
const importDataset = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check if file exists
    if (!fs.existsSync(DOWNLOAD_PATH)) {
      console.error('Error: HIBP dataset file not found.');
      console.log('Please download the dataset first.');
      process.exit(1);
    }
    
    console.log('Starting import process...');
    console.log('This may take a while for the full dataset.');
    
    // Create read stream and interface
    const fileStream = fs.createReadStream(DOWNLOAD_PATH);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    let count = 0;
    const batchSize = 1000;
    let batch = [];
    
    // Process each line
    for await (const line of rl) {
      // Format: SHA1:COUNT
      const [hash, occurrences] = line.split(':');
      
      batch.push({
        hash,
        count: parseInt(occurrences, 10)
      });
      
      count++;
      
      // Process in batches for better performance
      if (batch.length >= batchSize) {
        await BreachedPassword.insertMany(batch, { ordered: false })
          .catch(err => {
            // Ignore duplicate key errors
            if (err.code !== 11000) {
              console.error('Error importing batch:', err);
            }
          });
        
        batch = [];
        console.log(`Processed ${count} passwords...`);
      }
    }
    
    // Insert any remaining passwords
    if (batch.length > 0) {
      await BreachedPassword.insertMany(batch, { ordered: false })
        .catch(err => {
          if (err.code !== 11000) {
            console.error('Error importing remaining batch:', err);
          }
        });
    }
    
    console.log(`Import completed! Processed ${count} passwords.`);
    
  } catch (error) {
    console.error('Error importing dataset:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

/**
 * Main function
 */
const main = async () => {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const shouldImport = args.includes('--import');
  
  // Ensure data directory exists
  ensureDataDir();
  
  if (shouldImport) {
    // Import dataset
    await importDataset();
  } else {
    // Download dataset
    await downloadHIBPDataset();
  }
};

// Run the script
main().catch(console.error);

/**
 * Usage instructions:
 * 
 * 1. First run to set up and get download instructions:
 *    node importBreachData.js
 * 
 * 2. After manually downloading the dataset, run with --import flag:
 *    node importBreachData.js --import
 */