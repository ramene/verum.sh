import Link from 'next/link';
import { Send, ShieldCheck, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RequestPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        ← verum
      </Link>

      <header className="mt-10">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Coming soon
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Request a signed handoff from{' '}
          <span className="font-mono text-muted-foreground">@{handle}</span>
        </h1>
      </header>

      <p className="mt-4 text-muted-foreground">
        A handoff is a one-time, biometric-gated release of a specific artifact, signed by the
        operator and chained into their public audit log. You'll receive a verification URL when
        the operator approves the request.
      </p>

      <ol className="mt-10 space-y-6">
        <Step
          n={1}
          icon={<Send className="size-4" />}
          title="Send the request"
          body="Describe what you're asking for and why. The request is encrypted to the operator's age recipient and never readable by verum.sh."
        />
        <Step
          n={2}
          icon={<ShieldCheck className="size-4" />}
          title="Operator approves with Touch ID / Face ID / YubiKey"
          body="The biometric unlock signs the response inside the Secure Enclave. The signing key never leaves hardware."
        />
        <Step
          n={3}
          icon={<Clock className="size-4" />}
          title="You verify"
          body="A signed receipt anchors to the operator's hash-chained audit log. You can verify the chain head against on-chain anchors without trusting verum.sh."
        />
      </ol>

      <div className="mt-14 rounded-xl border border-dashed border-border/60 bg-secondary/30 p-6 text-sm text-muted-foreground">
        Request flow is placeholder for now. The signing path lands with the first public release.
      </div>
    </main>
  );
}

function Step({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 font-mono text-sm text-foreground">
        {n}
      </div>
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
