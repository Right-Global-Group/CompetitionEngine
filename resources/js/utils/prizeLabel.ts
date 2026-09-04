// Central instant-win label helpers.
//
// The customer-facing wording after a monetary prize MUST reflect how the
// prize is actually credited. A win credited as site credit must never read as
// "Cash" — the backend credits by `prize_type` (see
// CompetitionInstantWin::assignValidTicketsWithoutEvent: 'site_credit' credits
// the non-withdrawable wallet), but the admin-typed category title is free text
// (often "£20 CASH") and several games hardcoded the word "Cash". These helpers
// give every game one consistent, prize_type-driven label.

/** Money word shown after a monetary instant-win amount, driven by prize_type. */
export function creditWord(prizeType?: string | null): string {
    return prizeType === 'site_credit' ? 'Site Credit' : 'Cash';
}

/** Format a numeric value as GBP: whole numbers show no decimals, else 2dp. */
export function formatMoney(value: number | string | null | undefined): string {
    const v = Number(value ?? 0) || 0;
    return `£${v % 1 === 0 ? v : v.toFixed(2)}`;
}

/**
 * When a prize is credited as SITE CREDIT, returns "£X Site Credit" so the game
 * reveal matches where the money actually lands (the non-withdrawable wallet).
 *
 * Returns null for every other prize type (cash, physical, ticket bundle) and
 * for zero-value prizes, so callers keep their existing label untouched:
 *   siteCreditLabel(iw.prize_type, iw.value) ?? existingLabel
 */
export function siteCreditLabel(
    prizeType: string | null | undefined,
    value: number | string | null | undefined,
): string | null {
    if (prizeType !== 'site_credit') return null;
    const v = Number(value ?? 0) || 0;
    if (v <= 0) return null;
    return `${formatMoney(v)} Site Credit`;
}
