import { appConfig } from '../../config/navigation'
import { Card, CardContent } from '../../components/ui'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome to {appConfig.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Generator will replace these placeholder cards with real metrics */}
        {['Total Users', 'Active Sessions', 'Revenue', 'Growth'].map((label) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="text-xs text-muted-foreground font-medium">{label}</div>
              <div className="text-2xl font-bold tracking-tight mt-1">—</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
