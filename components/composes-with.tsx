import Link from 'next/link';
import { Workflow, AppWindow, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Composition = {
  icon: LucideIcon;
  name: string;
  href: string;
  tagline: string;
  scenarios: string[];
};

const COMPOSITIONS: Composition[] = [
  {
    icon: Workflow,
    name: 'mae',
    href: 'https://mae.sh',
    tagline: 'Local-first writing CLI',
    scenarios: [
      'Vault-at-rest encryption with biometric unlock. mae writes, verum encrypts, Touch ID unlocks.',
      'Signed publish pipeline. mae produces the artifact. verum signs the claim. The reader verifies the signature against your public profile.',
      'Redaction with cryptographic audit. mae redacts PHI from notes at rest. verum chains every redaction into the operator-owned audit log.',
    ],
  },
  {
    icon: AppWindow,
    name: 'appmaestro',
    href: 'https://appmaestro.ai',
    tagline: 'Obsidian extension and product',
    scenarios: [
      'Operator-signed authorship on every published note. No platform in the trust chain.',
      'Editor handoff with revocation and audit. Editor sees the manuscript without verum.sh or appmaestro.ai ever holding plaintext.',
      'BAA-grade publish flow for clinician writers. PHI redacted on disk, audit chain anchored, release signed.',
    ],
  },
];

export function ComposesWith() {
  return (
    <section className="mx-auto max-w-5xl border-t border-border/40 px-6 py-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Composes with
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Verum is the substrate.{' '}
          <span className="text-muted-foreground">
            mae and appmaestro are what you build on it.
          </span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {COMPOSITIONS.map((c) => (
          <CompositionCard key={c.name} {...c} />
        ))}
      </div>
    </section>
  );
}

function CompositionCard({
  icon: Icon,
  name,
  href,
  tagline,
  scenarios,
}: Composition) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-border">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-secondary/60 text-foreground">
            <Icon className="size-4" />
          </span>
          <div>
            <p className="font-mono text-sm font-semibold tracking-tight">{name}</p>
            <p className="font-mono text-xs text-muted-foreground">{tagline}</p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          Visit
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      <ul className="space-y-3">
        {scenarios.map((s, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground/40" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
