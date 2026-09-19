"""扩展只创建一次，在应用工厂中绑定，避免循环导入。"""
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

db = SQLAlchemy()
csrf = CSRFProtect()
