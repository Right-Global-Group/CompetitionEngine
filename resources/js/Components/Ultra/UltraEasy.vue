<template>
<section id="easy" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><i class="dot"></i>Easy to learn. Easier to run.</span>
      <h2>Launch a competition in <span class="grad">three steps.</span></h2>
      <p class="lead">If you can post on Facebook, you can run CompEngine. One onboarding call, then it's yours.</p>
    </div>
    <div class="easy-grid">
      <div class="card admin" id="admin" aria-label="Admin walkthrough demo">
        <div class="ad-bar"><i></i><i></i><i></i><span>admin.yourbrand.co.uk</span></div>
        <div class="ad-body">
          <div class="ad-side"><b class="grad">COMPENGINE</b><span class="on">Competitions</span><span>Games</span><span>Wallets</span><span>Reports</span><span>Customers</span></div>
          <div class="ad-main">
            <div class="ad-steps"><span class="on" data-s="0">1 · Create</span><span data-s="1">2 · Prize</span><span data-s="2">3 · Publish</span></div>
            <div class="ad-form">
              <div class="ad-field"><label>Competition title</label><div class="ad-input" id="ad-title"></div></div>
              <div class="ad-row"><div class="ad-field"><label>Ticket price</label><div class="ad-input" id="ad-price"></div></div><div class="ad-field"><label>Tickets</label><div class="ad-input" id="ad-qty"></div></div></div>
              <div class="ad-field"><label>Instant wins</label><div class="ad-toggle" id="ad-toggle"><i></i><span>Add 250 instant wins — no CSV</span></div></div>
              <div class="ad-field"><label>Prize</label><div class="ad-prize" id="ad-prize"><span class="ic" data-i="car"></span><span>BMW M3 Competition Pack · £75,000</span><b>Cash alt: £60,000</b></div></div>
              <button type="button" class="btn btn-primary ad-publish" id="ad-publish" tabindex="-1">Publish competition</button>
            </div>
            <div class="ad-live" id="ad-live"><span class="ic" data-i="check-c"></span><div><b>Live on yourbrand.co.uk</b><span>/bmw-m3-competition-pack · tickets on sale</span></div></div>
          </div>
        </div>
        <div class="cursor" id="ad-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-3 6z" fill="#fff" stroke="#14082e" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <div class="confetti" id="ad-confetti" aria-hidden="true"></div>
        <button type="button" class="ad-replay" id="ad-replay" data-track="easy_replay">Replay</button>
      </div>
      <div class="timeline">
        <div class="tl-step"><span class="tl-dot"></span><small>Day 0</small><b>Book a 30-min demo</b><span>Tell us your prize and game type. That's the brief.</span></div>
        <div class="tl-step"><span class="tl-dot"></span><small>Week 1</small><b>We set it up</b><span>Domain, payment gateway, game configuration — and a free migration of users, wallets and competitions.</span></div>
        <div class="tl-step"><span class="tl-dot"></span><small>Week 2</small><b>You're live</b><span>Draws, payouts, reporting and notifications from one dashboard. We've done it in 4 days when it mattered.</span></div>
        <div class="tl-pills"><span class="tag green"><i class="ic" data-i="check"></i>Live in 1–2 weeks</span><span class="tag green"><i class="ic" data-i="check"></i>One onboarding call</span><span class="tag green"><i class="ic" data-i="check"></i>Free site migration</span></div>
      </div>
    </div>
  </div>
</section>
</template>
