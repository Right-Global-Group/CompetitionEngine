# Managing Competitions

> Create, configure and publish competitions on Competition Engine.

## Creating a competition

{% stepper %}
{% step %}
### Go to Competitions

In the admin sidebar, click **Competitions**, then click **Create Competition** in the top right.
{% endstep %}

{% step %}
### Fill in the details

Enter the competition name, description, ticket price, total tickets, and draw date. You can also set a sale price, cash alternative value, and upload gallery images.
{% endstep %}

{% step %}
### Configure ticket settings

Set the maximum tickets per customer and optionally set a minimum tickets per order. You can also enable Pick Your Number mode, time locks, or time between orders restrictions.
{% endstep %}

{% step %}
### Add Instant Wins

Assign instant win categories to the competition. Each category defines a prize title, value, and how many tickets will trigger it. These are distributed randomly across the ticket pool when you publish.
{% endstep %}

{% step %}
### Set the status and publish

Set the status to **Active** (publicly visible) or **Private** (accessible only via direct link). Saving as **Draft** keeps it hidden until you're ready.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Instant win tickets are generated automatically when you publish a competition. You cannot add or edit instant wins after tickets have been sold.
{% endhint %}

---

## Competition statuses

| Status | What it means |
|--------|--------------|
| **Draft** | Hidden from customers. Editable, no tickets generated yet. |
| **Active** | Live and visible to all customers. |
| **Private** | Live but only accessible via direct link — not shown on the competitions listing page. |
| **Paused** | Temporarily hidden from customers. |
| **Ended** | Past the end date. No more entries accepted. |

---

## Ticket settings

| Setting | What it does |
|--------|--------------|
| **Total Tickets** | The total number of tickets available to purchase. |
| **Max Tickets Per Customer** | Limits how many tickets a single customer can buy in total. |
| **Max Tickets Per Order** | Limits how many tickets can be added in a single checkout. |
| **Min Tickets Per Order** | Requires a minimum quantity to be purchased at once. |
| **Pick Your Number** | Allows customers to choose specific ticket numbers rather than random assignment. |
| **Time Lock** | Blocks purchases during a set daily time window (e.g. 22:00–08:00). |
| **Time Between Orders** | Enforces a cooldown period between purchases from the same customer. |

---

## Instant Wins

Instant wins are prizes distributed randomly across the ticket pool. When a customer purchases a ticket that has been assigned an instant win, they win that prize immediately — no draw required.

Each instant win is configured by category. A category defines the prize name, its value, and the prize type. When you add a category to a competition you set the quantity — how many tickets across the pool will trigger that prize.

| Prize Type | How it works |
|------------|-------------|
| **Cash** | Prize value is credited directly to the winner's wallet. |
| **Physical** | A physical prize is dispatched. Can optionally offer a cash or site credit alternative. |
| **Site Credit** | Non-withdrawable credit added to the winner's account. |
| **Ticket Bundle** | The winner receives free tickets to another competition. |

{% hint style="warning" %}
Instant win categories and quantities are locked once tickets have been sold. You can reorder how they display but cannot add, remove, or change quantities after that point.
{% endhint %}

---

## Multi Buy

Multi Buy lets you offer discounts when customers purchase tickets in larger quantities. Each rule defines a ticket range and a discount applied to orders within that range.

| Field | What it does |
|-------|-------------|
| **Min Tickets** | The minimum order quantity for this discount to apply. |
| **Max Tickets** | The maximum order quantity this discount applies to. |
| **Discount** | The amount off, either as a percentage or a fixed amount per ticket. |
| **Discount Type** | Set to **Percentage** or **Fixed** depending on how the discount is calculated. |

You can add multiple rules to create tiered pricing — for example, 5% off for 10–24 tickets, 10% off for 25–49 tickets, and 15% off for 50 or more.

---

## Games

A game can be attached to a competition to add an interactive element to the entry experience. Select a game from the Game section on the competition form. If no games have been configured, this section will be empty.

---

## Templates & duplicating

You can save any competition as a **template** to reuse its settings, instant wins, and gallery for future competitions. Templates appear in a separate tab on the Competitions page.

To duplicate an existing competition, open it and click the **Duplicate** option from the menu. This opens the create form pre-filled with the existing competition's data — nothing is saved until you click publish.

---

## Features

The following optional features can be enabled on a per-competition basis.

### Golden Ticket

When Golden Ticket is enabled, customers can opt in to upgrade their tickets for a higher price. If they win the draw, they receive a bonus prize on top of the standard prize.

You configure three things: the **price increase** as a percentage (e.g. 20% makes a £1.00 ticket cost £1.20 with Golden Ticket), the **bonus prize amount** paid out if a Golden Ticket holder wins, and whether the toggle defaults to on or off when customers visit the competition page.

### Spend to Unlock

Spend to Unlock restricts entry to customers who have spent a minimum amount on the platform. You set the minimum spend amount and an optional time window — for example, customers must have spent at least £50 in the last 30 days to enter. Leave the time period blank to count lifetime spending.

### Auto Draw

When Auto Draw is enabled, the competition draws a winner automatically when it sells out or when the draw date passes. You set how many winners to draw and an optional delay in minutes between sell-out and the draw firing.

{% hint style="info" %}
Auto Draw runs on a 15-minute schedule, so the draw will happen within 15 minutes of the trigger condition being met.
{% endhint %}

### Password Protection

A competition can be protected with an access password. Customers must enter the password before they can view or enter the competition. This is useful for running private or invite-only competitions without using the Private status.

### Pick Your Number

When Pick Your Number is enabled, customers select specific ticket numbers instead of being assigned them randomly. You also set the tab size — how many tickets are shown per tab in the picker (e.g. 100 shows tabs of 1–100, 101–200, and so on).

{% hint style="warning" %}
Pick Your Number settings are locked once the competition is published.
{% endhint %}

---

## Preparing for the draw

Once a competition has ended or sold out, mark it as **Prepared for Draw** from the competition edit page. This sets the end and draw dates to now if they are still in the future, and makes it available in the Winner Reveal tool.

{% hint style="warning" %}
Once a competition has been prepared for draw and tickets have been sold, instant win settings can no longer be edited.
{% endhint %}

---

## Archiving competitions

Archiving hides a competition from all admin lists without deleting any data. Archived competitions can be restored at any time. This is different from deletion — archived competitions retain all their orders, tickets and winner records.