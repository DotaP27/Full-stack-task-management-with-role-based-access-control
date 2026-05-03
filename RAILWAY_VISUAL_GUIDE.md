# Railway Deployment - Step-by-Step Visual Guide

## 🚀 Quick Start (5 Minutes)

This is a visual walkthrough of exactly what you'll see on Railway.

---

## STEP 1️⃣: Sign Up to Railway

**Website**: https://railway.app/

**What you'll see:**
```
┌─────────────────────────────────┐
│  Welcome to Railway             │
│  🚂 Modern deployment platform  │
│                                 │
│  [Start Free] button            │
│                                 │
│  Sign up with:                  │
│  - GitHub (recommended ✅)      │
│  - Email                        │
│  - Google                       │
└─────────────────────────────────┘
```

**Action**: Click "Start Free" → Sign with GitHub → Authorize

✅ **What to expect**: You'll be logged in to Railway dashboard

---

## STEP 2️⃣: Create New Project

**In Railway Dashboard, you'll see:**
```
┌─────────────────────────────────┐
│  Dashboard                      │
│                                 │
│  [+ New Project] button         │
│                                 │
│  (or empty state with options)  │
└─────────────────────────────────┘
```

**Action**: Click "New Project"

**Then select**: "Deploy from GitHub repo"

```
┌─────────────────────────────────┐
│  Select Repository              │
│                                 │
│  Search: [________________]      │
│                                 │
│  Type: Full-stack-task-manag... │
│                                 │
│  [Select] Full-stack-task...    │
└─────────────────────────────────┘
```

✅ **What to expect**: Railway will scan your GitHub repo and auto-detect the structure

---

## STEP 3️⃣: Configure Services

Railway will show you BOTH services it detected:

```
┌──────────────────────────────────────┐
│  Services Detected                   │
│                                      │
│  Service 1: backend (Python/FastAPI) │
│  Service 2: frontend (Node/React)    │
│                                      │
│  [Configure] [Deploy]                │
└──────────────────────────────────────┘
```

**Action**: Click "Deploy Now"

⏳ **Wait**: Railway will start building and deploying. This takes 2-5 minutes.

---

## STEP 4️⃣: Backend Configuration

Once deployed, click on the **backend service** in your project:

```
┌──────────────────────────────────┐
│  Backend Service                 │
│                                  │
│  📊 Logs  📝 Variables  ⚙️ Settings
│                                  │
│  Click: Variables ➜              │
└──────────────────────────────────┘
```

**Add these variables** (click "New Variable" for each):

| Variable | Value |
|----------|-------|
| `SECRET_KEY` | `your-secret-key-12345` (any random string) |
| `ALGORITHM` | `HS256` |
| `DATABASE_URL` | `sqlite:///./test.db` (optional, for mock data this isn't needed) |
| `CORS_ORIGINS` | Leave blank for now, update later |
| `PORT` | `8000` |

**What you'll see:**
```
┌────────────────────────────────────┐
│  Variables                         │
│                                    │
│  [New Variable]                    │
│                                    │
│  SECRET_KEY = your-secret-key..    │
│  ALGORITHM = HS256                 │
│  PORT = 8000                       │
│  CORS_ORIGINS =                    │
│                                    │
│  [Redeploy] (auto-triggers)        │
└────────────────────────────────────┘
```

✅ **What to expect**: Backend will redeploy automatically. Look for a green indicator.

**Copy your Backend URL**: You'll see it at the top or in settings:
```
https://xxxxxxxxxxxx-production.railway.app
```

---

## STEP 5️⃣: Frontend Configuration

Now click on the **frontend service**:

```
┌──────────────────────────────────┐
│  Frontend Service                │
│                                  │
│  📊 Logs  📝 Variables  ⚙️ Settings
│                                  │
│  Click: Variables ➜              │
└──────────────────────────────────┘
```

**Add this variable:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://xxxxxxxxxxxx-production.railway.app/api` |

Replace `xxxxxxxxxxxx` with your actual backend URL from Step 4.

**Also go to Settings tab:**

Find "Start Command" and set to:
```
npm install && npm run build && npm run preview
```

Set "Root Directory" to:
```
frontend
```

✅ **What to expect**: Frontend will redeploy automatically

**Copy your Frontend URL**:
```
https://yyyyyyyyyyyy-production.railway.app
```

---

## STEP 6️⃣: Update Backend CORS (Important!)

Go back to **backend service**:

1. Click **Variables**
2. Find `CORS_ORIGINS`
3. Set it to:
   ```
   https://yyyyyyyyyyyy-production.railway.app
   ```
   (Use your actual frontend URL from Step 5)

4. Press Enter - backend redeploys automatically

---

## STEP 7️⃣: Test Your Live App! 

Open your **frontend URL** in browser:
```
https://yyyyyyyyyyyy-production.railway.app
```

**You should see:**
```
┌─────────────────────────────────┐
│  TaskFlow Premium               │
│                                 │
│  [Employee] [Admin] toggle      │
│                                 │
│  Email: [____________]          │
│  Password: [____________]       │
│                                 │
│  [Login] button                 │
└─────────────────────────────────┘
```

**Try logging in:**
- Email: `test@example.com`
- Password: `password123`

✅ **If you see the dashboard**: Everything works! 🎉

---

## What if Something Doesn't Work?

### 1. "Cannot connect to backend"
- **Check**: Backend service is running (green status in Railway)
- **Fix**: Go to backend Logs tab and look for errors
- **Verify**: `VITE_API_URL` matches your backend URL exactly
- **Try**: Hard refresh browser (Ctrl+F5)

### 2. "Login fails"
- **Check**: Backend logs for error messages
- **Verify**: `CORS_ORIGINS` is set to frontend URL
- **Wait**: Sometimes takes 30 seconds for new variables to apply

### 3. "Build failed"
- **Check**: Logs in Railway show the error
- **Common causes**:
  - Missing dependency (add to requirements.txt or package.json)
  - Wrong start command
  - Python version issue

### 4. "Blank page"
- **Open browser console** (F12 → Console tab)
- **Look for error messages** - they'll tell you what's wrong
- **Check** Network tab for failed API requests

---

## Your URLs

Once deployed, you have:

**Frontend** (what users see):
```
https://yyyyyyyyyyyy-production.railway.app
```

**Backend API** (backend server):
```
https://xxxxxxxxxxxx-production.railway.app/api
```

---

## Monitoring Your App

In Railway Dashboard:

**Logs Tab**: See real-time messages
- Shows what's happening
- Errors appear here
- Check if requests are coming in

**Metrics Tab**: See CPU, memory, disk usage
- Green = healthy
- Red = problem

**Deployments Tab**: See all deployments
- Each time you update, a new deployment happens
- Can rollback to previous version

---

## Making Updates

After you make changes to your code:

```bash
# 1. Commit changes locally
git add .
git commit -m "Fixed something"

# 2. Push to GitHub
git push origin main

# 3. Railway auto-deploys!
# (if you enabled auto-deploy - recommended)
```

Or manually redeploy from Railway dashboard by clicking "Redeploy".

---

## Sharing Your Live App

**Tell people:**
```
Check out my task management app:
https://yyyyyyyyyyyy-production.railway.app

Features:
✅ User authentication
✅ Admin can assign tasks to employees
✅ Real-time task tracking
✅ Dashboard with statistics
```

**Share the GitHub repo too:**
```
Source code: https://github.com/DotaP27/Full-stack-task-management-with-role-based-access-control
```

---

## Common Questions

**Q: Is it really free?**
A: Yes! Railway gives $5/month free. Our app uses less than that.

**Q: Will my data persist?**
A: Currently using mock data (in-memory). To keep data after restart, add PostgreSQL database.

**Q: Can I use my own domain?**
A: Yes, in Railway settings. But Railway's free URL works fine too.

**Q: What if my app crashes?**
A: Railway auto-restarts it. You'll see in logs what caused the crash.

**Q: How do I update my app?**
A: Push to GitHub → Railway auto-deploys (if auto-deploy enabled)

---

## You're Done! 🎉

Your app is now LIVE on the internet!

- ✅ Real people can access it
- ✅ Works 24/7 on Railway's servers
- ✅ Auto-scales if traffic increases
- ✅ HTTPS (secure) by default
- ✅ Anyone can find it by URL

**Next Steps:**
1. Test everything works
2. Share with friends/portfolio
3. Make improvements
4. Push updates to GitHub
5. Watch it redeploy in minutes!

---

**Need help?** Check Railway docs: https://docs.railway.app/
