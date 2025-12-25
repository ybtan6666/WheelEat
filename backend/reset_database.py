"""
Script to reset the database - deletes and recreates all tables
Run this if you get database schema errors like "table spin_logs has no column named restaurant_name"
"""
from database import init_db, Base, engine
import os

def reset_database():
    """Delete database file and recreate tables"""
    db_file = "wheeleat.db"
    
    if os.path.exists(db_file):
        print(f"Deleting existing database: {db_file}")
        try:
            os.remove(db_file)
            print("✓ Database deleted")
        except Exception as e:
            print(f"✗ Error deleting database: {e}")
            print("Please close any programs using the database and try again")
            return False
    else:
        print("No existing database found")
    
    print("\nCreating new database with updated schema...")
    try:
        # Drop all tables first (in case they exist)
        Base.metadata.drop_all(bind=engine)
        # Create new tables with correct schema
        Base.metadata.create_all(bind=engine)
        print("✓ Database created successfully!")
        print("\nYou can now restart the server.")
        return True
    except Exception as e:
        print(f"✗ Error creating database: {e}")
        return False

if __name__ == "__main__":
    success = reset_database()
    exit(0 if success else 1)

