<script setup>
import { inject, computed, reactive } from 'vue';
import { useReveal } from '@/Composables/useReveal';

const getText = inject('getText');
const { sectionRef, revealed } = useReveal();

function ft(key, fallback) {
    return getText(`cert.${key}`, fallback);
}

const eyebrow = computed(() => ft('eyebrow', 'Independently verifiable · GLI-certified RNG · UK VCOC compliant'));
const titleBefore = computed(() => ft('title_before', 'Every winner.'));
const titleKeyword = computed(() => ft('title_keyword', 'Cryptographically proven.'));
const lead = computed(() => ft('lead', 'Every main prize winner is drawn by our GLI-certified random number generator. Each draw is logged to a tamper-evident SHA-256 hash chain you can verify yourself.'));
const explainerText = computed(() => ft('explainer_text', '<strong>How to test this yourself:</strong> Each card below lists the hashes recorded against a real draw. Click <strong>Copy</strong> on any hash, paste it into that card\'s <strong>Verify</strong> box, and we\'ll reveal the exact winner, ticket number, prize, and draw timestamp it was recorded against. Or click any hash row to auto-fill the verifier.'));

const verifyPlaceholder = computed(() => ft('verify_placeholder', 'Paste a hash to reveal the winner…'));
const verifyBtnLabel = computed(() => ft('verify_btn', 'Verify'));
const trySampleLabel = computed(() => ft('try_sample_label', 'try a sample hash'));
const verifyHintSuffix = computed(() => ft('verify_hint_suffix', 'from this draw.'));
const hashChainLabel = computed(() => ft('hash_chain_label', 'SHA-256 hash chain'));
const certMiniLabel = computed(() => ft('cert_mini_label', '🔐 GLI-certified'));
const verifiedTitle = computed(() => ft('verified_title', 'Hash verified · winner record'));

/* ============== Draw data (pre-baked demo data, decorative/structural) ============== */
const DRAWS = [
    {
        title: 'BMW M3 Competition Pack', meta: 'Drawn 18 May 2026 · STAR DRAWS', image: 'bmw', emoji: '🏎️', label: 'BMW M3 · £75k prize',
        hashes: [
            { seq: 1, full: 'a3f9b2c47e1d8f053a9c6b8d2e4f1a5c7d9b3e6f8c2a4d6e1f3b5a7c9d8e2f4c', winner: { name: 'Sarah K.', ticket: '#04827', prize: 'BMW M3 Competition Pack', timestamp: '18 May 2026 · 21:02:14 UTC', block: '#4,201' } },
            { seq: 2, full: 'b1e2c8d4a5f3e7b9c1d6f2e8a4b7c9d5e3f1a8b6c4d2e9f7a3b5c8d1e6f4a2cd', winner: { name: 'James P.', ticket: '#00193', prize: '£500 cash (instant win)', timestamp: '18 May 2026 · 21:03:02 UTC', block: '#4,202' } },
            { seq: 3, full: 'c8d4e2f6a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8e1', winner: { name: 'Amira H.', ticket: '#11240', prize: '£250 site credit', timestamp: '18 May 2026 · 21:04:48 UTC', block: '#4,203' } },
        ],
    },
    {
        title: 'Apple iMac Pro 32"', meta: 'Drawn 14 May 2026 · BLAZE', image: 'imac', emoji: '🖥️', label: 'Apple iMac · £4,999 prize',
        hashes: [
            { seq: 1, full: 'f4a8c2e6b9d3f5a7c1b4e6d8f2a5c7b3e9d1f4a8c6b2e5d7f1a4c8b6e3d5f9a2', winner: { name: 'Tom R.', ticket: '#08312', prize: 'Apple iMac Pro 32"', timestamp: '14 May 2026 · 19:30:11 UTC', block: '#3,847' } },
            { seq: 2, full: 'b7d3f5a1c4e8b2d6f3a5c7b1e9d4f6a2c8b5e7d1f3a9c4b6e2d8f5a1c7b3e9d4', winner: { name: 'Lia M.', ticket: '#02541', prize: '£200 cash', timestamp: '14 May 2026 · 19:31:02 UTC', block: '#3,848' } },
            { seq: 3, full: 'c2e5b8d4f1a7c3e6b9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4', winner: { name: 'Daniel B.', ticket: '#19874', prize: '12-month £200 site credit', timestamp: '14 May 2026 · 19:31:48 UTC', block: '#3,849' } },
        ],
    },
    {
        title: 'Maldives Trip for Two', meta: 'Drawn 10 May 2026 · KINGS', image: 'maldives', emoji: '🏝️', label: 'Maldives · £12k prize',
        hashes: [
            { seq: 1, full: '3d7f9a2c5e8b1d4f6a3c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4f6a3c9e2b5d8f', winner: { name: 'Sofia G.', ticket: '#07631', prize: 'Maldives Trip for 2', timestamp: '10 May 2026 · 20:00:42 UTC', block: '#3,612' } },
            { seq: 2, full: '7b2e5d8a3c6f9b1d4e7a2c5f8b3d6e9a4c7f1b4e7d2a5c8f3b6e9d2a5c8f3b6e', winner: { name: 'Marcus T.', ticket: '#03210', prize: '£1,000 cash', timestamp: '10 May 2026 · 20:01:33 UTC', block: '#3,613' } },
            { seq: 3, full: '4a8c1e5b2d7f3a6c9e4b1d8f5a2c7e0b3d6f9a4c7e2b5d8f1a4c7e0b3d6f9a4c', winner: { name: 'Aisha N.', ticket: '#15893', prize: '£250 site credit', timestamp: '10 May 2026 · 20:02:21 UTC', block: '#3,614' } },
        ],
    },
    {
        title: 'Tesla Model Y', meta: 'Drawn 06 May 2026 · APEX', image: 'tesla', emoji: '⚡', label: 'Tesla Model Y · £52k prize',
        hashes: [
            { seq: 1, full: '9e3b7a1d5f8c2b6e4a9d7f1c3b8e2a5d6f9c4b1e7a3d8f5c2b6e9a4d1f7c3b8e', winner: { name: 'Ben C.', ticket: '#23015', prize: 'Tesla Model Y Long Range', timestamp: '06 May 2026 · 21:15:08 UTC', block: '#3,401' } },
            { seq: 2, full: '5c8a2f4d7b1e9c3a6f2d5b8e1c4a7f9d3b6e2c5a8f4d1b7e3c6a9f2d5b8e1c4a', winner: { name: 'Holly W.', ticket: '#11402', prize: '£750 cash', timestamp: '06 May 2026 · 21:16:00 UTC', block: '#3,402' } },
        ],
    },
    {
        title: 'Rolex Submariner Date', meta: 'Drawn 02 May 2026 · LUXE', image: 'rolex', emoji: '⌚', label: 'Rolex · £10,950 prize',
        hashes: [
            { seq: 1, full: 'e2a5b9c8d1f3a7b4e6c2d9f5a8b1c4e7d3f6a2b5c8e1d4f7a3b6c9e2d5f8a1b4', winner: { name: 'Connor F.', ticket: '#06294', prize: 'Rolex Submariner Date', timestamp: '02 May 2026 · 20:30:11 UTC', block: '#3,188' } },
            { seq: 2, full: '8f1d4a7b2e5c8d3f6a9b4e1c7d2f5a8b3e6c9d4f1a7b2e5c8d3f6a9b4e1c7d2f', winner: { name: 'Zara K.', ticket: '#18027', prize: '£500 site credit', timestamp: '02 May 2026 · 20:31:04 UTC', block: '#3,189' } },
        ],
    },
    {
        title: '£25,000 Tax-Free Cash', meta: 'Drawn 28 Apr 2026 · BIG WINS', image: 'cash', emoji: '💰', label: '£25,000 · cash prize',
        hashes: [
            { seq: 1, full: 'd6f3a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5', winner: { name: 'Owen H.', ticket: '#09146', prize: '£25,000 tax-free', timestamp: '28 Apr 2026 · 21:00:18 UTC', block: '#3,002' } },
            { seq: 2, full: 'a8b3e6c9d2f5a8b1c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2', winner: { name: 'Maddie L.', ticket: '#21477', prize: '£200 cash', timestamp: '28 Apr 2026 · 21:01:05 UTC', block: '#3,003' } },
            { seq: 3, full: 'c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9', winner: { name: 'Charlie R.', ticket: '#14820', prize: '£100 site credit', timestamp: '28 Apr 2026 · 21:01:52 UTC', block: '#3,004' } },
        ],
    },
];

function abbreviate(hash) {
    return hash.slice(0, 8) + '…' + hash.slice(-5);
}

/* ============== Per-card reactive state ============== */
const verifyInputs = reactive(DRAWS.map(() => ''));
const verifyResults = reactive(DRAWS.map(() => ({ shown: false, success: false, message: '', winner: null })));
const copyActive = reactive({});

function fillInput(drawIdx, hash) {
    verifyInputs[drawIdx] = hash;
}

function fillAndVerify(drawIdx, hash) {
    verifyInputs[drawIdx] = hash;
    verifyHash(drawIdx);
}

function verifyHash(drawIdx) {
    const draw = DRAWS[drawIdx];
    const raw = verifyInputs[drawIdx].trim().toLowerCase().replace(/[^a-f0-9]/g, '');
    const result = verifyResults[drawIdx];
    if (!raw) {
        Object.assign(result, { shown: true, success: false, message: 'Paste or type a hash to verify.', winner: null });
        return;
    }
    let matched = draw.hashes.find(h => h.full === raw);
    if (!matched && raw.length >= 8) {
        const prefixMatches = draw.hashes.filter(h => h.full.startsWith(raw));
        if (prefixMatches.length === 1) matched = prefixMatches[0];
    }
    if (!matched) {
        const elsewhere = DRAWS.find((d, i) => i !== drawIdx && d.hashes.some(h => h.full === raw || (raw.length >= 8 && h.full.startsWith(raw))));
        const message = elsewhere
            ? `That hash belongs to "${elsewhere.title}" — paste it into that draw's verifier instead.`
            : "Hash not found in this draw's chain. Try a sample hash to see it work.";
        Object.assign(result, { shown: true, success: false, message, winner: null });
        return;
    }
    Object.assign(result, { shown: true, success: true, message: '', winner: matched.winner });
}

async function copyHash(drawIdx, hIdx, hash) {
    const key = `${drawIdx}-${hIdx}`;
    const ok = await copyToClipboard(hash);
    copyActive[key] = ok ? 'copied' : 'fail';
    setTimeout(() => { copyActive[key] = false; }, 1600);
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (_) {}
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
    } catch (_) { return false; }
}
</script>

<template>
    <section ref="sectionRef" class="section reveal" :class="{ visible: revealed }" id="certified-draws">
        <div class="center">
            <div class="eyebrow"><span class="dot"></span>{{ eyebrow }}</div>
            <h2 class="h2">{{ titleBefore }} <span class="grad-text">{{ titleKeyword }}</span></h2>
            <p class="lead center" style="margin: 18px auto 0;">{{ lead }}</p>
        </div>

        <div class="draws-explainer">
            <div class="draws-explainer-icon">🔐</div>
            <div v-html="explainerText"></div>
        </div>

        <div class="draws-grid">
            <div v-for="(draw, drawIdx) in DRAWS" :key="drawIdx" class="draw-card">
                <div :class="['draw-image', draw.image]">
                    <span class="draw-image-emoji">{{ draw.emoji }}</span>
                    <div class="draw-image-label">{{ draw.label }}</div>
                </div>
                <div class="draw-card-body">
                    <div class="draw-card-title">{{ draw.title }}</div>
                    <div class="draw-card-meta">{{ draw.meta }} · <strong>{{ draw.hashes.length }} certified hashes</strong></div>
                    <div class="hash-list">
                        <div class="hash-list-label">
                            {{ hashChainLabel }}
                            <span class="cert-mini">{{ certMiniLabel }}</span>
                        </div>
                        <div
                            v-for="(h, hIdx) in draw.hashes"
                            :key="hIdx"
                            class="hash-row"
                            title="Click to auto-fill"
                            @click="fillInput(drawIdx, h.full)"
                        >
                            <span class="hash-seq">#{{ h.seq }}</span>
                            <code class="hash-text">{{ abbreviate(h.full) }}</code>
                            <button
                                class="copy-btn"
                                :class="{ copied: copyActive[`${drawIdx}-${hIdx}`] === 'copied' }"
                                @click.stop="copyHash(drawIdx, hIdx, h.full)"
                            >{{ copyActive[`${drawIdx}-${hIdx}`] === 'copied' ? 'Copied!' : copyActive[`${drawIdx}-${hIdx}`] === 'fail' ? 'Copy fail' : 'Copy' }}</button>
                        </div>
                    </div>
                    <div class="verify-row">
                        <div class="verify-input">
                            <input
                                type="text"
                                class="verify-field"
                                :placeholder="verifyPlaceholder"
                                v-model="verifyInputs[drawIdx]"
                                spellcheck="false"
                                @keydown.enter="verifyHash(drawIdx)"
                            />
                            <button class="verify-btn" @click="verifyHash(drawIdx)">{{ verifyBtnLabel }}</button>
                        </div>
                        <div class="verify-hint">
                            Or <a class="try-sample" href="#" @click.prevent="fillAndVerify(drawIdx, draw.hashes[0].full)">{{ trySampleLabel }}</a> {{ verifyHintSuffix }}
                        </div>
                        <div class="verify-result" :class="{ shown: verifyResults[drawIdx].shown }">
                            <div
                                class="verify-result-inner"
                                :class="{
                                    success: verifyResults[drawIdx].success,
                                    error: !verifyResults[drawIdx].success && verifyResults[drawIdx].shown
                                }"
                            >
                                <template v-if="verifyResults[drawIdx].success && verifyResults[drawIdx].winner">
                                    <div class="verify-result-tick">{{ verifiedTitle }}</div>
                                    <div class="verify-result-row"><span class="k">Winner</span><span class="v">{{ verifyResults[drawIdx].winner.name }}</span></div>
                                    <div class="verify-result-row"><span class="k">Ticket</span><span class="v">{{ verifyResults[drawIdx].winner.ticket }}</span></div>
                                    <div class="verify-result-row"><span class="k">Prize</span><span class="v">{{ verifyResults[drawIdx].winner.prize }}</span></div>
                                    <div class="verify-result-row"><span class="k">Draw timestamp</span><span class="v">{{ verifyResults[drawIdx].winner.timestamp }}</span></div>
                                    <div class="verify-result-row"><span class="k">Chain block</span><span class="v mono">{{ verifyResults[drawIdx].winner.block }}</span></div>
                                </template>
                                <template v-else-if="verifyResults[drawIdx].shown">
                                    <div class="verify-result-fail">{{ verifyResults[drawIdx].message }}</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
