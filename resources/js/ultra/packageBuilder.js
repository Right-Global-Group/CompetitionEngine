/**
 * Package builder — pricing popup.
 *
 * ── ALL PRICING LIVES IN THE `CONFIG` OBJECT BELOW ──
 * Change a number there and the whole builder updates. Nothing else to edit.
 *
 * Returns { open, close, destroy } or null when the markup isn't on the page.
 */
export function initPackageBuilder() {
    const root = document.getElementById('pb');
    const modal = document.getElementById('pb-modal');
    if (!root || !modal) return null;

    const CONFIG = {
        flatMonthly: 2000,        // £/month Enterprise flat fee
        zeroUpfrontRate: 20,      // pence per order, £0 build fee (template only)
        paygRange: '5–10p',       // the Pay As You Go per-order range
        templateSetup: 999,       // £ + VAT, template build on the 5–10p plans
        customSetup: 6000,        // £ + VAT, custom build (all plans)
        serverSupport: 200,       // £ + VAT / month — applies to EVERY plan
    };

    const state = { build: null, plan: null };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dialog = modal.querySelector('.pb-dialog');
    const panels = root.querySelectorAll('.pb-panel');
    const steps = root.querySelectorAll('.pb-step');
    const restart = document.getElementById('pb-restart');
    const plansEl = document.getElementById('pb-plans');
    const sub2 = document.getElementById('pb-step2-sub');
    const sumCard = document.getElementById('pb-sum-card');
    const book = document.getElementById('pb-book');

    const cleanups = [];
    const on = (target, ev, fn, opts) => {
        target.addEventListener(ev, fn, opts);
        cleanups.push(() => target.removeEventListener(ev, fn, opts));
    };
    const gbp = (n) => '£' + Math.round(n).toLocaleString('en-GB');
    const setupFor = () => (state.build === 'custom' ? CONFIG.customSetup : CONFIG.templateSetup);
    // the rest of the page (lead form hidden field, Calendly links) listens for this
    const announce = (text) => document.dispatchEvent(new CustomEvent('ce:package', { detail: text }));

    /* ---------- step navigation ---------- */
    function goTo(n) {
        panels.forEach((p) => p.classList.toggle('on', +p.dataset.panel === n));
        steps.forEach((s) => {
            const i = +s.dataset.step;
            s.classList.toggle('active', i === n);
            s.classList.toggle('done', i < n);
        });
        restart.hidden = n === 1;
        if (n > 1) modal.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }

    /* ---------- step 1: build type ---------- */
    root.querySelectorAll('[data-build]').forEach((btn) => {
        on(btn, 'click', () => {
            state.build = btn.dataset.build;
            root.querySelectorAll('[data-build]').forEach((b) => b.classList.toggle('sel', b === btn));
            renderPlans();
            goTo(2);
        });
    });

    /* ---------- step 2: plan ---------- */
    function planList() {
        const list = [{
            id: 'payg',
            title: 'Pay As You Go',
            icon: '📈',
            blurb: 'Your platform cost is charged per paid order, so it rises and falls with your sales. No minimum spend.',
            rate: CONFIG.paygRange, rateSub: ' per order',
            upfront: setupFor(),
            upfrontLabel: gbp(setupFor()) + ' + VAT build fee',
            bullets: [
                'Platform cost tracks your sales, up or down',
                'No per-order minimum and no tie-in',
                'Charged on paid orders only, never free entries',
            ],
            flag: 'Most operators start here',
        }];

        if (state.build === 'template') {
            list.push({
                id: 'zero',
                title: 'Zero Upfront',
                icon: '🚀',
                blurb: 'No build fee to get started. You pay 20p on each paid order instead, so the build is covered as you sell.',
                rate: CONFIG.zeroUpfrontRate + 'p', rateSub: ' per order',
                upfront: 0,
                upfrontLabel: '£0 build fee',
                zero: true,
                bullets: [
                    '£0 build fee to get started',
                    'The same platform and features as every plan',
                    'We carry the risk with you',
                ],
                flag: 'Launching with no budget',
            });
        }

        list.push({
            id: 'flat',
            title: 'Enterprise Flat',
            icon: '🏆',
            blurb: 'A fixed platform fee with no per-order charges, however much you sell. Your platform cost stops moving.',
            rate: gbp(CONFIG.flatMonthly), rateSub: ' / month',
            upfront: setupFor(),
            upfrontLabel: gbp(setupFor()) + ' + VAT build fee',
            highlight: 'No per-order fees at all',
            bullets: [
                'Your platform cost never rises with volume',
                'Dedicated account manager',
                'Priority support and onboarding',
            ],
            flag: 'Best value at scale',
        });

        return list;
    }

    function renderPlans() {
        sub2.textContent = state.build === 'custom'
            ? 'Your custom design is a one-off ' + gbp(CONFIG.customSetup) + ' + VAT. After that, choose how the platform itself is charged.'
            : 'Two of these carry a ' + gbp(CONFIG.templateSetup) + ' + VAT build fee. One has a £0 build fee. Your call.';

        const plans = planList();
        // two plans sit in two columns, three in three — no empty gap on the custom path
        plansEl.className = 'pb-choices' + (plans.length > 2 ? ' three' : '');

        plansEl.innerHTML = plans.map((p) => `
        <button class="pb-choice" type="button" data-plan="${p.id}">
          ${p.flag ? `<span class="pb-flag ${p.id === 'payg' ? '' : 'quiet'}">${p.flag}</span>` : ''}
          <div class="pb-ico">${p.icon}</div>
          <h4>${p.title}</h4>
          <div class="pb-blurb">${p.blurb}</div>
          <div class="pb-rate">${p.rate}<small>${p.rateSub}</small></div>
          <span class="pb-up${p.zero ? ' zero' : ''}">${p.upfrontLabel}</span>
          ${p.highlight ? `<span class="pb-hi">${p.highlight}</span>` : ''}
          <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          <span class="pb-go">Choose ${p.title} <span class="arw">&rarr;</span></span>
        </button>`).join('');

        plansEl.querySelectorAll('[data-plan]').forEach((btn) => {
            btn.addEventListener('click', () => {
                state.plan = btn.dataset.plan;
                plansEl.querySelectorAll('[data-plan]').forEach((b) => b.classList.toggle('sel', b === btn));
                renderSummary();
                goTo(3);
            });
        });
    }

    /* ---------- step 3: summary ---------- */
    function renderSummary() {
        const plan = planList().find((p) => p.id === state.plan);
        const upfront = plan.upfront;
        const buildTxt = state.build === 'custom' ? 'Custom Design' : 'Template Build';

        const rateTxt = state.plan === 'flat' ? gbp(CONFIG.flatMonthly) + ' + VAT / month'
            : state.plan === 'zero' ? CONFIG.zeroUpfrontRate + 'p + VAT per paid order'
            : CONFIG.paygRange + ' + VAT per paid order';
        const rateSub = state.plan === 'flat' ? 'no per-order charges at all' : 'charged on paid orders only';

        sumCard.innerHTML = `
        <div class="pb-sum-rows">
          <div class="pb-sum-row"><span class="k">Your build</span><span class="v">${buildTxt}<em>${state.build === 'custom' ? 'A fully unique design, 4–6 weeks' : 'Proven layout, live in 1–2 weeks — lowest cost to launch'}</em></span></div>
          <div class="pb-sum-row"><span class="k">Your plan</span><span class="v">${plan.title}</span></div>
          <div class="pb-sum-row"><span class="k">Platform rate</span><span class="v">${rateTxt}<em>${rateSub}</em></span></div>
          <div class="pb-sum-row"><span class="k">Server &amp; support</span><span class="v">${gbp(CONFIG.serverSupport)} + VAT / month<em>hosting, monitoring and support — all plans</em></span></div>
          <div class="pb-sum-row total"><span class="k">Build fee</span><span class="v">${upfront === 0 ? '£0 build fee' : gbp(upfront) + ' + VAT'}<em>${upfront === 0 ? 'covered by your per-order rate' : 'one-off, paid before we start'}</em></span></div>
        </div>`;

        // carry the package through to the booking CTA
        const summary = `${buildTxt} · ${plan.title} · ${rateTxt}`;
        const tag = document.getElementById('pb-cta-tag');
        if (tag) {
            tag.innerHTML = `Your package: <strong>${summary}</strong> — mention it when you book and we'll have the numbers ready.`;
            tag.hidden = false;
        }
        announce(summary);
    }

    root.querySelectorAll('[data-back]').forEach((b) => on(b, 'click', () => goTo(+b.dataset.back)));

    function reset() {
        state.build = null;
        state.plan = null;
        root.querySelectorAll('.pb-choice').forEach((c) => c.classList.remove('sel'));
        const tag = document.getElementById('pb-cta-tag');
        if (tag) tag.hidden = true;
        announce('');
        goTo(1);
    }
    on(restart, 'click', reset);

    /* ---------- the popup ---------- */
    let lastFocus = null;

    function openModal() {
        lastFocus = document.activeElement;
        reset();
        modal.hidden = false;
        document.body.style.overflow = 'hidden';   // stop the page behind from scrolling
        dialog.scrollTop = 0;
        modal.scrollTop = 0;
        const exit = document.getElementById('exit');
        if (exit) { exit.classList.remove('on'); exit.setAttribute('aria-hidden', 'true'); }
        const first = dialog.querySelector('[data-build]');
        (first || dialog).focus({ preventScroll: true });
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    ['pb-open', 'sticky-pkg', 'exit-open', 'float-pkg-btn', 'cmp-pkg'].forEach((id) => {
        const b = document.getElementById(id);
        if (b) on(b, 'click', openModal);
    });
    modal.querySelectorAll('[data-pb-close]').forEach((el) => on(el, 'click', closeModal));
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

    // keep tabbing inside the dialog while it's open
    on(dialog, 'keydown', (e) => {
        if (e.key !== 'Tab') return;
        const f = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
            .filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // "Book my call" closes the popup and lands the visitor on the form
    if (book) {
        on(book, 'click', (e) => {
            e.preventDefault();
            closeModal();
            const target = document.getElementById('booking');
            if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
            setTimeout(() => {
                const f = document.getElementById('f-name');
                if (f) f.focus({ preventScroll: true });
            }, reduced ? 0 : 700);
        });
    }
    // other in-page links inside the popup (Game Studio) close it before jumping
    dialog.querySelectorAll('a[href^="#"]').forEach((a) => {
        if (a === book) return;
        on(a, 'click', () => setTimeout(closeModal, 0));
    });

    return {
        open: openModal,
        close: closeModal,
        destroy() {
            cleanups.forEach((c) => c());
            document.body.style.overflow = '';
        },
    };
}
