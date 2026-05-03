# DEPLOYMENT_GUIDE.md

## Deployment to Railway 🚀

This guide will help you deploy the Team Task Manager application to Railway.

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository
- Docker (for local testing)

### Step 1: Prepare Your GitHub Repository

1. Create a GitHub repository
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/task-manager.git
   git push -u origin main
   ```

### Step 2: Set Up Railway Project

1. Go to https://railway.app and sign in
2. Click "Create New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select the task-manager repository

### Step 3: Configure Services

#### PostgreSQL Database

1. Click "Add a Service" → "Database" → "PostgreSQL"
2. Railway will automatically create a PostgreSQL database
3. Note the database credentials (you'll need them)

#### Backend Service

1. Click "Add a Service" → "GitHub Repo"
2. Select your repository
3. Configure the service:
   - **Service Name**: task-manager-backend
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. Add environment variables:
   - Go to Variables tab
   - Add the following:
     ```
     DATABASE_URL=postgresql://${{Postgres.PGUSER}}:${{Postgres.PGPASSWORD}}@${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
     SECRET_KEY=your-secret-key-generate-a-strong-one
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=30
     CORS_ORIGINS=https://your-frontend-url.railway.app
     ```

5. Click "Deploy" to start the deployment

#### Frontend Service

1. Click "Add a Service" → "GitHub Repo"
2. Select your repository again
3. Configure the service:
   - **Service Name**: task-manager-frontend
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm install -g serve && serve -s dist -l $PORT`

4. Add environment variables:
   - `VITE_API_URL=https://task-manager-backend.railway.app/api`

5. Click "Deploy" to start the deployment

### Step 4: Enable Public Access

1. For Backend Service:
   - Go to the "Networking" tab
   - Enable "Public Network Access"
   - Copy the public URL

2. For Frontend Service:
   - Go to the "Networking" tab
   - Enable "Public Network Access"
   - Copy the public URL

### Step 5: Update CORS Settings

1. Go back to the Backend service variables
2. Update `CORS_ORIGINS` to include your frontend URL:
   ```
   CORS_ORIGINS=https://your-frontend-url.railway.app
   ```

3. Redeploy the backend service

### Step 6: Test Your Deployment

1. Open your frontend URL in a browser
2. Try registering a new user
3. Create a project and add tasks
4. Verify all features work

### Step 7: Monitor and Logs

1. In Railway, each service has a "Logs" tab
2. Check logs for any errors or issues
3. Use "Metrics" tab to monitor CPU and memory usage

## Troubleshooting 🔧

### Database Connection Issues
- Check that DATABASE_URL is correct
- Verify PostgreSQL service is running
- Check database credentials

### CORS Errors
- Update CORS_ORIGINS in backend environment variables
- Make sure the frontend URL includes the domain and port
- Redeploy after making changes

### 502 Bad Gateway
- Check backend service logs
- Ensure start command is correct
- Verify all dependencies are installed

### Frontend Blank Page
- Check browser console for errors
- Verify VITE_API_URL points to correct backend
- Check frontend build logs

## Performance Optimization 📊

1. **Use Railway's built-in caching**:
   - Enable Redis for session management
   - Cache API responses

2. **Database optimization**:
   - Add indexes to frequently queried columns
   - Use connection pooling

3. **Frontend optimization**:
   - Enable gzip compression
   - Use CDN for static assets
   - Lazy load components

## Security Best Practices 🔐

1. Change SECRET_KEY to a strong random value
2. Never commit .env files with real secrets
3. Use HTTPS for all connections
4. Enable database encryption at rest
5. Regular security audits
6. Keep dependencies updated

## Backing Up Data 💾

1. Railway automatically backs up PostgreSQL data
2. Configure daily backups in Railway dashboard
3. Download backups regularly for safety

## Scaling 📈

As your application grows:

1. Upgrade database plan for more storage
2. Enable read replicas for better performance
3. Use caching layer (Redis)
4. Implement load balancing for multiple frontend instances
5. Consider microservices architecture

## Support 💬

For Railway-specific issues:
- Visit Railway documentation: https://docs.railway.app
- Contact Railway support through the dashboard
- Check Railway status page for service incidents
