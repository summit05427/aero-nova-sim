# 协作规范

本文件约定 AeroNova 飞行模拟器的日常开发协作方式。实现细节以 `INSTRUCTIONS.md` 为准，功能与使用说明以 `README.md` 为准；改动行为后应同步更新对应文档。

## 分支与提交

- 分支命名：
  - `feature/<功能>`：新功能
  - `fix/<缺陷>`：缺陷修复
  - `hotfix/<紧急修复>`：线上紧急修复
  - `refactor/<重构>`：不改变行为的重构
  - `docs/<文档>`：文档变更
- 提交信息遵循 Conventional Commits：`type(scope): subject`，其中 type 取 `feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`build`、`ci`、`chore`。
- subject 使用简洁中文，说明「做了什么 + 为什么」，禁止 `update`、`fix bug` 这类空信息。例如：`fix(terrain): 修正海岸线插值造成的空洞`。
- 一次提交只做一件事；提交前保证代码可运行，并通过 `npm run lint` 与 `npm test`。
- 不提交 `node_modules/`、`dist/`、构建产物、日志、`.env` 文件与任何密钥。新增环境变量时同步更新 `.env.example` 与文档。

## 代码风格

- 使用原生 ES Modules，不引入 UI 框架；渲染基于 three.js，构建基于 Vite。
- 提交前运行 `npm run lint` 与 `npm run format`（ESLint + Prettier）。
- 内部计算使用 SI 单位（m、kg、s、N、rad）；航空单位只在 UI 与 ATC 边界转换。
- 公共 API、组件与函数补充 JSDoc/TSDoc，说明参数、返回值与异常；注释解释「为什么」，不重复显而易见的行为。
- 修改多个模块前先说明改动范围；优先选择简单、稳定、符合现有架构的方案，不以补丁层层掩盖设计问题。

## 国际化约定

- 所有面向用户的文案必须通过 `t('key')` 获取，禁止在组件中硬编码可见文本。
- 新增文案必须同时加入 `src/i18n/zh.js` 与 `src/i18n/en.js`，两个词典的键必须完全一致；`tools/test-systems.mjs` 会校验键集合与源码静态引用。
- 默认语言为中文，主菜单「设置 → 语言」支持运行期实时切换，无需刷新页面。
- 仪表缩写（如 PFD、ND、MCP、ILS、fpm）与陆空通话正文保留英文，符合行业惯例；不得为此拆散词典键或跳过 i18n。
- 词典按模块扁平组织，支持 `{name}` 形式插值；缺失键会回退英文，再回退键名，提交前应确认没有回退发生。

## 安全与数据

- 禁止在代码、提交信息、注释或日志中写入 API Key、Token、口令、内网地址等敏感信息。
- 可选 AI 管制所需的 Anthropic API Key 由玩家在设置中填写，只保存在浏览器 `localStorage`，不得写入代码、打包进产物或提交到仓库。
- 文件上传、URL 参数与外部数据进入渲染前必须校验或转义，禁止用 `v-html` 渲染未净化的用户输入。
- 日志不得打印密码、Token、手机号等敏感字段；确需排查时先脱敏。

## 文档与交付

- 新增公共 API、组件或函数时补充说明注释；新功能或新模块完成后更新 `README.md` 或 `docs/` 下对应文档。
- 接口或行为变更时同步更新文档；破坏性变更需明确标注。
- 构建产物为 `dist/`：先执行 `npm run build`，再发布到任意静态托管。`.github/workflows/ci.yml` 只做静态检查、测试、构建与产物上传，不自动部署。
- 未经明确要求不要创建拉取请求，也不要执行部署。
