import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuth: false,
      setAuth: (user, token) => set({ user, token, isAuth: true }),
      logout: () => set({ user: null, token: null, isAuth: false })
    }),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
