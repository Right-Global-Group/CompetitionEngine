# Winners & Draw

> Manage draw winners, the winner gallery, and the live winner reveal tool.

---

## Winners

The Winners page lists every draw winner and instant win winner recorded on the platform. From here you can search winners, create manual winner records, edit existing ones, delete them, and export winner data.

### Filtering

The search bar matches on winner name, competition name, and prize. You can also filter by date range (won date) and by win type: **Draw** (ticket-draw winners) or **Instant** (instant win prizes).

### Winner record fields

| Field | Description |
|-------|-------------|
| **Winner Name** | The customer's name as recorded at the time of the draw |
| **Competition Name** | The competition this win is associated with |
| **Prize** | The prize description |
| **Ticket Number** | The winning ticket number (draw wins only) |
| **Won Date** | When the win occurred |
| **Image Path** | Optional image used in the winner gallery |

### Creating a manual winner

Click **Create Winner** and fill in the winner name, competition name, prize, optional image, and won date. Manual winners appear in the winner list and winner gallery but are not linked to a real ticket or RNG draw — they are used for administrative adjustments or promotions.

### Editing a winner

Click any winner row to open the edit form. You can update the winner name, competition name, prize, image, and won date.

### Deleting a winner

Click the delete icon on a winner row. This permanently removes the winner record. Winner records linked to a real draw (with an RNG audit log ID) should generally not be deleted without good reason, as this breaks the audit trail.

### Exporting winners

Click **Export CSV** and select your columns. Available columns:

`id, win_type, first_name, last_name, email, phone, address_line_1, address_line_2, city, county, postcode, country, competition_name, prize, instant_win_category, ticket_number, won_date`

You can filter by date range and win type before exporting to target a specific time period or prize type.

---

## Winner Gallery

The Winner Gallery page controls which winner records appear in the public-facing gallery on the competition site. Winners with an image attached are eligible to show in the gallery.

You can manage the gallery entries, re-order them, and toggle individual winners on or off from public view.

---

## Reveal Winner

The Reveal Winner tool is used to conduct a live draw on screen — typically streamed or recorded as part of the competition experience.

### Before you begin

A competition must be **Prepared for Draw** before it appears in the Reveal Winner tool. To prepare a competition:

1. Go to **Competitions** and open the competition.
2. Click **Prepare for Draw** — this sets the end and draw dates to now if they are still in the future.
3. The competition will now appear as an option in Reveal Winner.

{% hint style="warning" %}
Once a competition is prepared for draw, instant win settings can no longer be edited.
{% endhint %}

### Draw flow

```
Admin opens Reveal Winner
        │
        ▼
Select competition from dropdown
        │
        ▼
Confirm draw (type CONFIRM)
        │
        ▼
RNG generates winning ticket index
(certified PHP random_int via /dev/urandom)
        │
        ▼
Winning ticket resolved → winner record created
        │
        ▼
Winner name and ticket number displayed on screen
        │
        ▼
Competition marked as drawn
```

The draw uses a certified random number generator (PHP `random_int()`, which reads from `/dev/urandom`). Every draw is logged to the RNG audit trail — see [Draw History](admin/rng-compliance) for details.

---

## Draw History

The Draw History page (listed in the sidebar as **Draw History**) provides an audit trail of every competition draw conducted through the platform.

Each entry shows:

| Column | Description |
|--------|-------------|
| **Competition** | The competition that was drawn |
| **Winner Name** | The name of the winning customer |
| **Ticket Number** | The winning ticket number |
| **Chain Sequence** | The sequential position of this draw in the RNG audit chain |
| **Event Hash** | A cryptographic hash of the draw event for tamper detection |
| **Date** | When the draw was conducted |

The audit trail only shows draws that produced a real winner — test generations or draws that were not completed do not appear here.

### Verifying a draw

Each draw record includes the event hash and chain sequence number. These can be used to verify the integrity of the draw independently. The RNG system maintains a chained hash structure so that any tampering with historical records would break the chain.

### Compliance export

You can export the full RNG audit trail as a JSON file suitable for submission to gaming authorities. The export includes:

- All draw events with input parameters, output values, and hashes
- Chain integrity metadata
- Report metadata including generation timestamp, platform name, and RNG method declaration (`PHP random_int() — CSPRNG via /dev/urandom`)

The report format is designed to meet GLI-19 certification requirements.