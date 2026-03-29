import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-sm text-muted-foreground">Page not found</p>
      <Link to="/">
        <Button variant="outline" size="sm">Go Home</Button>
      </Link>
    </div>
  )
}
