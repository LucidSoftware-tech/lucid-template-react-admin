import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({ className, label, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium leading-none text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-9',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
