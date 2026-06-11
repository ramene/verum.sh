import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'verum — operator-owned keys, biometric-gated, audit-chained',
  description:
    'Trust is not a security model. Custody is. verum gives you a place to hold your keys with biometric unlock, threshold recovery, and hash-chained audit. Forked from git-crypt, extended with age, FIDO2, and on-chain anchoring.',
  metadataBase: new URL('https://verum.sh'),
  openGraph: {
    title: 'verum',
    description: 'Trust is not a security model. Custody is.',
    url: 'https://verum.sh',
    siteName: 'verum',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'verum',
    description: 'Trust is not a security model. Custody is.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
