import { motion } from 'framer-motion'
import { Car, Ship, Plane, Navigation } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL, HOTEL_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const nearbyIslands = [
  'Lefkada',
  'Meganisi',
  'Kalamos',
  'Kastos',
  'Ithaca',
  'Kefalonia',
  'Skorpios',
]

const travelModes = [
  {
    icon: Car,
    title: 'By Car',
    description:
      'A car is recommended for exploring the area. Drive south from Preveza along the coastal road through Vonitsa and Paleros. Ample free parking is available on-site at the hotel.',
  },
  {
    icon: Ship,
    title: 'By Ferry',
    description:
      'Regular ferry connections run from Lefkada (Nidri) to Paleros. A scenic route across the Ionian Sea, arriving in Paleros harbour just 3 km from the hotel.',
  },
  {
    icon: Plane,
    title: 'By Flight',
    description:
      'Fly into Preveza / Aktion Airport (PVK), served by seasonal and charter flights from across Europe. The airport is approximately 40 km from Seagonia, around a 40-minute drive.',
  },
]

const distances = [
  { label: 'Beach', value: '80m' },
  { label: 'Paleros', value: '3km' },
  { label: 'Airport (PVK)', value: '40km' },
  { label: 'Lefkada', value: '30km' },
  { label: 'Vathiavali', value: '7km' },
]

const nearbyBeaches = [
  {
    name: 'Vathiavali',
    image: HOTEL_IMAGES.vathiavali,
    description:
      'Crystal-clear turquoise waters and a peaceful, unspoiled sandy beach just 7km from the hotel.',
  },
  {
    name: 'Varko Bay',
    image: HOTEL_IMAGES.varkoBay,
    description:
      'A sheltered bay perfect for swimming and snorkeling in calm, turquoise seas.',
  },
  {
    name: 'Gerakas',
    image: HOTEL_IMAGES.gerakas,
    description:
      'A hidden gem accessible only by boat, promising total seclusion and breathtaking natural beauty.',
  },
]

export default function Area() {
  useSEO({
    title: 'The Area',
    description:
      'Discover the area around Seagonia Hotel in Pogonia, near Paleros. Explore the Ionian islands, nearby beaches, and how to get here.',
  })

  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${HOTEL.location.coords.lat},${HOTEL.location.coords.lng}`

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HOTEL_IMAGES.palerosBay})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl"
          >
            The Area
          </motion.h1>
        </div>
      </section>

      {/* The Area */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-3">Location</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                The Area
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-lg">
                Seagonia Hotel boasts a prime location in the serene village of
                Pogonia, surrounded by lush greenery and nestled beside the
                crystal-clear waters of the Ionian Sea. Just a short distance
                from the charming seaside town of Paleros, it offers the perfect
                blend of natural beauty and local charm for a peaceful and scenic
                getaway.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-sm"
            >
              <img
                src={HOTEL_IMAGES.pogoniaCoast}
                alt="Pogonia coastline aerial view"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Little Ionian */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-sm order-2 lg:order-1"
            >
              <img
                src={HOTEL_IMAGES.littleIonian}
                alt="The Little Ionian islands aerial"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow mb-3">Explore</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                The Little Ionian
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                The Hotel sits beside the stunning Ionian Sea, known for its
                turquoise waters and stunning islands. From Lefkada and Ithaca to
                Meganisi, Kefalonia, Skorpios, and Kalamos, guests are perfectly
                positioned to explore some of the world&apos;s most famous
                beaches and island gems.
              </p>
              <div className="flex flex-wrap gap-3">
                {nearbyIslands.map((island) => (
                  <span
                    key={island}
                    className="bg-gold/10 text-gold-dark font-sans font-medium px-5 py-2 rounded-full text-sm tracking-wide"
                  >
                    {island}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pogonia */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="VILLAGE"
            title="Pogonia"
            subtitle="The picturesque seaside village, overlooking the beautiful bay of Paleros"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-sm"
          >
            <img
              src={HOTEL_IMAGES.pogoniaPanorama}
              alt="Pogonia bay panoramic view"
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { src: HOTEL_IMAGES.pogoniaVillage, alt: 'Pogonia village from above' },
              { src: HOTEL_IMAGES.pogoniaBeach, alt: 'Pogonia beach with sunbeds' },
              { src: HOTEL_IMAGES.tavernaView, alt: 'Taverna with sea view' },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[220px] md:h-[260px] object-cover"
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 leading-relaxed text-lg text-center max-w-3xl mx-auto mt-10"
          >
            Pogonia, the picturesque seaside village, overlooking the beautiful
            bay of Paleros, with views of Lefkada and the Acarnanian mountains
            offers an idyllic setting for relaxing walks and tranquil summer
            escapes.
          </motion.p>
        </div>
      </section>

      {/* Paleros */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-sm"
            >
              <img
                src={HOTEL_IMAGES.palerosHarbor}
                alt="Paleros harbor aerial view"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-3">Nearby Town</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                Paleros
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                Paleros is a charming coastal town nestled along the Ionian Sea
                in western Greece, known for its crystal-clear waters, golden
                beaches, and stunning views of nearby islands. With its relaxed
                atmosphere, traditional tavernas, and scenic harbor, Paleros
                offers a perfect blend of natural beauty and authentic Greek
                hospitality.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={HOTEL_IMAGES.palerosPromenade}
                    alt="Paleros promenade with tavernas"
                    className="w-full h-[180px] object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={HOTEL_IMAGES.palerosWineDining}
                    alt="Dining at Paleros harbor"
                    className="w-full h-[180px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nearby Beaches */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="BEACHES"
            title="The Nearby Area"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {nearbyBeaches.map((beach, i) => (
              <motion.div
                key={beach.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-charcoal mt-5 mb-2">
                  {beach.name}
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  {beach.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 leading-relaxed text-lg text-center max-w-4xl mx-auto mt-14"
          >
            Just 7 kilometers from the hotel, Vathiavali Beach offers
            crystal-clear waters and a peaceful, unspoiled setting. Nearby,
            Varko Bay is perfect for swimming and snorkeling in calm turquoise
            seas. For a hidden gem, Gerakas Beach — accessible only by boat —
            promises total seclusion and breathtaking natural beauty.
          </motion.p>
        </div>
      </section>

      {/* Getting Here */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="TRAVEL"
            title="How to Get Here"
            subtitle="Multiple ways to reach your corner by the sea."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {travelModes.map((mode, i) => (
              <motion.div
                key={mode.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white p-10 text-center"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <mode.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-4">
                  {mode.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  {mode.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Get Directions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </motion.div>

          {/* Distances Table */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-16"
          >
            <h3 className="font-serif text-2xl text-charcoal text-center mb-8">
              Distances
            </h3>
            <div className="bg-white p-8">
              {distances.map((d, i) => (
                <div
                  key={d.label}
                  className={`flex items-center justify-between py-4 ${
                    i < distances.length - 1 ? 'border-b border-charcoal/10' : ''
                  }`}
                >
                  <span className="text-charcoal/70 font-sans">{d.label}</span>
                  <span className="text-charcoal font-serif text-xl font-semibold">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
