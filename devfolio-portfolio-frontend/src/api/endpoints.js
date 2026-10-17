import api from './axios'

const unwrap = (promise) => promise.then((r) => r.data)

export const authApi = {
  login: (data) => unwrap(api.post('/auth/login/', data)),
  me: () => unwrap(api.get('/auth/me/')),
  logout: (refresh) => unwrap(api.post('/auth/logout/', { refresh })),
  changePassword: (data) => unwrap(api.post('/auth/change-password/', data)),
}

export const profileApi = {
  get: () => unwrap(api.get('/profile/')),
  update: (data) => unwrap(api.patch('/profile/', data)),
}

function resource(path) {
  return {
    list: (params = {}) => unwrap(api.get(`/${path}/`, { params })),
    get: (id) => unwrap(api.get(`/${path}/${id}/`)),
    create: (data) => unwrap(api.post(`/${path}/`, data)),
    update: (id, data) => unwrap(api.patch(`/${path}/${id}/`, data)),
    remove: (id) => api.delete(`/${path}/${id}/`),
  }
}

export const skillsApi = resource('skills')
export const experienceApi = resource('experiences')
export const educationApi = resource('education')
export const categoriesApi = resource('categories')
export const tagsApi = resource('tags')
export const commentsApi = resource('comments')
export const contactApi = resource('contact')

export const projectsApi = {
  ...resource('projects'),
}

export const postsApi = {
  ...resource('posts'),
  like: (slug) => unwrap(api.post(`/posts/${slug}/like/`)),
  comments: (slug) => unwrap(api.get(`/posts/${slug}/comments/`)),
  addComment: (slug, data) => unwrap(api.post(`/posts/${slug}/comments/`, data)),
}

export const dashboardApi = {
  stats: () => unwrap(api.get('/dashboard/stats/')),
}
