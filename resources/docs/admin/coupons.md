# Coupons

> Create and manage discount codes for use at checkout.

---

## Overview

Coupons let you offer discounts to customers at checkout. Each coupon has a code that customers enter during the checkout process, which applies a discount to their order total.

---

## Creating a coupon

Go to **Coupons** in the admin sidebar and click **Create Coupon**.

### Coupon fields

| Field | Description |
|-------|-------------|
| **Code** | The code customers enter at checkout. Codes are case-insensitive. |
| **Discount Type** | **Percentage** (e.g. 10% off) or **Fixed Amount** (e.g. £5 off) |
| **Discount Value** | The amount or percentage to deduct |
| **Min Order Value** | Optional minimum order total required to use the coupon |
| **Usage Limit** | Optional cap on how many times the coupon can be used in total |
| **Usage Limit Per User** | Optional cap on how many times a single customer can use it |
| **Expires At** | Optional expiry date — after this date the coupon is no longer valid |
| **Active** | Toggle to enable or disable the coupon without deleting it |

---

## Coupon behaviour at checkout

When a customer enters a valid coupon code at checkout:

1. The platform checks the code exists and is active.
2. It verifies the code has not expired.
3. It checks the global usage limit has not been reached.
4. It checks the per-user usage limit for this customer.
5. It checks the order total meets the minimum (if set).
6. If all checks pass, the discount is applied to the order total.

The coupon code used is recorded on the order, so you can see which orders used which codes in the Orders export.

---

## Managing coupons

The Coupons list shows all coupons with their code, discount, usage count, and status. You can:

- **Edit** a coupon to update its settings
- **Disable** a coupon by toggling it inactive
- **Delete** a coupon to remove it entirely

{% hint style="info" %}
Disabling a coupon is preferable to deleting it if you want to preserve the usage history on existing orders.
{% endhint %}

---

## Tracking usage

The coupon detail view shows the total number of times a code has been used and the orders it was applied to. You can also see coupon usage in the Orders export (the **Promo Code Used** column).