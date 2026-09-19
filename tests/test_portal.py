"""无需数据库写入的页面与配置测试。"""
import secrets

import pytest

from app import create_app


@pytest.fixture
def public_app():
    return create_app({
        'TESTING': True,
        'SECRET_KEY': secrets.token_hex(32),
        'SQLALCHEMY_DATABASE_URI': 'postgresql+psycopg://localhost/unused_test',
    })


def test_home_and_about(public_app):
    client = public_app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    for number in range(2, 9):
        assert f'/group{number}/'.encode() in response.data
    assert client.get('/about/').status_code == 200


def test_login_page(public_app):
    assert public_app.test_client().get('/auth/login/').status_code == 200


@pytest.mark.parametrize('number', range(2, 9))
def test_modules_require_login(public_app, number):
    response = public_app.test_client().get(f'/group{number}/')
    assert response.status_code == 302
    assert '/auth/login/' in response.location


def test_secret_required():
    with pytest.raises(RuntimeError, match='SECRET_KEY'):
        create_app({'SECRET_KEY': ''})


def test_postgresql_required():
    with pytest.raises(RuntimeError, match='PostgreSQL'):
        create_app({'SECRET_KEY': secrets.token_hex(32), 'SQLALCHEMY_DATABASE_URI': 'sqlite://'})
