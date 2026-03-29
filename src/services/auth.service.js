import client from '../api/client'

/**
 * Auth Service
 *
 * Replace mock implementations below with real API calls
 * by uncommenting the real versions and deleting the mocks.
 */

// ─── MOCK (for template preview without backend) ────────────────
export const login = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token',
        user: { id: 1, email: data.email, role: 'admin' }
      })
    }, 400)
  })
}

export const getMe = async () => {
  return { id: 1, email: 'admin@example.com', role: 'admin' }
}

export const logout = async () => {
  return { success: true }
}

// ─── REAL (uncomment these when your backend is ready) ──────────
// export const login = (data) =>
//   client.post('/auth/login', data).then((r) => r.data)
//
// export const getMe = () =>
//   client.get('/auth/me').then((r) => r.data)
//
// export const logout = () =>
//   client.post('/auth/logout').then((r) => r.data)
