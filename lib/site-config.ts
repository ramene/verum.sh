/**
 * Per-site config for legal pages. Each of the three brand sites
 * (appmaestro.ai, verum.sh, mae.sh) drops in its own value of this.
 *
 * Keep this file the ONLY divergence between sites for legal copy —
 * everything else lives in lib/legal-content.tsx and stays identical.
 */

export interface SiteConfig {
  name: string
  legalName: string
  host: string
  url: string
  contactEmail: string
  lastUpdated: string
  hostsDiscordApp: boolean
  tagline: string
  siblings: Array<{ name: string; url: string }>
}

export const SITE: SiteConfig = {
  name: 'verum',
  legalName: 'verum',
  host: 'verum.sh',
  url: 'https://verum.sh',
  contactEmail: 'contact@verum.sh',
  lastUpdated: '2026-06-15',
  hostsDiscordApp: false,
  tagline:
    'operator-owned cryptographic identity and vault encryption — CLI + protocol',
  siblings: [
    { name: 'appmaestro.ai', url: 'https://appmaestro.ai' },
    { name: 'mae.sh', url: 'https://mae.sh' },
  ],
}
