import { useSearchParams } from 'react-router-dom'
import { Shield, CalendarX, Zap, Phone } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { ROOMS, HOTEL } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'
import BookingWidget from '../components/booking/BookingWidget'

const guarantees = [
  {
    icon: Shield,
    label: 'Best Rate Guaranteed',
  },
  {
    icon: CalendarX,
    label: 'Free Cancellation',
  },
  {
    icon: Zap,
    label: 'Instant Confirmation',
  },
]

export default function Book() {
  const [searchParams] = useSearchParams()
  const checkin = searchParams.get('checkin') || ''
  const checkout = searchParams.get('checkout') || ''
  const roomSlug = searchParams.get('room') || ''
  const guests = searchParams.get('guests') || ''

  const room = roomSlug ? ROOMS.find((r) => r.slug === roomSlug) : null

  useSEO({
    title: 'Reserve Your Stay',
    description:
      'Book your stay at Seagonia Hotel directly for the best rate. Free cancellation and instant confirmation.',
  })

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <SectionHeader
          eyebrow="RESERVATIONS"
          title="Reserve Your Stay"
          subtitle={
            room
              ? `Booking: ${room.name}`
              : 'Choose your dates and room to secure the best rate.'
          }
        />

        {/* Booking Widget */}
        <div className="mt-10">
          <BookingWidget
            checkIn={checkin}
            checkOut={checkout}
            guests={guests}
          />
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {guarantees.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 justify-center sm:justify-start"
            >
              <div className="w-10 h-10 bg-sea/10 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-sea" />
              </div>
              <span className="text-stone font-medium text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Phone Alternative */}
        <div className="mt-12 text-center bg-cream rounded-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-sea" />
            <p className="text-stone/80">Prefer to book by phone?</p>
          </div>
          <p className="text-stone">
            Call us at{' '}
            <a
              href={`tel:${HOTEL.contact.phone}`}
              className="text-sea font-semibold hover:underline"
            >
              {HOTEL.contact.phone || '+30 000 000 0000'}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
