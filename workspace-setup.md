# Workspace Setup Instructions

Since we cannot directly modify the root package.json, here's the manual setup needed:

## Current Structure
- `client/` - React Native app (formerly mobile/DatingApp)
- `server/` - Express API server 
- `shared/` - Shared types and schemas

## To Complete Workspace Setup:

1. **Update root package.json** (manual step):
   ```json
   {
     "name": "dating-app-workspace",
     "workspaces": ["client", "server"],
     "scripts": {
       "dev": "npm run dev --workspace=server",
       "dev:client": "npm run web --workspace=client", 
       "clean": "rm -rf node_modules client/node_modules server/node_modules && npm install"
     }
   }
   ```

2. **Install workspace dependencies**:
   ```bash
   npm install --workspaces
   ```

3. **Run commands**:
   - Server: `npm run dev`
   - Client web: `npm run dev:client` 
   - Client mobile: `cd client && npm run start`

## Dependencies Separated:
- **Server**: Express, CORS, Drizzle, authentication 
- **Client**: React Native, navigation, UI components
- **Shared**: TypeScript, common utilities, Zod schemas