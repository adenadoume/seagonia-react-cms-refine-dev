import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Users, BedDouble, Maximize2, Phone } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { ROOMS, PLACEHOLDER_IMAGES, HOTEL } from '../constants/hotel'
import ImageLightbox from '../components/shared/ImageLightbox'

const commonAmenities = [
  'Outdoor Sitting Area',
  'King or Twin Beds',
  'A/C & Heating',
  '50" Smart TV',
  'Mini Bar',
  'Espresso Machine',
  'Kettle',
  'Hair Dryer',
  'Iron & Ironing Board',
  'Safe',
  'Free WiFi',
  'Reading Lights',
]

export default function RoomDetail() {
  const { slug } = useParams()
  const room = ROOMS.find((r) => r.slug === slug)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useSEO({
    title: room ? room.name : 'Room Not Found',
    description: room
      ? room.description
      : 'The requested room could not be found.',
  })

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-4xl text-stone mb-4">Room Not Found</h1>
        <p className="text-stone/60 mb-8">
          Sorry, we could not find the room you are looking for.
        </p>
        <Link to="/rooms" className="btn-primary">
          View All Rooms
        </Link>
      </div>
    )
  }

  // Build images array from the room's image key (using placeholder for multiple images)
  const images = [
    PLACEHOLDER_IMAGES[room.image],
    PLACEHOLDER_IMAGES.seaView,
    PLACEHOLDER_IMAGES.pool,
  ]

  function openLightbox(index) {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Hero Image */}
      <section
        className="relative h-[60vh] min-h-[400px]"
        style={{
          backgroundImage: `url(${images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 z-10">
          <Link
            to="/rooms"
            className="text-white/80 text-sm hover:text-white transition-colors mb-2 inline-block"
          >
            &larr; All Rooms
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-white">
            {room.name}
          </h1>
          <p className="text-white/70 mt-2">{room.highlight}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-stone">
                  {room.name}
                </h2>
                <p className="text-stone/70 text-lg leading-relaxed mt-4">
                  {room.description}
                </p>

                {/* Room Amenities */}
                <h3 className="font-serif text-2xl text-stone mt-10 mb-6">
                  Room Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-sea flex-shrink-0" />
                      <span className="text-stone/80 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-28">
                <h3 className="font-serif text-xl text-stone mb-4">
                  Book This Room
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-stone/70">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-sm">{room.floor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone/70">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      Up to {room.maxGuests} guests
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-stone/70">
                    <BedDouble className="w-4 h-4" />
                    <span className="text-sm">
                      {room.bedOptions.join(' or ')}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/book?room=${room.slug}`}
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>

                <div className="mt-6 pt-6 border-t border-stone/10">
                  <div className="flex items-center gap-2 text-stone/60">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${HOTEL.contact.phone}`}
                      className="text-sm hover:text-sea transition-colors"
                    >
                      {HOTEL.contact.phone || 'Call for reservations'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-16">
            <h3 className="font-serif text-2xl text-stone mb-6">Gallery</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${room.name} ${i + 1}`}
                  className="h-48 md:h-64 w-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          </div>

          {/* All rooms include */}
          <div className="mt-16 bg-cream rounded-2xl p-8 md:p-12">
            <h3 className="font-serif text-2xl text-stone mb-6">
              All Rooms Include
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sea flex-shrink-0" />
                  <span className="text-stone/80 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
        onPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + images.length) % images.length
          )
        }
      />
    </>
  )
}
