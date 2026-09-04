<template>
<section id="comparison" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <h2>Side by side.</h2>
      <p class="sub">How we stack up.</p>
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
  </div>
</section>
</template>
