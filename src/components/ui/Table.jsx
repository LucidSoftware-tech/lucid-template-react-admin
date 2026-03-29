import { cn } from '../../utils/cn'

export default function Table({ columns, data, className, onRowClick }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card shadow-sm', className)}>
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/20 text-xs font-medium text-muted-foreground">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn('px-4 py-3 font-medium', col.headerClassName)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y text-xs">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id || i}
                className={cn(
                  'transition-colors hover:bg-muted/20',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3', col.cellClassName)}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
