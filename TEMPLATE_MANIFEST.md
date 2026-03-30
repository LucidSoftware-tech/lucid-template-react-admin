# Template Manifest — lucid-template-react-admin

## Stack
- Framework: Vite 5 + React 18 (SPA)
- Styling: Tailwind CSS 3.4 + HSL CSS variables
- **UI Components: shadcn/ui (new-york style, JSX, Radix primitives)**
- State: Zustand 4.5 (with `persist` middleware)
- Data fetching: TanStack React Query v5
- Forms: React Hook Form 7.51 + Zod 3.23
- HTTP: Axios 1.7 (configured in `src/api/client.js`)
- Routing: React Router DOM 6.23 (`createBrowserRouter`)
- Icons: lucide-react 1.7 (tree-shaken via icon registry)
- i18n: i18next 23 + react-i18next 14
- Charts: Recharts 3.8
- Utilities: clsx 2.1, tailwind-merge 3.5, class-variance-authority, dayjs 1.11
- Package manager: pnpm
- Linting: ESLint 8 + Prettier 3

## Import aliases
- `@/*` → `src/*`
- Configured in `vite.config.js` via `resolve.alias` and `jsconfig.json`
- Example: `import { Button } from '@/components/ui/Button'`

---

## Available UI components (shadcn/ui)

All UI components live in `src/components/ui/`. shadcn components are JSX files owned by the project — not an npm dependency.

**Import pattern (barrel):**
```jsx
import { Button, Input, Card, Badge } from '@/components/ui'
```

**Import pattern (direct — recommended by shadcn convention):**
```jsx
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
```

### Button (`Button.jsx`)
Exports: `Button`, `buttonVariants`
Props: `variant` (`default` | `destructive` | `outline` | `secondary` | `ghost` | `link`), `size` (`default` | `sm` | `lg` | `icon`), `asChild`, `className`, plus any native button props.

Usage:
```jsx
<Button variant="default" size="sm">Save</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
<Button asChild><Link to="/page">Go</Link></Button>
```

### Input (`Input.jsx`)
Exports: `Input`
Props: `type`, `className`, plus any native input props. Supports `ref` forwarding (react-hook-form compatible).

Usage:
```jsx
<Input type="email" placeholder="name@example.com" {...register('email')} />
```

### Label (`label.jsx`)
Exports: `Label`
Props: `htmlFor`, `className`, plus native label props.

Usage:
```jsx
<Label htmlFor="email">Email</Label>
<Input id="email" />
```

### Card (`Card.jsx`)
Exports: `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`

Usage:
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Badge (`Badge.jsx`)
Exports: `Badge`, `badgeVariants`
Props: `variant` (`default` | `secondary` | `destructive` | `outline`), `className`

Usage:
```jsx
<Badge variant="default">Active</Badge>
<Badge variant="destructive">Blocked</Badge>
```

### Avatar (`Avatar.jsx`)
Exports: `Avatar`, `AvatarImage`, `AvatarFallback`
Radix-based with automatic image loading and fallback.

Usage:
```jsx
<Avatar className="h-8 w-8">
  <AvatarImage src="/avatar.jpg" alt="@user" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Table (`Table.jsx`)
Exports: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`

Usage:
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### DataTable (`data-table.jsx`) — Custom wrapper
Exports: `DataTable`
Column-definition driven wrapper around shadcn Table. Accepts the same API the generator uses.

Props: `columns` (array of `{ key, label, headerClassName?, cellClassName?, render? }`), `data` (array), `className`, `onRowClick`

Usage:
```jsx
const columns = [
  { key: 'name', label: 'Name', render: (val, row) => <span>{val}</span> },
  { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'active' ? 'default' : 'destructive'}>{val}</Badge> },
]
<DataTable columns={columns} data={users} onRowClick={(row) => navigate(`/users/${row.id}/edit`)} />
```

### Dialog (`dialog.jsx`)
Exports: `Dialog`, `DialogPortal`, `DialogOverlay`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

Usage:
```jsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### AlertDialog (`alert-dialog.jsx`)
Exports: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`

### DropdownMenu (`dropdown-menu.jsx`)
Exports: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, etc.

### Select (`select.jsx`)
Exports: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`

### Sheet (`sheet.jsx`)
Exports: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`

### Tabs (`tabs.jsx`)
Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

### Tooltip (`tooltip.jsx`)
Exports: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`

### Pagination (`Pagination.jsx`)
Exports: `Pagination`, `PaginationContent`, `PaginationLink`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`

### Spinner (`Spinner.jsx`)
Exports: `Spinner`
Props: `className`

### Additional components
- `Alert` / `AlertTitle` / `AlertDescription` (`alert.jsx`)
- `Checkbox` (`checkbox.jsx`)
- `Switch` (`switch.jsx`)
- `Textarea` (`textarea.jsx`)
- `Popover` / `PopoverTrigger` / `PopoverContent` (`popover.jsx`)
- `ScrollArea` / `ScrollBar` (`scroll-area.jsx`)
- `Separator` (`separator.jsx`)
- `Skeleton` (`skeleton.jsx`)
- `Toaster` (sonner, `sonner.jsx`)

### EmptyState (`EmptyState.jsx`) — Custom component
Exports: `default` (EmptyState)
Props: `title`, `description`, `icon` (Lucide component), `className`

---

## Available layout components

### MainLayout (`src/components/layout/MainLayout.jsx`)
Authenticated app shell: Sidebar + Header + `<Outlet />`.

### AuthLayout (`src/components/layout/AuthLayout.jsx`)
Centered layout for login/register pages.

### Sidebar (`src/components/layout/Sidebar.jsx`)
Uses shadcn `ScrollArea`, `Tooltip`, `Separator`. Reads from `src/config/navigation.js`.

### Header (`src/components/layout/Header.jsx`)
Uses shadcn `Avatar`, `Button`, `DropdownMenu`, `Tooltip`. Shows page title, notifications, user profile dropdown with logout.

---

## Available hooks

### Shared hooks (`src/hooks/`)
| Hook | Signature | Returns |
|------|-----------|---------|
| `useDebounce` | `(value, delayMs)` | `debouncedValue` |
| `usePagination` | `(initialPage?, initialLimit?)` | `{ page, limit, setPage, setLimit, offset }` |
| `useLocalStorage` | `(key, initialValue)` | `[storedValue, setValue]` |

### Feature hooks (`src/features/users/hooks/useUsers.js`)
| Hook | Signature | Returns |
|------|-----------|---------|
| `useUsers(params)` | `{ search?, page?, limit? }` | React Query result |
| `useUser(id)` | `string \| number` | React Query result |
| `useCreateUser()` | — | useMutation result |
| `useUpdateUser()` | `mutate({ id, data })` | useMutation result |
| `useDeleteUser()` | `mutate(id)` | useMutation result |

---

## Available stores

### useAuthStore (`src/store/auth.store.js`)
Persisted to localStorage as `auth-storage`.

State: `user`, `token`, `isAuth`
Actions: `setAuth(user, token)`, `logout()`

### useUIStore (`src/store/ui.store.js`)
State: `isSidebarOpen`
Actions: `toggleSidebar()`, `closeSidebar()`, `openSidebar()`

---

## Available services

### auth.service.js (`src/services/`)
`login(data)`, `getMe()`, `logout()` — mock by default, real API commented out.

### users.service.js (`src/features/users/services/`)
`getUsers(params)`, `getUser(id)`, `createUser(data)`, `updateUser(id, data)`, `deleteUser(id)`

---

## API client

- **Location**: `src/api/client.js`
- **Import**: `import client from '@/api/client'`
- **Base URL**: `import.meta.env.VITE_API_URL`
- **Auth**: Bearer token from localStorage
- **401 handling**: clears token, redirects to `/login`

---

## Utility functions

### cn (`src/lib/utils.js`) — shadcn standard location
```js
import { cn } from '@/lib/utils'
cn('base-class', condition && 'conditional-class', className)
```

### formatDate (`src/utils/format.js`)
### Token storage (`src/utils/storage.js`) — `getToken`, `setToken`, `removeToken`

---

## Icon registry (`src/config/icons.js`)
Pre-registered: `Circle`, `LayoutDashboard`, `Users`, `Rocket`, `Settings`, `FileText`, `ShoppingCart`, `BarChart2`, `Mail`, `Bell`, `Package`, `CreditCard`, `Folder`, `Globe`, `Shield`, `Zap`

```js
import { getIcon } from '@/config/icons'
const Icon = getIcon('Users')
```

---

## Routing pattern

Three route arrays in `src/router/routes.jsx`:
- **`publicRoutes`** → `<AuthLayout>` wrapper
- **`privateRoutes`** → `<PrivateRoute>` → `<MainLayout>` wrapper
- **`commonRoutes`** → no wrapper

| Path | Component | Type |
|------|-----------|------|
| `/login` | LoginPage | Public |
| `/` | DashboardPage | Private |
| `/users` | UsersListPage | Private |
| `/users/create` | UserFormPage | Private |
| `/users/:id/edit` | UserFormPage | Private |
| `*` | NotFoundPage | Common |

---

## How to add a new page

1. Create page in `src/pages/<section>/` or `src/features/<feature>/pages/`
2. Import shadcn components: `import { Card, CardContent } from '@/components/ui/Card'`
3. Add route in `src/router/routes.jsx`
4. Add nav entry in `src/config/navigation.js`
5. Register icon in `src/config/icons.js` if needed

---

## How to add a new feature (full CRUD)

1. **Service** → `src/features/<entity>/services/<entity>.service.js`
2. **Hooks** → `src/features/<entity>/hooks/use<Entity>.js` (React Query)
3. **List page** → uses `DataTable`, `Badge`, `Avatar`, `Button`, `EmptyState`, `Spinner`
4. **Form page** → uses `Input`, `Label`, `Select`, `Button`, `Card`
5. **Routes** → add to `src/router/routes.jsx`
6. **Navigation** → add to `src/config/navigation.js`

---

## CSS variables available

| Variable | Value | Description |
|----------|-------|-------------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `240 10% 3.9%` | Primary text |
| `--card` / `--card-foreground` | white / near-black | Card colors |
| `--popover` / `--popover-foreground` | white / near-black | Popover colors |
| `--primary` | `262.1 83.3% 57.8%` | Brand purple |
| `--primary-foreground` | `210 40% 98%` | Text on primary |
| `--secondary` / `--secondary-foreground` | muted gray | Secondary actions |
| `--muted` / `--muted-foreground` | light gray | Muted backgrounds/text |
| `--accent` / `--accent-foreground` | light gray | Accent highlights |
| `--destructive` / `--destructive-foreground` | red | Destructive actions |
| `--border` | `240 5.9% 90%` | Border color |
| `--input` | `240 5.9% 90%` | Input border |
| `--ring` | `262.1 83.3% 57.8%` | Focus ring |
| `--radius` | `0.5rem` | Border radius |
| `--chart-1` through `--chart-5` | various | Chart colors |
| `--sidebar-*` | various | Sidebar-specific tokens |

---

## Tailwind custom config

Colors: `background`, `foreground`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`, `border`, `input`, `ring`, `chart-1..5`, `sidebar`
Border radius: `lg`, `md`, `sm` (from `--radius`)
Animations: `accordion-down`, `accordion-up`
Plugin: `tailwindcss-animate`

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000` | Backend API base URL |
| `VITE_APP_NAME` | `Admin Panel` | App name (header, sidebar, login) |

---

## shadcn/ui configuration

**Config file**: `components.json`
- Style: `new-york`
- JSX (not TSX): `"tsx": false`
- CSS file: `src/styles/global.css`
- Component alias: `@/components/ui`
- Utility: `@/lib/utils`

**Adding a new shadcn component:**
```bash
pnpm dlx shadcn@latest add <component-name>
```

---

## DO NOT create these (already exist)

```
# Root config
.env.example
.eslintrc.json
.gitignore
.prettierrc
components.json
index.html
jsconfig.json
package.json
pnpm-lock.yaml
postcss.config.js
tailwind.config.js
vite.config.js

# Entry
src/main.jsx
src/App.jsx

# Styles
src/styles/global.css

# Lib (shadcn utils)
src/lib/utils.js

# API
src/api/client.js
src/api/index.js

# Router
src/router/index.jsx
src/router/routes.jsx
src/router/PrivateRoute.jsx

# UI Components — shadcn/ui
src/components/ui/index.js
src/components/ui/Avatar.jsx
src/components/ui/Badge.jsx
src/components/ui/Button.jsx
src/components/ui/Card.jsx
src/components/ui/Input.jsx
src/components/ui/Pagination.jsx
src/components/ui/Spinner.jsx
src/components/ui/Table.jsx
src/components/ui/alert.jsx
src/components/ui/alert-dialog.jsx
src/components/ui/checkbox.jsx
src/components/ui/dialog.jsx
src/components/ui/dropdown-menu.jsx
src/components/ui/label.jsx
src/components/ui/popover.jsx
src/components/ui/scroll-area.jsx
src/components/ui/select.jsx
src/components/ui/separator.jsx
src/components/ui/sheet.jsx
src/components/ui/skeleton.jsx
src/components/ui/sonner.jsx
src/components/ui/switch.jsx
src/components/ui/tabs.jsx
src/components/ui/textarea.jsx
src/components/ui/tooltip.jsx

# UI Components — custom wrappers
src/components/ui/data-table.jsx
src/components/ui/EmptyState.jsx

# Layout
src/components/layout/index.js
src/components/layout/AuthLayout.jsx
src/components/layout/Header.jsx
src/components/layout/MainLayout.jsx
src/components/layout/Sidebar.jsx

# Hooks
src/hooks/index.js
src/hooks/useDebounce.js
src/hooks/useLocalStorage.js
src/hooks/usePagination.js

# Stores
src/store/index.js
src/store/auth.store.js
src/store/ui.store.js

# Services
src/services/index.js
src/services/auth.service.js

# Config
src/config/icons.js
src/config/navigation.js

# Constants
src/constants/index.js

# Providers
src/providers/index.jsx
src/providers/QueryProvider.jsx

# Utils
src/utils/index.js
src/utils/format.js
src/utils/storage.js

# i18n
src/i18n/index.js
src/i18n/locales/en.json
src/i18n/locales/ru.json

# Pages
src/pages/NotFoundPage.jsx
src/pages/auth/LoginPage.jsx
src/pages/dashboard/DashboardPage.jsx

# Features — Users (example CRUD)
src/features/users/hooks/useUsers.js
src/features/users/services/users.service.js
src/features/users/pages/UsersListPage.jsx
src/features/users/pages/UserFormPage.jsx
```
