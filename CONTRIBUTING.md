# Contributing Guide

欢迎参与 `ai-learning-site`。本文档说明没有 AI 辅助时，专业开发者如何上手、修改和交付。

## 本地启动

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```

默认访问：

```text
http://localhost:3000
```

## 提交前检查

```bash
pnpm check
pnpm format:check
pnpm build
```

## 分支建议

```text
feat/xxx       新功能
fix/xxx        Bug 修复
docs/xxx       文档修改
refactor/xxx   重构
chore/xxx      工程配置
```

## 代码组织原则

- 页面放在 `app/`；
- 复用 UI 放在 `components/`；
- 数据库访问、环境变量、格式化函数放在 `lib/`；
- 数据模型放在 `prisma/schema.prisma`；
- 架构、安全和维护说明放在 `docs/`。

## 新增功能流程

1. 明确用户场景；
2. 设计数据模型；
3. 更新 Prisma schema；
4. 写服务端逻辑；
5. 写页面和组件；
6. 补充 loading / error / empty 状态；
7. 更新 README 或 docs；
8. 执行检查命令。

## 体验要求

新增页面至少需要考虑：

- 首屏是否清晰；
- 表单是否有明确 label；
- 空状态是否友好；
- 错误是否可恢复；
- 移动端是否可用；
- 键盘是否能操作；
- 加载时是否有反馈。

## 安全要求

- 不信任任何用户输入；
- 不提交真实 `.env`；
- 不提交上传文件；
- 不把数据库文件提交到 Git；
- 写操作必须服务端校验；
- 文件上传必须限制类型、大小和路径。

## 文档要求

任何影响使用方式、部署方式、环境变量、数据模型的改动，都需要同步更新文档。
