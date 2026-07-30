import { useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import leantekLogo from '@/assets/leantek-logo.png'
import leantekIcon from '@/assets/leantek-icon.png'

const DEPARTMENTS = [
  { name: 'Quotes', color: 'var(--brand)' },
  { name: 'Pickups', color: 'var(--primary)' },
  { name: 'Claims', color: 'var(--danger)' },
  { name: 'Customer Service', color: 'var(--warning)' },
  { name: 'General', color: 'var(--muted-foreground)' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative hidden shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 md:flex',
        collapsed ? 'w-20' : 'w-64',
      )}
    >
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-16 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      <div className={cn('flex items-center px-6 py-6', collapsed && 'justify-center px-0')}>
        <img
          src={collapsed ? leantekIcon : leantekLogo}
          alt="LeanTek AgentEdge"
          className={collapsed ? 'h-8 w-8' : 'h-5 w-auto'}
        />
      </div>

      <nav className={cn('mt-2 flex flex-col gap-1', collapsed ? 'items-center px-2' : 'px-3')}>
        <div
          className={cn(
            'flex items-center gap-2.5 rounded-lg bg-brand/10 font-medium text-brand',
            collapsed ? 'h-11 w-11 justify-center' : 'px-3 py-2 text-sm',
          )}
        >
          <span
            className={cn(
              'flex shrink-0 items-center justify-center rounded-md bg-brand text-white',
              collapsed ? 'h-7 w-7' : 'h-6 w-6',
            )}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
          </span>
          {!collapsed && 'Overview'}
        </div>
      </nav>

      {!collapsed && (
        <div className="mt-8 px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
            Departments
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {DEPARTMENTS.map((dept) => (
              <li key={dept.name} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dept.color }}
                />
                {dept.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!collapsed && (
        <div className="mt-auto px-6 py-6 text-xs text-muted-foreground">
          Email Intelligence Dashboard
        </div>
      )}
    </aside>
  )
}
