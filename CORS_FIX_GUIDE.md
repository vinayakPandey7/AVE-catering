# 🔧 CORS Configuration Fix Guide

## Problem
CORS error when logging in from `https://ave-catering.vercel.app` to `https://ave-catering.onrender.com/api/users/login`

## Solution Applied ✅

### 1. Updated Backend CORS Configuration
The server now accepts requests from multiple origins:
- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite dev server)
- `https://ave-catering.vercel.app` (production frontend)
- `https://ave-catering1.vercel.app` (alternate frontend)
- Any custom URL set in `FRONTEND_URL` environment variable

### 2. Files Updated
- ✅ `server/server.ts` - Enhanced CORS configuration with multiple origins
- ✅ `server/env.example` - Updated with production URL example

## 🚀 Deployment Steps

### For Render.com Deployment:

1. **Go to your Render Dashboard**
   - Navigate to: https://dashboard.render.com/

2. **Select your backend service** (`ave-catering`)

3. **Update Environment Variables**
   - Go to "Environment" tab
   - Add/Update the following variable:
   ```
   FRONTEND_URL=https://ave-catering.vercel.app
   ```

4. **Redeploy the Backend**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or push the updated code to trigger auto-deploy

### Alternative: Update via Render CLI

```bash
# If you have Render CLI installed
render env set FRONTEND_URL=https://ave-catering.vercel.app
```

## 📝 Testing the Fix

### 1. After Deployment, Test the Login API:

```bash
curl -X POST 'https://ave-catering.onrender.com/api/users/login' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ave-catering.vercel.app' \
  -d '{"email":"admin@test.com","password":"123456789"}'
```

### 2. Expected Response Headers:
```
Access-Control-Allow-Origin: https://ave-catering.vercel.app
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
```

### 3. Test from Frontend:
- Visit: https://ave-catering.vercel.app/auth/login
- Enter credentials
- Should login successfully without CORS errors

## 🔍 What Changed in the Code?

### Before:
```typescript
cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
})
```

### After:
```typescript
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ave-catering.vercel.app",
  "https://ave-catering1.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  maxAge: 86400,
})
```

## 🎯 Key Improvements:

1. ✅ **Multiple Origins Support** - Allows both development and production URLs
2. ✅ **Dynamic Origin Checking** - Function-based origin validation
3. ✅ **OPTIONS Method** - Proper handling of preflight requests
4. ✅ **Extended Headers** - More comprehensive allowed headers
5. ✅ **Cache Control** - 24-hour maxAge for preflight cache
6. ✅ **Logging** - Logs blocked origins for debugging

## 🐛 Troubleshooting

### If CORS errors persist:

1. **Clear browser cache and cookies**
   ```
   Chrome: ⌘ + Shift + Delete
   ```

2. **Check Render logs**
   - Go to Render Dashboard → Your Service → Logs
   - Look for "CORS blocked origin:" messages

3. **Verify environment variable**
   ```bash
   # Should show: https://ave-catering.vercel.app
   echo $FRONTEND_URL
   ```

4. **Check if service restarted**
   - Render should show "Live" status
   - Check deployment logs for successful start

5. **Add more origins if needed**
   - Edit `server/server.ts`
   - Add your domain to `allowedOrigins` array
   - Redeploy

## 📚 Additional Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)

## ✅ Checklist

- [ ] Updated `server/server.ts` with new CORS config
- [ ] Committed changes to git
- [ ] Pushed to GitHub
- [ ] Updated `FRONTEND_URL` in Render dashboard
- [ ] Redeployed backend on Render
- [ ] Tested login from production frontend
- [ ] Verified no CORS errors in browser console

---

**Status**: Ready to deploy! 🚀

Once deployed, your login should work without CORS errors.

