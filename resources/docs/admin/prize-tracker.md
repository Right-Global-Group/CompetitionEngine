# Prize Tracker

> Manage the fulfilment of physical prizes from claim to dispatch.

---

## Overview

The Prize Tracker provides an end-to-end workflow for managing physical prize fulfilment. When a customer wins a physical prize (either through a draw or an instant win), it appears in the Prize Tracker so your team can manage the claim and dispatch process.

A badge on the Prize Tracker sidebar link shows the current count of unclaimed prizes so you can see at a glance when action is needed.

---

## Prize lifecycle

```
Customer wins prize
        │
        ▼
Prize appears in tracker (Unclaimed)
        │
        ▼
Customer submits claim / provides address
        │
        ▼
ID verification completed (if required)
        │
        ▼
Prize marked as Dispatched
        │
        ▼
Delivery confirmed → Closed
```

---

## Prize statuses

| Status | Meaning |
|--------|---------|
| **Unclaimed** | The customer has won but not yet submitted their claim |
| **Pending** | Claim submitted; awaiting admin review or ID verification |
| **Approved** | Claim accepted; ready to dispatch |
| **Dispatched** | Prize has been sent to the customer |
| **Closed** | Fulfilment complete |
| **Rejected** | Claim rejected (e.g. failed ID check) |

---

## Managing a prize claim

Click any prize record to open its detail view.

From here you can:

- View the customer's details and delivery address
- Check their ID verification status
- Update the prize status
- Add internal notes
- Record tracking information when the prize is dispatched

### Updating status

Use the status selector to move the prize through its lifecycle. Status changes are timestamped and logged.

### ID Verification tab

The Prize Tracker includes an integrated ID Verification tab so you can review submitted documents without leaving the prize fulfilment workflow. This means you can verify identity and approve the prize dispatch in one place.

---

## Filtering

The Prize Tracker list can be filtered by:

- **Status** — view all prizes at a specific stage
- **Win type** — draw wins or instant wins
- **Date range** — when the prize was won
- **Search** — customer name, competition, or prize name

---

## Offering a cash alternative

Physical prizes can optionally be configured with a **cash alternative** or **site credit alternative**. If the customer selects an alternative instead of the physical prize, the value is credited to their wallet automatically and the prize record is updated accordingly — no dispatch required.