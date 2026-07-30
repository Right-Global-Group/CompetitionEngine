# How to Deploy

Deploys are built once on GitHub and copied to whichever sites you pick. You click a button, choose your sites, and go — no terminal, no SSH, no commands.

> **TL;DR**
> 1. GitHub → **Actions** tab → **Deploy** → **Run workflow**.
> 2. Fill in three boxes: which code, which sites, what to run after.
> 3. Click the green button. Watch the ticks go green.

---

## Run a deploy — step by step

1. Open the repository on **GitHub**.
2. Click the **Actions** tab (top of the page).
3. In the left sidebar, click **Deploy**.
4. Click **Run workflow** (grey button, top-right). A little form drops down.
5. Fill in the **three boxes** (explained below).
6. Click the green **Run workflow** button.

That's it. The rest happens on its own.

### Box 1 — which code to ship

> *"Commit or branch to build & deploy"*

| Type this | What you get |
|---|---|
| `main` | Whatever is on the `main` branch right now. **The normal choice.** |
| `a1b2c3d4` | A commit ID — that exact commit and nothing else. Use when you want to be 100% sure what goes out. |

### Box 2 — which sites

> *"Targets"*

| You want to deploy to… | Type this |
|---|---|
| One site | `luckyducky` |
| A few sites | `luckyducky,madmac` (commas, no spaces) |
| A whole server's sites | `pod_2` (or `pod2` — both work) |
| Every site in the company | `all` |

⚠️ **Be careful with `all`.** It means *every site*. Most of the time you want to name specific sites.

💡 **Good habit:** deploying to a whole server? Send it to **one site first**, check it's happy, then send the rest of the pod.

### Box 3 — what to run after the files land

> *"What runs on the box after files land"*

| Option | What it does | When to use |
|---|---|---|
| `full` | Database updates + reference-data refresh + clear caches + restart workers | **Normal releases.** Safe default. |
| `assets-migrate` | Same, but skips the reference-data refresh | Quick hotfixes |

**When unsure, pick `full`.** It's safe to run every time — it only tops up missing reference data (statuses, themes, and so on) and **never touches customer data**.

---

## What happens after you click go

Three stages run automatically. You don't do anything — just watch.

| Stage | Time | What it's doing |
|---|---|---|
| **1. Setup** | seconds | Checks your site names are spelled right. If not, it stops here and tells you. Nothing has touched a server yet. |
| **2. Build** | ~2 min | Builds the app once (the slow bit — but only once for all sites). |
| **3. Deploy** | ~1 min per site | Copies files to each site, swaps the new version in instantly, then updates the database and restarts workers. |

If you picked several sites on the same server, they go one at a time (20 seconds apart) so they don't all hit the database at once.

---

## Reading the results

Click into the running job to watch it.

- ✅ **Green tick** = that step worked.
- ❌ **Red X** = that step failed — click it to read why.

Two things worth knowing:

- **Stage 1 fails?** Almost always a typo in a site name. The error lists the valid names.
- **One site fails but others pass?** That's fine — the others still finish. Open the failed site's log; it shows exactly which step broke.

---

## What a deploy will NOT touch

You don't have to worry about these — they're protected:

- ❌ It does **not** change any site's `.env` (passwords, keys, settings stay put).
- ❌ It does **not** touch the `storage/` folder (uploaded images, logs — all safe).
- ❌ It does **not** run installs on the server.
- ❌ It does **not** mix one site's files with another's. Each site only ever gets the shared, public app code — never another site's data.

---

## All the sites and their keys

Type the **key** (left column) into the *Targets* box.

| Key | Site | Server (pod) |
|---|---|---|
| `stagingvortex` | Vortex Staging | stagingvortex |
| `demo` | Demo | demo |
| `jolly` | Jolly | jolly |
| `ritas` | Ritas | ritas |
| `vortex` | Vortex | vortex |
| `winnerwinner` | Winner Winner | winnerwinner |
| `prizeparty` | Prize Party | prizeparty |
| `karma` | Karma | pod_1 |
| `auwins` | Auwins | pod_1 |
| `westcoast` | WestCoast | pod_1 |
| `topbanana` | Top Banana | pod_1 |
| `s2a` | S2A Competitions | pod_1 |
| `autocomps` | AutoComps | pod_2 |
| `luckyducky` | LuckyDucky | pod_2 |
| `lightning` | Lightning | pod_2 |
| `msmoneypenny` | MsMoneyPenny | pod_2 |
| `phantomgiveaways` | Phantom Giveaways | pod_2 |
| `deluxecomps` | Deluxe Comps | pod_2 |
| `luxsywins` | Luxsy Wins | pod_2 |
| `winthisnow` | WinThisNow | pod_3 |
| `enchanted` | Enchanted | pod_3 |
| `obriens` | Obriens | pod_3 |
| `lust` | Lust | pod_3 |
| `maxxx` | Maxxx | pod_3 |
| `smashdrop` | SmashDrop | pod_3 |
| `cairn` | Cairn | pod_4 |
| `wrights` | Wrights | pod_4 |
| `sunnygiveaways` | SunnyGiveaways | pod_4 |
| `itsyourluckyday` | ItsYourLuckyDay | pod_4 |
| `vincere` | Vincere | pod_4 |
| `mpcomps` | MPComps | pod_4 |
| `madmac` | MadMac | pod_5 |
| `podium` | Podium | pod_5 |
| `crazycat` | CrazyCat | pod_5 |
| `collectors` | Collectors Vault | pod_5 |

**Pod shorthands** (deploys every site on that server): `pod_1`, `pod_2`, `pod_3`, `pod_4`, `pod_5`, plus the single-site pods `stagingvortex`, `demo`, `jolly`, `ritas`, `vortex`, `winnerwinner`, `prizeparty`.

---

## Cheat sheet

```
Deploy main → one site (normal):
  code:   main
  sites:  luckyducky
  after:  full

Deploy an exact commit → one site:
  code:   a1b2c3d4
  sites:  luckyducky
  after:  full

Deploy main → a whole server:
  code:   main
  sites:  pod_2
  after:  full
```

---

## Adding a new site

When a new tenant goes live, add it to `.github/deploy/targets.json` so it appears as a deploy target. Each entry needs the site's server username and app folder, both from Cloudways:

```json
{ "key": "newsite", "name": "New Site", "pod": "pod_2",
  "host": "139.59.170.0", "master": "master_abc123", "appId": "xtdhvptrsb" }
```

- **`master`** — the server's master SSH username. Starts with `master_`. Found under the server's SSH/SFTP credentials.
- **`appId`** — the application's folder ID (a 10-character code like `xtdhvptrsb`). Found in the application's settings.

Open a PR with the change; once it's merged to `main`, the site is deployable.

---

*Stuck? The Setup stage error message usually tells you exactly what's wrong. If a real deploy fails, grab the failed step's log and ask in the dev channel.*
