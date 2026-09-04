<template>
<div class="ce-sticky" id="sticky" aria-hidden="true">
  <div class="row"><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary" data-calendly data-track="sticky_book_demo">Book a Demo</a><button type="button" class="btn btn-ghost" id="sticky-pkg" data-track="sticky_open_builder">Packages</button></div>
  <div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC</span></div>
</div>
<div class="ce-float" id="float-pkg" aria-hidden="true">
  <span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  <button type="button" class="pb-open" id="float-pkg-btn" data-track="float_open_builder">Click here to view packages <span class="arw">&rarr;</span></button>
</div>
<div class="ce-exit" id="exit" role="dialog" aria-label="Before you go" aria-hidden="true">
  <button type="button" class="x" id="exit-x" aria-label="Dismiss"><i class="ic" data-i="x"></i></button>
  <b>Before you go — see the full package price in 60 seconds</b>
  <span class="muted small">Three questions. No email required.</span>
  <button type="button" class="btn btn-primary" id="exit-open" data-track="exit_open_builder">Open the package builder</button>
</div>


<!-- ===================== #pb-modal (STAND-IN, direct child of body) ===================== -->
</template>
