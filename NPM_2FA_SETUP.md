# NPM 2FA Setup Guide

## The Issue

NPM now requires two-factor authentication (2FA) to publish packages. You have two options:

### Option 1: Enable 2FA on Your Account (Recommended)

1. **Go to npm settings:**
   - Visit: https://www.npmjs.com/settings/sanufeliz/tfa

2. **Enable 2FA:**
   - Click "Enable 2FA"
   - Choose "Authorization and Publishing" (required for publishing)
   - Scan the QR code with an authenticator app (Google Authenticator, Authy, etc.)
   - Enter the 6-digit code from your app
   - Save your recovery codes in a safe place

3. **Publish with 2FA:**
   ```bash
   cd /Users/intersmart/plugin\ _seasonal
   npm publish
   ```
   - You'll be prompted for a one-time password (OTP)
   - Enter the 6-digit code from your authenticator app

### Option 2: Create Token with Bypass 2FA (Alternative)

If you prefer not to enable 2FA on your account:

1. **Create a new access token:**
   - Visit: https://www.npmjs.com/settings/sanufeliz/tokens/create
   - Select "Granular Access Token"
   - Name it: `nextjs-seasonal-plugin-publish`
   - **IMPORTANT:** Check the box for "Bypass 2FA requirement"
   - Set permissions to "Read and write"
   - Set expiration to 90 days
   - Click "Generate Token"

2. **Use the new token:**
   ```bash
   cd /Users/intersmart/plugin\ _seasonal
   echo "//registry.npmjs.org/:_authToken=YOUR_NEW_TOKEN_HERE" > .npmrc
   npm publish
   ```

## Quick Publish (After Setting Up 2FA)

```bash
cd /Users/intersmart/plugin\ _seasonal
npm publish
# Enter your 6-digit 2FA code when prompted
```

## What Happens After Publishing

Once published successfully, your package will be available at:
- **NPM:** https://www.npmjs.com/package/nextjs-seasonal-plugin
- **Install:** `npm install nextjs-seasonal-plugin`

## Already Published

- ✅ GitHub: https://github.com/SaNu-hIT/nextjs-seasonal-plugin
- ⏳ NPM: Waiting for 2FA setup

Let me know which option you'd like to proceed with!
