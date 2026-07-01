# Community Spirit — 设计方向 Brainstorm

## 三个候选方向

### 方向 A：Tabletop RPG Map Board
- **简介**：整个界面像一张铺开的桌游地图板，浅色羊皮纸质感画布上浮动着"任务卡"和"角色卡"，地图是核心视觉中心，周围散落着 CACP 合约卷轴和 Spirit Points 徽章。
- **概率**：0.07

### 方向 B：Living Terrarium（生态缸）
- **简介**：界面模拟一个微型生态系统观察窗，浅绿色玻璃质感背景，白色浮层像标本标签卡，社区地图像俯视的微缩花园，数据脉动像生物节律。
- **概率**：0.05

### 方向 C：Mission Control Console
- **简介**：借鉴太空任务控制台的信息密度感，但用温暖的绿色调和圆润卡片软化，像一个"社区任务指挥中心"，地图居中，周围是实时状态面板和合约流。
- **概率**：0.08

---

## 选定方向：B — Living Terrarium（生态缸）

### Design Movement
**Organic Minimalism + Terrarium Aesthetic** — 受日本苔藓球（苔玉）和北欧极简主义交叉影响。界面像透过玻璃观察一个活的微型社区生态系统。

### Core Principles
1. **Breathing Canvas**：背景不是死板的灰白，而是有微妙渐变呼吸感的浅绿画布，暗示"活着的系统"
2. **Specimen Card**：所有信息卡片像博物馆标本标签——白色、精致边框、小圆角、清晰层级
3. **Pulse as Life Sign**：所有动态数据用"脉动"而非闪烁表达，像心跳/呼吸节律
4. **Spatial Primacy**：地图永远是视觉重心，其他元素围绕它排列

### Color Philosophy
- **Canvas**：`oklch(0.97 0.015 145)` — 极浅薄荷绿，像阳光透过玻璃缸的感觉
- **Card Surface**：`oklch(1 0 0)` 纯白，带 `box-shadow: 0 1px 3px oklch(0.5 0.02 145 / 0.08)`
- **Primary Accent**：`oklch(0.55 0.15 155)` — 深苔藓绿，用于关键按钮和活跃状态
- **Secondary Accent**：`oklch(0.75 0.12 85)` — 暖琥珀/金色，用于 Spirit Points 和奖励
- **Pulse Glow**：`oklch(0.65 0.18 155)` — 中等饱和绿，用于脉动动画
- **Text**：`oklch(0.25 0.02 145)` 深墨绿色主文字，`oklch(0.5 0.02 145)` 次要文字
- **Danger/Alert**：`oklch(0.6 0.2 25)` — 暖红，仅用于需要审批的操作

### Layout Paradigm
**Asymmetric Terrarium Layout**：
- 左侧窄轨（56px icon rail + 可展开 240px panel）
- 中央主区域：地图占据 60-70% 视觉面积
- 右侧信息面板：根据视图切换内容
- 底部：Demo Control Bar 固定在底部，像实验室仪器控制面板

### Signature Elements
1. **Moss Dot Indicator**：用小圆点（像苔藓球）替代传统状态灯，带微妙的脉动动画
2. **Contract Scroll Card**：CACP 合约卡片有特殊的左侧绿色竖线装饰，像装订线
3. **Spirit Orb**：Spirit Points 用发光的圆形 orb 表示，带柔和的内发光效果

### Interaction Philosophy
- 悬停时卡片微微"呼吸"放大（scale 1.01）
- 点击时有柔和的涟漪效果
- 状态变化用 300ms 的淡入淡出，不用弹跳
- Demo 步骤切换时，相关区域有短暂的绿色脉冲高亮

### Animation
- 页面加载：卡片从 opacity 0 + translateY(8px) 渐入，间隔 50ms stagger
- Pulse 指示器：`animation: pulse 2s ease-in-out infinite` 用 opacity 0.4-1 循环
- 地图 POI：hover 时 scale(1.15) + 绿色光晕
- Demo 步骤切换：当前步骤卡片边框变为 accent 色，0.2s ease-out
- 数值变化：用 CSS counter + transition 实现数字滚动感

### Typography System
- **Display / H1**：Space Grotesk Bold 28-32px — 几何感但有温度
- **H2-H3**：Space Grotesk Medium 18-22px
- **Body**：Inter 14px regular — 高可读性
- **Caption / Label**：Inter 11-12px medium uppercase tracking-wide — 标本标签感
- **Monospace（合约/代码）**：JetBrains Mono 12px — 用于 CACP contract fields

### Brand Essence
> Community Spirit 是一个社区生活 RPG 引擎，为想要让邻里协作变得游戏化、可组合、AI-ready 的社区运营者而生，它用 CACP 协议把人、地点和 AI 连接成活的任务网络。

**三个性格形容词**：Alive（活的）、Composable（可组合的）、Grounded（接地气的）

### Brand Voice
- Headlines 风格：简洁、动词驱动、带一点 RPG 味
  - 例："Your neighborhood is alive. Join the pulse."
  - 例："Tasks grow here. So do communities."
- CTA 风格：具体、行动导向
  - 例："Match to nearest pulse" / "Claim your spirit points"
- 禁止："Welcome to our platform" / "Get started today" / "Smart community solution"

### Wordmark & Logo
- 概念：一个抽象的"发芽种子"图形 — 圆形底部（社区）+ 向上延伸的曲线（生长/精灵）
- 纯图形符号，不含文字，透明背景 PNG
- 主色使用 Primary Accent 深苔藓绿

### Signature Brand Color
**Deep Moss Green** — `oklch(0.55 0.15 155)` — 这是 Community Spirit 独有的颜色，在所有关键交互点出现。
