# AI Learning Site

> 一个面向普通学习者的 AI 学习网站，帮助用户用更直观、更低门槛的方式理解人工智能、大模型和 AI 工具的使用方法。

AI Learning Site is a beginner-friendly learning website for understanding artificial intelligence, large language models, and practical AI workflows through clear explanations, interactive examples, and structured learning paths.

## 项目定位

这个项目希望解决一个问题：

> 很多人知道 AI 很重要，但不知道应该从哪里开始学，也不想一上来就陷入复杂算法、论文和工程细节。

因此，`ai-learning-site` 的目标不是把用户训练成算法工程师，而是帮助普通人建立对 AI 的基本理解，并逐步学会把 AI 用到学习、工作和创作中。

## 适合谁使用

- 想了解 AI 但没有算法背景的人；
- 想系统学习大模型、Prompt 和 AI 工具的新手；
- 想把 AI 用到写作、办公、学习、编程或产品设计中的用户；
- 想给学生、朋友或团队做 AI 入门科普的人；
- 希望通过网页交互理解 AI 原理的人。

## 计划内容

### 1. AI 入门

- 什么是人工智能；
- 什么是机器学习；
- 什么是大模型；
- ChatGPT 为什么看起来这么聪明；
- AI 能做什么，不能做什么。

### 2. 大模型原理科普

- Token 是什么；
- Prompt 是什么；
- 上下文窗口是什么；
- Transformer 的核心直觉；
- 为什么“看到全局”很重要；
- 模型训练、微调和推理的区别。

### 3. Prompt 学习

- 如何提出清晰问题；
- 如何让 AI 按步骤思考；
- 如何设计角色、任务、背景和输出格式；
- 常见 Prompt 模板；
- Prompt 从一次性提问到可复用工作流。

### 4. AI 工具实践

- AI 辅助写作；
- AI 辅助编程；
- AI 辅助阅读；
- AI 辅助做 PPT / 海报 / 网页；
- AI 辅助产品原型设计；
- AI 辅助个人知识管理。

### 5. 交互式学习模块

未来可以加入一些“玩中学”的交互组件：

- Token 切分演示；
- Prompt 改写对比；
- 上下文记忆模拟；
- 简化版注意力机制可视化；
- AI 工作流搭建器；
- 人类问题如何被转换成模型输入的过程演示。

## 项目目标

- 用普通人能理解的语言解释 AI；
- 用可视化和交互降低学习门槛；
- 把零散的 AI 知识整理成学习路径；
- 帮助学习者从“会聊天”升级到“会设计 AI 工作流”；
- 为后续 AI 教育产品或个人学习平台打基础。

## 推荐页面结构

```text
ai-learning-site/
├── 首页：为什么要学习 AI
├── AI 基础：从概念到直觉
├── 大模型原理：不写公式也能理解
├── Prompt 教程：从提问到工作流
├── AI 工具箱：常见使用场景
├── 交互实验室：用小游戏理解 AI
└── 学习路线：不同人群如何开始
```

## 技术栈设想

当前仓库还处于起步阶段，后续可根据实际开发选择技术栈。

推荐方向：

- Frontend: Vue / React / Next.js
- Styling: Tailwind CSS / UnoCSS
- Content: Markdown / MDX
- Visualization: SVG / Canvas / D3.js
- Deployment: GitHub Pages / Vercel / Netlify

## 快速开始

仓库目前还在初始化阶段。后续如果使用前端框架，可以参考以下流程：

```bash
git clone https://github.com/libinpg/ai-learning-site.git
cd ai-learning-site
npm install
npm run dev
```

如果项目使用纯静态页面，也可以直接通过浏览器打开入口 HTML 文件。

## 后续计划

- [ ] 确定网站技术栈；
- [ ] 设计首页信息架构；
- [ ] 编写 AI 入门内容；
- [ ] 制作 Token / Prompt / 上下文窗口交互演示；
- [ ] 增加大模型原理科普模块；
- [ ] 增加 AI 工具实践案例；
- [ ] 部署到 GitHub Pages 或 Vercel；
- [ ] 持续沉淀普通人 AI 学习路线。

## 项目理念

AI 学习不应该只属于算法工程师。

这个项目希望用更轻、更直观、更接近真实生活的方式，让更多人理解 AI，并把 AI 变成自己的学习工具、表达工具和创造工具。

## License

MIT License
