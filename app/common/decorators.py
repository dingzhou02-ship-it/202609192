"""公共访问控制；将来由第一组在这里扩展角色或权限装饰器。"""
from functools import wraps

from flask import redirect, request, url_for

from app.common.utils import get_current_user


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if get_current_user() is None:
            target = request.full_path if request.query_string else request.path
            return redirect(url_for('auth.login', next=target))
        return view(*args, **kwargs)
    return wrapped
