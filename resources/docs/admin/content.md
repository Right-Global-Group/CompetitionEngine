# Content Management

> Manage the visual and editorial content that appears on the customer-facing site.

---

## Carousels

Carousels are image sliders that appear on the customer-facing site, typically on the homepage. Each carousel contains one or more slides and is assigned to a specific page location.

### Managing carousels

The carousel list shows all carousels with their name, assigned page, status, and creation date.

**Creating or editing a carousel:**

- Set the carousel name and the page it appears on (e.g. homepage).
- Add slides — each slide has an image, an optional link, and a display order.
- Set the status to Active to make it live, or Inactive to hide it.

Slides can be reordered by dragging. Images are uploaded via the Media library.

---

## Pages

Custom pages let you create standalone content pages that appear on the site — typically linked from the header or footer navigation.

### Managing pages

The pages list shows all pages with title, URL slug, published status, and last updated date.

**Creating or editing a page:**

- Set the page title and URL slug (e.g. `terms-and-conditions` becomes `/terms-and-conditions`).
- Write the page content using the rich text editor.
- Toggle **Published** to make the page live or hide it from customers.
- Assign the page to one or more **locations** — these control where navigation links to the page appear (e.g. footer, header). Removing all locations hides the link without unpublishing the page.

Deleting a page removes it permanently and clears it from any navigation locations it was assigned to.

---

## Media

The Media library is a central store for images and video files used across the platform — carousel slides, competition galleries, instant win category images, and anywhere else an image URL is needed.

### Uploading files

Click **Upload** and select one or more files. Supported formats include JPEG, PNG, GIF, WebP, MP4, MP3, and other common image and audio/video types. Files up to 50 MB are accepted.

You can organise uploads into folders by specifying a folder name before uploading. Uploaded files are stored permanently and served with long cache headers.

### Using media elsewhere

Once uploaded, copy the file URL from the media library and paste it into whichever field requires it — carousel slide images, instant win category images, competition gallery items, and so on.

### Deleting files

Click the delete icon on any file to remove it permanently. Any existing references to the deleted file URL will break, so confirm the file is no longer in use before deleting.

---

## Games

Games are interactive mini-games that attach to competitions and play during the entry experience. Each game is configured independently with its own visual settings, sounds, and behaviour, then selected when creating a competition.

A game must be created and configured here before it can be attached to a competition. Once a competition has been published with a game attached, the game setting is locked for that competition.

### Game types

The following game types are available on the platform:

| Game | What it is |
|------|-----------|
| **Scratchy** | A scratch card reveal. The customer scratches a virtual card to uncover whether they have won an instant prize. |
| **Spinny** | A spinning wheel the customer triggers after purchasing tickets. The wheel lands on a prize or a no-win outcome. |
| **Slots** | A slot machine animation. The customer pulls a lever or presses spin to reveal a combination of symbols. |
| **Bingo** | A bingo card game where numbers are called and the customer marks them off. Patterns on the card determine wins. |
| **Coin Drop** | A Plinko-style game where the customer drops a coin through a board of pegs into prize buckets below. |
| **Pop Game** | The customer pops one of a grid of items — balloons, presents, or custom objects — to reveal a prize or no win. |
| **Vault** | A combination lock game. The customer enters a combination and receives a bonus payout when they hit a winning sequence. Combos are tracked and payouts are credited automatically. |
| **Claw Machine** | An animated claw machine. The customer controls the claw to grab a prize from the machine. |
| **Chest** | Similar to Vault — the customer opens a chest to reveal a prize. Supports themed visuals and combo bonuses. |
| **Bingo Bango** | A more elaborate bingo variant with a live-style host, animated ball draws, pattern-based winning, and full audio. |
| **Coin Drop v2** | An enhanced version of Coin Drop with bonus emoji triggers, a blackout mode, and a scratch card reveal for matched combinations. |

### Creating a game

Click **Create Game** and select the game type. Each type opens its own configuration form with settings specific to that game. Common settings across all types include:

- **Name** — an internal label for the game (shown in the competition form dropdown).
- **Background / Header** — images or colours used for the game wrapper.
- **Colours** — primary, secondary, accent, and text colours that control the game's visual theme.
- **Sounds** — audio files for events such as the spin, win, loss, scratch, or drop. All sound fields accept a URL from the Media library.

### Game-specific settings

Each game type has additional settings beyond the shared fields above.

**Scratchy** — scratch card background, surface colour, border, container background, button colour, title text, intro video, and layout style.

**Spinny** — wheel edge colour, wallet text and colour, title image, and logo.

**Slots** — machine image, footer image, spin button image, and machine background and border colours.

**Bingo** — card cover image, diamond emoji, background gradient start and end colours, frame colour and glow, square background and text colours, diamond colours, winner glow and background, and popup gradient colours.

**Coin Drop** — board background colour, peg colour and glow, ball colour, glow and image, trail colour, win and lose bucket colours and images, tube image, game background, drop button image, and peg shape.

**Pop Game** — item type (balloon, present, or custom image), item image, background colour, win and lose colours, subtitle text, item label, item colours (array), and confetti colours.

**Vault** — theme selection, custom SVG, button text, text colour, emoji symbol, credit keyword, combo tier 3 video, how-to-play video and images, background image, footer image, open sound, and title image.

**Claw Machine** — claw colour and glow, arm and rope colour, drop zone colour and image, joystick colour and ball image, grab and move sounds, controls background, machine left and right images, plushie glow colour, and up to six prize images.

**Chest** — same structure as Vault with chest-specific theme, SVG, button text, colour, emoji, combo video, background, footer, open sound, and how-to-play assets.

**Bingo Bango** — full theme control including background gradient and image, gold and ivory palette, sphere and chute colours, per-column colours (B/I/N/G/O), host emoji, image and ring colour, card background gradient and border, cell and marked cell colours, winner glow, win line gradient, call sound, background music, voice name, brand text and subtext, host name and intro text, finish title and subtitle, no-win message, enabled patterns, and pattern rules.

**Coin Drop v2** — all standard Coin Drop settings plus: trigger emoji and image, trigger bucket colour and glow, blackout video and sound, blackout intro text and colour, scratch card back image and colour, scratch card background image, colour and border, scratch card title text and colour, match and no-match sounds, celebration video, consolation text and colour, and bonus emoji symbols.

### Editing and deleting games

Open any game from the list to edit its settings. Changes take effect immediately for any future competition entries — they do not affect competitions already in progress.

Deleting a game removes it from the system. Competitions that already have this game attached will retain their existing setting, but the game will no longer appear as an option when creating new competitions.

---

## Vault Tracking

The Vault Tracking page shows a log of all vault combo events — instances where a customer unlocked a combo bonus during a competition entry.

| Section | What it shows |
|---------|--------------|
| **Summary stats** | Total combos triggered, total payout value, unique users, and total orders containing combos. |
| **Per-competition breakdown** | The same stats split by individual competition. |
| **Full log** | A paginated table of every combo event showing customer, competition, combo number, tier, and payout amount. |

Vault combo payouts are credited automatically at order approval — this page is a read-only audit log.

---

## Chest Tracking

The same structure as Vault Tracking but for Chest game combo events. Shows a summary of total combos and payouts, a per-competition breakdown, and a paginated log of individual events by customer and competition.

---

## Coin Drop v2 Tracking

The same structure as above for Coin Drop v2 game events — summary stats, per-competition breakdown, and a full event log.

---

## Promo Slider

The Promo Slider is a configurable promotional banner that appears on the customer-facing site. Unlike a carousel, it is text and colour based rather than image based.

Use this page to configure the slider content — the message, background colour, text colour, and any accompanying links. Changes take effect immediately after saving.

A **Reset to Defaults** button restores the slider to its original configuration if needed.

---

## Entry Route

The Entry Route page configures the free postal entry instructions shown to customers. UK competition law requires an alternative free entry method — this page controls the text that explains it.

You can configure:

- The introductory text explaining how to enter by post.
- The fields customers must include (name, address, date of birth, email, contact number).
- The address the postcard should be sent to.
- Any additional notes or legal text required for your operator setup.

A **Reset to Defaults** button restores the standard text for your platform configuration.

---

## Upsell

The Upsell page lets you create pop-up promotions that show customers additional competitions to enter while they are browsing, adding to basket, or at checkout.

### Creating an upsell entry

| Setting | What it does |
|---------|-------------|
| **Name** | Internal label for this entry — not shown to customers. |
| **Trigger competitions** | The competitions that, when viewed or added to basket, activate the popup. Leave empty to trigger on all competitions. |
| **Upsell competitions** | The competitions shown in the popup. |
| **Headline / Subheadline** | The text displayed at the top of the popup. |
| **Trigger event** | Whether the popup fires when a customer views a competition or adds one to their basket. |
| **Display locations** | Where the popup can appear — homepage, basket, checkout, or competition view. |
| **Delay seconds** | How long to wait before showing the popup on basket and checkout pages. |
| **Valid until** | An optional expiry date — the entry deactivates automatically after this date. |
| **Active** | Toggle to enable or disable the entry without deleting it. |

### Conversion stats

The Upsell page includes a conversion stats view showing how many times each entry was displayed, clicked, and resulted in an actual purchase of the promoted competition.