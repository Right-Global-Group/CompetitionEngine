# Checkout Flow

> How purchases work end-to-end — from adding tickets to your basket through to instant wins, cashback, and ticket assignment.

---

## Overview

The checkout process handles everything from reserving your tickets to confirming your payment and crediting any prizes you've won. The steps below describe the full flow in the order they happen.

---

## Step 1 — Adding to Basket

When you click **Get Tickets Now** on a competition page, your selected tickets are added to the basket. At this point nothing is reserved or charged — the basket is just a holding area in your browser session.

You can add tickets from multiple competitions before checking out.

---

## Step 2 — Reaching Checkout

When you proceed to checkout the platform validates your basket before showing the payment page. Any competitions that have ended since you added them are automatically removed. If a competition's available tickets have dropped below your requested quantity, your quantity is reduced to what's left. If the basket becomes empty, you are returned to the basket page.

A billing address is required to complete checkout. If you don't have one saved, you'll be prompted to add it before proceeding.

---

## Step 3 — Ticket Reservation

As soon as your order is created (when you click to pay), your tickets are reserved. Reserved tickets are held for 5 minutes. During this window they are locked to your session — no other customer can purchase them.

For **Pick Your Number** competitions, you choose your ticket numbers yourself. Your selection is reserved for 5 minutes from when you pick it, and a countdown is shown at checkout so you can see how long you have left.

If the reservation expires before payment is confirmed (for example if you leave the payment page for too long), the tickets are released back into the pool and the order is cancelled. You can start again from the competition page.

---

## Step 4 — Payment Methods

**Card** — enter your card details directly in the secure payment form. Your raw card number is never stored by Competition Engine. You can save your card after a successful payment for faster checkout next time.

**3D Secure (3DS)** — most card payments trigger a 3DS challenge where your bank asks you to verify the transaction via your banking app or a one-time code. This happens inside a popup and resolves automatically once confirmed.

**Wallet** — your withdrawable cash balance is deducted immediately with no card or redirect needed.

**Site Credit** — non-withdrawable site credit is used first whenever you pay by wallet. If you have both site credit and cash, site credit is drawn down first.

**Split Payment** — if your wallet balance covers only part of the total, you can split the payment. Your full wallet balance is applied and you pay the remainder by card. If the card portion fails, your wallet amount is automatically refunded.

**Google Pay** — processed through the card infrastructure. Your device authenticates the payment using fingerprint, face recognition, or passcode.

**Apple Pay** — same as Google Pay. Available on supported Apple devices and browsers.

**Saved Cards** — previously saved cards can be selected at checkout without re-entering card details. A CVV is required to confirm. 3DS may still be triggered by your bank.

**Free orders** — if your entire order is covered by a free entry assignment, no payment is taken. Tickets are reserved and assigned immediately.

---

## Step 5 — Payment Confirmation

Once your payment is confirmed by the provider, the order is marked as approved. This can happen via two routes:

**Browser callback** — after payment you are redirected back to the site and the order confirmation page is shown.

**Server notification** — the payment provider also sends a direct server-to-server notification confirming the payment. This ensures your order is captured even if your browser connection drops after paying.

Both routes are handled independently. If your browser disconnects mid-payment, the server notification still processes your order in the background.

---

## Step 6 — Ticket Assignment

Immediately after your payment is confirmed, your reserved tickets are permanently assigned to your account. You can view them in **My Account → My Tickets** at any time.

Ticket assignment is protected against duplicate processing — if a payment confirmation arrives more than once (for example, a browser refresh on the confirmation page), tickets are only assigned once.

---

## Step 7 — Instant Wins

After your tickets are assigned, the platform checks each ticket against the instant win pool for that competition. This happens automatically as part of the order confirmation process.

If any of your tickets match an instant win prize, a winner record is created immediately. What happens next depends on the prize type:

| Prize type | What happens |
|-----------|-------------|
| **Cash** | The prize value is credited to your wallet as withdrawable cash immediately. |
| **Site credit** | The prize value is added to your site credit balance immediately. |
| **Physical prize** | A notification is sent to you. You go to **Claim Prizes** to choose how to receive the prize — cash alternative, site credit, or physical shipment. |

You are notified of any wins on the order confirmation page and by email. Instant wins from digital wallet payments (Apple Pay, Google Pay) are processed in the background immediately after payment confirmation.

---

## Step 8 — Cashback

If a cashback promotion is active and your order qualifies, cashback is calculated and credited after instant wins are processed. Cashback only applies to the card portion of a payment — wallet-only orders are not eligible.

Cashback may be credited as withdrawable cash or as site credit depending on the promotion configuration.

---

## Step 9 — Order Confirmation

Once all steps are complete you are shown the order confirmation page. This confirms your tickets have been assigned and shows any instant win prizes you have won and any cashback earned.

---

## What happens if payment fails

If your payment is declined or you cancel during 3DS, the order is marked as failed and your reserved tickets are released back into the pool. You can return to the competition page and try again.

For split payments, if the card portion fails after your wallet balance has been deducted, the wallet amount is automatically refunded back to your balance.

---

## Payment timeline summary

```
Add tickets to basket
        ↓
Proceed to checkout
        ↓
Tickets reserved (5-minute window)
        ↓
Enter payment details
        ↓
Payment confirmed by provider
        ↓
Tickets permanently assigned to your account
        ↓
Instant wins checked and prizes credited
        ↓
Cashback calculated and credited (if applicable)
        ↓
Order confirmation shown + email sent
```