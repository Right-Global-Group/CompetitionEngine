<script setup>
const year = new Date().getFullYear();
</script>

<template>
    <footer>
        <div class="for-entrants">
            <strong>Entering a competition powered by CompEngine?</strong>
            Every draw is GLI-certified. Every winner is verifiable. Every order runs through a UK-licensed payment gateway.
            If something goes wrong, the operator has a real platform behind them — not a stack of plugins.
        </div>
        <div>© {{ year }} CompEngine. Built quietly in the UK.</div>
    </footer>
</template>

<style scoped>
footer {
    border-top: 1px solid rgba(178, 151, 219, 0.18);
    margin-top: 80px;
    padding: 32px 28px;
    text-align: center;
    color: #8978b1;
    font-size: 13px;
}

.for-entrants {
    max-width: 900px;
    margin: 0 auto 24px;
    padding: 20px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(178, 151, 219, 0.18);
    text-align: left;
    font-size: 13px;
    color: #bba6d8;
    line-height: 1.65;
}

.for-entrants strong {
    color: #ffffff;
}

@media (max-width: 700px) {
    footer {
        padding: 26px 18px;
        margin-top: 20px;
    }
    .for-entrants {
        padding: 16px;
        font-size: 12px;
    }
}
</style>
