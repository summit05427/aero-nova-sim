// 座舱告警与近地告警（GPWS）呼号。显示文本按当前语言取值，语音同样随语言切换。
import { KT, FT, DEG } from '../core/units.js';
import { t } from '../core/i18n.js';

const CALLOUTS = [2500, 1000, 500, 400, 300, 200, 100, 50, 40, 30, 20, 10];

export class Warnings {
  constructor(flight, world) {
    this.f = flight; this.world = world;
    this.active = [];
    this.lastRa = 99999;
    this.said = {};
    this.t = 0;
    this.callout = null;          // { text, key } 交由音频系统朗读
    this.terrainT = 0;
  }
  speakOnce(key, speechKey, gap = 4) {
    if (this.t - (this.said[key] || -99) < gap) return;
    this.said[key] = this.t;
    this.callout = { text: t(`speech.${speechKey}`), key };
  }
  update(dt) {
    this.t += dt;
    const f = this.f, fm = f.fm, o = fm.out, s = f.spec, c = fm.ctl, L = s.limits;
    const fighter = s.type === 'fighter';
    const w = [];
    // key 用于告警身份判断与语音选词，text 为当前语言的显示文本
    const add = (level, key) => w.push({ level, key, text: t(`warn.${key}`) });
    const ra = o.ra, air = !o.onGround;
    if (fm.crashed) { this.active = w; return; }

    if (o.stall && air) add('warning', 'stall');
    if (o.ias > L.vmo + 3 || o.mach > L.mmo + 0.006) add('warning', 'overspeed');
    if (!fighter && air && Math.abs(o.roll) > 40 * DEG && o.agl > 20) { add('caution', 'bankAngle'); this.speakOnce('bank', 'bank', 5); }
    if (fm.gear > 0.05 && o.ias > L.vle + 5) add('caution', 'gearSpeed');
    if (fm.flap > 0.05 && o.ias > L.vfe + (1 - fm.flap) * 45 + 5) add('caution', 'flapSpeed');
    if (fm.fuel / s.mass.fuel < 0.05) add('caution', 'fuelLow');
    if (fm.fuel <= 0) add('warning', 'fuelExhausted');
    if (fm.engines.some((e) => !e.running)) add('caution', fm.engines.every((e) => !e.running) ? 'allEnginesOff' : 'engineOff');
    if (Math.abs(o.nz) > (fighter ? L.gPos : 2.3) && air) w.push({ level: 'caution', key: 'g', text: `${o.nz.toFixed(1)} G` });

    // 起飞形态检查
    if (o.onGround && c.throttle > 0.7 && o.gs < 45) {
      const fl = s.flaps[c.flapIdx][1];
      if (!fighter && (fl < 0.05 || fl > 0.65)) add('warning', 'configFlaps');
      if (fm.spoiler > 0.1) add('warning', 'configSpoilers');
      if (c.parkBrake) add('warning', 'configParkBrake');
    }
    // 近地告警
    if (air) {
      const sink = -o.vsFpm;
      if (ra < 2500 && sink > 1600 + ra * 1.6) { const severe = sink > 2400 + ra * 2.2; add('warning', severe ? 'pullUp' : 'sinkRate'); this.speakOnce('sink', severe ? 'pullUp' : 'sink', 3); }
      // 沿航迹前视
      this.terrainT -= dt;
      if (this.terrainT <= 0 && o.gs > 50) {
        this.terrainT = 0.4;
        let worst = 1e9;
        for (const tt of [10, 20, 32]) {
          const x = fm.pos.x + fm.vel.x * tt, z = fm.pos.z + fm.vel.z * tt, y = fm.pos.y + Math.min(fm.vel.y, 0) * tt + (fm.vel.y > 0 ? fm.vel.y * tt * 0.5 : 0);
          const cl = y - this.world.elevation(x, z);
          if (cl < worst) { worst = cl; this.terrT = tt; }
        }
        const landing = fm.gear > 0.9 && fm.flap > 0.3 && ra < 2000;
        this.terrain = !landing && worst < 90 ? (this.terrT <= 20 && worst < 30 ? 2 : 1) : 0;
      }
      if (this.terrain === 2) { add('warning', 'terrainPullUp'); this.speakOnce('terr', 'terrainPullUp', 3); }
      else if (this.terrain === 1) { add('caution', 'terrainAhead'); this.speakOnce('terr', 'terrain', 6); }
      if (!fighter && ra < 500 && fm.gear < 0.9 && o.ias < 190 && o.vs < 1) { add('warning', 'tooLowGear'); this.speakOnce('gear', 'tooLowGear', 4); }
      else if (!fighter && ra < 250 && fm.gear > 0.9 && fm.flap < s.flaps[Math.max(1, s.ldgFlap - 2)][1] - 0.02 && o.vs < 0 && o.ias < 180) { add('caution', 'tooLowFlaps'); this.speakOnce('flaps', 'tooLowFlaps', 5); }
      // 下降过程中的无线电高度呼叫
      if (o.vs < -0.5 && fm.gear > 0.5) {
        for (const h of CALLOUTS) {
          if (this.lastRa > h && ra <= h) { this.callout = { text: t(`speech.ra${h}`), key: `ra${h}` }; if (h === 200) this.said.mins = this.t; }
        }
        if (!fighter && ra < 22 && this.lastRa >= 22 && c.throttle > 0.1) this.callout = { text: t('speech.retard'), key: 'retard' };
      }
    }
    this.lastRa = ra;
    if (f.ap.disconnectWarn > 0) add('warning', 'apDisconnect');
    if (f.fcs.direct) add('caution', 'directLaw');
    this.active = w;
    this.stall = w.some((x) => x.key === 'stall');
    this.overspeed = w.some((x) => x.key === 'overspeed');
    this.master = w.some((x) => x.level === 'warning');
  }
}
export { KT, FT };
