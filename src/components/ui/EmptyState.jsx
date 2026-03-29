import { cn } from '../../utils/cn'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No data', description, icon: Icon = Inbox, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <Icon className="h-10 w-10 text-muted-foreground/40 mb-4" />
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 text-xs text-muted-foreground max-w-sm">{description}</p>}
    </div>
  )
}
