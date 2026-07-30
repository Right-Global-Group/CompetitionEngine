# App Exclusives — Developer Setup

This guide covers everything needed to set up the App Exclusives feature end-to-end for a tenant: database, tenant config, MightyWeb configuration, and how the detection code works.

---

## 1. Run the Migration

The feature requires one extra boolean column on the `competitions` table.

```bash
php artisan migrate
```

Migration file: `2026_06_16_094844_add_is_app_exclusive_to_competitions_table.php`

This adds `is_app_exclusive BOOLEAN DEFAULT false` to the competitions table.

---

## 2. Enable the Tenant Feature Flag

The feature is disabled by default for every tenant. Enable it by inserting/updating a row in `tenant_features`:

```sql
UPDATE tenant_features
SET value = 1
WHERE tenant = 'your-tenant-name'
  AND feature_key = 'enable_app_exclusives';
```

Or via Tinker:

```php
\App\Models\TenantFeature::where('tenant', 'your-tenant-name')
    ->where('feature_key', 'enable_app_exclusives')
    ->update(['value' => true]);
```

This flag is what controls the `appExclusivesEnabled` prop shared to every Inertia page via `HandleInertiaRequests`. Flipping it off at any time disables all gating immediately, even for competitions that still have `is_app_exclusive = true`.

---

## 3. Add App Download URLs to Tenant Config

The platform needs to know where to send blocked customers. There are two ways to set this — both are checked at runtime and the Theme Builder entry takes priority.

### Option A — Theme Builder (preferred, admin-editable)

Insert rows into `tenant_builder_texts` (or via the Theme Builder admin UI if available) in the `app` section:

| key | value |
|-----|-------|
| `app_store_url` | `https://apps.apple.com/gb/app/your-app/idXXXXXXXXX` |
| `apk_url` | `https://your-domain.com/download/app-release.apk` or a direct Play Store link |

These are loaded in `HandleInertiaRequests::share()` under `themeBuilderSettings.app` and override the hardcoded tenant config values.

### Option B — Hardcoded Tenant Config

Add `appStoreUrl` and `androidDownloadUrl` to the tenant's entry in `HandleInertiaRequests::getTenantConfig()`:

```php
'your-tenant-name' => [
    // ... other config ...
    'appStoreUrl'         => 'https://apps.apple.com/gb/app/your-app/idXXXXXXXXX',
    'androidDownloadUrl'  => '/download/app-release.apk',
],
```

These are passed to every Inertia page as `tenantConfig.appStoreUrl` / `tenantConfig.androidDownloadUrl`.

---

## 4. How App Detection Works

### The `AppWebview::detect()` Method

`app/Support/AppWebview.php` is the single source of truth for deciding whether a request comes from the mobile app. It reads the HTTP `User-Agent` header and returns `true` if the request is from a recognised app webview.

```
Detection priority:
1. MightyWeb frozen UA  →  both tokens present  →  true
2. iOS WKWebView heuristic (no "Safari" in UA)   →  true
3. Android WebView heuristic (\bwv\b token, etc) →  true
4. Everything else                                →  false
```

The check that matters most for the MightyWeb platform is rule 1.

### The MightyWeb Frozen User-Agent

MightyWeb (the white-label app framework) sends the **same fixed user-agent string from both iOS and Android**:

```
Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1
```

The platform detects this by checking for **both** of these tokens simultaneously:

| Token | Why it's distinctive |
|-------|---------------------|
| `CPU iPhone OS 12_2 like Mac OS X` | Frozen iOS version — real devices never stay on 12.2 |
| `Mobile/15E148` | Frozen build number — only appears in this specific frozen UA |

```php
if (str_contains($ua, 'Mobile/15E148') && str_contains($ua, 'CPU iPhone OS 12_2 like Mac OS X')) {
    return true;
}
```

Both tokens must be present. Either alone is not enough. This pairing is unique to the MightyWeb app and will not be matched by any real device or desktop browser.

> **Why Android uses an iPhone UA:** MightyWeb uses a single frozen UA string regardless of the underlying device OS. This means an Android phone running the MightyWeb app also presents the iPhone 12_2 UA. The detection code accounts for this — it does not try to distinguish iOS from Android here, only "is this the app?" vs "is this a browser?".

### The `?app_view=1` Session Flag

As a secondary mechanism, any request with `?app_view=1` in the URL sets a **session flag** that marks the session as an app webview for its entire lifetime:

```php
if ($request->boolean('app_view')) {
    $request->session()->put('is_app_webview', true);
}
return $request->session()->get('is_app_webview', false)
    || \App\Support\AppWebview::detect($request->userAgent());
```

This is used in the MightyWeb **App Configuration** page (see MightyWeb setup below) so the session is flagged as an app session from the very first page load, even before any UA detection could run.

---

## 5. MightyWeb Configuration

### User Agent Setting

In the MightyWeb admin panel, go to **App Configuration** and set the custom user-agent to exactly:

```
Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1
```

This must be set **identically for both iOS and Android** builds. The codebase does not differentiate — it only checks for the frozen token pair.

Do not modify this string. If either `Mobile/15E148` or `CPU iPhone OS 12_2 like Mac OS X` is missing, app detection will fall through to the generic webview heuristics, which may produce inconsistent results across devices.

### Website URL in App Configuration

In MightyWeb's **App Configuration** page, append `?app_view=1` to the end of the website URL:

```
https://your-tenant-domain.com/?app_view=1
```

Replace `your-tenant-domain.com` with the actual tenant domain (e.g. `phatlads.com`, `winnerwinnercompetitions.co.uk`).

This ensures that on the very first page load inside the app, the session is immediately flagged as an app webview. Without this, a user who opens the app to a deep link (e.g. a direct competition URL) would not have the session flag set yet on that first request, though UA detection would still catch it.

### App Exclusives Page

In MightyWeb, add a **page** (or navigation item) pointing to the app-exclusive competitions listing:

```
https://your-tenant-domain.com/competitions?app_exclusives=true
```

Again replace `your-tenant-domain.com` with the tenant's actual domain.

When this URL is loaded, `CompetitionController::index()` filters the competitions query to `where('is_app_exclusive', true)`, returning only the gated competitions. The `AppExclusivesBanner` component (rendered inside the app only) also links to this same URL.

---

## 6. How the Feature Works End-to-End

### Frontend Gate (`useAppExclusive` composable)

Every competition card / quick-buy component uses the `useAppExclusive` composable:

```
isAppExclusiveBlocked = appExclusivesEnabled && isAppExclusive && !isAppWebview
```

- `appExclusivesEnabled` — from `page.props.appExclusivesEnabled` (tenant feature flag)
- `isAppExclusive` — from the competition object's `is_app_exclusive` boolean
- `isAppWebview` — from `page.props.isAppWebview` (set by `HandleInertiaRequests` via UA detection + session flag)

When `isAppExclusiveBlocked` is `true`, clicking the add-to-cart button calls `handleAppExclusiveClick()` instead of the normal flow. This opens the appropriate download URL in a new tab and aborts the add-to-cart action.

### Backend Gate (`BasketController`)

The backend independently re-checks on every `basket.store` and `basket.update` request:

```php
TenantFeature::isEnabled($tenant, 'enable_app_exclusives')
    && $competition->is_app_exclusive
    && ! AppWebview::detect($request->userAgent())
```

If all three conditions are true, the endpoint returns `HTTP 403` with `{ success: false, app_exclusive: true }`. This prevents bypassing the frontend gate by calling the API directly.

The checkout controller performs the same check for any basket containing an app-exclusive item.

### Checkout Gate

`CheckoutController` checks whether any item in the basket has `is_app_exclusive = true`. If so and the request is not from an app webview, the checkout is blocked server-side as well.

---

## 7. Summary Checklist

| Step | What to do |
|------|-----------|
| Migration | Run `php artisan migrate` to add `is_app_exclusive` column |
| Feature flag | Set `enable_app_exclusives = true` in `tenant_features` for the tenant |
| Download URLs | Add `appStoreUrl` + `androidDownloadUrl` to tenant config or Theme Builder app section |
| MightyWeb UA | Set frozen UA string (both iOS + Android builds) |
| MightyWeb website URL | Append `?app_view=1` to the app's starting website URL |
| MightyWeb page | Add page with URL `https://your-domain.com/competitions?app_exclusives=true` |
| Mark competitions | Tick **App Exclusive** on each competition in Admin → Competitions |
