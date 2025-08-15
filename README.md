# Dating App - Npm Workspace Setup Guide

This is a location-based dating application built with React Native (mobile + web) and Express.js backend using npm workspaces for dependency management.

## 📋 Prerequisites

### 1. Install Node.js (v18 or higher)
```bash
# macOS with Homebrew
brew install node

# Verify installation
node --version  # Should be v18+
npm --version
```

### 2. Development Tools
- **Visual Studio Code**: https://code.visualstudio.com/download
- **React Native CLI**: `npm install -g @react-native-community/cli`

### 3. Mobile Development (Optional)
- **iOS**: Install Xcode from App Store + `xcode-select --install`
- **Android**: Install Android Studio + React Native environment setup

## 🏗️ Project Architecture

This project uses **npm workspaces** for clean dependency separation:

```
dating-app-workspace/
├── client/              # React Native app (mobile + web)
├── server/              # Express.js API backend  
├── shared/              # Common TypeScript schemas
└── package.json         # Workspace configuration
```

## 🚀 Quick Start

### 1. Install All Dependencies
```bash
# Clean install all workspaces
npm run clean

# Or install with legacy peer deps (if React Native conflicts)
npm install --workspaces --legacy-peer-deps
```

### 2. Start Development Servers
```bash
# Start API backend (runs on port 5000)
npm run dev

# Start React Native Web (runs on port 3000)  
npm run dev:client

# Start Metro bundler for mobile development
npm run dev:mobile
```

## 🏃‍♂️ Development Commands

### Backend Development
```bash
npm run dev          # Start Express server (port 5000)
npm run build        # Build server for production
npm run start        # Run production server
npm run check        # TypeScript checking
npm run db:push      # Push database schema changes
```

### Frontend Development
```bash
npm run dev:client   # Start React Native Web (port 3000)
npm run dev:mobile   # Start Metro bundler for mobile

# Or run directly in client workspace:
cd client
npm run web          # React Native Web
npm run start        # Metro bundler
npm run ios          # iOS simulator  
npm run android      # Android emulator
npm run test         # Run tests
```

### Workspace Management
```bash
npm run clean        # Remove all node_modules and reinstall
npm install --workspaces # Install dependencies for all workspaces
```

## 📁 Workspace Structure

This npm workspace contains three main parts:

### **Client Workspace** (`client/`)
React Native app that runs on mobile and web:
```
client/
├── src/
│   ├── screens/           # App screens (Home, Matches, Chat, Profile) 
│   ├── components/        # Reusable components (SwipeCard, etc.)
│   ├── navigation/        # Navigation setup
│   ├── lib/              # API client and utilities
│   └── shared/           # Client-specific utilities
├── web/                  # React Native Web configuration
├── ios/                  # iOS native files  
├── android/              # Android native files
└── package.json          # Client dependencies (React Native, navigation, etc.)
```

### **Server Workspace** (`server/`)
Express.js API backend:
```
server/
├── index.ts              # Server entry point
├── routes.ts             # API route handlers
├── storage.ts            # In-memory data storage
├── vite.ts              # Development server utilities
└── package.json          # Server dependencies (Express, CORS, etc.)
```

### **Shared Resources** (`shared/`)
Common TypeScript types and schemas:
```
shared/
└── schema.ts             # Drizzle schema definitions and Zod types
```

## 🧪 Testing Your Setup

### 1. Verify Backend API
```bash
# Test API root (should show available endpoints)
curl http://localhost:5000/

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

### 3. Test Mobile Development
```bash
cd client
npm run start    # Start Metro bundler
npm run ios      # Run on iOS simulator
npm run android  # Run on Android emulator
```

## 🔧 Development Workflow

### Daily Development
```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend  
npm run dev:client

# Make changes to files in server/, client/, or shared/
# Both servers auto-reload on changes
```

### Working with Workspaces
```bash
# Run commands in specific workspace
npm run <script> --workspace=server
npm run <script> --workspace=client

# Install dependency in specific workspace
npm install <package> --workspace=server
npm install <package> --workspace=client

# Run commands across all workspaces
npm run test --workspaces
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Workspace Installation Issues
```bash
# Clean reinstall all workspaces
npm run clean

# Install with legacy peer dependencies (for React Native conflicts)
npm install --workspaces --legacy-peer-deps

# Install dependencies in specific workspace
npm install --workspace=server
npm install --workspace=client
```

#### 2. "Cannot find module" errors
```bash
# Check if dependencies are installed in correct workspace
npm list --workspace=server
npm list --workspace=client

# Reinstall specific workspace
rm -rf client/node_modules server/node_modules
npm install --workspaces
```

#### 3. Server Dependencies Missing (tsx, vite)
```bash
# Check server dependencies
cd server && npm list tsx vite

# If missing, add to server package.json devDependencies:
# "tsx": "^4.19.1"
# "vite": "^5.4.19"
```

#### 4. React Native Dependencies
```bash
# iOS: Pod installation
cd client/ios && pod install && cd ../..

# Android: Clean build
cd client/android && ./gradlew clean && cd ../..

# Metro cache reset
cd client && npx react-native start --reset-cache
```

#### 5. Port Conflicts
```bash
# Kill processes on development ports
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # React Native Web
lsof -ti:8081 | xargs kill -9  # Metro bundler
```

#### 6. macOS Socket Issues (ENOTSUP)
```bash
# If you get "operation not supported on socket" errors:
# 1. Check if port is already in use
lsof -i :5000

# 2. Try different port
PORT=3001 npm run dev

# 3. Use localhost instead of 0.0.0.0 (already fixed in current version)
```

## 📊 API Documentation

The backend provides a RESTful API with the following endpoints:

### Core Endpoints
- `GET /` - API documentation and available endpoints
- `GET /api/venues` - Get nearby venues with active user counts
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:userId/discover/:venueId` - Discover users at venue

### Dating Features  
- `POST /api/swipes` - Create a swipe (like/pass)
- `GET /api/users/:userId/matches` - Get user's matches
- `POST /api/messages` - Send message to match
- `GET /api/matches/:matchId/messages` - Get match conversation

### Quick Offers
- `POST /api/quick-offers` - Send quick offer ("Buy you a drink?")
- `GET /api/users/:userId/quick-offers` - Get pending offers
- `PATCH /api/quick-offers/:id` - Accept/decline offer

## 🚀 Production Deployment

### Backend (Server Workspace)
```bash
npm run build --workspace=server  # Build for production
npm run start --workspace=server  # Run production server
```

### Frontend (Client Workspace)
```bash
# React Native Web
cd client && npm run web:build

# Mobile apps
# iOS: Archive in Xcode → App Store Connect  
# Android: Generate signed APK/AAB in Android Studio
```

## 🎯 Development Roadmap

1. **Setup Complete**: npm workspace structure with clean dependency separation
2. **Next Steps**: 
   - Resolve missing server dependencies (tsx, vite)
   - Complete React Native dependency installation
   - Add real user authentication
   - Connect to production database (Neon PostgreSQL)
3. **Production Ready**: Deploy to app stores and hosting platform

## 📚 Key Technologies

- **Workspace Management**: npm workspaces for dependency separation
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Frontend**: React Native + React Navigation + React Query  
- **Database**: PostgreSQL with Neon hosting
- **Validation**: Zod schemas for type-safe API contracts
- **Development**: Hot reload for both server and client

---

**Your location-based dating app workspace is ready for development!** The npm workspace structure provides clean separation between client, server, and shared code.
