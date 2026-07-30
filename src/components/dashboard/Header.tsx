interface HeaderProps {
  isLive: boolean
}

export function Header({ isLive }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-border bg-background px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Email Intelligence Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          SwiftLane Carriers · Live Classification &amp; Routing
        </p>
      </div>

      <div className="flex items-center gap-2 self-start rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm sm:self-auto">
        <span className="relative flex h-2 w-2">
          {isLive && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              isLive ? 'bg-success' : 'bg-muted-foreground/50'
            }`}
          />
        </span>
        {isLive ? 'Live' : 'Connecting…'}
      </div>
    </header>
  )
}
