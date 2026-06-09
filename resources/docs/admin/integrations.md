# Integrations

> Connect third-party services for analytics, marketing, payments and email.

The Integrations page is split into sections. Expand each card to configure it, then click **Save Changes**.

Sensitive values like API keys and passwords are masked after saving — you will see the last four characters only. Click **Change** to update a sensitive field.

---

## Company Info

Set your legal company name and company registration number. These are displayed in the site footer for compliance purposes.

---

## Header Tracking

### Klaviyo

Connects your site to Klaviyo for email and SMS marketing automation. You need your **Private API Key** (used server-side) and your **Public Key** (also called the Company ID, used client-side). Set the **API Version** to match the version your Klaviyo account is configured for.

### Facebook Pixel

Enables the Meta Pixel for ad tracking and conversion optimisation.

| Setting | What it does |
|---------|-------------|
| **Pixel ID** | Your Meta Pixel ID from Ads Manager. |
| **Enable Pixel** | Turns the client-side pixel on or off. |
| **Advanced Matching** | Sends hashed customer data (email, phone) to improve match rates. |
| **Dynamic Events** | Automatically fires standard events (ViewContent, AddToCart, Purchase) based on customer actions. |
| **Enable Conversions API** | Sends events server-to-server in addition to the browser pixel, improving reliability and bypassing ad blockers. |
| **CAPI Access Token** | Required when Conversions API is enabled. Generated in Meta Events Manager. |
| **CAPI Test Event Code** | Optional. Used during setup to verify server events are arriving correctly in Meta Events Manager. |

### TikTok Pixel

Enables the TikTok Pixel for ad tracking and conversions.

| Setting | What it does |
|---------|-------------|
| **Pixel ID** | Your TikTok Pixel ID from TikTok Ads Manager. |
| **Enable Pixel** | Turns the client-side pixel on or off. |
| **Advanced Matching** | Sends hashed customer data to improve match rates. |
| **Enable Events API** | Sends events server-to-server in addition to the browser pixel. |
| **Events API Access Token** | Required when Events API is enabled. |
| **Events API Test Event Code** | Optional. Used to verify server events during setup. |

### HubSpot

Adds HubSpot tracking and analytics to your site.

| Setting | What it does |
|---------|-------------|
| **Tracking ID** | Your HubSpot portal ID. |
| **Enable HubSpot** | Turns the tracking script on or off. |
| **Data Region** | Set to `eu1` for EU data residency or `na1` for North America. |

### Microsoft Clarity

Adds session recording and heatmap tracking via Microsoft Clarity.

| Setting | What it does |
|---------|-------------|
| **Project ID** | Your Clarity project ID. |
| **Enable Clarity** | Turns the Clarity script on or off. |

---

## Mail

### Email Addresses

Configures the sender details and routing addresses for all outgoing emails from the platform.

| Setting | What it does |
|---------|-------------|
| **From Address** | The email address shown as the sender on all outgoing emails. |
| **From Name** | The display name shown next to the from address. |
| **Admin Notification Email** | Where admin notifications (new orders, withdrawals, etc.) are sent. |
| **BCC Address** | An optional address that receives a silent copy of all outgoing emails. |
| **Contact Form Email** | Where messages submitted via the site contact form are delivered. |