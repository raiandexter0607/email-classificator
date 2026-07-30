import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ConfidenceBar } from '@/components/dashboard/ConfidenceBar'
import {
  categoryBadgeClass,
  categoryLabel,
  formatRelativeTime,
  routingBadgeClass,
  routingLabel,
} from '@/lib/format'
import type { EmailClassification } from '@/lib/types'

interface EmailDetailDialogProps {
  email: EmailClassification | null
  onOpenChange: (open: boolean) => void
}

export function EmailDetailDialog({ email, onOpenChange }: EmailDetailDialogProps) {
  return (
    <Dialog open={email !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {email && (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-base">
                {email.subject || '(no subject)'}
              </DialogTitle>
              <DialogDescription>{email.sender_email || 'Unknown sender'}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={categoryBadgeClass(email.category)}>
                {categoryLabel(email.category)}
              </Badge>
              <Badge variant="outline" className={routingBadgeClass(email.routing_status)}>
                {routingLabel(email.routing_status)}
              </Badge>
              {email.is_thread_continuation && (
                <Badge variant="outline" className="border-border text-muted-foreground">
                  Thread continuation
                </Badge>
              )}
              {email.has_attachments && (
                <Badge variant="outline" className="border-border text-muted-foreground">
                  Has attachments
                </Badge>
              )}
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-muted/50 p-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Confidence</dt>
                <dd className="mt-1">
                  <ConfidenceBar value={email.confidence} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Department</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {email.assigned_department || '—'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Processed</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {formatRelativeTime(email.processed_at)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Reviewed by human</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {email.reviewed_by_human ? 'Yes' : 'No'}
                </dd>
              </div>
            </dl>

            {email.attachment_note && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Attachment note</p>
                <p className="mt-1 text-sm text-foreground">{email.attachment_note}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-muted-foreground">AI Reasoning</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {email.ai_reasoning || 'No reasoning provided.'}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
