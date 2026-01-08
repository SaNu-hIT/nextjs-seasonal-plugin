# Publishing Guide for nextjs-seasonal-plugin

## Prerequisites

Before publishing to npm, you need to:

1. **Create an npm account** (if you don't have one)
   - Visit https://www.npmjs.com/signup
   - Or run: `npm adduser`

2. **Login to npm**
   ```bash
   npm login
   ```

3. **Update package.json**
   - Replace `"Your Name <your.email@example.com>"` with your actual name and email
   - Update repository URLs if you have a GitHub repo
   - Or remove the repository/homepage/bugs fields if not using GitHub

## Pre-Publication Checklist

- [x] Package built successfully (`npm run build`)
- [x] All tests passing (demo app works)
- [x] README.md created with documentation
- [x] LICENSE file created (MIT)
- [x] CHANGELOG.md created
- [x] .npmignore configured
- [ ] Update author in package.json
- [ ] Update repository URLs (or remove them)
- [ ] Choose a unique package name (check availability)

## Check Package Name Availability

Before publishing, verify your package name is available:

```bash
npm search nextjs-seasonal-plugin
```

If the name is taken, update `"name"` in package.json to something unique like:
- `@yourusername/seasonal-plugin`
- `nextjs-seasonal-backgrounds`
- `react-seasonal-animations`

## Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This should include:
- `dist/` folder (compiled code)
- `README.md`
- `package.json`
- `LICENSE`
- `CHANGELOG.md`

It should NOT include:
- `src/` folder
- `demo/` folder
- `node_modules/`
- Config files (tsconfig.json, rollup.config.js)

## Publishing Steps

### 1. Final Build

```bash
cd /Users/intersmart/plugin\ _seasonal
npm run build
```

### 2. Test the Package Locally (Optional)

```bash
npm pack
# This creates a .tgz file you can test in another project
```

### 3. Publish to npm

For first-time publication:

```bash
npm publish
```

For scoped packages (if using @username/package-name):

```bash
npm publish --access public
```

### 4. Verify Publication

After publishing, check:
- https://www.npmjs.com/package/nextjs-seasonal-plugin
- Install in a test project: `npm install nextjs-seasonal-plugin`

## Version Updates

For future updates:

```bash
# Patch version (1.0.0 -> 1.0.1) for bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) for new features
npm version minor

# Major version (1.0.0 -> 2.0.0) for breaking changes
npm version major

# Then publish
npm publish
```

## Troubleshooting

### "Package name already exists"
- Choose a different name in package.json
- Or use a scoped package: `@yourusername/seasonal-plugin`

### "You must be logged in to publish"
- Run `npm login` and enter your credentials

### "Missing required field"
- Ensure package.json has: name, version, description, main, license

### "Files not included in package"
- Check .npmignore
- Verify dist/ folder exists after build

## Post-Publication

1. **Tag the release on GitHub** (if using Git)
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Create a GitHub release** with changelog

3. **Share your package!**
   - Tweet about it
   - Post on Reddit (r/reactjs, r/nextjs)
   - Share on dev.to or Medium

## Quick Publish Commands

```bash
# Update package.json author and repository
# Then run:

cd /Users/intersmart/plugin\ _seasonal
npm run build
npm login
npm publish

# Done! 🎉
```

## Important Notes

- **Package name must be unique** on npm
- **Version numbers follow semver** (major.minor.patch)
- **You cannot unpublish** after 24 hours (only deprecate)
- **Test thoroughly** before publishing
- **Update README** with actual installation instructions

Good luck with your publication! 🚀
