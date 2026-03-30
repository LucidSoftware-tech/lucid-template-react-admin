/**
 * Users List Page — CRUD Pattern
 *
 * This is a complete example of a data list page that your generator
 * can copy and adapt for any entity. It uses:
 * - DataTable (column-definition driven, wraps shadcn Table)
 * - Pagination
 * - Search with useDebounce
 * - React Query hooks
 * - Badge, Avatar, Button primitives from shadcn
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/Spinner'
import { DataTable } from '@/components/ui/data-table'
import EmptyState from '@/components/ui/EmptyState'
import { useUsers } from '../hooks/useUsers'
import useDebounce from '@/hooks/useDebounce'
import usePagination from '@/hooks/usePagination'

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (value, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
            {getInitials(value)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{value}</span>
          <span className="text-[10px] text-muted-foreground">{row.email}</span>
        </div>
      </div>
    ),
  },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'default' : 'destructive'}>
        {value}
      </Badge>
    ),
  },
  { key: 'createdAt', label: 'Created' },
]

export default function UsersListPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { page, setPage } = usePagination()

  const { data, isLoading } = useUsers({
    search: debouncedSearch,
    page,
    limit: 10,
  })

  const users = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage user accounts</p>
        </div>
        <Link to="/users/create">
          <Button size="sm">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-6 w-6" />
        </div>
      ) : users.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting your search or add a new user."
        />
      ) : (
        <>
          <DataTable columns={columns} data={users} />
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
