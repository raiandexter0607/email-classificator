import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { KpiCards } from '@/components/dashboard/KpiCards'
import { CategoryBarChart } from '@/components/dashboard/CategoryBarChart'
import { RoutingPieChart } from '@/components/dashboard/RoutingPieChart'
import { ActivityTable } from '@/components/dashboard/ActivityTable'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { ErrorState } from '@/components/dashboard/ErrorState'
import { useEmailClassifications } from '@/hooks/useEmailClassifications'

function App() {
  const { data, loading, error, isLive } = useEmailClassifications()

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <Header isLive={isLive} />

        {loading && <DashboardSkeleton />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && data.length === 0 && <EmptyState />}

        {!loading && !error && data.length > 0 && (
          <main className="flex flex-1 flex-col gap-6 px-6 py-6 md:px-8">
            <KpiCards data={data} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CategoryBarChart data={data} />
              <RoutingPieChart data={data} />
            </div>

            <ActivityTable data={data} />
          </main>
        )}
      </div>
    </div>
  )
}

export default App
