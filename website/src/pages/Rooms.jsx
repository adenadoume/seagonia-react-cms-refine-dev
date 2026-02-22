import useSEO from '../hooks/useSEO'
import { ROOMS, PLACEHOLDER_IMAGES } from '../constants/hotel'
import RoomCard from '../components/shared/RoomCard'

export default function Rooms() {
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
        style={{
          backgroundImage: `url(${PLACEHOLDER_IMAGES.seaView})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-stone/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Our Rooms
          </h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
            58 rooms across 6 unique types, each thoughtfully designed for
            comfort and tranquility by the Ionian Sea.
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <RoomCard
                key={room.id}
                room={{
                  ...room,
                  images: [PLACEHOLDER_IMAGES[room.image]],
                  shortDesc: room.description,
                  guests: `${room.maxGuests}`,
                  size: room.floor,
                  beds: room.bedOptions.join(' / '),
                }}
                featured={room.featured}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
