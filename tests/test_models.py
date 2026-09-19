"""验证业务表关联公共用户，不能引用不存在的用户。"""
import pytest
from sqlalchemy.exc import IntegrityError

from app.extensions import db


def test_business_record_requires_existing_user(app):
    from app.auth.models import User
    from modules.group2.models import Group2Record
    with app.app_context():
        db.session.add(Group2Record(user_id=999999, title='错误外键'))
        with pytest.raises(IntegrityError):
            db.session.commit()
        db.session.rollback()
        user = User(username='model_student')
        user.set_password('ExamplePass123!')
        db.session.add(user)
        db.session.flush()
        record = Group2Record(user_id=user.id, title='示例记录')
        db.session.add(record)
        db.session.commit()
        assert record.user_id == user.id
        assert record.created_at is not None


def test_init_db_is_repeatable(app):
    runner = app.test_cli_runner()
    assert runner.invoke(args=['init-db']).exit_code == 0
    assert runner.invoke(args=['init-db']).exit_code == 0
