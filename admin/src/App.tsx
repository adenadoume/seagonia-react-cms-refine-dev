import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PagesEditor from './pages/PagesEditor'
import RoomsAdmin from './pages/RoomsAdmin'
import GalleryAdmin from './pages/GalleryAdmin'
import TestimonialsAdmin from './pages/TestimonialsAdmin'
import AmenitiesAdmin from './pages/AmenitiesAdmin'
import ExperiencesAdmin from './pages/ExperiencesAdmin'
import SettingsAdmin from './pages/SettingsAdmin'
import MessagesAdmin from './pages/MessagesAdmin'
import NewsletterAdmin from './pages/NewsletterAdmin'

function AuthGuard({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesEditor />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="amenities" element={<AmenitiesAdmin />} />
          <Route path="experiences" element={<ExperiencesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="newsletter" element={<NewsletterAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
