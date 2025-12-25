from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Database URL - using SQLite for simplicity, can easily switch to PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wheeleat.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class SpinLog(Base):
    """Database model for tracking spin results"""
    __tablename__ = "spin_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    restaurant_name = Column(String, nullable=False, index=True)
    restaurant_unit = Column(String, nullable=True)
    restaurant_floor = Column(String, nullable=True)
    category = Column(String, nullable=False, index=True)
    dietary_need = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    mall_id = Column(String, nullable=True, index=True)  # Placeholder for future multi-mall support
    selected_categories = Column(Text, nullable=True)  # JSON string of selected categories
    
    def __repr__(self):
        return f"<SpinLog(id={self.id}, restaurant='{self.restaurant_name}', timestamp='{self.timestamp}')>"


def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
