# 🔧 Fix Database Schema Error

## The Problem

You're getting this error:
```
sqlite3.OperationalError: table spin_logs has no column named restaurant_name
```

This happens because the database was created with the old schema, but the code now uses a new schema with restaurant information.

## Quick Fix

**Option 1: Run the reset script (Easiest)**

1. Stop the backend server (Ctrl+C)
2. In the backend folder, run:
   ```powershell
   python reset_database.py
   ```
3. Restart the server

**Option 2: Manual deletion**

1. Stop the backend server (Ctrl+C)
2. Delete the file: `backend\wheeleat.db`
3. Restart the server - it will create a new database automatically

**Option 3: Use the batch file**

The `start_backend.bat` script now automatically detects and fixes this issue. Just restart the server using:
```powershell
.\start_backend.bat
```

## What This Does

- Deletes the old database file
- Creates a new database with the correct schema (includes restaurant_name, restaurant_unit, restaurant_floor columns)

**Note**: This will delete all previous spin history. If you need to keep the data, you'd need to write a migration script (not included here).

