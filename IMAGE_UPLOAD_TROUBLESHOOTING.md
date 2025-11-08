# 🖼️ Image Upload Troubleshooting Guide

## Issue: "Image upload failed" Error (Status 400)

### Common Causes:

1. **Cloudinary Credentials Not Configured** ⚠️
2. **Empty Image Buffer**
3. **File Size Too Large**
4. **Invalid File Type**
5. **Network/Connection Issues**

---

## 🔍 Step-by-Step Diagnosis

### 1. Check Cloudinary Configuration

#### On Render.com:
1. Go to https://dashboard.render.com/
2. Select your backend service
3. Navigate to "Environment" tab
4. Verify these variables are set:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

#### Get Cloudinary Credentials:
1. Login to https://cloudinary.com/
2. Go to Dashboard
3. Copy your credentials from "Account Details"

### 2. Check Server Logs

After deploying, check Render logs for:

#### Success indicators:
```
✅ File upload attempt: product.jpg, MIME: image/jpeg, Size: 125678
✅ File received: product.jpg, Buffer size: 125678 bytes
✅ Uploading image for product: Red Bull, Size: 125678 bytes
✅ Image uploaded successfully: https://res.cloudinary.com/...
```

#### Error indicators:
```
❌ WARNING: Cloudinary credentials are not properly configured!
❌ Multer error: LIMIT_FILE_SIZE
❌ File rejected: Invalid MIME type
❌ Cloudinary upload stream error: ...
❌ No file received in request
❌ Invalid image buffer: Buffer is empty
```

### 3. Test Image Upload

#### Test with cURL:
```bash
# Replace with your actual values
curl -X POST 'https://ave-catering.onrender.com/api/products' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -F 'name=Test Product' \
  -F 'sku=TEST-001' \
  -F 'category=Beverages' \
  -F 'brand=Test Brand' \
  -F 'price=10' \
  -F 'pricePerCase=240' \
  -F 'packSize=24' \
  -F 'unit=ea' \
  -F 'description=Test product description' \
  -F 'stockQuantity=100' \
  -F 'minStock=10' \
  -F 'image=@/path/to/your/image.jpg'
```

### 4. Frontend Check

Verify the frontend is sending the file correctly:

```typescript
// Check FormData construction
const formData = new FormData();
formData.append('name', productData.name);
formData.append('image', imageFile); // imageFile should be a File object

// Verify file exists
console.log('Image file:', imageFile);
console.log('File size:', imageFile.size);
console.log('File type:', imageFile.type);
```

---

## 🛠️ Solutions

### Solution 1: Configure Cloudinary (Most Common)

1. **Get Cloudinary Account** (Free tier available)
   - Sign up at https://cloudinary.com/
   - Get your credentials from Dashboard

2. **Set Environment Variables on Render**
   ```
   CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=your-actual-secret-key
   ```

3. **Redeploy the service**
   - Manual Deploy → Deploy latest commit

### Solution 2: Fix Empty File Buffer

If logs show "No file received in request":

**Backend Check:**
- Ensure multer middleware is before the controller
- Route should have: `uploadSingle` middleware

**Frontend Fix:**
```typescript
// ✅ Correct
const file = event.target.files[0];
formData.append('image', file);

// ❌ Wrong
formData.append('image', ''); // Empty
formData.append('image', null); // Null
```

### Solution 3: File Size Issue

If error is "File size too large":
- Current limit: **5MB**
- Compress images before upload
- Or increase limit in `server/middleware/uploadMiddleware.ts`:
  ```typescript
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
  ```

### Solution 4: Invalid File Type

Only image files are allowed:
- ✅ Accepted: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- ❌ Rejected: `.pdf`, `.doc`, `.txt`, etc.

### Solution 5: Use Placeholder (Temporary)

Images are now **optional**. If upload fails, the system will:
- Create product with placeholder image
- You can update the image later

---

## 🧪 Testing After Fix

### 1. Test Health Endpoint
```bash
curl https://ave-catering.onrender.com/health
```
Should return: `{"status":"OK",...}`

### 2. Test Upload Endpoint
```bash
curl -X POST 'https://ave-catering.onrender.com/api/upload' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'image=@test-image.jpg'
```

### 3. Test Product Creation (Frontend)
1. Login to: https://ave-catering.vercel.app/auth/login
2. Go to Admin → Add Product
3. Fill form and select image
4. Submit
5. Check browser console and network tab

---

## 📊 Current Configuration

### Allowed Image Formats:
- JPEG/JPG ✅
- PNG ✅
- GIF ✅
- WebP ✅

### Limits:
- **Max File Size**: 5MB
- **Max Dimensions**: 800x800 (auto-resized by Cloudinary)
- **Optimization**: Automatic quality and format optimization

### Storage:
- **Provider**: Cloudinary
- **Folder**: `ave-catering/products`
- **Naming**: `product_{SKU}_{timestamp}`
- **URL**: `https://res.cloudinary.com/{cloud_name}/...`

---

## 🚨 Emergency Workaround

If Cloudinary is not available, products will use placeholder images:
```
https://placehold.co/400x400/8B5CF6/white?text=ProductName
```

This allows product creation to continue while you fix the image upload issue.

---

## 📝 Improved Error Messages

New error messages provide better debugging info:

### Before:
```json
{
  "message": "Image upload failed"
}
```

### After:
```json
{
  "message": "Image upload failed: Cloudinary is not configured. Please set environment variables."
}
```

Or:
```json
{
  "message": "Image upload failed: Invalid image buffer: Buffer is empty or undefined"
}
```

---

## ✅ Verification Checklist

- [ ] Cloudinary credentials set in Render environment
- [ ] Service redeployed after setting credentials
- [ ] Logs show "File received" messages
- [ ] No "WARNING: Cloudinary credentials" in logs
- [ ] Test upload returns 201 Created
- [ ] Image URL is from Cloudinary (res.cloudinary.com)
- [ ] Image displays correctly in frontend

---

## 🆘 Still Not Working?

1. **Check Render Logs**
   - Render Dashboard → Your Service → Logs
   - Look for specific error messages

2. **Verify Credentials**
   - Copy/paste directly from Cloudinary dashboard
   - No extra spaces or quotes

3. **Test Cloudinary Directly**
   ```bash
   curl https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
     -X POST \
     -F 'file=@test.jpg' \
     -F 'upload_preset=unsigned_preset'
   ```

4. **Contact Support**
   - Share Render logs
   - Share frontend console errors
   - Share network tab HAR file

---

**Last Updated**: November 2025
**Version**: 2.0

