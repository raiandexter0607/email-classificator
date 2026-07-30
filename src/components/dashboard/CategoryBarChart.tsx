import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORY_CHART_COLOR, CATEGORY_LABEL } from '@/lib/format'
import type { EmailCategory, EmailClassification } from '@/lib/types'

const CATEGORY_ORDER: EmailCategory[] = [
  'quote',
  'pickup',
  'claim',
  'status_inquiry',
  'general',
]

interface CategoryBarChartProps {
  data: EmailClassification[]
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  const chartData = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABEL[category],
    count: data.filter((row) => row.category === category).length,
  }))

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle>Emails by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={32}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              contentStyle={{
                borderRadius: 8,
                borderColor: 'var(--border)',
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {chartData.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_CHART_COLOR[entry.category]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
