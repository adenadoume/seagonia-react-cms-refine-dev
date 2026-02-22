import { useState } from 'react'

export default function BookingWidget({ checkIn, checkOut, guests }) {
  const [loaded, setLoaded] = useState(false)
  const base = import.meta.env.VITE_WEBHOTELIER_URL

  // If no valid URL configured, show placeholder
  if (!base || base.includes('REPLACE')) {
    return (
      <div className="w-full min-h-[500px] bg-sand-light rounded-2xl flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-sea/10 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-sea" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-stone mb-2">Booking Coming Soon</h3>
        <p className="text-stone/60 max-w-md">Our online booking system is being set up. In the meantime, please contact us directly to reserve your stay.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href={`tel:${import.meta.env.VITE_HOTEL_PHONE}`} className="btn-primary">Call Us</a>
          <a href={`mailto:${import.meta.env.VITE_HOTEL_EMAIL}`} className="btn-outline-dark">Email Us</a>
        </div>
      </div>
    )
  }

  const params = new URLSearchParams()
  if (checkIn) params.set('checkin', checkIn)
  if (checkOut) params.set('checkout', checkOut)
  if (guests) params.set('adults', guests)
  const src = `${base}/widgets/embed/?${params}`

  return (
    <div className="relative w-full min-h-[500px]">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-sand/50 rounded-lg" />}
      <iframe
        src={src}
        style={{ border: 'none' }}
        width="100%"
        height="500"
        title="Book your stay at Seagonia"
        onLoad={() => setLoaded(true)}
      />
      <p className="text-center text-sm text-stone/60 mt-2">
        Having trouble?{' '}
        <a href={base} target="_blank" rel="noopener noreferrer" className="text-sea underline">
          Open booking page directly
        </a>
      </p>
    </div>
  )
}
