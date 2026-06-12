# Users

> View, manage and export your customer accounts.

## Overview

The Users page lists every customer registered on the platform. From here you can search for a user, view their full profile, manage their account, and take administrative actions such as resetting their password or adjusting their wallet balance.

---

## Finding a user

Use the search bar at the top of the Users page to filter by first name, last name, or email address. Results update as you type. Click any row to open that user's detail view.

---

## User profile

The user detail page is divided into tabs.

### Profile

Shows the user's personal details: name, email, date of birth, address, and contact details. You can edit any of these fields directly and save changes.

| Field | Notes |
|-------|-------|
| **First / Last Name** | Display name shown across the admin |
| **Email** | Used for login and all transactional emails |
| **Date of Birth** | Used for age verification |
| **Address** | Billing and shipping address |
| **Disabled** | Toggle to prevent the user from logging in |

### Orders

A paginated list of the user's orders across both live and archived records. Each row shows the order ID, total, status, and date. Click an order to open its full detail view.

The tab also shows the user's **lifetime approved spend** — the total value of all approved orders across their account history.

### Wallet

Shows the user's cash wallet transactions: deposits, spends, refunds, and instant win credits. Excludes site credit transactions (those are shown in the Instant Wins tab).

You can create a manual wallet transaction from this tab — either a cash deposit or a debit — by clicking **Add Transaction**. You must provide a reason for every manual entry.

### Instant Wins

Lists every instant win the user has claimed, with the prize name, competition, ticket number, value, and whether the prize has been paid out.

### Withdrawals

Shows all withdrawal requests made by this user, including pending, approved, and rejected entries.

---

## Administrative actions

These actions are available from the user detail page.

| Action | What it does |
|--------|-------------|
| **Send Password Reset** | Sends the user a password reset email via the standard Laravel reset flow |
| **Reset Password** | Lets you set a new password directly without sending an email |
| **Make Admin** | Promotes the user to an admin account |
| **Delete (Anonymise) User** | Replaces all personal data with placeholder values and disables the account. Orders, tickets and wallet records are retained for audit and accounting purposes — only the PII is removed. This action cannot be undone. |

{% hint style="warning" %}
Deleting a user anonymises their data permanently. All orders, tickets and wallet transactions are preserved for accounting and competition integrity, but the personal details cannot be recovered.
{% endhint %}

---

## Anonymisation — what gets removed

When you anonymise a user, the following data is overwritten or deleted:

```
Name          → "Deleted User"
Email         → deleted_{id}@removed.com
Password      → random hash
Date of birth → 1900-01-01
Addresses     → deleted
Contact details → deleted
Safe play settings → deleted
ID verifications → deleted
Payment methods → deleted
Admin record  → deleted
Roles         → deleted
```

Orders, tickets, wallet transactions and winner records are **not** modified.

---

## Exporting users

Click **Export CSV** on the Users list page to download a spreadsheet of your user base. The export includes:

- ID, name, email, phone
- Whether the account is disabled
- Registration date
- Last order date
- Average spend per order
- Total card spend
- Total wallet cash spend
- Total site credit spend

Large exports are streamed in chunks so the download starts immediately.

---

## Permissions

Actions on the Users page are gated by the `view-users` permission. Password reset and update actions additionally require the `update` and `sendPasswordReset` policies on the User model.