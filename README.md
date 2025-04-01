# Password Guardian

A secure, offline password strength checker and breach detector that respects your privacy.

## Features

- **Password Strength Analysis**: Uses zxcvbn to evaluate password strength and provide feedback
- **Offline Breach Checking**: Checks if passwords have been compromised using a local database
- **Alternative Password Suggestions**: Generates stronger password variations
- **100% Privacy-Focused**: All processing happens locally - no data is sent to external servers

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB (local)
- **Frontend**: React.js
- **Security Libraries**: crypto-js, zxcvbn

## Project Structure

```
├── backend/           # Express server, API endpoints, and database logic
├── frontend/          # React frontend application
├── .gitignore         # Git ignore file
├── README.md          # Project documentation
```

## Installation & Setup

See the detailed setup instructions in the backend and frontend directories.

## Security & Privacy

- No plaintext passwords are ever stored
- All password checking happens locally
- Uses HIBP dataset in compliance with their offline use policy