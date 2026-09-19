# 统一门户实施记录

目标：按用户提供的完整规格建立 Python 3.12 + Flask + PostgreSQL 基础模板，不实现业务系统。

设计：应用工厂负责组装；auth 管理唯一 users 表和 Session；common 提供身份接口；portal 提供首页；七个小组目录各提供 Blueprint。当前只有一个进程，后续经 Nginx 按路径拆分。首页公开，业务入口需要登录。所有写入表单启用 CSRF；注册只能得到 user 角色。

执行顺序与文件范围：

1. 检查空目录与运行环境（已完成，无旧代码）。
2. `config.py`、`run.py`、`app/__init__.py`、`app/extensions.py`：最小工厂与环境配置。
3. `app/portal/routes.py`、公共模板、CSS/JS：首页、导航、关于与统一样式。
4. `app/auth/{routes,models,forms}.py`、`app/common/{utils,decorators}.py`：注册、哈希、登录、POST 退出、当前用户。
5. `modules/group2/` 至 `group8/`：各组独立路由及命名空间模板与静态资源位置。
6. PostgreSQL 配置、`flask init-db`、Group2 标准业务模型示例：统一用户外键，禁止另建用户表。
7. Dockerfile、Compose、入口脚本：Python 3.12、Gunicorn、数据库健康检查。
8. Nginx 示例：当前单应用与未来七个独立上游的路径规则。
9. pytest：公开页面、访问控制、注册、登录保持、退出、哈希、CSRF、非法跳转、重复用户与模型外键。
10. README、AI_DEVELOPMENT_GUIDE：中文启动、开发、Git、迁移与未来统一身份说明。

验证：各阶段做导入/路由或页面检查；最终使用真实 PostgreSQL 的独立测试数据库运行 pytest，禁止将测试指向业务数据库。验证 Docker 配置与 HTTP 页面；如本机缺少容器引擎，明确记录未完成的容器实跑验证。

边界检查：缺少密钥应拒绝启动；角色不可从注册请求提升；next 只接受站内路径；注册重复不能造成 500；未来拆分不能仅靠 Nginx 就宣称已实现 SSO。

流程约定：用户明确要求直接在当前目录按步骤实现，因此原地执行，不另建工作树、不反复请求审批，不自动提交或推送 Git。

## 验证记录（2026-09-19）

- 当前电脑安装项目隔离环境 `.runtime/`，Python 3.12 + PostgreSQL 17；数据在 `.local/`，随机密钥在被忽略的 `.env`。本地数据库仅监听 127.0.0.1:55432。
- 首页／关于／配置检查先通过；未实现的登录及模块路由测试先返回 404，补齐后通过。
- PostgreSQL 上完整测试：`python -m pytest -q`，27 passed。涵盖 CSRF、哈希、角色、重复用户、登录保持、退出、七组访问控制、非法跳转、用户删除、外键、初始化与健康检查。
- Chrome 无头浏览器验证桌面及 390px 手机宽度、七张模块卡片、真实注册／登录／访问模块／刷新／退出；无 JavaScript 或 HTTP 错误，无横向溢出。验证账号已删除。
- `python -m compileall`、`pip check` 通过；真实 `.env`、运行环境、数据目录均被 Git 忽略。
- 使用独立 Compose CLI 验证 `config --quiet` 通过；Nginx 原生 `-t` 校验示例配置通过。
- 本机无 Docker 引擎：没有执行镜像构建、容器启动或 Linux Gunicorn 实跑，不将配置验证等同于容器端到端验证。
- Chrome 自动化与配置校验工具仅保存在本机被忽略的环境，用于交付验收，不是应用依赖；其他同学无需安装它们即可运行项目。
- 最终独立审查指出官方 PostgreSQL 镜像初始化用户是超级用户：新增 `init-postgres.sh`，分开管理员和业务凭据；web 只获得普通业务用户连接。本机也改用非超级用户 `campus_app`，原 bootstrap 用户禁用登录；完整 27 项测试再次通过。
- 通过 Git Bash + 本机 psql 实际运行数据库初始化 shell，在临时测试库验证新角色不是超级用户、不能创建数据库／角色、能够创建和写入自己的表，随后删除本次创建的临时库及角色。Compose 凭据隔离断言通过，浏览器完整流程再次通过。
