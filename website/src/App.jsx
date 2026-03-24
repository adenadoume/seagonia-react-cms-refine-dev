import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Amenities from './pages/Amenities'
import Dining from './pages/Dining'
import Experiences from './pages/Experiences'
import Gallery from './pages/Gallery'
import Area from './pages/Area'
import Hotel from './pages/Hotel'
import Location from './pages/Location'
import Contact from './pages/Contact'
import Book from './pages/Book'
import IonianEscape from './pages/IonianEscape'
import Wellness from './pages/Wellness'

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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
