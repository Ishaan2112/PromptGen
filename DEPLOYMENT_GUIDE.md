# 🚀 Free Deployment Guide for PromptGen Tool

This guide will help you deploy your application using **free tiers**:
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Node.js)

## 📋 Prerequisites

1. **GitHub Account**: For version control
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Render Account**: Sign up at [render.com](https://render.com)
4. **Google Gemini API Key**: For AI functionality

## 🌐 **Step 1: Deploy Backend to Render**

### 1.1 Push Code to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for deployment"
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/promptgen-tool.git
git push -u origin main
```

### 1.2 Deploy to Render
1. **Go to [render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `promptgen-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: `Free`

### 1.3 Set Environment Variables
In Render dashboard, go to **Environment** tab and add:
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
GEMINI_API_KEY=your_gemini_api_key_here
```

### 1.4 Deploy
Click **"Create Web Service"** and wait for deployment.

**Your backend URL will be**: `https://promptgen-backend.onrender.com`

## 🎨 **Step 2: Deploy Frontend to Vercel**

### 2.1 Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.2 Set Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables** and add:
```
NEXT_PUBLIC_API_URL=https://promptgen-backend.onrender.com
```

### 2.3 Deploy
Click **"Deploy"** and wait for deployment.

**Your frontend URL will be**: `https://your-app-name.vercel.app`

## 🔧 **Step 3: Update Backend CORS**

After getting your Vercel frontend URL, update the backend CORS in Render:

1. **Go back to Render dashboard**
2. **Update the `FRONTEND_URL`** environment variable with your actual Vercel URL
3. **Redeploy the backend** (it will auto-redeploy)

## 🧪 **Step 4: Test Your Deployment**

### Test Backend
```bash
curl https://promptgen-backend.onrender.com/ai/health
```

### Test Frontend
Visit your Vercel URL and try:
1. **Loading the page** ✅
2. **Generating a prompt** ✅
3. **API communication** ✅

## 📱 **Final URLs**

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://promptgen-backend.onrender.com`
- **API Health**: `https://promptgen-backend.onrender.com/ai/health`

## 🚨 **Troubleshooting**

### Common Issues

1. **CORS Errors**:
   - Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
   - Check that the backend has been redeployed after updating CORS

2. **Build Failures**:
   - Check build logs in both Vercel and Render
   - Ensure all dependencies are in `package.json`

3. **Environment Variables**:
   - Verify all variables are set correctly
   - Check variable names match exactly

4. **API Connection**:
   - Test backend health endpoint first
   - Check browser console for errors
   - Verify API URL in frontend environment

### Useful Commands

```bash
# Check backend status
curl -I https://promptgen-backend.onrender.com/ai/health

# Test CORS
curl -H "Origin: https://your-app-name.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS https://promptgen-backend.onrender.com/ai/generate-prompt
```

## 🔐 **Security Notes**

- **Never commit API keys** to Git
- **Use environment variables** for sensitive data
- **Enable HTTPS** (automatic on both platforms)
- **Monitor usage** to stay within free tier limits

## 📊 **Free Tier Limits**

### Render (Backend)
- **750 hours/month** (enough for 24/7 usage)
- **Auto-sleep** after 15 minutes of inactivity
- **512 MB RAM**, **0.1 CPU**

### Vercel (Frontend)
- **100 GB bandwidth/month**
- **Unlimited deployments**
- **Automatic HTTPS**

## 🎯 **Next Steps**

1. **Monitor your apps** in both dashboards
2. **Set up custom domains** if needed
3. **Add monitoring** and logging
4. **Scale up** when you hit limits

---

🎉 **Your PromptGen Tool is now deployed for FREE!**

**Frontend**: Vercel (Next.js)
**Backend**: Render (Node.js)
**Cost**: $0/month
