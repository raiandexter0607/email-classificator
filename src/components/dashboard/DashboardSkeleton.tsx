import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-6 py-6 md:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-border shadow-sm">
            <CardContent className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-9 w-9 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-border shadow-sm">
            <CardHeader>
              <Skeleton className="h-4 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
