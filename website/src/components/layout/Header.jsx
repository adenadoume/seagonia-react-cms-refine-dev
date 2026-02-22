import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { label: 'The Area', to: '/area' },
  { label: 'The Hotel', to: '/hotel' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white shadow-[0_1px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif text-2xl tracking-[0.35em] uppercase font-semibold transition-colors duration-500 ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
            >
              SEAGONIA
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[13px] font-sans font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                    scrolled
                      ? 'text-charcoal hover:text-gold'
                      : 'text-white/90 hover:text-gold-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Language + Book Now + Hamburger */}
            <div className="flex items-center gap-5">
              {/* Language Toggle (visual only) */}
              <div
                className={`hidden lg:flex items-center gap-1.5 text-xs font-sans font-medium tracking-wide select-none transition-colors duration-500 ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                <span className="cursor-pointer hover:text-gold transition-colors">EN</span>
                <span className="opacity-40">|</span>
                <span className="cursor-pointer hover:text-gold transition-colors opacity-60">GR</span>
              </div>

              {/* Book Now CTA */}
              <Link
                to="/book"
                className="hidden lg:inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white rounded-none px-7 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-lg"
              >
                Book Now
              </Link>

              {/* Hamburger (mobile) */}
              <button
                className={`lg:hidden p-2 transition-colors duration-300 ${
                  scrolled ? 'text-navy hover:text-gold' : 'text-white hover:text-gold-light'
                }`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={26} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
