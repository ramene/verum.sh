#!/usr/bin/env bash
# verum.sh — one-shot GCP bootstrap.
#
# DNS lives in AWS Route 53 (same pattern as micropayments.to / .ai / .id).
# This script handles ONLY the GCP side: project, billing, APIs, Cloud Run
# build/deploy, domain mapping. AFTER the script, it prints the exact
# Route 53 records to add via:
#   aws route53 change-resource-record-sets --hosted-zone-id Z036423752F97VU7GU3K ...
#
# Run AFTER:
#   - gcloud auth login
#   - gcloud auth application-default login
#   - VERUM_BILLING_ACCOUNT env var set (gcloud beta billing accounts list)
#
# Idempotent: re-running skips steps that already succeeded.

set -euo pipefail

# ─── Config (override via env) ──────────────────────────────────────
PROJECT_ID="${VERUM_GCP_PROJECT:-mae-stack-prod}"
REGION="${VERUM_GCP_REGION:-us-central1}"
SERVICE="${VERUM_GCP_SERVICE:-verum-sh}"
REPO="${VERUM_GCP_REPO:-verum-sh}"
DOMAIN="${VERUM_DOMAIN:-verum.sh}"
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
# NOTE: dns.googleapis.com NOT enabled — DNS lives in AWS Route 53.
bold "Enabling required APIs"
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com

# ─── 4. Artifact Registry ───────────────────────────────────────────
if ! gcloud artifacts repositories describe "$REPO" --location="$REGION" >/dev/null 2>&1; then
  bold "Creating Artifact Registry: $REPO"
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="verum.sh Docker images"
else
  muted "Repo $REPO exists, skipping"
fi

# ─── 5. Domain verification check ──────────────────────────────────
# Cloud Run domain mapping requires that Google Search Console verifies
# domain ownership FIRST. This must be done interactively at:
#   https://search.google.com/search-console/welcome
# enter "verum.sh", select "Domain" property, copy the TXT record value,
# add to Route 53 (we print the aws cli below), then click VERIFY.
# Skip the mapping step here if not yet verified.

# ─── 6. First Cloud Build ──────────────────────────────────────────
bold "Submitting first Cloud Build → Cloud Run deploy"
muted "Subsequent builds happen on push to main once we set up the trigger."
gcloud builds submit --config=cloudbuild.yaml .

# Capture the Cloud Run URL so we can print it next to the DNS records.
RUN_URL="$(gcloud run services describe "$SERVICE" --region="$REGION" --format='value(status.url)' 2>/dev/null || echo '')"

# ─── 7. Cloud Run domain mapping (only if verified) ────────────────
if gcloud beta run domain-mappings describe --domain="$DOMAIN" --region="$REGION" >/dev/null 2>&1; then
  muted "Domain mapping for $DOMAIN exists, skipping"
else
  bold "Attempting to create domain mapping for $DOMAIN → $SERVICE"
  if gcloud beta run domain-mappings create \
      --service="$SERVICE" \
      --domain="$DOMAIN" \
      --region="$REGION" 2>&1; then
    muted "Domain mapping created"
  else
    warn "Domain mapping failed — most likely $DOMAIN is not yet verified."
    warn "Visit https://search.google.com/search-console, add domain $DOMAIN,"
    warn "copy the TXT verification record, paste it into Route 53 (zone Z036423752F97VU7GU3K),"
    warn "verify, then re-run this script."
  fi
fi

# ─── 8. Print the Route 53 records to add ───────────────────────────
echo
bold "═══════════════════════════════════════════════════════════════════"
bold "  Route 53 records to add for $DOMAIN (zone Z036423752F97VU7GU3K)"
bold "═══════════════════════════════════════════════════════════════════"
echo
muted "Same pattern as micropayments.to apex → Google IPs."
echo
cat <<'EOF'
APEX A records (4 records, all required):
  Name:  verum.sh.
  Type:  A
  TTL:   300
  Value: 216.239.32.21
         216.239.34.21
         216.239.36.21
         216.239.38.21

WWW subdomain (optional convenience):
  Name:  www.verum.sh.
  Type:  CNAME
  TTL:   300
  Value: ghs.googlehosted.com.

DOMAIN VERIFICATION TXT (if Search Console asks for one):
  Name:  verum.sh.
  Type:  TXT
  TTL:   300
  Value: "google-site-verification=<from-search-console>"
EOF
echo
bold "═══════════════════════════════════════════════════════════════════"
echo
muted "Add via AWS console (Route 53 → Hosted zones → verum.sh) OR via:"
echo
cat <<'EOF'
aws route53 change-resource-record-sets \
  --hosted-zone-id Z036423752F97VU7GU3K \
  --change-batch '{
    "Changes": [
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "verum.sh.",
          "Type": "A",
          "TTL": 300,
          "ResourceRecords": [
            {"Value": "216.239.32.21"},
            {"Value": "216.239.34.21"},
            {"Value": "216.239.36.21"},
            {"Value": "216.239.38.21"}
          ]
        }
      }
    ]
  }'
EOF
echo

# ─── 9. Reference URLs ─────────────────────────────────────────────
bold "GCP Console URLs (project: $PROJECT_ID)"
muted "  Cloud Run service:      https://console.cloud.google.com/run/detail/${REGION}/${SERVICE}/metrics?project=${PROJECT_ID}"
muted "  Domain mapping:         https://console.cloud.google.com/run/domains?project=${PROJECT_ID}"
muted "  Search Console verify:  https://search.google.com/search-console/welcome"
muted "  Artifact Registry:      https://console.cloud.google.com/artifacts?project=${PROJECT_ID}"
muted "  Cloud Build history:    https://console.cloud.google.com/cloud-build/builds?project=${PROJECT_ID}"
if [ -n "$RUN_URL" ]; then
  echo
  bold "Direct Cloud Run URL (use this until DNS propagates):"
  echo "  $RUN_URL"
fi
echo
bold "Next:"
muted "  1. Add Route 53 records above (verum.sh → 4 Google A records)"
muted "  2. Verify domain ownership via Search Console (if not already)"
muted "  3. Re-run this script to create the Cloud Run domain mapping"
muted "  4. Wait for SSL provisioning (Google-managed cert, ~15 min)"
muted "  5. Test: curl -fsSL https://${DOMAIN}/install | head -5"
echo
