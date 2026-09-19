"""用户认证只由第一组维护，业务模块仅消费公共身份接口。"""
from flask import Blueprint, flash, redirect, render_template, request, session, url_for
from sqlalchemy.exc import IntegrityError

from app.auth.forms import LoginForm, RegisterForm
from app.auth.models import User
from app.common.utils import get_current_user, safe_next_url
from app.extensions import db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register/', methods=['GET', 'POST'])
def register():
    if get_current_user():
        return redirect(url_for('portal.index'))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, role='user')
        user.set_password(form.password.data)
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            # 数据库唯一约束也能拦截并发注册，失败后必须回滚事务。
            db.session.rollback()
            form.username.errors.append('用户名已被使用，请换一个。')
        else:
            flash('注册成功，请登录。', 'success')
            return redirect(url_for('auth.login'))
    return render_template('register.html', form=form)


@bp.route('/login/', methods=['GET', 'POST'])
def login():
    target = safe_next_url(request.args.get('next')) or url_for('portal.index')
    if get_current_user():
        return redirect(target)
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.scalar(db.select(User).where(User.username == form.username.data))
        if user and user.check_password(form.password.data):
            session.clear()
            # Cookie 中只存标识，不放密码、哈希或可信角色信息。
            session['user_id'] = user.id
            session.permanent = True
            flash('登录成功，欢迎回来。', 'success')
            return redirect(target)
        flash('用户名或密码不正确。', 'danger')
    return render_template('login.html', form=form)


@bp.post('/logout/')
def logout():
    session.clear()
    flash('你已安全退出。', 'info')
    return redirect(url_for('portal.index'))
