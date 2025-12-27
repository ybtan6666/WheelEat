# Fix: Cloudflare Pages Functions Dependency Resolution Error

## Problem

You're seeing this error during Cloudflare Pages deployment:
```
✘ [ERROR] Could not resolve "@supabase/supabase-js"
```

## Solution

Cloudflare Pages Functions needs the `package-lock.json` file to be committed to your repository. Follow these steps:

### Step 1: Ensure package-lock.json exists

If you haven't already, install dependencies in the functions directory:

```bash
cd functions
npm install
```

This will create `functions/package-lock.json` if it doesn't exist.

### Step 2: Commit package-lock.json

Make sure `functions/package-lock.json` is committed to your repository:

```bash
git add functions/package-lock.json
git commit -m "Add package-lock.json for Cloudflare Pages Functions"
git push
```

### Step 3: Verify files are committed

Your repository should have:
- ✅ `functions/package.json` (committed)
- ✅ `functions/package-lock.json` (committed)
- ✅ `functions/api/**/*.js` (all function files committed)

### Step 4: Redeploy

After committing and pushing, Cloudflare Pages will automatically redeploy. The build should now succeed because:

1. Cloudflare Pages Functions detects `functions/package.json`
2. It automatically runs `npm install` using the committed `package-lock.json`
3. Dependencies are installed before bundling
4. The bundler can now resolve `@supabase/supabase-js`

## Why This Happens

Cloudflare Pages Functions uses a bundler (esbuild) that needs to resolve all imports. If dependencies aren't installed before bundling, the bundler can't find the modules and throws a resolution error.

The `package-lock.json` file ensures that:
- Dependencies are installed with the exact same versions
- The installation is fast and reproducible
- Cloudflare can install dependencies during the build process

## Verification

After deploying, check the build logs. You should see:
- ✅ "Installing dependencies from functions/package.json"
- ✅ "Building Pages Functions"
- ✅ No "Could not resolve" errors

