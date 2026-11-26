// UI root: loading screen, menu, in-flight HUD and overlays; wires input actions to the flight
// and owns the per-flight helpers (ATC, traffic, warnings).
import { Menu } from './menu.js';
import { HUD } from './hud.js';
import { ATC } from '../atc/atc.js';
import { Voice } from '../atc/voice.js';
import { makeCallsign } from '../atc/phraseology.js';
import { Traffic } from '../world/traffic.js';
import { Warnings } from '../systems/warnings.js';
import { Sound } from '../audio/sound.js';
import { settings } from '../core/settings.js';
import { t, getLang, onLangChange } from '../core/i18n.js';
import { el, esc } from './dom.js';
import { KT, FT } from '../core/units.js';

// 物理层给出的是英文损毁原因，这里按固定文案映射翻译，带数值的用正则提取
const CRASH_KEYS = {
  'Gear-up landing': 'crashReason.gearUp',
  'Terrain impact': 'crashReason.terrain',
  'Engine pod strike': 'crashReason.enginePod',
  'Wing strike': 'crashReason.wing',
  'Nose impact': 'crashReason.nose',
  'Crashed into the water': 'crashReason.water',
  'Ditched in the water': 'crashReason.ditch',
  'Simulation diverged': 'crashReason.diverged',
  'Overspeed - structural failure': 'crashReason.overspeed',
};
function crashText(reason) {
  if (CRASH_KEYS[reason]) return t(CRASH_KEYS[reason]);
  let m = /^Hard landing - gear collapse \((\d+) fpm\)$/.exec(reason);
  if (m) return t('crashReason.hardLanding', { fpm: m[1] });
  m = /^Structural failure \(([\d.]+) g\)$/.exec(reason);
  if (m) return t('crashReason.structural', { g: m[1] });
  return reason;
}

// 帮助页正文随语言切换，因此改为在打开时取值
const HELP = () => t('help.html');

export class UI {
  constructor(app) {
    this.app = app;
    this.root = document.getElementById('ui');
    this.loading = el('div', 'loading', `<div class="wordmark big"><b>AERONOVA</b><i>${t('app.tagline')}</i></div><div class="keys"><div class="bar"><i></i></div></div><p></p>`);
    this.root.appendChild(this.loading);
    this.overlay = el('div', 'overlay');
    this.root.appendChild(this.overlay);
    app.sound = new Sound();
    app.voice = new Voice(app.sound);
    this.menu = null; this.hud = null;
    this.atc = null; this.traffic = null; this.warnings = null;
    this.paused = false;
    this.clock = 0;
  }

  bind() {
    const app = this.app, inp = app.input;
    this.menu = new Menu(app, this.root);
    this.hud = new HUD(app, this.root);
    this.root.appendChild(this.overlay);
    const F = () => app.flight;
    const on = (name, fn) => inp.on(name, (arg) => { if (F() && !F().fm.crashed && (!this.paused || name === 'pause' || name === 'help')) fn(F(), arg); });
    on('gear', (f) => f.toggleGear());
    on('flapsUp', (f) => f.flaps(-1));
    on('flapsDown', (f) => f.flaps(1));
    on('parkBrake', (f) => { f.fm.ctl.parkBrake = !f.fm.ctl.parkBrake; this.hud.message(t(f.fm.ctl.parkBrake ? 'msg.parkBrakeSet' : 'msg.parkBrakeReleased')); });
    on('autopilot', (f) => f.toggleAP());
    on('autothrottle', (f) => { f.ap.setAT(!f.ap.at); this.hud.message(t(f.ap.at ? 'msg.atOn' : 'msg.atOff')); });
    on('directLaw', (f) => { f.fcs.direct = !f.fcs.direct; f.fcs.trim = f.fcs.direct ? f.fcs.autoTrim + (f.fcs.eFF || 0) : 0; this.hud.message(t(f.fcs.direct ? 'msg.directLaw' : 'msg.normalLaw'), f.fcs.direct ? 'caution' : 'info'); });
    on('engines', (f) => f.toggleEngines());
    on('lights', (f) => { f.lights.landing = !f.lights.landing; this.hud.message(t(f.lights.landing ? 'msg.landingLightsOn' : 'msg.landingLightsOff')); });
    on('speedbrake', (f) => f.cycleSpeedbrake());
    on('spoilerArm', (f) => { f.fm.ctl.spoilerArmed = !f.fm.ctl.spoilerArmed; f.ap.autobrake = f.fm.ctl.spoilerArmed; this.hud.message(t(f.fm.ctl.spoilerArmed ? 'msg.spoilersArmed' : 'msg.spoilersDisarmed')); });
    on('throttleFull', (f) => f.setThrottle(1));
    on('throttleIdle', (f) => f.setThrottle(0));
    on('viewNext', (f) => app.views.next(f.spec));
    on('view', (f, v) => app.views.set(v, f.spec));
    on('map', () => this.hud.toggleBig());
    on('hudToggle', () => this.hud.togglePanel());
    on('timeUp', (f) => { f.timeScale = Math.min(8, f.timeScale * 2); });
    on('timeDown', (f) => { f.timeScale = Math.max(1, f.timeScale / 2); });
    on('mouseYoke', () => { inp.mouseYoke = !inp.mouseYoke; this.hud.message(t(inp.mouseYoke ? 'msg.mouseYokeOn' : 'msg.mouseYokeOff')); });
    on('comSwap', () => { this.atc.swap(); app.sound.click(); });
    on('radioText', () => { this.hud.e.tx.focus(); });
    on('atc', (f, i) => this.hud.choose(+i));
    on('ilsTune', () => this.hud.tuneNearestILS());
    on('approach', () => this.hud.armApproach());
    on('pttDown', () => {
      if (!app.voice.canListen) { this.hud.e.tx.focus(); return; }
      app.voice.stop();
      app.voice.listen().then((text) => { if (text && this.atc) this.atc.transmitText(text); else if (!text) this.hud.message(t('msg.nothingHeard'), 'caution'); });
    });
    on('pttUp', () => app.voice.stopListening());
    inp.on('pause', () => { if (app.state === 'flying') this.togglePause(); });
    inp.on('help', () => this.showHelp());
    // 语言切换：重建 HUD 静态文案；飞行中则一并恢复无线电日志
    onLangChange(() => {
      if (!this.hud) return;
      this.hud.mount();
      if (this.atc && app.flight && this.warnings && this.traffic) this.hud.start(app.flight, this.atc, this.warnings, this.traffic);
    });
  }

  resize(w, h) { if (this.hud) this.hud.resize(w, h); }
  showLoading(p, msg) {
    this.loading.style.display = '';
    this.loading.querySelector('i').style.width = `${Math.round(p * 100)}%`;
    this.loading.querySelector('p').textContent = msg;
  }
  hideLoading() { this.loading.style.display = 'none'; }
  fatal(err) {
    this.loading.style.display = '';
    // 错误信息可能有用户可控内容，使用 textContent 避免注入
    const p = this.loading.querySelector('p');
    p.innerHTML = '';
    const main = el('span', '', esc(t('err.start')));
    const detail = el('small', '', esc(String(err && err.message ? err.message : err)));
    const hint = el('small', '', esc(t('err.webgl')));
    p.append(main, el('br'), detail, el('br'), hint);
  }

  showMenu() { this.hideLoading(); this.closeOverlay(); this.menu.show(); }
  updateMenu(dt) { this.menu.update(dt, this.app.renderer); }

  startFlight(flight) {
    const app = this.app;
    this.menu.hide();
    this.closeOverlay();
    this.paused = false;
    const cs = makeCallsign(flight.spec, settings.airline, settings.flightNo);
    this.traffic = new Traffic(app.world, flight);
    this.atc = new ATC(flight, app.world, { voice: app.voice, callsign: cs, traffic: this.traffic });
    this.traffic.atc = this.atc;
    this.warnings = new Warnings(flight, app.world);
    this.hud.start(flight, this.atc, this.warnings, this.traffic);
    this.clock = settings.hour;
    this.landShown = 0;
    if (flight.start === 'gate') this.hud.message(t('msg.pressH'), 'info', 9);
  }
  endFlight() {
    this.app.voice.stop();
    if (this.traffic) this.traffic.dispose();
    this.hud.stop();
    this.atc = null; this.traffic = null; this.warnings = null;
    this.app.sound.update({ n1: 0, ias: 0, gs: 0, paused: true });
  }

  update(dt) {
    const app = this.app, f = app.flight;
    if (!f) return;
    const sdt = this.paused ? 0 : dt * f.timeScale;
    if (!this.paused && !f.fm.crashed) {
      this.atc.update(sdt);
      this.traffic.update(sdt);
      this.warnings.update(dt);
      // the sun moves with simulated time
      this.clock += sdt / 3600;
      if (Math.abs(this.clock - app.world.env.hour) > 0.02) app.world.env.setTime(this.clock % 24);
    }
    // events from the flight
    for (const e of f.events) {
      if (e.type === 'touchdown') { app.sound.touchdown(Math.min(1.5, e.rep.fpm / 500)); this.landing = e.rep; this.landShown = 2.5; }
      else if (e.type === 'crash') this.showCrash(e.reason);
      else if (e.type === 'apDisconnect') { app.sound.apDisconnect(); this.hud.message(t('msg.apDisengaged'), 'warning'); }
      else if (e.type === 'gear') this.hud.message(t(e.down ? 'msg.gearDown' : 'msg.gearUp'));
      else if (e.type === 'flaps') this.hud.message(t('msg.flaps', { name: e.name }));
      else if (e.type === 'parked') this.showParked();
      else if (e.key) this.hud.message(t(e.key), e.type === 'warning' ? 'warning' : e.type === 'caution' ? 'caution' : 'info');
      else if (e.text) this.hud.message(e.text, e.type === 'warning' ? 'warning' : e.type === 'caution' ? 'caution' : 'info');
      if (this.atc) this.atc.flightEvent(e);
    }
    f.events.length = 0;
    // landing report once the touchdown has settled
    if (this.landShown > 0) {
      this.landShown -= dt;
      if (this.landShown <= 0 && this.landing) this.showLanding(this.landing);
    }
    // spoken call-outs
    const c = this.warnings.callout;
    if (c) { this.warnings.callout = null; if (settings.atcVoice && app.voice.synth) { const u = new SpeechSynthesisUtterance(c.text); u.lang = getLang() === 'zh' ? 'zh-CN' : 'en-US'; u.rate = 1.35; u.pitch = 0.7; u.volume = settings.masterVol; try { app.voice.synth.speak(u); } catch { /* 忽略 */ } } }
    // audio
    const fm = f.fm, o = fm.out;
    let ab = 0;
    for (const e of fm.engines) ab = Math.max(ab, e.ab);
    app.sound.update({
      n1: o.n1, ab, ias: o.ias, gs: o.gs, onGround: o.onGround, paved: o.paved, cockpit: app.views.mode === 'cockpit',
      gearMoving: fm.gear > 0.01 && fm.gear < 0.99, flapMoving: Math.abs(fm.flap - f.spec.flaps[fm.ctl.flapIdx][1]) > 0.004,
      stall: this.warnings.stall, overspeed: this.warnings.overspeed, master: this.warnings.master && !this.warnings.stall,
      paused: this.paused || !!fm.crashed, fighter: f.spec.type === 'fighter',
    });
    this.hud.update(dt);
  }

  // ---------------------------------------------------------------- overlays
  openOverlay(html, cls = '') {
    this.overlay.className = `overlay on ${cls}`;
    this.overlay.innerHTML = `<div class="box">${html}</div>`;
    return this.overlay.querySelector('.box');
  }
  closeOverlay() { this.overlay.className = 'overlay'; this.overlay.innerHTML = ''; }
  togglePause() {
    const f = this.app.flight;
    if (!f || f.fm.crashed) return;
    if (this.overlay.classList.contains('help')) { this.closeOverlay(); if (!this.paused) return; }
    this.paused = !this.paused;
    f.paused = this.paused;
    if (!this.paused) { this.closeOverlay(); return; }
    this.app.voice.stop();
    const b = this.openOverlay(`<h2>${t('pause.title')}</h2>
      <div class="vbtns">
        <button class="primary" data-a="resume">${t('pause.resume')}</button>
        <button data-a="help">${t('pause.help')}</button>
        <button data-a="restart">${t('pause.restart')}</button>
        <button data-a="runway">${t('pause.runway')}</button>
        <button data-a="final">${t('pause.final')}</button>
        <button data-a="cruise">${t('pause.cruise')}</button>
        <button data-a="menu">${t('pause.menu')}</button>
      </div>`, 'pause');
    b.querySelectorAll('button').forEach((btn) => { btn.onclick = () => this.pauseAction(btn.dataset.a); });
  }
  pauseAction(a) {
    const app = this.app;
    if (a === 'resume') this.togglePause();
    else if (a === 'help') this.showHelp();
    else if (a === 'menu') { this.paused = false; app.toMenu(); }
    else {
      this.paused = false;
      app.startFlight({ aircraft: settings.aircraft, dep: settings.dep, dest: settings.dest, start: a === 'restart' ? settings.start : a, hour: settings.hour, weather: settings.weather, fuel: settings.fuel, payload: settings.payload });
    }
  }
  showHelp() {
    if (this.overlay.classList.contains('help')) { this.closeOverlay(); if (this.paused) { this.paused = false; this.togglePause(); } return; }
    const b = this.openOverlay(HELP(), 'help');
    b.querySelector('.close').onclick = () => { this.closeOverlay(); if (this.paused) { this.paused = false; this.togglePause(); } };
  }
  showCrash(reason) {
    const app = this.app;
    app.voice.stop();
    const b = this.openOverlay(`<h2 class="bad">${t('crash.title')}</h2><p class="big">${esc(crashText(reason))}</p>
      <div class="vbtns"><button class="primary" data-a="restart">${t('crash.again')}</button><button data-a="runway">${t('crash.runway')}</button><button data-a="final">${t('crash.final')}</button><button data-a="menu">${t('crash.menu')}</button></div>`, 'crash');
    b.querySelectorAll('button').forEach((btn) => { btn.onclick = () => this.pauseAction(btn.dataset.a); });
  }
  showLanding(r) {
    this.landing = null;
    if (this.app.flight.fm.crashed) return;
    const grade = t(r.score >= 90 ? 'land.butter' : r.score >= 75 ? 'land.good' : r.score >= 55 ? 'land.firm' : r.score >= 35 ? 'land.hard' : 'land.rough');
    const rows = [`<tr><th>${t('land.fpm')}</th><td>${r.fpm} fpm</td></tr>`, `<tr><th>${t('land.speed')}</th><td>${r.kt} kt</td></tr>`];
    if (r.onRunway) {
      rows.push(`<tr><th>${t('land.runway')}</th><td>${r.airport.icao} ${r.end.id}</td></tr>`, `<tr><th>${t('land.threshold')}</th><td>${Math.round(r.dist)} m</td></tr>`,
        `<tr><th>${t('land.centreline')}</th><td>${Math.abs(r.offset).toFixed(1)} m ${t(r.offset > 0 ? 'land.right' : 'land.left')}</td></tr>`, `<tr><th>${t('land.remaining')}</th><td>${Math.round(r.remaining)} m</td></tr>`);
    } else rows.push(`<tr><th>${t('land.surface')}</th><td>${t('land.offRunway')}</td></tr>`);
    this.hud.showCard(`<header><small>${t('land.title')}</small><b>${r.score}</b></header><div class="stamp">${grade}</div><table>${rows.join('')}</table>`, 16);
  }
  showParked() {
    const f = this.app.flight;
    const used = Math.round(f.spec.mass.fuel * settings.fuel - f.fm.fuel);
    const b = this.openOverlay(`<h2>${t('parked.title')}</h2><p class="big">${f.dep.icao} → ${f.dest.icao}</p>
      <p>${t('parked.block', { min: Math.floor(f.time / 60), fuel: Math.max(0, used).toLocaleString(getLang() === 'zh' ? 'zh-CN' : 'en-US') })}</p>
      <div class="vbtns"><button class="primary" data-a="menu">${t('parked.menu')}</button><button data-a="resume2">${t('parked.stay')}</button></div>`, 'pause');
    b.querySelectorAll('button').forEach((btn) => { btn.onclick = () => { if (btn.dataset.a === 'menu') this.app.toMenu(); else this.closeOverlay(); }; });
  }
}
export { KT, FT };
