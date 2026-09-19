#!/bin/sh
# 官方镜像仅在空数据卷初始化时执行。业务账号可管理自己的表，但不是超级用户。
set -eu
psql --no-psqlrc --set=ON_ERROR_STOP=1 \
    --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
    --set=app_user="$APP_DATABASE_USER" \
    --set=app_password="$APP_DATABASE_PASSWORD" \
    --set=app_db="$POSTGRES_DB" <<'SQL'
CREATE ROLE :"app_user" WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'app_password';
ALTER DATABASE :"app_db" OWNER TO :"app_user";
SQL
