# AmanePass

*Password Guardian* - A secure, offline password strength checker and breach detector that respects your privacy.

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🔐 Overview

AmanePass (Password Guardian) is a comprehensive password security solution that helps users create and maintain strong, secure passwords while ensuring complete privacy. Unlike online password checkers that might compromise your security, AmanePass performs all operations locally on your device, with no data sent to external servers.

## ✨ Key Features

- **Password Strength Analysis**: Uses zxcvbn to evaluate password strength with detailed feedback
- **Offline Breach Checking**: Checks if passwords have been compromised using a local HIBP database
- **Alternative Password Suggestions**: Generates stronger password variations based on your input
- **Password Generator**: Creates strong, random passwords that meet security requirements
- **Password Insights**: Provides detailed feedback on what makes your password strong or weak
- **Password History**: Tracks your password strength improvements over time
- **Dark/Light Theme**: Choose your preferred visual theme for the application
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **100% Privacy-Focused**: All processing happens locally - no data is sent to external servers

## 🛠️ Tech Stack

AmanePass uses the following technologies:

- **Frontend**: 
  - React.js with Vite build tool
  - zxcvbn for password analysis
  - Axios for API communication
  - CSS Modules for styling
  - Font Awesome for icons

- **Backend**: 
  - Node.js with Express
  - RESTful API architecture
  - MongoDB for local database storage
  - CORS for secure cross-origin requests
  - dotenv for environment configuration

- **Security**: 
  - SHA-1 hashing for password comparison
  - HIBP dataset integration
  - crypto-js for cryptographic operations

## 📂 Project Structure

```
├── backend/           # Express server, API endpoints, and database logic
│   ├── controllers/   # Request handlers and business logic
│   ├── models/        # MongoDB schema definitions
│   ├── routes/        # API route definitions
│   ├── utils/         # Utility functions and helpers
│   ├── data/          # Breach database storage
│   └── server.js      # Main server entry point
│
├── frontend/          # React frontend application
│   ├── src/           # Source code
│   │   ├── components/# React components
│   │   ├── assets/    # Static assets
│   │   ├── App.jsx    # Main application component
│   │   └── main.jsx   # Application entry point
│   ├── index.html     # HTML entry point
│   └── vite.config.js # Vite configuration
│
├── .gitignore         # Git ignore file
├── LICENSE            # MIT license
└── README.md          # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation)
- Optional: HIBP password dataset (full or sample)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the breach database (choose one):
   - Generate test dataset (recommended for development):
     ```bash
     node utils/generateTestBreaches.js
     node utils/importBreachData.js --import
     ```
   - Or import full HIBP dataset (optional, for production):
     ```bash
     # Place downloaded HIBP dataset in backend/data/breaches
     node utils/importBreachData.js --import
     ```

4. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

> **Note**: For more detailed setup instructions, refer to the README files in the backend and frontend directories.

## 🔒 Security & Privacy

AmanePass prioritizes your security and privacy:

- **No External Requests**: All password checking happens locally
- **No Storage**: No plaintext passwords are ever stored
- **Secure Comparison**: Uses SHA-1 hash matching for breach detection
- **HIBP Compliance**: Uses HIBP dataset in compliance with their offline use policy
- **Secure Development**: Follows security best practices throughout the codebase

## 📊 How It Works

1. **Password Strength Analysis**:
   - Uses the zxcvbn library to analyze password strength
   - Provides a score from 0-4 and detailed feedback
   - Identifies common patterns, dictionary words, and predictable sequences

2. **Breach Detection**:
   - Converts password to SHA-1 hash
   - Checks against local database of breached password hashes
   - Reports if the password has appeared in known data breaches

3. **Password Suggestions**:
   - Analyzes the structure of your password
   - Suggests stronger alternatives while maintaining memorability
   - Offers completely random strong passwords as an option

## 📚 API Documentation

The backend provides several RESTful API endpoints:

- `POST /api/check-password`: Check password strength and breach status
- `GET /api/suggest-passwords`: Get alternative password suggestions
- `GET /api/generate-password`: Generate a strong random password

Refer to the backend README for detailed API documentation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [zxcvbn](https://github.com/dropbox/zxcvbn) for password strength estimation
- [Have I Been Pwned](https://haveibeenpwned.com/) for the breached passwords dataset
- [Troy Hunt](https://www.troyhunt.com/) for his work on password security