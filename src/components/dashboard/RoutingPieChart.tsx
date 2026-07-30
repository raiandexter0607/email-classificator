import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EmailClassification } from '@/lib/types'

interface RoutingPieChartProps {
  data: EmailClassification[]
}

export function RoutingPieChart({ data }: RoutingPieChartProps) {
  const autoRouted = data.filter((row) => row.routing_status === 'auto_routed').length
  const flagged = data.filter((row) => row.routing_status === 'flagged_for_review').length
  const total = autoRouted + flagged

  const chartData = [
    { name: 'Auto-Routed', value: autoRouted, color: 'var(--success)' },
    { name: 'Flagged for Review', value: flagged, color: 'var(--warning)' },
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle>Routing Status</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {total === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="85%"
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 8, borderColor: 'var(--border)', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      <div className="flex items-center justify-center gap-6 pb-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" /> Auto-Routed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-warning" /> Flagged
        </span>
      </div>
    </Card>
  )
}
