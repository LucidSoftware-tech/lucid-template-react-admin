/**
 * DataTable — Column-definition-driven table wrapper
 *
 * This wraps shadcn's Table primitives with the simple column-definition API
 * that the generator and all feature pages rely on.
 *
 * Usage:
 *   <DataTable columns={columns} data={rows} onRowClick={handler} />
 *
 * Column shape:
 *   { key: string, label: string, headerClassName?, cellClassName?, render?: (value, row) => JSX }
 */
import { cn } from '@/lib/utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'

export function DataTable({ columns, data, className, onRowClick }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card shadow-sm', className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20 hover:bg-muted/20">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn('text-xs font-medium', col.headerClassName)}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={row.id || i}
                className={cn(onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn('text-xs', col.cellClassName)}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
