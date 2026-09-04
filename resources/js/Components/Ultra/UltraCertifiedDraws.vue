<template>
<section id="certified-draws" class="cv">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><i class="dot"></i>Independently verifiable · GLI-certified RNG · UK VCOC compliant</span>
      <h2>Every winner, <span class="grad">provably fair.</span></h2>
      <p class="lead">Drawn by a GLI-certified RNG. Logged to a SHA-256 hash chain you can verify yourself.</p>
    </div>
    <div class="card theatre" id="theatre">
      <div class="th-head">
        <div><small class="muted">Live draw · demo</small><b id="th-prize">BMW M3 Competition Pack</b><span class="muted small">75,000 tickets · STAR DRAWS · 18 May 2026</span></div>
        <span class="tag green" id="th-status"><i class="dot green"></i>GLI RNG ready</span>
      </div>
      <div class="th-stage">
        <div class="ticket-big" id="ticket-big"><span class="tk-l">TICKET</span><div class="tumblers" id="tumblers"></div><span class="tk-r">STAR DRAWS</span></div>
        <div class="confetti" id="th-confetti" aria-hidden="true"></div>
        <div class="th-winner" id="th-winner"><i class="ic" data-i="check-c"></i><b>Winner: J. T***</b><span>Ticket #4,182 · Drawn 18 May 2026 14:02</span></div>
      </div>
      <div class="chain" id="chain" aria-label="Hash chain">
        <div class="blk"><small>Block 1</small><code>9c1e…a04b</code></div><i></i>
        <div class="blk"><small>Block 2</small><code>4f77…2be1</code></div><i></i>
        <div class="blk"><small>Block 3</small><code>b30d…7c9f</code></div><i></i>
        <div class="blk"><small>Block 4</small><code>e2a8…51d3</code></div><i></i>
        <div class="blk now"><small>This draw</small><code id="th-hash">sha256: …</code></div>
      </div>
      <div class="th-foot"><button type="button" class="btn btn-primary" id="th-draw" data-track="draws_run_demo">Run the draw</button><button type="button" class="btn btn-ghost" id="th-verify-toggle" aria-expanded="false" aria-controls="verify-wrap" data-track="draws_open_verify">Verify a real draw yourself</button></div>
    </div>
    <div class="verify-wrap" id="verify-wrap" hidden>
      <p class="lead" style="margin:28px 0 18px">Each card lists the hashes recorded against a real draw. Click Copy on any hash, paste it into that card's Verify box, and we'll reveal the exact winner, ticket number, prize, and draw timestamp it was recorded against. Or click any hash row to auto-fill the verifier.</p>
      <div class="draws" id="draws"></div>
    </div>
  </div>
</section>
</template>
