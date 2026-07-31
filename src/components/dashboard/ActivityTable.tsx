import { Fragment, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, MessageSquareText, Paperclip } from 'lucide-react'
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

interface ThreadGroup {
  key: string
  representative: EmailClassification
  emails: EmailClassification[]
}

interface ActivityTableProps {
  data: EmailClassification[]
}

export function ActivityTable({ data }: ActivityTableProps) {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selected, setSelected] = useState<EmailClassification | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.processed_at).getTime() - new Date(a.processed_at).getTime(),
      ),
    [data],
  )

  const groups = useMemo<ThreadGroup[]>(() => {
    const byKey = new Map<string, EmailClassification[]>()
    for (const row of sorted) {
      const key = row.thread_id ?? row.id
      const bucket = byKey.get(key)
      if (bucket) bucket.push(row)
      else byKey.set(key, [row])
    }
    return Array.from(byKey.entries()).map(([key, emails]) => ({
      key,
      representative: emails[0],
      emails,
    }))
  }, [sorted])

  const filteredGroups = useMemo(
    () =>
      filter === 'all'
        ? groups
        : groups.filter((group) => group.representative.routing_status === filter),
    [groups, filter],
  )

  function toggleExpanded(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

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
            {filteredGroups.map((group) => {
              const row = group.representative
              const isThread = group.emails.length > 1
              const isExpanded = expanded.has(group.key)

              return (
                <Fragment key={group.key}>
                  <TableRow className="cursor-pointer" onClick={() => setSelected(row)}>
                    <TableCell className="max-w-[260px] pl-6">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        {isThread && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              toggleExpanded(group.key)
                            }}
                            aria-label={isExpanded ? 'Collapse thread' : 'Expand thread'}
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-muted-foreground hover:text-foreground"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5" />
                            )}
                          </button>
                        )}
                        <span className="truncate">{row.subject || '(no subject)'}</span>
                        {row.has_attachments && (
                          <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        )}
                        {isThread && (
                          <span className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                            <MessageSquareText className="h-3 w-3" />
                            {group.emails.length}
                          </span>
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

                  {isThread &&
                    isExpanded &&
                    group.emails.slice(1).map((email) => (
                      <TableRow
                        key={email.id}
                        className="cursor-pointer bg-muted/30 hover:bg-muted/60"
                        onClick={() => setSelected(email)}
                      >
                        <TableCell className="max-w-[260px] py-2 pl-12 text-sm">
                          <div className="flex items-center gap-1.5 text-foreground/80">
                            {email.is_thread_continuation && (
                              <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            )}
                            <span className="truncate">{email.subject || '(no subject)'}</span>
                            {email.has_attachments && (
                              <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate py-2 text-muted-foreground">
                          {email.sender_email || '—'}
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className={categoryBadgeClass(email.category)}>
                            {categoryLabel(email.category)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <ConfidenceBar value={email.confidence} />
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className={routingBadgeClass(email.routing_status)}>
                            {routingLabel(email.routing_status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2 text-muted-foreground">
                          {email.assigned_department || '—'}
                        </TableCell>
                        <TableCell className="py-2 pr-6 text-right text-muted-foreground">
                          {formatRelativeTime(email.processed_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                </Fragment>
              )
            })}
            {filteredGroups.length === 0 && (
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
