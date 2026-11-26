// 轻量自研 i18n：零第三方依赖。词典按模块扁平组织（见 src/i18n/zh.js、en.js），
// 支持 {name} 形式插值，并可在运行期热切换语言而无需刷新页面。
import { settings, saveSettings } from './settings.js';
import zh from '../i18n/zh.js';
import en from '../i18n/en.js';

const DICTS = { zh, en };
const LANGS = { zh: 'zh-CN', en: 'en' };
const listeners = new Set();

/** 当前生效语言（仅支持 zh / en，非法值回退 zh）。 */
export function getLang() {
  return settings.lang === 'en' ? 'en' : 'zh';
}

/** 取词并做插值；缺失键回退英文，再回退键名本身，便于快速发现遗漏。 */
export function t(key, vars) {
  const dict = DICTS[getLang()];
  let s = dict[key];
  if (s == null) s = DICTS.en[key];
  if (s == null) return key;
  if (vars) for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]));
  return s;
}

/** 切换语言：更新 <html lang>、持久化并通知订阅者。 */
export function setLang(lang, { save = true } = {}) {
  const next = lang === 'en' ? 'en' : 'zh';
  settings.lang = next;
  if (typeof document !== 'undefined') document.documentElement.lang = LANGS[next];
  if (save) saveSettings();
  for (const fn of listeners) fn(next);
}

/** 订阅语言变化，返回取消订阅函数。 */
export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** 把带 data-i18n / data-i18n-title / data-i18n-placeholder 的静态节点替换为当前语言文本。 */
export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
  root.querySelectorAll('[data-i18n-title]').forEach((n) => { n.title = t(n.dataset.i18nTitle); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((n) => { n.placeholder = t(n.dataset.i18nPlaceholder); });
}

/** 应用启动时把 <html lang> 设为当前语言。 */
if (typeof document !== 'undefined') document.documentElement.lang = LANGS[getLang()];
