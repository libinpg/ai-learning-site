# Security Guide

本项目是个人学习管理系统，但仍然需要按真实 Web 应用的安全标准维护。

## 已加入的基础防护

项目已通过 `next.config.mjs` 增加基础响应头：

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` 禁用摄像头、麦克风、地理位置和支付能力
- 关闭 `X-Powered-By`

项目还通过 `middleware.ts` 注入 `x-request-id`，方便日志排查。

## 环境变量

- 从 `.env.example` 复制 `.env`；
- 不要提交真实 `.env`；
- 部署前必须修改 `ADMIN_PASSWORD`；
- 生产数据库不要使用本地 SQLite 文件路径；
- 所有公开给浏览器的变量必须以 `NEXT_PUBLIC_` 开头。

## 输入校验

所有写入操作都必须在服务端校验：

- 字符串长度；
- 枚举值；
- URL 格式；
- 文件类型；
- 文件大小；
- 关联 id 是否存在；
- 当前用户是否有权限执行操作。

建议后续引入统一的 schema 校验层，例如 `zod` 或等价工具。

## 文件上传

上传模块必须遵守：

- 上传目录不进入 Git；
- 文件名需要重新生成，不能直接使用用户原始文件名；
- 文件路径必须限制在 `uploads/` 内；
- 限制文件类型和大小；
- 对视频、文档、图片等文件分目录保存；
- 不允许通过 URL 参数直接读取任意文件路径。

## 数据库

- 不要把生产数据库文件提交到仓库；
- 重要操作需要备份；
- 删除课程、章节、课时前应给用户明确提示；
- 后续多人使用时，需要加入用户、角色和权限模型。

## 部署前检查

```bash
pnpm install
pnpm check
pnpm build
pnpm format:check
```

部署前还需要确认：

- `.env` 配置正确；
- 默认密码已修改；
- 数据库已备份；
- 上传目录有持久化存储；
- HTTPS 已启用；
- 日志不包含敏感信息。

## 暂不加入 CSP 的原因

当前页面中仍存在少量内联样式。过早加入严格 CSP 可能导致页面样式或交互失效。建议在完成样式抽离和 nonce 机制后，再加入正式 Content Security Policy。
