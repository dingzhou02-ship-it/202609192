"""第 2 组入口：只在本组目录开发，通过公共接口获取用户。"""
from flask import Blueprint, render_template

from app.common.decorators import login_required
from modules.group2 import models  # noqa: F401 让 SQLAlchemy 在建表前认识本组模型

bp = Blueprint(
    'group2', __name__, url_prefix='/group2',
    template_folder='templates', static_folder='static',
)


@bp.get('/')
@login_required
def index():
    return render_template('group2/index.html', group_number=2)
