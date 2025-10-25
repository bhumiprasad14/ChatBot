# Chatbot Deployment Guide for Vercel

## 🚀 Quick Deployment Steps

### 1. Frontend Deployment (Recommended)
Since your chatbot is a React frontend app, deploy only the frontend to Vercel:

```bash
# Option A: Deploy from root directory (uses vercel.json config)
vercel --prod

# Option B: Deploy frontend directory directly
cd frontend
vercel --prod
```

### 2. Backend Deployment Options
Your Express backend needs to be deployed separately:

**Option A: Deploy backend to Vercel as serverless functions**
- Move backend files to `api/` folder in root
- Convert Express routes to Vercel serverless functions

**Option B: Deploy backend to other platforms**
- Railway, Render, or Heroku for the Express server
- Update frontend API endpoints to point to deployed backend

## 🔧 Configuration Files Added

### `vercel.json` (Root)
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Updated `frontend/vite.config.js`
- Added proper build configuration
- Set correct base path for deployment
- Optimized for production builds

## 🐛 Common 404 Issues Fixed

1. **SPA Routing**: Added rewrites to handle client-side routing
2. **Build Output**: Configured correct output directory
3. **Asset Paths**: Set proper base path for assets

## 📝 Deployment Checklist

- [x] Created `vercel.json` configuration
- [x] Updated Vite config for production
- [x] Set up SPA routing rewrites
- [ ] Update API endpoints in frontend (if backend is deployed elsewhere)
- [ ] Set up environment variables in Vercel dashboard
- [ ] Test deployment

## 🌐 Environment Variables

If your frontend needs environment variables, add them in:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Or create `.env.local` in frontend folder (add to .gitignore)

## 🔗 Next Steps

1. **Deploy Frontend**: Run `vercel --prod` from root directory
2. **Deploy Backend**: Choose a platform and deploy your Express server
3. **Update API URLs**: Modify frontend to use deployed backend URLs
4. **Test**: Verify all functionality works in production

## 📞 Backend Deployment (Separate)

For your Express backend, consider:
- **Vercel Functions**: Convert to serverless (requires restructuring)
- **Railway**: Easy deployment with database support
- **Render**: Free tier available
- **Heroku**: Classic choice (paid plans only now)

## 🔍 Troubleshooting

- **404 on refresh**: Fixed with rewrites in vercel.json
- **Build fails**: Check if all dependencies are in frontend/package.json
- **API not working**: Ensure CORS is configured for your domain
- **Assets not loading**: Verify base path in vite.config.js
