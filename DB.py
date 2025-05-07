import os
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import BigInteger

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

def create_views_table():
    init_db()

def save(ip: str, timestamp: int):
    db = SessionLocal()
    ip_addr = db.query(Views).filter_by(ip=ip).first()
    if not ip_addr:
        new_addr = User(ip=ip, timestamp=timestamp)
        db.add(new_addr)
        db.commit()
    db.close()

def remove(cutoff: int):
    db = SessionLocal()
    views = db.query(Views).filter(timestamp < cutoff).all()
    for view in views:
        db.delete(view)
    db.commit()
    db.close()
    
def get_views():
    db = SessionLocal()
    views = db.query(Views).all()
    count = len(views)
    db.commit()
    db.close()
    return count
