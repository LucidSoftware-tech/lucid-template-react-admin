import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { navigation, appConfig } from '../../config/navigation'
import { getIcon } from '../../config/icons'

export default function Sidebar({ className }) {
  const location = useLocation()

  const LogoIcon = getIcon('Rocket')

  return (
    <aside className={cn('flex h-full w-56 flex-col border-r bg-card/50', className)}>
      {/* Branding */}
      <div className="flex h-14 items-center gap-2.5 border-b px-4">
        {appConfig.logo ? (
          <img src={appConfig.logo} alt={appConfig.name} className="h-7 w-7" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <LogoIcon className="h-4 w-4" />
          </div>
        )}
        <span className="text-sm font-semibold tracking-tight">{appConfig.name}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navigation.map((item) => {
          const Icon = getIcon(item.icon)
          const isActive = location.pathname === item.path

          return (
            <NavLink
              key={item.key}
              to={item.path}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
