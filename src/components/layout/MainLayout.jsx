import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { cn } from '../../utils/cn'

export default function MainLayout({ className }) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-background text-sm", className)}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 flex-1 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
