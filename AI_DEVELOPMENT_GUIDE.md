# 多小组 AI 开发规范

在本项目执行任何代码修改前，先阅读本文件、README、目标小组的现有路由／模板／模型及 Git 状态。

## 一、固定技术路线

使用 Python 3.12、Flask、Jinja2、HTML/CSS/JavaScript、Bootstrap 5、PostgreSQL、SQLAlchemy、Cookie + Session、Gunicorn、Docker Compose、Nginx、Git。

- 不得擅自更换 Flask 或 PostgreSQL。
- 不引入 Vue、React、Node.js 后端、Django、FastAPI、Redis、消息队列、Kubernetes 或微服务框架。
- 不得为简单需求重构整个系统、创建新的架构体系或引入不必要依赖。
- 获准新增 Python 包必须写入 `requirements.txt`，说明用途并兼容 Python 3.12。

## 二、修改边界

- Group2 只能修改 `modules/group2/`，Group3 只能修改 `modules/group3/`，依此类推。
- 不得修改其他组模块。不要覆盖用户未提交的改动。
- `app/` 全部公共代码、根配置／依赖／公共测试、Docker、`nginx/`、`deployment/` 由第一组维护，不得随意修改。
- 如果需求确实涉及公共接口、依赖或集成配置，先提出最小变更方案，由第一组明确授权后处理。
- 每次修改保持最小范围，优先复用现有公共组件，避免创建无用途文件。

## 三、统一认证与数据

- 不得自行重新设计用户系统，不得另建任何新的 users 表或登录逻辑。
- 不得让业务模块接触、保存或校验用户密码。密码只能经公共认证模块处理。
- 使用 `app.common.utils.get_current_user()` 获取用户；需要认证的路由使用 `@login_required`。
- 不要直接读取或写入认证 Session；不要将客户端提交的 user_id、role 当成可信身份。
- 新模型放在本组 models.py，从 `app.extensions` 导入 `db`，表名加 `groupN_` 前缀。
- 用户关联使用 `db.ForeignKey('users.id')`；未经第一组授权不得修改公共 users 表。
- 修改／查询某人的业务记录时必须验证归属，登录不等于拥有所有记录的权限。
- 不关闭 CSRF；写操作不能使用 GET；普通表单和 fetch 必须携带令牌。
- 敏感信息和部署地址使用环境变量，不写死密码、SECRET_KEY、真实服务器地址。
- `create_all` 只建缺失表，不负责已有结构迁移。涉及列／索引／约束变更必须报告迁移和回滚方法，不能删库重建。

## 四、页面与代码

- 页面直接或间接继承 `base.html`；模板放 `templates/groupN/`，避免名称冲突。
- 路由前缀保持 `/groupN/`，链接优先使用 `url_for`；本组静态资源使用 `groupN.static`。
- CSS/JS 放本组 static 目录，复用 Bootstrap 和公共样式，不另造整套导航或用户菜单。
- 函数保持简短、职责明确，必要的注释用中文。
- 不用 Jinja `safe` 绕过对用户输入的转义，不在日志／响应中输出密码、密钥或哈希。
- 生产启动使用 Gunicorn；不能把 Flask 调试服务器作为生产方案。

## 五、工作与验收流程

1. 阅读结构、现有代码及本组需求，确认工作范围。
2. 说明准备修改哪些文件；只做完成需求必需的变更。
3. 为新增行为或修复添加有意义的测试，本组测试可放本组目录。
4. 修改后必须运行 `python -m pytest -q`；环境不足时说明具体缺少什么，不得声称测试通过。
5. PostgreSQL 测试只连接 `TEST_DATABASE_URL` 指定的 *_test 库，不连接生产数据库。
6. 检查 Git diff、暂存范围以及敏感文件是否被忽略；不擅自合并、强推或删除他人的代码。
7. 输出变更报告：功能和访问路径、**修改了哪些文件**、测试命令及结果、**是否涉及数据库迁移**、**是否增加新的依赖**、已知限制。

建议给 AI 的任务描述：

> 我属于第 N 组。请先阅读 README.md 和 AI_DEVELOPMENT_GUIDE.md。只修改 modules/groupN/，实现下面的具体功能。复用公共认证和模板，不修改其他组或公共代码。如涉及公共修改先指出所需变更。完成后运行测试，并报告文件、迁移、依赖和验证结果。
