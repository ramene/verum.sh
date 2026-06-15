import Link from 'next/link'
import type { SiteConfig } from './site-config'

/**
 * Shared legal-page content — identical TypeScript module across the
 * three brand sites (appmaestro.ai, mae.sh, verum.sh). Only
 * lib/site-config.ts diverges.
 *
 * Boilerplate drafted for Discord App Verification minimum requirements
 * (TOS + Privacy linked from the app, covering data collected, usage,
 * retention, third parties, user rights, contact). Not legal advice —
 * review before relying on it in any regulated jurisdiction.
 */

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

const PageHeader = ({
  site,
  title,
}: {
  site: SiteConfig
  title: string
  kind: 'TOS' | 'Privacy'
}) => (
  <header className="border-b border-border pb-8 mb-12">
    <Link
      href="/"
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      ← {site.host}
    </Link>
    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
      {title}
    </h1>
    <p className="mt-3 text-sm text-muted-foreground">
      Last updated: {formatDate(site.lastUpdated)}
    </p>
  </header>
)

const PageFooter = ({ site }: { site: SiteConfig }) => (
  <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground space-y-3">
    <p>
      Questions? Email{' '}
      <a
        href={`mailto:${site.contactEmail}`}
        className="text-foreground hover:underline"
      >
        {site.contactEmail}
      </a>
      .
    </p>
    {site.siblings.length > 0 && (
      <p>
        Sister sites:{' '}
        {site.siblings.map((s, i) => (
          <span key={s.url}>
            <a
              href={s.url}
              className="text-foreground hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {s.name}
            </a>
            {i < site.siblings.length - 1 && ' · '}
          </span>
        ))}
      </p>
    )}
  </footer>
)

export const TermsOfService = ({ site }: { site: SiteConfig }) => (
  <article className="mx-auto max-w-3xl px-6 py-16">
    <PageHeader site={site} title="Terms of Service" kind="TOS" />

    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <p>
        These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern your
        access to and use of {site.name} at{' '}
        <a href={site.url}>{site.host}</a> (the &ldquo;<strong>Service</strong>
        &rdquo;), operated by {site.legalName} (&ldquo;<strong>we</strong>
        &rdquo;, &ldquo;<strong>us</strong>&rdquo;). By using the Service you
        agree to be bound by these Terms.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use the Service. If you use the
        Service on behalf of an organization, you represent that you have
        authority to bind that organization to these Terms.
      </p>

      <h2>2. Account & Access</h2>
      <p>
        Some features require you to sign in via a supported identity provider
        (currently Google or GitHub OAuth, and where applicable Discord
        OAuth). You are responsible for the security of the credentials you
        use with those providers and for activity carried out under your
        account.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use the Service in any way that violates applicable law or the rights
          of others;
        </li>
        <li>
          Interfere with, disrupt, or attempt to gain unauthorized access to
          the Service, its servers, or related infrastructure;
        </li>
        <li>
          Use the Service to send unsolicited communications, malware, or
          content that is harmful, harassing, defamatory, or unlawful;
        </li>
        <li>
          Reverse-engineer, scrape, or programmatically harvest data from the
          Service except via interfaces and rate limits we expressly provide;
        </li>
        <li>
          Resell, sublicense, or otherwise commercially exploit access to the
          Service without our prior written consent.
        </li>
      </ul>

      {site.hostsDiscordApp && (
        <>
          <h2>4. Discord Integration</h2>
          <p>
            The Service offers an optional integration with Discord (the
            &ldquo;<strong>Discord App</strong>&rdquo;). When you authorize the
            Discord App you agree to comply with the{' '}
            <a href="https://discord.com/terms" target="_blank" rel="noreferrer">
              Discord Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://discord.com/guidelines"
              target="_blank"
              rel="noreferrer"
            >
              Community Guidelines
            </a>{' '}
            in addition to these Terms. We collect and process Discord data as
            described in our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </>
      )}

      <h2>{site.hostsDiscordApp ? '5' : '4'}. Intellectual Property</h2>
      <p>
        The Service, including its software, branding, content, and trade
        dress, is owned by {site.legalName} or its licensors. These Terms do
        not transfer any ownership rights to you. You retain ownership of any
        content you provide to the Service; you grant us a worldwide,
        royalty-free license to use, store, and display such content solely to
        operate the Service for you.
      </p>

      <h2>{site.hostsDiscordApp ? '6' : '5'}. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
        AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
        INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
        NON-INFRINGEMENT. We do not warrant that the Service will be
        uninterrupted, error-free, or secure.
      </p>

      <h2>{site.hostsDiscordApp ? '7' : '6'}. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {site.legalName.toUpperCase()}{' '}
        WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
        OR PUNITIVE DAMAGES, OR FOR LOST PROFITS OR DATA, ARISING OUT OF YOUR
        USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE
        SERVICE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (USD $100) OR THE
        AMOUNT YOU PAID US IN THE TWELVE MONTHS PRIOR TO THE CLAIM, WHICHEVER
        IS GREATER.
      </p>

      <h2>{site.hostsDiscordApp ? '8' : '7'}. Termination</h2>
      <p>
        We may suspend or terminate your access to the Service at any time if
        we reasonably believe you have violated these Terms. You may stop
        using the Service at any time. Sections that by their nature should
        survive termination (e.g., intellectual property, disclaimers,
        limitations of liability) will survive.
      </p>

      <h2>{site.hostsDiscordApp ? '9' : '8'}. Modifications</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        announced on the Service or via the contact channels you have provided
        and become effective on the date noted above. Your continued use of
        the Service after changes take effect constitutes acceptance.
      </p>

      <h2>{site.hostsDiscordApp ? '10' : '9'}. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which{' '}
        {site.legalName} is operated, without regard to conflict-of-law
        principles. Disputes will be resolved in the courts of that
        jurisdiction unless otherwise required by mandatory law.
      </p>

      <h2>{site.hostsDiscordApp ? '11' : '10'}. Contact</h2>
      <p>
        Questions about these Terms can be sent to{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </div>

    <PageFooter site={site} />
  </article>
)

export const PrivacyPolicy = ({ site }: { site: SiteConfig }) => (
  <article className="mx-auto max-w-3xl px-6 py-16">
    <PageHeader site={site} title="Privacy Policy" kind="Privacy" />

    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <p>
        This Privacy Policy explains how {site.legalName} (&ldquo;
        <strong>we</strong>&rdquo;) collects, uses, and shares information
        when you use {site.name} at <a href={site.url}>{site.host}</a> (the
        &ldquo;<strong>Service</strong>&rdquo;).
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect only what we need to operate the Service. Specifically:</p>
      <ul>
        <li>
          <strong>Account data.</strong> When you sign in via an identity
          provider (Google, GitHub, and where applicable Discord), we receive
          your provider user ID, email address, display name, and profile
          image.
        </li>
        <li>
          <strong>Usage data.</strong> Server logs, request timestamps, IP
          addresses (truncated where possible), and minimal device or browser
          metadata for security and debugging.
        </li>
        <li>
          <strong>Content you provide.</strong> Settings, preferences, and any
          content you actively submit to the Service.
        </li>
        {site.hostsDiscordApp && (
          <li>
            <strong>Discord data.</strong> If you authorize the Discord App,
            we receive your Discord user ID, the IDs of servers (guilds) where
            the App is installed, and interaction payloads (slash commands,
            button presses) sent to us by Discord. We do not read or store
            message content unless you explicitly include it in a slash
            command parameter.
          </li>
        )}
      </ul>

      <h2>2. How We Use Information</h2>
      <p>We use the information above to:</p>
      <ul>
        <li>Operate, maintain, and secure the Service;</li>
        <li>
          Authenticate you, link your sessions, and personalize what you see;
        </li>
        <li>
          Deliver notifications and event messages you have configured (for
          example, to Discord channels you choose);
        </li>
        <li>
          Detect, prevent, and respond to abuse, fraud, and security issues;
        </li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>We do not sell personal data. We share information only with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> that help us operate the Service —
          including Google Cloud Platform (hosting, databases), Stripe
          (payments, where applicable), and identity providers you have
          chosen. These providers process data on our behalf under their own
          terms.
        </li>
        {site.hostsDiscordApp && (
          <li>
            <strong>Discord.</strong> Communications you initiate through the
            Discord App are delivered to the Discord servers and channels you
            select. Discord&rsquo;s use of that information is governed by{' '}
            <a
              href="https://discord.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Discord&rsquo;s Privacy Policy
            </a>
            .
          </li>
        )}
        <li>
          <strong>Authorities</strong>, when required by law, court order, or
          to protect rights, safety, or property.
        </li>
        <li>
          <strong>Successors</strong>, in connection with a merger,
          acquisition, financing, or asset sale, subject to commercially
          reasonable confidentiality protections.
        </li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain account data for as long as your account is active, plus a
        limited grace period for backup and recovery. Server logs are typically
        retained for up to 90 days. You can request deletion at any time (see
        Section 6); we will delete or anonymize data within a reasonable
        period unless we are required by law to retain it.
      </p>

      <h2>5. Security</h2>
      <p>
        We use industry-standard administrative, technical, and physical
        safeguards to protect your information, including encryption in
        transit (TLS) and at rest where supported by our infrastructure. No
        system is perfectly secure; we cannot guarantee absolute security.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to access,
        correct, export, or delete the personal data we hold about you, and
        to object to or restrict certain processing. To exercise these
        rights, email{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We
        will respond within the time required by applicable law.
      </p>

      <h2>7. International Transfers</h2>
      <p>
        Our infrastructure is hosted in the United States. If you access the
        Service from outside the United States, your information may be
        transferred to, stored, and processed in the United States and other
        countries where our service providers operate.
      </p>

      <h2>8. Children</h2>
      <p>
        The Service is not directed to children under 13 (or the equivalent
        minimum age under your local law). We do not knowingly collect
        information from such children. If we learn we have, we will delete
        it.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be announced on the Service and become effective on the date
        noted above. Your continued use of the Service after changes take
        effect constitutes acceptance.
      </p>

      <h2>10. Contact</h2>
      <p>
        Privacy questions can be sent to{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </div>

    <PageFooter site={site} />
  </article>
)
