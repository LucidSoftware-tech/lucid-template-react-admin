import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/auth.store'

export default function PrivateRoute() {
  const isAuth = useAuthStore((s) => s.isAuth)
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
