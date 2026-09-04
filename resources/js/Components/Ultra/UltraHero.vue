<script setup>
defineProps({ orders: { type: Number, default: 1500000 }, tickets: { type: Number, default: 120000000 } });
</script>

<template>
<section id="hero">
  <canvas class="tickets" id="tickets" aria-hidden="true"></canvas>
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <span class="eyebrow"><i class="dot"></i>Proven. Certified. UK Voluntary Code Signatory.</span>
        <h1 id="hero-h1">The <span class="grad">Ultimate Competition</span> Platform</h1>
        <p class="sub" id="hero-sub">Build Competitions beyond presets. Create unique competition experiences for your customers.</p>
        <div class="cta-row">
          <a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary btn-lg" id="hero-cta" data-track="hero_book_demo" data-calendly>Book a Demo</a>
          <a href="#game-studio" class="btn btn-ghost btn-lg" data-track="hero_game_studio">Game Studio</a>
        </div>
        <div class="cta-note hand"><svg viewBox="0 0 30 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 2c2 10 6 18 20 22"/><path d="M18 20l6 4-1 6"/></svg>30 mins. No sales deck.</div>
        <div class="proof"><i class="ic" data-i="trend"></i><span>Operators on CompEngine grow revenue <b>+47%</b> on average in their first 90 days</span></div>
        <div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI certified</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC signatory</span></div>
      </div>
      <div class="hero-visual" id="hero-visual">
        <div class="mesh" aria-hidden="true"></div><canvas class="aurora" id="aurora" width="160" height="160" aria-hidden="true"></canvas>
        <div class="big-gear" id="big-gear" aria-hidden="true"><span class="gear-svg" data-gear></span></div>
        <div class="phone-wrap"><div class="phone" id="phone"><span class="glare"></span><div class="push" id="push" aria-hidden="true"><span class="ic"></span><div><b>New order</b><span id="push-txt"></span></div></div><span class="btn-side"></span><span class="btn-side l"></span><span class="btn-side l2"></span>
          <div class="phone-bar"><span>9:41</span><span>yourbrand.co.uk</span><span>●●●</span></div>
          <div class="site" id="site" aria-hidden="true">
            <div class="site-head"><b>YOUR<span>BRAND</span></b><span class="site-menu"><i></i><i></i><i></i></span></div>
            <div class="site-carousel" id="site-carousel">
              <div class="slide on"><img src="/images/draws/bmw.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>BMW M3 Competition Pack</b><span>£2.99 a ticket · draws Friday 8pm</span><em>Enter now</em></div></div>
              <div class="slide"><img src="/images/draws/tesla.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>Tesla Model Y</b><span>£3.49 a ticket · 71% sold</span><em>Enter now</em></div></div>
              <div class="slide"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>£25,000 Tax-Free Cash</b><span>£0.99 a ticket · draws tonight</span><em>Enter now</em></div></div>
              <div class="dots"><i class="on"></i><i></i><i></i></div>
            </div>
            <div class="site-sec"><b>Live competitions</b><span>View all</span></div>
            <div class="site-grid">
              <div class="comp"><img src="/images/draws/rolex.jpg" alt="" loading="lazy"><b>Rolex Submariner Date</b><span>£1.49 · <em>37% sold</em></span><i style="--p:37%"></i></div>
              <div class="comp"><img src="/images/draws/imac.jpg" alt="" loading="lazy"><b>Apple iMac Pro 32"</b><span>£0.79 · <em>58% sold</em></span><i style="--p:58%"></i></div>
              <div class="comp"><img src="/images/draws/maldives.jpg" alt="" loading="lazy"><b>Maldives Trip for Two</b><span>£2.49 · <em>81% sold</em></span><i style="--p:81%"></i></div>
              <div class="comp"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><b>£10,000 Cash</b><span>£0.99 · <em>64% sold</em></span><i style="--p:64%"></i></div>
            </div>
            <div class="site-sec"><b>Instant wins</b><span>Play now</span></div>
            <div class="site-iw"><span>🎰 Slots</span><span>🎫 Scratch</span><span>🎡 Spinny</span><span>🪙 Coin Drop</span><span>⚽ Football</span></div>
            <div class="site-sec"><b>Recent winners</b></div>
            <div class="site-win">
              <div><i>SK</i><span><b>Sarah K.</b> won the BMW M3</span><small>2h ago</small></div>
              <div><i>JP</i><span><b>James P.</b> won £500 cash</span><small>5h ago</small></div>
              <div><i>AH</i><span><b>Amira H.</b> won a Rolex Submariner</span><small>1d ago</small></div>
            </div>
            <div class="site-foot">GLI-certified draws · UK-licensed payments · free entry route</div>
          </div>
        </div><div class="phone-shadow" aria-hidden="true"></div></div>
      </div>
    </div>
    <div class="counters" id="counters">
      <div class="counter"><b class="tnum" data-live="orders_30d" :data-target="orders" data-format="num">0</b><span>orders · last 30d</span></div>
      <div class="counter"><b class="tnum" data-live="tickets_30d" :data-target="tickets" data-format="num">0</b><span>tickets · last 30d</span></div>
      <div class="counter"><b class="tnum" data-live="years" data-target="5" data-format="plus">0</b><span>yrs operating</span></div>
    </div>
    <div class="feed card" id="feed" aria-live="polite" aria-label="Live orders">
      <div class="feed-head"><span class="tag green"><i class="dot green"></i>Live orders</span><span class="muted small" id="feed-rate">across CompEngine sites</span></div>
      <div class="feed-list" id="feed-list"></div>
    </div>
  </div>
</section>
</template>
