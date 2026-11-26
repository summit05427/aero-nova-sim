// 用户设置，持久化在 localStorage 中。可选的 Anthropic API Key 只保存在玩家自己的浏览器里，
// 不会被打包、提交，也不会发往 api.anthropic.com 之外的任何地方。
const KEY = 'aero-nova-settings-v1';
const DEFAULTS = {
  lang: 'zh',
  quality: 'high',
  masterVol: 0.6,
  voiceVol: 0.9,
  atcVoice: true,
  pilotVoice: true,
  damage: true,
  autoTune: false,
  aiAtc: false,
  claudeKey: '',
  claudeModel: 'claude-opus-5-5',
  aircraft: 'b738',
  dep: 'KSFO',
  dest: 'KLAX',
  start: 'gate',
  airline: 'UAL',
  flightNo: '',
  hour: 10,
  weather: 'scattered',
  fuel: 0.45,
  payload: 0.7,
  showHelpOnStart: true,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return { ...DEFAULTS, ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    return { ...DEFAULTS };
  }
}
export const settings = load();
export function saveSettings() {
  try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch { /* 存储不可用 */ }
}
