import type { Metadata } from 'next'
import { TermsOfService } from '@/lib/legal-content'
import { SITE } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE.name}`,
  description: `Terms of Service for ${SITE.name} at ${SITE.host}.`,
}

export default function TermsOfServicePage() {
  return <TermsOfService site={SITE} />
}
