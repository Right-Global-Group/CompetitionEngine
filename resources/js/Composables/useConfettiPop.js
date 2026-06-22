const EMOJIS = ['🎉', '🎊', '✨', '⭐', '💎', '🪙', '🎰', '💰'];

export function popConfetti(originX, originY) {
    const count = 18;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-pop';
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const dx = (Math.random() - 0.5) * 320;
        const dy = -(120 + Math.random() * 220);
        const rot = (Math.random() - 0.5) * 720;
        el.style.left = originX + 'px';
        el.style.top = originY + 'px';
        el.style.setProperty('--cdx', dx + 'px');
        el.style.setProperty('--cdy', dy + 'px');
        el.style.setProperty('--crot', rot + 'deg');
        el.style.animationDelay = (Math.random() * 0.15) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1700);
    }
}

export function popConfettiFromEvent(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    popConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
}
