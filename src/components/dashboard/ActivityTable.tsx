import { useMemo, useState } from 'react'
import { MessageSquareText, Paperclip } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfidenceBar } from '@/components/dashboard/ConfidenceBar'
import { EmailDetailDialog } from '@/components/dashboard/EmailDetailDialog'
import {
  categoryBadgeClass,
  categoryLabel,
  formatRelativeTime,
  routingBadgeClass,
  routingLabel,
} from '@/lib/format'
import type { EmailClassification } from '@/lib/types'

type FilterValue = 'all' | 'flagged_for_review' | 'auto_routed'

interface ActivityTableProps {
  data: EmailClassification[]
}

export function ActivityTable({ data }: ActivityTableProps) {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selected, setSelected] = useState<EmailClassification | null>(null)

  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.processed_at).getTime() - new Date(a.processed_at).getTime(),
      ),
    [data],
  )

  const filtered = useMemo(
    () => (filter === 'all' ? sorted : sorted.filter((row) => row.routing_status === filter)),
    [sorted, filter],
  )

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex-col items-start gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="flagged_for_review">Flagged for Review</TabsTrigger>
            <TabsTrigger value="auto_routed">Auto-Routed</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Routing Status</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="pr-6 text-right">Processed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                onClick={() => setSelected(row)}
              >
                <TableCell className="max-w-[260px] pl-6">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    {row.is_thread_continuation && (
                      <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate">{row.subject || '(no subject)'}</span>
                    {row.has_attachments && (
                      <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                  {row.sender_email || '—'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={categoryBadgeClass(row.category)}>
                    {categoryLabel(row.category)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ConfidenceBar value={row.confidence} />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={routingBadgeClass(row.routing_status)}>
                    {routingLabel(row.routing_status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.assigned_department || '—'}
                </TableCell>
                <TableCell className="pr-6 text-right text-muted-foreground">
                  {formatRelativeTime(row.processed_at)}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  No emails match this filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <EmailDetailDialog
        email={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      />
    </Card>
  )
}
