import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { submitContact } from '../../services/api'
import { HOTEL } from '../../constants/hotel'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: '1',
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

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const inputClass =
    'w-full border border-stone/20 rounded-lg px-4 py-3 focus:border-sea focus:ring-1 focus:ring-sea outline-none bg-white text-stone placeholder:text-stone/40 transition-colors'
  const labelClass = 'block text-sm font-medium text-stone/80 mb-1'
  const errorClass = 'text-red-500 text-xs mt-1'

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
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

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-stone mb-2">Message Sent!</h3>
        <p className="text-stone/60 max-w-sm">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 btn-outline-dark text-sm"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            Something went wrong. Please try again or call us directly at{' '}
            <a href={`tel:${HOTEL.phone}`} className="font-semibold underline">
              {HOTEL.phone}
            </a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
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
          {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+30 000 000 0000"
            className={inputClass}
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className={labelClass}>
            Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className={inputClass}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="checkIn" className={labelClass}>
            Check-in
          </label>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="checkOut" className={labelClass}>
            Check-out
          </label>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Message - full width */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your ideal stay, any special requests, or questions..."
            className={`${inputClass} resize-none`}
          />
          {fieldErrors.message && <p className={errorClass}>{fieldErrors.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
