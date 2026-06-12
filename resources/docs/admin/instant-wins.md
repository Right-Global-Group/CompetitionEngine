# Instant Wins

> Configure prize categories and monitor instant win activity across competitions.

---

## Overview

Instant wins are prizes distributed randomly across a competition's ticket pool. When a customer purchases a ticket that has been pre-assigned an instant win, they win that prize immediately — no draw required.

Instant win **categories** define the prize types available on the platform. When you set up a competition, you choose which categories to attach and how many tickets in that competition should trigger each prize.

---

## Instant Win Categories

Categories are the master list of prize types. Each category is reused across as many competitions as you like.

### Category fields

| Field | Description |
|-------|-------------|
| **Title** | The prize name shown to customers (e.g. "£10 Cash", "AirPods Pro") |
| **Value** | The monetary value of the prize |
| **Prize Type** | How the prize is paid out (see below) |

### Prize types

| Type | How it works |
|------|-------------|
| **Cash** | The prize value is credited directly to the winner's cash wallet |
| **Physical** | A physical item is dispatched to the winner. Can optionally offer a cash or site credit alternative |
| **Site Credit** | Non-withdrawable credit added to the winner's account |
| **Ticket Bundle** | The winner receives free tickets to another competition |

---

## Attaching instant wins to a competition

Instant win categories are attached during competition setup. When you add a category to a competition you specify the **quantity** — how many tickets across the pool will trigger that prize.

Once the competition is published, the platform distributes the instant win tickets randomly across the pool. Customers don't know in advance which tickets carry a prize.

{% hint style="warning" %}
Instant win quantities are locked once any tickets have been sold. You can reorder their display position but cannot add, remove or change quantities after that point.
{% endhint %}

---

## Monitoring instant wins

The Instant Wins admin page shows a live view of all instant win prizes across competitions, including:

- Which prizes have been triggered
- Which customer won each prize
- Whether the prize has been paid out
- The ticket number that triggered the win
- The competition and category associated with each win

### Filtering

You can filter the instant wins list by competition, prize status (claimed / unclaimed), and date range.

---

## Unclaimed prizes

When a physical prize or ticket bundle is won but not yet claimed or dispatched, it appears in the **unclaimed** state. The Prize Tracker (if enabled) provides a dedicated workflow for managing physical prize fulfilment — see [Prize Tracker](admin/prize-tracker).

A badge on the sidebar Wallet link shows the number of pending withdrawals; similarly, a badge on the Prize Tracker link shows the count of unclaimed prizes.

---

## How instant wins are distributed

When you publish a competition with instant win categories attached, the platform:

1. Calculates the total number of instant win tickets across all categories.
2. Randomly selects that many ticket numbers from the full pool (without replacement).
3. Assigns each selected ticket to a category according to the quantities specified.

This means the distribution is uniform and unpredictable — no ticket number is more or less likely to carry a prize than any other.

```
Example: 1,000 ticket competition
├── Category A: £10 Cash × 5 tickets
├── Category B: £25 Cash × 2 tickets
└── Category C: Physical Prize × 1 ticket

→ 8 random ticket numbers selected from 1–1,000
→ 5 assigned to A, 2 to B, 1 to C
→ Customer buying any of those 8 tickets wins immediately
```