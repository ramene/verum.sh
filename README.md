# verum.sh

The consumer-facing surface for [verum](https://github.com/ramene/verum) — operator-owned keys, biometric-gated, hash-chained audit.

> Trust is not a security model. Custody is.

This repo is the marketing + onboarding site that lives at `https://verum.sh`. The CLI binary, library, and protocol live at [ramene/verum](https://github.com/ramene/verum).

## What's here

- `/` — landing page (`Install CLI` or `Open mobile app` via TestFlight)
- `/u/[handle]` — public operator profile (recipients, FIDO2 credentials, social proofs)
- `/request/[handle]` — request a signed handoff from an operator

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind v4 + shadcn (`new-york` style, `slate` base)
- lucide-react icons
- TypeScript strict, bundler module resolution

## Develop

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Hosted on Google Cloud Run + Cloud DNS, mirroring the karve.ai deployment pattern. See `deploy/` (TODO).

## License

The site code is MIT. The verum CLI is GPL-3.0 (forked from [AGWA/git-crypt](https://github.com/AGWA/git-crypt)).
