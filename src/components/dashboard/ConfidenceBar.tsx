interface ConfidenceBarProps {
  value: number | null
}

export function ConfidenceBar({ value }: ConfidenceBarProps) {
  if (value === null || value === undefined) {
    return <span className="text-xs text-muted-foreground">—</span>
  }

  const pct = Math.round(value * 100)
  const barColor = pct >= 85 ? 'bg-success' : pct >= 60 ? 'bg-warning' : 'bg-muted-foreground'

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
      <span className="text-xs font-medium tabular-nums text-foreground">{pct}%</span>
    </div>
  )
}
