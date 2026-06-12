#!/usr/bin/env bash
# verum.sh — one-shot GCP bootstrap.
#
# Run AFTER:
#   - gcloud auth login
#   - gcloud auth application-default login
#   - Billing account ID handy
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

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
muted() { printf '\033[2m%s\033[0m\n' "$1"; }

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
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  dns.googleapis.com \
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

# ─── 5. Cloud DNS zone ──────────────────────────────────────────────
ZONE_NAME="verum-sh"
if ! gcloud dns managed-zones describe "$ZONE_NAME" >/dev/null 2>&1; then
  bold "Creating Cloud DNS zone for $DOMAIN"
  gcloud dns managed-zones create "$ZONE_NAME" \
    --dns-name="${DOMAIN}." \
    --description="verum.sh production zone"
  echo
  bold "═══ NAMESERVERS TO POINT $DOMAIN AT (in Namecheap or current registrar) ═══"
  gcloud dns managed-zones describe "$ZONE_NAME" --format='value(nameServers)' | tr ';' '\n'
  echo
  bold "═══════════════════════════════════════════════════════════════════════════"
else
  muted "DNS zone $ZONE_NAME exists, skipping"
fi

# ─── 6. First Cloud Build (manual trigger) ─────────────────────────
bold "Submitting first Cloud Build"
muted "Subsequent builds happen on push to main once we set up the trigger."
gcloud builds submit --config=cloudbuild.yaml .

# ─── 7. Cloud Run domain mapping ───────────────────────────────────
if ! gcloud beta run domain-mappings describe --domain="$DOMAIN" --region="$REGION" >/dev/null 2>&1; then
  bold "Mapping $DOMAIN to Cloud Run service $SERVICE"
  gcloud beta run domain-mappings create \
    --service="$SERVICE" \
    --domain="$DOMAIN" \
    --region="$REGION"
else
  muted "Domain mapping for $DOMAIN exists, skipping"
fi

echo
bold "═══ NEXT STEPS ═══"
muted "1. Point $DOMAIN nameservers at the Cloud DNS NS records above."
muted "2. Wait for DNS propagation (5-60 min)."
muted "3. Verify: curl -fsSL https://${DOMAIN}/install | head -5"
muted "4. Hook up the Cloud Build trigger on push to main."
echo
