# AmanePass Frontend

This is the frontend application for **AmanePass** (Password Guardian), a secure and privacy-focused password strength checker and breach detection service.

## 🔐 Features

- **Password Strength Analysis**: Real-time visual feedback on password strength using zxcvbn
- **Breach Status Checking**: Check if your password has appeared in known data breaches
- **Password Suggestions**: Get stronger alternative password suggestions
- **Password Generator**: Create strong, random passwords
- **Password Insights**: Detailed feedback on what makes your password strong or weak
- **Password History**: Track your password strength improvements over time
- **Dark/Light Theme Toggle**: Choose your preferred visual theme
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Password Analysis**: zxcvbn
- **Icons**: Font Awesome
- **Styling**: CSS Modules

## 📦 Project Structure

```
src/
├── assets/            # Static assets like images and icons
├── components/        # React components
│   ├── BreachCheck.jsx          # Password breach status display
│   ├── Card.jsx                  # Reusable card container
│   ├── LoadingSpinner.jsx        # Loading animation
│   ├── PasswordGenerator.jsx     # Random password generator
│   ├── PasswordHistory.jsx       # Password strength history tracker
│   ├── PasswordInput.jsx         # Secure password input field
│   ├── PasswordInsights.jsx      # Detailed password analysis
│   ├── PasswordStrengthMeter.jsx # Visual strength indicator
│   ├── PasswordSuggestions.jsx   # Alternative password suggestions
│   ├── StrengthVisual.jsx        # Visual strength representation
│   └── ThemeToggle.jsx           # Dark/light mode switcher
├── App.jsx           # Main application component
├── App.css           # Application styles
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 🔄 API Integration

The frontend communicates with the backend API using Axios. The main endpoints used are:

- `POST /api/check-password`: Checks password strength and breach status
- `GET /api/suggest-passwords`: Gets alternative password suggestions

API requests are automatically proxied to the backend server (running on port 5000) during development.

## 🎨 UI Components

### Password Input
Secure input field with show/hide password toggle for better user experience.

### Password Strength Meter
Visual indicator showing password strength on a scale of 0-4, with color coding and descriptive labels.

### Breach Check
Displays whether a password has been found in known data breaches.

### Password Suggestions
Offers stronger alternatives based on the entered password.

### Password Generator
Creates random, strong passwords with configurable options.

### Theme Toggle
Allows switching between light and dark themes for user preference.

## 🔒 Security Features

- Passwords are never stored locally
- All password checking happens through secure API calls
- Visual feedback helps users understand password security

## 🧪 Development Notes

- The frontend uses Vite for fast development and optimized builds
- ESLint is configured for code quality
- The application is designed to be fully responsive

## 📝 License

MIT – See the LICENSE file in the root directory for details.