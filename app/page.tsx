import Link from 'next/link';
import { Terminal, Smartphone, Key, ShieldCheck, GitBranch } from 'lucide-react';
import { ProblemsWeSolve } from '@/components/problems-we-solve';
import { ComposesWith } from '@/components/composes-with';

const CURL_INSTALL = 'curl -fsSL https://verum.sh/install | bash';

const TESTFLIGHT_URL = 'https://testflight.apple.com/join/REPLACE-WITH-INVITE-CODE';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Top nav */}
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 font-mono text-sm tracking-tight">
            <span className="text-foreground">verum</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              {process.env.NEXT_PUBLIC_VERUM_VERSION ?? 'v0.1'}
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="https://github.com/ramene/verum"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="https://ramene.substack.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Writing
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Operator-owned keys, biometric-gated
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          Trust is not a security model. <span className="text-muted-foreground">Custody is.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          verum holds your keys in hardware you control. Touch ID, Face ID, YubiKey unlock
          decryption inside the Secure Enclave or TPM. Threshold recovery splits the symmetric
          key across trusted parties. Hash-chained audit, on-chain anchored.
        </p>

        {/* Two CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton
            href="#install"
            icon={<Terminal className="size-4" />}
            primary
            label="Install CLI"
            sub="bash, one line"
          />
          <CTAButton
            href={TESTFLIGHT_URL}
            icon={<Smartphone className="size-4" />}
            label="Open mobile app"
            sub="TestFlight, invite-only"
          />
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          <Link
            href="https://ramene.substack.com/p/it-is-irresponsible-not-to"
            className="underline decoration-dotted underline-offset-4 hover:text-foreground"
          >
            Read the manifesto
          </Link>
          {' · '}
          <Link
            href="https://github.com/ramene/verum"
            className="underline decoration-dotted underline-offset-4 hover:text-foreground"
          >
            See the source
          </Link>
        </p>
      </section>

      {/* Install block (anchor target) */}
      <section
        id="install"
        className="mx-auto max-w-3xl border-y border-border/40 px-6 py-16"
      >
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Install on macOS or Linux
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-secondary/40 p-5 text-sm">
          <code className="text-foreground">{CURL_INSTALL}</code>
        </pre>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Or <code className="font-mono">brew install ramene/tap/verum</code>. Or build from
          source. The original <code className="font-mono">git-crypt</code> commands all still
          work; verum adds capabilities, not new vocabulary.
        </p>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Key className="size-5" />}
            title="Hardware-backed identities"
            body="age (X25519), age-plugin-se for Apple Secure Enclave, FIDO2/WebAuthn PRF for Touch ID, Face ID, YubiKey, Windows Hello. Plus SSH, GPG, Ethereum wallet identities."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-5" />}
            title="Threshold recovery"
            body="Split your symmetric key into Shamir M-of-N shares across trusted parties. No single party can reconstruct. Lose a device, recover with a quorum."
          />
          <FeatureCard
            icon={<GitBranch className="size-5" />}
            title="Hash-chained audit"
            body="Every access produces a SHA-256-chained entry. Tampering is detectable in a single verify call. Anchor the chain head on-chain for third-party-checkable proof."
          />
        </div>
      </section>

      {/* Problems we solve */}
      <ProblemsWeSolve />

      {/* Composes with mae + appmaestro */}
      <ComposesWith />

      {/* Lineage */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <p className="text-xs text-muted-foreground">
          Forked from{' '}
          <Link
            href="https://github.com/AGWA/git-crypt"
            className="underline decoration-dotted underline-offset-4"
          >
            AGWA/git-crypt
          </Link>{' '}
          v0.8.0 in March 2026. 34 verum commits on top of 185 from upstream. The binary and
          command set are preserved; verum adds capabilities, not new vocabulary.
        </p>
      </section>

      <footer className="border-t border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>verum.sh</span>
          <span>operator-owned · biometric-gated · audit-chained</span>
        </div>
      </footer>
    </main>
  );
}

function CTAButton({
  href,
  icon,
  label,
  sub,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? 'group flex min-w-56 items-center justify-center gap-3 rounded-lg bg-primary px-5 py-3.5 text-primary-foreground shadow-sm transition-all hover:shadow-md'
          : 'group flex min-w-56 items-center justify-center gap-3 rounded-lg border border-border bg-background px-5 py-3.5 transition-all hover:border-foreground/30'
      }
    >
      <span className="opacity-80 transition-opacity group-hover:opacity-100">{icon}</span>
      <span className="text-left">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block font-mono text-xs opacity-70">{sub}</span>
      </span>
    </Link>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-border">
      <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-secondary/60 text-foreground">
        {icon}
      </div>
      <h3 className="mb-1.5 text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
