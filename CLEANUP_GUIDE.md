# Root Package.json Cleanup Guide

## Current Issue
The root package.json has 100+ dependencies that should be moved to client/server workspaces.

## What I've Analyzed:

### Dependencies Already in Server:
- @neondatabase/serverless, cors, express, drizzle-orm, drizzle-zod
- connect-pg-simple, express-session, memorystore, nanoid
- passport, passport-local, ws, zod, zod-validation-error

### Dependencies Already in Client:
- react, react-native, @react-navigation/* packages
- @tanstack/react-query, react-native-* packages
- @babel/core, @babel/preset-env, typescript

### Should Stay in Root (Shared):
- typescript (shared dev tool)
- bufferutil (optional dependency)

## Manual Steps Required:

1. **Replace the entire root package.json** with the content from `ROOT_PACKAGE_JSON.json`

2. **Add missing dependencies to client/server**:
   - If client build fails, add missing UI deps to client/package.json
   - If server fails, add missing backend deps to server/package.json

3. **Run cleanup**:
   ```bash
   npm run clean
   ```

4. **Test both workspaces**:
   ```bash
   npm run dev          # Should start server
   npm run dev:client   # Should start React Native Web
   ```

This will reduce the root package.json from 100+ dependencies to just 2, with proper workspace separation.