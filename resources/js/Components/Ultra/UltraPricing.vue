<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { initPackageBuilder } from '@/ultra/packageBuilder';

// The popup is teleported to <body> so nothing on the page can clip it.
// It is only rendered on the client, which keeps server-side rendering clean.
const clientReady = ref(false);
let builder = null;

onMounted(async () => {
    clientReady.value = true;
    await nextTick();
    builder = initPackageBuilder();
});

onBeforeUnmount(() => {
    if (builder) builder.destroy();
});
</script>

<template>
<div class="kinetic alt" aria-hidden="true"><div class="k-track" id="k-track2"></div></div>
<section id="pricing" class="cv">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow"><i class="dot"></i>Simple, transparent pricing</span>
      <h2>Packages from <span class="grad">5p per order.</span></h2>
      <p class="lead">Template builds and fully custom designs. Build your package in under a minute and see every number &mdash; build fee, per-order rate, what runs monthly. No "call us for pricing".</p>
      <p class="price-intro">Pay 5&ndash;10p per order while you're growing. Switch to flat-rate Enterprise when volume makes it cheaper. Most operators make that switch at around 20,000 orders per month.</p>
      <div class="pb-launch">
        <span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <button class="pb-open" type="button" id="pb-open" data-track="pricing_open_builder">Click here to view packages <span class="arw">&rarr;</span></button>
      </div>
      <p class="pb-hint">No sign-up and no details needed &mdash; you'll see the full package before you speak to anyone.</p>
    </div>
    <div class="card includes">
      <b>Every package includes:</b>
      <ul>
        <li><i class="ic" data-i="check"></i>All game types and instant wins</li>
        <li><i class="ic" data-i="check"></i>Entry lists</li>
        <li><i class="ic" data-i="check"></i>Upsells</li>
        <li><i class="ic" data-i="check"></i>Responsible Play options</li>
        <li><i class="ic" data-i="check"></i>Legal compliance &mdash; Terms &amp; Conditions</li>
        <li><i class="ic" data-i="check"></i>All future games and features</li>
        <li><i class="ic" data-i="check"></i>Gateway integration</li>
        <li><i class="ic" data-i="check"></i>Website notifications</li>
        <li><i class="ic" data-i="check"></i>Free site migration &mdash; users, wallets and competitions</li>
        <li><i class="ic" data-i="check"></i>No limits</li>
      </ul>
    </div>
  </div>
</section>

<Teleport v-if="clientReady" to="body">
<div class="pb-modal" id="pb-modal" hidden>
  <div class="pb-backdrop" data-pb-close></div>
  <div class="pb-dialog" role="dialog" aria-modal="true" aria-labelledby="pb-dialog-title" tabindex="-1">
    <h2 class="pb-sr" id="pb-dialog-title">Build your package</h2>
    <button class="pb-x" type="button" data-pb-close aria-label="Close">&times;</button>

    <div class="pb-includes">
      <div class="inc-statement">
        <p class="inc-big">Every package includes <span class="grad-text">every feature and game</span>.</p>
        <p class="inc-sub">Every game type, every instant win, every tool in the platform &mdash; plus everything we build from here. No tiers, no locked features, nothing to upgrade to. The only differences between the packages below are the design and how you pay.</p>
      </div>

    <div class="pb-wrap" id="pb">
      <div class="pb-head">
        <div class="pb-steps">
          <div class="pb-step active" data-step="1"><span class="n">1</span> Your build</div>
          <span class="pb-sep">&rarr;</span>
          <div class="pb-step" data-step="2"><span class="n">2</span> How you pay</div>
          <span class="pb-sep">&rarr;</span>
          <div class="pb-step" data-step="3"><span class="n">3</span> Your package</div>
        </div>
        <button class="pb-restart" id="pb-restart" type="button" hidden>Start over</button>
      </div>

      <div class="pb-body">

        <!-- STEP 1 -->
        <div class="pb-panel on" data-panel="1">
          <h3 class="pb-q">First &mdash; how do you want your site built?</h3>
          <p class="pb-sub">Same engine, same games, same support either way. The difference is whether you're keeping your costs down or standing entirely apart.</p>
        <div class="pb-allinc"><span class="tick">&#10003;</span> Every package includes <strong>every feature and game</strong></div>
          <div class="pb-choices pb-lean">
            <button class="pb-choice" type="button" data-build="template">
              <div class="pb-ico">&#9889;</div>
              <h4>Template Build</h4>
              <div class="pb-rate">From 5&ndash;10p<small>&nbsp;+ VAT per order</small></div>
              <div class="pb-blurb">To keep your costs down. A proven competition layout in your branding and colours &mdash; live in 1&ndash;2 weeks, without paying for design work from scratch.</div>
              <span class="pb-cta"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="pb-go">Choose Template Build <span class="arw">&rarr;</span></span></span>
            </button>

            <button class="pb-choice" type="button" data-build="custom">
              <div class="pb-ico">&#127912;</div>
              <h4>Custom Design</h4>
              <div class="pb-rate">From &pound;6,000<small>&nbsp;+ VAT</small></div>
              <div class="pb-plus">+ 5&ndash;10p + VAT per order</div>
              <div class="pb-blurb">For operators who want a fully unique design. Drawn from a blank page around your brand, so your site looks like nobody else's.</div>
              <span class="pb-cta"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="pb-go">Choose Custom Design <span class="arw">&rarr;</span></span></span>
            </button>
          </div>
          <span class="pb-hint">No sign-up and no details needed &mdash; you'll see the full package before you speak to anyone.</span>
        </div>

        <!-- STEP 2 -->
        <div class="pb-panel" data-panel="2">
          <h3 class="pb-q">How do you want to pay for the platform?</h3>
          <p class="pb-sub" id="pb-step2-sub"></p>
        <div class="pb-allinc"><span class="tick">&#10003;</span> Every package includes <strong>every feature and game</strong></div>
          <div class="pb-choices three" id="pb-plans"></div>
          <p class="pb-note" style="text-align:center;max-width:640px;margin:22px auto 0;">Every plan also carries a &pound;200 + VAT a month server &amp; support fee &mdash; hosting, monitoring, updates and a real person to call.</p>
          <div class="pb-backwrap"><button class="pb-back" type="button" data-back="1">&larr; Change build type</button></div>
        </div>

        <!-- STEP 3 -->
        <div class="pb-panel" data-panel="3">
          <h3 class="pb-q">Your package</h3>
          <p class="pb-sub">Build fee, platform rate and support &mdash; the lot. Nothing new appears on the call.</p>
          <div class="pb-summary">
            <div class="pb-sum-card" id="pb-sum-card"></div>
            <div class="pb-actions">
              <a href="#booking" class="btn btn-primary btn-large" id="pb-book" data-track="pricing_builder_book">Book my call with this package &rarr;</a>
              <a href="#game-studio" class="btn btn-ghost btn-large">Try Game Studio first</a>
            </div>
            <p class="pb-note">All fees exclude VAT. The &pound;200 a month server &amp; support fee starts when your site goes live, not when you sign. Per-order fees are charged on paid orders only &mdash; free postal entries are never charged for. Your exact per-order rate is confirmed in writing before you sign; nothing is taken until you do.</p>
          </div>
          <div class="pb-backwrap"><button class="pb-back" type="button" data-back="2">&larr; Change plan</button></div>
        </div>

      </div>
    </div>


    </div>
  </div>
</div>
</Teleport>
</template>
