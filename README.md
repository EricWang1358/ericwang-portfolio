# Eric Wang — Personal Portfolio

> **Live**: [ericwang-portfolio.netlify.app](https://ericwang-portfolio.netlify.app)

CS senior @ CUHK-Shenzhen 的个人作品集网站。

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (Turbopack, static export) |
| Styling | TailwindCSS v4 + CSS variables (oklch) |
| Components | shadcn/ui (Button, Card) |
| Animation | framer-motion + CSS keyframes |
| Icons | lucide-react |
| Theme | next-themes — 珠光白 / 五彩黑 双模式 |
| Deploy | Netlify (`out/` static) |

## Features

- **Generative Hero** — Canvas 粒子流场背景，鼠标引力井交互，暗色模式 `screen` 混合发光
- **Apple-style Project Cards** — 简洁 brief 默认展示，hover 展开完整描述（CSS Grid `grid-rows-[0fr]→[1fr]`）
- **Dual Marquee Skills** — 双行反向无限滚动技能条，hover 暂停，边缘渐隐遮罩
- **Scroll Progress Bar** — 顶部 2px 渐变进度线
- **Film Grain Overlay** — SVG `feTurbulence` 分形噪声纹理
- **Pearlescent / Iridescent Theme** — oklch 色彩空间，`hue-rotate` 虹彩动画
- **Typewriter Hero** — 4 个角色标签循环打字效果
- **Scroll-triggered Animations** — framer-motion `useInView` 逐节入场

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # 主页（Hero, Projects, About, Contact）
│   ├── layout.tsx          # 字体 + ThemeProvider
│   ├── globals.css         # 主题变量 + 动画 + 工具类
│   ├── about/page.tsx
│   ├── todo/page.tsx
│   └── updates/page.tsx
├── components/
│   ├── generative-hero.tsx # Canvas 粒子流场
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   └── ui/                 # shadcn/ui 组件
.github/
└── copilot-instructions.md # AI 技能评估 + 收尾检查协议
skills/                     # AI skills（gitignored，本地使用）
docs/                       # 框架参考文档
```

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
```

## Deploy

```bash
npx netlify deploy --prod --dir out
```

## AI Skills 架构

项目配置了 3 个 AI 技能（`skills/` 目录，仅本地）+ 强制评估协议（`.github/copilot-instructions.md`）：

| Skill | 用途 |
|-------|------|
| `algorithmic-art` | p5.js 生成式艺术、粒子系统、流场 |
| `frontend-design` | 前端设计最佳实践、字体/色彩/动效/构成 |
| `theme-factory` | 视觉主题创建与应用 |

每次 Copilot 对话自动触发技能评估 → 激活匹配技能 → 遵循规范编码 → 构建/提交/部署。

## License

MIT
