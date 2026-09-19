"""业务模块获取身份的唯一公共入口；未来切换统一认证时保留此接口。"""
from urllib.parse import unquote, urlsplit

from flask import g, session

from app.auth.models import User
from app.extensions import db


def get_current_user():
    """返回当前 User 或 None；同一请求只查询一次，不暴露密码接口给页面。"""
    if 'current_user' not in g:
        user_id = session.get('user_id')
        g.current_user = db.session.get(User, user_id) if type(user_id) is int else None
        if user_id is not None and g.current_user is None:
            session.clear()
    return g.current_user


def safe_next_url(target):
    """只允许站内绝对路径，阻止登录后被重定向到第三方网站。"""
    if not target:
        return None
    decoded = unquote(target)
    if not decoded.startswith('/') or decoded.startswith('//') or '\\' in decoded:
        return None
    if any(ord(char) < 32 or ord(char) == 127 for char in decoded):
        return None
    parts = urlsplit(decoded)
    return target if not parts.scheme and not parts.netloc else None
