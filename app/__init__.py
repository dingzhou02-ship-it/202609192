"""统一入口：公共能力在此初始化，各小组不需要改动。"""
import click
from importlib import import_module
from flask import Flask, render_template
from flask_wtf.csrf import CSRFError
from sqlalchemy.engine import make_url

from config import load_config
from app.extensions import csrf, db


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(load_config())
    if test_config:
        app.config.update(test_config)
    if len(app.config['SECRET_KEY']) < 32:
        raise RuntimeError('请在 .env 中设置至少 32 字符的随机 SECRET_KEY。')
    uri = app.config['SQLALCHEMY_DATABASE_URI']
    if not uri or make_url(uri).drivername != 'postgresql+psycopg':
        raise RuntimeError('DATABASE_URL 必须使用 postgresql+psycopg:// 连接 PostgreSQL。')
    db.init_app(app)
    csrf.init_app(app)

    from app.portal.routes import bp as portal_bp
    from app.auth.routes import bp as auth_bp
    from app.common.utils import get_current_user
    app.register_blueprint(portal_bp)
    app.register_blueprint(auth_bp)
    # 固定约定：每组 routes.py 导出 bp；不自动扫描任意目录或导入未知代码。
    for number in range(2, 9):
        module = import_module(f'modules.group{number}.routes')
        app.register_blueprint(module.bp)

    @app.context_processor
    def inject_user():
        return {'current_user': get_current_user()}

    @app.cli.command('init-db')
    def init_db():
        """创建尚不存在的表；不删除数据，也不会自动修改已有列。"""
        db.create_all()
        click.echo('数据库表初始化完成。已有表结构变更请安排迁移。')

    @app.errorhandler(CSRFError)
    def csrf_error(error):
        return render_template('error.html', code=400, message='表单已过期或缺少安全令牌，请刷新页面后重试。'), 400

    @app.errorhandler(404)
    def not_found(error):
        return render_template('error.html', code=404, message='这个页面暂时不存在。'), 404

    return app
