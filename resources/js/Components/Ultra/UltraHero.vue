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
          <div class="slot" data-slot="hero"></div>
          <div class="phone-list" aria-hidden="true">
            <div><img src="/images/draws/bmw.jpg" alt="" loading="lazy" @error="$event.target.remove()"><span>BMW M3 Competition Pack</span><small>84% sold</small><i style="--p:84%"></i></div>
            <div><img src="/images/draws/cash.jpg" alt="" loading="lazy" @error="$event.target.remove()"><span>£25,000 Tax-Free Cash</span><small>61% sold</small><i style="--p:61%"></i></div>
            <div><img src="/images/draws/rolex.jpg" alt="" loading="lazy" @error="$event.target.remove()"><span>Rolex Submariner Date</span><small>37% sold</small><i style="--p:37%"></i></div>
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
