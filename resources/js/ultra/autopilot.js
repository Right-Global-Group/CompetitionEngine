/**
 * Autopilot — makes a demo-mode game play itself inside a tile by pressing the
 * same controls a visitor would. Each plan is a small state machine that runs on
 * a timer against the game's root element. Return 'done' from a tick to ask the
 * host to remount the game (fresh tickets) after a short pause.
 */
const visible = (el) => !!el && el.offsetParent !== null && !el.disabled;
const click = (root, sel) => { const el = root.querySelector(sel); if (visible(el)) { el.click(); return true; } return false; };
const clickText = (root, re) => { const el = [...root.querySelectorAll('button')].find((b) => re.test(b.textContent || '') && visible(b)); if (el) { el.click(); return true; } return false; };
const pointer = (el, type, x, y) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 }));

const PLANS = {
    slots: { every: 5200, tick: (r) => { click(r, '.controls button'); } },
    spinny: { every: 7500, tick: (r) => { click(r, '.static-highlight-segment') || click(r, 'svg'); } },
    scratchy: { every: 7000, tick: (r, n) => { if (n % 2 === 0) clickText(r, /reveal all/i); else clickText(r, /replay/i); } },
    bingo: { every: 6000, tick: (r, n) => { if (!clickText(r, /reveal/i)) return n > 1 ? 'done' : undefined; } },
    coindrop: { every: 4200, tick: (r) => { if (!click(r, '.drop-button:not([disabled])')) return 'done'; } },
    popgame: { every: 1100, tick: (r) => { if (!click(r, '.pop-item-container:not(.popped)')) return 'done'; } },
    football: {
        every: 1300,
        tick: (r, n, state) => {
            if (click(r, '.fbg-intro-cta')) return;
            if (clickText(r, /step up/i)) { state.aimed = false; return; }
            if (click(r, '.fbg-shoot')) { state.aimed = false; return; }
            const rect = r.querySelector('rect[style*="crosshair"]');
            if (rect && !state.aimed) {
                const b = rect.closest('svg').getBoundingClientRect();
                const x = b.left + b.width * (0.3 + Math.random() * 0.4), y = b.top + b.height * (0.2 + Math.random() * 0.25);
                pointer(rect, 'pointerdown', x, y); pointer(rect, 'pointerup', x, y); state.aimed = true; return;
            }
            if (clickText(r, /next penalty|collect/i)) { state.aimed = false; return; }
            if (clickText(r, /^close$/i)) return 'done';
        },
    },
    fishing: { every: 0 },      // plays itself in demo mode
    ticketeater: { every: 2500, tick: (r) => { click(r, '.te-intro-start') || click(r, '.te-release'); } },
};

export function startAutopilot(rootEl, gameKey, onDone) {
    const plan = PLANS[gameKey];
    if (!plan || !plan.every) return () => {};
    let n = 0, timer = null, stopped = false;
    const state = {};
    const loop = () => {
        if (stopped) return;
        let result;
        try { result = plan.tick(rootEl, n++, state); } catch (e) { /* a game mid-transition; try again next tick */ }
        if (result === 'done') { onDone && onDone(); return; }
        timer = setTimeout(loop, plan.every);
    };
    timer = setTimeout(loop, 1200 + Math.random() * 800);
    return () => { stopped = true; clearTimeout(timer); };
}
