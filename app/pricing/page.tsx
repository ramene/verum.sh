import Link from 'next/link';
import {
  Terminal,
  FileSignature,
  Boxes,
  Check,
  ArrowRight,
  Anchor,
  Smartphone,
  Coins,
} from 'lucide-react';

export const metadata = {
  title: 'Pricing — verum',
  description:
    'Three numbers. No per-identity billing. Self-host the substrate, license per org, pay-as-you-go for hosted utilities.',
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Top nav */}
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm tracking-tight"
          >
            <span className="text-foreground">verum</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">pricing</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="https://github.com/ramene/verum"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          No per-identity billing, ever
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Three numbers.{' '}
          <span className="text-muted-foreground">No identity ledger.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          We do not charge per identity. The architecture does not require counting them.
          Self-host the substrate for free. License per organization, flat. Pay only for the
          hosted utilities you actually use.
        </p>
      </section>

      {/* Three tiers */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <TierCard
            icon={<Terminal className="size-5" />}
            label="Substrate"
            price="$0"
            cadence="forever"
            sub="Self-hosted, GPL-3.0"
            tagline="All primitives. No counting."
            features={[
              'Hardware-backed identities (age, FIDO2 PRF)',
              'Threshold M-of-N recovery',
              'Hash-chained audit log',
              'On-chain anchor (self-hosted)',
              'No identity ledger, no telemetry',
              'Fork it, ship it, audit it',
            ]}
            cta={{ label: 'Get the source', href: 'https://github.com/ramene/verum' }}
          />

          <TierCard
            featured
            icon={<FileSignature className="size-5" />}
            label="Org License"
            price="$2,000"
            cadence="per org / year"
            sub="Embed in your compliance posture"
            tagline="One number. Unlimited operators."
            features={[
              'Ed25519-signed Verum License attestation',
              'Reference verum in BAA / HIPAA / SOC2 docs',
              'Flat fee regardless of clinician / operator count',
              'Includes 12 months hosted anchoring',
              'Priority response on compliance questions',
              'Verum-bound corpus migration support',
            ]}
            cta={{ label: 'Request a license', href: 'mailto:license@verum.sh' }}
          />

          <TierCard
            icon={<Boxes className="size-5" />}
            label="Hosted Utilities"
            price="à la carte"
            cadence="pay-as-you-go"
            sub="Optional convenience tier"
            tagline="Only the parts you do not want to run."
            features={[
              'Anchoring: $0.10 / commitment, or $20 / mo unlimited',
              'Mobile companion: $4 personal, $10 family, $20 pro',
              'x402 signed operations: per-call pricing',
              'Federation directory entry (verum.sh/u/handle)',
              'No subscription required for any individual utility',
              'Cancel any single utility without losing the others',
            ]}
            cta={{ label: 'See utilities', href: '#utilities' }}
          />
        </div>
      </section>

      {/* Hosted utilities detail */}
      <section id="utilities" className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Hosted utilities
        </p>
        <h2 className="mb-10 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Itemized. Optional. Individually cancellable.
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <UtilityCard
            icon={<Anchor className="size-5" />}
            title="On-chain anchoring"
            price="$0.10 / commitment"
            altPrice="or $20 / month unlimited"
            body="Anchor your audit chain head to an Ethereum-compatible chain. Third-party-verifiable timestamping. Self-host the anchoring service yourself for free if you prefer."
          />
          <UtilityCard
            icon={<Smartphone className="size-5" />}
            title="Mobile companion"
            price="$4 / $10 / $20"
            altPrice="personal / family / pro"
            body="iOS app for biometric-gated request approval, quorum management, signed-claim release. TestFlight beta. App Store post-beta. Substrate works without the app."
          />
          <UtilityCard
            icon={<Coins className="size-5" />}
            title="x402 signed operations"
            price="per-call"
            altPrice="see catalog"
            body="Pay-as-you-go pricing for specific signed operations: cross-org handoffs, pre-publish editor shares, threshold recovery ceremony coordination. No subscription, no minimums."
          />
        </div>
      </section>

      {/* Comparison strip */}
      <section className="border-y border-border/40 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Compared
          </p>
          <p className="text-balance text-xl leading-relaxed md:text-2xl">
            Modern secrets-management platforms charge per-identity, where one identity is a
            human, a CI job, a service account, or an agent. At{' '}
            <span className="font-mono text-foreground">$18 / identity / month</span>, a
            10-clinician practice with normal CI and service-account density lands between{' '}
            <span className="font-mono text-foreground">$30K and $80K / year</span> on the
            enterprise quote.
          </p>
          <p className="mt-6 text-balance text-xl leading-relaxed md:text-2xl">
            The same practice on verum is{' '}
            <span className="font-mono text-foreground">$2,000 / year</span> for the org
            license, optionally{' '}
            <span className="font-mono text-foreground">$240 / year</span> for hosted
            anchoring.
            <span className="text-muted-foreground">
              {' '}
              No procurement cycle. No sales call. No per-seat ladder.
            </span>
          </p>
          <p className="mt-8 font-mono text-sm text-muted-foreground">
            We do not charge per identity. The architecture does not require counting them.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Honest answers
        </p>
        <h2 className="mb-10 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          The questions worth asking.
        </h2>

        <div className="space-y-8">
          <Faq
            q="Why no per-seat pricing?"
            a="The architecture has no central server in the custody path. There is no point at which we count operators. Charging per identity would require us to bolt on the very surface the product is built to avoid. We did not, so we cannot."
          />
          <Faq
            q="What does the org license actually cover?"
            a="The right to reference verum in your compliance documentation as a vetted custody primitive, an Ed25519-signed license attestation embeddable in your build, unmetered hosted anchoring for 12 months, and priority response on compliance questions. It does not gate the substrate. Anyone can use the substrate for free."
          />
          <Faq
            q="Can I self-host the anchoring service?"
            a="Yes. The anchoring service is open. Run your own Ethereum-compatible node, point your verum binary at it, anchor for whatever your gas costs. The hosted utility is convenience pricing, not a moat."
          />
          <Faq
            q="What if I am one person and just want custody for my own keys?"
            a="The substrate is free. Self-host it. You do not need a license, you do not need the mobile app, you do not need hosted anchoring. The Touch ID unlock and Shamir M-of-N quorum work entirely on your devices and your chosen recovery network."
          />
          <Faq
            q="Will the price model change as you scale?"
            a="The substrate stays free, forever, GPL-3.0. The org license number may move as the audited compliance documentation deepens. Hosted-utility pricing will only move toward the cost basis, not toward identity-based ladders. The architectural commitment is durable."
          />
        </div>
      </section>

      <footer className="border-t border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>verum.sh / pricing</span>
          <span>operator-owned · biometric-gated · audit-chained</span>
        </div>
      </footer>
    </main>
  );
}

function TierCard({
  icon,
  label,
  price,
  cadence,
  sub,
  tagline,
  features,
  cta,
  featured,
}: {
  icon: React.ReactNode;
  label: string;
  price: string;
  cadence: string;
  sub: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? 'relative flex flex-col rounded-xl border border-foreground/30 bg-card p-6 shadow-lg ring-1 ring-foreground/5'
          : 'relative flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-border'
      }
    >
      {featured && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-background">
          Recommended
        </span>
      )}
      <div className="mb-4 inline-flex size-9 items-center justify-center rounded-lg bg-secondary/60 text-foreground">
        {icon}
      </div>
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">{price}</span>
        <span className="text-sm text-muted-foreground">{cadence}</span>
      </div>
      <p className="text-sm text-muted-foreground">{sub}</p>
      <p className="mt-5 text-sm font-medium">{tagline}</p>

      <ul className="mt-5 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-foreground/70" />
            <span className="leading-relaxed text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex-1" />
      <Link
        href={cta.href}
        className={
          featured
            ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md'
            : 'inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:border-foreground/30'
        }
      >
        {cta.label}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function UtilityCard({
  icon,
  title,
  price,
  altPrice,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  altPrice: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-border">
      <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-secondary/60 text-foreground">
        {icon}
      </div>
      <h3 className="mb-1 text-base font-semibold tracking-tight">{title}</h3>
      <p className="font-mono text-sm text-foreground">{price}</p>
      <p className="mb-3 font-mono text-xs text-muted-foreground">{altPrice}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="mb-2 text-base font-semibold tracking-tight">{q}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
    </div>
  );
}
