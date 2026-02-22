import { motion } from 'framer-motion'
import { MapPin, Car, Ship, Plane, Navigation, ExternalLink } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL, PLACEHOLDER_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'

const distances = [
  { label: 'Beach', value: '80m walk' },
  { label: 'Paleros town', value: '3 km' },
  { label: 'Preveza / Aktion Airport (PVK)', value: '40 km (~40 min)' },
  { label: 'Lefkada', value: '30 km' },
  { label: 'Vathiavali Beach', value: '7 km' },
  { label: 'Varko Bay', value: 'Nearby' },
  { label: 'Gerakas', value: 'Boat only' },
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

const nearbyIslands = [
  'Lefkada',
  'Meganisi',
  'Kalamos',
  'Kastos',
  'Ithaca',
  'Kefalonia',
  'Skorpios',
]

export default function Location() {
  useSEO({
    title: 'Location & Getting Here',
    description:
      'Find Seagonia Hotel in Pogonia village near Paleros, Greece. Directions by car, ferry and flight, plus nearby beaches and islands.',
  })

  const mapsEmbedUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${HOTEL.location.coords.lat},${HOTEL.location.coords.lng}`

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] min-h-[320px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${PLACEHOLDER_IMAGES.ionian})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-stone/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Location & Getting Here
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-6 h-6 text-sea flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-stone">
                    {HOTEL.contact.address || 'Pogonia, Paleros 300 04, Greece'}
                  </p>
                  <p className="text-stone/60 text-sm mt-1">
                    {HOTEL.location.region}, {HOTEL.location.country}
                  </p>
                </div>
              </div>

              <p className="text-stone/70 leading-relaxed">
                Seagonia is nestled in the quiet village of Pogonia, just 3 km
                from the charming coastal town of Paleros. Situated on the
                western mainland of Greece, this corner of Aitoloakarnania looks
                out across the Ionian Sea towards Lefkada and the island
                archipelago beyond.
              </p>
              <p className="text-stone/70 leading-relaxed mt-4">
                The area is blessed with crystal-clear waters, a 500-metre sandy
                beach just 80 metres from the hotel, and easy access to some of
                the most beautiful islands in Greece. A car is the best way to
                explore the surrounding coastline, olive groves, and mountain
                villages.
              </p>

              {/* Distances */}
              <h3 className="font-serif text-xl text-stone mt-8 mb-4">
                Distances
              </h3>
              <div className="space-y-3">
                {distances.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between py-2 border-b border-stone/10"
                  >
                    <span className="text-stone/80 text-sm">{d.label}</span>
                    <span className="text-stone font-medium text-sm">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 mt-8"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </motion.div>

            {/* Right: Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg min-h-[400px]"
            >
              {mapsEmbedUrl ? (
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Seagonia Hotel location"
                />
              ) : (
                <div className="w-full h-full min-h-[400px] bg-sand/30 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-sea/40 mx-auto mb-3" />
                    <p className="text-stone/60">Map loading...</p>
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sea underline text-sm mt-2 inline-flex items-center gap-1"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Get Here */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="TRAVEL"
            title="How to Get Here"
            subtitle="Multiple ways to reach your corner by the sea."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {travelModes.map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-8 text-center"
              >
                <div className="w-14 h-14 bg-sea/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <mode.icon className="w-7 h-7 text-sea" />
                </div>
                <h3 className="font-serif text-xl text-stone mb-3">
                  {mode.title}
                </h3>
                <p className="text-stone/60 text-sm leading-relaxed">
                  {mode.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Islands */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="EXPLORE"
            title="Nearby Islands"
            subtitle="The Ionian archipelago is at your doorstep. Arrange day trips or island-hopping adventures through the hotel."
          />
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {nearbyIslands.map((island) => (
              <span
                key={island}
                className="bg-sea/10 text-sea font-medium px-6 py-3 rounded-full text-sm"
              >
                {island}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
