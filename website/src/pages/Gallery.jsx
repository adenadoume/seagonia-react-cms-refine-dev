import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import ImageLightbox from '../components/shared/ImageLightbox'

const categories = ['All', 'Hotel', 'Rooms', 'Pool', 'Dining', 'Experiences']

const galleryImages = [
  // Hotel & Exterior
  { src: HOTEL_IMAGES.hero, category: 'Hotel', alt: 'Seagonia Hotel pool and facade' },
  { src: HOTEL_IMAGES.entrance, category: 'Hotel', alt: 'Hotel entrance with SEAGONIA sign' },
  { src: HOTEL_IMAGES.hotelInPogonia, category: 'Hotel', alt: 'Seagonia Hotel in Pogonia bay' },
  { src: HOTEL_IMAGES.hotelBirdseye, category: 'Hotel', alt: 'Hotel aerial birdseye view' },
  { src: HOTEL_IMAGES.pogoniaPanorama, category: 'Hotel', alt: 'Pogonia bay panoramic view' },
  { src: HOTEL_IMAGES.pogoniaBeach, category: 'Hotel', alt: 'Pogonia beach with sunbeds' },
  { src: HOTEL_IMAGES.palerosHarbor, category: 'Hotel', alt: 'Paleros harbor' },

  // Rooms
  { src: HOTEL_IMAGES.roomBalcony, category: 'Rooms', alt: 'Type D Balcony Room interior' },
  { src: HOTEL_IMAGES.roomSwimUp, category: 'Rooms', alt: 'Type B Swim-Up Room with pool' },
  { src: HOTEL_IMAGES.roomSwimUpExterior, category: 'Rooms', alt: 'Swim-up rooms exterior corridor' },
  { src: HOTEL_IMAGES.roomExteriorBalconies, category: 'Rooms', alt: 'Building exterior with balconies' },
  { src: HOTEL_IMAGES.roomGarden, category: 'Rooms', alt: 'Garden rooms with private patios' },

  // Pool
  { src: HOTEL_IMAGES.poolArea, category: 'Pool', alt: 'Pool area and multipurpose room' },
  { src: HOTEL_IMAGES.poolDeck, category: 'Pool', alt: 'Pool deck with sunbeds and umbrellas' },
  { src: HOTEL_IMAGES.roomSwimUpExterior, category: 'Pool', alt: 'Swim-up pool corridor' },

  // Dining
  { src: HOTEL_IMAGES.galiaRooftop, category: 'Dining', alt: 'Galia Rooftop Restaurant render' },
  { src: HOTEL_IMAGES.outdoorDining, category: 'Dining', alt: 'Outdoor dining under the trees' },
  { src: HOTEL_IMAGES.cheesePlatter, category: 'Dining', alt: 'Local cheese & bread platter' },
  { src: HOTEL_IMAGES.foodBurrata, category: 'Dining', alt: 'Burrata and tomato salad' },
  { src: HOTEL_IMAGES.foodDolmades, category: 'Dining', alt: 'Traditional dolmades' },
  { src: HOTEL_IMAGES.foodPide, category: 'Dining', alt: 'Mediterranean flatbread' },
  { src: HOTEL_IMAGES.sunsetDining, category: 'Dining', alt: 'Sunset dining at harbor' },
  { src: HOTEL_IMAGES.farmLettuce, category: 'Dining', alt: 'Fresh lettuce from our farm' },

  // Experiences
  { src: HOTEL_IMAGES.yogaGroup, category: 'Experiences', alt: 'Outdoor yoga group session' },
  { src: HOTEL_IMAGES.massage, category: 'Experiences', alt: 'Spa massage therapy' },
  { src: HOTEL_IMAGES.pureSpa, category: 'Experiences', alt: 'PURE Spa interior' },
  { src: HOTEL_IMAGES.beekeeping, category: 'Experiences', alt: 'Beekeeping experience' },
  { src: HOTEL_IMAGES.cookingClass, category: 'Experiences', alt: 'Traditional cooking class' },
  { src: HOTEL_IMAGES.vathiavali, category: 'Experiences', alt: 'Vathiavali beach aerial' },
  { src: HOTEL_IMAGES.islandBeach, category: 'Experiences', alt: 'Ionian island cliff beach' },
  { src: HOTEL_IMAGES.islandCoast, category: 'Experiences', alt: 'Dramatic Ionian coast' },
  { src: HOTEL_IMAGES.littleIonian, category: 'Experiences', alt: 'The Little Ionian islands' },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useSEO({
    title: 'Gallery',
    description:
      'Browse photos of Seagonia Hotel — rooms, pool, dining, beach and experiences on the Ionian coast of Greece.',
  })

  const filtered =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter)

  const filteredSrcs = filtered.map((img) => img.src)

  function openLightbox(index) {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] min-h-[320px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HOTEL_IMAGES.littleIonian})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Gallery
          </h1>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-gold text-white'
                    : 'bg-cream/50 text-charcoal hover:bg-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={`${img.src}-${img.alt}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={filteredSrcs}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % filteredSrcs.length)
        }
        onPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + filteredSrcs.length) % filteredSrcs.length
          )
        }
      />
    </>
  )
}
