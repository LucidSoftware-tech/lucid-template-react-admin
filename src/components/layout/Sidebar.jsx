import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navigation, appConfig } from '@/config/navigation'
import { getIcon } from '@/config/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Sidebar({ className }) {
  const location = useLocation()

  const LogoIcon = getIcon('Rocket')

  return (
    <aside className={cn('flex h-full w-56 flex-col border-r bg-sidebar', className)}>
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
      <ScrollArea className="flex-1">
        <nav className="space-y-0.5 p-3">
          <TooltipProvider delayDuration={0}>
            {navigation.map((item) => {
              const Icon = getIcon(item.icon)
              const isActive = location.pathname === item.path

              return (
                <Tooltip key={item.key}>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={cn(
                        'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <Separator />
    </aside>
  )
}
