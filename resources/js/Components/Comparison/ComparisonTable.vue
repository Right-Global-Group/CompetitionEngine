<script setup>
import { inject, computed, ref } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText', (key, fallback = '') => fallback);
const { sectionRef, revealed } = useReveal();

function ct(key, fallback) {
    return getText(`cmp.${key}`, fallback);
}

const eyebrow = computed(() => ct('eyebrow', 'Side by side'));
const titleMain = computed(() => ct('title', 'How we stack up.'));
const lead = computed(() => ct('lead', 'Pick what you\'re considering. We\'ll show you the differences that actually move the needle.'));

/* ============== Tab data (structural/demo data — not admin-managed) ============== */
const TABLES = {
    rafflex: {
        tabLabel: ct('tab_rafflex', 'vs Other SaaS'),
        name: ct('tab_rafflex_name', 'Other SaaS'),
        rows: [
            ['Years operating in this category', '5+ years', '4+ years'],
            ['Per-order fee', '5–10p', '17p'],
            ['Game customisation', 'Game Studio — build your own', '7+ fixed presets'],
            ['Independent penetration test', 'Yes — published', 'Not published'],
            ['Separate Cash + Site Credit wallets', 'Yes', 'Not advertised'],
            ['RNG / draw certification', 'GLI', 'GLI Verified'],
            ['VCOC alignment in product', 'Built in from launch', 'Added recently'],
            ['Public order / ticket numbers (30d)', '245k orders / 13.25M tickets', 'Not published'],
        ],
    },
    flat: {
        tabLabel: ct('tab_flat', 'vs flat-fee platforms'),
        name: ct('tab_flat_name', 'Other UK platforms with big flat fees'),
        rows: [
            ['Years operating in this category', '5+ years', 'Newer entrants (typically <2 yrs)'],
            ['Entry pricing', '5–10p per order — pay only when you sell', '£499/month from day one, before a ticket is sold'],
            ['Pricing for small operators (<5k orders/mo)', '£25–£500/month', '£499/month flat'],
            ['Pricing for scaling operators (50k+ orders/mo)', '£2,000/month flat', '£1,299–£1,499/month flat'],
            ['Game customisation', 'Game Studio — build your own', 'Fixed reveal animations'],
            ['Wallet model', 'Cash + Site Credit (separate)', 'Single wallet (mixed funds)'],
            ['Track record at real volume', '245k orders / 13.25M tickets last 30d', 'Limited public operating numbers'],
            ['UK VCOC signatory', 'Yes — from launch', 'Yes (typical)'],
        ],
    },
    wp: {
        tabLabel: ct('tab_wp', 'vs WordPress + plugins'),
        name: ct('tab_wp_name', 'WordPress + plugins'),
        rows: [
            ['Setup', 'Hosted platform, zero plugins', '25+ plugins, fragile stack'],
            ['Performance', 'Single-page app, instant browsing', 'Plugin-throttled, full reloads'],
            ['Payment integration', 'UK-licensed gateway, fully integrated', 'Bolt-on payment plugin'],
            ['Compliance with UK VCOC', 'System-enforced from launch', 'Manual, plugin-dependent'],
            ['Hosting costs at scale', 'Included', '£2k+/mo dedicated servers (real customer case)'],
            ['Security updates', 'Continuous, managed', 'You patch every plugin yourself'],
            ['Free-entry compliance', 'Built in, automated', 'Manual, hand-rolled'],
        ],
    },
};

const TAB_KEYS = ['rafflex', 'flat', 'wp'];
const activeTab = ref('rafflex');
const currentTable = computed(() => TABLES[activeTab.value]);
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="comparison">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleMain }}</h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div style="margin-top: 40px;">
            <div class="cmp-tabs">
                <button
                    v-for="key in TAB_KEYS"
                    :key="key"
                    class="cmp-tab"
                    :class="{ active: activeTab === key }"
                    @click="activeTab = key"
                >{{ TABLES[key].tabLabel }}</button>
            </div>
            <div style="overflow-x: auto;">
                <table class="cmp-table">
                    <thead>
                        <tr>
                            <th style="width:34%">Feature</th>
                            <th style="width:33%; color:var(--orange)">CompEngine</th>
                            <th style="width:33%">{{ currentTable.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in currentTable.rows" :key="i">
                            <td>{{ row[0] }}</td>
                            <td class="us" data-label="CompEngine">{{ row[1] }}</td>
                            <td class="them" :data-label="currentTable.name">{{ row[2] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
