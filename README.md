# Campus Hub · 多小组协作网站基础模板

面向八个课程小组的统一开发起点：**统一首页、登录、用户、样式和规范，各组在独立目录开发自己的模块。** 当前只包含基础功能和占位页，不包含具体业务系统。

### banch1 界面说明

本分支将界面适配为 `moban/` 参考样例的「南师GeoAI智教云」风格：蓝白导航、山水城市横幅、轻量数字地球、七色应用入口，以及配套登录／注册页面。图片来自用户提供的样例，已复制到 `app/static/images/`，运行无需原始样例目录。

仍使用 Flask + Jinja2 + Bootstrap 5；图标是原生 SVG，地球由 CSS 与图片呈现，不引入 React、Tailwind、Three.js 或构建工具。七张卡片按样例顺序对应 Group2～Group8，应用名称目前仅作展示，具体业务分工可后续调整；真实路由和登录规则不变，仍是「功能开发中」。此次不增加依赖、不修改数据库，无需迁移。

## 1. 当前架构与分工

```text
浏览器 → Nginx（正式部署时）→ Gunicorn → Flask
                                      ├─ 门户：首页 /、关于 /about/
                                      ├─ 认证：/auth/register/、/auth/login/、/auth/logout/
                                      ├─ Group2～Group8：/group2/ … /group8/
                                      └─ SQLAlchemy → PostgreSQL
```

当前是**一个 Flask 应用 + 七个独立 Blueprint**，不是七个服务。首页、关于、登录、注册公开访问；模块页要求登录，登录后自动返回原模块。退出必须使用带 CSRF 令牌的 POST。

第一组维护门户、认证、公共组件、数据库规范、Git、Docker、Nginx 和集成部署；第二至第八组分别维护自己的目录。各组现在可独立开发、运行整套模板；把自己的模块变成独立进程仍需完成本文末尾的部署与认证适配。

## 2. 技术栈

- Python **3.12**、Flask、Jinja2。
- HTML、CSS、JavaScript、Bootstrap **5.3.8**（本地文件，包含许可证）。
- PostgreSQL **17**、SQLAlchemy 2、Flask-SQLAlchemy、psycopg 3。
- Cookie + Flask Session；Werkzeug scrypt 密码哈希。
- Flask-WTF/WTForms 提供表单校验和全局 CSRF；python-dotenv 读取 `.env`。
- Gunicorn、Docker Compose、Nginx 示例、Git；pytest 建立测试框架。

无需 Node.js、前端构建工具、Redis 或消息队列。直接依赖版本列在 `requirements.txt`；升级依赖由第一组统一测试。

## 3. 目录结构

```text
app/
  __init__.py                应用工厂、组装路由、CLI、错误页面
  extensions.py              db / csrf 扩展
  auth/                      唯一用户模型、注册/登录/退出、表单
  common/                    get_current_user、login_required
  portal/routes.py           首页、关于、健康检查
  templates/                 base.html 及公共页面
  static/                    css、js、images、vendor（Bootstrap）
modules/
  group2/
    routes.py                本组 Blueprint 与页面路由
    models.py                group2_records 标准示例
    templates/group2/        本组模板（名称不可与其他组重复）
    static/                  本组静态文件
  group3/ … group8/          同样的独立路由、模板、静态目录
tests/                       公共测试；本组测试也可放 modules/groupN/tests/
nginx/nginx.conf.example     当前入口与未来按路径拆分示例
deployment/entrypoint.sh     容器启动，建缺失表后执行 Gunicorn
deployment/init-postgres.sh  数据库首次初始化，创建非超级用户业务账号
deployment/IMPLEMENTATION_PLAN.md  实施范围和验证记录
config.py                   环境配置
run.py                      开发入口 / Gunicorn app
Dockerfile / docker-compose.yml
.env.example / requirements.txt / pytest.ini
AI_DEVELOPMENT_GUIDE.md      给各组 AI 的协作约束
```

Python 子目录使用命名空间包，无需在每个空目录创建 `__init__.py`。从项目根目录执行命令；不要把本组文件命名为 `flask.py`、`sqlalchemy.py` 等第三方库同名文件。

## 4. 环境安装

安装 Python 3.12、PostgreSQL 17、Git；如使用 Docker 路线，则安装 Docker Desktop（Linux containers）或 Linux Docker Engine + Compose 插件。

Windows PowerShell：

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
```

macOS / Linux：

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
```

下文 `python` 指虚拟环境内的解释器。Windows 可用 `.\.venv\Scripts\python.exe` 替换，无需更改 PowerShell 执行策略。

## 5. PostgreSQL 配置

以数据库管理员连接 psql，创建专用用户和两个独立数据库。`\password` 会交互式要求输入密码，避免把真实密码写到脚本里。

```sql
CREATE ROLE campus LOGIN;
\password campus
CREATE DATABASE campus OWNER campus;
CREATE DATABASE campus_test OWNER campus;
```

数据库服务需先启动。开发库是 `campus`，测试库是 `campus_test`。禁止使用管理员账号连接业务库，也禁止把测试地址指向开发／生产库。

## 6. 填写 .env

先生成随机密钥，再手动填入 `.env`，所有实例保持同一有效配置：

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

配置说明（下面的尖括号必须替换）：

```dotenv
SECRET_KEY=<刚生成的随机字符串>
DATABASE_URL=postgresql+psycopg://campus:<数据库密码>@127.0.0.1:5432/campus
POSTGRES_USER=campus
POSTGRES_PASSWORD=<同一个数据库密码>
POSTGRES_DB=campus
POSTGRES_ADMIN_PASSWORD=<独立随机管理员密码，仅 Docker 初始化使用>
SESSION_COOKIE_SECURE=false
WEB_PORT=8000
TEST_DATABASE_URL=postgresql+psycopg://campus:<数据库密码>@127.0.0.1:5432/campus_test
```

URL 密码含 `@`、`:`、`/`、`#` 等字符时需 URL 编码；生成的随机十六进制密码可直接用于 URL。`SECRET_KEY` 不足 32 字符或数据库协议不是 `postgresql+psycopg` 时，应用会拒绝启动。真实 `.env`、本地运行环境、数据库文件均已被 Git/Docker 忽略。

本地 HTTP 使用 `SESSION_COOKIE_SECURE=false`；正式 HTTPS 改为 `true`，否则浏览器在 HTTP 下不会发送安全 Cookie。

## 7. 本地启动

```bash
python -m flask --app run init-db
python run.py
```

访问 **http://127.0.0.1:5000/**，点击“登录 / 注册”，创建自己的账号。没有默认账号或默认密码；公开注册的角色始终是 `user`。`admin` 字段和数据库约束已预留，但尚无管理后台或特殊权限功能。

`init-db` 可以重复执行，只创建不存在的表。首次创建 `users` 和 `group2_records`，不会修改已有字段。开发时可使用 `python -m flask --app run run --debug`，调试模式只能用于本地。

**生产必须用 Gunicorn，不能使用 `python run.py` 或 Flask 开发服务器。** Gunicorn 在 Linux／容器中运行，不支持原生 Windows。示例：

```bash
gunicorn --bind 127.0.0.1:8000 --workers 2 --access-logfile - run:app
```

本次交付已额外在当前电脑准备了被忽略的 `.runtime/`（Python 3.12 + PostgreSQL）和 `.local/pgdata/`（仅本地数据），并生成本机 `.env`。该环境的 PostgreSQL 使用 `127.0.0.1:55432` 和普通业务账号 `campus_app`，避免占用通常的 5432；其他成员仍按上面的标准步骤安装。重启本机环境可以使用：

```powershell
$env:PATH = "$PWD\.runtime\Library\bin;$env:PATH"
# 数据库已运行时无需重复 start。
.\.runtime\Library\bin\pg_ctl.exe -D .local/pgdata -l .local/postgres.log -o "-h 127.0.0.1 -p 55432" start
.\.runtime\python.exe run.py
```

停止本机 PostgreSQL：`.\.runtime\Library\bin\pg_ctl.exe -D .local/pgdata stop`。不要把这些本机目录发给其他组，也不要把它们加入 Git。

## 8. Docker 启动

Docker 读取同一个 `.env`，但数据库运行在 Compose 网络中。**切换到 Docker 前把 `DATABASE_URL` 主机改成 `postgres`，端口改成 `5432`**，业务账号、密码、库名分别与 `POSTGRES_USER`、`POSTGRES_PASSWORD`、`POSTGRES_DB` 一致。容器内的 `127.0.0.1` 不是 postgres 服务。

另外生成一个不同的随机密码填入 `POSTGRES_ADMIN_PASSWORD`。Compose 使用固定的 `postgres` 管理员完成初始化，再由 `deployment/init-postgres.sh` 创建 `.env` 中的业务账号（默认 `campus`）并赋予业务库所有权。该业务账号不能创建其他数据库／角色，也不是超级用户；管理员密码不会传给 web。业务用户名不要设为 `postgres`。

```dotenv
DATABASE_URL=postgresql+psycopg://campus:<数据库密码>@postgres:5432/campus
```

```bash
docker compose config --quiet
docker compose up --build -d
docker compose ps
docker compose logs -f web
```

访问 **http://127.0.0.1:8000/**。Compose 启动 `postgres` 和 `web`；等待数据库健康后创建缺失表，再以非 root 用户启动 Gunicorn。`/healthz` 检查数据库连接。Nginx 暂不加入 Compose，示例按宿主机 Nginx 代理到该端口编写。

停止：`docker compose down`，数据库保存在命名卷中。不要随意加 `-v`，这会删除数据库卷。初始化脚本仅对空卷执行；已有卷的用户、权限、密码不会因修改 `.env` 自动改变，应由第一组先备份并用数据库命令更新，再同步应用配置。

Compose 默认只绑定 `127.0.0.1:8000`，供本机浏览和 Nginx 访问，数据库不映射到宿主机公网。正式部署由第一组配置 Nginx 域名、HTTPS 和备份。

## 9. 各组开发自己的模块

以第二组为例：主要修改 `modules/group2/`。路由已自动注册，无需修改工厂、首页或公共目录。不要动其他组文件。

新建 `modules/group2/templates/group2/detail.html`：

```jinja
{% extends 'base.html' %}
{% block title %}第二组详情 · 协作空间{% endblock %}
{% block content %}
<h1>第二组详情</h1>
<p>你好，{{ current_user.username }}。</p>
{% endblock %}
```

在本组 `routes.py` 增加：

```python
@bp.get('/detail/')
@login_required
def detail():
    return render_template('group2/detail.html')
```

访问 `/group2/detail/`。模板链接使用 `url_for('group2.detail')`；本组静态文件通过 `url_for('group2.static', filename='css/group2.css')` 引用，在模板的 `styles` / `scripts` 区块引入。占位页间接继承 `base.html`，正式开发时可直接继承它。

所有写操作使用 POST 等非 GET 方法，普通 HTML 表单加入：

```jinja
<input type="hidden" name="csrf_token" value="{{ csrf_token() }}">
```

JavaScript 写入请求携带 `X-CSRFToken: window.getCsrfToken()`。不要全局关闭 CSRF。

## 10. 获取当前登录用户

```python
from app.common.utils import get_current_user
from app.common.decorators import login_required

@bp.get('/me/')
@login_required
def me():
    user = get_current_user()
    return {'id': user.id, 'username': user.username, 'role': user.role}
```

模板中直接使用 `current_user`，匿名状态为 `None`。不要返回／打印整个用户对象、密码哈希或 Session Cookie。各组禁止直接处理密码、读写认证 Session 或另建 users 表。

当前 Cookie 是 Flask 签名的客户端 Session，内容不是加密数据，因此仅保存用户 ID 和必要会话状态；有效期为 8 小时（活动请求会续期）。每次请求从公共数据库读取真实用户和角色，删除用户后旧 Cookie 不再有效。退出会清除当前浏览器会话；**当前不提供被盗 Cookie 的即时撤销、单设备踢出或全设备退出**，这些能力需要以后集中式会话机制。

## 11. 增加业务模型与迁移

查看 `modules/group2/models.py` 的 `Group2Record`：表名 `group2_records`，`user_id` 外键关联 `users.id`。各组使用 `groupN_` 表名前缀，从 `app.extensions` 导入唯一的 `db`，不得自行创建另一个 SQLAlchemy 实例或修改 `users`。

新增模型后，在本组 `routes.py` 中导入 models，让应用启动时注册模型。添加全新表可运行 `python -m flask --app run init-db`。

保存记录时由服务器使用 `get_current_user().id` 赋值，不能相信浏览器提交的 `user_id`；查询／修改本人记录需同时按记录 ID 和当前用户 ID 过滤，`login_required` 本身不等于数据权限检查。例如：

```python
record = db.session.scalar(db.select(Group2Record).where(
    Group2Record.id == record_id,
    Group2Record.user_id == get_current_user().id,
))
```

**修改已有列、索引、外键，不会由 `create_all` 自动迁移。** 当前未引入迁移框架。初学阶段由第一组审核、备份后执行明确的 SQL 迁移并记录回滚方式；结构变化频繁后，再由第一组统一引入 Alembic／Flask-Migrate。禁止通过删除生产表“解决迁移”。

## 12. 运行测试

```bash
python -m pytest -q
```

先创建 `campus_test` 并设置 `TEST_DATABASE_URL`。未设置时会明确失败，不会静默跳过数据库验证。测试会在独立测试库建立随机 schema，结束后删除**自己创建的 schema**；不会清空整个数据库。测试保留真实 CSRF 校验，覆盖公开页面、七组访问控制、注册／哈希／角色、登录保持／退出、重复用户名、非法跳转、外键、建表命令及健康检查。

没有数据库时仅检查公开页面可运行 `python -m pytest tests/test_portal.py -q`，不能把此结果当成完整验收。本组新增测试可放 `modules/groupN/tests/test_*.py`，运行全量测试时会一起收集，复用 `tests/conftest.py` 时需将共用 fixture 经第一组评审后移到根 conftest，或在本组测试中定义自己的 fixture。

使用 Docker 跑测试时，先建立独立测试库：

```bash
docker compose exec postgres sh -c 'createdb -U "$POSTGRES_USER" -O "$APP_DATABASE_USER" campus_test'
docker compose run --rm -e TEST_DATABASE_URL=postgresql+psycopg://campus:<URL编码的密码>@postgres:5432/campus_test -v "./tests:/srv/campus/tests:ro" web python -m pytest -q
```

把上例占位密码替换后使用；不要将带密码的真实命令粘贴到公开聊天或提交记录。团队可通过本机环境变量注入 `TEST_DATABASE_URL`，替代命令行明文值。生产镜像默认不复制测试目录，因此测试命令显式挂载 tests。

## 13. Git 与提交功能

仓库由第一组统一维护，各组从远程仓库获取工程后，在自己的功能分支开发并提交评审。

```bash
git switch -c group2/feature-detail
git status
# 开发后运行完整测试
python -m pytest -q
git add modules/group2/
git diff --cached
git commit -m "feat(group2): add detail page"
git push -u origin group2/feature-detail
```

创建 Pull Request／Merge Request，说明功能、访问地址、修改文件、测试结果、是否迁移数据库及是否新增依赖。由第一组评审后合并 main。开发前同步 main；冲突涉及公共代码或其他组时联系负责组，不用“全部覆盖”解决冲突。

公共维护范围：`app/auth/`、`app/common/`、`app/portal/`、`app/templates/`、`app/static/`、应用工厂、扩展、根配置、依赖、公共 tests、`nginx/`、`deployment/`、Docker 文件。业务组若需改公共接口或新增依赖，先向第一组提出明确变更；获准新增的包必须写入 `requirements.txt`。

不要提交 `.env`、数据库文件、运行环境、缓存、日志，也不要使用 `git add .` 后不检查暂存区。建议远程仓库设置 main 分支保护和评审规则；目录规则本身不是文件系统权限控制。

## 14. 未来独立部署与统一身份

当前阶段七个模块处于同一应用中，所以能共享 Session 和 `get_current_user()`。**Nginx 只负责路由，不会自动实现跨进程统一登录。**

未来拆分时，由第一组与对应业务组共同完成：

1. 为模块增加自己的 Flask 工厂、依赖和 Gunicorn 进程；保留 `/groupN/` 路由前缀、静态资源前缀和模板命名空间。
2. 将公共样式、模板和身份接口制作成第一组维护的版本化公共包，或按版本同步；避免各组各复制一份用户系统后自行修改。
3. 统一身份的简单过渡方案：在**完全互信、同一域名**的 Flask 应用之间，统一 SECRET_KEY、Cookie 名称／Path `/`、签名方式、有效期及用户 ID 字段，读取同一公共用户来源。业务库账号原则上只读用户信息，各组只能写自己的表。
4. 共享签名密钥意味着任一子应用被攻破都可能伪造全站身份，且 Cookie 写入可能相互覆盖。不能把该方案用于不互信的应用。长期可改成由门户独占会话、经受保护的内部身份校验接口提供用户信息；子应用仍只调用 `get_current_user()` 适配层。集中撤销、跨域和更多安全需求出现时，再评估标准 SSO/OIDC。
5. 不接受浏览器直接提供的 `X-User-ID`／角色头；只有受保护网关生成并经过验证的身份才可信。示例配置会清空这类外部请求头。
6. 在 `nginx/nginx.conf.example` 中启用对应 `/groupN/` location，并替换实际内网地址。

示例的 `proxy_pass http://127.0.0.1:8002;` **没有结尾 `/`**，会保留请求 `/group2/detail/`；如果写成 `...:8002/`，Nginx 会去掉匹配前缀。不要无意更改此约定。各子应用只能在内网监听，外部用户统一访问 Nginx。

将配置复制到 Nginx 的 `conf.d/campus.conf`（该目录需由主配置在 http 中 include），执行 `nginx -t` 成功后再 reload。示例地址为本机演示值，生产地址／域名从部署环境配置；Nginx 本身不读取 `.env`。完成 TLS 后将 Session Cookie 标记为 Secure。当前未启用 ProxyFix；若将来确需读取代理传来的外部协议，必须先限制可信代理入口再配置准确的代理层数。

本模板尚未提供公网认证限流、邮件找回密码、集中会话撤销或数据库备份调度。正式公开部署前由第一组根据实际访问量补充，不影响当前课程模板的本地使用。

## 15. 参考文档

- [Flask 应用工厂](https://flask.palletsprojects.com/en/stable/patterns/appfactories/)
- [Flask 的 Gunicorn 部署说明](https://flask.palletsprojects.com/en/stable/deploying/gunicorn/)
- [Flask-WTF CSRF](https://flask-wtf.readthedocs.io/en/1.2.x/csrf/)
- [SQLAlchemy PostgreSQL 支持](https://docs.sqlalchemy.org/en/20/dialects/postgresql.html)
