# Overview

This is a location-based dating application that connects people at the same venue in real-time. Users can discover and swipe on other users who are currently at their venue, send quick offers like "Can I buy you a drink?", and chat with matches. The app emphasizes immediate, in-person connections by focusing on shared physical proximity rather than traditional online dating.

**IMPORTANT**: This project uses npm workspaces with a React Native client and Express server. The app runs natively on iOS/Android and can be tested on desktop via React Native Web. Client code is in `client/` (formerly mobile/DatingApp), server code is in `server/`, and shared schemas are in `shared/`.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Wouter for Routing**: Lightweight client-side routing solution instead of React Router
- **Shadcn/ui Components**: Comprehensive UI component library built on Radix UI primitives
- **TanStack Query**: Handles server state management, caching, and API calls
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens and dark mode support
- **Mobile-First Design**: Responsive design optimized for mobile devices with touch interactions

## Backend Architecture
- **Express.js Server**: RESTful API server with middleware for logging and error handling
- **In-Memory Storage**: Development storage implementation using Maps for rapid prototyping
- **Modular Route Handlers**: Organized API endpoints for users, venues, matches, swipes, messages, and quick offers
- **Schema Validation**: Zod schemas for request validation and type safety

## Data Storage Solutions
- **Drizzle ORM**: Type-safe SQL query builder configured for PostgreSQL
- **PostgreSQL Database**: Production database with Neon serverless hosting
- **Schema Design**: Well-structured tables for users, venues, matches, swipes, messages, and quick offers
- **Dual Storage Pattern**: In-memory storage for development with database abstraction layer for production migration

## Authentication and Authorization
- **Demo User System**: Currently uses hardcoded demo user IDs for development
- **Session Management**: Prepared for cookie-based sessions with connect-pg-simple
- **User Context**: Frontend tracks current user state across components

## External Dependencies
- **Neon Database**: Serverless PostgreSQL hosting for production
- **Geolocation API**: Browser-based location services for venue proximity
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Vite Build System**: Fast development server with HMR and optimized production builds
- **ESBuild**: Production bundling for the Express server

## Key Features
- **Real-time Venue Tracking**: Users check into venues and see others at the same location
- **Swipe Mechanics**: Tinder-style card swiping with touch gesture support
- **Quick Offers**: Pre-defined conversation starters like drink offers
- **Match System**: Mutual likes create matches enabling chat
- **Responsive Chat**: Real-time messaging between matched users
- **Location Services**: Automatic venue discovery based on user location

## Development Workflow
- **TypeScript**: Full type safety across mobile, backend, and shared schemas
- **React Native Web**: Test mobile app in browser during development
- **Hot Reload**: Metro for mobile, Webpack for web development
- **Build Process**: React Native for mobile, Webpack for web, ESBuild for server
- **Database Migrations**: Drizzle Kit for schema management and migrations

## Running the Application
- **API Backend**: `npm run dev` (serves on port 5000)
- **Web Development**: `cd client && npm run web` (serves on port 3000)  
- **Mobile Development**: `cd client && npm run android/ios`
- **Single Codebase**: Same React Native code runs on mobile and web

## Workspace Structure
- **Root**: Workspace configuration and shared dependencies
- **client/**: React Native app with web support (formerly mobile/DatingApp)
- **server/**: Express API server with TypeScript
- **shared/**: Common schemas and types used by both client and server

## Clean Installation
- **Clean Install**: `npm run clean` - Removes all node_modules and reinstalls
- **Workspace Install**: `npm install --workspaces` - Install dependencies for all workspaces

## Documentation Status
- **README.md**: Updated for npm workspace structure (August 2025)
- **Setup Guides**: Created WORKSPACE_STATUS.md and ROOT_PACKAGE_JSON.json for manual workspace completion
- **Current Issue**: Server missing vite dependency - needs workspace dependency installation
