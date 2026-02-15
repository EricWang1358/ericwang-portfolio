# AI Skills 协同激活框架

> 通过 Hooks + Commands + Agents 协同机制，将 AI Skills 激活率从 25% 提升至 90%+
> 
> 核心洞察：**AI 的能力需要"制度"来激发**。就像聪明的新员工，没有明确的规章制度和岗位手册，会按自己的理解乱来；给他一套完善的制度体系，就能快速成长为团队中坚力量。

## 1. 核心问题

- **AI "选择性失忆"**：配置了详细的 skills，但 AI 主动调用概率仅约 25%
- **规范失效**：AI 忽略架构约束（如要求4层架构却写成3层，禁止使用 el-input 却照用不误）
- **缺乏强制约束**：AI 有能力但缺乏强制性流程，像员工不看手册凭经验干活

**问题根源**：默认工作流程是 `用户提问 → AI 直接回答`，Skills 只是"可选参考"，AI 根据自己判断决定是否调用。

## 2. 核心架构体系

```
┌─────────────────────────────────────────────────────────────────┐
│                         .claude 目录                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐                                                │
│  │settings.json│ ← 核心配置：定义钩子、权限、MCP服务器          │
│  └──────┬──────┘                                                │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ hooks/ (钩子层) - 纪律/制度                              │    │
│  │  session-start.js  │ skill-forced-eval.js │ pre-tool-use.js │
│  │  项目状态感知      │ 技能激活率 25%→90%+  │ 安全防护        │
│  │                    └──────────────────────┘                 │
│  │  stop.js - 总结反馈                                         │
│  └─────────────────────────────────────────────────────────┘    │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ skills/ (技能层) - 知识文档                              │    │
│  │  crud-development  api-development  database-ops         │    │
│  │  ui-pc  ui-mobile  security-guard  ...（共26个）         │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ commands/ (命令层) - 流程/SOP                            │    │
│  │  /dev (7步开发)  /crud (代码生成)  /check (规范检查)     │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ agents/ (代理层) - 分工                                  │    │
│  │  code-reviewer (代码审查)  project-manager (项目管理)    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 Hooks（钩子）- 纪律/制度
在生命周期关键节点强制介入，确保 AI 在每个关键节点执行正确的动作。

### 2.2 Skills（技能）- 知识文档
把项目规范固化成 AI 可学习的 Markdown 文档，按需加载。

### 2.3 Commands（命令）- 流程/SOP
把最佳实践编排成可重复执行的步骤（如 `/dev`, `/crud`）。

### 2.4 Agents（代理）- 分工
让专业的子任务交给专业的代理处理（如代码审查、进度管理）。

## 3. 四个生命周期 Hooks

### 3.1 SessionStart：开工先看项目状态

**触发时机**：每次启动会话时

**核心功能**：
- 显示当前 Git 分支和未提交变更
- 加载项目待办事项
- 展示快捷命令菜单

**实际效果**：
```
## 🚀 项目会话已启动
**时间**: 2024/12/23 14:14:36
**Git 分支**: `master`
⚠️ **未提交变更** (5 个文件):
   M plus-ui/src/views/user/index.vue
   M ruoyi-modules/.../UserService.java

📋 **待办事项**: 3 未完成 / 12 已完成

💡 **快捷命令**:
| /dev   | 开发新功能   |
| /crud  | 快速生成CRUD |
| /check | 代码规范检查 |
```

**价值**：让 AI 在开始工作前先了解项目当前状态，避免"两眼一抹黑"。

### 3.2 UserPromptSubmit：强制技能评估（核心）

**触发时机**：`UserPromptSubmit`（用户每次提交问题时）

**核心逻辑**：在 AI 开始思考之前，强制输出"技能评估指令"。

```javascript
// skill-forced-eval.js 核心逻辑
const instructions = `## 指令：强制技能激活流程（必须执行）

### 步骤 1 - 评估
针对以下每个技能，陈述：[技能名] - 是/否 - [理由]

可用技能列表：
- crud-development: CRUD/业务模块开发
- api-development: API设计/RESTful规范
- database-ops: 数据库/SQL/建表
- ui-pc: 前端组件/AForm/AModal
- ui-mobile: 移动端/WD UI组件
...（共26个技能）

### 步骤 2 - 激活
如果任何技能为"是" → 立即使用 Skill() 工具激活
如果所有技能为"否" → 说明"不需要技能"并继续

### 步骤 3 - 实现
只有在步骤 2 完成后，才能开始实现。`;

// 检测斜杠命令，跳过技能评估（逃生通道）
const isSlashCommand = /^\/[^\/\s]+$/.test(prompt.split(/\s/)[0]);
if (isSlashCommand) {
  process.exit(0); // 跳过
}

console.log(instructions);
```

**效果对比**：

优化前（无 Hook）：
```
用户：帮我开发一个优惠券管理功能
AI：好的，我来帮你写代码...（直接开始，忽略项目规范）
```

优化后（有 Hook）：
```
用户：帮我开发一个优惠券管理功能

AI 评估结果：
- crud-development: 是 - 涉及业务模块CRUD开发
- database-ops: 是 - 需要建表和字典配置
- ui-pc: 否 - 用户未要求前端页面

激活技能：
> Skill(crud-development)
> Skill(database-ops)

[加载技能知识后开始实现...]
```

### 3.3 PreToolUse：安全防护层

**触发时机**：AI 执行 Bash 命令或写入文件之前

**核心功能**：
- 拦截危险命令（`rm -rf /`、`drop database`、`format`）
- 警告敏感操作（删除文件、修改系统配置）
- 阻止运行未经授权的脚本

```javascript
// 危险命令黑名单
const dangerousPatterns = [
  /rm\s+(-rf?|--recursive).*\//,  // rm -rf /
  /drop\s+(database|table)/i,      // SQL删库
  /format\s+[a-z]:/i,              // 格式化磁盘
  />\s*\/dev\/sda/,                // 写入磁盘设备
];

// 检测到危险命令，直接阻止
if (dangerousPatterns.some(p => p.test(command))) {
  console.log(JSON.stringify({
    decision: "block",
    reason: "检测到危险命令，已阻止执行"
  }));
  process.exit(0);
}
```

**价值**：防止 AI 因为"理解偏差"执行灾难性操作。

### 3.4 Stop：总结反馈 + 下一步建议

**触发时机**：AI 完成回答后

**核心功能**：
- 播放完成音效（提醒用户）
- 分析本次代码变更类型
- 智能推荐下一步操作
- 清理临时文件（如 Windows 下误创建的 `nul` 文件）

**实际效果**：
```
--- ✅ **任务完成** | 检测到 8 个文件变更

**建议操作**:
- 使用 `@code-reviewer` 审查后端代码
- 新增了 Service，记得更新项目文档
- SQL 文件有变更，确保更新所有数据库脚本

**项目管理**:
- `/update-status` 更新项目状态
- `git add . && git commit -m "feat: xxx"` 提交代码
```

## 4. Skills：被激活的知识库

### 4.1 SKILL.md 结构模板

每个技能都有一个 `SKILL.md` 文件，遵循统一结构：

```markdown
# [技能名称]

## 触发条件
- 关键词：xxx、xxx、xxx
- 场景：当用户需要 xxx 时

## 核心规范

### 规范1：xxx
（详细说明 + 代码示例）

### 规范2：xxx
（详细说明 + 代码示例）

## 禁止事项
- ❌ 禁止 xxx
- ❌ 禁止 xxx

## 参考代码
- 文件路径：`xxx/xxx.java`
- 文件路径：`xxx/xxx.vue`

## 检查清单
- [ ] 是否遵循 xxx
- [ ] 是否使用 xxx
```

### 4.2 示例：crud-development 技能

```markdown
# CRUD 开发技能

## 触发条件
- 关键词：CRUD、增删改查、业务模块、Entity、Service、DAO
- 场景：开发新的业务功能模块

## 核心规范

### 四层架构
Controller → Service（不继承）→ DAO（buildQueryWrapper）→ Mapper

### Entity 规范
- 必须继承 TenantEntity
- 主键使用雪花 ID，不用自增

### Service 规范
- 禁止继承 ServiceImpl
- 禁止在 Service 层构建查询条件
- 对象转换必须用 MapstructUtils.convert()

### DAO 规范
- 查询条件必须在 buildQueryWrapper() 中构建
- String 类型用 like()，其他类型用 likeCast()

## 禁止事项
- ❌ Service 继承 ServiceImpl
- ❌ 使用 BeanUtil.copyProperties()
- ❌ Controller 使用通用路径如 /page、/{id}

## 参考代码
- Entity: `ruoyi-modules/.../domain/Ad.java`
- Service: `ruoyi-modules/.../service/impl/AdServiceImpl.java`
- DAO: `ruoyi-modules/.../dao/impl/AdDaoImpl.java`
```

**价值**：当 AI 被激活这个技能后，会先"学习"这些规范再生成代码。就像给 AI 发了一本"岗位手册"，强制它在开工前必须阅读。

## 5. Commands：复杂流程的编排器

Skills 解决"知识储备"问题，Commands 解决"流程编排"问题。

### 5.1 /dev：7 步智能开发流程

当用户输入 `/dev 开发用户管理功能` 时，AI 按预设 7 个步骤执行：

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1 | 需求澄清 | AI 主动询问功能细节，确认业务规则和边界条件 |
| 2 | 技术设计 | 确定涉及的数据库表、设计 API 接口、规划前端页面 |
| 3 | 数据库设计 | 生成建表 SQL、配置数据字典、插入菜单数据 |
| 4 | 后端开发 | 按四层架构生成代码：Entity → BO/VO → DAO → Service → Controller |
| 5 | 前端开发 | 生成 API 定义、页面组件、配置路由和权限 |
| 6 | 测试验证 | 启动服务、执行功能测试 |
| 7 | 文档更新 | 更新项目进度、记录待办事项 |

### 5.2 /crud：一键生成四层架构代码

```
输入：/crud b_coupon

输出：
✅ 生成 Entity: Coupon.java
✅ 生成 BO: CouponBo.java
✅ 生成 VO: CouponVo.java
✅ 生成 DAO: ICouponDao.java / CouponDaoImpl.java
✅ 生成 Service: ICouponService.java / CouponServiceImpl.java
✅ 生成 Controller: CouponController.java
✅ 生成 Mapper: CouponMapper.java
✅ 生成前端 API: couponApi.ts / couponTypes.ts
✅ 生成前端页面: coupon.vue
```

**效率对比**：手动开发 2-4 小时 → 使用 /crud 5-10 分钟

### 5.3 /check：全栈代码规范检查

```
输入：/check

输出：
## 后端检查
✅ Entity 继承 TenantEntity
✅ Service 未继承 ServiceImpl
⚠️ UserDao.java:45 - 建议使用 likeCast() 替代 like()

## 前端检查
✅ 使用 AFormInput 替代 el-input
⚠️ user.vue:23 - 建议使用 AModal 替代 el-dialog

## 移动端检查
✅ 使用 wd-form 组件
✅ useToast 从 @/wd 导入
```

### 5.4 命令与技能的关系

命令是流程的骨架，技能是填充的血肉：

```
/dev 命令执行时：
├── 步骤3（数据库设计）→ 激活 database-ops 技能
├── 步骤4（后端开发）→ 激活 crud-development 技能
└── 步骤5（前端开发）→ 激活 ui-pc 技能
```

## 6. Agents：并行处理的子任务专家

有些任务比较独立，不需要在主对话中处理，可以派发给 Agent。

### 6.1 code-reviewer：自动代码审查

**触发方式**：完成代码编写后自动触发，或手动调用 `@code-reviewer`

**审查清单**：
```
## 后端审查清单
- [ ] Entity 是否继承 TenantEntity
- [ ] Service 是否禁止继承 ServiceImpl
- [ ] DAO 是否实现 buildQueryWrapper
- [ ] Controller 路径是否包含实体名
- [ ] 是否使用 MapstructUtils 转换对象

## 前端审查清单
- [ ] 是否使用 A* 封装组件
- [ ] API 调用是否使用 [err, data] 格式
- [ ] 是否存在 el-* 原生组件

## 移动端审查清单
- [ ] 是否使用 wd-* 组件
- [ ] useToast 是否从 @/wd 导入
- [ ] 样式单位是否使用 rpx
```

### 6.2 project-manager：项目进度管理

**触发方式**：手动调用 `@project-manager` 或通过 `/update-status` 命令

**核心功能**：
- 维护 `docs/项目状态.md`
- 更新 `docs/待办清单.md`
- 统计开发进度

**价值**：代理可以并行处理，不阻塞主对话。可以一边让 AI 继续开发下一个功能，一边让代理审查上一个功能的代码。

## 7. 最佳实践

### 7.1 逃生通道设计
- 必须在 Hook 中设计"跳过逻辑"
- 用户明确输入斜杠命令时不做技能评估，省 Token 又快

### 7.2 音效反馈
- 给 AI 加"完成音效"（Audio Agent）
- 长任务时不用一直盯着屏幕

### 7.3 知识库固化
- 将团队口传规范全部写进 `skills/xxx.md`
- "Code as Documentation" 理念
- 收集 AI 的"错误行为"，转化为新的技能规范

### 7.4 逐步迭代
- 先从 1-2 个核心技能开始
- 根据实际使用情况逐步增加
- 让每个开发者贡献自己领域的技能知识

## 8. 快速复用指南

### 8.1 必备文件（最小化配置）

```
.claude/
├── settings.json          # 核心配置
├── hooks/
│   ├── skill-forced-eval.js  # 强制技能评估（最重要）
│   └── pre-tool-use.js       # 安全防护
├── skills/
│   └── your-skill/
│       └── SKILL.md          # 至少一个技能
└── CLAUDE.md                 # 项目规范（可选但推荐）
```

### 8.2 settings.json 配置示例

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/skill-forced-eval.js"
      }]
    }]
  }
}
```

### 8.3 完整目录结构参考

```
.claude/
├── settings.json              # 核心配置
├── CLAUDE.md                  # 项目总规范
├── hooks/                     # 4 个生命周期钩子
│   ├── session-start.js
│   ├── skill-forced-eval.js
│   ├── pre-tool-use.js
│   └── stop.js
├── skills/                    # 26 个专业技能
│   ├── crud-development/
│   ├── api-development/
│   ├── ui-pc/
│   ├── ui-mobile/
│   └── ...
├── commands/                  # 斜杠命令
│   ├── dev.md
│   ├── crud.md
│   └── check.md
├── agents/                    # 自定义代理
│   ├── code-reviewer.md
│   └── project-manager.md
└── templates/                 # 模板文件
    └── 项目状态模板.md
```

## 9. 效率量化

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 技能激活率 | ~25% | 90%+ |
| CRUD 模块开发 | 2-4 小时 | 5-10 分钟 |
| 代码规范符合率 | 不稳定 | 高度一致 |

**最显著的改变**：
1. **AI 终于"懂"项目了**：不再生成不符合架构的代码
2. **开发流程标准化**：每个人的代码风格趋于一致
3. **安全兜底**：再也不用担心 AI 执行危险命令
4. **知识沉淀**：项目规范不再口口相传，全部固化到 Skills

## 10. 参考资源

- **视频教程**：https://www.bilibili.com/video/BV1rnBKB2EME/
- **博客原文**：https://blog.csdn.net/leoisaking/article/details/156203326
- **演示框架**：RuoYi-Plus-UniApp（若依Plus深度重构版）
- **作者**：抓蛙师
