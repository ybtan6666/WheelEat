# 🚀 WheelEat Setup Guide - Fix All Issues

## ⚠️ IMPORTANT: Python Version

**You MUST use Python 3.11 or 3.12** - NOT Python 3.14!

Python 3.14 is too new and causes installation errors. Here's how to fix it:

### Step 1: Install Python 3.12 (Recommended)

1. Go to https://www.python.org/downloads/
2. Download **Python 3.12.x** (latest 3.12 version)
3. During installation, check ✅ **"Add Python to PATH"**
4. Install it

### Step 2: Verify Python Version

Open PowerShell and run:
```powershell
python --version
```

You should see: `Python 3.12.x` (NOT 3.14!)

If you see 3.14, you need to:
- Uninstall Python 3.14, OR
- Use `py -3.12` instead of `python` (if you have multiple versions)

### Step 3: Clean Setup

1. **Delete old virtual environment** (in PowerShell):
   ```powershell
   cd backend
   Remove-Item -Recurse -Force venv -ErrorAction SilentlyContinue
   ```

2. **Create new virtual environment**:
   ```powershell
   python -m venv venv
   ```

3. **Activate it**:
   ```powershell
   venv\Scripts\activate
   ```

4. **Upgrade pip**:
   ```powershell
   python -m pip install --upgrade pip
   ```

5. **Install packages**:
   ```powershell
   pip install -r requirements.txt
   ```

If this still fails, try the installation script:
```powershell
python install_requirements.py
```

### Step 4: Start Backend

```powershell
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Step 5: Start Frontend (New Terminal)

```powershell
cd frontend
npm install
npm start
```

## Quick Fix Commands (Copy & Paste)

If you're stuck, run these commands in order:

```powershell
# Navigate to backend
cd backend

# Remove old venv
Remove-Item -Recurse -Force venv -ErrorAction SilentlyContinue

# Create new venv
python -m venv venv

# Activate
venv\Scripts\activate

# Upgrade pip
python -m pip install --upgrade pip

# Install packages
pip install fastapi==0.115.6 uvicorn==0.34.0 sqlalchemy==2.0.36 python-dotenv==1.0.1 python-multipart==0.0.20 pydantic==2.9.2

# Start server
uvicorn main:app --reload --port 8000
```

## Still Having Issues?

1. **Check Python version**: `python --version` (must be 3.11 or 3.12)
2. **Make sure venv is activated**: You should see `(venv)` in your prompt
3. **Try the installation script**: `python install_requirements.py`
4. **Check for errors**: Read the error message carefully

## Common Errors Fixed

✅ **"Rust not found"** → Use Python 3.11/3.12  
✅ **"pydantic-core compilation error"** → Use Python 3.11/3.12  
✅ **"ModuleNotFoundError: No module named 'fastapi'"** → Make sure venv is activated  
✅ **"uvicorn: command not found"** → Install packages first  

