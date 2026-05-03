# Railway Deployment Checklist

Print this out or keep it open while deploying! ✓

---

## BEFORE YOU START

- [ ] GitHub repository pushed: https://github.com/DotaP27/Full-stack-task-management-with-role-based-access-control
- [ ] You have a GitHub account
- [ ] You can access your email (for Railway signup)
- [ ] Have your secret key ready (or just use `mysecretkey123`)

---

## SIGN UP TO RAILWAY

- [ ] Go to https://railway.app/
- [ ] Click "Start Free"
- [ ] Sign up with GitHub
- [ ] Authorize Railway
- [ ] You're in Railway dashboard ✅

---

## CREATE PROJECT

- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Search: `Full-stack-task-management`
- [ ] Click on your repository
- [ ] Click "Deploy Now"
- [ ] ⏳ Wait 2-5 minutes for deployment

---

## CONFIGURE BACKEND

In Railway dashboard:

- [ ] Click on **backend** service
- [ ] Go to **Variables** tab
- [ ] Add these variables:

| Variable | Value | ✓ |
|----------|-------|---|
| `SECRET_KEY` | `mysecretkey123` | [ ] |
| `ALGORITHM` | `HS256` | [ ] |
| `PORT` | `8000` | [ ] |

- [ ] Click "Redeploy" (or auto-redeployed)
- [ ] Wait for green status ✅
- [ ] **COPY YOUR BACKEND URL** (looks like `https://xxxx-production.railway.app`)

```
My Backend URL: ___________________________________
```

---

## CONFIGURE FRONTEND

In Railway dashboard:

- [ ] Click on **frontend** service
- [ ] Go to **Variables** tab
- [ ] Add this variable:

| Variable | Value | ✓ |
|----------|-------|---|
| `VITE_API_URL` | `https://[BACKEND_URL]/api` | [ ] |

(Replace `[BACKEND_URL]` with the URL you copied above)

- [ ] Go to **Settings** tab
- [ ] Find **Start Command**, set to: `npm install && npm run build && npm run preview`
- [ ] Find **Root Directory**, set to: `frontend`
- [ ] Click "Redeploy"
- [ ] Wait for green status ✅
- [ ] **COPY YOUR FRONTEND URL** (looks like `https://yyyy-production.railway.app`)

```
My Frontend URL: ___________________________________
```

---

## FINAL SETUP: Update Backend CORS

Back to **backend** service:

- [ ] Go to **Variables** tab
- [ ] Find `CORS_ORIGINS`
- [ ] Set it to your frontend URL (from above)
- [ ] Example: `https://yyyy-production.railway.app`
- [ ] Press Enter
- [ ] Auto-redeploys ✅

---

## TEST YOUR APP

- [ ] Open your **Frontend URL** in browser
- [ ] You should see the TaskFlow login page
- [ ] Try logging in with:
  - Email: `test@example.com`
  - Password: `password123`
- [ ] You should see the dashboard
- [ ] ✅ Success!

---

## TROUBLESHOOTING

If something doesn't work:

- [ ] **Blank page?** 
  - Check browser console (F12 → Console)
  - Look for error messages

- [ ] **Can't login?**
  - Wait 30 seconds for variables to apply
  - Check backend logs in Railway
  - Verify `VITE_API_URL` is correct

- [ ] **Deployment failed?**
  - Click on failed service
  - Go to **Logs** tab
  - Read the error message
  - Common: Missing dependency or wrong command

- [ ] **Still stuck?**
  - Check RAILWAY_DEPLOYMENT.md for detailed help
  - Railway docs: https://docs.railway.app/
  - Check backend logs for exact error

---

## SHARE YOUR APP

- [ ] **Frontend URL**: `https://yyyy-production.railway.app`
- [ ] **GitHub Repo**: `https://github.com/DotaP27/Full-stack-task-management-with-role-based-access-control`

Tell your friends:
```
Check out my app at: https://yyyy-production.railway.app

It's a full-stack task management system with:
✅ User authentication
✅ Admin & employee roles
✅ Task assignment & tracking
✅ Real-time status updates
✅ Professional dark UI

Source: https://github.com/DotaP27/Full-stack-task-management-with-role-based-access-control
```

---

## MONITORING

In Railway dashboard:

- [ ] **Logs**: See what's happening in real-time
- [ ] **Metrics**: Check CPU, memory, disk usage
- [ ] **Deployments**: See deployment history
- [ ] **Settings**: Change configuration anytime

---

## MAKING UPDATES

When you make changes:

```bash
# 1. Commit locally
git add .
git commit -m "Your message"

# 2. Push to GitHub
git push origin main

# 3. Railway auto-deploys!
```

Then watch the deployment in Railway dashboard.

---

## YOU'RE LIVE! 🎉

Your app is now on the internet, 24/7, accessible worldwide!

- ✅ Works automatically
- ✅ Auto-restarts if it crashes
- ✅ HTTPS secure
- ✅ Shows real logs
- ✅ Free to use

---

## NEXT STEPS (Optional)

Want to enhance your deployment?

- [ ] Add PostgreSQL database (for persistent data)
- [ ] Add custom domain (instead of railway.app)
- [ ] Set up auto-deploy from GitHub
- [ ] Configure monitoring alerts
- [ ] Add more team members to Railway project

---

**Estimated time**: 10-15 minutes total
**Result**: Live app on the internet ✅

Good luck! 🚀
