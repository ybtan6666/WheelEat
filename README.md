# 🍽️ WheelEat - Spin Wheel Restaurant Picker

A simple, fun web application that helps you decide where to eat by spinning a wheel! Select your dietary preferences and restaurant categories, then spin the wheel to get a random recommendation.

## Features

- 🎰 Interactive spin wheel with smooth animations
- 🏬 **Multi-mall support** - Switch between different shopping malls
- 🥗 Dietary needs selection (Any, Halal & Pork Free)
- 🏪 Multiple restaurant category selection
- 🍽️ **70+ real restaurants from Sunway Square Mall** (easily add more malls)
- 📍 Shows restaurant name, unit number, and floor
- 📊 Anonymous data tracking for future analytics
- 📱 Mobile-friendly responsive design
- 🎨 Beautiful, modern UI

## Tech Stack

- **Frontend**: React 18
- **Backend**: FastAPI (Python)
- **Database**: SQLite (easily switchable to PostgreSQL)
- **Python**: Compatible with Python 3.14

## Prerequisites

- **Python 3.14** (or 3.11/3.12) - [Download Python](https://www.python.org/downloads/)
- **Node.js 16 or higher** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)

**Note for Python 3.14 users**: If you encounter installation errors with `pydantic-core`, you may need to install Rust. See the Troubleshooting section below.

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`

4. Install dependencies:
```bash
# Option 1: Use the installation script (recommended for Python 3.14)
python install.py

# Option 2: Install directly
pip install -r requirements.txt
```

5. Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### Frontend Setup

1. Open a **new** terminal window

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

## Usage

1. Select your dietary needs (Any or Halal & Pork Free)
2. Choose one or more restaurant categories (e.g., Japanese Cuisine, Coffee & Cafes)
3. Click "🎰 Spin the Wheel!" button
4. Watch the wheel spin and get a random restaurant from your selected categories!
5. See the restaurant name, unit number, and floor location

## Restaurant Data

The app includes **70+ restaurants from Sunway Square Mall**, organized by categories:
- Coffee & Cafes
- Local & Malaysian
- Western & International
- Japanese Cuisine
- Chinese & Taiwanese
- Korean Cuisine
- Tea & Beverages
- Bakery & Pastry
- Snacks & Desserts
- Fast Food
- And more!

## Troubleshooting

### Python 3.14 Installation Issues

**Problem**: `pydantic-core` compilation error / Rust not found

**Solution**: Python 3.14 requires Rust to compile `pydantic-core` from source. You have two options:

1. **Install Rust** (recommended if you want to use Python 3.14):
   - Download from: https://rustup.rs/
   - Run the installer
   - Restart your terminal
   - Run `python install.py` again

2. **Use Python 3.12** (easier, no Rust needed):
   - Download Python 3.12: https://www.python.org/downloads/
   - Create a new virtual environment with Python 3.12
   - Install dependencies normally

### Other Common Issues

**Problem**: `table spin_logs has no column named restaurant_name`
- **Solution**: The database schema was updated. Run this to fix:
  ```bash
  cd backend
  python reset_database.py
  ```
  Or delete `wheeleat.db` manually and restart the server. See `FIX_DATABASE.md` for details.

**Problem**: `uvicorn: command not found`
- **Solution**: Make sure your virtual environment is activated and dependencies are installed

**Problem**: Port 8000 already in use
- **Solution**: Change the port: `uvicorn main:app --reload --port 8001`

**Problem**: Cannot connect to backend
- **Solution**: Make sure the backend is running on port 8000

**Problem**: `npm install` fails
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Database

The application uses SQLite by default. The database file (`wheeleat.db`) is created automatically in the backend directory.

### Database Schema

- **spin_logs** table:
  - `id`: Primary key
  - `category`: Selected restaurant category
  - `dietary_need`: Dietary preference
  - `timestamp`: When the spin occurred
  - `mall_id`: Placeholder for future multi-mall support
  - `selected_categories`: JSON array of all selected categories

### Switching to PostgreSQL

1. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

2. Set environment variable:
```bash
# Windows
set DATABASE_URL=postgresql://user:password@localhost/wheeleat

# macOS/Linux
export DATABASE_URL=postgresql://user:password@localhost/wheeleat
```

## API Endpoints

- `GET /` - API health check
- `GET /api/malls` - Get all available shopping malls
- `GET /api/categories?mall_id=<mall_id>` - Get categories for a specific mall
- `GET /api/restaurants?categories=<categories>&mall_id=<mall_id>` - Get restaurants filtered by categories and mall
- `POST /api/spin` - Spin the wheel and log result (includes mall_id)
- `GET /api/stats` - Get spin statistics
- `GET /api/spins/export` - Export all spin data for analytics

## Project Structure

```
WheelEat/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database models and setup
│   ├── requirements.txt  # Python dependencies
│   └── install.py        # Installation script for Python 3.14
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Adding New Shopping Malls

To add a new shopping mall to the application:

1. **Add restaurant data** in `backend/restaurants.py`:
   ```python
   MALL_RESTAURANTS = {
       "sunway_square": [
           # ... existing restaurants ...
       ],
       "new_mall_id": [
           ["Restaurant Name 1", "Unit 1", "Floor 1", "Category 1"],
           ["Restaurant Name 2", "Unit 2", "Floor 2", "Category 2"],
           # ... more restaurants ...
       ],
   }
   ```

2. **Add mall metadata** in `backend/restaurants.py`:
   ```python
   MALL_INFO = {
       "sunway_square": {
           "name": "Sunway Square",
           "display_name": "Sunway Square Mall"
       },
       "new_mall_id": {
           "name": "New Mall",
           "display_name": "New Mall Name"
       },
   }
   ```

3. **Restart the backend server** - the new mall will automatically appear in the dropdown!

The frontend will automatically load and display all available malls from the API.

## Extensibility

- **Adding new malls**: See "Adding New Shopping Malls" section above
- **Adding new categories**: Categories are automatically generated from restaurant data
- **Adding new dietary options**: Update the `DIETARY_OPTIONS` array in `frontend/src/components/DietarySelector.js`
- **Exporting data**: Use the `/api/spins/export` endpoint to get all spin data in JSON format

