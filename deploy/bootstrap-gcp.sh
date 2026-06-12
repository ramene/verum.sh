#!/usr/bin/env bash
# verum.sh — GCP bootstrap (App Engine + Route 53).
#
# Mirrors the apps/web GAE pattern from builds.karve.ai:
#   - Next.js + nodejs22 GAE runtime, scale-to-zero
#   - DNS in AWS Route 53 (verum.sh zone Z036423752F97VU7GU3K already exists)
#   - SSL via gcloud app domain-mappings --certificate-management=AUTOMATIC
#
# Run AFTER:
#   - gcloud auth login
#   - gcloud auth application-default login
#   - VERUM_BILLING_ACCOUNT env var set
#
# Idempotent: re-running skips steps that already succeeded.

set -euo pipefail

PROJECT_ID="${VERUM_GCP_PROJECT:-mae-stack-prod}"
REGION="${VERUM_GCP_REGION:-us-central}"   # NOTE: GAE region is 'us-central' not 'us-central1'
DOMAIN="${VERUM_DOMAIN:-verum.sh}"
ROUTE53_ZONE_ID="${VERUM_ROUTE53_ZONE:-Z036423752F97VU7GU3K}"
BILLING_ACCOUNT="${VERUM_BILLING_ACCOUNT:?Set VERUM_BILLING_ACCOUNT to your billing account ID (gcloud beta billing accounts list)}"

bold()  { printf '\033[1m%s\033[0m\n' "$1"; }
muted() { printf '\033[2m%s\033[0m\n' "$1"; }
warn()  { printf '\033[33m%s\033[0m\n' "$1" >&2; }

# ─── 1. Project ─────────────────────────────────────────────────────
if ! gcloud projects describe "$PROJECT_ID" >/dev/null 2>&1; then
  bold "Creating project: $PROJECT_ID"
  gcloud projects create "$PROJECT_ID" --name="mae-stack"
else
  muted "Project $PROJECT_ID exists, skipping create"
fi
gcloud config set project "$PROJECT_ID"

# ─── 2. Billing ─────────────────────────────────────────────────────
CURRENT_BILLING="$(gcloud beta billing projects describe "$PROJECT_ID" --format='value(billingAccountName)' 2>/dev/null || echo '')"
if [ -z "$CURRENT_BILLING" ]; then
  bold "Linking billing account: $BILLING_ACCOUNT"
  gcloud beta billing projects link "$PROJECT_ID" --billing-account="$BILLING_ACCOUNT"
else
  muted "Billing already linked, skipping"
fi

# ─── 3. APIs ────────────────────────────────────────────────────────
bold "Enabling required APIs"
gcloud services enable \
  appengine.googleapis.com \
  appenginereporting.googleapis.com \
  cloudbuild.googleapis.com

# ─── 4. Initialize App Engine application ──────────────────────────
if ! gcloud app describe >/dev/null 2>&1; then
  bold "Creating App Engine application in $REGION"
  gcloud app create --region="$REGION"
else
  muted "App Engine app exists, skipping create"
fi

# ─── 5. Build Next.js locally before deploying ─────────────────────
bold "Building verum.sh locally"
( cd "$(dirname "$0")/.." && pnpm install --frozen-lockfile && NEXT_TELEMETRY_DISABLED=1 pnpm build )

# ─── 6. Deploy to GAE ──────────────────────────────────────────────
VERSION_ID="prod-$(date +%Y%m%d-%H%M%S)"
bold "Deploying to App Engine: version $VERSION_ID"
( cd "$(dirname "$0")/.." && gcloud app deploy app.yaml --quiet --promote --version="$VERSION_ID" )

# Capture the GAE service URL
GAE_URL="$(gcloud app describe --format='value(defaultHostname)')"
muted "  → https://${GAE_URL}"

# ─── 7. Domain mapping + auto SSL ──────────────────────────────────
if gcloud app domain-mappings describe "$DOMAIN" >/dev/null 2>&1; then
  muted "Domain mapping for $DOMAIN exists, skipping"
else
  bold "Creating domain mapping for $DOMAIN with automatic SSL"
  if ! gcloud app domain-mappings create "$DOMAIN" \
      --certificate-management=AUTOMATIC \
      --quiet 2>&1; then
    warn "Domain mapping failed."
    warn "Most likely cause: $DOMAIN is not yet verified in Search Console."
    warn "Visit https://search.google.com/search-console, add $DOMAIN as a Domain property,"
    warn "copy the TXT verification record, add it to Route 53 zone $ROUTE53_ZONE_ID, click Verify,"
    warn "then re-run this script."
    exit 1
  fi
fi

# ─── 8. Print Route 53 records to add ──────────────────────────────
echo
bold "═══════════════════════════════════════════════════════════════════"
bold "  Route 53 records to add for $DOMAIN (zone $ROUTE53_ZONE_ID)"
bold "═══════════════════════════════════════════════════════════════════"

# Get the DNS records GAE expects.
MAPPING_JSON="$(gcloud app domain-mappings describe "$DOMAIN" --format=json)"
echo "$MAPPING_JSON" | python3 -c '
import json, sys
m = json.load(sys.stdin)
print()
print("From GAE domain-mapping resource records:")
print(json.dumps(m.get("resourceRecords", []), indent=2))
print()
'

cat <<EOF

APEX A records (the load-bearing 4):
  Name:  $DOMAIN.
  Type:  A
  TTL:   300
  Value: 216.239.32.21
         216.239.34.21
         216.239.36.21
         216.239.38.21

AAAA records (IPv6, optional but recommended):
  Name:  $DOMAIN.
  Type:  AAAA
  TTL:   300
  Value: 2001:4860:4802:32::15
         2001:4860:4802:34::15
         2001:4860:4802:36::15
         2001:4860:4802:38::15

WWW subdomain (optional):
  Name:  www.$DOMAIN.
  Type:  CNAME
  TTL:   300
  Value: ghs.googlehosted.com.
EOF

echo
bold "═══════════════════════════════════════════════════════════════════"
echo
muted "Add via AWS Route 53 console OR via aws cli:"
echo
cat <<EOF
aws route53 change-resource-record-sets \\
  --hosted-zone-id $ROUTE53_ZONE_ID \\
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "$DOMAIN.",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {"Value": "216.239.32.21"},
          {"Value": "216.239.34.21"},
          {"Value": "216.239.36.21"},
          {"Value": "216.239.38.21"}
        ]
      }
    }]
  }'
EOF

echo
bold "GCP Console URLs (project: $PROJECT_ID)"
muted "  App Engine versions:    https://console.cloud.google.com/appengine/versions?project=${PROJECT_ID}"
muted "  Domain mappings:        https://console.cloud.google.com/appengine/settings/domains?project=${PROJECT_ID}"
muted "  SSL certificates:       https://console.cloud.google.com/appengine/settings/certificates?project=${PROJECT_ID}"
muted "  Search Console verify:  https://search.google.com/search-console/welcome"

echo
bold "Direct GAE URL (use until DNS propagates):"
echo "  https://${GAE_URL}"
echo
bold "Next:"
muted "  1. Add Route 53 A records above"
muted "  2. Wait 5-15 min for DNS propagation"
muted "  3. SSL cert auto-provisions when DNS resolves (~15-60 min)"
muted "  4. Test: curl -fsSL https://${DOMAIN}/install | head -5"
echo
