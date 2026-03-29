import { useEffect } from 'react'
import { cn } from '../../utils/cn'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        'relative z-50 w-full max-w-lg rounded-xl border bg-card p-6 shadow-lg animate-in fade-in-0 zoom-in-95',
        className
      )}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
