"""门户只展示公共页面，不包含各组业务逻辑。"""
from flask import Blueprint, render_template
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.extensions import db

bp = Blueprint('portal', __name__)


@bp.get('/')
def index():
    return render_template('index.html')


@bp.get('/about/')
def about():
    return render_template('about.html')


@bp.get('/healthz')
def health():
    """容器就绪检查，不暴露连接地址或数据库错误细节。"""
    try:
        db.session.execute(text('SELECT 1'))
    except SQLAlchemyError:
        db.session.rollback()
        return {'status': 'unavailable'}, 503
    return {'status': 'ok'}
