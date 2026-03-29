import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  outline: 'border border-input bg-background shadow-sm hover:bg-muted/50 hover:text-foreground',
  ghost: 'hover:bg-muted/50 hover:text-foreground',
  danger: 'bg-red-600 text-white shadow hover:bg-red-700',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-6 text-sm',
  icon: 'h-9 w-9',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
