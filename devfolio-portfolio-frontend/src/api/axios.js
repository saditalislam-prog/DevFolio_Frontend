import axios from 'axios'
import { getVisitorId } from '../hooks/useVisitorId'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const access = localStorage.getItem('access_token')
  if (access) config.headers.Authorization = `Bearer ${access}`
  config.headers['X-Visitor-Id'] = getVisitorId()
  return config
})

let refreshing = null
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original?._retry && !original?.url?.includes('/auth/login/')) {
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (!refresh) return Promise.reject(error)
      try {
        refreshing ||= axios.post(`${api.defaults.baseURL}/auth/refresh/`, { refresh })
        const response = await refreshing
        refreshing = null
        localStorage.setItem('access_token', response.data.access)
        if (response.data.refresh) localStorage.setItem('refresh_token', response.data.refresh)
        original.headers.Authorization = `Bearer ${response.data.access}`
        return api(original)
      } catch (refreshError) {
        refreshing = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        if (window.location.pathname.startsWith('/dashboard')) window.location.assign('/login')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
