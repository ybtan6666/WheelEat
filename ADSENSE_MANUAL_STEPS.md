# 📋 AdSense Setup - What YOU Need to Do

## ✅ What I Already Did (Automatic):

- ✅ Created AdSense React component
- ✅ Added AdSense script to HTML
- ✅ Integrated ads in 3 locations (header, sidebar, content)
- ✅ Made ads responsive
- ✅ Connected to environment variables

---

## 🔧 What YOU Need to Handle:

### Step 1: Get Google AdSense Account (If You Don't Have One)

1. **Sign up for AdSense:**
   - Visit: https://www.google.com/adsense/
   - Click "Get Started"
   - Sign in with your Google account
   - Fill out the application form
   - Wait for approval (can take 1-7 days)

**Note:** You need an approved AdSense account to get ad codes.

---

### Step 2: Get Your Publisher ID

Once approved:

1. **Log into Google AdSense:**
   - Go to: https://www.google.com/adsense/
   - Click "Sites" or "Get started"

2. **Find your Publisher ID:**
   - It looks like: `ca-pub-1234567890123456`
   - Usually shown in the dashboard or under "Account" → "Account information"

---

### Step 3: Create Ad Units

You need to create 2 separate ad units (one for each location):

#### Create Ad Unit 1: Header Ad (Top)

1. In AdSense dashboard, go to **"Ads"** → **"By ad unit"**
2. Click **"Display ads"** → **"Create ad unit"**
3. Fill in:
   - **Name:** `WheelEat Header Ad`
   - **Ad size:** Responsive (recommended) or `728x90` (Leaderboard)
   - **Ad type:** Display ads
4. Click **"Create"**
5. **Copy the Ad Slot ID** (looks like: `1234567890`)
   - This is shown as "Ad unit ID" or "data-ad-slot"

#### Create Ad Unit 2: Bottom Ad

1. Click **"Create ad unit"** again
2. Fill in:
   - **Name:** `WheelEat Bottom Ad`
   - **Ad size:** Responsive or `728x90` (Leaderboard)
   - **Ad type:** Display ads
3. Click **"Create"**
4. **Copy the Ad Slot ID**

---

### Step 4: Update Your Code

#### A. Update `frontend/public/index.html`

Find this line (around line 9):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
```

**Replace:**
- `YOUR_PUBLISHER_ID` with your actual Publisher ID

**Example:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
```

#### B. Update `frontend/.env` File

Add these lines to your `.env` file:
```env
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
REACT_APP_ADSENSE_HEADER_SLOT=YOUR_HEADER_AD_SLOT_ID
REACT_APP_ADSENSE_BOTTOM_SLOT=YOUR_BOTTOM_AD_SLOT_ID
```

**Replace:**
- `YOUR_PUBLISHER_ID` → Your Publisher ID (e.g., `1234567890123456`)
- `YOUR_HEADER_AD_SLOT_ID` → Header (top) ad slot ID
- `YOUR_BOTTOM_AD_SLOT_ID` → Bottom ad slot ID

**Example:**
```env
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
REACT_APP_ADSENSE_HEADER_SLOT=1234567890
REACT_APP_ADSENSE_BOTTOM_SLOT=0987654321
```

---

### Step 5: Restart Your App

After updating the files:

1. **Stop your frontend server** (Ctrl+C)
2. **Start it again:**
   ```bash
   npm start
   ```

**Important:** Environment variables only load when the app starts, so you must restart!

---

## ✅ Checklist

Before ads will work:

- [ ] AdSense account approved
- [ ] Publisher ID obtained
- [ ] 2 ad units created (Header + Bottom)
- [ ] 2 ad slot IDs copied
- [ ] `index.html` updated with Publisher ID
- [ ] `.env` file updated with all IDs
- [ ] Frontend server restarted

---

## 🆘 Troubleshooting

### "No ads showing"
- Check that AdSense account is approved
- Verify Publisher ID is correct (no typos)
- Make sure ad slot IDs are correct
- Check browser console (F12) for errors
- Restart dev server after changing `.env`

### "Invalid publisher ID"
- Double-check the Publisher ID format: `ca-pub-` followed by numbers
- Make sure there are no extra spaces
- Verify you copied the full ID

### "Ad unit ID not found"
- Make sure you created the ad units in AdSense
- Copy the "Ad unit ID" (not the "Ad code")
- Check for typos in `.env` file

---

## 📝 Quick Reference

**Files to edit:**
1. `frontend/public/index.html` - Line ~9 (Publisher ID)
2. `frontend/.env` - Add 4 lines (Publisher ID + 3 slot IDs)

**What you need from AdSense:**
- Publisher ID: `ca-pub-XXXXXXXXXX`
- Header Ad Slot ID: `XXXXXXXXXX` (top of page)
- Bottom Ad Slot ID: `XXXXXXXXXX` (bottom of page)

---

## 🎯 Summary

**What I did:** Code implementation ✅  
**What you do:** Get AdSense IDs and add them to the files ✅

Once you add the IDs, ads will automatically appear in the 3 locations!

