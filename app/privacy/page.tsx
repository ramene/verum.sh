import type { Metadata } from 'next'
import { PrivacyPolicy } from '@/lib/legal-content'
import { SITE } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: `Privacy Policy for ${SITE.name} at ${SITE.host}.`,
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy site={SITE} />
}
