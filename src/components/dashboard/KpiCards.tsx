import { AlertTriangle, CheckCircle2, GitMerge, Mail, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatPercent } from '@/lib/format'
import type { EmailClassification } from '@/lib/types'

interface KpiCardsProps {
  data: EmailClassification[]
}

export function KpiCards({ data }: KpiCardsProps) {
  const total = data.length
  const autoRouted = data.filter((row) => row.routing_status === 'auto_routed').length
  const flagged = data.filter((row) => row.routing_status === 'flagged_for_review').length
  const threadContinuations = data.filter((row) => row.is_thread_continuation).length

  const confidenceValues = data
    .map((row) => row.confidence)
    .filter((value): value is number => typeof value === 'number')
  const avgConfidence = confidenceValues.length
    ? confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length
    : null

  const cards = [
    {
      label: 'Total Emails Processed',
      value: total.toLocaleString(),
      icon: Mail,
    },
    {
      label: 'Auto-Routed',
      value: total ? formatPercent(autoRouted / total) : '—',
      icon: CheckCircle2,
    },
    {
      label: 'Flagged for Review',
      value: flagged.toLocaleString(),
      icon: AlertTriangle,
    },
    {
      label: 'Average Confidence',
      value: avgConfidence !== null ? formatPercent(avgConfidence) : '—',
      icon: Target,
    },
    {
      label: 'Thread Continuations',
      value: threadContinuations.toLocaleString(),
      icon: GitMerge,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.label} className="border-border shadow-sm">
          <CardContent className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <card.icon className="h-4.5 w-4.5" strokeWidth={2} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
