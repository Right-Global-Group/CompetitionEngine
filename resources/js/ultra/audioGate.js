/**
 * Audio gate — the games on the homepage play themselves in the tiles, and none of
 * that should make a sound. Speech, <audio>/<video> playback and WebAudio contexts
 * are all held back until the visitor opens the studio (edit mode) and switched
 * off again the moment it closes.
 */
let installed = false;
let allowed = false;
const MASTER = 0.35;   // edit-mode volume: the games ship loud
const contexts = new Set();
const originals = {};

export function installAudioGate() {
    if (installed || typeof window === 'undefined') return;
    installed = true;

    const mp = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
    if (mp && mp.play) {
        originals.play = mp.play;
        mp.play = function () {
            if (!allowed && !this.muted) { try { this.pause(); } catch (e) { /* */ } return Promise.resolve(); }
            if (!this.__ceVol) { try { this.volume = Math.min(this.volume, 1) * MASTER; } catch (e) { /* */ } this.__ceVol = true; }
            return originals.play.apply(this, arguments);
        };
    }
    if (window.speechSynthesis) {
        originals.speak = window.speechSynthesis.speak;
        window.speechSynthesis.speak = function (u) { if (!allowed) return; try { u.volume = (u.volume == null ? 1 : u.volume) * MASTER * 1.4; } catch (e) { /* */ } return originals.speak.call(window.speechSynthesis, u); };
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
        originals.resume = AC.prototype.resume;
        AC.prototype.resume = function () {
            contexts.add(this);
            if (!allowed) { try { this.suspend(); } catch (e) { /* */ } return Promise.resolve(); }
            return originals.resume.apply(this, arguments);
        };
        const Gated = class extends AC {
            constructor(...args) { super(...args); contexts.add(this); if (!allowed) { try { this.suspend(); } catch (e) { /* */ } } }
        };
        // everything that reaches the speakers goes through one master gain per context
        if (window.AudioNode && window.AudioDestinationNode) {
            originals.connect = AudioNode.prototype.connect;
            AudioNode.prototype.connect = function (dest, ...rest) {
                if (dest instanceof AudioDestinationNode) {
                    const ctx = this.context;
                    if (!ctx.__ceMaster) { ctx.__ceMaster = ctx.createGain(); ctx.__ceMaster.gain.value = MASTER; originals.connect.call(ctx.__ceMaster, dest); }
                    if (this === ctx.__ceMaster) return originals.connect.call(this, dest, ...rest);
                    return originals.connect.call(this, ctx.__ceMaster, ...rest);
                }
                return originals.connect.call(this, dest, ...rest);
            };
        }
        window.AudioContext = Gated;
        if (window.webkitAudioContext) window.webkitAudioContext = Gated;
    }
}

export function setAudioAllowed(on) {
    allowed = !!on;
    if (allowed) return;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* */ }
    contexts.forEach((c) => { try { c.suspend(); } catch (e) { /* */ } });
    try { document.querySelectorAll('audio, video').forEach((m) => { if (!m.muted) m.pause(); }); } catch (e) { /* */ }
}

export function audioAllowed() { return allowed; }
