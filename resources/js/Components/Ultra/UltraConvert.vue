<template>
<section id="convert" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><i class="dot"></i>Built by marketers, not just developers</span>
      <h2>Pretty doesn't pay your prize fund. <span class="grad">Conversion does.</span></h2>
      <p class="lead">Every flow — checkout, upsell, free entry, cart-abandonment — is tested for sell-through, not just speed.</p>
    </div>
    <div class="stack" id="stack">
      <div class="card cvf" data-reveal style="--i:0">
        <div class="txt"><span class="num">01</span><h3>A/B-tested Checkout Flows</h3><p class="stat"><b class="grad">+23%</b>conversion — "Buy 10 tickets" vs "Add to cart", across our last 4M orders</p></div>
        <div class="viz"><div class="bars"><div class="bar-row"><span>"Add to cart"</span><span class="bar"><i style="width:83%"></i></span><b>1.9%</b></div><div class="bar-row win"><span>"Buy 10 tickets"</span><span class="bar"><i style="width:100%"></i></span><b>2.3%</b></div></div></div>
      </div>
      <div class="card cvf" data-reveal style="--i:1">
        <div class="txt"><span class="num">02</span><h3>Smart Upsell Modals</h3><p class="stat"><b class="grad">+£23</b>average per order · ~38% of buyers accept at least one upsell</p></div>
        <div class="viz"><div class="uplift"><span class="tnum" data-count="42" data-prefix="£">£0</span><i class="ic" data-i="arrow-r"></i><span class="tnum" data-count="65" data-prefix="£">£0</span></div><div class="cvchips"><span class="chip on">Add 10 more tickets for £8</span><span class="chip">Try our instant win</span><span class="chip">Upgrade to bundle</span></div></div>
      </div>
      <div class="card cvf" data-reveal style="--i:2">
        <div class="txt"><span class="num">03</span><h3>Cart-Abandonment Automation</h3><p class="stat"><b class="grad">~14%</b>of abandoned carts complete within 24h · ~£18k/month recovered for an average operator</p></div>
        <div class="viz"><div class="ring-wrap"><svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" class="bg"/><circle cx="60" cy="60" r="50" class="fg" style="--v:0.14"/></svg><div class="ring-lbl"><b><span class="tnum" data-count="14" data-suffix="%">0%</span></b><span>recovered</span></div><div class="flow"><span>Cart left</span><i class="ic" data-i="chev-r"></i><span>Email + push</span><i class="ic" data-i="chev-r"></i><span>Paid</span></div></div></div>
      </div>
      <div class="card cvf" data-reveal style="--i:3">
        <div class="txt"><span class="num">04</span><h3>Facebook-Ad-Compliant Landing Pages</h3><p class="stat"><b class="grad">14/14</b>compliance flags passed by default — the largest paid channel, without the account bans</p></div>
        <div class="viz"><div class="checks" id="fb-checks"></div><div class="checks-lbl"><span>Compliance flags</span><b><span class="tnum" data-count="14">0</span>/14 passing</b></div></div>
      </div>
      <div class="card cvf" data-reveal style="--i:4">
        <div class="txt"><span class="num">05</span><h3>Referral &amp; Affiliate Engine</h3><p class="stat"><b class="grad">+41%</b>first-90-day spend from referred customers · 2.1× faster first order</p></div>
        <div class="viz"><svg class="tree" viewBox="0 0 300 170" aria-hidden="true"><g class="ln"><line x1="150" y1="38" x2="54" y2="105"/><line x1="150" y1="38" x2="102" y2="136"/><line x1="150" y1="38" x2="150" y2="112"/><line x1="150" y1="38" x2="198" y2="140"/><line x1="150" y1="38" x2="246" y2="102"/></g><g class="nd"><circle cx="54" cy="105" r="15"/><circle cx="102" cy="136" r="15"/><circle cx="150" cy="112" r="15"/><circle cx="198" cy="140" r="15"/><circle cx="246" cy="102" r="15"/></g><circle class="rt" cx="150" cy="38" r="22"/><text x="150" y="43" text-anchor="middle" font-size="13" font-weight="800" fill="#14082e" font-family="Inter, sans-serif">YOU</text><g class="tags"><text x="54" y="109" text-anchor="middle">+£</text><text x="102" y="140" text-anchor="middle">+£</text><text x="150" y="116" text-anchor="middle">+£</text><text x="198" y="144" text-anchor="middle">+£</text><text x="246" y="106" text-anchor="middle">+£</text></g></svg></div>
      </div>
      <div class="card cvf" data-reveal style="--i:5">
        <div class="txt"><span class="num">06</span><h3>Conversion-Rate Dashboard</h3><p class="stat"><b class="grad">Every step</b>which competitions convert, where users drop off, which source pays back</p></div>
        <div class="viz"><div class="mini-dash"><div class="tiles"><div class="tile">Revenue<b>+34%</b></div><div class="tile">Conversion<b>2.3%</b></div><div class="tile">Avg order<b>£65</b></div></div><div class="funnel"><i style="width:100%"></i><i></i><i></i><i></i></div><div class="funnel-lbl"><span>Visit</span><span>Comp page</span><span>Checkout</span><span>Paid</span></div></div></div>
      </div>
    </div>

    <div class="card chart" id="rev-chart">
      <div class="chart-head"><h3>Avg operator revenue, month-on-month</h3><div class="legend"><span><i style="background:var(--orange)"></i>CompEngine operators</span><span><i style="background:var(--text-3)"></i>Typical WordPress operator</span></div></div>
      <svg viewBox="0 0 640 260" role="img" aria-label="Line chart: CompEngine operators reach +247% by month 12 versus a typical WordPress operator">
        <g class="grid-l"><line x1="40" y1="30" x2="600" y2="30"/><line x1="40" y1="90" x2="600" y2="90"/><line x1="40" y1="150" x2="600" y2="150"/><line x1="40" y1="210" x2="600" y2="210"/></g>
        <text class="axis" x="52" y="238">Month 1</text><text class="axis" x="300" y="238" text-anchor="middle">Month 6</text><text class="axis" x="580" y="238" text-anchor="end">Month 12</text>
        <path class="area-ce" d="M60 210 C 160 205, 250 190, 330 150 S 500 70, 580 34 L580 210 Z"/>
        <path class="l-wp" d="M60 210 C 160 206, 250 200, 330 192 S 500 178, 580 172"/>
        <path class="l-ce" d="M60 210 C 160 205, 250 190, 330 150 S 500 70, 580 34"/>
        <circle class="dot-ce" cx="580" cy="34" r="5"/>
        <g class="end-tag"><rect x="506" y="8" width="66" height="22" rx="11" fill="#f4a558"/><text x="539" y="23" text-anchor="middle" font-size="12" font-weight="800" fill="#14082e" font-family="Inter, sans-serif">+247%</text></g>
      </svg>
      <p class="chart-note">Indexed to month 1. Illustrative curve shape; the +247% end point is the figure we publish.</p>
    </div>

    <div class="closing">
      <p class="quote">"Most 'raffle website builders' are designers. We're operators with our own conversion data — and we ship the winning patterns to every site we power."</p>
      <div class="tiles2">
        <div class="card"><b class="grad">+23%</b><span>avg checkout conversion vs a typical WordPress raffle stack</span></div>
        <div class="card"><b class="grad">+£23</b><span>avg ticket value uplift via smart upsell modals</span></div>
      </div>
    </div>
  </div>
</section>
</template>
