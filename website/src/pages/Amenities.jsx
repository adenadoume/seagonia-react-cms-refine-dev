import { motion } from 'framer-motion'
import {
  Waves,
  Umbrella,
  UtensilsCrossed,
  Coffee,
  Wine,
  Dumbbell,
  Heart,
  Flower2,
  Ship,
  ChefHat,
  Bug,
  ParkingCircle,
  Wifi,
  Leaf,
  Sparkles,
} from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { AMENITIES, EXPERIENCES, PLACEHOLDER_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'

const iconMap = {
  Waves,
  Umbrella,
  UtensilsCrossed,
  Coffee,
  Wine,
  Dumbbell,
  Heart,
  Flower2,
  Ship,
  ChefHat,
  Bug,
  ParkingCircle,
  Wifi,
  Leaf,
  Sparkles,
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
}

const fbVenues = [
  {
    name: 'Galia Restaurant',
    description:
      'Our rooftop Mediterranean restaurant offers sweeping views of the Ionian Sea. Enjoy locally inspired dishes crafted from the freshest seasonal ingredients, many sourced directly from our own farm.',
    image: PLACEHOLDER_IMAGES.restaurant,
  },
  {
    name: 'Seagonia Lounge',
    description:
      'Start your day with a generous breakfast buffet featuring homemade pastries, local cheeses, honey from our beehives, and fresh fruit. Return for a relaxed Mediterranean lunch with light bites and salads.',
    image: PLACEHOLDER_IMAGES.breakfast,
  },
  {
    name: 'Pool Bar',
    description:
      'Sip handcrafted cocktails, chilled wines, and refreshing juices poolside throughout the day. Our pool bar serves light snacks and seasonal treats from morning until sunset.',
    image: PLACEHOLDER_IMAGES.pool,
  },
]

export default function Amenities() {
  useSEO({
    title: 'Amenities & Experiences',
    description:
      'Discover the amenities and experiences at Seagonia Hotel — pool, beach, dining, wellness, boat trips, cooking classes and more on the Ionian coast.',
  })

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] min-h-[320px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${PLACEHOLDER_IMAGES.pool})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-stone/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Hotel Amenities & Experiences
          </h1>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="AMENITIES"
            title="Everything You Need"
            subtitle="From pool to spa, farm to table, every comfort is within reach."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {AMENITIES.map((amenity, i) => {
              const IconComponent = iconMap[amenity.icon]
              return (
                <motion.div
                  key={amenity.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-sea mb-3" />
                  )}
                  <h3 className="font-serif text-lg text-stone">
                    {amenity.name}
                  </h3>
                  <p className="text-stone/60 text-sm mt-1">
                    {amenity.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="EXPERIENCES"
            title="Curated Adventures"
            subtitle="Create lasting memories with unique experiences on the Ionian coast."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {EXPERIENCES.map((exp, i) => {
              const IconComponent = iconMap[exp.icon]
              return (
                <motion.div
                  key={exp.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card overflow-hidden"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={PLACEHOLDER_IMAGES[exp.image]}
                      alt={exp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-sea" />
                      )}
                      <h3 className="font-serif text-xl text-stone">
                        {exp.name}
                      </h3>
                    </div>
                    <p className="text-stone/60 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Food & Beverage */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="DINING"
            title="Food & Beverage"
            subtitle="Three distinct venues, one exceptional culinary philosophy."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {fbVenues.map((venue, i) => (
              <motion.div
                key={venue.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-stone">
                    {venue.name}
                  </h3>
                  <p className="text-stone/60 text-sm mt-2 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm to Table */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans font-medium text-sm uppercase tracking-[0.2em] text-sea">
                FROM OUR LAND
              </p>
              <div className="w-12 h-0.5 bg-sand mt-2" />
              <h2 className="font-serif text-3xl md:text-4xl text-stone mt-3">
                Farm to Table
              </h2>
              <p className="text-stone/70 text-lg leading-relaxed mt-4">
                At Seagonia, we believe the best food begins closest to the
                earth. Our own farm supplies the hotel&apos;s kitchens with
                seasonal vegetables, aromatic herbs, fresh eggs, and golden honey
                harvested from our beehives.
              </p>
              <p className="text-stone/70 text-lg leading-relaxed mt-4">
                Guests are welcome to visit the farm, join a cooking class using
                freshly picked ingredients, or simply enjoy the flavours that
                only truly local produce can deliver. Every meal at Seagonia
                tells the story of this land.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={PLACEHOLDER_IMAGES.cooking}
                alt="Farm to table experience"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
