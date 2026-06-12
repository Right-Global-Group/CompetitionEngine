# Dashboard

> A real-time overview of platform performance, revenue, and customer activity.

The dashboard is the first page you see after logging into the admin panel. It gives you a snapshot of how the platform is performing today and over time.

---

## Stats Overview

The top of the dashboard shows key metrics for the selected date range. These are computed nightly and cached — figures refresh automatically each day. During the day, today's stats are recomputed on each deployment so numbers stay accurate through the working day.

| Metric | What it shows |
|--------|--------------|
| **Total Revenue** | Sum of all completed order totals in the period. |
| **Total Orders** | Number of completed orders placed. |
| **Tickets Sold** | Total ticket quantity sold across all competitions. |
| **New Customers** | Customers who registered for the first time in the period. |
| **Instant Wins** | Number of instant win prizes triggered. |
| **Total Won** | Combined value of all instant win prizes paid out. |
| **Withdrawals** | Total value of customer withdrawal requests submitted. |
| **Wallet Deposits** | Total value deposited into customer wallets. |

---

## Date Range Filter

You can filter all dashboard stats by date range. Selecting a custom range reruns the queries for that period. Pre-set options typically include today, this week, this month, and all time.

---

## Winners Ticker

A live feed of recent winners scrolls across the dashboard. This pulls from both the winners table (draw winners) and instant win claims, merged and sorted by date. The ticker updates on page load and reflects the most recently won prizes across all competitions.

---

## Active Competitions

A summary of competitions currently live on the platform — status Active or Private — with their ticket sales progress. Each entry shows the competition name, tickets sold, total tickets, and percentage sold.

---

## Recent Orders

A table of the most recently completed orders, showing order ID, customer name, amount, and date. This is a snapshot view — use the Orders section in the sidebar for full filtering and search.

---

## Data Freshness

- **Historical stats** (any date range in the past) are computed nightly and served from cache.
- **Today's stats** are recomputed on each platform deployment and additionally on a scheduled basis throughout the day.
- **Winners ticker and active competitions** load live on each page request.
- If figures look stale, they will correct themselves on the next scheduled recompute or deployment.