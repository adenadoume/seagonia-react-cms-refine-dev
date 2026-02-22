import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bed,
  Waves,
  UtensilsCrossed,
  Footprints,
  Dumbbell,
  Heart,
  Flower2,
  Tv,
} from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL, HOTEL_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const glanceStats = [
  { value: 58, suffix: '', label: 'Rooms' },
  { value: 4, suffix: '', label: 'Pools' },
  { value: 3, suffix: '', label: 'Dining Venues' },
  { value: 500, suffix: 'm', label: 'Beach' },
]

const facilities = [
  {
    category: 'Accommodation',
    icon: Bed,
    items: ['58 beautifully appointed rooms across 6 room types'],
  },
  {
    category: 'Pools',
    icon: Waves,
    items: [
      '1 central heated pool',
      '3 swim-up pools with direct room access',
    ],
  },
  {
    category: 'Food & Beverage',
    icon: UtensilsCrossed,
    items: [
      'Seagonia Lounge — breakfast buffet & Mediterranean lunch',
      'All-day pool bar — drinks & light snacks',
      'Galia Rooftop restaurant — Mediterranean fine dining',
    ],
  },
  {
    category: 'Activities & Wellness',
    icon: Dumbbell,
    items: [
      'Gym with Technogym equipment',
      'Outdoor shaded fitness area',
      'Outdoor massage space for two',
      'Multipurpose room (sitting area, cinema, yoga)',
    ],
  },
]

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold font-semibold">
      {count}
      {suffix}
    </span>
  )
}

export default function Hotel() {
  useSEO({
    title: 'The Hotel',
    description:
      'Discover Seagonia Hotel — 58 rooms, 4 pools, rooftop dining, Technogym fitness, and a 500m beach just 80 metres away. A peaceful retreat on the Ionian coast.',
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HOTEL_IMAGES.entrance})`,
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
            The Hotel
          </motion.h1>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-3">Welcome</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                About {HOTEL.name}
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-lg">
                Seagonia Hotel is a peaceful retreat set in a serene natural
                environment, offering everything you need for a comfortable and
                rejuvenating stay. Designed with a focus on simplicity and
                harmony, the spaces are thoughtfully decorated using natural
                materials and soothing earthy tones.
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
                src={HOTEL_IMAGES.hotelInPogonia}
                alt="Seagonia Hotel in Pogonia from distance"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="OVERVIEW" title="At a Glance" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            {glanceStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="font-sans text-charcoal/60 text-sm uppercase tracking-wider mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="FACILITIES" title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            {facilities.map((facility, i) => (
              <motion.div
                key={facility.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <facility.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal">
                    {facility.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {facility.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-charcoal/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pool & Multipurpose Room */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-sm"
          >
            <img
              src={HOTEL_IMAGES.poolArea}
              alt="Seagonia pool area with trailing plants"
              className="w-full h-[350px] md:h-[500px] object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Pool & Multipurpose Room
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              Throughout the day, you can unwind by the pool, enjoying fresh
              coffee, juices, drinks, and light snacks in a serene atmosphere.
              Just across from the pool, you&apos;ll find a versatile
              multipurpose room. This thoughtfully designed space can be used as
              a cozy sitting lounge, a private cinema room for movie nights, or a
              peaceful indoor studio for yoga and wellness practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aerial Views */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="FROM ABOVE" title="Aerial Views" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {[
              { src: HOTEL_IMAGES.hotelAerialBeach, alt: 'Aerial view of beach area' },
              { src: HOTEL_IMAGES.hotelBirdseye, alt: 'Bird\'s eye view of hotel' },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="overflow-hidden rounded-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </motion.div>
            ))}
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/60 text-center text-lg mt-8 font-serif italic"
          >
            80 metres from the beach, surrounded by nature
          </motion.p>
        </div>
      </section>
    </>
  )
}
