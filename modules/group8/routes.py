"""第 8 组入口：只在本组目录开发，通过公共接口获取用户。"""
from flask import Blueprint, render_template

from app.common.decorators import login_required

bp = Blueprint(
    'group8', __name__, url_prefix='/group8',
    template_folder='templates', static_folder='static',
)


@bp.get('/')
@login_required
def index():
    return render_template('group8/index.html', group_number=8)
