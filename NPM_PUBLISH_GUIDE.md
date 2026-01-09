# 📦 The Ultimate Guide to Creating & Publishing NPM Packages

## 1. Project Setup
Start with a clean directory and initialize your project.

```bash
mkdir my-awesome-package
cd my-awesome-package
npm init -y  # Creates default package.json
git init     # Initialize git
```

### Key `package.json` Fields
Ensure these fields are correct for discovery and usage:

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "main": "dist/index.js",      // CommonJS entry
  "module": "dist/index.esm.js", // ESM entry (for bundlers)
  "types": "dist/index.d.ts",    // TypeScript types
  "files": ["dist", "README.md"], // What to upload to NPM
  "scripts": {
    "build": "rollup -c",
    "prepublishOnly": "npm run build" // Runs before publish
  }
}
```

## 2. Bundling (TypeScript Example)
Most modern packages use TypeScript. Use **Rollup** for efficient bundling.

1. **Install dependencies:**
   ```bash
   npm install --save-dev typescript rollup @rollup/plugin-typescript tslib
   ```

2. **Create `rollup.config.js`:**
   ```javascript
   export default {
     input: 'src/index.ts',
     output: [
       { file: 'dist/index.js', format: 'cjs' },
       { file: 'dist/index.esm.js', format: 'esm' }
     ],
     plugins: [typescript()]
   };
   ```

## 3. Important Configuration Files

### `.npmignore`
**Crucial:** Don't publish your source code or secrets! Only publish the `dist` folder.
**Create `.npmignore`:**
```text
src/
.git
.github
tsconfig.json
rollup.config.js
node_modules
```

### `.gitignore`
Always ignore `node_modules`, `dist`, and secrets like `.env` or `.npmrc`.

## 4. Authentication & Security (2FA)
NPM now requires 2FA. You have two options:

**Option A: Authenticator App (Recommended)**
1. Enable 2FA in NPM Settings.
2. Run `npm login`.
3. Enter username, password, and OTP code.

**Option B: Automation Tokens**
1. Generate an "Automation" token in NPM settings.
2. Use it in CI/CD or `.npmrc` (carefully!):
   ```bash
   # .npmrc
   //registry.npmjs.org/:_authToken=${NPM_TOKEN}
   ```
   *Note: Never commit `.npmrc` with a real token!*

## 5. Publishing Your Package

### Versioning
Follow **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`
- **PATCH (1.0.1):** Bug fixes, backward compatible.
- **MINOR (1.1.0):** New features, backward compatible.
- **MAJOR (2.0.0):** Breaking changes.

**Command:**
```bash
npm version patch  # Bumps version (e.g., 1.0.0 -> 1.0.1)
```

### Push to Registry
```bash
npm publish
# If scoped (@username/package):
npm publish --access public
```

## 6. Optimization (SEO)
Make your package easy to find:
- **Keywords:** Add relevant tags in `package.json`.
- **Description:** Clear, concise summary.
- **README:** Add badges, screenshots, and usage examples.

```json
"keywords": ["react", "animation", "ui-kit", "frontend"]
```

## 7. Monetization
Add funding links to support your work.
1. **package.json:**
   ```json
   "funding": { "type": "individual", "url": "https://buymeacoffee.com/username" }
   ```
2. **GitHub:** Create `.github/FUNDING.yml`.

---
**Reference:** [Official NPM Documentation](https://docs.npmjs.com/)
