# AI Learning Site

> 一个面向普通学习者的 AI 学习管理系统，用更直观、更低门槛的方式组织 AI 课程、视频、笔记、错题、任务和学习进度。

AI Learning Site is a maintainable full-stack learning system for organizing AI courses, lessons, notes, quizzes, mistakes, tasks, attachments, and study progress.

## 项目定位

这个项目不是单纯的静态学习网站，而是一个 **Next.js + Prisma** 的全栈学习管理系统。

它希望解决的问题是：

> 很多人知道 AI 很重要，但学习资料分散、视频进度难管理、笔记和错题无法沉淀，最终很难形成稳定的学习闭环。

因此，`ai-learning-site` 的目标是把 AI 学习过程产品化：课程管理、视频学习、笔记沉淀、错题复盘、任务推进和数据统计都放在一个系统里。

## 当前能力

- 课程、章节、课时管理；
- 视频、附件和资料库管理；
- 学习笔记和时间戳笔记；
- 测验、答题记录和错题本；
- 作业 / 项目任务追踪；
- 学习时长统计；
- 设置、备份和本地数据管理；
- 响应式页面和基础无障碍体验；
- 基础安全响应头和 request id；
- 结构化架构文档，便于专业开发者接手。

## 技术栈

- Framework: Next.js App Router
- Language: TypeScript
- UI: React Server Components / Client Components
- Database: SQLite
- ORM: Prisma
- Styling: Global CSS
- Tooling: ESLint, Prettier, TypeScript strict mode

## 项目结构

```text
.
├── app/                 # 页面、布局、加载态、错误态和路由入口
├── components/          # 可复用 UI 和表单组件
├── lib/                 # Prisma、环境变量、格式化和服务端工具
├── prisma/              # 数据模型和种子数据
├── public/              # 静态资源
├── uploads/             # 本地上传目录，不进入 Git
├── docs/                # 架构、安全和维护文档
├── .env.example         # 环境变量示例
├── next.config.mjs      # Next.js 配置和安全响应头
└── package.json         # 工程脚本
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

默认本地数据库：

```env
DATABASE_URL="file:./dev.db"
```

### 3. 初始化数据库

```bash
pnpm db:push
pnpm db:seed
```

### 4. 启动开发服务

```bash
pnpm dev
```

访问：

```text
http://localhost:3000
```

## 常用命令

```bash
pnpm dev            # 启动开发环境
pnpm build          # 生成 Prisma Client 并构建 Next.js
pnpm start          # 启动生产服务
pnpm lint           # 运行 lint
pnpm typecheck      # TypeScript 类型检查
pnpm check          # 类型检查 + lint
pnpm format         # 格式化代码
pnpm format:check   # 检查格式
pnpm db:push        # 推送 Prisma schema 到数据库
pnpm db:studio      # 打开 Prisma Studio
pnpm db:seed        # 写入种子数据
```

## 架构原则

### 前端

前端负责展示和交互：

- 页面结构；
- 表单体验；
- 加载态、错误态、空状态；
- 响应式和无障碍；
- 不直接处理数据库细节。

### 后端

后端负责数据和安全：

- 输入校验；
- Prisma 数据访问；
- 文件上传和路径安全；
- 导入、导出和备份；
- 统计聚合；
- 权限控制。

在 Next.js 中，后端逻辑可以通过 Server Actions、Route Handlers 和 `lib/` 服务层组织。

## 性能与体验优化

项目已经补入以下基础优化方向：

- Server Components 优先读取数据，减少客户端 JS；
- 首页聚合数据使用并行查询；
- 增加全局 loading 页面；
- 增加全局 error boundary；
- 增加 404 页面；
- 增加跳到主内容的无障碍入口；
- 响应式布局适配移动端；
- CSS 动效支持 `prefers-reduced-motion`；
- 导航链接开启预取；
- request id 便于排查问题。

## 安全设计

已加入：

- 关闭 `X-Powered-By`；
- `X-Content-Type-Options: nosniff`；
- `X-Frame-Options: DENY`；
- `Referrer-Policy: strict-origin-when-cross-origin`；
- `Permissions-Policy` 限制敏感浏览器能力；
- `.env`、上传目录和本地数据库不进入 Git；
- `.env.example` 明确记录必需环境变量。

更多说明见：[docs/SECURITY.md](docs/SECURITY.md)

## 给接手开发者看的文档

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Security Guide](docs/SECURITY.md)
- [Contributing Guide](CONTRIBUTING.md)

## 后续路线

- [ ] 为所有写操作补统一输入校验；
- [ ] 抽离更多服务层函数，减少页面组件中的业务逻辑；
- [ ] 为文件上传加入类型、大小和路径限制；
- [ ] 增加用户、角色和权限模型；
- [ ] 增加分页和搜索性能优化；
- [ ] 增加测试；
- [ ] 完成生产部署说明；
- [ ] 在完成样式抽离后加入严格 CSP。

## 项目理念

AI 学习不应该只属于算法工程师。

这个项目希望把 AI 学习变成一个可以持续推进、复盘和沉淀的系统。即使 AI 不可用，专业程序员也应该能通过清晰的架构、脚本、类型和文档继续维护它。

## License

MIT License
