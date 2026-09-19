"""集成测试使用独立 PostgreSQL 数据库中的临时 schema，绝不清空业务表。"""
import os
import secrets
import uuid

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url

from app import create_app
from app.extensions import db


@pytest.fixture
def app():
    load_dotenv()
    uri = os.getenv('TEST_DATABASE_URL', '')
    if not uri:
        pytest.fail('请配置 TEST_DATABASE_URL，数据库名称必须以 _test 结尾。')
    url = make_url(uri)
    if url.drivername != 'postgresql+psycopg' or not (url.database or '').endswith('_test'):
        pytest.fail('测试只允许使用 PostgreSQL 的 *_test 数据库。')
    schema = 'test_' + uuid.uuid4().hex
    engine = create_engine(uri)
    with engine.begin() as connection:
        connection.execute(text(f'CREATE SCHEMA {schema}'))
    application = None
    try:
        application = create_app({
            'TESTING': True,
            'SECRET_KEY': secrets.token_hex(32),
            'SESSION_COOKIE_SECURE': False,
            'SQLALCHEMY_DATABASE_URI': uri,
            'SQLALCHEMY_ENGINE_OPTIONS': {
                'connect_args': {'options': f'-csearch_path={schema}'},
            },
        })
        with application.app_context():
            db.create_all()
        yield application
    finally:
        if application:
            with application.app_context():
                db.session.remove()
                db.engine.dispose()
        with engine.begin() as connection:
            connection.execute(text(f'DROP SCHEMA {schema} CASCADE'))
        engine.dispose()


@pytest.fixture
def client(app):
    return app.test_client()
