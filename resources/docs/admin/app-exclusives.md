# App Exclusives

App Exclusives is a feature that lets you mark individual competitions as only purchasable through the mobile app. Customers browsing on desktop, mobile browser, or any non-app environment are blocked from adding tickets — and are redirected to download the app instead. Customers already inside the app see no restrictions at all.

## What Can Admins Do?

### Enabling the Feature for the Tenant

Before any competition can be marked app-exclusive, the feature must be switched **on** at the tenant level. This is a global toggle — turning it off makes all app-exclusive restrictions disappear site-wide instantly, even for competitions that still have the flag set.

Go to **Admin → Settings** and find the **App Exclusives** toggle (listed under feature flags). Flip it on to activate.

> **Note:** If the toggle is not visible on your settings page it means the feature has not yet been enabled for your tenant at the platform level. Contact your developer.

---

### Marking a Competition as App Exclusive

1. Open **Admin → Competitions** and click to edit (or create) a competition.
2. Scroll to the **App Exclusive** checkbox in the competition form.
3. Tick **App Exclusive**.
4. A modal will immediately appear asking you to confirm (or update) the **App Store URL** and **Android Download URL** for your app.
5. Enter both URLs (at least one is required to save).
6. Click **Save & Enable**.

The competition is now app-exclusive. The checkbox will show as ticked and the current download URLs are displayed underneath it for reference.

**Editing the download URLs later:** Click the **Edit links** button that appears below the ticked checkbox. The same modal opens with the current values pre-populated.

**Removing the app-exclusive flag:** Untick the checkbox. The flag is removed immediately — no modal, no URL changes needed.

---

### App Store & Download URL Priority

The platform looks for download URLs in this order (first match wins):

| Priority | Source |
|----------|--------|
| 1 | Theme Builder → App section (`app_store_url` / `apk_url`) |
| 2 | Tenant config (`appStoreUrl` / `androidDownloadUrl`) |

When a customer clicks a blocked button, the platform picks the right URL based on their device:

- **iPhone / iPad** → Apple App Store URL first, Android APK as fallback
- **Android** → Android APK URL first, Apple App Store as fallback
- **Desktop** → whichever URL is available (Apple takes priority)

---

## What Do Customers See?

### Competition Grid / Listing Page

Every app-exclusive competition on the grid shows a **📱 App Exclusive** badge overlaid on the competition image. This is visible to all users regardless of whether they are in the app or in a browser — it signals the nature of the competition at a glance.

The **Add to Basket** (or quick-buy) button behaves differently depending on the customer's environment:

| Platform | Button label | What happens on click |
|----------|-------------|----------------------|
| Inside the app (MightyWeb) | Normal (e.g. "Add 1 Ticket") | Adds to basket normally — no restriction |
| Desktop browser | 📱 Download | Opens the app download URL in a new tab |
| iPhone in browser (Safari, Chrome, etc.) | 📱 Download | Opens the Apple App Store URL in a new tab |
| Android in browser | 📱 Download | Opens the Android APK download URL in a new tab |

### Individual Competition Page

On the full competition detail page, the same logic applies. If a customer arrives via a direct link while not in the app, the add-to-cart button is replaced with the download prompt. They can still browse the competition details, see the prize, read the description — they just cannot add tickets.

### Basket / Floating Cart

If a customer somehow has an app-exclusive item already in their basket (e.g. they added it in the app, then switched to a browser), the floating cart shows a warning notice. The checkout button is also disabled with a message explaining that an app-exclusive item is in the basket and they need to complete the purchase in the app.

### Checkout Page

A red warning banner appears above the payment form:

> 📱 *Your basket contains an app-exclusive competition. Please download the app to complete your purchase.*

The **Pay Now** button is disabled while any app-exclusive item is in the basket and the customer is not in the app.

### App-Only View Inside the App

When a customer is inside the MightyWeb app, a sticky **📱 App Exclusives →** button appears at the top of the competitions listing. Tapping it loads `/competitions?app_exclusives=true` — a filtered view showing only app-exclusive competitions. This button is invisible to customers browsing outside the app.

---

## Platform Behaviour Summary

| Customer environment | Sees "App Exclusive" badge | Can add to basket | Button label |
|---------------------|---------------------------|-------------------|-------------|
| MightyWeb app (iOS) | Yes | Yes | Normal |
| MightyWeb app (Android) | Yes | Yes | Normal |
| iPhone — Safari | Yes | No | 📱 Download |
| iPhone — Chrome | Yes | No | 📱 Download |
| iPhone — any other browser | Yes | No | 📱 Download |
| Android — Chrome | Yes | No | 📱 Download |
| Android — any browser | Yes | No | 📱 Download |
| Desktop — any browser | Yes | No | 📱 Download |

> **Why is iPhone Chrome blocked?** Chrome on iOS still includes `Safari` in its user-agent string, which means the platform cannot distinguish it from a genuine Safari mobile browser. Only requests coming through the MightyWeb app (which uses a specific frozen user-agent — see the developer setup guide) are recognised as the app. Any other iPhone browser, including Chrome, is treated as a regular web visitor and is blocked.

---

## Frequently Asked Questions

**Can I have a mix of app-exclusive and non-exclusive competitions at the same time?**
Yes. The flag is per-competition. You can have any number of app-exclusive competitions running alongside regular ones.

**What if the tenant feature is off but a competition still has the flag ticked?**
Nothing changes for customers — they see and can buy normally. The flag is stored but has no effect until the feature is enabled at the tenant level.

**Does the restriction apply at checkout server-side as well?**
Yes. Even if someone bypasses the frontend, the backend `BasketController` independently checks `AppWebview::detect()` against the request user-agent and returns a `403` if the feature is on, the competition is exclusive, and the request is not from a recognised app webview.

**Will enabling this feature break anything for existing competitions?**
No. Existing competitions all start with `is_app_exclusive = false`. Only competitions you explicitly tick will be gated.
