import { Bell, LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import useAuthStore from '../../store/auth.store'
import { cn } from '../../utils/cn'
import { appConfig, navigation } from '../../config/navigation'
import { Avatar, Button } from '../ui'

export default function Header({ className }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const location = useLocation()

  // Derive page title from the navigation config
  const currentNav = navigation.find((n) => n.path === location.pathname)
  const pageTitle = currentNav?.label || appConfig.name

  return (
    <header className={cn(
      'sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      <h1 className="text-sm font-semibold tracking-tight">{pageTitle}</h1>

      <div className="flex items-center gap-3 text-muted-foreground">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        <div className="flex items-center gap-2 pl-3 border-l">
          <Avatar name={user?.email || 'Admin'} size="sm" />
          <span className="text-xs font-medium text-foreground">{user?.email || 'Admin'}</span>
        </div>

        <Button variant="ghost" size="icon" onClick={logout} title="Logout">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
