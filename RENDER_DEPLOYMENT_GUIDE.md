# 🚀 Render Deployment Guide

## Current Status: ❌ Deployment Failing

### Errors:
1. ❌ `MONGODB_URI not defined`
2. ⚠️ `Cloudinary credentials are not properly configured`

---

## ✅ Solution: Add Environment Variables in Render Dashboard

Your `render.yaml` now declares the required environment variables, but **SECRET VALUES** must be set manually in Render Dashboard.

### 📍 Go to Render Dashboard:
https://dashboard.render.com/web/srv-d47nba3uibrs73d2qdi0

---

## 🔑 Required Environment Variables

### Step 1: Click "Environment" Tab

In your Render service, find and click the **"Environment"** tab on the left sidebar.

---

### Step 2: Add Secret Values

You need to add **5 secret values**:

#### 1️⃣ **MONGODB_URI** (CRITICAL - Database)

```
Key: MONGODB_URI
Value: <YOUR_MONGODB_CONNECTION_STRING>
```

**Get MongoDB URI from MongoDB Atlas:**

**Option A: If you already have MongoDB Atlas:**
- Go to: https://cloud.mongodb.com/
- Select your cluster
- Click "Connect" → "Connect your application"
- Copy connection string and replace password:
  ```
  mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wholesale_market?retryWrites=true&w=majority
  ```

**Option B: Create New MongoDB (Free):**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create FREE cluster (M0 Sandbox)
3. Create database user with password
4. Network Access → Add IP → "Allow access from anywhere" (`0.0.0.0/0`)
5. Get connection string from "Connect" button
6. Format:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/wholesale_market?retryWrites=true&w=majority
   ```

---

#### 2️⃣ **JWT_SECRET** (CRITICAL - Authentication)

```
Key: JWT_SECRET
Value: <GENERATE_STRONG_SECRET>
```

**Generate a secure JWT secret:**

```bash
# Option 1: Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Manual (at least 32 characters)
AVE-Catering-Production-2024-xY9zK3mN8pL2qR5tW7vU0bH4gF6jD1sA
```

---

#### 3️⃣ **CLOUDINARY_API_KEY** (Image Uploads)

```
Key: CLOUDINARY_API_KEY
Value: 975461118425658
```

⚠️ **Security Note**: These credentials were exposed in Git. Please rotate them:
1. Go to: https://console.cloudinary.com/console/settings/security
2. Click "Generate New API Key" or "Regenerate" API Secret
3. Use the NEW credentials here

---

#### 4️⃣ **CLOUDINARY_API_SECRET** (Image Uploads)

```
Key: CLOUDINARY_API_SECRET
Value: 4SdGHJknlmUqpgIltOyfRZMD9zc
```

⚠️ **Use NEW rotated secret** if you've rotated your keys (recommended)

---

#### 5️⃣ **CLOUDINARY_CLOUD_NAME** (Already set in render.yaml)

```
Key: CLOUDINARY_CLOUD_NAME
Value: dqjhf8ios
```

✅ This is already configured in `render.yaml`, but you can verify it's present.

---

## 📋 Complete Setup Checklist

- [ ] Go to: https://dashboard.render.com/web/srv-d47nba3uibrs73d2qdi0
- [ ] Click "Environment" tab
- [ ] Add `MONGODB_URI` with your MongoDB connection string
- [ ] Add `JWT_SECRET` with generated secret (at least 32 chars)
- [ ] Add `CLOUDINARY_API_KEY` = `975461118425658` (or new rotated key)
- [ ] Add `CLOUDINARY_API_SECRET` = `4SdGHJknlm...` (or new rotated secret)
- [ ] Verify `CLOUDINARY_CLOUD_NAME` = `dqjhf8ios` is present
- [ ] Verify `FRONTEND_URL` = `https://ave-catering.vercel.app` is present
- [ ] Verify `NODE_ENV` = `production` is present
- [ ] Verify `PORT` = `10000` is present
- [ ] Click "Save Changes"
- [ ] Render will automatically redeploy
- [ ] Wait 2-3 minutes for deployment
- [ ] Check logs for success

---

## 🔍 Verify After Deployment

### Check Deployment Logs

In Render dashboard, go to "Logs" tab. Look for:

**✅ Success Indicators:**
```
✅ Connected to MongoDB
Server running on port 10000
✅ Cloudinary configured: dqjhf8ios
```

**❌ Error Indicators:**
```
❌ MONGODB_URI not defined
⚠️ WARNING: Cloudinary credentials are not properly configured
MongoError: Authentication failed
```

---

### Test Health Endpoint

Once deployed, test:

```bash
curl https://ave-catering.onrender.com/health
```

**Expected response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-08T...",
  "uptime": 123.45,
  "environment": "production"
}
```

---

### Test API Endpoints

```bash
# Get products
curl https://ave-catering.onrender.com/api/products

# Get categories
curl https://ave-catering.onrender.com/api/categories
```

---

## 🎯 Current Configuration Summary

### Configured in `render.yaml` (Public):
- ✅ `NODE_ENV` = `production`
- ✅ `PORT` = `10000`
- ✅ `CLOUDINARY_CLOUD_NAME` = `dqjhf8ios`
- ✅ `FRONTEND_URL` = `https://ave-catering.vercel.app`

### Needs Manual Configuration (Secrets):
- ❌ `MONGODB_URI` → Add in Render Dashboard
- ❌ `JWT_SECRET` → Add in Render Dashboard
- ❌ `CLOUDINARY_API_KEY` → Add in Render Dashboard
- ❌ `CLOUDINARY_API_SECRET` → Add in Render Dashboard

---

## 🐛 Common Issues & Solutions

### Issue 1: "MONGODB_URI not defined"
**Solution**: Add MongoDB connection string in Render Environment variables

### Issue 2: "MongoError: Authentication failed"
**Solution**: Check username/password in connection string is correct

### Issue 3: "MongoError: IP not whitelisted"
**Solution**: In MongoDB Atlas → Network Access → Add IP `0.0.0.0/0`

### Issue 4: "Cloudinary not configured"
**Solution**: Add all three Cloudinary environment variables

### Issue 5: Build succeeds but app crashes
**Solution**: Check logs for specific error, usually missing environment variable

---

## 📊 MongoDB Atlas Quick Setup

### Free Tier Specs:
- **Storage**: 512 MB
- **RAM**: Shared
- **Connections**: 500 concurrent
- **Cost**: FREE forever

### Connection String Format:
```
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>?retryWrites=true&w=majority
```

### Example:
```
mongodb+srv://aveadmin:MySecurePassword123@cluster0.abc123.mongodb.net/wholesale_market?retryWrites=true&w=majority
```

**Components:**
- `USERNAME`: Your MongoDB user (e.g., `aveadmin`)
- `PASSWORD`: Your user's password (URL encode special chars)
- `CLUSTER`: Your cluster hostname (from Atlas)
- `DATABASE`: `wholesale_market`

---

## 🔐 Security Best Practices

### ✅ DO:
- Use strong, unique JWT secret (32+ characters)
- Rotate Cloudinary keys if exposed
- Use environment variables for secrets
- Enable MongoDB authentication
- Whitelist only necessary IPs in production

### ❌ DON'T:
- Commit secrets to Git
- Use weak JWT secrets like "secret" or "123456"
- Share credentials publicly
- Use same credentials across environments
- Disable authentication

---

## 🆘 Need Help?

### Render Support:
- Docs: https://render.com/docs
- Community: https://community.render.com/
- Status: https://status.render.com/

### MongoDB Support:
- Docs: https://docs.mongodb.com/
- Atlas Docs: https://docs.atlas.mongodb.com/
- Community: https://community.mongodb.com/

### Project Support:
- Check `SECURITY_INCIDENT.md` for key rotation guide
- Check `CLOUDINARY_SETUP_COMPLETE.md` for image upload setup
- Check `CORS_FIX_GUIDE.md` for CORS issues

---

## 📈 Deployment Timeline

1. ✅ Updated `render.yaml` with environment variables
2. ⏳ **NEXT**: Add secret values in Render Dashboard
3. ⏳ Render auto-redeploys after saving
4. ⏳ Check logs for successful startup
5. ⏳ Test health endpoint
6. ⏳ Test API endpoints
7. ⏳ Test frontend integration

---

## ✅ Success Criteria

Your deployment is successful when:
- [ ] Build completes without errors
- [ ] Server starts and logs "Connected to MongoDB"
- [ ] Health endpoint returns `{"status":"OK"}`
- [ ] API endpoints return data (not 500 errors)
- [ ] Frontend can fetch data from API
- [ ] Image uploads work correctly
- [ ] No errors in Render logs

---

**Last Updated**: November 8, 2025  
**Service URL**: https://ave-catering.onrender.com  
**Dashboard**: https://dashboard.render.com/web/srv-d47nba3uibrs73d2qdi0

