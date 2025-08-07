# 🚀 Emerlya MVP - Netlify Deployment Guide

## ✅ Step 1: Code Preparation - COMPLETED
Your code has been staged and committed locally with the message:
"feat: Complete MVP build ready for first deployment"

**Commit Details:**
- 21 files changed, 1868 insertions(+), 130 deletions(-)
- All MVP features included: authentication, billing, AI generation, webhooks

## 📋 Next Steps (You'll need to complete these):

### Step 2: Create GitHub Repository
1. Go to GitHub.com and create a new repository named "emerlya-mvp" or "cora-ai"
2. **Important:** Do NOT initialize with README, .gitignore, or license (since your local repo already exists)
3. Copy the repository URL (e.g., https://github.com/yourusername/emerlya-mvp.git)

### Step 3: Connect Local Repository to GitHub
Run these commands in your terminal:
```powershell
Set-Location cora
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Netlify
1. **Login to Netlify** and click "Add new site" → "Import an existing project"
2. **Connect GitHub** and select your repository
3. **Build Settings:**
   - Build command: `next build`
   - Publish directory: `.next`
4. **Deploy** (it will fail initially - this is expected!)

### Step 5: Add Environment Variables (CRITICAL!)
In Netlify dashboard → Site configuration → Build & deploy → Environment variables:

**Copy ALL these variables from your .env.local file:**
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_KEY_HERE

# App Configuration  
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app

# OpenAI
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

# Pinecone
PINECONE_API_KEY=YOUR_PINECONE_API_KEY_HERE  
PINECONE_HOST=YOUR_PINECONE_HOST_HERE

# Stripe
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_STRIPE_PRICE_ID=YOUR_STRIPE_PRICE_ID_HERE
```

**⚠️ IMPORTANT:** Replace all placeholder values with your actual keys from `.env.local`

**⚠️ Important:** Update `NEXT_PUBLIC_SITE_URL` to your actual Netlify URL once deployed!

### Step 6: Final Deploy
After adding environment variables:
1. Go to "Deploys" tab in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. ✅ Your site should now build successfully!

## 🎉 Your Emerlya MVP Will Be Live!
Once deployed, your application will have:
- ✅ Full user authentication
- ✅ Stripe payments ($24.99/month subscriptions)
- ✅ AI content generation with OpenAI
- ✅ Brand management system
- ✅ Document processing with Pinecone
- ✅ Production-ready webhooks
