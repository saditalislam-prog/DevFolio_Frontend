import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/endpoints'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restore = async () => {
      if (!localStorage.getItem('access_token')) {
        setLoading(false)
        return
      }
      try {
        setUser(await authApi.me())
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const login = async (credentials) => {
    const data = await authApi.login(credentials)
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    const refresh = localStorage.getItem('refresh_token')
    try { if (refresh) await authApi.logout(refresh) } catch { /* token may already be invalid */ }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const value = useMemo(() => ({ user, isOwner: Boolean(user), login, logout, loading }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
