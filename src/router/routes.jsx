import LoginPage from '../pages/auth/LoginPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import UsersListPage from '../features/users/pages/UsersListPage'
import UserFormPage from '../features/users/pages/UserFormPage'

export const publicRoutes = [
  { path: '/login', element: <LoginPage /> }
]

export const privateRoutes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/users', element: <UsersListPage /> },
  { path: '/users/create', element: <UserFormPage /> },
  { path: '/users/:id/edit', element: <UserFormPage /> },
]

export const commonRoutes = [
  { path: '*', element: <NotFoundPage /> }
]
