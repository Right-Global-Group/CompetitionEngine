<template>
<section id="why-fee" class="cv">
  <div class="wrap">
    <div class="sec-head center">
      <h2>Why our pricing is what it is.</h2>
      <p class="sub">The cheapest platform isn't the best deal. The most expensive isn't either.</p>
    </div>
    <div class="gauge-wrap" id="gauge">
      <svg class="gauge" viewBox="0 0 400 230" role="img" aria-label="Per-order fee gauge: suspiciously cheap at £0, CompEngine at 5 to 10p, overpaying at 17p and above">
        <defs><linearGradient id="ce-gauge" x1="0" x2="1"><stop offset="0" stop-color="#8978b1"/><stop offset=".35" stop-color="#f4a558"/><stop offset=".65" stop-color="#ec8a82"/><stop offset="1" stop-color="#8978b1"/></linearGradient></defs>
        <path class="track" d="M40 200 A160 160 0 0 1 360 200"/>
        <path class="fill" d="M40 200 A160 160 0 0 1 360 200"/>
        <path class="sweet" d="M126 87 A160 160 0 0 1 274 87"/>
        <text class="gl" x="40" y="226" text-anchor="start">£0 / order</text>
        <text class="gl" x="200" y="34" text-anchor="middle">5–10p</text>
        <text class="gl" x="360" y="226" text-anchor="end">17p+</text>
        <g class="needle" id="needle"><line x1="200" y1="200" x2="200" y2="70"/><circle cx="200" cy="200" r="9"/></g>
        <text class="gv" x="200" y="178" text-anchor="middle">per order</text>
      </svg>
      <div class="gauge-legend"><span><i style="background:#8978b1"></i>Suspiciously cheap</span><span><i style="background:var(--orange)"></i>CompEngine</span><span><i style="background:#8978b1"></i>Overpaying</span></div>
    </div>
    <div class="fee-cols">
      <div class="card fee warn">
        <h3><i class="ic" data-i="warn"></i>Suspiciously cheap</h3>
        <p class="intro">When £0-per-order is the headline… ask where the engineering budget comes from.</p>
        <ul><li><i class="ic" data-i="minus"></i>Venture-funded burn — fine until the runway ends</li><li><i class="ic" data-i="minus"></i>RNG certification renewals skipped</li><li><i class="ic" data-i="minus"></i>Changelog stalls 12 months after launch</li></ul>
        <p class="close">Cheap is expensive when the platform stops shipping.</p>
      </div>
      <div class="card fee mid">
        <h3><i class="ic" data-i="spark"></i>CompEngine — priced to keep shipping</h3>
        <p class="intro">Your fee funds the next feature. And the one after that.</p>
        <ul><li><i class="ic" data-i="check"></i><span><b>24 features shipped</b> in the last 12 months, included for everyone</span></li><li><i class="ic" data-i="check"></i>Never an upcharge, never a "Pro tier"</li><li><i class="ic" data-i="check"></i>GLI recertification and pen tests funded</li><li><i class="ic" data-i="check"></i>Fixed-fee options when you scale</li></ul>
        <p class="close">Your fee pays for the platform getting better while you sleep.</p>
      </div>
      <div class="card fee over">
        <h3><i class="ic" data-i="arrow-up"></i>Overpaying</h3>
        <p class="intro">When the headline is a high per-order fee… you're funding agency overhead.</p>
        <ul><li><i class="ic" data-i="minus"></i>Per-order rates that scale painfully with success</li><li><i class="ic" data-i="minus"></i>Game library locked to fixed presets</li><li><i class="ic" data-i="minus"></i>Per-customer onboarding overhead baked into your bill</li></ul>
        <p class="close">You're paying for their growth, not yours.</p>
      </div>
    </div>
  </div>
</section>
</template>
