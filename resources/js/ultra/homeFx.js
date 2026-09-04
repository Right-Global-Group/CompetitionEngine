/**
 * CompEngine homepage — interaction layer.
 * Ported from the single-file build; runs once the Home page is mounted and
 * returns a destroy() that removes window/document listeners and timers.
 */
import axios from 'axios';

export function initUltraHome(opts) {
opts = opts || {};
opts.orders = +opts.orders || 1500000;
opts.tickets = +opts.tickets || 120000000;
var alive = true, cleanups = [];
function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); cleanups.push(function () { t.removeEventListener(ev, fn, o); }); }
function compact(n) { n = +n || 0; if (n >= 1e6) return String(Math.round(n / 1e5) / 10).replace(/\.0$/, '') + 'M'; if (n >= 1e3) return Math.round(n / 1e3) + 'k'; return String(n); }
'use strict';

/* ============================================================
   CONFIG — message match, links, data
   ============================================================ */
var HERO_VARIANTS = {
  A: { h1: 'The <span class="grad">Ultimate Competition</span> Platform' },
  B: { h1: 'Launch a competition site that <span class="grad">actually converts.</span>' }
};
var CALENDLY = 'https://calendly.com/contact-compengine/30min';
var UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','landing_variant','package'];
var OPERATORS = [['Top Banana','topbanana'],['WestCoast','westcoast'],['Jolly','jolly'],['Vincere','vincere'],['Podium','podium'],['S2A','s2a'],['Auwins','auwins'],['MixItUp','mixitup'],['MadMac','madmac'],['MPComps','mpower'],['Wrights','wrights'],['MsMoneyPenny','msmoneypenny'],['AutoComps','autocomps'],['Prize Hunter','prizehunter'],['Vortex','vortex'],['Padel Comps','padel'],['Luxsy Wins','luxsy'],['LuckyDucky','luckyducky'],['Karma','karma'],['WinThisNow','winthisnow'],['Deluxe Comps','deluxe'],['CrazyCat','crazycat'],['Lightning','lightning'],['SunnyGiveaways','sunnygiveaways'],['SmashDrop','smashdrop'],['Winner Winner','winnerwinner'],['Ritas','ritas'],['Belter Competition','belter'],['House of Hope','hope'],['Prize Party','prizeparty']];

/* ============================================================
   UTILITIES
   ============================================================ */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var root = $('#ce-home');
var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var isDesktop = function () { return window.matchMedia('(min-width: 1024px)').matches; };
var hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
function once(el, cb, opts) {
  if (!('IntersectionObserver' in window)) { cb(el); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } }); }, opts || { threshold: 0.25 });
  io.observe(el);
}
function fmt(n) { return Math.round(n).toLocaleString('en-GB'); }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

/* ============================================================
   ICONS (inline SVG, stroke = currentColor)
   ============================================================ */
var S = function (d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + (extra || '') + '</svg>'; };
var ICONS = {
  menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  x: S('<path d="M6 6l12 12M18 6L6 18"/>'),
  check: S('<path d="M5 12.5l4.5 4.5L19 7"/>'),
  'check-c': S('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 5-5"/>'),
  shield: S('<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/>'),
  trend: S('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
  cert: S('<circle cx="12" cy="9" r="5.5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/><path d="M10 9l1.5 1.5L14 7.5"/>'),
  lock: S('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'),
  doc: S('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
  award: S('<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'),
  'chev-l': S('<path d="M15 5l-7 7 7 7"/>'),
  'chev-r': S('<path d="M9 5l7 7-7 7"/>'),
  'arrow-r': S('<path d="M4 12h16M13 5l7 7-7 7"/>'),
  'arrow-up': S('<path d="M12 20V4M5 11l7-7 7 7"/>'),
  bell: S('<path d="M6 16V11a6 6 0 0112 0v5l2 2H4z"/><path d="M10 21h4"/>'),
  warn: S('<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18.5v.5"/>'),
  minus: S('<path d="M6 12h12"/>'),
  spark: S('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
  forecast: S('<path d="M3 20h18"/><path d="M5 16l4-5 4 3 6-8"/><path d="M15 6h4v4"/>'),
  target: S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  insight: S('<rect x="3" y="12" width="4" height="8"/><rect x="10" y="7" width="4" height="13"/><rect x="17" y="3" width="4" height="17"/>'),
  pen: S('<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>'),
  car: S('<path d="M4 15l2-6h12l2 6"/><rect x="3" y="15" width="18" height="4" rx="1"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>'),
  monitor: S('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
  plane: S('<path d="M3 13l18-9-5 17-4-6z"/><path d="M12 15l9-11"/>'),
  watch: S('<circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1M9 6l.5-3h5l.5 3M9 18l.5 3h5l.5-3"/>'),
  cash: S('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9h.01M18 15h.01"/>'),
  gift: S('<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z"/>'),
  trophy: S('<path d="M7 4h10v5a5 5 0 01-10 0z"/><path d="M7 6H4a3 3 0 003 3M17 6h3a3 3 0 01-3 3M12 14v4M8 20h8"/>'),
  diamond: S('<path d="M6 4h12l4 5-10 12L2 9z"/><path d="M2 9h20M9 4l3 5 3-5M9 9l3 12 3-12"/>'),
  star: S('<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'),
  fish: S('<path d="M3 12c3-4 7-6 11-6 3 2 5 4 7 6-2 2-4 4-7 6-4 0-8-2-11-6z"/><path d="M14 12h.01M3 12l3-4M3 12l3 4"/>'),
  tent: S('<path d="M3 20L12 4l9 16z"/><path d="M12 4v16M8 20l4-7 4 7"/>'),
  dice: S('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>'),
  copy: S('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 011-1h10"/>'),
  gear: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4l-2.3-1.2.5-2.5-2.2-1.4-1.9 1.7L13 7.5 12 5l-1 2.5-2.1 1.1L7 6.9 4.8 8.3l.5 2.5L3 12l2.3 1.2-.5 2.5 2.2 1.4 1.9-1.7 2.1 1.1L12 19l1-2.5 2.1-1.1 1.9 1.7 2.2-1.4-.5-2.5z" fill-rule="evenodd"/></svg>'
};
$$('.ic[data-i]').forEach(function (el) { el.innerHTML = ICONS[el.getAttribute('data-i')] || ''; });

/* Gear logo fallback (stroked with the brand gradient) */
function gearPath(cx, cy, rOut, rIn, teeth) {
  var pts = [], n = teeth * 2, i, a, r;
  for (i = 0; i < n * 2; i++) {
    a = (Math.PI * 2 * i) / (n * 2);
    r = (Math.floor(i / 2) % 2 === 0) ? rOut : rIn;
    pts.push((cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2));
  }
  return 'M' + pts.join('L') + 'Z';
}
var GEAR_SVG = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="' + gearPath(50, 50, 46, 38, 10) + '" fill="none" stroke="url(#ce-gg)" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="50" r="17" fill="none" stroke="url(#ce-gg)" stroke-width="5"/></svg>';
$$('[data-gear]').forEach(function (el) { el.innerHTML = GEAR_SVG; el.style.display = 'block'; el.style.width = '100%'; el.style.height = '100%'; });

/* Slot symbols (filled) */
var SYM = {
  cherry: '<svg viewBox="0 0 40 40"><path d="M14 22c-2-7 4-13 12-15" fill="none" stroke="#7ad37a" stroke-width="3" stroke-linecap="round"/><circle cx="13" cy="27" r="8" fill="#ff4d6d"/><circle cx="26" cy="29" r="7" fill="#ff6b81"/><circle cx="10.5" cy="24.5" r="2" fill="#fff" opacity=".6"/></svg>',
  lemon: '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="14" ry="10" fill="#ffd93b"/><path d="M6 22h28" stroke="#f4a558" stroke-width="1.5" opacity=".5"/><circle cx="12" cy="18" r="2" fill="#fff" opacity=".6"/></svg>',
  seven: '<svg viewBox="0 0 40 40"><path d="M9 9h22l-12 24h-7l10-18H9z" fill="#ff5a6b" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  star: '<svg viewBox="0 0 40 40"><path d="M20 4l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L20 28.1l-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5z" fill="#f4a558"/></svg>',
  bell: '<svg viewBox="0 0 40 40"><path d="M10 28V19a10 10 0 0120 0v9l3 3H7z" fill="#ffcf5c"/><path d="M16 33h8" stroke="#ffcf5c" stroke-width="4" stroke-linecap="round"/></svg>',
  diamond: '<svg viewBox="0 0 40 40"><path d="M11 8h18l7 9-16 17L4 17z" fill="#8fd3ff"/><path d="M4 17h32M11 8l9 9 9-9M20 17l-5 17M20 17l5 17" stroke="#fff" stroke-width="1.5" opacity=".7" fill="none"/></svg>'
};
var SYMS = ['cherry', 'lemon', 'seven', 'star', 'bell', 'diamond'];

/* ============================================================
   TRACKING — window.ceTrack + data-track + scroll depth
   ============================================================ */
window.ceTrack = function (name, payload) {
  payload = payload || {};
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload);
    if (typeof window.gtag !== 'function' && typeof window.fbq !== 'function') console.debug('[ceTrack]', name, payload);
  } catch (e) { /* never break the page for analytics */ }
};
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-track]');
  if (t) window.ceTrack(t.getAttribute('data-track'), { href: t.getAttribute('href') || undefined });
});
var depthFired = {};
function scrollDepth() {
  var h = document.documentElement.scrollHeight - window.innerHeight;
  if (h <= 0) return;
  var p = (window.scrollY / h) * 100;
  [25, 50, 75, 100].forEach(function (m) { if (p >= m - 0.5 && !depthFired[m]) { depthFired[m] = true; window.ceTrack('scroll_' + m); } });
}

/* ============================================================
   UTM CAPTURE → sessionStorage → hidden fields → Calendly links
   ============================================================ */
var params = new URLSearchParams(window.location.search);
var utm = {};
try { utm = JSON.parse(sessionStorage.getItem('ce_utm') || '{}'); } catch (e) { utm = {}; }
UTM_KEYS.forEach(function (k) { if (params.get(k)) utm[k] = params.get(k); });
var variant = (params.get('v') || 'A').toUpperCase();
if (!HERO_VARIANTS[variant]) variant = 'A';
utm.landing_variant = variant;
try { sessionStorage.setItem('ce_utm', JSON.stringify(utm)); } catch (e) {}
function fillHidden() { UTM_KEYS.forEach(function (k) { var f = $('#lead-form [name="' + k + '"]'); if (f && utm[k]) f.value = utm[k]; }); }
function calendlyUrl() {
  var u = new URL(CALENDLY);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (utm[k]) u.searchParams.set(k, utm[k]); });
  if (utm.gclid) u.searchParams.set('gclid', utm.gclid);
  if (utm.fbclid) u.searchParams.set('fbclid', utm.fbclid);
  if (utm.landing_variant) u.searchParams.set('utm_content', utm.utm_content ? utm.utm_content + '_' + utm.landing_variant : 'v' + utm.landing_variant);
  if (utm.package) u.searchParams.set('a1', utm.package);
  return u.toString();
}
function refreshCalendly() { var url = calendlyUrl(); $$('[data-calendly]').forEach(function (a) { a.href = url; }); }
fillHidden(); refreshCalendly();

/* ============================================================
   HERO — variants, ?cta=, word stagger
   ============================================================ */
(function hero() {
  var h1 = $('#hero-h1');
  h1.innerHTML = HERO_VARIANTS[variant].h1; h1.setAttribute('data-variant', variant);
  if (params.get('cta')) $('#hero-cta').textContent = params.get('cta').slice(0, 40);
  // split into words, keep gradient span
  var frag = document.createDocumentFragment();
  Array.prototype.slice.call(h1.childNodes).forEach(function (node) {
    var grad = node.nodeType === 1 && node.classList.contains('grad');
    var text = node.textContent;
    text.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
      var w = document.createElement('span'); w.className = 'w' + (grad ? ' grad' : ''); w.textContent = part; frag.appendChild(w);
    });
  });
  h1.innerHTML = ''; h1.appendChild(frag);
  if (!RM) {
    var words = $$('.w', h1);
    words.forEach(function (w, i) { w.style.opacity = '0'; w.style.transform = 'translateY(14px)'; w.style.transition = 'opacity .5s ease ' + (i * 70) + 'ms, transform .5s cubic-bezier(.2,.8,.2,1) ' + (i * 70) + 'ms'; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { words.forEach(function (w) { w.style.opacity = '1'; w.style.transform = 'none'; }); }); });
  }
})();

/* ============================================================
   SLOT MACHINE — makeSlot(el) returns a controller (reused ×4)
   ============================================================ */
function makeSlot(el, opts) {
  opts = opts || {};
  var strip = '';
  for (var r = 0; r < 8; r++) SYMS.forEach(function (s) { strip += '<div class="sym">' + SYM[s] + '</div>'; });
  el.innerHTML =
    '<div class="slot-head"><span class="slot-logo">' + ICONS.gear + '</span><div style="min-width:0"><div class="slot-title">LUCKY SLOTS</div><div class="slot-sub">Match 3 in a row to win!</div></div></div>' +
    '<div class="reels">' + [0, 1, 2].map(function () { return '<div class="reel"><div class="strip">' + strip + '</div></div>'; }).join('') + '</div>' +
    '<div class="slot-foot"><button type="button" class="slot-btn">Spin</button><span class="slot-inv">' + ICONS.gift + '</span></div>' +
    '<div class="slot-msg"></div>';
  var reels = $$('.reel .strip', el), btn = $('.slot-btn', el), msg = $('.slot-msg', el), title = $('.slot-title', el), sub = $('.slot-sub', el), inv = $('.slot-inv', el), logo = $('.slot-logo', el);
  var pos = [0, 1, 2], busy = false, spins = 0;
  reels.forEach(function (s, i) { s.style.transform = 'translateY(' + (-pos[i] * 100 / 48) + '%)'; });
  function setPos(i, p, animate, dur) {
    var st = reels[i];
    st.style.transition = animate ? 'transform ' + dur + 'ms cubic-bezier(.15,.85,.25,1)' : 'none';
    st.style.transform = 'translateY(' + (-p * 100 / 48) + '%)';
  }
  function spin() {
    if (busy) return; busy = true; spins++;
    btn.disabled = true; msg.classList.remove('on');
    var win = spins % 3 === 0 || Math.random() < 0.3;
    var target = win ? [1, 1, 1].map(function () { return Math.floor(Math.random() * 6); }) : [0, 1, 2].map(function () { return Math.floor(Math.random() * 6); });
    if (win) { var t = Math.floor(Math.random() * 6); target = [t, t, t]; }
    else if (target[0] === target[1] && target[1] === target[2]) target[2] = (target[2] + 1) % 6;
    reels.forEach(function (st, i) {
      var cur = pos[i] % 6;
      setPos(i, cur, false, 0);
      // force reflow
      void st.offsetHeight;
      var dist = ((target[i] - cur) % 6 + 6) % 6 + 6 * (3 + i);
      var np = cur + dist;
      pos[i] = np;
      if (RM) { setPos(i, np, false, 0); } else { setPos(i, np, true, 1100 + i * 350); }
    });
    var total = RM ? 50 : 1100 + 2 * 350 + 100;
    setTimeout(function () {
      msg.textContent = win ? 'You win!' : 'So close';
      msg.style.color = win ? 'var(--slot-primary)' : 'var(--slot-title)';
      msg.classList.add('on');
      setTimeout(function () { msg.classList.remove('on'); }, 1400);
      busy = false; btn.disabled = false;
      if (opts.onSpin) opts.onSpin(win);
    }, total);
  }
  btn.addEventListener('click', function () { spin(); window.ceTrack((opts.track || 'slot') + '_spin'); });
  return {
    el: el, spin: spin,
    setTheme: function (t) { el.style.setProperty('--slot-primary', t.primary); el.style.setProperty('--slot-accent', t.accent); el.style.setProperty('--slot-machine', t.machine); el.style.setProperty('--slot-title', t.title); },
    setTitle: function (s) { title.textContent = s; },
    setSub: function (s) { sub.textContent = s; },
    setBtn: function (s) { btn.textContent = s; },
    setIcon: function (n) { inv.innerHTML = ICONS[n] || ICONS.gift; },
    logo: function (on) { logo.classList.toggle('on', !!on); }
  };
}
$$('[data-slot]').forEach(function (el) { makeSlot(el, { track: el.getAttribute('data-slot') + '_slot' }); });

/* ============================================================
   MINI DEMO SITE in the hero phone — carousel + slow auto-scroll
   ============================================================ */
(function demoSite() {
  var site = $('#site'), car = $('#site-carousel'), view = $('#site-view'), scroll = $('#site-scroll'); if (!site) return;
  // 3D hero carousel
  if (car) {
    var slides = $$('.hslide', car), dots = $$('.dots i', car), n = slides.length, k = 0;
    var place = function () { slides.forEach(function (s, i) { s.className = 'hslide ' + (i === k ? 'is-active' : i === (k + 1) % n ? 'is-next' : 'is-prev'); }); dots.forEach(function (d, i) { d.classList.toggle('on', i === k); }); };
    var iv = setInterval(function () { if (document.hidden) return; k = (k + 1) % n; place(); }, 3400);
    cleanups.push(function () { clearInterval(iv); });
  }
  // colour changer: swatches + custom pickers recolour the storefront
  var setColours = function (p, a) { if (p) site.style.setProperty('--sp', p); if (a) site.style.setProperty('--sa', a); };
  $$('.sc-swatch').forEach(function (b) {
    on(b, 'click', function () {
      $$('.sc-swatch').forEach(function (x) { x.classList.toggle('on', x === b); });
      setColours(b.dataset.p, b.dataset.a);
      var pi = $('#sc-primary'), ai = $('#sc-accent'); if (pi) pi.value = b.dataset.p; if (ai) ai.value = b.dataset.a;
    });
  });
  ['#sc-primary', '#sc-accent'].forEach(function (sel, i) {
    var inp = $(sel); if (!inp) return;
    on(inp, 'input', function () { $$('.sc-swatch').forEach(function (x) { x.classList.remove('on'); }); setColours(i === 0 ? inp.value : null, i === 1 ? inp.value : null); });
    on(inp, 'change', function () { window.ceTrack('hero_colour_custom', { which: i === 0 ? 'primary' : 'accent' }); });
  });
  // slow auto-scroll (transform-based: Safari rounds scrollTop, so scrolling half a pixel never moves)
  if (RM || !view || !scroll) return;
  var pos = 0, dir = 1, pause = 70, raf, on_ = true;
  function step() {
    if (!alive) return;
    if (on_ && !document.hidden) {
      var max = scroll.offsetHeight - view.clientHeight;
      if (max > 0) {
        if (pause > 0) pause--;
        else {
          pos += dir * 0.5;
          if (dir > 0 && pos >= max) { pos = max; dir = -1; pause = 100; }
          else if (dir < 0 && pos <= 0) { pos = 0; dir = 1; pause = 170; }
        }
        scroll.style.transform = 'translateY(' + (-pos).toFixed(1) + 'px)';
      }
    }
    raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
  cleanups.push(function () { cancelAnimationFrame(raf); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { on_ = e.isIntersecting; }); }).observe(site);
})();

/* Phone tilt (desktop pointer only) */
(function tilt() {
  var vis = $('#hero-visual'), phone = $('#phone');
  if (!hasHover || RM) return;
  vis.addEventListener('mousemove', function (e) {
    var r = vis.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width - 0.5; var y = (e.clientY - r.top) / r.height - 0.5;
    phone.style.transform = 'perspective(1100px) rotateY(' + (-18 + x * 22) + 'deg) rotateX(' + (7 - y * 16) + 'deg) rotateZ(-2deg)';
  });
  vis.addEventListener('mouseleave', function () { phone.style.transform = ''; });
})();

/* ============================================================
   SCROLL — progress bar, nav state, sticky bar, big gear, depth
   ============================================================ */
(function scrollFx() {
  var prog = $('#progress'), gear = $('#big-gear'), sticky = $('#sticky'), hero = $('#hero'), ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    var past = y > hero.offsetTop + hero.offsetHeight - 80;
    root.classList.toggle('scrolled', past);
    sticky.classList.toggle('on', past);
    sticky.setAttribute('aria-hidden', past ? 'false' : 'true');
    var fl = $('#float-pkg');
    if (fl) {
      var pr = $('#pricing'), prIn = false;
      if (pr) { var pb = pr.getBoundingClientRect(); prIn = pb.top < window.innerHeight * 0.85 && pb.bottom > 0; }
      var showFl = past && !prIn;
      fl.classList.toggle('on', showFl);
      fl.setAttribute('aria-hidden', showFl ? 'false' : 'true');
    }
    scrollDepth();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

/* ============================================================
   BIG GEAR — runs like an engine: steady spin, scroll adds torque, then settles
   ============================================================ */
(function engine() {
  var gear = $('#big-gear'), hero = $('#hero'); if (!gear || RM) return;
  var angle = 0, vel = 0.9, lastY = window.scrollY, last = performance.now(), on = true, raf;
  function frame(now) {
    var dt = Math.min(64, now - last); last = now;
    var dy = window.scrollY - lastY; lastY = window.scrollY;
    vel += Math.abs(dy) * 0.015;                 // scrolling feeds the engine
    vel += (0.9 - vel) * 0.03;                   // …and it settles back to idle revs
    angle = (angle + vel * dt * 0.06) % 360;
    gear.style.transform = 'rotate(' + angle.toFixed(2) + 'deg)';
    if (on && alive) raf = requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { on = e.isIntersecting; if (on) { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); } }); }).observe(hero);
  else raf = requestAnimationFrame(frame);
})();

/* ============================================================
   COUNTERS
   ============================================================ */
function countUp(el, target, format, dur) {
  var start = performance.now(); dur = dur || 1600;
  var render = function (v) {
    var s = format === 'plus' ? fmt(v) + '+' : format === 'money' ? '£' + fmt(v) : fmt(v);
    if (el.dataset.prefix) s = el.dataset.prefix + s; if (el.dataset.suffix) s = s + el.dataset.suffix;
    el.textContent = s;
  };
  if (RM) { render(target); return; }
  (function step(now) { var p = Math.min(1, (now - start) / dur); var e = 1 - Math.pow(1 - p, 3); render(target * e); if (p < 1) requestAnimationFrame(step); })(start);
}
$$('#counters [data-target]').forEach(function (el) { once(el, function () { countUp(el, +el.dataset.target, el.dataset.format); }); });

/* ============================================================
   LOGO WALL — marquee
   ============================================================ */
(function marquee() {
  var mk = function (o) {
    var name = o[0], slug = o[1];
    var initials = name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
    return '<span class="op"><img src="/images/tenant-icons/' + slug + '.png" alt="" loading="lazy" onerror="this.remove()"><i>' + initials + '</i>' + esc(name) + '</span>';
  };
  var a = OPERATORS.slice(0, 15).map(mk).join(''), b = OPERATORS.slice(15).map(mk).join('');
  $('#marquee-a').innerHTML = a + a; $('#marquee-b').innerHTML = b + b;
})();

/* ============================================================
   ECOSYSTEM — bento reveal + scratch card
   ============================================================ */
(function bento() {
  var grid = $('#bento'), cards = $$('.card', grid);
  if (!RM) grid.classList.add('armed');
  var i = 0;
  cards.forEach(function (c) { once(c, function (el) { var d = (i++ % 4) * 90; setTimeout(function () { el.classList.add('in'); }, RM ? 0 : d); }, { threshold: 0.2 }); });

  // scratch card
  var gridEl = $('#scratch-grid'), TILES = [['cash', 'Cash prize'], ['gift', 'Site credit'], ['x', 'No luck'], ['star', 'Free entry'], ['cash', 'Cash prize'], ['dice', 'Spin again']];
  function build() {
    gridEl.innerHTML = TILES.map(function (t) { return '<div class="tile' + (t[0] === 'cash' ? ' win' : '') + '"><span><span class="ic" style="width:22px;height:22px;display:block;margin:0 auto 2px">' + ICONS[t[0]] + '</span>' + t[1] + '</span><canvas></canvas></div>'; }).join('');
    $$('.tile', gridEl).forEach(initTile);
  }
  function initTile(tile) {
    var cv = $('canvas', tile), ctx = cv.getContext('2d'), down = false, cleared = false;
    function size() {
      var r = tile.getBoundingClientRect(); if (!r.width) return;
      cv.width = Math.round(r.width); cv.height = Math.round(r.height);
      var g = ctx.createLinearGradient(0, 0, cv.width, cv.height); g.addColorStop(0, '#8a5fb8'); g.addColorStop(1, '#4839a0');
      ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.font = '700 11px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('SCRATCH', cv.width / 2, cv.height / 2 + 4);
    }
    size();
    if (!cv.width) once(tile, size, { threshold: 0.01 });
    function pt(e) { var r = cv.getBoundingClientRect(); var p = e.touches ? e.touches[0] : e; return [(p.clientX - r.left) * (cv.width / r.width), (p.clientY - r.top) * (cv.height / r.height)]; }
    function scratch(e) {
      if (!down || cleared) return; e.preventDefault();
      var p = pt(e); ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(p[0], p[1], 14, 0, Math.PI * 2); ctx.fill();
    }
    function check() {
      if (cleared || !cv.width) return;
      var d = ctx.getImageData(0, 0, cv.width, cv.height).data, n = 0, t = 0;
      for (var i = 3; i < d.length; i += 32) { t++; if (d[i] === 0) n++; }
      if (n / t > 0.5) { cleared = true; cv.style.transition = 'opacity .4s'; cv.style.opacity = '0'; setTimeout(function () { cv.remove(); }, 400); window.ceTrack('ecosystem_scratch_reveal'); }
    }
    var start = function (e) { down = true; scratch(e); }, endp = function () { if (down) { down = false; check(); } };
    cv.addEventListener('mousedown', start); cv.addEventListener('mousemove', scratch); window.addEventListener('mouseup', endp);
    cv.addEventListener('touchstart', start, { passive: false }); cv.addEventListener('touchmove', scratch, { passive: false }); cv.addEventListener('touchend', endp);
    tile.revealAll = function () { cleared = true; cv.remove(); };
  }
  $('#scratch-reveal').addEventListener('click', function () { $$('.tile', gridEl).forEach(function (t) { t.revealAll && t.revealAll(); }); window.ceTrack('ecosystem_scratch_reveal_all'); });
  $('#scratch-reset').addEventListener('click', function () { build(); window.ceTrack('ecosystem_scratch_reset'); });
  build();
})();

/* ============================================================
   CONVERT — reveal, counts, checks, chart
   ============================================================ */
(function convert() {
  $('#fb-checks').innerHTML = Array.apply(null, Array(14)).map(function (_, i) { return '<i style="--n:' + i + '"><span class="ic">' + ICONS.check + '</span></i>'; }).join('');
  $$('[data-reveal]').forEach(function (c) {
    once(c, function (el) {
      el.classList.add('in');
      $$('[data-count]', el).forEach(function (n) { countUp(n, +n.dataset.count, 'num', 1400); });
    }, { threshold: 0.35 });
  });
  once($('#rev-chart'), function (el) { el.classList.add('in'); }, { threshold: 0.4 });
})();

/* ============================================================
   CERTIFIED DRAWS — cards, hash records, verifier
   ============================================================ */
(function draws() {
  var W = function (name, ticket, prize, ts, block) { return { name: name, ticket: ticket, prize: prize, timestamp: ts, block: block }; };
  var DRAWS = [
    { slug: 'bmw', prize: 'BMW M3 Competition Pack', value: '£75k', type: 'STAR DRAWS', date: '18 May 2026', icon: 'car', ph: 'linear-gradient(135deg,#1e3a8a,#4839a0)', hashes: [
      { full: 'a3f9b2c47e1d8f053a9c6b8d2e4f1a5c7d9b3e6f8c2a4d6e1f3b5a7c9d8e2f4c', winner: W('Sarah K.', '#04827', 'BMW M3 Competition Pack', '18 May 2026 · 21:02:14 UTC', '#4,201') },
      { full: 'b1e2c8d4a5f3e7b9c1d6f2e8a4b7c9d5e3f1a8b6c4d2e9f7a3b5c8d1e6f4a2cd', winner: W('James P.', '#00193', '£500 cash (instant win)', '18 May 2026 · 21:03:02 UTC', '#4,202') },
      { full: 'c8d4e2f6a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8e1', winner: W('Amira H.', '#11240', '£250 site credit', '18 May 2026 · 21:04:48 UTC', '#4,203') } ] },
    { slug: 'imac', prize: 'Apple iMac Pro 32"', value: '£4,999', type: 'BLAZE', date: '14 May 2026', icon: 'monitor', ph: 'linear-gradient(135deg,#3b3b5c,#4839a0)', hashes: [
      { full: 'f4a8c2e6b9d3f5a7c1b4e6d8f2a5c7b3e9d1f4a8c6b2e5d7f1a4c8b6e3d5f9a2', winner: W('Tom R.', '#08312', 'Apple iMac Pro 32"', '14 May 2026 · 19:30:11 UTC', '#3,847') },
      { full: 'b7d3f5a1c4e8b2d6f3a5c7b1e9d4f6a2c8b5e7d1f3a9c4b6e2d8f5a1c7b3e9d4', winner: W('Lia M.', '#02541', '£200 cash', '14 May 2026 · 19:31:02 UTC', '#3,848') },
      { full: 'c2e5b8d4f1a7c3e6b9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4', winner: W('Daniel B.', '#19874', '12-month £200 site credit', '14 May 2026 · 19:31:48 UTC', '#3,849') } ] },
    { slug: 'maldives', prize: 'Maldives Trip for Two', value: '£12k', type: 'KINGS', date: '10 May 2026', icon: 'plane', ph: 'linear-gradient(135deg,#0e7490,#4839a0)', hashes: [
      { full: '3d7f9a2c5e8b1d4f6a3c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4f6a3c9e2b5d8f', winner: W('Sofia G.', '#07631', 'Maldives Trip for 2', '10 May 2026 · 20:00:42 UTC', '#3,612') },
      { full: '7b2e5d8a3c6f9b1d4e7a2c5f8b3d6e9a4c7f1b4e7d2a5c8f3b6e9d2a5c8f3b6e', winner: W('Marcus T.', '#03210', '£1,000 cash', '10 May 2026 · 20:01:33 UTC', '#3,613') },
      { full: '4a8c1e5b2d7f3a6c9e4b1d8f5a2c7e0b3d6f9a4c7e2b5d8f1a4c7e0b3d6f9a4c', winner: W('Aisha N.', '#15893', '£250 site credit', '10 May 2026 · 20:02:21 UTC', '#3,614') } ] },
    { slug: 'tesla', prize: 'Tesla Model Y', value: '£52k', type: 'APEX', date: '06 May 2026', icon: 'car', ph: 'linear-gradient(135deg,#7f1d1d,#4839a0)', hashes: [
      { full: '9e3b7a1d5f8c2b6e4a9d7f1c3b8e2a5d6f9c4b1e7a3d8f5c2b6e9a4d1f7c3b8e', winner: W('Ben C.', '#23015', 'Tesla Model Y Long Range', '06 May 2026 · 21:15:08 UTC', '#3,401') },
      { full: '5c8a2f4d7b1e9c3a6f2d5b8e1c4a7f9d3b6e2c5a8f4d1b7e3c6a9f2d5b8e1c4a', winner: W('Holly W.', '#11402', '£750 cash', '06 May 2026 · 21:16:00 UTC', '#3,402') } ] },
    { slug: 'rolex', prize: 'Rolex Submariner Date', value: '£10,950', type: 'LUXE', date: '02 May 2026', icon: 'watch', ph: 'linear-gradient(135deg,#065f46,#4839a0)', hashes: [
      { full: 'e2a5b9c8d1f3a7b4e6c2d9f5a8b1c4e7d3f6a2b5c8e1d4f7a3b6c9e2d5f8a1b4', winner: W('Connor F.', '#06294', 'Rolex Submariner Date', '02 May 2026 · 20:30:11 UTC', '#3,188') },
      { full: '8f1d4a7b2e5c8d3f6a9b4e1c7d2f5a8b3e6c9d4f1a7b2e5c8d3f6a9b4e1c7d2f', winner: W('Zara K.', '#18027', '£500 site credit', '02 May 2026 · 20:31:04 UTC', '#3,189') } ] },
    { slug: 'cash', prize: '£25,000 Tax-Free Cash', value: '£25k', type: 'BIG WINS', date: '28 Apr 2026', icon: 'cash', ph: 'linear-gradient(135deg,#92400e,#4839a0)', hashes: [
      { full: 'd6f3a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5', winner: W('Owen H.', '#09146', '£25,000 tax-free', '28 Apr 2026 · 21:00:18 UTC', '#3,002') },
      { full: 'a8b3e6c9d2f5a8b1c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2', winner: W('Maddie L.', '#21477', '£200 cash', '28 Apr 2026 · 21:01:05 UTC', '#3,003') },
      { full: 'c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9', winner: W('Charlie R.', '#14820', '£100 site credit', '28 Apr 2026 · 21:01:52 UTC', '#3,004') } ] }
  ];
  var LABELS = ['Main', 'Instant', 'Instant'];
  var host = $('#draws'); if (!host) return;
  host.innerHTML = DRAWS.map(function (d, i) {
    return '<div class="card draw" data-i="' + i + '">' +
      '<div class="photo" style="--ph:' + d.ph + '"><img src="/images/draws/' + d.slug + '.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="ic">' + ICONS[d.icon] + '</span><span class="tag type">' + d.type + '</span><div class="prize">' + esc(d.prize) + '<small>' + d.value + '</small></div></div>' +
      '<div class="body"><div class="meta"><span>Drawn ' + d.date + '</span><span>GLI RNG · SHA-256</span></div>' +
      '<div class="hashes">' + d.hashes.map(function (h, k) { return '<div class="hrow" data-h="' + h.full + '" role="button" tabindex="0" title="Click to fill the verifier"><span class="lbl">' + LABELS[k] + '</span><code>' + h.full.slice(0, 8) + '…' + h.full.slice(-5) + '</code><button type="button" class="copy" data-copy="' + h.full + '">Copy</button></div>'; }).join('') + '</div>' +
      '<form class="verify"><input type="text" placeholder="Paste a hash to verify" aria-label="Paste a hash to verify" autocomplete="off" spellcheck="false"><button type="submit" class="btn btn-ghost btn-sm" data-track="draws_verify">Verify</button></form><span class="vmsg" aria-live="polite"></span>' +
      '<div class="reveal"><span class="ic">' + ICONS['check-c'] + '</span><b class="rv-name"></b><span class="rv-ticket"></span><span class="rv-time"></span><span class="tnum" data-full></span><button type="button" class="btn btn-ghost btn-sm close">Close</button></div>' +
      '</div></div>';
  }).join('');
  on(host, 'click', function (e) {
    var copy = e.target.closest('.copy');
    if (copy) {
      e.stopPropagation();
      var h = copy.dataset.copy;
      var done = function () { copy.textContent = 'Copied'; copy.classList.add('done'); setTimeout(function () { copy.textContent = 'Copy'; copy.classList.remove('done'); }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(h).then(done, done); else done();
      window.ceTrack('draws_copy_hash'); return;
    }
    var row = e.target.closest('.hrow');
    if (row) { var card = row.closest('.draw'); var inp = $('.verify input', card); inp.value = row.dataset.h; inp.focus(); return; }
    var close = e.target.closest('.reveal .close');
    if (close) { var c = close.closest('.draw'); c.classList.remove('ok'); $('.verify input', c).value = ''; }
  });
  on(host, 'keydown', function (e) { var row = e.target.closest('.hrow'); if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); row.click(); } });
  on(host, 'submit', function (e) {
    e.preventDefault();
    var card = e.target.closest('.draw'), d = DRAWS[+card.dataset.i], inp = $('input', e.target), v = inp.value.trim().toLowerCase(), msg = $('.vmsg', card);
    card.classList.remove('bad'); void card.offsetWidth;
    var hit = d.hashes.filter(function (h) { return h.full === v; })[0];
    if (hit) {
      var w = hit.winner;
      $('.rv-name', card).textContent = 'Winner: ' + w.name;
      $('.rv-ticket', card).textContent = 'Ticket ' + w.ticket + ' · ' + w.prize;
      $('.rv-time', card).textContent = 'Drawn ' + w.timestamp + ' · block ' + w.block;
      $('[data-full]', card).textContent = v; msg.textContent = ''; card.classList.add('ok'); window.ceTrack('draws_verify_ok');
    } else { card.classList.add('bad'); msg.textContent = v ? 'No draw matches that hash. Copy one from this card and try again.' : 'Paste a hash first.'; window.ceTrack('draws_verify_fail'); }
  });
})();

/* ============================================================
   COMPARISON — what moves the needle, with a verdict
   ============================================================ */
(function comparison() {
  // status: 1 = clear advantage, 2 = fine / partial, 0 = gap
  var ROWS = [
    { l: 'Per-order fee', why: 'The number that compounds every month', ce: ['5–10p', 1], saas: ['17p', 0], wp: ['Plugin licences + hosting + a developer on call', 0] },
    { l: 'Your own games', why: 'Nine games you theme, brand and preview live', ce: ['Game Studio — build your own', 1], saas: ['7+ fixed presets, same as every other site', 0], wp: ['Whatever the theme ships with', 0] },
    { l: 'Years operating in this category', why: 'Draw nights are where platforms break', ce: ['5+ years', 1], saas: ['4+ years', 2], wp: ['Depends on the agency', 0] },
    { l: 'Independent penetration test', why: "Your customers' card data rides on this", ce: ['Yes — published', 1], saas: ['Not published', 0], wp: ['Your responsibility', 0] },
    { l: 'Separate cash and site-credit wallets', why: 'Clean accounting and compliance by design', ce: ['Built in', 1], saas: ['Not advertised', 0], wp: ['Plugin-dependent', 0] },
    { l: 'RNG / draw certification', why: 'Provably fair draws your customers can verify', ce: ['GLI certified + SHA-256 hash chain', 1], saas: ['GLI verified', 2], wp: ['None', 0] },
    { l: 'UK Voluntary Code alignment', why: 'Free entry, age checks and wallet rules, automatically', ce: ['Built in from launch', 1], saas: ['Added recently', 2], wp: ['Manual', 0] },
    { l: 'Every feature included', why: 'No "Pro tier" appearing once you are locked in', ce: ['Always — 24 features shipped this year', 1], saas: ['Depends on plan', 2], wp: ['Every plugin is another licence', 0] },
    { l: 'Public order / ticket numbers (30d)', why: 'Proof it runs at scale', ce: ['LIVE', 1], saas: ['Not published', 0], wp: ['n/a', 0] }
  ];
  var body = $('#cmp-body'), head = $('#cmp-other-head'), wrap = $('#cmp'), note = $('#cmp-assume');
  if (!body) return;
  var live = function () { return fmt(opts.orders) + ' orders · ' + fmt(opts.tickets) + ' tickets'; };
  var mark = function (st) { return st === 1 ? '<span class="ic ok">' + ICONS.check + '</span>' : st === 2 ? '<span class="ic mid">' + ICONS.minus + '</span>' : '<span class="ic no">' + ICONS.x + '</span>'; };
  function render(mode) {
    body.innerHTML = ROWS.map(function (r) {
      var ce = r.ce[0] === 'LIVE' ? live() : r.ce[0];
      var other = mode === 'saas' ? r.saas : r.wp;
      return '<tr><td><b>' + r.l + '</b><small>' + r.why + '</small></td><td class="ce">' + mark(r.ce[1]) + ce + '</td><td class="other st' + other[1] + '">' + mark(other[1]) + other[0] + '</td></tr>';
    }).join('');
    head.textContent = mode === 'saas' ? 'Other SaaS' : 'WordPress + plugins';
    note.textContent = mode === 'saas' ? 'CompEngine figures are rolling 30-day numbers; Other SaaS values are taken from public pricing and marketing pages.' : 'WordPress + plugins varies by theme, plugin stack and developer, so no figures are stated.';
  }
  $$('.seg button').forEach(function (b) {
    on(b, 'click', function () {
      $$('.seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      wrap.classList.add('swap');
      setTimeout(function () { render(b.dataset.cmp); wrap.classList.remove('swap'); }, RM ? 0 : 220);
    });
  });
  render('saas');
})();

/* ============================================================
   FAQ — accordion, one open, first open by default
   ============================================================ */
(function faq() {
  var Q = [
    ['How do I start a competition website?', 'Book a 30-minute demo and tell us your prize and game type. We handle domain setup, payment gateway connection, and game configuration from there — most operators are live within 1–2 weeks.'],
    ['What types of competitions do you offer?', 'Raffles, instant-win games (Slots, Scratch Cards, Spin-the-Wheel, Bingo, Coin Drop, Ticket Eater, Fishing, Football, Balloon Pop), and compliant free-entry competitions — all configurable in Game Studio.'],
    ['How do I stay compliant?', 'CompEngine is built around UK VCOC compliance — free-entry routes, age verification, and separate Cash/Site Credit wallets are enforced at the platform level, and compliance updates ship automatically to every operator.'],
    ['How quickly can I launch?', 'Most operators are live within 1–2 weeks of their onboarding call. We\'ve done it in 4 days for operators with an urgent deadline.'],
    ['Can I export my data?', 'Yes — your analytics dashboard shows orders, revenue, ticket counts, and customer lifetime value in real time, and you can export everything. You own your data; we never aggregate or sell it.'],
    ['Do you integrate a payment gateway that accepts Apple & Google Pay?', 'Yes — our UK-licensed payment gateway integration supports Apple Pay and Google Pay alongside standard card payments, so customers can check out in one tap.'],
    ['Is the website secure?', 'Yes — built on enterprise-grade infrastructure with a UK-licensed payment gateway, continuous security monitoring, and independent penetration testing on a defined cycle.'],
    ['Are there any limits on tickets or instant wins?', 'No — CompEngine has no hard limits on ticket volume or instant-win prize counts, so your competitions can scale with demand.'],
    ['Can you build a mobile app?', 'Yes — native iOS and Android apps are available, complete with push notifications to keep your audience engaged.']
  ];
  var list = $('#faq-list');
  list.innerHTML = Q.map(function (q, i) { return '<div class="faq-item' + (i === 0 ? ' open' : '') + '"><h3><button type="button" class="faq-q" aria-expanded="' + (i === 0) + '" aria-controls="faq-a-' + i + '" id="faq-q-' + i + '">' + esc(q[0]) + '<span class="ic">' + ICONS.x.replace('M6 6l12 12M18 6L6 18', 'M12 5v14M5 12h14') + '</span></button></h3><div class="faq-a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"><div><p>' + esc(q[1]) + '</p></div></div></div>'; }).join('');
  list.addEventListener('click', function (e) {
    var b = e.target.closest('.faq-q'); if (!b) return;
    var item = b.closest('.faq-item'), open = item.classList.contains('open');
    $$('.faq-item', list).forEach(function (it) { it.classList.remove('open'); $('.faq-q', it).setAttribute('aria-expanded', 'false'); });
    if (!open) { item.classList.add('open'); b.setAttribute('aria-expanded', 'true'); window.ceTrack('faq_open', { q: b.textContent.trim() }); }
  });
})();

/* ============================================================
   LEAD FORM — validation, POST /api/leads, Calendly fallback
   ============================================================ */
(function lead() {
  var form = $('#lead-form'), busy = false;
  function setErr(input, msg) { var f = input.closest('.field'); f.classList.toggle('err', !!msg); $('.msg', f).textContent = msg || ''; }
  function validate() {
    var ok = true;
    var rules = [
      ['#f-name', function (v) { return v.length >= 2; }, 'Add your name.'],
      ['#f-biz', function (v) { return v.length >= 2; }, 'Add your business or site name.'],
      ['#f-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, 'Enter a valid email so we can send the invite.'],
      ['#f-phone', function (v) { var d = v.replace(/[\s\-().]/g, ''); return /^(\+44\d{9,10}|0\d{9,10})$/.test(d); }, 'Enter a UK number, e.g. 07xxx xxxxxx or +44.'],
      ['#f-platform', function (v) { return !!v; }, 'Pick the closest option.'],
      ['#f-orders', function (v) { return !!v; }, 'Pick a rough volume.']
    ];
    rules.forEach(function (r) { var el = $(r[0]); var v = el.value.trim(); var pass = r[1](v); setErr(el, pass ? '' : r[2]); if (!pass && ok) { ok = false; el.focus(); } });
    return ok;
  }
  $$('input, select', form).forEach(function (el) { el.addEventListener('input', function () { if (el.closest('.field').classList.contains('err')) validate(); }); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy || !validate()) return;
    busy = true;
    var btn = $('button[type="submit"]', form); btn.disabled = true; btn.textContent = 'Sending…';
    var data = {}; $$('input, select', form).forEach(function (el) { if (el.name) data[el.name] = el.value; });
    data.page = location.href; data.submitted_at = new Date().toISOString();
    var finish = function (ok) {
      busy = false; btn.disabled = false; btn.textContent = 'Book my 30-min demo →';
      form.classList.add('done'); refreshCalendly();
      window.ceTrack(ok ? 'booking_lead_saved' : 'booking_lead_fallback', { orders: data.monthly_orders });
      if (!ok) { var w = window.open(calendlyUrl(), '_blank', 'noopener'); if (!w) $('.thanks .btn', form).focus(); }
      else $('.thanks .btn', form).focus();
    };
    axios.post('/api/leads', data)
      .then(function () { finish(true); })
      .catch(function () { finish(false); });
  });
})();

on(document, 'ce:package', function (e) {
  var s = (e && e.detail) || '';
  var f = $('#f-package'); if (f) f.value = s;
  if (s) utm.package = s; else delete utm.package;
  try { sessionStorage.setItem('ce_utm', JSON.stringify(utm)); } catch (err) {}
  refreshCalendly();
});

/* ============================================================
   EXIT INTENT (desktop, >40% scroll, once per session)
   ============================================================ */
(function exitIntent() {
  var box = $('#exit'); if (!hasHover) return;
  var shown = false; try { shown = sessionStorage.getItem('ce_exit') === '1'; } catch (e) {}
  if (shown) return;
  function show() {
    if (shown || !isDesktop() || $('#pb-modal').classList.contains('open')) return;
    var h = document.documentElement.scrollHeight - window.innerHeight; if (h <= 0 || window.scrollY / h < 0.4) return;
    shown = true; try { sessionStorage.setItem('ce_exit', '1'); } catch (e) {}
    box.classList.add('on'); box.setAttribute('aria-hidden', 'false'); window.ceTrack('exit_intent_shown');
  }
  document.addEventListener('mouseleave', function (e) { if (e.clientY <= 0) show(); });
  $('#exit-x').addEventListener('click', function () { box.classList.remove('on'); box.setAttribute('aria-hidden', 'true'); });
})();

/* ============================================================
   MOBILE MENU + misc
   ============================================================ */
(function nav() {
  var b = $('#burger'), m = $('#mobile-menu');
  b.addEventListener('click', function () { var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  m.addEventListener('click', function (e) { if (e.target.tagName === 'A') { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
})();


/* ============================================================
   "MORE" toggles on bento cards
   ============================================================ */
$$('.more-btn').forEach(function (b) {
  b.addEventListener('click', function () {
    var c = b.closest('.card'), open = c.classList.toggle('expanded');
    b.textContent = open ? 'Less' : 'More'; b.setAttribute('aria-expanded', open ? 'true' : 'false');
    window.ceTrack('ecosystem_more', { card: $('h3', c).textContent });
  });
});

/* ============================================================
   CURSOR GLOW on cards + MAGNETIC primary buttons (pointer devices)
   ============================================================ */
(function fx() {
  if (!hasHover || RM) return;
  $$('.card').forEach(function (c) {
    c.addEventListener('pointerenter', function () { c.classList.add('lit'); });
    c.addEventListener('pointerleave', function () { c.classList.remove('lit'); });
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });
  $$('.btn-primary').forEach(function (b) {
    if (b.closest('.ce-sticky')) return;
    b.classList.add('mag');
    if (!b.querySelector('span')) { var s = document.createElement('span'); while (b.firstChild) s.appendChild(b.firstChild); b.appendChild(s); }
    var inner = b.querySelector('span');
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); b.style.transform = 'translate(' + (dx * 0.18) + 'px,' + (dy * 0.25) + 'px)'; inner.style.transform = 'translate(' + (dx * 0.08) + 'px,' + (dy * 0.1) + 'px)'; });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; inner.style.transform = ''; });
  });
})();

/* ============================================================
   AURORA — fluid brand-colour blobs on a tiny canvas (blurred by CSS)
   ============================================================ */
(function aurora() {
  var cv = $('#aurora'); if (!cv || RM) return;
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height, t = 0, on = false, raf;
  var blobs = [
    { c: [244, 165, 88], r: 62, sx: 0.9, sy: 0.7, ox: 0.28, oy: 0.3, a: 0.95 },
    { c: [217, 122, 168], r: 58, sx: 0.6, sy: 1.1, ox: 0.7, oy: 0.35, a: 0.9 },
    { c: [91, 127, 196], r: 66, sx: 0.8, sy: 0.5, ox: 0.6, oy: 0.75, a: 0.95 },
    { c: [178, 151, 219], r: 50, sx: 1.2, sy: 0.9, ox: 0.3, oy: 0.7, a: 0.8 }
  ];
  function frame() {
    t += 0.008; ctx.clearRect(0, 0, W, H);
    blobs.forEach(function (b, i) {
      var x = W * (b.ox + 0.18 * Math.sin(t * b.sx + i)), y = H * (b.oy + 0.16 * Math.cos(t * b.sy + i * 1.7));
      var g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
      g.addColorStop(0, 'rgba(' + b.c.join(',') + ',' + b.a + ')'); g.addColorStop(1, 'rgba(' + b.c.join(',') + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, b.r, 0, Math.PI * 2); ctx.fill();
    });
    if (on) raf = requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { on = e.isIntersecting; if (on) { cancelAnimationFrame(raf); frame(); } }); }).observe(cv);
  else { on = true; frame(); }
  $('.mesh').style.display = 'none';
})();

/* ============================================================
   LIVE ORDER PULSE — phone push, feed under counters, counter drift
   DEMO_DRIFT=false stops all fake activity (backend can then push
   real events via window.ceLiveOrder({tickets, comp, where})).
   ============================================================ */
(function livePulse() {
  var DEMO_DRIFT = true;
  var COMPS = ['BMW M3 Competition Pack', 'Apple iMac Pro 32"', 'Maldives Trip for Two', 'Tesla Model Y', 'Rolex Submariner Date', '£25,000 Tax-Free Cash', '£500 Site Credit', '10× Instant Wins'];
  var WHERE = ['Manchester', 'Leeds', 'Glasgow', 'Birmingham', 'Cardiff', 'Liverpool', 'Bristol', 'Newcastle', 'Belfast', 'Sheffield', 'Nottingham', 'Southampton'];
  var QTY = [5, 10, 10, 15, 20, 25, 30, 50, 100];
  var list = $('#feed-list'), push = $('#push'), pushTxt = $('#push-txt'), ordersEl = $('[data-live="orders_30d"]'), ticketsEl = $('[data-live="tickets_30d"]');
  $('#push .ic').innerHTML = ICONS.bell;
  var rows = [], pushTimer, orders = null, tickets = null, heroVisible = true, feedVisible = false, LIVE = [];
  axios.get('/api/activity/recent').then(function (r) { var ev = r && r.data && r.data.events; if (ev && ev.length) LIVE = ev.filter(function (e) { return e && e.brand; }); }).catch(function () {});
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function ago(ts) { var s = Math.max(0, Math.round((Date.now() - ts) / 1000)); return s < 4 ? 'just now' : s < 60 ? s + 's ago' : Math.round(s / 60) + 'm ago'; }
  function render() { rows.forEach(function (r) { r.el.querySelector('.when').textContent = ago(r.ts); }); }
  function addRow(o) {
    var el = document.createElement('div'); el.className = 'feed-row';
    el.innerHTML = '<span class="qty"><span class="ic">' + ICONS.doc + '</span>' + o.tickets + ' tickets</span><span class="what"><b>' + esc(o.comp) + '</b> · ' + esc(o.where) + '</span><span class="when">just now</span>';
    list.insertBefore(el, list.firstChild); rows.unshift({ el: el, ts: o.ts || Date.now() });
    while (rows.length > 3) { var old = rows.pop(); old.el.classList.add('out'); (function (x) { setTimeout(function () { x.remove(); }, 400); })(old.el); }
  }
  function bump(el, n, cur) {
    if (cur === null) return cur;
    cur += n; el.textContent = fmt(cur); el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
    var b = document.createElement('span'); b.className = 'bump'; b.textContent = '+' + fmt(n); el.parentNode.appendChild(b); setTimeout(function () { b.remove(); }, 1300);
    return cur;
  }
  function showPush(o) {
    pushTxt.textContent = o.tickets + ' tickets · ' + o.comp;
    push.classList.add('on'); clearTimeout(pushTimer); pushTimer = setTimeout(function () { push.classList.remove('on'); }, 2600);
  }
  window.ceLiveOrder = function (o) {
    o = o || {};
    if (LIVE.length && !o.comp) { var ev = pick(LIVE); var n = parseInt(String(ev.val || '').replace(/[^0-9]/g, ''), 10); if (/ticket/i.test(ev.suffix || '') && n) o.tickets = n; o.comp = String(ev.brand || '').replace(/\w\S*/g, function (w) { return w.charAt(0) + w.slice(1).toLowerCase(); }); o.where = [ev.verb, ev.val, ev.suffix].filter(Boolean).join(' '); }
    o.tickets = o.tickets || pick(QTY); o.comp = o.comp || pick(COMPS); o.where = o.where || pick(WHERE); o.ts = Date.now();
    addRow(o);
    if (heroVisible && !RM) showPush(o);
    window.ceTrack('live_order_shown', { demo: DEMO_DRIFT });
  };
  // seed three rows so the feed never looks empty
  var seed = [{ tickets: 25, comp: 'BMW M3 Competition Pack', where: 'Leeds', ts: Date.now() - 9000 }, { tickets: 10, comp: 'Rolex Submariner Date', where: 'Glasgow', ts: Date.now() - 27000 }, { tickets: 50, comp: '£25,000 Tax-Free Cash', where: 'Manchester', ts: Date.now() - 51000 }];
  seed.reverse().forEach(addRow); render(); var feedIv = setInterval(render, 5000); cleanups.push(function () { clearInterval(feedIv); });
  // start counter drift once the count-up has finished
  setTimeout(function () { orders = +ordersEl.dataset.target; tickets = +ticketsEl.dataset.target; }, 2600);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { heroVisible = e.isIntersecting; }); }, { threshold: 0.2 }).observe($('#hero-visual'));
  }
  if (DEMO_DRIFT && !RM) {
    (function loop() {
      var wait = 3500 + Math.random() * 4500;
      setTimeout(function () { if (!alive) return; if (!document.hidden) window.ceLiveOrder(); loop(); }, wait);
    })();
    setTimeout(function () { window.ceLiveOrder(); }, 1800);
  }
})();

/* ============================================================
   TICKET STORM — pseudo-3D raffle tickets drifting through the hero
   ============================================================ */
(function ticketStorm() {
  var cv = $('#tickets'); if (!cv || RM) return;
  var ctx = cv.getContext('2d'), W = 0, H = 0, DPR = Math.min(2, window.devicePixelRatio || 1), on = false, raf, mx = 0, my = 0;
  var COLS = [[244,165,88],[236,138,130],[217,122,168],[178,151,219],[91,127,196]];
  var N = isDesktop() ? 12 : 5, T = [], F = 700;
  function reset(t, far) { t.x = (Math.random() - 0.5) * 1.6; t.y = (Math.random() - 0.5) * 1.4; t.z = far ? 900 + Math.random() * 500 : Math.random() * 1400; t.r = Math.random() * Math.PI * 2; t.vr = (Math.random() - 0.5) * 0.01; t.vz = 0.6 + Math.random() * 1.1; t.c = COLS[Math.floor(Math.random() * COLS.length)]; t.w = 120 + Math.random() * 60; return t; }
  for (var i = 0; i < N; i++) T.push(reset({}, false));
  function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  function ticket(x, y, w, h, r, a, c) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.globalAlpha = a;
    var g = ctx.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, 'rgb(' + c.join(',') + ')'); g.addColorStop(1, 'rgba(' + c.join(',') + ',0.55)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h * 0.18); ctx.fill();
    // notches + perforation
    ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(-w / 2, 0, h * 0.16, 0, Math.PI * 2); ctx.arc(w / 2, 0, h * 0.16, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = 'rgba(20,8,46,0.45)'; ctx.lineWidth = Math.max(1, h * 0.03); ctx.setLineDash([h * 0.08, h * 0.08]); ctx.beginPath(); ctx.moveTo(w * 0.22, -h / 2 + h * 0.1); ctx.lineTo(w * 0.22, h / 2 - h * 0.1); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = 'rgba(20,8,46,0.5)'; ctx.fillRect(-w * 0.36, -h * 0.12, w * 0.42, h * 0.08); ctx.fillRect(-w * 0.36, h * 0.06, w * 0.28, h * 0.08);
    ctx.restore();
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    T.sort(function (a, b) { return b.z - a.z; });
    for (var i = 0; i < T.length; i++) {
      var t = T[i]; t.z -= t.vz; t.r += t.vr; if (t.z < -80) reset(t, true);
      var s = F / (F + t.z), px = W / 2 + (t.x * W * 0.9 + mx * 40) * s, py = H / 2 + (t.y * H * 0.9 + my * 30) * s;
      var a = Math.max(0, Math.min(0.55, s * 0.75)) * (t.z < 60 ? Math.max(0, (t.z + 80) / 140) : 1);
      if (a <= 0.01) continue;
      ticket(px, py, t.w * s, t.w * 0.45 * s, t.r, a, t.c);
    }
    if (on) raf = requestAnimationFrame(frame);
  }
  size(); window.addEventListener('resize', size);
  if (hasHover) window.addEventListener('mousemove', function (e) { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { on = e.isIntersecting && !document.hidden; if (on) { cancelAnimationFrame(raf); frame(); } }); }).observe(cv);
  else { on = true; frame(); }
  document.addEventListener('visibilitychange', function () { if (document.hidden) on = false; else if (!on) { on = true; frame(); } });
})();

/* ============================================================
   KINETIC STRIPS
   ============================================================ */
(function kinetic() {
  var ITEMS = ['GLI Certified', '200+ Operators', compact(opts.tickets) + ' Tickets / 30d', 'Live in 1–2 Weeks', 'VCOC Signatory', '5+ Years', 'Nine Games', 'One Onboarding Call', compact(opts.orders) + ' Orders / 30d', 'Pen Tested'];
  function build(id, offset) {
    var el = $(id); if (!el) return;
    var html = ''; for (var k = 0; k < 2; k++) ITEMS.forEach(function (t, i) { var f = (i + offset) % 2 === 0; html += '<span>' + (f ? '<b>' + t + '</b>' : t) + '<i></i></span>'; });
    el.innerHTML = html;
  }
  build('#k-track', 0); build('#k-track2', 1);
})();

/* ============================================================
   DRAW THEATRE — tumblers → winner → confetti → hash chain
   ============================================================ */
(function theatre() {
  var th = $('#theatre'); if (!th) return;
  var tum = $('#tumblers'), status = $('#th-status'), winner = $('#th-winner'), hashEl = $('#th-hash'), conf = $('#th-confetti'), btn = $('#th-draw');
  var DIGITS = '04182', FULL = 'a3f9b2c4d17e8f0a5b6c9d2e4f1a7b3c8d5e2f9a0b4c6d1e7f3a9b5c2d8e4f1c', busy = false, timers = [];
  var strip = ''; for (var r = 0; r < 3; r++) for (var d = 0; d < 10; d++) strip += '<i>' + d + '</i>';
  tum.innerHTML = DIGITS.split('').map(function () { return '<div class="tumbler"><div class="strip">' + strip + '</div></div>'; }).join('');
  var tumblers = $$('.tumbler', tum), blocks = $$('.chain .blk', th), links = $$('.chain > i', th);
  function later(fn, ms) { timers.push(setTimeout(fn, RM ? 0 : ms)); }
  function setStrip(t, idx, animate, dur) { var s = $('.strip', t); s.style.transition = animate ? 'transform ' + dur + 'ms cubic-bezier(.15,.85,.25,1)' : 'none'; s.style.transform = 'translateY(' + (-idx * 100 / 30) + '%)'; }
  function burst() {
    if (RM) return; var cols = ['#f4a558', '#ec8a82', '#d97aa8', '#b297db', '#5b7fc4', '#4fd18b'], html = '';
    for (var i = 0; i < 70; i++) { var a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 260; html += '<i style="background:' + cols[i % 6] + ';--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d - 80).toFixed(0) + 'px;--r:' + (Math.random() * 720 - 360).toFixed(0) + 'deg;animation-delay:' + (Math.random() * 150).toFixed(0) + 'ms"></i>'; }
    conf.innerHTML = html; conf.classList.remove('go'); void conf.offsetWidth; conf.classList.add('go');
  }
  function reset() {
    timers.forEach(clearTimeout); timers = [];
    tumblers.forEach(function (t) { t.classList.remove('lock'); setStrip(t, 0, false, 0); });
    winner.classList.remove('on'); hashEl.textContent = 'sha256: …'; blocks.forEach(function (b) { b.classList.remove('lit'); }); links.forEach(function (l) { l.classList.remove('lit'); });
    status.innerHTML = '<i class="dot green"></i>GLI RNG ready'; status.className = 'tag green';
  }
  function run() {
    if (busy) return; busy = true; reset(); btn.disabled = true;
    status.innerHTML = '<i class="dot"></i>Seeding GLI RNG…'; status.className = 'tag';
    tumblers.forEach(function (t, i) {
      var target = +DIGITS[i] + 20; // 2 full loops then land
      later(function () { setStrip(t, target, !RM, 1500 + i * 380); }, 200);
      later(function () { t.classList.add('lock'); }, 200 + 1500 + i * 380);
    });
    var end = 200 + 1500 + (tumblers.length - 1) * 380 + 150;
    later(function () { status.innerHTML = '<i class="dot green"></i>Winner drawn · ticket #4,182'; status.className = 'tag green'; burst(); winner.classList.add('on'); }, end);
    later(function () {
      var i = 0; (function type() { if (i <= FULL.length) { hashEl.textContent = 'sha256: ' + FULL.slice(0, i); i += 3; timers.push(setTimeout(type, RM ? 0 : 18)); } })();
    }, end + 500);
    blocks.forEach(function (b, k) { later(function () { b.classList.add('lit'); if (links[k]) links[k].classList.add('lit'); }, end + 900 + k * 260); });
    later(function () { busy = false; btn.disabled = false; btn.textContent = 'Run it again'; }, end + 900 + blocks.length * 260 + 400);
    window.ceTrack('draws_demo_run');
  }
  btn.addEventListener('click', run);
  once(th, function () { later(run, 500); }, { threshold: 0.45 });
  $('#th-verify-toggle').addEventListener('click', function () {
    var w = $('#verify-wrap'), open = w.hidden; w.hidden = !open; this.setAttribute('aria-expanded', open ? 'true' : 'false'); this.textContent = open ? 'Hide the verifier' : 'Verify a real draw yourself';
    if (open) setTimeout(function () { w.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }, 50);
  });
})();

/* fee gauge trigger */
(function () { var g = $('#gauge'); if (g) once(g, function (el) { el.classList.add('in'); }, { threshold: 0.5 }); })();

/* ============================================================
   ADMIN AUTO-DEMO — a cursor creates, prices and publishes a competition
   ============================================================ */
(function adminDemo() {
  var box = $('#admin'); if (!box) return;
  var cur = $('#ad-cursor'), steps = $$('.ad-steps span', box), title = $('#ad-title'), price = $('#ad-price'), qty = $('#ad-qty'), tog = $('#ad-toggle'), prize = $('#ad-prize'), pub = $('#ad-publish'), live = $('#ad-live'), conf = $('#ad-confetti');
  var timers = [], running = false, visible = false, loopT;
  function later(fn, ms) { timers.push(setTimeout(fn, RM ? 0 : ms)); }
  function moveTo(el, dx, dy) { var b = box.getBoundingClientRect(), r = el.getBoundingClientRect(); cur.style.transform = 'translate(' + (r.left - b.left + (dx || r.width / 2)) + 'px,' + (r.top - b.top + (dy || r.height / 2)) + 'px)'; }
  function click() { cur.classList.remove('click'); void cur.offsetWidth; cur.classList.add('click'); }
  function type(el, text, t0, cb) { el.classList.add('typing'); el.textContent = ''; text.split('').forEach(function (ch, i) { later(function () { el.textContent += ch; }, t0 + i * 45); }); later(function () { el.classList.remove('typing'); if (cb) cb(); }, t0 + text.length * 45 + 200); }
  function step(n) { steps.forEach(function (s, i) { s.classList.toggle('on', i === n); s.classList.toggle('done', i < n); }); }
  function burst() {
    if (RM) return; var cols = ['#f4a558', '#ec8a82', '#d97aa8', '#b297db', '#5b7fc4', '#4fd18b'], html = '';
    for (var i = 0; i < 40; i++) { var a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 160; html += '<i style="background:' + cols[i % 6] + ';--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d - 60).toFixed(0) + 'px;--r:' + (Math.random() * 720 - 360).toFixed(0) + 'deg;animation-delay:' + (Math.random() * 120).toFixed(0) + 'ms"></i>'; }
    conf.innerHTML = html; conf.classList.remove('go'); void conf.offsetWidth; conf.classList.add('go');
  }
  function reset() { timers.forEach(clearTimeout); timers = []; step(0); [title, price, qty].forEach(function (e) { e.textContent = ''; e.classList.remove('typing'); }); tog.classList.remove('on'); prize.classList.remove('on'); live.classList.remove('on'); pub.classList.remove('pressed'); cur.classList.remove('on'); }
  function run() {
    if (running) return; running = true; reset();
    if (RM) { title.textContent = 'BMW M3 Competition Pack'; price.textContent = '£2.99'; qty.textContent = '75,000'; tog.classList.add('on'); prize.classList.add('on'); live.classList.add('on'); step(2); running = false; return; }
    later(function () { cur.classList.add('on'); moveTo(title, 24, 20); }, 100);
    later(function () { click(); }, 800);
    type(title, 'BMW M3 Competition Pack', 950);
    later(function () { moveTo(price, 24, 20); }, 2300); later(function () { click(); }, 2900);
    type(price, '£2.99', 3000);
    later(function () { moveTo(qty, 24, 20); }, 3500); later(function () { click(); }, 4100);
    type(qty, '75,000', 4200);
    later(function () { step(1); moveTo(tog, 19, 11); }, 4800); later(function () { click(); tog.classList.add('on'); }, 5400);
    later(function () { moveTo(prize); }, 5800); later(function () { click(); prize.classList.add('on'); }, 6400);
    later(function () { step(2); moveTo(pub); }, 6900); later(function () { click(); pub.classList.add('pressed'); }, 7600);
    later(function () { pub.classList.remove('pressed'); live.classList.add('on'); burst(); cur.classList.remove('on'); }, 7900);
    later(function () { running = false; if (visible) loopT = setTimeout(run, 4000); }, 8400);
  }
  $('#ad-replay').addEventListener('click', function () { clearTimeout(loopT); running = false; run(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { visible = e.isIntersecting; if (visible && !running) { clearTimeout(loopT); loopT = setTimeout(run, 400); } if (!visible) clearTimeout(loopT); }); }, { threshold: 0.4 }).observe(box);
  else run();
})();

return function destroy() {
  alive = false;
  cleanups.forEach(function (c) { try { c(); } catch (e) {} });
  document.body.style.overflow = '';
};
}
