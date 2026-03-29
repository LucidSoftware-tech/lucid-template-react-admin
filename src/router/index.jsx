import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout, AuthLayout } from '../components/layout'
import PrivateRoute from './PrivateRoute'
import { publicRoutes, privateRoutes, commonRoutes } from './routes'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: publicRoutes
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: privateRoutes
      }
    ]
  },
  ...commonRoutes
])

export default function Router() {
  return <RouterProvider router={router} />
}
