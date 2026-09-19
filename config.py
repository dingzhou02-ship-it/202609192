"""集中读取配置；真实密码、地址和密钥只放在 .env。"""
import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv


def load_config():
    load_dotenv(Path(__file__).parent / '.env')
    return {
        'SECRET_KEY': os.getenv('SECRET_KEY', ''),
        'SQLALCHEMY_DATABASE_URI': os.getenv('DATABASE_URL', ''),
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
        'SQLALCHEMY_ENGINE_OPTIONS': {'pool_pre_ping': True},
        'SESSION_COOKIE_NAME': 'campus_session',
        'SESSION_COOKIE_HTTPONLY': True,
        'SESSION_COOKIE_SAMESITE': 'Lax',
        'SESSION_COOKIE_SECURE': os.getenv('SESSION_COOKIE_SECURE', 'false').lower() == 'true',
        'SESSION_COOKIE_PATH': '/',
        'PERMANENT_SESSION_LIFETIME': timedelta(hours=8),
        'MAX_CONTENT_LENGTH': 1024 * 1024,
    }
