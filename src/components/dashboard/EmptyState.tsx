import { Inbox } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Inbox className="h-6 w-6" strokeWidth={2} />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Waiting for the first email</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        No emails have been classified yet. Once n8n processes an inbound message, it will
        appear here automatically — no refresh needed.
      </p>
    </div>
  )
}
