// 中文词典（默认语言）。键与 en.js 必须完全一致，tools/test-systems.mjs 会校验。
export default {
  'app.title': 'AeroNova 飞行模拟器',
  'app.tagline': '飞行模拟器',

  // ---------------------------------------------------------------- 主菜单
  'menu.controls': '操作说明',
  'menu.settings': '设置',
  'menu.fleet': '机队',
  'menu.types': '12 种机型',
  'menu.fleetBoeing': '波音',
  'menu.fleetAirbus': '空客',
  'menu.fleetFighters': '战斗机',
  'menu.release': '飞行放行单',
  'menu.from': '从',
  'menu.to': '至',
  'menu.start': '起始位置',
  'menu.startGate': '停机位——完整 ATC 流程',
  'menu.startRunway': '跑道——已对准，随时起飞',
  'menu.startFinal': '五边 10 海里进近',
  'menu.startCruise': '巡航中——自动驾驶已接通',
  'menu.callSign': '呼号',
  'menu.flightNo': '航班号',
  'menu.auto': '自动',
  'menu.fuel': '燃油',
  'menu.payload': '业载',
  'menu.localTime': '当地时间',
  'menu.weather': '天气',
  'menu.fly': '起飞',
  'menu.note': '仅供娱乐——不可用于真实导航。',
  'menu.credit': '地形：Mapzen / AWS Terrain Tiles · 地表颜色：Natural Earth · 机场：OurAirports',
  'menu.localFlight': '本场飞行',
  'menu.circuits': '起落航线或雷达引导',
  'menu.grossWeight': '总重',
  'menu.mtowShare': '{pct}% 最大起飞重量',
  'menu.civil': '民用机场',
  'menu.military': '军用机场',
  'menu.engines': '发动机',
  'menu.thrust': '推力',
  'menu.mtow': '最大起飞重量',
  'menu.empty': '空重',
  'menu.wingArea': '机翼面积',
  'menu.maxSpeed': '最大速度',
  'menu.ceiling': '升限',
  'menu.limitLoad': '限制过载',
  'menu.flightControls': '飞控',
  'menu.thrustEach': '每台 {n} kN',
  'menu.thrustAb': '{dry} kN 干推力 · {ab} kN 加力',

  // ---------------------------------------------------------------- 设置
  'set.title': '设置',
  'set.language': '语言',
  'set.langZh': '中文',
  'set.langEn': 'English',
  'set.graphics': '画质',
  'set.low': '低',
  'set.medium': '中',
  'set.high': '高',
  'set.ultra': '极致',
  'set.reloadHint': '刷新页面后生效。',
  'set.masterVol': '总音量',
  'set.radioVol': '无线电语音音量',
  'set.speakAtc': '朗读管制员通话',
  'set.speakPilot': '朗读我方通话',
  'set.damage': '真实损伤（超 G、超速、重着陆）',
  'set.autoTune': '移交频率时自动切换',
  'set.aiTitle': 'AI 管制（可选）',
  'set.aiHelp': '填入 Anthropic API Key 后，Claude 可以听懂自由输入的语音或文字通话。密钥仅保存在本浏览器，且只发送到 api.anthropic.com。未填密钥时使用内置管制逻辑。',
  'set.useClaude': '用 Claude 处理自由文本与语音通话',
  'set.key': 'Anthropic API Key',
  'set.model': '模型',
  'set.modelOpus': 'Claude Opus 5.5（最强）',
  'set.modelSonnet': 'Claude Sonnet 5.5',
  'set.modelHaiku': 'Claude Haiku 5.5（最快、成本最低）',
  'set.forget': '清除密钥',
  'set.done': '完成',

  // ---------------------------------------------------------------- 帮助
  'help.html': `
<h2>操作说明</h2>
<div class="cols">
<table>
<tr><th colspan="2">飞行操纵</th></tr>
<tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>俯仰（↓ 为抬头）</td></tr>
<tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>滚转</td></tr>
<tr><td><kbd>Q</kbd> <kbd>E</kbd></td><td>方向舵 / 前轮转向</td></tr>
<tr><td><kbd>W</kbd> <kbd>S</kbd> 或 <kbd>PgUp</kbd> <kbd>PgDn</kbd></td><td>油门（最后 13% 为战斗机加力）</td></tr>
<tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>最大推力 / 慢车</td></tr>
<tr><td><kbd>R</kbd>（按住）</td><td>地面反推</td></tr>
<tr><td><kbd>B</kbd>（按住）· <kbd>P</kbd></td><td>机轮刹车 · 停留刹车</td></tr>
<tr><td><kbd>G</kbd></td><td>起落架</td></tr>
<tr><td><kbd>[</kbd> <kbd>]</kbd></td><td>襟翼收 / 放一档</td></tr>
<tr><td><kbd>/</kbd> · <kbd>Shift</kbd>+<kbd>/</kbd></td><td>减速板 · 预位地面扰流板</td></tr>
<tr><td><kbd>,</kbd> <kbd>.</kbd></td><td>俯仰配平（直接法则）</td></tr>
<tr><td><kbd>Y</kbd></td><td>电传 ↔ 直接法则</td></tr>
<tr><td><kbd>I</kbd> · <kbd>L</kbd></td><td>发动机启动 / 关车 · 着陆灯</td></tr>
<tr><td><kbd>M</kbd></td><td>鼠标驾驶盘开 / 关</td></tr>
</table>
<table>
<tr><th colspan="2">自动驾驶</th></tr>
<tr><td><kbd>Z</kbd> · <kbd>X</kbd></td><td>自动驾驶 · 自动油门</td></tr>
<tr><td><kbd>T</kbd> · <kbd>V</kbd></td><td>调谐最近的 ILS · 预位进近（航向道 + 下滑道，自动着陆）</td></tr>
<tr><td>MCP 旋钮</td><td>在 SPD / HDG / ALT / V/S 上滚动（Shift 为大幅调整）</td></tr>
<tr><th colspan="2">无线电</th></tr>
<tr><td><kbd>F1</kbd>–<kbd>F8</kbd></td><td>发送对应编号的通话</td></tr>
<tr><td><kbd>Tab</kbd></td><td>COM1 主频 ↔ 备频互换</td></tr>
<tr><td><kbd>Enter</kbd></td><td>用自己的话输入一次通话</td></tr>
<tr><td><kbd>Space</kbd>（按住）</td><td>按下发话（浏览器支持时使用语音识别）</td></tr>
<tr><th colspan="2">视角与模拟</th></tr>
<tr><td><kbd>C</kbd> · <kbd>1</kbd>–<kbd>5</kbd></td><td>切换视角 · 驾驶舱、追尾、塔台、掠过、翼尖</td></tr>
<tr><td>拖拽 · 滚轮</td><td>环视 / 环绕 · 缩放</td></tr>
<tr><td><kbd>N</kbd> · <kbd>K</kbd></td><td>大比例地图 · 隐藏仪表板</td></tr>
<tr><td><kbd>-</kbd> <kbd>=</kbd></td><td>时间加速 ×1 – ×8</td></tr>
<tr><td><kbd>Esc</kbd> · <kbd>H</kbd></td><td>暂停菜单 · 本帮助</td></tr>
</table>
</div>
<h3>第一次飞行</h3>
<ol>
<li>在停机位时无线电默认在 ATIS。按 <kbd>Tab</kbd> 切到放行，按 <kbd>F1</kbd> 申请 IFR 放行，再按一次 <kbd>F1</kbd> 复诵。</li>
<li><kbd>Tab</kbd> 切到地面：申请推出，然后申请滑行。松开停留刹车（<kbd>P</kbd>），加一点油门，跟着导航显示上的绿色滑行线走（滚轮缩放）。</li>
<li>到脱离点切到塔台并报告准备好。设置起飞襟翼（<kbd>]</kbd>），然后加满推力。在速度带上出现 <b>VR</b> 时轻柔抬轮。</li>
<li>收起落架（<kbd>G</kbd>），按计划收襟翼；需要时接通自动驾驶 <kbd>Z</kbd> 与自动油门 <kbd>X</kbd>。管制给出的高度与航向已自动设到 MCP，你只需复诵。</li>
<li>进近阶段会被引导到 ILS。按 <kbd>V</kbd> 预位进近；自动驾驶会跟踪航向道与下滑道并着陆。放起落架、襟翼到着陆位、预位扰流板。</li>
</ol>
<p class="small">支持手柄：左摇杆俯仰/滚转，右摇杆方向舵，扳机油门，A 起落架，X/Y 襟翼，B 刹车。</p>
<div class="btns"><button class="primary close">关闭</button></div>`,

  // ---------------------------------------------------------------- 暂停 / 损毁 / 着陆 / 结束
  'pause.title': '已暂停',
  'pause.resume': '继续',
  'pause.help': '操作说明与首次飞行',
  'pause.restart': '重新开始本次飞行',
  'pause.runway': '重新定位：跑道',
  'pause.final': '重新定位：五边 10 海里',
  'pause.cruise': '重新定位：巡航',
  'pause.menu': '返回主菜单',
  'crash.title': '航空器损毁',
  'crash.again': '再试一次',
  'crash.runway': '从跑道重新开始',
  'crash.final': '从五边 10 海里重新开始',
  'crash.menu': '返回主菜单',
  'land.title': '着陆报告',
  'land.fpm': '接地率',
  'land.speed': '速度',
  'land.runway': '跑道',
  'land.threshold': '越过跑道入口',
  'land.centreline': '中线偏差',
  'land.right': '偏右',
  'land.left': '偏左',
  'land.remaining': '剩余跑道',
  'land.surface': '道面',
  'land.offRunway': '跑道外',
  'land.butter': '完美',
  'land.good': '良好',
  'land.firm': '扎实',
  'land.hard': '重',
  'land.rough': '粗猛',
  'parked.title': '飞行结束',
  'parked.block': '轮挡时间 {min} 分钟 · 耗油 {fuel} 千克',
  'parked.menu': '返回主菜单',
  'parked.stay': '留在驾驶舱',

  // ---------------------------------------------------------------- HUD 消息
  'msg.parkBrakeSet': '停留刹车 已设置',
  'msg.parkBrakeReleased': '停留刹车 已松开',
  'msg.atOn': '自动油门 接通',
  'msg.atOff': '自动油门 断开',
  'msg.directLaw': '直接法则——用 , 与 . 手动配平',
  'msg.normalLaw': '正常法则',
  'msg.landingLightsOn': '着陆灯 开',
  'msg.landingLightsOff': '着陆灯 关',
  'msg.spoilersArmed': '地面扰流板 + 自动刹车 已预位',
  'msg.spoilersDisarmed': '地面扰流板 + 自动刹车 已解除',
  'msg.mouseYokeOn': '鼠标驾驶盘 开',
  'msg.mouseYokeOff': '鼠标驾驶盘 关',
  'msg.nothingHeard': '没有听到内容——改用 Enter 输入',
  'msg.pressH': '按 H 查看操作说明与首次飞行指引',
  'msg.apDisengaged': '自动驾驶 已断开',
  'msg.gearDown': '起落架 放下',
  'msg.gearUp': '起落架 收起',
  'msg.flaps': '襟翼 {name}',
  'msg.approachCancelled': '进近方式 已取消',
  'msg.approachArmed': '进近已预位 — ILS {id} {icao}',
  'msg.noIlsTuned': '未调谐 ILS（按 T 调谐最近的 ILS）',
  'msg.ilsTuned': 'ILS {icao} 跑道 {rwy} — {freq} — 航道 {crs}°',
  'msg.noIlsNear': '60 海里内没有 ILS',
  'msg.autoThrottleOff': '自动油门 已断开',
  'msg.gearLocked': '起落架手柄在地面锁定',
  'msg.speedbrakeRetracted': '减速板 已收起',
  'msg.speedbrakeHalf': '减速板 半开',
  'msg.speedbrakeFull': '减速板 全开',
  'msg.engineStart': '发动机 启动',
  'msg.enginesShutDown': '发动机 已关车',
  'msg.apUnavailable': '地面上无法接通自动驾驶',
  'msg.tailStrike': '机尾擦地',
  'msg.groundSpoilers': '地面扰流板 已放出',

  // ---------------------------------------------------------------- 告警
  'warn.stall': '失速',
  'warn.overspeed': '超速',
  'warn.bankAngle': '坡度过大',
  'warn.gearSpeed': '起落架超速',
  'warn.flapSpeed': '襟翼超速',
  'warn.fuelLow': '燃油不足',
  'warn.fuelExhausted': '燃油耗尽',
  'warn.allEnginesOff': '全部发动机停车',
  'warn.engineOff': '发动机停车',
  'warn.configFlaps': '起飞形态 襟翼',
  'warn.configSpoilers': '起飞形态 扰流板',
  'warn.configParkBrake': '起飞形态 停留刹车',
  'warn.pullUp': '拉起',
  'warn.sinkRate': '下降率过大',
  'warn.terrainPullUp': '地形 — 拉起',
  'warn.terrainAhead': '前方地形',
  'warn.tooLowGear': '高度过低 — 起落架',
  'warn.tooLowFlaps': '高度过低 — 襟翼',
  'warn.apDisconnect': '自动驾驶断开',
  'warn.directLaw': '直接法则',
  'speech.bank': '坡度过大，坡度过大',
  'speech.sink': '下降率过大',
  'speech.pullUp': '拉起',
  'speech.terrainPullUp': '地形，地形，拉起',
  'speech.terrain': '注意，前方地形',
  'speech.tooLowGear': '高度过低，起落架',
  'speech.tooLowFlaps': '高度过低，襟翼',
  'speech.retard': '收油门，收油门',
  'speech.ra2500': '两千五百英尺',
  'speech.ra1000': '一千英尺',
  'speech.ra500': '五百英尺',
  'speech.ra400': '四百英尺',
  'speech.ra300': '三百英尺',
  'speech.ra200': '两百英尺',
  'speech.ra100': '一百英尺',
  'speech.ra50': '五十英尺',
  'speech.ra40': '四十英尺',
  'speech.ra30': '三十英尺',
  'speech.ra20': '二十英尺',
  'speech.ra10': '十英尺',

  // ---------------------------------------------------------------- 无线电
  'atc.radioReadyGate': '无线电已就绪。先收听 {freq} 的 ATIS，然后按 Tab 切到放行。',
  'atc.radioReadyOther': '无线电已就绪。用 F1–F8（或点击按钮）发送通话。',
  'atc.readBack': '复诵：“{text}”',
  'atc.noStation': '（本频率无台站——请调谐到合适的频率）',
  'atc.listeningAtis': '（正在收听 ATIS——切换频率后才能发话）',
  'atc.requestIfrLocal': '申请 IFR 放行，雷达引导返回 {dest}',
  'atc.requestIfr': '申请 IFR 放行至 {dest}',
  'atc.requestPushback': '申请推出',
  'atc.requestTaxi': '申请滑行',
  'atc.requestTaxiVfr': '申请滑行，VFR 本场起落航线',
  'atc.clearOfRunway': '已脱离跑道 {rwy}，申请滑行至停机位',
  'atc.readyDeparture': '准备好起飞，跑道 {rwy}',
  'atc.requestClosed': '申请本场起落航线（保持在航线内）',
  'atc.linedUp': '（已进跑道等待）',
  'atc.midfieldFull': '三边中段，全停',
  'atc.midfieldTouch': '三边中段，连续起落',
  'atc.midfieldOption': '三边中段，任选',
  'atc.checkIn': '向 {name} 报到',
  'atc.requestDescent': '申请下降',
  'atc.requestDirect': '申请直飞 {dest}',
  'atc.requestLower': '申请更低高度',
  'atc.reportFinal': '五边报告，跑道 {rwy}',
  'atc.goingAround': '复飞',
  'atc.sayAgain': '再说一遍',
  'atc.windCheck': '申请风向风速',
  'atc.mayday': '宣布紧急状态（MAYDAY）',
  'atc.ilsTuned': 'ILS {rwy} 已调谐：{freq} MHz，航道 {crs}°。按 V 预位进近。',
  'atc.pushbackComplete': '推出完成。停留刹车已设置——准备好后申请滑行。',
  'atc.aiUnavailable': 'AI 管制不可用（{err}）——已改用内置管制逻辑。',

  // ---------------------------------------------------------------- HUD 面板
  'hud.activeFreq': '主用频率',
  'hud.standbyFreq': '备用频率——滚动调谐，Shift 为整兆赫',
  'hud.swapTitle': '主频 ↔ 备频互换（Tab）',
  'hud.enterCall': 'Enter：输入一次通话',
  'hud.ptt': '按住空格发话',
  'hud.noStation': '无台站',
  'hud.bigmapHint': 'N 关闭 · 滚动缩放',
  'hud.adjustHint': '滚动（或点击左右半区）调整——Shift 为大幅',
  'hud.rangeHint': '滚动或点击左右切换量程',
  'hud.presetHint': '单击置备频，双击置主频',
  'hud.local': '{hh}:{mm} 当地时间',
  'hud.keys': 'H 帮助 · Esc 菜单',

  // ---------------------------------------------------------------- 加载与错误
  'load.starting': '正在启动',
  'load.airports': '正在加载机场',
  'load.elevation': '正在加载地形高程',
  'load.landcover': '正在加载地表覆盖',
  'load.building': '正在构建机场',
  'load.ready': '就绪',
  'load.terrain': '正在生成地形',
  'err.start': '启动模拟器时出现问题。',
  'err.webgl': '需要支持 WebGL 2 的桌面浏览器。',

  // ---------------------------------------------------------------- 天气 / 机型角色 / 飞控法则
  'wx.clear': '晴空',
  'wx.scattered': '疏云',
  'wx.overcast': '阴天',
  'wx.lowvis': '低能见度（IFR）',
  'wx.crosswind': '强侧风',
  'wx.storm': '雷雨',
  'role.narrowTwin': '窄体双发',
  'role.fourWide': '四发宽体',
  'role.longRangeTwin': '远程宽体双发',
  'role.compositeTwin': '复合材料宽体双发',
  'role.wideTwin': '宽体双发',
  'role.doubleDeck': '双层四发宽体',
  'role.singleFighter': '单发多用途战斗机',
  'role.carrierFighter': '双发舰载攻击战斗机',
  'role.stealthAir': '双发隐身制空战斗机',
  'role.stealthMulti': '单发隐身多用途战斗机',
  'law.fbw': '电传操纵，包线保护',
  'law.conventional': '常规操纵，增稳',
  'law.fighter': '电传操纵，过载指令',
  'crashReason.gearUp': '机腹着陆',
  'crashReason.terrain': '撞击地形',
  'crashReason.enginePod': '发动机吊舱触地',
  'crashReason.wing': '机翼触地',
  'crashReason.nose': '机头撞击',
  'crashReason.water': '坠入水中',
  'crashReason.ditch': '水上迫降',
  'crashReason.diverged': '模拟发散',
  'crashReason.overspeed': '超速——结构失效',
  'crashReason.hardLanding': '重着陆——起落架折断（{fpm} fpm）',
  'crashReason.structural': '结构失效（{g} g）',
};
