from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from app.config import MONGODB_URL, MONGODB_DB
import logging

logger = logging.getLogger(__name__)

class Database:
    client = None
    db = None

    @classmethod
    def connect_db(cls):
        try:
            cls.client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS=5000)
            cls.db = cls.client[MONGODB_DB]
            # Test connection
            cls.db.command("ping")
            logger.info("MongoDB connected successfully")
        except ServerSelectionTimeoutError as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise

    @classmethod
    def close_db(cls):
        if cls.client:
            cls.client.close()
            logger.info("MongoDB connection closed")

    @classmethod
    def get_db(cls):
        if cls.db is None:
            cls.connect_db()
        return cls.db

db = Database()
