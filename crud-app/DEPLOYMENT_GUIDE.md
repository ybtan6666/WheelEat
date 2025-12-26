# 🚀 Deployment Guide - CRUD User Management App

Complete step-by-step guide to deploy your app using **Vercel** (free hosting) and **Supabase** (free database).

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Supabase account (free)

---

## 🗄️ Part 1: Setup Supabase Database (5 minutes)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Click **"New Project"**
4. Fill in:
   - **Name:** `crud-app` (or any name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

### Step 2: Create Database Table

1. In your Supabase project, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Copy and paste the SQL from `database/schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   ALTER TABLE users ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow all operations" ON users
     FOR ALL
     USING (true)
     WITH CHECK (true);

   CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
   ```
4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 3: Get API Keys

1. Click **"Settings"** (gear icon) → **"API"**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

**Keep these handy - you'll need them for Vercel!**

---

## ☁️ Part 2: Deploy to Vercel (5 minutes)

### Option A: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name: `crud-app`
   - Make it **Public** or **Private** (your choice)
   - Click **"Create repository"**

2. Push your code:
   ```bash
   cd crud-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/crud-app.git
   git push -u origin main
   ```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign up"** (use GitHub to sign in)
3. Click **"Add New Project"**
4. Import your GitHub repository (`crud-app`)
5. Click **"Import"**

#### Step 3: Configure Environment Variables

1. In Vercel project settings, go to **"Environment Variables"**
2. Add these two variables:

   **Variable 1:**
   - Name: `SUPABASE_URL`
   - Value: Your Supabase Project URL (from Part 1, Step 3)
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**
   - Name: `SUPABASE_ANON_KEY`
   - Value: Your Supabase anon public key (from Part 1, Step 3)
   - Environment: Production, Preview, Development (check all)

3. Click **"Save"**

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Your app will be live at: `https://your-app-name.vercel.app`

---

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Navigate to project:
   ```bash
   cd crud-app
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Add environment variables:
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   ```

6. Redeploy:
   ```bash
   vercel --prod
   ```

---

## 🔧 Part 3: Update Frontend API URL (1 minute)

After deployment, update the API URL in `frontend/app.js`:

1. Open `frontend/app.js`
2. Find line 2:
   ```javascript
   const API_URL = window.location.origin;
   ```
3. This should already work! But if you need a custom API URL, change it to:
   ```javascript
   const API_URL = 'https://your-app-name.vercel.app';
   ```

4. Commit and push if using GitHub:
   ```bash
   git add .
   git commit -m "Update API URL"
   git push
   ```

---

## ✅ Part 4: Test Your App

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Click **"+ Add User"**
3. Fill in name and email
4. Click **"Save"**
5. Verify the user appears in the list
6. Test Edit and Delete functions

---

## 📁 Project Structure

```
crud-app/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   └── app.js              # Frontend JavaScript
├── api/
│   └── users/
│       ├── index.js        # GET all, POST user
│       └── [id].js         # GET, PUT, DELETE single user
├── database/
│   └── schema.sql          # Database table creation
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variables template
├── .gitignore
└── DEPLOYMENT_GUIDE.md     # This file
```

---

## 🔍 Troubleshooting

### API returns 500 error
- Check environment variables in Vercel are set correctly
- Verify Supabase URL and key are correct
- Check Vercel logs: Project → Deployments → Click deployment → Logs

### Database connection failed
- Verify table exists in Supabase SQL Editor
- Check RLS policies are enabled
- Ensure API keys are correct

### CORS errors
- API routes already include CORS headers
- If issues persist, check Vercel function logs

---

## 🎉 You're Done!

Your app is now live with:
- ✅ Free hosting on Vercel
- ✅ Free PostgreSQL database on Supabase
- ✅ Full CRUD functionality
- ✅ Responsive design

---

## 📚 Useful Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Supabase Dashboard:** [app.supabase.com](https://app.supabase.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)

---

**Need help?** Check Vercel function logs or Supabase logs for error messages.

