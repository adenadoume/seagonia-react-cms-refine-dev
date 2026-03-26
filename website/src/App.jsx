import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const Home = lazy(() => import('./pages/Home'))
const Rooms = lazy(() => import('./pages/Rooms'))
const RoomDetail = lazy(() => import('./pages/RoomDetail'))
const Amenities = lazy(() => import('./pages/Amenities'))
const Dining = lazy(() => import('./pages/Dining'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Area = lazy(() => import('./pages/Area'))
const Hotel = lazy(() => import('./pages/Hotel'))
const Location = lazy(() => import('./pages/Location'))
const Contact = lazy(() => import('./pages/Contact'))
const Book = lazy(() => import('./pages/Book'))
const IonianEscape = lazy(() => import('./pages/IonianEscape'))
const Wellness = lazy(() => import('./pages/Wellness'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:slug" element={<RoomDetail />} />
              <Route path="/amenities" element={<Amenities />} />
              <Route path="/area" element={<Area />} />
              <Route path="/hotel" element={<Hotel />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/experiences" element={<Navigate to="/activities" replace />} />
              <Route path="/activities" element={<Experiences />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/ionian-escape" element={<IonianEscape />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/location" element={<Location />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
