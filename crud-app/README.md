# 👥 User Management CRUD App

A complete web application for managing users with Create, Read, Update, and Delete (CRUD) operations.

## 🚀 Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js serverless functions (Vercel)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (free tier)

## ✨ Features

- ✅ Create new users
- ✅ View all users
- ✅ Edit existing users
- ✅ Delete users
- ✅ Responsive design
- ✅ Real-time database operations

## 📦 Quick Start

### 1. Clone this repository

```bash
git clone <your-repo-url>
cd crud-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

Follow the steps in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) Part 1.

### 4. Configure environment variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Deploy to Vercel

Follow the steps in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) Part 2.

## 📖 Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

## 🛠️ Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

## 📝 License

MIT

