# Copilot 项目指令 — 强制技能评估协议

> 本文件在每次对话时自动注入，等效于 Claude Code 的 `UserPromptSubmit` 钩子。

## 强制技能评估流程（每次回答前必须执行）

### 步骤 1 — 评估

收到用户请求后，**在写任何代码之前**，先对照下表快速判断：

| Skill | 触发词 | 用途 |
|-------|--------|------|
| `frontend-design` | 前端设计、UI、布局、响应式、组件样式、web design | 前端设计最佳实践：字体、色彩、动效、空间构成 |
| `theme-factory` | 主题、dark/light、theming、风格切换、配色 | 创建和应用视觉主题 |
| `algorithmic-art` | 生成式艺术、p5.js、粒子、flow field、Canvas 动画 | p5.js 生成式艺术创作 |
| `skill-router`（全局） | 未匹配上述任何 skill 但任务复杂 | 查路由表寻找更多可用 skill |

### 步骤 2 — 激活

- **匹配到 skill** → 读取对应 `skills/<name>/SKILL.md` 的核心规范，遵循其中的设计原则和禁止事项
- **全部不匹配** → 跳过，直接回答（逃生通道）
- **简单问答 / 非编码任务** → 跳过评估，节省 token

### 步骤 3 — 实现

只有在步骤 2 完成后，才开始编写代码。实现过程中严格遵循已激活技能的规范。

### 步骤 4 — 收尾检查（Stop 钩子）

每次**修改了代码文件**后，必须执行以下清单：

1. **构建验证** — `npx next build`，确认 0 error
2. **Git 提交** — `git add -A && git commit -m "feat/fix/chore: ..."` （语义化 commit message）
3. **Git 推送** — `git push`（需要代理 `http://127.0.0.1:7890`）
4. **Netlify 部署** — `npx netlify deploy --prod --dir out`，确认部署 URL 可访问
5. **结果报告** — 告知用户：commit hash + Netlify URL

> 如果用户明确说"先不用提交/部署"，跳过步骤 2-4。
> 简单问答（无文件修改）跳过全部。

---

## 项目上下文

- **技术栈**: Next.js 16 + TailwindCSS v4 + framer-motion + shadcn/ui + next-themes
- **主题**: 珠光白（light）/ 五彩黑（dark），使用 oklch 色彩空间
- **字体**: Space Grotesk（heading）+ DM Sans（body）
- **部署**: Netlify 静态导出（`next build` → `out/`）
- **代理**: GitHub 操作需要 `http://127.0.0.1:7890` 代理

## 代码规范

### 必须遵守
- 组件使用 `shadcn/ui`（Button, Card, CardContent 等），不要引入其他 UI 库
- 动画优先用 CSS（TailwindCSS `transition-*` / `@keyframes`），复杂交互用 framer-motion
- 颜色使用 CSS 变量（`--background`, `--primary` 等），不硬编码色值
- 图标使用 `lucide-react`
- 暗色模式通过 `.dark` class 切换，使用 `next-themes`

### 禁止事项
- ❌ 引入 Material UI / Ant Design / Chakra 等第三方 UI 库
- ❌ 使用 `#hex` 或 `rgb()` 硬编码颜色（应使用 CSS 变量）
- ❌ 在 `page.tsx` 顶部添加 `"use client"` 以外的 runtime directive
- ❌ 使用 Inter / Roboto / Arial 等通用字体替换现有字体配置

## 文件结构

```
src/app/
├── page.tsx          ← 主页（项目卡片、技能、Hero、Stats）
├── layout.tsx        ← 布局（字体、ThemeProvider）
├── globals.css       ← 主题变量、动画、工具类
├── about/page.tsx
├── todo/page.tsx
└── updates/page.tsx

src/components/
├── ui/               ← shadcn/ui 组件
├── theme-toggle.tsx
└── theme-provider.tsx

skills/               ← AI skills（本文件驱动的评估对象）
.shared/              ← ui-ux-pro-max 设计系统数据
```
