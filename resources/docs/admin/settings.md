# Settings

> Configure platform behaviour, cashback rewards, wallet limits, and page customisation.

---

## Cashback Rewards

Cashback rewards customers with wallet credit when they spend above a set threshold on competitions. Enable the toggle at the top of the section to activate it.

| Setting | What it does |
|---------|-------------|
| **Minimum Spend** | The order total a customer must reach to qualify for cashback. |
| **Cashback Percentage** | The percentage of the qualifying spend credited back to their wallet. |
| **Valid Until** | An optional expiry date. Once passed, cashback stops being awarded automatically. |
| **Cashback Type** | Whether the reward is credited as withdrawable cash or non-withdrawable site credit. |

By default cashback applies to all competitions. You can narrow this to specific competitions using the **scope** options:

- **All Competitions** — cashback applies everywhere.
- **Only Specific Competitions** — cashback only applies to the competitions you select.
- **All Competitions Except...** — cashback applies everywhere apart from the competitions you select.

When using a scoped list you can configure each competition individually — setting its own cashback type, expiry date, and optionally overriding the minimum spend and percentage for that competition only.

{% hint style="info" %}
Cashback only applies to card and PayPal payments. Wallet payments are excluded.
{% endhint %}

---

## Deposit Cashback

When site credit is enabled, you can also award site credit automatically when a customer makes a qualifying deposit. Configure the minimum deposit amount, the site credit percentage to award, and an optional expiry date.

---

## Competition Entry List

Controls whether customers can see a list of other participants on the competition page.

| Setting | What it does |
|---------|-------------|
| **Enabled** | Shows the entry list on competition pages. |
| **Allow Regular Users** | When off, only admins can see the entry list. When on, all logged-in customers can view it. |

---

## Free Entry Auto-Assignment

When enabled, free entry tickets are assigned to customers automatically at the point the free entry is created — either when an admin creates a manual assignment or when a customer wins a ticket bundle instant win. When disabled, customers must claim their free tickets manually on the competition page.

---

## Deposit Settings

Sets the minimum and maximum deposit amounts customers can add to their wallet. Set either to 0 to use the platform default.

---

## Withdrawal Settings

Sets the minimum balance a customer must have in their wallet before they can request a withdrawal.

---

## Retention

Controls automatic archiving of old ticket data. When enabled, tickets from competitions that ended longer ago than the configured retention period are moved to the archive store on a nightly schedule.

A ticket batch is only eligible to archive if the competition is fully finished, all tickets have settled with no pending orders, and there are no outstanding refunds.

{% hint style="warning" %}
Archiving is a one-way move — tickets are not deleted but are removed from the live database. Use this only once you are confident historical ticket data is no longer needed for day-to-day operations.
{% endhint %}

---

## Orders Archive

Moves old completed orders into a separate archive store. Operates independently of ticket retention — the two have separate retention periods and run on separate schedules.

Orders are eligible once they are in a terminal status (approved, declined, cancelled, or refunded) and older than the configured retention period. Order items, payments, notes, and pending payments move in the same batch.

---

## 404 Page

Customises the message and button shown when a customer lands on a page that doesn't exist. The logo displayed on the 404 page is taken automatically from your branding settings.

| Setting | What it does |
|---------|-------------|
| **Message** | The text shown beneath the logo. |
| **Button Text** | The label on the action button. |
| **Button Link** | Where the button navigates to (e.g. `/` or `/competitions`). |

---

## Maintenance Page

Customises the title and message shown when the site is put into maintenance mode. The logo is taken automatically from your branding settings.

You can also set a **bypass password** — admins who visit `/maintenance` and enter this password can access the site normally while maintenance mode is active. The bypass duration controls how long that access lasts before they need to re-authenticate.

---

## Branding

Upload your logo, favicon, Comp Engine logo, and GLI logo. Once uploaded, assets are stored permanently and apply site-wide immediately.

| Asset | Where it appears |
|-------|----------------|
| **Logo** | Site header and emails. |
| **Favicon** | Browser tab icon. |
| **Comp Engine Logo** | Shown on competition pages where a secondary logo is required. |
| **GLI Logo** | Displayed for RNG compliance accreditation if applicable. |

---

## SEO

Controls the meta tags and social sharing defaults used across the site.

| Setting | What it does |
|---------|-------------|
| **Site Name / Tagline** | Sets the `og:title` and `twitter:title` used when pages are shared. |
| **Meta Description** | Sets `og:description` and `meta description` — shown in search results and link previews. |
| **Social Sharing Image** | The image shown when links are shared on social platforms. Defaults to your logo if not set. For individual competition pages this is replaced by the competition's first gallery image. |

---

## Social Media

Sets the URLs for your social media profiles. These are used in the site footer and anywhere social links appear.

| Platform | Notes |
|----------|-------|
| **Facebook** | Your Facebook page URL. |
| **Instagram** | Your Instagram profile URL. |
| **TikTok** | Your TikTok profile URL. |
| **YouTube** | Your YouTube channel URL. |
| **Facebook Live** | A separate link for your Facebook Live page if different from your main page. |

---

## Checkout Text

Customises the consent and confirmation copy shown to customers during checkout. Each field has a default value that is used if left blank.

| Setting | Where it appears |
|---------|----------------|
| **Marketing Section Description** | The introductory text above the email and SMS opt-in toggles. |
| **Email Consent Label** | The label next to the email marketing opt-in checkbox. |
| **SMS Consent Label** | The label next to the SMS marketing opt-in checkbox. |
| **Age Confirmation Text** | The text next to the age confirmation checkbox. |