# Password Guardian Backend

This is the backend server for **Password Guardian**, a secure and privacy-first password strength checker and breach detection service.

## Features

- Password strength analysis using `zxcvbn`
- Offline breach checking using the HIBP dataset (Have I Been Pwned)
- Secure password handling with SHA-1 hash matching
- Alternative password suggestions
- RESTful API for seamless frontend integration

---

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation)
- Optional: Full or sample **HIBP password dataset**

---

## Installation

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   - A preconfigured `.env` file is included for local development.
   - Modify it as needed to match your environment.

3. Download or generate breach data (see instructions below).

---

## 🔐 Breach Detection Feature

Password Guardian includes a powerful local breach detection engine based on the **Have I Been Pwned** (HIBP) password dataset.

### How It Works

- Passwords are **never stored or sent externally**.
- On each check, the input password is:
  1. Hashed using **SHA-1**
  2. Matched against a **local database** of breached password hashes
- If a match is found, the user is alerted that the password is unsafe.

### Breach Data Format

The breach database follows this format:

```
<40-char SHA-1 hash>:<count>
```

Example:
```
B1B3773A05C0ED0176787A4F1574FF0075F7521E:8215245
```

- `B1B377...`: SHA-1 hash of the breached password
- `8215245`: Number of times this password appeared in breaches

---

## 📦 HIBP Password Dataset

The HIBP dataset powers the breach detection system.

### Official Source

- Download the full dataset from:  
  👉 [haveibeenpwned.com/Passwords](https://haveibeenpwned.com/Passwords)

### Options

1. **Full Dataset**:
   - Contains over 600 million SHA-1 hashed passwords
   - Size: ~10GB compressed, 25GB+ uncompressed
   - Suitable for production use

2. **Test Dataset** (Recommended for development):
   - Lightweight sample with commonly breached passwords
   - No need to download the full HIBP set

### Generate Test Dataset

You can generate a local test dataset for development:

```bash
# From the backend directory
node utils/generateTestBreaches.js
node utils/importBreachData.js --import
```

### Import Full Dataset (Optional)

If you downloaded the official dataset:

```bash
# Place the unzipped file in: backend/data/breaches
# Then import into MongoDB
node utils/importBreachData.js --import
```

> **Note**: Full import may take several hours. The script can be safely resumed if interrupted.

---

## 🚀 Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will start on:  
📍 `http://localhost:5000`

---

## 📡 API Endpoints

### `POST /api/check-password`

Check password strength and breach status.

**Request:**

```json
{
  "password": "your-password-here"
}
```

**Response:**

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

---

### `GET /api/suggest-passwords?basePassword=optional-base-password`

Generate password suggestions based on a base word.

**Response:**

```json
{
  "success": true,
  "suggestions": [
    "StrongPassword123!",
    "basePassword$2024",
    ...
  ]
}
```

---

## 🔒 Security Notes

- Passwords are never logged or stored
- SHA-1 is used only for matching the HIBP dataset
- All checks are performed **locally** to protect user privacy

---

## ⚙️ Performance Tips

- Use the full dataset in production for accurate breach detection
- For development, the test dataset is fast and lightweight
- Ensure MongoDB indexes are properly configured for efficient lookups

---

## License

MIT – Built with 💙 to keep users safe from breached passwords.