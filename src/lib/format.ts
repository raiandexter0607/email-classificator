import type { EmailCategory, RoutingStatus } from '@/lib/types'

export function formatRelativeTime(isoDate: string | null): string {
  if (!isoDate) return '—'

  const date = new Date(isoDate)
  const diffMs = Date.now() - date.getTime()
  const diffSec = Math.round(diffMs / 1000)

  if (diffSec < 5) return 'just now'
  if (diffSec < 60) return `${diffSec}s ago`

  const diffMin = Math.round(diffSec / 60)
  if (diffMin < 60) return `${diffMin} min ago`

  const diffHour = Math.round(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`

  const diffDay = Math.round(diffHour / 24)
  if (diffDay < 7) return `${diffDay}d ago`

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`
}

export const CATEGORY_LABEL: Record<EmailCategory, string> = {
  quote: 'Quote',
  pickup: 'Pickup',
  claim: 'Claim',
  status_inquiry: 'Status Inquiry',
  general: 'General',
}

export const CATEGORY_BADGE_CLASS: Record<EmailCategory, string> = {
  quote: 'bg-accent/10 text-accent border-accent/20',
  pickup: 'bg-primary/10 text-primary border-primary/20',
  claim: 'bg-danger/10 text-danger border-danger/20',
  status_inquiry: 'bg-warning/10 text-warning border-warning/20',
  general: 'bg-muted text-muted-foreground border-border',
}

export const CATEGORY_CHART_COLOR: Record<EmailCategory, string> = {
  quote: 'var(--accent)',
  pickup: 'var(--primary)',
  claim: 'var(--danger)',
  status_inquiry: 'var(--warning)',
  general: 'var(--muted-foreground)',
}

export const ROUTING_LABEL: Record<RoutingStatus, string> = {
  auto_routed: 'Auto-Routed',
  flagged_for_review: 'Flagged for Review',
}

export const ROUTING_BADGE_CLASS: Record<RoutingStatus, string> = {
  auto_routed: 'bg-success/10 text-success border-success/20',
  flagged_for_review: 'bg-warning/10 text-warning border-warning/20',
}

export function categoryLabel(category: string | null): string {
  if (!category) return 'Unclassified'
  return CATEGORY_LABEL[category as EmailCategory] ?? category
}

export function routingLabel(status: string | null): string {
  if (!status) return 'Unknown'
  return ROUTING_LABEL[status as RoutingStatus] ?? status
}

const NEUTRAL_BADGE_CLASS = 'bg-muted text-muted-foreground border-border'

export function categoryBadgeClass(category: string | null): string {
  if (!category) return NEUTRAL_BADGE_CLASS
  return CATEGORY_BADGE_CLASS[category as EmailCategory] ?? NEUTRAL_BADGE_CLASS
}

export function routingBadgeClass(status: string | null): string {
  if (!status) return NEUTRAL_BADGE_CLASS
  return ROUTING_BADGE_CLASS[status as RoutingStatus] ?? NEUTRAL_BADGE_CLASS
}
