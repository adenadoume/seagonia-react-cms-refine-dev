import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

export const submitContact = (data) => {
  // Mock in development
  if (import.meta.env.DEV) {
    return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1000))
  }
  return api.post('/api/contact', data)
}

export const subscribeNewsletter = (email) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1000))
  }
  return api.post('/api/newsletter/subscribe', { email })
}

export default api
