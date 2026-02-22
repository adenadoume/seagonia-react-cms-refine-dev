import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL, HOTEL_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'
import { submitContact } from '../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const subjectOptions = [
  'General Inquiry',
  'Reservation',
  'Group Booking',
  'Other',
]

const initialFormData = {
  name: '',
  email: '',
  subject: 'General Inquiry',
  message: '',
}

function validate(formData) {
  const errors = {}
  if (!formData.name.trim()) errors.name = 'Name is required.'
  if (!formData.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!formData.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function Contact() {
  useSEO({
    title: 'Contact Us',
    description:
      'Get in touch with Seagonia Hotel. Phone, email, address and contact form for reservations and enquiries.',
  })

  const [formData, setFormData] = useState(initialFormData)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const mapsEmbedUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED

  const inputClass =
    'w-full border border-charcoal/15 px-5 py-3.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white text-charcoal placeholder:text-charcoal/35 transition-colors font-sans text-base'
  const labelClass = 'block text-sm font-sans font-medium text-charcoal/70 mb-1.5 uppercase tracking-wider'
  const errorClass = 'text-red-500 text-xs mt-1'

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setStatus('loading')
    try {
      await submitContact(formData)
      setStatus('success')
      setFormData(initialFormData)
      setFieldErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero - Solid Navy */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center bg-navy">
        <div className="relative z-10 text-center text-white px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-gold-light mb-3"
          >
            CONTACT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                Send Us a Message
              </h2>
              <p className="text-charcoal/60 mb-10">
                Fill out the form below and our team will respond within 24
                hours.
              </p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle
                    className="w-16 h-16 text-green-500 mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-charcoal/60 max-w-sm">
                    Thank you! We&apos;ll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 btn-outline-dark text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {status === 'error' && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3 mb-6">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">
                        Something went wrong. Please try again or call us
                        directly at{' '}
                        <a
                          href={`tel:${HOTEL.contact.phone}`}
                          className="font-semibold underline"
                        >
                          {HOTEL.contact.phone || '+30 000 000 0000'}
                        </a>
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                      {fieldErrors.name && (
                        <p className={errorClass}>{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                      {fieldErrors.email && (
                        <p className={errorClass}>{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className={labelClass}>
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your inquiry..."
                        className={`${inputClass} resize-none`}
                      />
                      {fieldErrors.message && (
                        <p className={errorClass}>{fieldErrors.message}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 lg:p-10">
                <h3 className="font-serif text-2xl text-charcoal mb-8">
                  Hotel Details
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-sm font-sans uppercase tracking-wider mb-0.5">
                        Address
                      </p>
                      <p className="text-charcoal font-medium">
                        Pogonia, Paleros 300 04, Greece
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-sm font-sans uppercase tracking-wider mb-0.5">
                        Phone
                      </p>
                      <a
                        href={`tel:${HOTEL.contact.phone}`}
                        className="text-charcoal font-medium hover:text-gold transition-colors"
                      >
                        {HOTEL.contact.phone || '+30 000 000 0000'}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-charcoal/50 text-sm font-sans uppercase tracking-wider mb-0.5">
                        Email
                      </p>
                      <a
                        href={`mailto:${HOTEL.contact.email}`}
                        className="text-charcoal font-medium hover:text-gold transition-colors"
                      >
                        {HOTEL.contact.email || 'info@seagonia.com'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-charcoal/10">
                  <p className="text-charcoal/50 text-sm font-sans uppercase tracking-wider mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={HOTEL.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-charcoal/5 rounded-full flex items-center justify-center hover:bg-gold/10 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-charcoal/70" />
                    </a>
                    <a
                      href={HOTEL.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-charcoal/5 rounded-full flex items-center justify-center hover:bg-gold/10 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-charcoal/70" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 overflow-hidden"
              >
                {mapsEmbedUrl ? (
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Seagonia Hotel location"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-ivory flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-charcoal/20 mx-auto mb-2" />
                      <p className="text-charcoal/40 text-sm">Map loading...</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
