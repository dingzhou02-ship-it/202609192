"""表单校验集中在认证模块，所有 POST 由 Flask-WTF 保护。"""
from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Length, Regexp


def normalize_username(value):
    # 统一大小写，防止 Student 与 student 被注册为不同用户。
    return value.strip().lower() if value else ''


class LoginForm(FlaskForm):
    username = StringField('用户名', filters=[normalize_username], validators=[
        DataRequired(message='请输入用户名。'), Length(max=32, message='用户名过长。'),
    ])
    password = PasswordField('密码', validators=[
        DataRequired(message='请输入密码。'), Length(max=128, message='密码过长。'),
    ])
    submit = SubmitField('登录')


class RegisterForm(LoginForm):
    username = StringField('用户名', filters=[normalize_username], validators=[
        DataRequired(message='请输入用户名。'),
        Regexp(r'^[a-z0-9_]{3,32}$', message='使用 3～32 位英文字母、数字或下划线。'),
    ])
    password = PasswordField('密码', validators=[
        DataRequired(message='请输入密码。'),
        Length(min=8, max=128, message='密码长度须为 8～128 个字符。'),
    ])
    confirm_password = PasswordField('确认密码', validators=[
        DataRequired(message='请再次输入密码。'),
        EqualTo('password', message='两次输入的密码不一致。'),
    ])
    submit = SubmitField('创建账号')
