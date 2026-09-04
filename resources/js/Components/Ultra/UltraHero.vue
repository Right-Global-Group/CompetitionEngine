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
          <div class="site" id="site" data-brand="ritas" aria-hidden="true">
            <div class="site-head">
              <span class="site-brand"><img id="site-logo" src="/images/tenant-icons/ritas.png" alt="" @error="$event.target.hidden = true"><b id="site-name">Rita's Riches</b></span>
              <span class="site-nav"><i>Home</i><i>Comps</i><i>Winners</i><i class="cart">🛒<em>3</em></i></span>
            </div>
            <div class="site-hero" id="site-carousel">
              <div class="hslide is-active"><img src="/images/draws/bmw.jpg" alt="" loading="lazy"><div class="hcap"><small>Win this week</small><b>BMW M3<br>Competition</b><span>£2.99 per ticket · draws Friday 8pm</span><em>Enter now →</em></div></div>
              <div class="hslide is-next"><img src="/images/draws/tesla.jpg" alt="" loading="lazy"><div class="hcap"><small>New</small><b>Tesla<br>Model Y</b><span>£2.99 per ticket · 71% sold</span><em>Enter now →</em></div></div>
              <div class="hslide is-prev"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><div class="hcap"><small>Tonight</small><b>£25,000<br>Tax-Free Cash</b><span>£0.99 per ticket · draws 8pm</span><em>Enter now →</em></div></div>
              <div class="dots"><i class="on"></i><i></i><i></i></div>
            </div>
            <div class="site-sec belt-head"><b><i class="live"></i>Live winners</b><span>Hall of fame</span></div>
            <div class="site-belt"><div class="belt-track">
              <div class="wcard"><i>SK</i><div><b>Sarah K.</b><span>won <strong>BMW M3</strong></span></div><small>#04827</small></div>
              <div class="wcard"><i>JP</i><div><b>James P.</b><span>won <strong>£500 Cash</strong></span></div><small>#00193</small></div>
              <div class="wcard"><i>AH</i><div><b>Amira H.</b><span>won <strong>Rolex Submariner</strong></span></div><small>#11240</small></div>
              <div class="wcard"><i>TR</i><div><b>Tom R.</b><span>won <strong>iMac Pro</strong></span></div><small>#08312</small></div>
              <div class="wcard"><i>LM</i><div><b>Lia M.</b><span>won <strong>£200 Cash</strong></span></div><small>#02541</small></div>
              <div class="wcard"><i>SK</i><div><b>Sarah K.</b><span>won <strong>BMW M3</strong></span></div><small>#04827</small></div>
              <div class="wcard"><i>JP</i><div><b>James P.</b><span>won <strong>£500 Cash</strong></span></div><small>#00193</small></div>
              <div class="wcard"><i>AH</i><div><b>Amira H.</b><span>won <strong>Rolex Submariner</strong></span></div><small>#11240</small></div>
              <div class="wcard"><i>TR</i><div><b>Tom R.</b><span>won <strong>iMac Pro</strong></span></div><small>#08312</small></div>
              <div class="wcard"><i>LM</i><div><b>Lia M.</b><span>won <strong>£200 Cash</strong></span></div><small>#02541</small></div>
            </div></div>
            <div class="site-sec"><b>Live competitions</b><span>View all</span></div>
            <div class="site-grid">
              <div class="pcard">
                <div class="pimg"><img src="/images/draws/rolex.jpg" alt="" loading="lazy"><span class="cat">Luxury</span><span class="sale">-25%</span><span class="price"><s>£1.99</s>£1.49</span></div>
                <b class="ptitle">Rolex Submariner Date</b>
                <div class="psold"><i style="--p:37%"></i><small>37% sold · ends Sunday</small></div>
                <div class="pqa"><span class="qty"><i>−</i><b>5</b><i>+</i></span><button type="button">Quick add</button></div>
              </div>
              <div class="pcard">
                <div class="pimg"><img src="/images/draws/maldives.jpg" alt="" loading="lazy"><span class="cat">Holiday</span><span class="sale">-20%</span><span class="price"><s>£2.49</s>£1.99</span></div>
                <b class="ptitle">Maldives Trip for Two</b>
                <div class="psold"><i style="--p:81%"></i><small>81% sold · 640 left</small></div>
                <div class="pqa"><span class="qty"><i>−</i><b>10</b><i>+</i></span><button type="button">Quick add</button></div>
              </div>
              <div class="pcard">
                <div class="pimg"><img src="/images/draws/imac.jpg" alt="" loading="lazy"><span class="cat">Tech</span><span class="price">£0.79</span></div>
                <b class="ptitle">Apple iMac Pro 32"</b>
                <div class="psold"><i style="--p:58%"></i><small>58% sold</small></div>
                <div class="pqa"><span class="qty"><i>−</i><b>5</b><i>+</i></span><button type="button">Quick add</button></div>
              </div>
              <div class="pcard">
                <div class="pimg"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><span class="cat">Cash</span><span class="sale">Hot</span><span class="price">£0.99</span></div>
                <b class="ptitle">£10,000 Cash</b>
                <div class="psold"><i style="--p:64%"></i><small>64% sold</small></div>
                <div class="pqa"><span class="qty"><i>−</i><b>5</b><i>+</i></span><button type="button">Quick add</button></div>
              </div>
            </div>
            <div class="site-sec"><b>Instant wins</b><span>Play now</span></div>
            <div class="site-iw"><span>🎰 Slots</span><span>🎫 Scratch</span><span>🎡 Spinny</span><span>🪙 Coin Drop</span><span>⚽ Football</span></div>
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
