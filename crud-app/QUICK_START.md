# ⚡ Quick Start Guide

## 🎯 What You Need to Do Yourself (Manual Steps)

### 1️⃣ Create Supabase Account & Project (5 min)

1. Go to: https://supabase.com
2. Sign up / Sign in (free)
3. Click **"New Project"**
4. Fill in:
   - Name: `crud-app`
   - Password: (save it!)
   - Region: (choose closest)
5. Wait 2-3 minutes for setup

### 2️⃣ Create Database Table (2 min)

1. In Supabase dashboard → **"SQL Editor"**
2. Click **"New query"**
3. Copy SQL from `database/schema.sql` and paste
4. Click **"Run"**

### 3️⃣ Get API Keys (1 min)

1. Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

### 4️⃣ Deploy to Vercel (5 min)

**Option A: Via GitHub**
1. Create GitHub repo
2. Push code: `git push`
3. Go to vercel.com → Import repo
4. Add environment variables:
   - `SUPABASE_URL` = Your Project URL
   - `SUPABASE_ANON_KEY` = Your anon key
5. Click Deploy

**Option B: Via CLI**
```bash
npm install -g vercel
cd crud-app
vercel login
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel --prod
```

### 5️⃣ Test Your App

Visit your Vercel URL and test CRUD operations!

---

## ✅ Checklist

- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database table created (SQL executed)
- [ ] API keys copied
- [ ] Code pushed to GitHub (or ready for Vercel CLI)
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] App tested and working

---

**📖 Full details:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

