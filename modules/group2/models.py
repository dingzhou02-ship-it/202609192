"""标准业务模型示例；只展示字段与用户外键，不提供具体业务功能。"""
from datetime import datetime, timezone

from app.extensions import db


class Group2Record(db.Model):
    __tablename__ = 'group2_records'

    id = db.Column(db.Integer, primary_key=True)
    # 公共 users 表由第一组维护，各组只保存 user_id。
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    title = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False,
                           default=lambda: datetime.now(timezone.utc))
