# Orders & Wallets

> View, filter, manage and export orders and wallet transactions.

---

## Orders

### Overview

The Orders page lists every order placed on the platform — both live orders and those that have been archived. The union of both tables is searched and paginated transparently, so older orders appear alongside recent ones without any extra steps.

### Filtering orders

| Filter | How it works |
|--------|-------------|
| **Search** | Matches on order ID, customer name, or email |
| **Status** | Filter by Approved, Declined, Cancelled, Refunded, or Pending |
| **Start / End Date** | Narrows results to orders created within a date range |
| **Source** | Filters by the session source recorded at checkout (e.g. organic, referral, a specific UTM source) |

### Order statuses

| Status | Meaning |
|--------|---------|
| **Approved** | Payment confirmed; tickets assigned to the customer |
| **Pending** | Awaiting payment confirmation |
| **Declined** | Payment was declined by the payment provider |
| **Cancelled** | Manually cancelled by an admin |
| **Refunded** | Full refund credited to the customer's wallet |

### Viewing an order

Click any order row to open its detail page. This shows:

- Customer details and lifetime order summary
- All competitions entered, ticket numbers, and any instant wins triggered
- Payment method and amount
- Order notes (internal, not visible to the customer)

If an order has been archived (aged out of the live table), it loads from the archive store automatically — no difference in the interface.

### Cancelling an order

Open the order and click **Cancel Order**. The order is marked cancelled and all ticket reservations are released back to the pool.

For orders with 50 or fewer tickets, cancellation is synchronous. For larger orders, tickets are released in the background and the admin sees a confirmation message with an estimated time.

{% hint style="warning" %}
Cancelling an order that was previously approved will decrement the competition's sold ticket count. This cannot be undone.
{% endhint %}

### Refunding an order

Open the order and click **Refund**. This credits the full order total to the customer's cash wallet and marks the order as refunded. Tickets are released back to the pool.

```
Refund flow
───────────
1. Wallet credit created (cash, type = Refund)
2. Sold count decremented (if order was Approved)
3. Order status → Refunded
4. Ticket reservations released
```

{% hint style="info" %}
Refunds go to the customer's **cash wallet**, not back to the original payment method.
{% endhint %}

### Exporting orders

Click **Export CSV** to download filtered order data. You can select which columns to include from the full set:

Date, Time, Order ID, Customer ID, Email, Total, Discount, Promo Code, Payment Type, Competitions Entered, Competitions, Categories, Tickets, First Order flag, Source, UTM Source, UTM Medium, UTM Campaign, UTM Content, UTM Term, Referral Code, Landing Page.

The export applies your current filters, so you can export a specific date range or status without downloading everything.

---

## Wallet Orders

Wallet orders are purchases funded entirely from a customer's wallet balance, without a card or PayPal payment. They appear in a separate tab on the Orders page.

Wallet orders have their own statuses and are managed separately from card/PayPal orders.

---

## Wallet

### Overview

The Wallet page manages deposits, withdrawals, and manual balance adjustments for customers. It is split into three tabs.

| Tab | What it shows |
|-----|--------------|
| **Deposits** | All cash deposits and site credit additions |
| **Withdrawals** | All withdrawal requests (approved, rejected, and pending) |
| **Pending** | Only the withdrawals currently awaiting approval |

### Approving a withdrawal

1. Go to **Wallet → Pending** tab.
2. Click a withdrawal row to view the customer's bank details.
3. Click **Approve** to mark it as completed.

{% hint style="warning" %}
Approving a withdrawal does not trigger an automatic bank transfer. The approval marks the record as processed — the actual bank payment must be made separately using the exported bank file.
{% endhint %}

### Rejecting a withdrawal

Open the withdrawal and click **Reject**. The status changes to rejected and the pending balance is restored on the customer's account.

### Approving a deposit

Manual deposits placed by customers (e.g. bank transfer top-ups) appear in the Deposits tab with a pending status. Click **Approve** to confirm the deposit and credit the customer's wallet.

If deposit cashback is configured, approving a deposit will automatically calculate and issue any site credit owed.

### Creating a manual transaction

Click **Add Transaction** on the Wallet page. You can create:

| Type | Options |
|------|---------|
| **Manual Deposit** | Cash credit or site credit |
| **Manual Debit** | Cash debit or site credit debit |

A reason is required for every manual entry and is stored against the transaction for audit purposes.

### Exporting wallet data

The **Export** button on each tab generates a CSV. For withdrawals and pending, the export is formatted as a **bulk payment file** with bank details:

`OriginatingAccountNumber, OriginatingSortCode, Amount, Currency, PayeeName, PayeeAccountNumber, PayeeSortCode, Reference, Unstructured, RequestedExecutionDateTime`

For deposits the export includes: ID, name, value, credit type, status, date, and which admin created it.

You can select specific rows to export using the checkboxes, or export all rows matching your current filters.

---

## Wallet Activity

The Wallet Activity page provides a transaction-level view across all wallet movements on the platform. Unlike the Wallet page (which focuses on deposits and withdrawals), Wallet Activity shows every credit and debit — including order spend, instant win payouts, refunds, manual adjustments, and site credit.

### Filters

| Filter | Options |
|--------|---------|
| **Search** | Customer name or email |
| **Transaction Type** | Credit or Debit |
| **Status** | Pending, Completed, Cancelled |
| **Date Range** | Start and end date |

You can also filter by a specific user, which adds a **current balance** summary to the stats panel.

### Transaction types

| Type | Description |
|------|-------------|
| **Withdrawal** | Customer requested a cash payout |
| **Manual Top-Up** | Admin-created deposit |
| **Instant Win (Cash)** | Cash prize credited from an instant win |
| **Order Spend** | Wallet balance used to purchase tickets |
| **Cashback** | Cashback reward credited |
| **Site Credit** | Non-withdrawable credit (instant win prizes claimed as credit, site credit deposits, etc.) |

### Exporting

The Export button downloads all transactions matching your current filters as a CSV.