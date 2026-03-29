/**
 * Users List Page — CRUD Pattern
 *
 * This is a complete example of a data list page that your generator
 * can copy and adapt for any entity. It uses:
 * - Table (column-definition driven)
 * - Pagination
 * - Search with useDebounce
 * - React Query hooks
 * - Badge, Avatar, Button primitives
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { Button, Input, Table, Badge, Avatar, Pagination, EmptyState, Spinner } from '../../../components/ui'
import { useUsers } from '../hooks/useUsers'
import useDebounce from '../../../hooks/useDebounce'
import usePagination from '../../../hooks/usePagination'

const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (value, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={value} size="sm" />
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
      <Badge variant={value === 'active' ? 'success' : 'danger'}>
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
      <Input
        placeholder="Search users..."
        icon={Search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : users.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting your search or add a new user."
        />
      ) : (
        <>
          <Table columns={columns} data={users} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
