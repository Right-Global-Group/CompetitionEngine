# Provisioning Deploy Keys

This fixes/prevents the "horizon:terminate failed... master not bounced" deploy
warning. It happens when a tenant's Cloudways app is missing the SSH deploy
key the CI pipeline needs to restart Horizon after each deploy.
`provision-deploy-key.sh` (below) sets that up.

> **TL;DR** — save the script below, export your Cloudways credentials, then
> run it with `--dry-run` first and `--apply` once you're happy.

---

## One-time setup

1. Get a Cloudways API key: Cloudways panel → account menu (top right) →
   **API Access** → generate/copy.
2. Save the script from [The script](#the-script) below as
   `provision-deploy-key.sh` somewhere sensible, e.g.
   `~/rgg/provision-deploy-key.sh`.
3. Make it runnable (only needed once):
   ```bash
   chmod +x provision-deploy-key.sh
   ```

---

## Every time you use it

1. Export your Cloudways credentials (do this once per terminal session):
   ```bash
   export CW_EMAIL="your-cloudways-login-email"
   export CW_API_KEY="your-api-key-from-step-1"
   ```

2. Find the tenant's `host` and `appId` in `.github/deploy/targets.json` —
   they're right there in that tenant's entry, e.g.:
   ```json
   { "key": "jackpotjoker", "name": "JackpotJoker", "pod": "pod_3", "host": "178.128.164.3", "master": "master_xawhgqhsdb", "appId": "mbthyrnfzc" }
   ```
   You want `host` and `appId` — nothing else needed, no Cloudways UI digging.

3. **Preview first** (this is the default — it changes nothing either way,
   but `--dry-run` says so explicitly if you want to be sure):
   ```bash
   ./provision-deploy-key.sh --key jackpotjoker --host 178.128.164.3 --app-id mbthyrnfzc --dry-run
   ```
   Read the `PLAN:` line it prints. It'll say either:
   - the credential already has a working key → nothing to do, stop here.
   - it needs to create/attach one → move to step 4.

4. **Apply it for real:**
   ```bash
   ./provision-deploy-key.sh --key jackpotjoker --host 178.128.164.3 --app-id mbthyrnfzc --apply
   ```
   This creates the `rgg-deploy-<appId>` Cloudways credential if it doesn't
   exist, attaches the deploy key, then polls Cloudways for up to 2 minutes
   to confirm the key actually registered (Cloudways' API can report success
   without the key really sticking — this catches that instead of trusting
   it blindly).

5. **If it prints `SUCCESS`** — you're done. Re-run the tenant's deploy from
   GitHub Actions and confirm the Horizon warning is gone.

6. **If it prints `FAILED`** — the script will print exact instructions,
   but in short: Cloudways' API silently failed to attach the key (a known
   flakiness, not something wrong with what you did). Go into the Cloudways
   panel instead: **Server → Application Management → [tenant] → Access
   Details** → find the credential named `rgg-deploy-<appId>` → add an SSH
   key manually. The script's failure message gives you the exact label and
   key value to paste in.

---

## Other flags, if you ever need them

- `--label NAME` / `--pubkey "ssh-ed25519 ..."` — only relevant if the deploy
  key ever gets rotated (both the GitHub Actions `DEPLOY_SSH_KEY` secret and
  every tenant's registered key would need to change together — that's a
  bigger job, not a routine one).
- `--verify-attempts N` / `--verify-interval SECS` — tune how long it polls
  before giving up (default 12 attempts × 10s = 2 minutes).
- `-h` / `--help` — full flag reference any time.

---

## When to run this

Any time a new tenant gets added to `.github/deploy/targets.json`, run this
against it as part of onboarding — before or right after the first deploy,
so it doesn't surface as a silent warning weeks later.

---

## The script

Save this as `provision-deploy-key.sh`:

```bash
#!/usr/bin/env bash
#
# Provisions the rgg-deploy-<appId> Cloudways app credential + the CI deploy
# key for one tenant, so the deploy workflow can bounce Horizon as the app
# user by KEY instead of a password.
#
# Usage:
#   export CW_EMAIL="you@rightglobalgroup.com"
#   export CW_API_KEY="xxxx"                 # Cloudways panel -> account menu -> API Access
#   ./provision-deploy-key.sh --host 178.128.164.3 --app-id mbthyrnfzc [--key jackpotjoker] [--apply]
#
# --host and --app-id come straight from the tenant's entry in targets.json
# (the "host" and "appId" fields). Everything else (numeric server id, numeric
# app id, credential creation, key attach, verification) is resolved for you.
#
# Dry-run by default — prints the plan, changes nothing. Pass --apply to mutate,
# or pass --dry-run explicitly if you'd rather say so out loud (same behaviour).

set -u

API="https://api.cloudways.com/api/v2"
KEY_LABEL="rgg-ci-deploy"
PUBKEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFUaRdFOIYoEjMbdnLKAiK+4pzkQixR0M5QAbS7HcQDP rgg-github-actions-deploy"
APPLY=false
APPLY_FLAG_SEEN=false
DRYRUN_FLAG_SEEN=false
TENANT_KEY=""
HOST=""
APP_SYS_USER=""
VERIFY_ATTEMPTS=12   # 12 x 10s = 2 minutes — matches what we proved necessary in practice
VERIFY_INTERVAL=10

usage() {
  cat <<EOF
Usage: $0 --host <ip> --app-id <cloudways-sys-user> [options]

Required:
  --host IP            Server public IP (targets.json "host" field)
  --app-id SYS_USER     App's Cloudways system user (targets.json "appId" field)

Options:
  --key NAME             Tenant key/name, for display only (targets.json "key" field)
  --apply                 Actually make changes (default behaviour is dry-run)
  --dry-run                Explicitly preview only, change nothing (this is the default anyway)
  --pubkey "ssh-ed25519 ..."   Override the deploy public key (default: the standard rgg-ci-deploy key)
  --label NAME            Override the SSH key label (default: rgg-ci-deploy)
  --verify-attempts N      How many times to poll for the key to register (default: 12)
  --verify-interval SECS   Seconds between verify polls (default: 10)
  -h, --help               Show this help

Env vars (required):
  CW_EMAIL      Cloudways account email
  CW_API_KEY    Cloudways API key (panel -> account menu -> API Access)
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --host) HOST="$2"; shift 2 ;;
    --app-id) APP_SYS_USER="$2"; shift 2 ;;
    --key) TENANT_KEY="$2"; shift 2 ;;
    --apply) APPLY=true; APPLY_FLAG_SEEN=true; shift ;;
    --dry-run) APPLY=false; DRYRUN_FLAG_SEEN=true; shift ;;
    --pubkey) PUBKEY="$2"; shift 2 ;;
    --label) KEY_LABEL="$2"; shift 2 ;;
    --verify-attempts) VERIFY_ATTEMPTS="$2"; shift 2 ;;
    --verify-interval) VERIFY_INTERVAL="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage; exit 1 ;;
  esac
done

if [ "$APPLY_FLAG_SEEN" = true ] && [ "$DRYRUN_FLAG_SEEN" = true ]; then
  echo "ERROR: pass either --apply or --dry-run, not both." >&2
  exit 1
fi
if [ -z "$HOST" ] || [ -z "$APP_SYS_USER" ]; then
  echo "ERROR: --host and --app-id are required." >&2
  usage
  exit 1
fi
if [ -z "${CW_EMAIL:-}" ] || [ -z "${CW_API_KEY:-}" ]; then
  echo "ERROR: set CW_EMAIL and CW_API_KEY first (Cloudways panel -> account menu -> API Access)." >&2
  exit 1
fi

CRED_USER="rgg-deploy-${APP_SYS_USER}"
LABEL_FOR_DISPLAY="${TENANT_KEY:-$APP_SYS_USER}"

echo "== provisioning deploy key for ${LABEL_FOR_DISPLAY} (${HOST} / ${APP_SYS_USER}) =="
echo "mode: $([ "$APPLY" = true ] && echo APPLY || echo 'DRY-RUN (no changes)')"
echo

# small JSON helpers — kept internal, you never need to touch these
json_get() { python3 -c "import json,sys; d=json.load(sys.stdin); print(d$1)" 2>/dev/null; }

echo "-- authenticating --"
AUTH_RESP=$(curl -s -X POST "$API/oauth/access_token" \
  --data-urlencode "email=$CW_EMAIL" --data-urlencode "api_key=$CW_API_KEY")
TOKEN=$(echo "$AUTH_RESP" | json_get "['access_token']")
if [ -z "$TOKEN" ]; then
  echo "ERROR: authentication failed: $AUTH_RESP" >&2
  exit 1
fi
echo "ok"
echo

echo "-- resolving server + app --"
SERVERS_RESP=$(curl -s "$API/server" -H "Authorization: Bearer $TOKEN" -H "Accept: application/json")
RESOLVED=$(echo "$SERVERS_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
servers = d.get('servers', d if isinstance(d, list) else [])
for s in servers:
    if s.get('public_ip') == '$HOST':
        for a in s.get('apps', []):
            if a.get('sys_user') == '$APP_SYS_USER':
                print(s.get('id'), a.get('id'))
                sys.exit(0)
" 2>/dev/null)

if [ -z "$RESOLVED" ]; then
  echo "ERROR: could not find an app with sys_user '$APP_SYS_USER' on server '$HOST' in Cloudways." >&2
  echo "       Double check --host and --app-id match the tenant's targets.json entry." >&2
  exit 1
fi
SERVER_ID=$(echo "$RESOLVED" | cut -d' ' -f1)
APP_ID=$(echo "$RESOLVED" | cut -d' ' -f2)
echo "server_id=$SERVER_ID  app_id=$APP_ID"
echo

find_cred() {
  curl -s "$API/app/creds?server_id=$SERVER_ID&app_id=$APP_ID" \
    -H "Authorization: Bearer $TOKEN" -H "Accept: application/json"
}

CREDS_RESP=$(find_cred)
CRED_ID=$(echo "$CREDS_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for c in d.get('app_creds', []):
    if c.get('sys_user') == '$CRED_USER':
        print(c.get('id'))
        sys.exit(0)
" 2>/dev/null)
HAS_KEY=$(echo "$CREDS_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for c in d.get('app_creds', []):
    if c.get('sys_user') == '$CRED_USER':
        for k in c.get('ssh_keys', []):
            if k.get('label') == '$KEY_LABEL' and k.get('ssh_key_id'):
                print('yes')
                sys.exit(0)
" 2>/dev/null)

if [ "$HAS_KEY" = "yes" ]; then
  echo "OK: credential '$CRED_USER' already has a working '$KEY_LABEL' key (cred id $CRED_ID). Nothing to do."
  exit 0
fi

if [ -n "$CRED_ID" ]; then
  echo "PLAN: credential '$CRED_USER' exists (id $CRED_ID) but has no working '$KEY_LABEL' key — will attach one."
else
  echo "PLAN: credential '$CRED_USER' does not exist — will create it, then attach '$KEY_LABEL'."
fi

if [ "$APPLY" != true ]; then
  echo
  echo "Dry-run only — re-run with --apply to make this change."
  exit 0
fi

echo
if [ -z "$CRED_ID" ]; then
  echo "-- creating credential --"
  PASSWORD=$(python3 -c "import secrets,string; print(''.join(secrets.choice(string.ascii_letters+string.digits) for _ in range(24)))")
  CREATE_RESP=$(curl -s -X POST "$API/app/creds" \
    --data-urlencode "server_id=$SERVER_ID" --data-urlencode "app_id=$APP_ID" \
    --data-urlencode "username=$CRED_USER" --data-urlencode "password=$PASSWORD" \
    -H "Authorization: Bearer $TOKEN" -H "Accept: application/json")
  echo "$CREATE_RESP"
  sleep 10
  CREDS_RESP=$(find_cred)
  CRED_ID=$(echo "$CREDS_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for c in d.get('app_creds', []):
    if c.get('sys_user') == '$CRED_USER':
        print(c.get('id'))
        sys.exit(0)
" 2>/dev/null)
  if [ -z "$CRED_ID" ]; then
    echo "ERROR: credential was not found after creation — aborting." >&2
    exit 1
  fi
  echo "credential id: $CRED_ID"
  echo
fi

echo "-- attaching key --"
ATTACH_RESP=$(curl -s -X POST "$API/ssh_key" \
  --data-urlencode "server_id=$SERVER_ID" --data-urlencode "app_creds_id=$CRED_ID" \
  --data-urlencode "ssh_key_name=$KEY_LABEL" --data-urlencode "ssh_key=$PUBKEY" \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/json")
echo "$ATTACH_RESP"
echo

echo "-- verifying (Cloudways can lag; polling up to $((VERIFY_ATTEMPTS * VERIFY_INTERVAL))s) --"
i=1
while [ "$i" -le "$VERIFY_ATTEMPTS" ]; do
  sleep "$VERIFY_INTERVAL"
  CHECK_RESP=$(find_cred)
  OK=$(echo "$CHECK_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for c in d.get('app_creds', []):
    if c.get('sys_user') == '$CRED_USER':
        for k in c.get('ssh_keys', []):
            if k.get('label') == '$KEY_LABEL' and k.get('ssh_key_id'):
                print('yes')
                sys.exit(0)
" 2>/dev/null)
  echo "  check $i/$VERIFY_ATTEMPTS: $([ "$OK" = "yes" ] && echo FOUND || echo 'not yet')"
  if [ "$OK" = "yes" ]; then
    echo
    echo "SUCCESS: key verified attached to $CRED_USER."
    exit 0
  fi
  i=$((i + 1))
done

echo
echo "FAILED: key never registered after $((VERIFY_ATTEMPTS * VERIFY_INTERVAL))s of polling." >&2
echo "        This is a known Cloudways API flakiness — the attach call reports success but doesn't persist." >&2
echo "        Fix it through the Cloudways panel instead: Server -> Application Management -> ${LABEL_FOR_DISPLAY}" >&2
echo "        -> Access Details -> find credential '$CRED_USER' -> add SSH key manually with this label/key:" >&2
echo "        label: $KEY_LABEL" >&2
echo "        key:   $PUBKEY" >&2
exit 1
```
