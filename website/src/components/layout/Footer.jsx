import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import { HOTEL } from '../../constants/hotel'
import { subscribeNewsletter } from '../../services/api'

const QUICK_LINKS = [
  { label: 'The Area', to: '/area' },
  { label: 'The Hotel', to: '/hotel' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book Now', to: '/book' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState('idle') // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribeStatus('loading')
    try {
      await subscribeNewsletter(email.trim())
      setSubscribeStatus('success')
      setEmail('')
    } catch {
      setSubscribeStatus('error')
    }
  }

  return (
    <footer className="bg-navy text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-20">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              className="font-serif text-2xl tracking-[0.35em] uppercase font-semibold text-white hover:text-gold-light transition-colors"
            >
              SEAGONIA
            </Link>
            <p className="font-serif text-gold-light italic text-base">
              {HOTEL.tagline}
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              A boutique hotel nestled in the serene village of Pogonia, overlooking the crystal-clear
              waters of Paleros. A timeless retreat where the Ionian Sea meets Greek hospitality.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
                Stay in the loop
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-sans text-white placeholder-white/30 focus:outline-none focus:border-gold/60 focus:bg-white/10 transition-colors"
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                  className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-white px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {subscribeStatus === 'loading' ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
              {subscribeStatus === 'success' && (
                <p className="text-gold-light text-xs font-sans mt-2">Thank you for subscribing!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-xs font-sans mt-2">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${HOTEL.contact.phone}`}
                  className="flex items-start gap-3 text-sm font-sans text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-gold" />
                  <span>{HOTEL.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOTEL.contact.email}`}
                  className="flex items-start gap-3 text-sm font-sans text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-gold" />
                  <span>{HOTEL.contact.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm font-sans text-white/60">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                  <span>{HOTEL.contact.address}</span>
                </div>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-5 mt-3">
              {HOTEL.social?.instagram && (
                <a
                  href={HOTEL.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/40 hover:text-gold transition-colors duration-200"
                >
                  <Instagram size={20} />
                </a>
              )}
              {HOTEL.social?.facebook && (
                <a
                  href={HOTEL.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white/40 hover:text-gold transition-colors duration-200"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/40 tracking-wide">
            &copy; 2025 Seagonia Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/15">|</span>
            <Link
              to="/cookies"
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
