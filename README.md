# AeroNova 飞行模拟器

在浏览器中运行的飞行模拟器：12 架等比建模的 Boeing、Airbus 与战斗机，六自由度飞行模型，美国西南部的真实地形与机场，以及使用真实频率的程序化空中交通管制。项目为纯前端静态站，构建产物可直接部署到任意静态托管。

**界面语言**：全量双语（中文 / English），默认中文。主菜单「设置 → 语言」可实时切换，无需刷新页面。仪表缩写与陆空通话正文保留英文，遵循行业惯例。

## 特性

- **等比机型**：Boeing 737-800、747-8、777-300ER、787-9；Airbus A320neo、A330-300、A350-900、A380-800；F-16C、F/A-18E、F-22A、F-35A。模型依据公开尺寸生成，实测长度、翼展与高度误差在 0.3% 以内；襟翼、扰流板、操纵面、起落架、风扇与加力燃烧室均可动。
- **飞行模型**：120 Hz 刚体仿真。按机翼真实面积、翼展与后掠角计算升力与阻力，包含失速、马赫数阻力上升、地面效应、涡扇推力衰减与转速滞后、加力、反推、燃油消耗、弹簧-阻尼起落架（含刹车与转向）、风、阵风与湍流、结构与坠毁判定。
- **飞行控制**：Airbus 风格电传操纵与包线保护；737/747 采用常规增稳；战斗机采用过载指令；全部机型均提供直接律。自动驾驶与自动油门支持航向、直飞、高度、垂直速度、ILS 进近与自动着陆。
- **玻璃座舱**：PFD、带机场图与滑行引导的 ND、发动机与系统显示、模式控制面板，战斗机配备共形 HUD。包含 GPWS 呼叫、失速与超速告警、着陆报告。
- **真实世界**：覆盖 California、Nevada 与 Arizona 的 1,229 × 1,056 km 区域，使用真实高程数据；26 座真实机场（17 座民用、9 座军用）及其跑道与无线电频率，119 个导航台，城市天际线，昼夜时间，天气预设，以及含 PAPI 的机场灯光。
- **空中交通管制**：ATIS、放行、地面、塔台、离场、区调与进近，采用 FAA 用语，支持复诵、滑行路线、ILS 引导、流量排序、合规监控、复飞与紧急情况，并通过语音合成播报。AI 航空器共用跑道与频率。
- **视觉与交互**：主菜单是覆盖在实时机场上的签派台，包含航班显示屏式机队列表、带等比三视图的机型数据页、登机牌式放行单。飞行中无线电为硬件面板，带琥珀色 LCD 频率窗与打印纸带记录。夜间可见航空公司尾翼涂装、玻璃幕墙航站楼与机坪泛光灯。
- **可选 Claude AI 管制**：玩家自备 Anthropic API Key（设置 → AI 管制）后，Claude 可理解自由输入或语音无线电通话。Key 仅保存在玩家浏览器的 `localStorage`，且只发送到 Anthropic API。未配置 Key 时，内置程序化管制可完成全部流程。

## 快速开始

需要 Node.js 与 npm、支持 WebGL 2 的桌面浏览器；Chrome 或 Edge 的语音支持最佳。

```bash
npm install
npm run dev
```

打开 Vite 输出的地址。生产构建与本地预览：

```bash
npm run build
npm run preview
```

预览服务器固定使用端口 4173。

## 操作说明

选择机型、起飞机场与目的机场，然后点击 **起飞 / FLY**。飞行中按 `H` 查看完整按键表与首飞指南。常用操作：

| 功能 | 按键 |
|---|---|
| 俯仰 / 滚转 | 方向键（`↓` 拉杆抬头） |
| 方向舵 / 前轮转向 | `Q` `E` |
| 油门 | `W` `S`；`Home` 满油门，`End` 慢车 |
| 刹车 · 停留刹车 · 反推 | `B` · `P` · `R` |
| 起落架 · 襟翼 · 减速板 | `G` · `[` `]` · `/` |
| 自动驾驶 · 自动油门 · 预位 ILS 进近 | `Z` · `X` · `V` |
| 无线电：编号通话 · 切换频率 · 自由文本 · 语音 | `F1`–`F8` · `Tab` · `Enter` · 按住 `Space` |
| 视角 · 地图 · 暂停 | `C` 或 `1`–`5` · `N` · `Esc` |

可通过 URL 直接开始飞行，例如：

```text
/?fly&ac=a359&dep=KLAX&dest=KSFO&start=final&hour=21&wx=clear
```

## 目录结构

```text
README.md                  项目说明
INSTRUCTIONS.md            开发规格与架构说明
CLAUDE.md                  协作规范
package.json               脚本与依赖
vite.config.js             Vite 配置
eslint.config.js           ESLint 配置
index.html                 单页入口
public/data/
  terrain.png              烘焙高程（R、G 为 16 位高程）与水体标记（B）
  landcover.jpg            烘焙地表颜色
  airports.json            机场、跑道、频率与导航台
src/
  main.js                  启动、主循环、菜单与飞行状态切换
  flight.js                单次飞行会话：机型、系统、定步长循环、着陆报告
  core/      units.js  settings.js  input.js  views.js  i18n.js
  i18n/      zh.js  en.js
  physics/   atmosphere.js  aero.js  engine.js  flightModel.js
  systems/   fbw.js  autopilot.js  warnings.js
  aircraft/  specs.js  loft.js  airliner.js  fighter.js  model.js
  world/     projection.js  heightfield.js  terrain.js  terrainWorker.js  water.js  sky.js
             airports.js  airportScenery.js  traffic.js  world.js
  atc/       phraseology.js  atc.js  voice.js  claude.js
  ui/        ui.js  menu.js  hud.js  pfd.js  nd.js  eicas.js  fighterHud.js  threeView.js
             dom.js  styles.css
  audio/     sound.js
tools/
  bake_terrain.py          生成 terrain.png 与 landcover.jpg
  bake_airports.py         生成 airports.json
  test-physics.mjs         飞行模型验收测试（12 架机型）
  test-airports.mjs        机场布局与滑行路线检查（26 座机场）
  test-atc.mjs             机器人飞行员完成门到门 ATC 飞行
  test-systems.mjs         系统与文案一致性检查
  test-browser.mjs         真实 UI 的无头 Chromium 测试
  hangar.html  shot.mjs    开发查看器与截图工具
.github/workflows/ci.yml   CI：静态检查、测试、构建、上传产物
```

## 技术要点

- **6DOF 物理**：120 Hz 定步长刚体积分，与帧率解耦；气动力按真实机翼几何推导，发动机、起落架、燃油与损伤均为独立子系统。
- **地形 LOD**：四叉树瓦片，从 153.6 km 根节点细分到 600 m 叶节点；几何在 Web Worker 中生成，父子瓦片无缝衔接。
- **程序化 ATC**：基于真实机场、跑道与频率的状态机，覆盖 IFR 全流程、复诵检查、流量排序与复飞；所有指令都映射到仿真可执行的动作。
- **可选 Claude AI 管制**：在程序化管制之上增加自由文本/语音理解；模型返回结构化动作，再交由同一套程序化处理器执行，避免产生无法跟踪的许可。

## 测试与构建

```bash
npm test
```

依次运行：12 架机型的飞行模型验收测试（地面操作、起飞、机动、巡航、无风与侧风自动着陆）、26 座机场的布局检查、机器人飞行员门到门 IFR 飞行，以及 `tools/test-systems.mjs` 的中英文词典键一致性检查。

```bash
npm run test:browser
```

使用无头 Chromium 加载生产构建，以真实按键完成起飞并检查视角、地图与暂停。运行前先用 `npm run preview` 启动 4173 端口。

```bash
npm run lint
npm run format
```

分别执行 ESLint 检查与 Prettier 格式化。

重新烘焙世界数据（需要 Python 3、NumPy 与 Pillow）：

```bash
npm run bake
```

地表颜色使用 Natural Earth II 10 m `NE2_HR_LC`；若需指定源文件，可运行 `python3 tools/bake_terrain.py /path/to/NE2_HR_LC.tif`。

## 部署（通用静态托管）

```bash
npm run build
```

将生成的 `dist/` 目录部署到任意静态托管，例如 GitHub Pages、Cloudflare Pages、Netlify 或 nginx。Vite 的 `base` 已设为相对路径，可直接部署到子路径。

`.github/workflows/ci.yml` 只负责静态检查、运行测试、构建并上传 `dist/` 产物，不包含自动部署步骤。若在 CI 中发布，需要在托管平台侧配置发布凭据。

## 数据来源与声明

- 高程：Mapzen / AWS Terrain Tiles（开放数据，含 USGS 3DEP 与 SRTM）。
- 地表颜色：Natural Earth（公有领域）。
- 机场、跑道、频率与导航台：OurAirports（公有领域）。
- ILS 频率：KSFO 与 KLAX 采用公布频率，其余为合成频率；部分军用频率为近似值。

机型名称仅用于说明被模拟的型号，涂装为虚构。本项目仅供娱乐，**不得用于真实世界导航或飞行训练**。

许可：MIT，详见 [LICENSE](LICENSE)。
