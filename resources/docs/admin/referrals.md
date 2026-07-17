# Referrals

> Configure and manage the Refer a Friend programme — rewards, terms, approvals, and reporting.

---

## Overview

Refer a Friend lets existing customers invite friends using a personal referral link. When a friend signs up and makes a qualifying purchase, both the referrer and the friend can be rewarded. The **Referrals** admin area has three tabs: **Referrals** (list and reporting), **Influencers**, and **Settings**.

{% hint style="info" %}
The Referrals sidebar item and the customer-facing page only appear once the programme is fully switched on — see [Turning the programme on](#turning-the-programme-on) below.
{% endhint %}

---

## Turning the programme on

The **"Show referral programme to customers"** checkbox on the **Settings** tab controls whether customers can see and use the programme. Leave it off while you finish configuring rewards and terms, then switch it on when you're ready to go live.

The programme cannot be switched on for customers without a **published Terms & Conditions page** selected (see below) — the system blocks saving Settings with the display flag on until a terms page is chosen.

{% hint style="info" %}
If the Referrals area doesn't appear in your sidebar at all, the programme hasn't been provisioned for this site — contact the platform team.
{% endhint %}

---

## Settings

### Audience

Choose who can see and use the programme:

- **Everyone** — all logged-in customers get a referral link.
- **Influencers only** — hidden from regular customers; only people you've marked as an Influencer see the page and link. A friend who already has a reward waiting can still reach the page even if they aren't an influencer themselves.

### Rewards

| Field | What it does |
|---|---|
| **Reward type** | **Site credit** (spend-only) or **Cash** (withdrawable, subject to the usual withdrawal controls). |
| **Referrer reward** | Amount paid to the person who shared their link. |
| **Referred-friend reward** | Amount paid to the friend who signed up. |

Setting either amount to £0 disables that side entirely — no wallet credit and no notification is sent for that side.

### Qualifying purchase & minimum spend

A referral only converts on an **approved order paid by card or PayPal with a positive total** (after any coupon) — free entries and orders paid entirely from wallet/site credit never qualify.

You can also set a **minimum spend** threshold:

- **Off (£0)** — any qualifying purchase converts.
- **Single order** — one order must meet the threshold on its own.
- **Cumulative spend** — the friend's running total across qualifying orders must reach the threshold.

### Guardrails

| Field | What it does |
|---|---|
| **Hold period (days)** | How long a reward sits as **Held** before it's automatically released. `0` releases instantly. |
| **Require manual approval** | Forces every referral into an approval queue instead of auto-releasing. |
| **Max referrals per referrer** | Caps how many *rewarded* referrals one person can earn from. `0` = unlimited. Once someone hits their cap, further signups via their link still register but aren't rewarded. |

{% hint style="warning" %}
If **Reward type** is Cash, a minimum 14-day hold and manual approval are enforced automatically, regardless of what you set — this is a refund/chargeback safety buffer. The Settings page shows this live in a preview panel when Cash is selected.
{% endhint %}

### Post-purchase pop-up

Controls the modal shown on the order-confirmation page nudging a customer to share their link:

- **Frequency** — Every order, Once (per customer), Once a day / week / fortnight / month, or Off.
- **Title** and **body text** — optional custom copy; falls back to built-in wording if left blank.

### Terms & conditions

A dropdown of **published** pages only (drafts are filtered out here and everywhere the gate is checked). Selecting **"— No terms gate —"** turns off the consent requirement entirely.

{% hint style="warning" %}
If a page you'd selected here is later unpublished or deleted, the Settings page shows a warning and clears the selection — the programme can't stay "live" pointing at a page that no longer exists.
{% endhint %}

Only the **referrer** has to accept these terms — a friend who signs up via a referral link does **not** need to accept anything before their reward can pay out.

---

## The Referrals list

The main tab shows every referral, filterable by **status**, **source channel** (WhatsApp, Instagram, TikTok, Email, Copy, Direct, etc.), and **date range**. Each row shows the referrer, the friend, the referral code used, the channel, current status, the qualifying order, and reward amounts on each side.

### Reporting

Above the list, a dashboard shows:

- **Funnel**: total clicks → signups → rewarded, with conversion and signup rates — overall and broken down per channel.
- **Top Referrers** leaderboard (clicks, referrals, rewarded count, conversion rate, amount earned).
- **Recent activity** — the last 15 referrals.
- **Reward economics** — total paid out, split referrer-side vs friend-side.
- **Average time to convert**.
- **Health counters** flagging things that may need attention: referrals pending signup-to-purchase for 30+ days, held referrals overdue for release, approvals waiting 7+ days, and anything currently flagged for abuse.
- **Influencer commission liability** — total owed-now and held commission across all influencers.

### Referral statuses

| Status | Meaning |
|---|---|
| **Pending** | Friend has signed up but not yet made a qualifying purchase. |
| **Awaiting Approval** | Qualifying purchase made; sitting in the manual review queue. |
| **Held** | Qualifying purchase made; waiting out the configured hold period before auto-release. |
| **Rewarded** | Both sides (where applicable) have been credited. |
| **Rejected** | Declined by an admin, or automatically voided (e.g. the qualifying order was refunded before it paid out). |

### Referral detail

Opening a referral shows its full record: status, code, reward amounts, the qualifying order, a timeline (referred, converted, held-until, rewarded/rejected dates), the rejection reason if any, and the abuse flag/reason if any. If it was created via manual linking, who linked it and why is shown too.

From here you can:

- **Approve** or **Reject** (with a reason) a referral awaiting approval.
- **Release early** a held referral — this runs the same check the nightly release job uses (the qualifying order must still be approved), so it either pays out or voids the referral; it can't force payment on a bad order.

---

## Per-user controls

From a customer's profile (or the referral detail page) you can:

- **Reset referral code** — immediately kills their existing link. Referrals already recorded against the old code are unaffected.
- **Disable participation** — their link stops working and stops tallying clicks.
- **Re-enable** a previously disabled customer.

---

## Manual linking

If attribution gets lost — for example a link was shared inside a chat app and the friend opened the site in a different browser — you can manually link a referral. Search for the referrer and the friend, give a reason, and the system creates the referral and replays the friend's existing approved orders (oldest first) through the normal reward pipeline, so minimum spend, abuse screening, hold and approval all still apply.

Manual linking is blocked if the referrer and friend are the same person, share an email address, the friend already has a referral on record, the referrer is disabled, or the referrer has hit their referral cap.

---

## Fraud & abuse handling

- **Automatic blocks** — a referral is never created at all if the referrer and friend are the same person, share an email, the friend already has a referral on record, the referrer is disabled or over their cap, or (for organic signups) the friend already had orders before signing up.
- **Abuse screening** — at the moment an order qualifies, the system checks for shared signals between referrer and friend: same address, same saved card, or same payout bank account. A match doesn't block the referral outright (a shared household address can be entirely legitimate) — it **flags** it and routes it into the manual approval queue for a human decision.
- **Click-fraud filtering** — link-preview crawlers (from WhatsApp, Facebook, Slack, Google, etc. auto-generating link previews) are excluded from click counts and never trigger attribution, so click stats reflect real visitors.

---

## Refunds

If a qualifying order is refunded or archived while its referral is still **Held** or **Awaiting Approval**, the referral is automatically voided. If the reward had already paid out before the refund landed, nothing is automatically clawed back — the referral is flagged for manual review so an admin can decide how to handle it.

---

## Influencers

A related programme for people you want on an ongoing commission arrangement rather than a one-off reward. From the **Influencers** tab you can promote any customer to Influencer and configure, per person:

| Field | What it does |
|---|---|
| **Commission rate (%)** | Share of every qualifying order their referred friends make — not just the first one, and with no minimum-spend gate. An influencer with no rate set earns nothing until this is configured. |
| **Withdrawal threshold (£)** | Minimum accrued balance before they can request a payout. Leave blank for no minimum. |
| **Gets flat reward** | By default, an influencer's one-off referrer bonus is switched off in favour of ongoing commission. Turn this on to pay both. |
| **Flat reward override (£)** | Optional per-influencer amount that overrides the standard referrer reward for this person. |

Revoking an influencer stops future commission immediately (their already-earned balance is untouched) and resets their referral code so old links stop working. Payout requests submitted by influencers appear in an approval queue on this tab.

---

## Permission

The Referrals area requires the **manage-referrals** permission, granted by default to Admin and Super Admin roles.
