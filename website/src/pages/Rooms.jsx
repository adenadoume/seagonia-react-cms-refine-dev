import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import RoomCard from '../components/shared/RoomCard'
import { useRooms, usePageContent } from '../hooks/useSupabase'

export default function Rooms() {
  const { data: rooms, isLoading, isError } = useRooms()
  const { data: content } = usePageContent('rooms')

  const heroImage = content?.hero_image_url || HOTEL_IMAGES.pogoniaPanorama
  const heroTitle = content?.hero_title || 'Our Rooms'
  const heroSubtitle = content?.hero_subtitle || '58 rooms across 6 unique types, each thoughtfully designed for comfort and tranquility by the Ionian Sea.'

  useSEO({
    title: 'Our Rooms',
    description:
      'Explore 58 rooms across 6 unique types at Seagonia Hotel — from garden rooms and swim-up suites to panoramic balcony rooms on the Ionian coast.',
  })

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] min-h-[320px] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-stone/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">{heroTitle}</h1>
          {heroSubtitle && (
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">{heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-stone/10 rounded-2xl aspect-[3/4]" />
                  <div className="h-6 bg-stone/10 rounded mt-4 w-2/3" />
                  <div className="h-4 bg-stone/10 rounded mt-2 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-charcoal/60 py-20">
              Unable to load rooms. Please try again.
            </p>
          )}

          {rooms && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={{
                    id: room.id,
                    name: room.name,
                    slug: room.slug,
                    images: [room.image_url],
                    shortDesc: room.description,
                    highlight: room.highlight,
                    guests: `${room.max_guests}`,
                    size: room.floor,
                    beds: room.bed_options?.join(' / ') || '',
                  }}
                  featured={room.is_featured}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
