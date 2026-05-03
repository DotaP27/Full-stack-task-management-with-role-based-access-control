# Deploy to Railway - Complete Guide

Railway is a simple platform for deploying applications. It's free to start and works great with our app!

## Step 1: Create Railway Account

1. Go to https://railway.app/
2. Click **"Start Free"**
3. Sign up with GitHub (recommended - same account as your repo)
4. Authorize Railway to access your GitHub account
5. You're in! ✅

---

## Step 2: Create New Project

1. After logging in, click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. **Select your repository**: 
   - Search: `Full-stack-task-management-with-role-based-access-control`
   - Click on it
4. Railway will detect it's a full-stack project
5. Click **"Deploy Now"**

---

## Step 3: Configure Backend (FastAPI)

Railway will create TWO services automatically (one for backend, one for frontend).

### For the Backend Service:

1. Click on the **backend service** in Railway dashboard
2. Go to **"Variables"** tab
3. Add these environment variables:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
   SECRET_KEY=your-super-secret-key-here-change-this
   ALGORITHM=HS256
   CORS_ORIGINS=https://your-frontend-url.railway.app
   PORT=8000
   ```
   
   > **Note**: We'll get the frontend URL after deployment, then come back and update `CORS_ORIGINS`

4. Go to **"Settings"** tab
5. Under "Start Command", enter:
   ```
   python main.py
   ```

6. Make sure "Root Directory" is set to `backend`

7. Go to **"Deploy"** tab and click **"Deploy"**

**Get your Backend URL:**
- In Railway dashboard, your backend service will show a URL like: `https://xxxx-production.railway.app`
- Copy this URL ✅

---

## Step 4: Configure Frontend (React)

1. Click on the **frontend service** in Railway dashboard
2. Go to **"Variables"** tab
3. Add this environment variable:
   ```
   VITE_API_URL=https://xxxx-production.railway.app/api
   ```
   (Replace xxxx with your actual backend URL from Step 3)

4. Go to **"Settings"** tab
5. Under "Start Command", enter:
   ```
   npm install && npm run build && npm run preview
   ```

6. Under "Root Directory", enter:
   ```
   frontend
   ```

7. Go to **"Deploy"** tab and click **"Deploy"**

**Get your Frontend URL:**
- Your frontend service will show a URL like: `https://yyyy-production.railway.app`
- Copy this URL ✅

---

## Step 5: Update Backend CORS

Now that you have both URLs, update the backend:

1. Go to **backend service** in Railway
2. Go to **"Variables"** tab
3. Update `CORS_ORIGINS` to:
   ```
   https://yyyy-production.railway.app
   ```
   (Replace yyyy with your actual frontend URL)

4. The backend will redeploy automatically ✅

---

## Step 6: Test Your Live Application

1. Open your frontend URL: `https://yyyy-production.railway.app`
2. Try logging in with demo credentials:
   - Admin: `test@example.com` / `password123`
   - Employee: `pp27@gmail.com` / `7428219340`
3. If login works, everything is connected! 🎉

---

## Troubleshooting

### Backend won't deploy
- Check "Deployment" logs in Railway dashboard
- Common issue: Python version. Railway should auto-detect from your setup
- Make sure `.env` isn't in your GitHub (it shouldn't be, you removed it)

### Frontend won't load
- Check "Deployment" logs
- Verify `VITE_API_URL` is correct in frontend variables
- Check browser console for errors (F12)

### Login doesn't work
- Backend might still be loading. Wait 30 seconds and try again
- Verify `CORS_ORIGINS` is set correctly in backend
- Check network tab in browser (F12 → Network) for failed requests

### Requests fail with "Cannot POST /api/..."
- `VITE_API_URL` might be wrong
- Backend might not be fully deployed
- Check backend logs in Railway

---

## What Railway Does Automatically

✅ Assigns a public URL to your app  
✅ Automatically restarts if it crashes  
✅ Provides logs for debugging  
✅ Handles SSL certificates (https)  
✅ Free tier includes 5GB of storage and good uptime  

---

## After Deployment

### Share Your Live App
- **Frontend URL**: https://yyyy-production.railway.app
- **Backend API**: https://xxxx-production.railway.app/api

### Monitor Your App
In Railway dashboard:
- **Logs**: See what's happening
- **Metrics**: CPU, memory, disk usage
- **Deployments**: History of all deployments
- **Variables**: Manage environment variables

### Update Your Code
After making changes:
1. Push to GitHub: `git push origin main`
2. Railway auto-deploys (if you configured auto-deploy)
3. Or manually redeploy from Railway dashboard

---

## Free Tier Limits

Railway's free tier gives you:
- ✅ Continuous deployment
- ✅ $5 credit monthly
- ✅ Enough for testing and small projects
- ✅ Automatic HTTPS
- ⚠️ Limited database storage

For more capacity, you can add a credit card and use the pay-as-you-go model.

---

## Database (PostgreSQL)

If you want to use a real database instead of mock data:

1. In Railway dashboard, click **"New"**
2. Select **"PostgreSQL"**
3. It auto-creates a database and provides connection URL
4. Copy the `DATABASE_URL` and add to backend variables
5. Update your code to use real database instead of mock data

For now, our mock data works fine without a database! ✅

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot find module X" | Missing dependency - add to requirements.txt or package.json |
| "Port already in use" | Railway handles this automatically |
| CORS errors | Check CORS_ORIGINS environment variable |
| 502 Bad Gateway | Backend might be crashing - check logs |
| Frontend shows blank page | Check VITE_API_URL in variables |
| Login always fails | Verify backend is running - check Railway logs |

---

## Next Steps

1. Create Railway account
2. Deploy project from GitHub
3. Configure backend and frontend variables
4. Test with demo credentials
5. Share the URL with others!

**You're about to go live!** 🚀
