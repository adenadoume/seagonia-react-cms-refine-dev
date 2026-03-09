import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

export const submitContact = (data) => {
  // Mock in development
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1000))
  }
  return api.post('/api/contact', data)
}

export const subscribeNewsletter = (email) => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1000))
  }
  return api.post('/api/newsletter/subscribe', { email })
}

export default api
