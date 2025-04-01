# Password Guardian Backend

This is the backend server for Password Guardian, a secure, offline password strength checker and breach detector.

## Features

- Password strength analysis using zxcvbn
- Local breach checking using HIBP dataset
- Alternative password suggestions
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation)
- Have I Been Pwned password dataset (instructions below)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   - The `.env` file is already configured for local development
   - Modify as needed for your environment

3. Download and import the HIBP password dataset:

```bash
# First run this to get instructions
node utils/importBreachData.js

# After downloading the dataset manually, run:
node utils/importBreachData.js --import
```

## Running the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on port 5000 by default (http://localhost:5000).

## API Endpoints

### Check Password

```
POST /api/check-password
```

Request body:
```json
{
  "password": "your-password-here"
}
```

Response:
```json
{
  "success": true,
  "strength": {
    "score": 3,
    "feedback": { ... },
    "crackTimeDisplay": { ... },
    "warning": "...",
    "suggestions": [ ... ]
  },
  "breach": {
    "found": false,
    "message": "Good news! This password was not found in our breach database."
  }
}
```

### Suggest Passwords

```
GET /api/suggest-passwords?basePassword=optional-base-password
```

Response:
```json
{
  "success": true,
  "suggestions": [
    "StrongPassword123!",
    "..."
  ]
}
```

## Security Notes

- Passwords are never stored in the database
- All password checking happens locally
- SHA-1 hashing is used only to match the HIBP dataset format