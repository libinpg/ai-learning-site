# Architecture Guide

本文档面向不依赖 AI 的专业开发者，说明 `ai-learning-site` 的工程边界、目录职责和扩展方式。

## 技术定位

当前项目采用 **Next.js App Router + Prisma + SQLite** 的全栈架构。

- 前端：Next.js Server Components / Client Components
- 后端：Next.js Server Actions / Route Handlers
- 数据层：Prisma ORM
- 本地数据库：SQLite
- 样式：全局 CSS + 语义化 class
- 类型系统：TypeScript strict mode

这种架构适合个人学习管理系统、轻量级内容平台和可部署的全栈原型。

## 目录职责

```text
.
├── app/                 # 页面、布局、加载态、错误态和路由入口
├── components/          # 可复用 UI 和表单组件
├── lib/                 # 服务端工具、环境变量、Prisma 客户端、格式化函数
├── prisma/              # 数据库 schema、迁移和 seed 数据
├── public/              # 静态资源
├── uploads/             # 本地上传文件，禁止提交到 Git
├── docs/                # 架构、安全、开发文档
└── README.md            # 项目入口说明
```

## 前后端边界

### 前端职责

前端组件负责：

- 展示课程、章节、课时、任务、错题和统计；
- 提供表单输入体验；
- 保持页面可访问性；
- 管理局部交互状态；
- 避免直接处理数据库细节。

### 后端职责

后端逻辑负责：

- 校验输入；
- 调用 Prisma 访问数据库；
- 控制文件上传和路径安全；
- 处理导入、导出、备份和统计；
- 返回稳定的数据结构。

在 Next.js 项目里，后端能力可以通过 Server Actions 或 Route Handlers 实现。复杂业务逻辑应放到 `lib/`，不要全部塞进页面组件。

## 数据模型

Prisma schema 已经覆盖以下核心实体：

- Course：课程
- Chapter：章节
- Lesson：课时
- Note：笔记
- TimestampNote：时间戳笔记
- Tag：标签
- Attachment：附件
- Quiz / Question / AnswerAttempt：测验和答题记录
- Mistake：错题本
- Task：作业 / 项目任务
- StudySession：学习时长记录

新增模型时请遵循：

1. 先改 `prisma/schema.prisma`；
2. 执行 `pnpm db:push` 或后续迁移命令；
3. 更新 seed 数据；
4. 更新对应页面、表单和文档。

## 性能原则

- 首页聚合数据时使用 `Promise.all` 并限制查询数量；
- 大列表需要分页、搜索或增量加载；
- 图片和视频不要直接进入数据库；
- 上传文件只保存路径和元数据；
- 大型交互组件按路由或组件懒加载；
- 优先使用 Server Components 读取数据，减少客户端 bundle。

## 安全原则

- 所有敏感配置放入 `.env`，不要提交真实密钥；
- 上传目录必须在 `.gitignore` 中；
- 服务端写入前必须校验输入；
- 文件路径不能直接信任用户输入；
- 后台导入 / 导出 / 删除操作要加权限保护；
- 生产部署前应替换默认 `ADMIN_PASSWORD`。

## 推荐开发流程

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```

提交前执行：

```bash
pnpm check
pnpm format:check
```

## 维护原则

这个项目的目标是：即使 AI 不可用，普通专业开发者也能通过文档、类型、目录结构和脚本接手维护。

因此每次新增功能时都应该同时更新：

- README；
- docs；
- 类型定义；
- 环境变量示例；
- 数据库说明；
- 必要的错误处理和空状态。
