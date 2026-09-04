<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const user = computed(() => page.props.auth?.user || null);
const accountHref = computed(() => (user.value?.is_admin ? '/admin' : '/dashboard'));
const calendly = 'https://calendly.com/contact-compengine/30min';
</script>

<template>
<nav class="ce-nav" aria-label="Main">
  <div class="wrap">
    <a href="#hero" class="logo" aria-label="CompEngine home">
      <span class="gear"><img src="/images/logo.svg" alt="" @error="$event.target.remove()"><span class="gear-svg" data-gear></span></span>
      <span class="grad">COMPENGINE</span>
    </a>
    <div class="nav-links">
      <a href="#hero">Home</a><a href="#game-studio">Games</a><a href="#ecosystem">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="/about">About</a><a href="/blog">Blog</a><a href="#booking">Contact</a>
    </div>
    <div class="nav-cta">
      <a v-if="user" :href="accountHref" class="btn btn-ghost btn-sm nav-login" data-track="nav_account">{{ user.name }}</a>
      <a v-else href="/login" class="btn btn-ghost btn-sm nav-login" data-track="nav_login">Login</a>
      <a :href="calendly" target="_blank" rel="noopener" class="btn btn-sm btn-book" data-track="nav_book_demo" data-calendly>Book a Demo</a>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i class="ic" data-i="menu"></i></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="#hero">Home</a><a href="#game-studio">Games</a><a href="#ecosystem">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="/about">About</a><a href="/blog">Blog</a><a href="#booking">Contact</a>
    <a v-if="user" :href="accountHref">{{ user.name }}</a>
    <a v-else href="/login">Login</a>
  </div>
</nav>
</template>
