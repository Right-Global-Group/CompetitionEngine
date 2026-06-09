# Analytics

> Detailed performance data across revenue, competitions, customers, wins, and more.

The Analytics page is split into tabs. All data is scoped to the date range selected at the top of the page. Use the preset buttons or set a custom range with the date pickers.

---

## Filters & Date Range

The filter bar runs across the top of the page and applies to all tabs.

| Control | What it does |
|---------|-------------|
| **Today / Yesterday / Last 7d / Last 30d / MTD / YTD / All Time** | Quick date presets. |
| **Date pickers** | Set a custom start and end date. |
| **+ user** | Filter all stats to a single customer. Type a name or email to search. |
| **Reset** | Resets back to today's date. |
| **Export** | Downloads the current tab's data as a CSV. A full export of all data is also available. |

---

## Data Freshness

All historical data is pre-computed nightly and served from cache — queries are fast regardless of order volume. Today's figures are recomputed on each deployment and on a 15-minute schedule throughout the day. The snapshot bar at the top of the Overview tab shows when the data was last updated. You can also click **Refresh Stats** in the top-right corner to force a recompute immediately.

---

## Overview Tab

The Overview tab gives you a live snapshot of the selected date range alongside trend comparisons against the prior equivalent period.

### Snapshot Cards

Five cards show the headline numbers for the selected range. Each card includes a delta chip comparing against the prior period (e.g. today vs yesterday at the same time, or last 7 days vs the 7 days before).

| Card | What it shows |
|------|--------------|
| **Revenue** | True revenue (total minus site credit) for the period, with a breakdown by Card, Wallet Cash, and PayPal. |
| **Orders** | Total completed orders and tickets sold. |
| **Orders Last Hour** | Live velocity — how many orders have come in during the last 60 minutes. Updates with the 15-minute cron. Only shown when viewing today. |
| **Customers** | New vs repeat customers who ordered in the period. |
| **Net Profit** | True revenue minus completed withdrawals. Shows a breakdown of True Revenue and Withdrawals beneath. |

### Today by the Hour

A dual-axis chart showing revenue (£) and order count plotted hour by hour across the selected single day. A vertical marker shows the current hour when viewing today. Only shown for single-day ranges.

### Ending Today

A list of competitions whose draw or end date falls on today's date. Only shown when viewing today.

### Peak Hours

A line chart showing average order volume by hour of day, calculated as a 30-day rolling average. Useful for identifying when your customers are most active.

### Peak Days

A line chart showing average order volume by day of week (Monday–Sunday), also a 30-day rolling average.

---

## Competitions Tab

Shows profitability and sell-through data for all active competitions.

### Summary Cards

| Card | What it shows |
|------|--------------|
| **Active Competitions** | Total number of currently active competitions. |
| **In Profit** | How many active competitions have revenue exceeding their full prize cost. |
| **Not Yet Profitable** | Active competitions where revenue has not yet covered prize cost. |
| **Total Revenue** | Combined revenue across all active competitions. |
| **Profit** | Revenue minus full prize cost (instant wins + main prize). |

### Competition Cards

Visual cards for the top active competitions showing a thumbnail image, sell-through progress bar, revenue, prize cost, and current profit or loss status.

### Active Competitions Table

A full table of all active competitions with:

| Column | What it shows |
|--------|--------------|
| **% Sold** | Progress bar showing how much of the ticket pool has been sold. |
| **Tickets** | Tickets sold vs total available. |
| **Revenue** | Money taken from ticket sales. |
| **Prize Cost** | Full commitment: instant wins paid out + main prize value + any Golden Ticket bonus liability. |
| **Profit** | Revenue minus total prize cost. |
| **Status** | In Profit or Loss. |

> **Prize cost** includes the full main prize value even if the competition hasn't been drawn yet — this is a projected figure so you can see whether a competition is on track to be profitable before it ends.

---

## Games Tab

Shows profit performance grouped by game type, calculated from **ended competitions only** (active competitions haven't finished selling so their numbers would skew the results).

### Summary Cards

Same shape as the Competitions tab — total game types, how many are profitable, total revenue, total profit, and overall margin.

### Game Type Cards

One card per game type showing revenue, prize cost, profit, margin percentage, average revenue per competition, tickets sold, and a list of the top competitions in that game type.

### Game Type Table

A sortable summary table across all game types with revenue, prize cost, profit, margin, tickets sold, and count of competitions.

---

## Stats Tab

Traffic source breakdown and average order value metrics.

### Average Order Value

Three cards showing rolling AOV across different windows — these are always rolling averages, not filtered by your selected date range.

| Card | Window |
|------|--------|
| **AOV · Last 24h** | Average order value from orders in the last 24 hours. |
| **AOV · Last 7 Days** | Average across the last 7 days. |
| **AOV · Last 30 Days** | Average across the last 30 days. |

### Traffic Sources

A table showing where your customers are coming from based on session source tracking on orders.

| Column | What it shows |
|--------|--------------|
| **Source** | The traffic source label (e.g. direct, facebook, google). |
| **Orders** | Number of orders from this source. Click to see the full order list. |
| **Customers** | Unique customers who ordered from this source. |
| **Revenue** | Total revenue from orders with this source. |
| **Share** | This source's percentage of total revenue. |

Clicking the orders count for any source opens a modal showing the individual orders, including customer name, date, payment method, UTM tags, and total.

---

## Customers Tab

### Customer Search

Search for any customer by name or email to pull up their full profile modal directly from the analytics page.

### Registered Users

Total number of registered accounts on the platform.

### Customer Segments

Customers are grouped into three segments based on their lifetime spend. The thresholds are configurable — click **Edit thresholds** to change the spend boundaries for VIP, Regular, and Casual. Click any segment card to see a paginated list of the customers in it.

| Segment | Default threshold |
|---------|-----------------|
| **VIP** | £500+ lifetime spend. |
| **Regular** | £100–£500 lifetime spend. |
| **Casual** | Under £100 lifetime spend. |

Each segment card shows total customer count, combined spend, and average spend per customer.

### Customer Acquisition (30 Days)

A line chart showing daily new signups and first-time buyers over the last 30 days. Useful for seeing whether marketing activity is converting registrations into purchases.

### Top 100 Customers

A ranked list of your highest-spending customers. Each row shows total spend, order count, and whether they've been active in the last 30 days. Click any customer to open their full profile modal.

### At-Risk Customers

Customers who haven't placed an order in a configurable number of days but were previously active. The inactive threshold and high-risk threshold are both adjustable — click the pill in the section header to edit them. High-risk customers (inactive for longer, optionally with a minimum spend requirement) are flagged in red.

### Customer Profile Modal

Clicking any customer opens a detailed modal showing:

- Total spent, orders, wins, largest order, and average order value.
- Spending breakdown by card, wallet, and site credit.
- First and last order dates, days since last order, and account age.
- Recent orders (last 10) with payment method and total.
- Recent wins (last 10) with competition name and prize value.
- Favourite competitions by purchase count.
- A link to their full admin profile.

---

## Wins & Payouts Tab

### Win Summary Cards

| Card | What it shows |
|------|--------------|
| **Total Won** | Combined prize value paid out in the period. |
| **Instant Wins** | Number of instant win prizes triggered. |
| **Avg Won / Ticket** | Mean prize value per ticket purchased. |
| **Return Rate** | Total won as a percentage of total spending — how much of customer spend comes back as prizes. |

### Withdrawals

A filterable section showing withdrawal stats. Use the period buttons (Today / 7 Days / 30 Days / All Time) to scope independently of the main date filter.

| Metric | What it shows |
|--------|--------------|
| **Pending** | Withdrawals submitted but not yet processed. |
| **Completed** | Approved and paid withdrawals. |
| **Rejected** | Declined withdrawal requests. |
| **Avg Amount** | Mean value per completed withdrawal. |
| **Re-Spend Rate** | Percentage of won prize value that customers spent on more tickets rather than withdrawing. |
| **Avg Time to Withdraw** | Mean number of days between a customer winning and submitting a withdrawal. |

A trend chart shows completed withdrawal amount and count plotted over time. A table of the 10 most recent completed withdrawals is shown beneath.

### Top Winners

A podium-style leaderboard of your top 3 winners by number of winning orders, followed by a ranked list of positions 4 and beyond.

### Top Wins by Week

The highest-value individual prizes won, grouped by calendar week. Each week shows the top 5 wins inline. Click **View All** on any week to open a modal listing every win for that week with winner name, competition, prize value, and date. Individual weeks or all weeks can be exported as CSV from the modal.

---

## Coupons Tab

### Summary Cards

| Card | What it shows |
|------|--------------|
| **Total Used** | Number of coupon redemptions in the period. |
| **Total Discount** | Combined discount value given via coupons. |
| **Unique Coupons** | How many different coupon codes were used. |
| **Avg Discount** | Mean discount per redemption. |

### Top Coupon Cards

Visual cards for the top 3 most-used coupons showing usage count, percentage of all redemptions, and total discount given.

### All Coupons Table

A full ranked table of every coupon used in the period with times used, share of total redemptions, total discount, and average discount per use.

---

## Exporting Data

Every tab has an **Export** button in the top-right corner that downloads a CSV of that tab's data. A full export of all tabs combined is available via the download icon in the filter bar. Exports respect the current date filter.