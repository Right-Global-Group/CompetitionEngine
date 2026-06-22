<script setup>
import { inject, computed } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText');
const { sectionRef, revealed } = useReveal();

function ft(key, fallback) {
    return getText(`fee.${key}`, fallback);
}

const eyebrow = computed(() => ft('eyebrow', 'Why our pricing is what it is'));
const titleBefore = computed(() => ft('title_before', "The cheapest platform isn't the best deal."));
const titleKeyword = computed(() => ft('title_keyword', "The most expensive isn't either."));
const lead = computed(() => ft('lead', "Below a certain price, platforms can't fund the engineering you'll need on draw night. Above it, you're paying for an agency markup. We're priced for the only thing that compounds your revenue — shipping the next feature, and the one after that."));

const cheapIcon = computed(() => ft('cheap_icon', '⚠️'));
const cheapTag = computed(() => ft('cheap_tag', 'Suspiciously cheap'));
const cheapH3 = computed(() => ft('cheap_h3', 'When £0-per-order is the headline…'));
const cheapP = computed(() => ft('cheap_p', '…ask where the engineering budget comes from. Somebody is paying for it. Eventually it\'ll be you.'));
const cheapItems = computed(() => [
    ft('cheap_li1', 'Often venture-funded burn — fine until the runway ends'),
    ft('cheap_li2', 'A "Pro tier" appears once you\'re operationally locked in'),
    ft('cheap_li3', 'Skeleton support team, founder-replies-on-weekends model'),
    ft('cheap_li4', 'No published independent pen-test budget'),
    ft('cheap_li5', 'RNG certification renewals are an expense the cheap option skips'),
    ft('cheap_li6', 'Changelog stalls 12 months after launch — count the dates'),
]);
const cheapBottom = computed(() => ft('cheap_bottom', 'Cheap is expensive when the platform stops shipping.'));

const usIcon = computed(() => ft('us_icon', '✦'));
const usTag = computed(() => ft('us_tag', 'CompEngine — priced to keep shipping'));
const usH3 = computed(() => ft('us_h3', 'Your fee funds the next feature.'));
const usP = computed(() => ft('us_p', 'And the one after that. Five years of consistent shipping. Every new feature included for every operator, automatically, the day it goes live.'));
const usItems = computed(() => [
    ft('us_li1', 'Every new feature included — never an upcharge, never a "Pro tier"'),
    ft('us_li2', '<strong>24 features shipped</strong> in the last 12 months, included for everyone'),
    ft('us_li3', 'GLI recertification cycle funded — your seal stays current'),
    ft('us_li4', 'Independent penetration test on a defined cycle'),
    ft('us_li5', 'The team you talk to ships the next feature themselves'),
    ft('us_li6', 'VCOC compliance updates automatic — no upgrade required'),
]);
const usBottom = computed(() => ft('us_bottom', 'Your fee pays for the platform getting better while you sleep.'));

const expensiveIcon = computed(() => ft('expensive_icon', '↑'));
const expensiveTag = computed(() => ft('expensive_tag', 'Overpaying'));
const expensiveH3 = computed(() => ft('expensive_h3', 'When the headline is a high per-order fee…'));
const expensiveP = computed(() => ft('expensive_p', '…you\'re funding the platform\'s agency overhead more than its engineering pipeline.'));
const expensiveItems = computed(() => [
    ft('expensive_li1', 'Per-order rates much higher than ours, scaling painfully with success'),
    ft('expensive_li2', 'Legacy infrastructure that hasn\'t been re-architected in years'),
    ft('expensive_li3', 'Game library locked to fixed presets — operators all look identical'),
    ft('expensive_li4', 'No Game Studio — your site looks like every other competitor\'s'),
    ft('expensive_li5', '"Closed-source as a security advantage" — auditors hate that argument'),
    ft('expensive_li6', 'Per-customer onboarding overhead baked into your bill'),
]);
const expensiveBottom = computed(() => ft('expensive_bottom', "You're paying for their growth, not yours."));
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="why-fee">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }}<br /><span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="fee-grid">
            <!-- Suspiciously cheap -->
            <div class="fee-col cheap">
                <div class="fee-col-tag"><span>{{ cheapIcon }}</span>{{ cheapTag }}</div>
                <h3>{{ cheapH3 }}</h3>
                <p>{{ cheapP }}</p>
                <ul>
                    <li v-for="(item, i) in cheapItems" :key="i" v-html="item"></li>
                </ul>
                <div class="fee-col-bottom">{{ cheapBottom }}</div>
            </div>

            <!-- CompEngine -->
            <div class="fee-col us">
                <div class="fee-col-tag"><span>{{ usIcon }}</span>{{ usTag }}</div>
                <h3>{{ usH3 }}</h3>
                <p>{{ usP }}</p>
                <ul>
                    <li v-for="(item, i) in usItems" :key="i" v-html="item"></li>
                </ul>
                <div class="fee-col-bottom">{{ usBottom }}</div>
            </div>

            <!-- Overpaying -->
            <div class="fee-col expensive">
                <div class="fee-col-tag"><span>{{ expensiveIcon }}</span>{{ expensiveTag }}</div>
                <h3>{{ expensiveH3 }}</h3>
                <p>{{ expensiveP }}</p>
                <ul>
                    <li v-for="(item, i) in expensiveItems" :key="i" v-html="item"></li>
                </ul>
                <div class="fee-col-bottom">{{ expensiveBottom }}</div>
            </div>
        </div>
    </section>
</template>
