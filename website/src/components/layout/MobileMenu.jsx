import { Link } from 'react-router-dom'
import { X, Phone, Mail } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOTEL } from '../../constants/hotel'

const NAV_LINKS = [
  { label: 'The Area', to: '/area' },
  { label: 'The Hotel', to: '/hotel' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[60] bg-navy flex flex-col overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Close button — top right */}
          <div className="flex items-center justify-end px-6 py-6">
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-gold transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-8 py-8 px-6">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="font-serif text-3xl sm:text-4xl font-semibold text-white hover:text-gold transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Book Now button */}
          <div className="px-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <Link
                to="/book"
                onClick={onClose}
                className="w-full flex items-center justify-center bg-gold hover:bg-gold-dark text-white py-4 text-sm font-sans font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Contact info at bottom */}
          <motion.div
            className="px-8 pb-10 pt-4 border-t border-white/10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            <a
              href={`tel:${HOTEL.contact.phone}`}
              className="flex items-center gap-2.5 text-sm font-sans text-white/60 hover:text-gold-light transition-colors"
            >
              <Phone size={15} />
              <span>{HOTEL.contact.phone}</span>
            </a>
            <a
              href={`mailto:${HOTEL.contact.email}`}
              className="flex items-center gap-2.5 text-sm font-sans text-white/60 hover:text-gold-light transition-colors"
            >
              <Mail size={15} />
              <span>{HOTEL.contact.email}</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
