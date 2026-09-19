"""测试完整表单与 Cookie 流程，保留真实 CSRF 防护。"""
import re

import pytest

from app.extensions import db


def post_form(client, path, data=None, token_page=None):
    page = client.get(token_page or path)
    token = re.search(rb'name="csrf_token"[^>]*value="([^"]+)"', page.data)
    assert token, '表单必须包含 CSRF 令牌'
    return client.post(path, data={**(data or {}), 'csrf_token': token[1].decode()})


def register(client, username='student'):
    return post_form(client, '/auth/register/', {
        'username': username, 'password': 'CoursePass123!',
        'confirm_password': 'CoursePass123!', 'role': 'admin',
    })


def login(client, next_path=''):
    return post_form(client, '/auth/login/' + next_path, {
        'username': 'student', 'password': 'CoursePass123!',
    })


def test_registration_hash_and_role(client, app):
    assert register(client).status_code == 302
    from app.auth.models import User
    with app.app_context():
        user = db.session.scalar(db.select(User).where(User.username == 'student'))
        assert user.password_hash != 'CoursePass123!'
        assert user.check_password('CoursePass123!')
        assert user.role == 'user'
        assert user.created_at is not None


def test_login_persistence_and_logout(client):
    register(client)
    result = login(client, '?next=/group2/')
    assert result.status_code == 302
    assert result.location == '/group2/'
    assert 'HttpOnly' in result.headers['Set-Cookie']
    assert 'SameSite=Lax' in result.headers['Set-Cookie']
    for number in range(2, 9):
        response = client.get(f'/group{number}/')
        assert response.status_code == 200
        assert f'Group{number} 功能模块' in response.get_data(as_text=True)
    assert b'student' in client.get('/').data
    assert client.get('/auth/logout/').status_code == 405
    assert post_form(client, '/auth/logout/', token_page='/').status_code == 302
    assert client.get('/group2/').status_code == 302


def test_duplicate_user_and_bad_password(client):
    register(client)
    duplicate = register(client, ' STUDENT ')
    assert duplicate.status_code == 200
    assert '用户名已被使用' in duplicate.get_data(as_text=True)
    result = post_form(client, '/auth/login/', {'username': 'student', 'password': 'wrong'})
    assert '用户名或密码不正确' in result.get_data(as_text=True)
    assert client.get('/group2/').status_code == 302


@pytest.mark.parametrize('target', ['https://evil.example', '//evil.example', '/\\evil.example', '/%2f%2fevil.example'])
def test_reject_external_redirect(client, target):
    from urllib.parse import quote
    register(client)
    response = login(client, '?next=' + quote(target, safe=''))
    assert response.location == '/'


def test_csrf_is_required(client):
    for path in ['/auth/register/', '/auth/login/', '/auth/logout/']:
        assert client.post(path, data={'username': 'student'}).status_code == 400


def test_deleted_user_session_becomes_anonymous(client, app):
    from app.auth.models import User
    register(client)
    login(client)
    with app.app_context():
        db.session.execute(db.delete(User))
        db.session.commit()
    assert client.get('/group2/').status_code == 302


@pytest.mark.parametrize('username,password,confirm', [
    ('ab', 'CoursePass123!', 'CoursePass123!'),
    ('<script>', 'CoursePass123!', 'CoursePass123!'),
    ('student', 'short', 'short'),
    ('student', 'CoursePass123!', 'different'),
])
def test_registration_validation(client, app, username, password, confirm):
    from app.auth.models import User
    response = post_form(client, '/auth/register/', {
        'username': username, 'password': password, 'confirm_password': confirm,
    })
    assert response.status_code == 200
    with app.app_context():
        assert db.session.scalar(db.select(db.func.count()).select_from(User)) == 0
