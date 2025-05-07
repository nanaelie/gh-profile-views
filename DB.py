import os
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# from dotenv import load_dotenv
# load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Views(Base):
    __tablename__ = "views"
    ip = Column(String, primary_key=True, index=True)
    timestamp = Column(DateTime)

def init_db():
    Base.metadata.create_all(bind=engine)

def save(ip: str, timestamp: int):
    db = SessionLocal()
    try:
        ip_addr = db.query(Views).filter_by(ip=ip).first()
        if not ip_addr:
            new_addr = Views(ip=ip, timestamp=timestamp)
            db.add(new_addr)
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error saving data: {e}")
    finally:
        db.close()

def remove(cutoff: int):
    db = SessionLocal()
    try:
        views = db.query(Views).filter(Views.timestamp < cutoff).all()
        for view in views:
            db.delete(view)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error removing data: {e}")
    finally:
        db.close()
    
def get_views():
    db = SessionLocal()
    try:
        views = db.query(Views).all()
        return len(views)
    except Exception as e:
        print(f"Error fetching views: {e}")
        return 0
    finally:
        db.close()
