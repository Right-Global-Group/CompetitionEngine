/**
 * Autopilot — makes a demo-mode game play itself inside a tile by pressing the
 * same controls a visitor would. Each plan is a small state machine that runs on
 * a timer against the game's root element. Return 'done' from a tick to ask the
 * host to remount the game (fresh tickets) after a short pause.
 */
const visible = (el) => !!el && el.getClientRects().length > 0 && !el.disabled;
// lobby / intro screens: "Play Coin Drop", "Let's Pop!", "LET'S SCRATCH!", "Kick Off" — never "How to Play"
const lobby = (root) => clickText(root, /^(play\b|let'?s\b|start\b|kick off|cast off|feed)/i);
const fire = (el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
const click = (root, sel) => { const el = root.querySelector(sel); if (visible(el)) { fire(el); return true; } return false; };
const clickText = (root, re) => { const el = [...root.querySelectorAll('button')].find((b) => re.test((b.textContent || '').trim()) && visible(b)); if (el) { fire(el); return true; } return false; };
const pointer = (el, type, x, y) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 }));

const PLANS = {
    slots: { every: 5200, tick: (r) => { if (lobby(r)) return; click(r, '.controls button'); } },
    spinny: { every: 7500, tick: (r) => { if (lobby(r)) return; click(r, '.static-highlight-segment'); } },
    scratchy: { every: 6500, tick: (r, n, st) => { if (lobby(r)) return; if (clickText(r, /reveal all/i)) { st.revealed = true; return; } if (st.revealed && clickText(r, /replay/i)) { st.revealed = false; return; } } },
    bingo: { every: 5000, tick: (r, n, st) => { if (lobby(r)) return; if (clickText(r, /reveal/i)) { st.revealed = true; return; } if (st.revealed) return 'done'; } },
    coindrop: { every: 4200, tick: (r, n) => { if (lobby(r)) return; if (!click(r, '.drop-button:not([disabled])')) return n > 2 ? 'done' : undefined; } },
    popgame: { every: 1100, tick: (r, n) => { if (lobby(r)) return; if (!click(r, '.pop-item-container:not(.popped)')) return n > 2 ? 'done' : undefined; } },
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
