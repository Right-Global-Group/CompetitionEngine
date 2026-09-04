<template>
<section id="booking" class="cv">
  <div class="wrap">
    <div class="book">
      <div class="copy">
        <h2>Get started today.</h2>
        <p class="sub">Ready to launch your competition on the UK's most intelligent platform?</p>
        <p>30 minutes. A live demo on your brief. No sales deck, no NDAs, no obligation. Just the platform running with your prize, your game type, your brand — so you can see exactly what you'd be launching.</p>
        <div class="ticks"><span><i class="ic" data-i="check-c"></i>Live in 1–2 weeks</span><span><i class="ic" data-i="check-c"></i>Free site migration</span><span><i class="ic" data-i="check-c"></i>Every feature included</span></div>
        <p id="pb-cta-tag" aria-live="polite"></p>
      </div>
      <form class="card form" id="lead-form" novalidate>
        <div class="fields" style="display:grid;gap:12px">
          <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required><span class="msg"></span></div>
          <div class="field"><label for="f-biz">Business / site name</label><input id="f-biz" name="business" type="text" autocomplete="organization" required><span class="msg"></span></div>
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required><span class="msg"></span></div>
          <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="07xxx xxxxxx" required><span class="msg"></span></div>
          <div class="field"><label for="f-platform">Current platform</label><select id="f-platform" name="current_platform" required><option value="">Choose one</option><option>WordPress + plugins</option><option>Another SaaS platform</option><option>Agency-built site</option><option>Nothing yet</option></select><span class="msg"></span></div>
          <div class="field"><label for="f-orders">Monthly orders</label><select id="f-orders" name="monthly_orders" required><option value="">Choose one</option><option>Not live yet</option><option>Under 1,000</option><option>1,000–5,000</option><option>5,000–20,000</option><option>20,000+</option></select><span class="msg"></span></div>
          <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign"><input type="hidden" name="utm_content"><input type="hidden" name="utm_term"><input type="hidden" name="gclid"><input type="hidden" name="fbclid"><input type="hidden" name="landing_variant"><input type="hidden" name="package" id="f-package">
          <button type="submit" class="btn btn-primary btn-lg" data-track="booking_form_submit">Book my 30-min demo →</button>
          <p class="alt">Prefer to pick a time now? <a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" data-calendly data-track="booking_open_calendar">Open the calendar</a></p>
          <div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI certified</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC signatory</span></div>
        </div>
        <div class="thanks"><i class="ic" data-i="check-c"></i><h3>Got it. Pick your slot.</h3><p class="muted">We've saved your details — choose a 30-minute time that suits you.</p><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary btn-lg" data-calendly data-track="booking_thanks_calendly">Choose a time on Calendly</a></div>
      </form>
    </div>
    <p class="trust-note">Entering a competition powered by CompEngine? Every draw is GLI-certified. Every winner is verifiable. Every order runs through a UK-licensed payment gateway. If something goes wrong, the operator has a real platform behind them — not a stack of plugins.</p>
  </div>
</section>
</template>
