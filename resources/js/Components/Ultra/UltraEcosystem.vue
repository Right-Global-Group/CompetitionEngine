<template>
<section id="ecosystem" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><i class="dot"></i>Your complete raffle ecosystem</span>
      <h2>Everything you need. <span class="grad">Nine modules. Zero plugins.</span></h2>
    </div>
    <div class="bento" id="bento">
      <div class="card b-gs"><span class="only">Only on CompEngine</span>
        <h3>Game Studio</h3>
        <div class="viz"><div class="slot lg" data-slot="bento" style="--slot-primary:#f4a558;--slot-accent:#d97aa8;width:min(100%,520px);margin:0 auto"></div></div>
        <p>Theme it, brand it, preview it live. No developers, no presets.</p>
        <a href="#game-studio" class="link" data-track="ecosystem_try_it">Try it live ↑</a>
      </div>
      <div class="card"><span class="only">Only on CompEngine</span>
        <h3>Separate Cash &amp; Site-Credit Wallets</h3>
        <div class="viz"><div class="wal-bar"><i class="cash"></i><i class="cred"></i></div><div class="wal-lbl"><span><b>Cash 68%</b>Withdrawable · Cash wallet</span><span style="text-align:right"><b>Credit 32%</b>Non-withdrawable · Site credit</span></div></div>
        <p>Cash players can withdraw. Site credit they can't. Both tracked, both usable for instant wins.</p>
      </div>
      <div class="card"><span class="only">Only on CompEngine</span>
        <h3>Free Entry Compliance &amp; Management</h3>
        <div class="viz"><div class="vcoc"><span class="ring"><i class="ic" data-i="check"></i></span><span><b style="color:var(--text-0)">UK Voluntary Code</b><br>Mapped end-to-end · since May 2026</span></div></div>
        <p>UK free-entry route, tracked and audited end-to-end. No manual handling.</p>
        <a href="#comparison" class="link" data-track="ecosystem_vcoc">See VCOC alignment →</a>
      </div>
      <div class="card">
        <h3>Smart Upsell — built into every checkout</h3>
        <div class="viz" style="padding:0;min-height:130px"><div class="ups"><img src="/images/upsell/upsell.png" alt="" loading="lazy" @error="$event.target.remove()"><div class="modal"><b>Add 10 more tickets for £8?</b><span class="muted">Boost your odds before checkout</span><span class="mbtn">Yes, add them</span></div></div></div>
        <p>Fires at the right point in checkout. +£23 average per order. 87% take it.</p>
      </div>
      <div class="card">
        <h3>Best-in-class reporting</h3>
        <div class="viz"><svg class="spark" viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="M0 52 L25 46 L50 48 L75 38 L100 34 L125 26 L150 22 L175 14 L200 6 L200 64 L0 64 Z"/><path d="M0 52 L25 46 L50 48 L75 38 L100 34 L125 26 L150 22 L175 14 L200 6"/></svg><span class="tag green" style="justify-self:start"><i class="ic" data-i="trend"></i>+34% MoM growth</span></div>
        <p>Order patterns, customer LTV, prize cost, P&amp;L per competition.</p>
        <a href="#convert" class="link" data-track="ecosystem_dashboard">See the dashboard →</a>
      </div>
      <div class="card">
        <h3>Competition Builder</h3>
        <div class="viz"><div class="brows"><div class="brow"><i><span class="ic" data-i="check"></span></i>Prize, price, ticket cap</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Instant wins — no CSV upload</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Promotions, discounts, addons</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Publish</div></div></div>
        <p>Instant wins without CSVs. Promotions, discounts and addons other sites can't do.</p>
      </div>
      <div class="card">
        <h3>Automated Payouts &amp; Prize Management</h3>
        <div class="viz"><div class="flow"><span>Winner picks</span><i class="ic" data-i="chev-r"></i><span>Cash · Credit · Prize</span><i class="ic" data-i="chev-r"></i><span>Paid &amp; tracked</span></div></div>
        <p>Winner picks cash, credit or prize. Paid and tracked automatically.</p>
        <a href="#certified-draws" class="link" data-track="ecosystem_prize_flow">See the prize flow →</a>
      </div>
      <div class="card b-scratch">
        <h3>Scratch to Win</h3>
        <div class="viz"><div class="scratch" id="scratch"><div class="bar"><span>Scratch off <b>50%</b> to reveal your prize</span><button class="btn btn-ghost btn-sm" type="button" id="scratch-reveal">Reveal All</button><button class="btn btn-ghost btn-sm" type="button" id="scratch-reset" style="margin-left:0">Reset</button></div><div class="grid" id="scratch-grid"></div></div></div>
      </div>
      <div class="card">
        <h3>GLI RNG Certified</h3>
        <div class="viz"><a class="gli" href="#certified-draws" data-track="ecosystem_gli"><img src="/images/gli-rng-certified.png" alt="GLI RNG Certified" loading="lazy" @error="$event.target.remove()"><span class="seal">GLI<br>RNG<br>CERTIFIED</span><span>Draws and ticket distribution certified by an independent third party.</span></a></div>
        <p>Draws and ticket distribution certified by an independent third party.</p>
      </div>
      <div class="card">
        <h3>Built-in Notifications</h3>
        <div class="viz"><div class="toasts"><div class="toast"><i class="ic" data-i="bell"></i>You won! £250 site credit added</div><div class="toast"><i class="ic" data-i="bell"></i>Draw closes in 2 hours — 84% sold</div><div class="toast"><i class="ic" data-i="bell"></i>New: Rolex Submariner, £1.49 a ticket</div></div></div>
        <p>Winner alerts, updates and marketing, built in — no app required.</p>
      </div>
    </div>
  </div>
</section>
</template>
