# Deploy Internet Identity Locally

## Quick Fix

Run this command in your terminal (in the project root):

```bash
dfx deploy internet_identity --argument '(null)'
```

If that doesn't work, try:

```bash
II_ENV=development dfx deploy internet_identity --argument '(null)'
```

## Alternative: Use NFID for Google/Apple Login

For a more user-friendly login experience, you can use **NFID** which supports:
- Google login
- Apple login  
- Email login
- Traditional Internet Identity

To use NFID, change the identity provider in `src/coverce_frontend/src/contexts/AuthContext.tsx`:

```typescript
const identityProvider = isProduction
  ? 'https://nfid.one'  // NFID supports Google/Apple
  : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`;
```

## After Deployment

Once Internet Identity is deployed, restart your frontend and try logging in again.

