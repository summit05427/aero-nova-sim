// English dictionary. Keys must match zh.js exactly; tools/test-systems.mjs checks this.
export default {
  'app.title': 'AeroNova Flight Simulator',
  'app.tagline': 'Flight Simulator',

  // ---------------------------------------------------------------- main menu
  'menu.controls': 'Controls',
  'menu.settings': 'Settings',
  'menu.fleet': 'Fleet',
  'menu.types': '12 types',
  'menu.fleetBoeing': 'Boeing',
  'menu.fleetAirbus': 'Airbus',
  'menu.fleetFighters': 'Fighters',
  'menu.release': 'Flight release',
  'menu.from': 'From',
  'menu.to': 'To',
  'menu.start': 'Start',
  'menu.startGate': 'At the gate — full ATC flight',
  'menu.startRunway': 'On the runway, ready for take-off',
  'menu.startFinal': '10 nm final approach',
  'menu.startCruise': 'In cruise, autopilot on',
  'menu.callSign': 'Call sign',
  'menu.flightNo': 'Flight no.',
  'menu.auto': 'auto',
  'menu.fuel': 'Fuel',
  'menu.payload': 'Payload',
  'menu.localTime': 'Local time',
  'menu.weather': 'Weather',
  'menu.fly': 'FLY',
  'menu.note': 'For entertainment only — not for real-world navigation.',
  'menu.credit': 'Terrain: Mapzen / AWS Terrain Tiles · Land colour: Natural Earth · Airports: OurAirports',
  'menu.localFlight': 'Local flight',
  'menu.circuits': 'circuits or vectors',
  'menu.grossWeight': 'Gross weight',
  'menu.mtowShare': '{pct}% MTOW',
  'menu.civil': 'Civil airports',
  'menu.military': 'Military airfields',
  'menu.engines': 'Engines',
  'menu.thrust': 'Thrust',
  'menu.mtow': 'Max take-off',
  'menu.empty': 'Empty',
  'menu.wingArea': 'Wing area',
  'menu.maxSpeed': 'Max speed',
  'menu.ceiling': 'Ceiling',
  'menu.limitLoad': 'Limit load',
  'menu.flightControls': 'Flight controls',
  'menu.thrustEach': '{n} kN each',
  'menu.thrustAb': '{dry} kN dry · {ab} kN reheat',

  // ---------------------------------------------------------------- settings
  'set.title': 'Settings',
  'set.language': 'Language',
  'set.langZh': '中文',
  'set.langEn': 'English',
  'set.graphics': 'Graphics quality',
  'set.low': 'Low',
  'set.medium': 'Medium',
  'set.high': 'High',
  'set.ultra': 'Ultra',
  'set.reloadHint': 'Applies after reloading the page.',
  'set.masterVol': 'Master volume',
  'set.radioVol': 'Radio voice volume',
  'set.speakAtc': 'Speak ATC transmissions',
  'set.speakPilot': 'Speak my own transmissions',
  'set.damage': 'Realistic damage (over-g, overspeed, hard landings)',
  'set.autoTune': 'Swap to the new frequency automatically on hand-off',
  'set.aiTitle': 'AI ATC (optional)',
  'set.aiHelp': 'With an Anthropic API key, Claude understands free-form typed or spoken radio calls. The key is stored only in this browser and sent only to api.anthropic.com. Without a key the built-in controller is used.',
  'set.useClaude': 'Use Claude for free-text and voice transmissions',
  'set.key': 'Anthropic API key',
  'set.model': 'Model',
  'set.modelOpus': 'Claude Opus 5.5 (most capable)',
  'set.modelSonnet': 'Claude Sonnet 5.5',
  'set.modelHaiku': 'Claude Haiku 5.5 (fastest, lowest cost)',
  'set.forget': 'Forget key',
  'set.done': 'Done',

  // ---------------------------------------------------------------- help
  'help.html': `
<h2>Controls</h2>
<div class="cols">
<table>
<tr><th colspan="2">Flight controls</th></tr>
<tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>Pitch (↓ pulls the nose up)</td></tr>
<tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>Roll</td></tr>
<tr><td><kbd>Q</kbd> <kbd>E</kbd></td><td>Rudder / nose-wheel steering</td></tr>
<tr><td><kbd>W</kbd> <kbd>S</kbd> or <kbd>PgUp</kbd> <kbd>PgDn</kbd></td><td>Throttle (last 13 % = afterburner on fighters)</td></tr>
<tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>Full thrust / idle</td></tr>
<tr><td><kbd>R</kbd> (hold)</td><td>Reverse thrust on the ground</td></tr>
<tr><td><kbd>B</kbd> (hold) · <kbd>P</kbd></td><td>Wheel brakes · parking brake</td></tr>
<tr><td><kbd>G</kbd></td><td>Landing gear</td></tr>
<tr><td><kbd>[</kbd> <kbd>]</kbd></td><td>Flaps up / down one detent</td></tr>
<tr><td><kbd>/</kbd> · <kbd>Shift</kbd>+<kbd>/</kbd></td><td>Speed brake · arm ground spoilers</td></tr>
<tr><td><kbd>,</kbd> <kbd>.</kbd></td><td>Pitch trim (direct law)</td></tr>
<tr><td><kbd>Y</kbd></td><td>Fly-by-wire ↔ direct law</td></tr>
<tr><td><kbd>I</kbd> · <kbd>L</kbd></td><td>Engines start/stop · landing lights</td></tr>
<tr><td><kbd>M</kbd></td><td>Mouse yoke on/off</td></tr>
</table>
<table>
<tr><th colspan="2">Autopilot</th></tr>
<tr><td><kbd>Z</kbd> · <kbd>X</kbd></td><td>Autopilot · autothrottle</td></tr>
<tr><td><kbd>T</kbd> · <kbd>V</kbd></td><td>Tune nearest ILS · arm approach (LOC + G/S, autoland)</td></tr>
<tr><td>MCP knobs</td><td>Scroll over SPD / HDG / ALT / V/S (Shift = big steps)</td></tr>
<tr><th colspan="2">Radio</th></tr>
<tr><td><kbd>F1</kbd>–<kbd>F8</kbd></td><td>Transmit the numbered call</td></tr>
<tr><td><kbd>Tab</kbd></td><td>Swap COM1 active ↔ standby</td></tr>
<tr><td><kbd>Enter</kbd></td><td>Type a radio call in your own words</td></tr>
<tr><td><kbd>Space</kbd> (hold)</td><td>Push-to-talk (speech recognition, where supported)</td></tr>
<tr><th colspan="2">Views and simulation</th></tr>
<tr><td><kbd>C</kbd> · <kbd>1</kbd>–<kbd>5</kbd></td><td>Next view · cockpit, chase, tower, fly-by, wing</td></tr>
<tr><td>Drag · wheel</td><td>Look around / orbit · zoom</td></tr>
<tr><td><kbd>N</kbd> · <kbd>K</kbd></td><td>Large map · hide instrument panels</td></tr>
<tr><td><kbd>-</kbd> <kbd>=</kbd></td><td>Time acceleration ×1 – ×8</td></tr>
<tr><td><kbd>Esc</kbd> · <kbd>H</kbd></td><td>Pause menu · this help</td></tr>
</table>
</div>
<h3>A first flight</h3>
<ol>
<li>At the gate the radio starts on ATIS. Press <kbd>Tab</kbd> for Clearance and <kbd>F1</kbd> to request your IFR clearance, then <kbd>F1</kbd> again to read it back.</li>
<li><kbd>Tab</kbd> to Ground: request pushback, then taxi. Release the parking brake (<kbd>P</kbd>), add a little thrust and follow the green line on the map display (scroll to zoom).</li>
<li>At the holding point switch to Tower and report ready. Set take-off flaps (<kbd>]</kbd>), then full thrust. Rotate gently at <b>VR</b> on the speed tape.</li>
<li>Gear up (<kbd>G</kbd>), flaps up on schedule, autopilot <kbd>Z</kbd> and autothrottle <kbd>X</kbd> if you like. ATC altitudes and headings are set on the MCP for you — just read them back.</li>
<li>Approach will vector you to the ILS. Press <kbd>V</kbd> to arm the approach; with the autopilot on it will fly the localizer and glideslope and land. Gear down, flaps to landing, arm spoilers.</li>
</ol>
<p class="small">Gamepads are supported: left stick pitch/roll, right stick rudder, triggers throttle, A gear, X/Y flaps, B brakes.</p>
<div class="btns"><button class="primary close">Close</button></div>`,

  // ---------------------------------------------------------------- pause / crash / landing / parked
  'pause.title': 'Paused',
  'pause.resume': 'Resume',
  'pause.help': 'Controls and first-flight guide',
  'pause.restart': 'Restart this flight',
  'pause.runway': 'Reposition: on the runway',
  'pause.final': 'Reposition: 10 nm final',
  'pause.cruise': 'Reposition: cruise',
  'pause.menu': 'Main menu',
  'crash.title': 'Aircraft lost',
  'crash.again': 'Try again',
  'crash.runway': 'Restart on the runway',
  'crash.final': 'Restart on 10 nm final',
  'crash.menu': 'Main menu',
  'land.title': 'Landing report',
  'land.fpm': 'Touchdown rate',
  'land.speed': 'Speed',
  'land.runway': 'Runway',
  'land.threshold': 'Past the threshold',
  'land.centreline': 'Centreline',
  'land.right': 'right',
  'land.left': 'left',
  'land.remaining': 'Runway remaining',
  'land.surface': 'Surface',
  'land.offRunway': 'Off the runway',
  'land.butter': 'Butter',
  'land.good': 'Good landing',
  'land.firm': 'Firm',
  'land.hard': 'Hard',
  'land.rough': 'Rough',
  'parked.title': 'Flight complete',
  'parked.block': 'Block time {min} min · fuel used {fuel} kg',
  'parked.menu': 'Main menu',
  'parked.stay': 'Stay in the cockpit',

  // ---------------------------------------------------------------- HUD messages
  'msg.parkBrakeSet': 'PARKING BRAKE SET',
  'msg.parkBrakeReleased': 'PARKING BRAKE RELEASED',
  'msg.atOn': 'AUTOTHROTTLE ON',
  'msg.atOff': 'AUTOTHROTTLE OFF',
  'msg.directLaw': 'DIRECT LAW — manual trim with , and .',
  'msg.normalLaw': 'NORMAL LAW',
  'msg.landingLightsOn': 'LANDING LIGHTS ON',
  'msg.landingLightsOff': 'LANDING LIGHTS OFF',
  'msg.spoilersArmed': 'GROUND SPOILERS + AUTOBRAKE ARMED',
  'msg.spoilersDisarmed': 'GROUND SPOILERS + AUTOBRAKE DISARMED',
  'msg.mouseYokeOn': 'MOUSE YOKE ON',
  'msg.mouseYokeOff': 'MOUSE YOKE OFF',
  'msg.nothingHeard': 'NOTHING HEARD — type with Enter instead',
  'msg.pressH': 'Press H for the controls and a first-flight guide',
  'msg.apDisengaged': 'AUTOPILOT DISENGAGED',
  'msg.gearDown': 'GEAR DOWN',
  'msg.gearUp': 'GEAR UP',
  'msg.flaps': 'FLAPS {name}',
  'msg.approachCancelled': 'APPROACH MODE CANCELLED',
  'msg.approachArmed': 'APPROACH ARMED — ILS {id} {icao}',
  'msg.noIlsTuned': 'NO ILS TUNED (press T to tune the nearest ILS)',
  'msg.ilsTuned': 'ILS {icao} RWY {rwy} — {freq} — CRS {crs}°',
  'msg.noIlsNear': 'NO ILS WITHIN 60 NM',
  'msg.autoThrottleOff': 'AUTOTHROTTLE DISENGAGED',
  'msg.gearLocked': 'GEAR LEVER LOCKED ON GROUND',
  'msg.speedbrakeRetracted': 'SPEED BRAKE RETRACTED',
  'msg.speedbrakeHalf': 'SPEED BRAKE HALF',
  'msg.speedbrakeFull': 'SPEED BRAKE FULL',
  'msg.engineStart': 'ENGINE START',
  'msg.enginesShutDown': 'ENGINES SHUT DOWN',
  'msg.apUnavailable': 'AUTOPILOT NOT AVAILABLE ON GROUND',
  'msg.tailStrike': 'TAIL STRIKE',
  'msg.groundSpoilers': 'GROUND SPOILERS',

  // ---------------------------------------------------------------- warnings
  'warn.stall': 'STALL',
  'warn.overspeed': 'OVERSPEED',
  'warn.bankAngle': 'BANK ANGLE',
  'warn.gearSpeed': 'GEAR SPEED',
  'warn.flapSpeed': 'FLAP SPEED',
  'warn.fuelLow': 'FUEL LOW',
  'warn.fuelExhausted': 'FUEL EXHAUSTED',
  'warn.allEnginesOff': 'ALL ENGINES OFF',
  'warn.engineOff': 'ENGINE OFF',
  'warn.configFlaps': 'CONFIG FLAPS',
  'warn.configSpoilers': 'CONFIG SPOILERS',
  'warn.configParkBrake': 'CONFIG PARK BRAKE',
  'warn.pullUp': 'PULL UP',
  'warn.sinkRate': 'SINK RATE',
  'warn.terrainPullUp': 'TERRAIN — PULL UP',
  'warn.terrainAhead': 'TERRAIN AHEAD',
  'warn.tooLowGear': 'TOO LOW — GEAR',
  'warn.tooLowFlaps': 'TOO LOW — FLAPS',
  'warn.apDisconnect': 'AUTOPILOT DISCONNECT',
  'warn.directLaw': 'DIRECT LAW',
  'speech.bank': 'bank angle, bank angle',
  'speech.sink': 'sink rate',
  'speech.pullUp': 'pull up',
  'speech.terrainPullUp': 'terrain, terrain. pull up',
  'speech.terrain': 'caution, terrain',
  'speech.tooLowGear': 'too low, gear',
  'speech.tooLowFlaps': 'too low, flaps',
  'speech.retard': 'retard, retard',
  'speech.ra2500': 'twenty five hundred',
  'speech.ra1000': 'one thousand',
  'speech.ra500': 'five hundred',
  'speech.ra400': 'four hundred',
  'speech.ra300': 'three hundred',
  'speech.ra200': 'two hundred',
  'speech.ra100': 'one hundred',
  'speech.ra50': 'fifty',
  'speech.ra40': 'forty',
  'speech.ra30': 'thirty',
  'speech.ra20': 'twenty',
  'speech.ra10': 'ten',

  // ---------------------------------------------------------------- radio
  'atc.radioReadyGate': 'Radio ready. Listen to the ATIS on {freq}, then press Tab to swap to Clearance.',
  'atc.radioReadyOther': 'Radio ready. Use F1–F8 (or click) to transmit.',
  'atc.readBack': 'Read back: “{text}”',
  'atc.noStation': '(No station on this frequency — tune a facility)',
  'atc.listeningAtis': '(Listening to ATIS — swap frequency to transmit)',
  'atc.requestIfrLocal': 'Request IFR clearance, radar vectors back to {dest}',
  'atc.requestIfr': 'Request IFR clearance to {dest}',
  'atc.requestPushback': 'Request pushback',
  'atc.requestTaxi': 'Request taxi',
  'atc.requestTaxiVfr': 'Request taxi, VFR closed traffic',
  'atc.clearOfRunway': 'Clear of runway {rwy}, request taxi to parking',
  'atc.readyDeparture': 'Ready for departure, runway {rwy}',
  'atc.requestClosed': 'Request closed traffic (stay in the pattern)',
  'atc.linedUp': '(Lined up and waiting)',
  'atc.midfieldFull': 'Midfield downwind, full stop',
  'atc.midfieldTouch': 'Midfield downwind, touch and go',
  'atc.midfieldOption': 'Midfield downwind, the option',
  'atc.checkIn': 'Check in with {name}',
  'atc.requestDescent': 'Request descent',
  'atc.requestDirect': 'Request direct {dest}',
  'atc.requestLower': 'Request lower',
  'atc.reportFinal': 'Report on final, runway {rwy}',
  'atc.goingAround': 'Going around',
  'atc.sayAgain': 'Say again',
  'atc.windCheck': 'Request wind check',
  'atc.mayday': 'Declare emergency (MAYDAY)',
  'atc.ilsTuned': 'ILS {rwy} tuned: {freq} MHz, course {crs}°. Press V to arm the approach.',
  'atc.pushbackComplete': 'Pushback complete. Parking brake set — request taxi when ready.',
  'atc.aiUnavailable': 'AI ATC unavailable ({err}) — using the built-in controller.',

  // ---------------------------------------------------------------- HUD panels
  'hud.activeFreq': 'Active frequency',
  'hud.standbyFreq': 'Standby — scroll to tune, Shift for MHz',
  'hud.swapTitle': 'Swap active / standby (Tab)',
  'hud.enterCall': 'Enter: type a radio call',
  'hud.ptt': 'Hold Space to talk',
  'hud.noStation': 'no station',
  'hud.bigmapHint': 'N to close · scroll to zoom',
  'hud.adjustHint': 'Scroll (or click left/right half) to adjust — Shift for big steps',
  'hud.rangeHint': 'Scroll or click left/right to change range',
  'hud.presetHint': 'click: standby, double-click: active',
  'hud.local': '{hh}:{mm} local',
  'hud.keys': 'H help · Esc menu',

  // ---------------------------------------------------------------- loading and errors
  'load.starting': 'Starting',
  'load.airports': 'Loading airports',
  'load.elevation': 'Loading terrain elevation',
  'load.landcover': 'Loading land cover',
  'load.building': 'Building airports',
  'load.ready': 'Ready',
  'load.terrain': 'Generating terrain',
  'err.start': 'Something went wrong while starting the simulator.',
  'err.webgl': 'A desktop browser with WebGL 2 is required.',

  // ---------------------------------------------------------------- weather / roles / control laws
  'wx.clear': 'Clear skies',
  'wx.scattered': 'Scattered clouds',
  'wx.overcast': 'Overcast',
  'wx.lowvis': 'Low visibility (IFR)',
  'wx.crosswind': 'Strong crosswind',
  'wx.storm': 'Stormy',
  'role.narrowTwin': 'Narrow-body twinjet',
  'role.fourWide': 'Four-engine wide-body',
  'role.longRangeTwin': 'Long-range wide-body twinjet',
  'role.compositeTwin': 'Composite wide-body twinjet',
  'role.wideTwin': 'Wide-body twinjet',
  'role.doubleDeck': 'Double-deck four-engine wide-body',
  'role.singleFighter': 'Single-engine multirole fighter',
  'role.carrierFighter': 'Twin-engine carrier strike fighter',
  'role.stealthAir': 'Twin-engine stealth air-superiority fighter',
  'role.stealthMulti': 'Single-engine stealth multirole fighter',
  'law.fbw': 'Fly-by-wire, envelope protection',
  'law.conventional': 'Conventional, stability augmentation',
  'law.fighter': 'Fly-by-wire, g command',
  'crashReason.gearUp': 'Gear-up landing',
  'crashReason.terrain': 'Terrain impact',
  'crashReason.enginePod': 'Engine pod strike',
  'crashReason.wing': 'Wing strike',
  'crashReason.nose': 'Nose impact',
  'crashReason.water': 'Crashed into the water',
  'crashReason.ditch': 'Ditched in the water',
  'crashReason.diverged': 'Simulation diverged',
  'crashReason.overspeed': 'Overspeed - structural failure',
  'crashReason.hardLanding': 'Hard landing - gear collapse ({fpm} fpm)',
  'crashReason.structural': 'Structural failure ({g} g)',
};
