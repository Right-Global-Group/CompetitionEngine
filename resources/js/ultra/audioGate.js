/**
 * Audio gate — the games on the homepage play themselves in the tiles, and none of
 * that should make a sound. Speech, <audio>/<video> playback and WebAudio contexts
 * are all held back until the visitor opens the studio (edit mode) and switched
 * off again the moment it closes.
 */
let installed = false;
let allowed = false;
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
            return originals.play.apply(this, arguments);
        };
    }
    if (window.speechSynthesis) {
        originals.speak = window.speechSynthesis.speak;
        window.speechSynthesis.speak = function (u) { if (!allowed) return; return originals.speak.call(window.speechSynthesis, u); };
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
