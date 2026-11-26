// 系统与文案一致性测试：i18n 键集合、静态引用键、设置默认值。
// 运行：node tools/test-systems.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import zh from '../src/i18n/zh.js';
import en from '../src/i18n/en.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
const fail = (msg) => { failed++; console.error(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

// 1. 两本词典的键必须完全一致
const zk = Object.keys(zh).sort(), ek = Object.keys(en).sort();
const missingEn = zk.filter((k) => !(k in en));
const missingZh = ek.filter((k) => !(k in zh));
if (missingEn.length || missingZh.length) {
  if (missingEn.length) fail(`en 缺少键：${missingEn.join(', ')}`);
  if (missingZh.length) fail(`zh 缺少键：${missingZh.join(', ')}`);
} else ok(`词典键一致（${zk.length} 条）`);

// 2. 源码中的静态 t('key') 必须存在
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.js')) out.push(p);
  }
  return out;
}
const used = new Map();
for (const file of walk(join(root, 'src'))) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z][\w.]*)'/g)) used.set(m[1], file);
}
const unknown = [...used.keys()].filter((k) => !(k in zh));
if (unknown.length) fail(`源码引用了不存在的键：${unknown.join(', ')}`);
else ok(`源码静态引用键全部存在（${used.size} 个）`);

// 3. 需要发声的告警必须有对应语音文本（显示键与语音键按表对应）
const SPEECH_PAIRS = {
  bankAngle: 'bank', sinkRate: 'sink', pullUp: 'pullUp',
  terrainPullUp: 'terrainPullUp', terrainAhead: 'terrain',
  tooLowGear: 'tooLowGear', tooLowFlaps: 'tooLowFlaps',
};
const speechKeys = new Set(zk.filter((k) => k.startsWith('speech.')).map((k) => k.slice(7)));
const missingSpeech = Object.entries(SPEECH_PAIRS).filter(([, speech]) => !speechKeys.has(speech)).map(([warn]) => warn);
const raMissing = [2500, 1000, 500, 400, 300, 200, 100, 50, 40, 30, 20, 10].filter((h) => !speechKeys.has(`ra${h}`));
if (missingSpeech.length) fail(`告警缺少语音文本：${missingSpeech.join(', ')}`);
else if (raMissing.length) fail(`缺少无线电高度语音：${raMissing.join(', ')}`);
else ok('告警、语音与高度呼叫文本齐备');

// 4. 设置默认值必须包含语言，且默认中文
const settings = readFileSync(join(root, 'src/core/settings.js'), 'utf8');
if (!/lang:\s*'zh'/.test(settings)) fail("settings.js 默认语言应为 'zh'");
else ok('默认语言为中文');

if (failed) { console.error(`\n${failed} 项检查失败`); process.exit(1); }
console.log('\n系统与文案检查通过');
