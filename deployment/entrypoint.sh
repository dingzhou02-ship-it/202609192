#!/bin/sh
# 模板阶段只创建缺失表。已有表的字段变更必须单独执行经过审核的迁移。
set -eu
python -m flask --app run init-db
exec "$@"
