/**
 * Football default sound kit — fully procedural via the Web Audio API. No audio files, no CDN,
 * no licensing concerns. These are the DEFAULT sounds (crowd ambience, goal "wooo" roar, ref
 * whistle, ball kick). Any sound the admin uploads for a cue overrides the matching synth default.
 *
 * Browsers suspend AudioContext until a user gesture — call resume() from a click handler first.
 */
export type FootballSfx = ReturnType<typeof createFootballSfx>;

export function createFootballSfx() {
    let ctx: AudioContext | null = null;
    let master: GainNode | null = null;
    let crowd: { src: AudioBufferSourceNode; gain: GainNode } | null = null;

    function ac(): AudioContext | null {
        if (typeof window === 'undefined') return null;
        const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AC) return null;
        if (!ctx) {
            ctx = new AC();
            master = ctx.createGain();
            master.gain.value = 1;
            master.connect(ctx.destination);
        }
        return ctx;
    }

    function resume() {
        try { const c = ac(); if (c && c.state === 'suspended') void c.resume(); } catch { /* */ }
    }

    function noise(c: AudioContext, seconds: number): AudioBuffer {
        const len = Math.max(1, Math.floor(c.sampleRate * seconds));
        const buf = c.createBuffer(1, len, c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        return buf;
    }

    /** Ref whistle — a short trilled high tone. */
    function whistle(vol = 0.45) {
        const c = ac(); if (!c || !master) return;
        const t = c.currentTime;
        const o = c.createOscillator(); o.type = 'triangle';
        o.frequency.setValueAtTime(2300, t);
        o.frequency.linearRampToValueAtTime(2520, t + 0.14);
        const lfo = c.createOscillator(); lfo.frequency.value = 26;
        const lfoGain = c.createGain(); lfoGain.gain.value = 110;
        lfo.connect(lfoGain).connect(o.frequency);
        const g = c.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 0.02);
        g.gain.setValueAtTime(vol, t + 0.18);
        g.gain.linearRampToValueAtTime(0, t + 0.27);
        o.connect(g).connect(master);
        o.start(t); lfo.start(t); o.stop(t + 0.28); lfo.stop(t + 0.28);
    }

    /** Ball strike — a low thud plus a short click. */
    function kick(vol = 0.7) {
        const c = ac(); if (!c || !master) return;
        const t = c.currentTime;
        const o = c.createOscillator(); o.type = 'sine';
        o.frequency.setValueAtTime(190, t);
        o.frequency.exponentialRampToValueAtTime(58, t + 0.13);
        const g = c.createGain();
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        o.connect(g).connect(master); o.start(t); o.stop(t + 0.22);

        const n = c.createBufferSource(); n.buffer = noise(c, 0.05);
        const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
        const ng = c.createGain();
        ng.gain.setValueAtTime(vol * 0.5, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        n.connect(hp).connect(ng).connect(master); n.start(t); n.stop(t + 0.06);
    }

    /** Goal celebration — a crowd roar swelling up ("wooo") layered with a rising tonal cheer. */
    function cheer(vol = 0.9) {
        const c = ac(); if (!c || !master) return;
        const t = c.currentTime;
        // roar: noise swell through a rising bandpass
        const n = c.createBufferSource(); n.buffer = noise(c, 2.4);
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.7;
        bp.frequency.setValueAtTime(360, t);
        bp.frequency.linearRampToValueAtTime(1150, t + 0.55);
        const g = c.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 0.28);
        g.gain.setValueAtTime(vol, t + 1.2);
        g.gain.linearRampToValueAtTime(0, t + 2.3);
        n.connect(bp).connect(g).connect(master); n.start(t); n.stop(t + 2.4);
        // "wooo" tonal layer rising
        const o = c.createOscillator(); o.type = 'sawtooth';
        o.frequency.setValueAtTime(170, t);
        o.frequency.linearRampToValueAtTime(300, t + 0.45);
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
        const og = c.createGain();
        og.gain.setValueAtTime(0, t);
        og.gain.linearRampToValueAtTime(vol * 0.22, t + 0.3);
        og.gain.linearRampToValueAtTime(0, t + 1.7);
        o.connect(lp).connect(og).connect(master); o.start(t); o.stop(t + 1.8);
    }

    /** Keeper save — a glove punch/thud plus a short crowd "ohh" groan. */
    function save(vol = 0.8) {
        const c = ac(); if (!c || !master) return;
        const t = c.currentTime;
        const o = c.createOscillator(); o.type = 'triangle';
        o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.1);
        const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        o.connect(g).connect(master); o.start(t); o.stop(t + 0.18);
        const ns = c.createBufferSource(); ns.buffer = noise(c, 0.09);
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 1.2;
        const ng = c.createGain(); ng.gain.setValueAtTime(vol * 0.6, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        ns.connect(bp).connect(ng).connect(master); ns.start(t); ns.stop(t + 0.11);
        const gr = c.createBufferSource(); gr.buffer = noise(c, 1.0);
        const lp2 = c.createBiquadFilter(); lp2.type = 'lowpass'; lp2.frequency.value = 650;
        const gg = c.createGain(); gg.gain.setValueAtTime(0, t + 0.05); gg.gain.linearRampToValueAtTime(vol * 0.3, t + 0.2); gg.gain.linearRampToValueAtTime(0, t + 1.0);
        gr.connect(lp2).connect(gg).connect(master); gr.start(t + 0.05); gr.stop(t + 1.05);
    }

    /** Looping low stadium murmur while the game is being played. */
    function startCrowd(vol = 0.1) {
        const c = ac(); if (!c || !master || crowd) return;
        const src = c.createBufferSource(); src.buffer = noise(c, 4); src.loop = true;
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 680; lp.Q.value = 0.3;
        const g = c.createGain(); g.gain.value = 0;
        g.gain.linearRampToValueAtTime(vol, c.currentTime + 1.2);
        src.connect(lp).connect(g).connect(master); src.start();
        crowd = { src, gain: g };
    }

    function stopCrowd() {
        if (!ctx || !crowd) return;
        try {
            const t = ctx.currentTime;
            crowd.gain.gain.cancelScheduledValues(t);
            crowd.gain.gain.linearRampToValueAtTime(0, t + 0.4);
            crowd.src.stop(t + 0.5);
        } catch { /* */ }
        crowd = null;
    }

    function dispose() {
        stopCrowd();
        try { void ctx?.close(); } catch { /* */ }
        ctx = null; master = null;
    }

    return { resume, whistle, kick, cheer, save, startCrowd, stopCrowd, dispose };
}
