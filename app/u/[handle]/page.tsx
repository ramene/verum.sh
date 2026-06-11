import Link from 'next/link';
import { ShieldCheck, Key, Fingerprint, Link2, Github, Twitter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        ← verum
      </Link>

      <header className="mt-10 flex items-baseline gap-3">
        <span className="font-mono text-muted-foreground">@</span>
        <h1 className="text-3xl font-semibold tracking-tight">{handle}</h1>
        <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Coming soon
        </span>
      </header>

      <p className="mt-4 max-w-xl text-muted-foreground">
        Public operator profile. Every recipient, credential, and social proof on this page
        is independently verifiable. No claim about identity is taken on trust.
      </p>

      <section className="mt-12 grid gap-4">
        <Row
          icon={<Key className="size-4" />}
          label="age recipients"
          value="age1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <Row
          icon={<ShieldCheck className="size-4" />}
          label="age-plugin-se (Secure Enclave)"
          value="age1se1qgrzhxg2t6sdpzqyrutwlc7qrgfn2y2kdr0hzc5w4q2sz9c4lqgnz72r5g"
        />
        <Row
          icon={<Fingerprint className="size-4" />}
          label="FIDO2 / WebAuthn PRF"
          value="credential-id: AAAA-BBBB-CCCC-DDDD"
        />
        <Row
          icon={<Key className="size-4" />}
          label="YubiKey serial"
          value="••• ••• 1234"
        />
        <Row
          icon={<Link2 className="size-4" />}
          label="On-chain pubkey (Ethereum)"
          value="0x0000000000000000000000000000000000000000"
        />
      </section>

      <h2 className="mt-12 mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Social proof
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <Proof icon={<Twitter className="size-4" />} platform="X / Twitter" handle={`@${handle}`} />
        <Proof icon={<Github className="size-4" />} platform="GitHub" handle={handle} />
        <Proof icon={<Link2 className="size-4" />} platform="DNS TXT" handle={`${handle}.example`} />
      </div>

      <div className="mt-16 rounded-xl border border-dashed border-border/60 bg-secondary/30 p-6 text-sm text-muted-foreground">
        Profile pages are placeholder for now. Live cryptographic verification of every field
        ships with the first public release.
      </div>
    </main>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border/60 bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <code className="break-all font-mono text-xs text-muted-foreground">{value}</code>
    </div>
  );
}

function Proof({
  icon,
  platform,
  handle,
}: {
  icon: React.ReactNode;
  platform: string;
  handle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-sm font-medium">{platform}</p>
        <p className="font-mono text-xs text-muted-foreground">{handle}</p>
      </div>
    </div>
  );
}
