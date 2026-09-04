<template>
<section id="comparison" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <h2>Side by side.</h2>
      <p class="sub">What actually moves the needle when you pick a platform — and where we win it.</p>
    </div>
    <div class="seg" role="group" aria-label="Compare against">
      <button type="button" data-cmp="saas" aria-pressed="true" data-track="comparison_vs_saas">vs Other SaaS</button>
      <button type="button" data-cmp="wp" aria-pressed="false" data-track="comparison_vs_wordpress">vs WordPress + plugins</button>
    </div>
    <div class="cmp" id="cmp">
      <table>
        <thead><tr><th>What matters</th><th class="ce">CompEngine</th><th id="cmp-other-head">Other SaaS</th></tr></thead>
        <tbody id="cmp-body"></tbody>
      </table>
    </div>
    <p class="assume" id="cmp-assume"></p>
    <div class="card verdict">
      <div class="verdict-copy">
        <span class="eyebrow"><i class="dot"></i>Why operators switch</span>
        <h3>Lower fee. Your own games. Draws you can prove. Everything included.</h3>
        <p>You pay 5–10p an order instead of 17p, run nine games nobody else has, show customers a hash they can verify, and never get upsold to a "Pro tier" — every feature ships to every operator the day it goes live.</p>
      </div>
      <div class="verdict-cta">
        <a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary" data-calendly data-track="comparison_book_demo">Book a 30-min demo</a>
        <button type="button" class="btn btn-ghost" id="cmp-pkg" data-track="comparison_open_builder">See the packages</button>
      </div>
    </div>
  </div>
</section>
</template>
