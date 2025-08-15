# Dating App - Complete macOS Setup Guide

This guide provides step-by-step instructions to set up and run the React Native dating app on macOS using Visual Studio Code.

## 📋 Prerequisites

### 1. Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Node.js (v18 or higher)
```bash
brew install node
# Verify installation
node --version  # Should be v18+
npm --version
```

### 3. Install Visual Studio Code
Download from: https://code.visualstudio.com/download

### 4. Install React Native CLI
```bash
npm install -g @react-native-community/cli
```

### 5. Install iOS Development Tools (for iOS testing)
- Install Xcode from App Store
- Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### 6. Install Android Development Tools (for Android testing)
- Install Android Studio from: https://developer.android.com/studio
- Follow React Native environment setup: https://reactnative.dev/docs/environment-setup

## 🚀 Project Setup

### 1. Clone and Navigate to Project
```bash
# Navigate to your project directory
cd path/to/your/dating-app-project
```

### 2. Install Backend Dependencies
```bash
# Install main project dependencies
npm install
```

### 3. Install React Native App Dependencies
```bash
# Navigate to React Native app
cd mobile/DatingApp

# Install React Native dependencies
npm install

# Install iOS dependencies (iOS only)
cd ios && pod install && cd ..
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend API Server
```bash
# In the root project directory
npm run dev
```
✅ Backend will be running on: http://localhost:5000

### 2. Running React Native Web (Desktop Testing)
```bash
# In mobile/DatingApp directory
npm run web
```
✅ Web app will be running on: http://localhost:3000

### 3. Running on Mobile Devices

#### iOS Simulator
```bash
# In mobile/DatingApp directory
npm run ios
```

#### Android Emulator
```bash
# In mobile/DatingApp directory
npm run android
```

#### Physical Devices
```bash
# Start Metro bundler
npm start

# Then scan QR code with device or follow device-specific instructions
```

## 🛠 Visual Studio Code Setup

### 1. Recommended Extensions
Install these VS Code extensions:
- **React Native Tools** - Microsoft
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Hero**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**

### 2. Configure VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 3. Configure Launch Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React Native",
      "type": "reactnative",
      "request": "launch",
      "platform": "ios",
      "sourceMaps": true,
      "outDir": "${workspaceFolder}/.vscode/.react"
    }
  ]
}
```

## 📁 Project Structure

```
dating-app/
├── mobile/DatingApp/          # React Native mobile app
│   ├── src/
│   │   ├── screens/           # App screens (Home, Matches, Chat, Profile)
│   │   ├── components/        # Reusable components (SwipeCard, etc.)
│   │   ├── navigation/        # Navigation setup
│   │   ├── lib/              # API client and utilities
│   │   └── shared/           # Shared types and schemas
│   ├── web/                  # React Native Web setup
│   ├── ios/                  # iOS native files
│   ├── android/              # Android native files
│   └── package.json
├── server/                   # Backend API
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   └── storage.ts           # Data storage
├── shared/                   # Shared TypeScript types
└── package.json             # Backend dependencies
```

## 🧪 Testing the Setup

### 1. Verify Backend API
```bash
# Test venues endpoint
curl http://localhost:5000/api/venues

# Test swipe creation
curl -X POST http://localhost:5000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiperId":"demo-user-123","swipedId":"demo-user-456","venueId":"test-venue","isLike":true}'
```

### 2. Test React Native Web
1. Open http://localhost:3000 in browser
2. Should see mobile-style app interface
3. Test navigation between tabs

### 3. Test Mobile App
1. Run on simulator/emulator
2. Verify all screens load correctly
3. Test touch interactions and gestures

## 🔧 Development Workflow

### 1. Backend Development
```bash
# Make changes to server/ files
# Server auto-restarts with tsx
npm run dev
```

### 2. Mobile App Development
```bash
# In mobile/DatingApp directory

# For React Native Web development
npm run web

# For mobile development
npm start  # Start Metro bundler
npm run ios     # Run on iOS
npm run android # Run on Android
```

### 3. Database Operations
```bash
# Push database schema changes
npm run db:push
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For React Native app
cd mobile/DatingApp
rm -rf node_modules package-lock.json  
npm install
```

#### 2. iOS Pod Installation Issues
```bash
cd mobile/DatingApp/ios
pod deintegrate
pod install
```

#### 3. Android Build Issues
```bash
cd mobile/DatingApp/android
./gradlew clean
cd ..
npm run android
```

#### 4. Metro Bundler Issues
```bash
cd mobile/DatingApp
npx react-native start --reset-cache
```

#### 5. Port Already in Use
```bash
# Kill processes on ports 5000 or 3000
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

## 🚀 Deployment Preparation

### 1. Web Deployment
```bash
cd mobile/DatingApp
npm run web:build
# Deploy web-build/ directory to hosting service
```

### 2. Mobile App Store Deployment
- **iOS**: Archive in Xcode and submit to App Store Connect
- **Android**: Generate signed APK/AAB in Android Studio

## 📊 API Endpoints

### Available Endpoints
- `GET /api/venues` - Get all venues
- `GET /api/venues/:id` - Get specific venue
- `GET /api/users/:id/discover/:venueId` - Discover users at venue
- `POST /api/swipes` - Create a swipe
- `GET /api/users/:id/matches` - Get user matches
- `POST /api/matches/:id/messages` - Send message
- `POST /api/quick-offers` - Send quick offer

## 🎯 Next Steps

1. **Start Development**: Follow the running instructions above
2. **Customize Features**: Modify screens and components in `mobile/DatingApp/src/`
3. **Add Real Data**: Replace demo data with real user authentication
4. **Deploy**: Follow deployment steps when ready for production

## 🆘 Getting Help

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **React Navigation**: https://reactnavigation.org/docs/getting-started
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**🎉 You're all set!** Your React Native dating app should now be running on both web and mobile platforms.