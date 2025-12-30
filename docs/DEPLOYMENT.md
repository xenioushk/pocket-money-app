# Deployment Guide - Netlify

## ✅ Fixed Issues

1. **Removed `vite-plugin-svgr` import** from `vite.config.ts` (package was deleted but config still referenced it)
2. **Updated `netlify.toml`** with correct build configuration

## 🚀 Netlify Configuration

### Build Settings (Already in netlify.toml)

- **Build command**: `npm run build`
- **Publish directory**: `build`

### Environment Variables (Set in Netlify UI)

⚠️ **IMPORTANT**: Update your environment variables in Netlify Dashboard:

Go to: **Site settings → Environment variables**

#### Required Variables:

```
VITE_PM_API_URL=https://pmapi.bluewindlab.com
```

#### Optional Variables:

```
VITE_SEC_SITE_KEY=your_recaptcha_site_key_here
```

### Steps to Deploy:

1. **Update Environment Variables in Netlify**

   - Go to your site settings
   - Navigate to "Environment variables"
   - Delete old `REACT_APP_*` variables
   - Add new `VITE_*` variables as shown above

2. **Deploy**

   - Push your changes to GitHub
   - Netlify will automatically rebuild
   - Or trigger manual deploy in Netlify UI

3. **Verify**
   - Check build logs for success
   - Test the deployed site

## 📝 Notes

- Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)
- The app will work without `VITE_SEC_SITE_KEY` (reCAPTCHA is optional)
- Build output directory is `build/` (configured in vite.config.ts)
