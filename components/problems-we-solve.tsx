'use client';

import { useState } from 'react';
import {
  Key,
  KeyRound,
  ShieldCheck,
  GitBranch,
  Send,
  FileCheck,
  Users,
  Stethoscope,
  FileCode,
  PenTool,
  Replace,
  Anchor,
  Fingerprint,
  Eye,
  Mail,
  Lock,
  FileSearch,
  Workflow,
  Cpu,
  Signature,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Scenario = { icon: LucideIcon; name: string; sub: string };
type Group = { title: string; items: Scenario[] };
type Taxonomy = { key: string; label: string; lede: string; groups: Group[] };

const TAXONOMIES: Taxonomy[] = [
  {
    key: 'outcome',
    label: 'Outcomes',
    lede: 'What custody actually delivers — the promises verum makes and keeps.',
    groups: [
      {
        title: 'Custody',
        items: [
          {
            icon: Key,
            name: 'Hardware-backed identity',
            sub: 'age (X25519) + Secure Enclave / FIDO2 PRF — keys never leave hardware.',
          },
          {
            icon: ShieldCheck,
            name: 'Threshold recovery',
            sub: 'Shamir M-of-N across trusted parties — no single party can rebuild it.',
          },
          {
            icon: GitBranch,
            name: 'Hash-chained audit',
            sub: 'SHA-256-chained entries, anchored on-chain, third-party-checkable.',
          },
        ],
      },
      {
        title: 'Handoff',
        items: [
          {
            icon: Send,
            name: 'Signed claim release',
            sub: 'Biometric-gated artifact delivery with a cryptographic receipt.',
          },
          {
            icon: Eye,
            name: 'Source protection',
            sub: 'Journalist and source talk end-to-end. No platform can read either side.',
          },
          {
            icon: Mail,
            name: 'Editor pre-publish',
            sub: 'Share with editor, revoke with one click, audit who saw what when.',
          },
        ],
      },
      {
        title: 'Domain',
        items: [
          {
            icon: Stethoscope,
            name: 'Healthcare PHI custody',
            sub: 'Clinician keys live on the device. Insurer and lab releases are signed and logged.',
          },
          {
            icon: FileCode,
            name: 'Secrets in code',
            sub: 'git-crypt origin use case, every unlock now biometric and chained.',
          },
          {
            icon: PenTool,
            name: 'Creator authorship',
            sub: 'Sign every artifact you publish. Readers verify against your public profile.',
          },
        ],
      },
      {
        title: 'Continuity',
        items: [
          {
            icon: KeyRound,
            name: 'Lost-device recovery',
            sub: 'Quorum of M-of-N parties reconstruct without trusting verum.sh.',
          },
          {
            icon: Replace,
            name: 'Hardware migration',
            sub: 'Add a new YubiKey, biometric-confirm migration, quorum sign-off.',
          },
          {
            icon: Users,
            name: 'Estate inheritance',
            sub: 'Designated successors with quorum unlock. Works without you or us.',
          },
        ],
      },
    ],
  },
  {
    key: 'audience',
    label: 'Audience',
    lede: 'Pick the seat you sit in — verum bends to fit your role, not the other way around.',
    groups: [
      {
        title: 'Clinicians',
        items: [
          {
            icon: Stethoscope,
            name: 'Patient PHI custody',
            sub: 'Keys live on your device. No cloud, no BAA-bound vendor in the trust chain.',
          },
          {
            icon: ShieldCheck,
            name: 'BAA-grade audit',
            sub: 'Hash-chained, anchored on-chain, third-party-verifiable trail.',
          },
          {
            icon: Mail,
            name: 'Signed claim release',
            sub: 'Insurer, lab, lawyer, patient — every release cryptographically gated.',
          },
        ],
      },
      {
        title: 'Creators',
        items: [
          {
            icon: PenTool,
            name: 'Authorship proof',
            sub: 'Sign every artifact you publish. Prove "I wrote this" in a deepfake world.',
          },
          {
            icon: Eye,
            name: 'Pre-publish handoff',
            sub: 'Editor or collaborator sees with audit, revocable, no upload to a vendor.',
          },
          {
            icon: Send,
            name: 'Source protection',
            sub: 'Journalist and source talk end-to-end, platform-blind, audit-trailed.',
          },
        ],
      },
      {
        title: 'Engineers',
        items: [
          {
            icon: FileCode,
            name: 'Secrets in git',
            sub: 'Biometric-unlocked git-crypt. No plaintext key on disk, no SaaS in the loop.',
          },
          {
            icon: Cpu,
            name: 'Model weights attestation',
            sub: 'Sign training corpora and weights with operator identity. Provenance built-in.',
          },
          {
            icon: Workflow,
            name: 'CI/CD secret release',
            sub: 'Short-lived signed releases. No long-lived API keys in environment variables.',
          },
        ],
      },
      {
        title: 'Operators (everyone)',
        items: [
          {
            icon: Key,
            name: 'Hardware-backed identity',
            sub: 'Touch ID, Face ID, YubiKey, Windows Hello. No key escrow anywhere.',
          },
          {
            icon: ShieldCheck,
            name: 'Threshold recovery',
            sub: 'Shamir M-of-N across trusted parties. Lose a device, recover with a quorum.',
          },
          {
            icon: Users,
            name: 'Estate continuity',
            sub: 'Designated successors. Works without trusting any platform, including ours.',
          },
        ],
      },
    ],
  },
  {
    key: 'action',
    label: 'Actions',
    lede: 'The verbs verum gives you — composable primitives, not a product surface.',
    groups: [
      {
        title: 'Protect',
        items: [
          {
            icon: Lock,
            name: 'Custody',
            sub: 'Hold keys in hardware you control. No copies elsewhere.',
          },
          {
            icon: KeyRound,
            name: 'Recover',
            sub: 'Quorum reconstruction without escrow. M-of-N parties rebuild.',
          },
          {
            icon: Anchor,
            name: 'Anchor',
            sub: 'On-chain proof of audit chain head. Time-stamped, immutable.',
          },
        ],
      },
      {
        title: 'Release',
        items: [
          {
            icon: Send,
            name: 'Signed handoff',
            sub: 'Biometric-gated artifact delivery with cryptographic receipt.',
          },
          {
            icon: Mail,
            name: 'Pre-publish share',
            sub: 'Editor or collaborator preview with revocation and audit.',
          },
          {
            icon: Eye,
            name: 'Source protection',
            sub: 'Journalist and source talk end-to-end. Platform-blind by design.',
          },
        ],
      },
      {
        title: 'Attest',
        items: [
          {
            icon: PenTool,
            name: 'Authorship',
            sub: 'Sign every artifact you publish. Readers verify against your profile.',
          },
          {
            icon: Signature,
            name: 'Asset claim',
            sub: 'ML weights, PHI, source code — provenance signed at the source.',
          },
          {
            icon: Fingerprint,
            name: 'Identity proof',
            sub: 'Cross-platform binding via DNS, X, GitHub, on-chain pubkey.',
          },
        ],
      },
      {
        title: 'Audit',
        items: [
          {
            icon: GitBranch,
            name: 'Hash chain',
            sub: 'SHA-256-chained entries. Tampering detectable in a single verify call.',
          },
          {
            icon: FileCheck,
            name: 'Compliance export',
            sub: 'BAA, HIPAA, SOC2-ready evidence packs. Signed, dated, portable.',
          },
          {
            icon: FileSearch,
            name: 'Third-party verify',
            sub: 'No-trust-required verification. Auditors check the chain themselves.',
          },
        ],
      },
    ],
  },
];

export function ProblemsWeSolve() {
  const [active, setActive] = useState(TAXONOMIES[0].key);
  const taxonomy = TAXONOMIES.find((t) => t.key === active) ?? TAXONOMIES[0];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Problems we solve
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Custody, framed three ways.
          </h2>
          <p className="mt-2 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground">
            {taxonomy.lede}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Scenario taxonomy"
          className="inline-flex rounded-lg border border-border/60 bg-secondary/40 p-1 text-sm"
        >
          {TAXONOMIES.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.key)}
                className={
                  isActive
                    ? 'rounded-md bg-background px-4 py-1.5 font-medium text-foreground shadow-sm transition-all'
                    : 'rounded-md px-4 py-1.5 text-muted-foreground transition-all hover:text-foreground'
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {taxonomy.groups.map((group) => (
          <div key={group.title}>
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {group.title}
            </p>
            <ul className="space-y-5">
              {group.items.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-foreground">
                    <item.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{item.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
