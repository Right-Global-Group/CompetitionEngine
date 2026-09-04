/**
 * Game key → player component, mirroring VincentVanGogh's games/registry.ts.
 * Dynamic imports keep each game in its own chunk; the homepage only loads a game
 * when one of its tiles scrolls into view.
 */
export const gamePlayers = {
    slots: () => import('@/Components/Games/SlotsModal.vue'),
    scratchy: () => import('@/Components/Games/ScratchyModal.vue'),
    spinny: () => import('@/Components/Games/SpinnyModal.vue'),
    bingo: () => import('@/Components/Games/BingoModal.vue'),
    coindrop: () => import('@/Components/Games/CoinDropModal.vue'),
    popgame: () => import('@/Components/Games/PopGameModal.vue'),
    football: () => import('@/Components/Games/FootballModal.vue'),
    fishing: () => import('@/Components/Games/FishingModal.vue'),
    ticketeater: () => import('@/Components/Games/TicketEaterModal.vue'),
};

/** Sample prizes so every preview shows the real "prize image + value" behaviour. */
const PRIZE_IMG = (symbol, bg) =>
    'data:image/svg+xml,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" rx="22" fill="${bg}"/><text x="60" y="80" font-size="60" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" fill="#ffffff">${symbol}</text></svg>`
    );

export const demoCategories = [
    { id: 1, name: '£500 Cash', value: 500, image_path: PRIZE_IMG('£', '#16a34a'), available: 2 },
    { id: 2, name: 'Gift Voucher', value: 50, image_path: PRIZE_IMG('★', '#7c3aed'), available: 5 },
    { id: 3, name: 'Free Entry', value: 10, image_path: PRIZE_IMG('✓', '#0ea5e9'), available: 9 },
];

export function makeDemoTickets(count = 10) {
    return Array.from({ length: count }, (_, i) => {
        const hasPrize = i % 3 === 0;
        const cat = demoCategories[((i / 3) | 0) % demoCategories.length];
        return {
            id: i + 1,
            number: String(i + 1).padStart(3, '0'),
            competition_id: 0,
            instant_win: hasPrize ? { id: i + 1, prize: cat.name, category_id: cat.id, value: cat.value } : false,
        };
    });
}
