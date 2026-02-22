import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Quote, ChevronDown } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES, HOTEL, EXPERIENCES } from '../constants/hotel'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

/* ─── Data ─── */
const testimonials = [
  {
    quote:
      'Waking up to the sound of the Ionian Sea just steps from our room was pure magic.',
    name: 'Sophie & Laurent',
    country: 'France',
  },
  {
    quote:
      "Paleros is one of Greece's best-kept secrets, and Seagonia is the perfect base.",
    name: 'James W.',
    country: 'United Kingdom',
  },
  {
    quote:
      'The farm-to-table breakfast, the boat trips, the sunsets — everything was unforgettable.',
    name: 'Anna & Markus',
    country: 'Germany',
  },
]

const featuredRooms = [
  {
    name: 'Swim-Up Room',
    image: HOTEL_IMAGES.roomSwimUp,
    description: 'Step from your room directly into the pool',
    slug: 'swim-up-room',
  },
  {
    name: 'Balcony Room',
    image: HOTEL_IMAGES.roomBalcony,
    description: 'Panoramic views of the Ionian Sea',
    slug: 'balcony-room',
  },
  {
    name: 'Seagonia Suite',
    image: HOTEL_IMAGES.entrance,
    description: 'The pinnacle of Seagonia hospitality',
    slug: 'seagonia-suite',
  },
]

const experienceGrid = [
  { title: 'Boat Trips', image: HOTEL_IMAGES.islandBeach },
  { title: 'Cooking Classes', image: HOTEL_IMAGES.cookingClass },
  { title: 'Yoga & Wellness', image: HOTEL_IMAGES.yogaGroup },
  { title: 'Spa & Massage', image: HOTEL_IMAGES.massage },
  { title: 'Hiking & History', image: HOTEL_IMAGES.hikingView },
  { title: 'Wine & Dining', image: HOTEL_IMAGES.sunsetDining },
]

const locationStats = [
  { value: '80m', label: 'To the Beach' },
  { value: '3km', label: 'To Paleros' },
  { value: '7', label: 'Ionian Islands' },
]

/* ─── Reusable Eyebrow ─── */
function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-block text-xs font-sans font-semibold uppercase tracking-eyebrow ${
        light ? 'text-gold-light' : 'text-gold'
      }`}
    >
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  useSEO({
    title: 'Boutique Hotel in Paleros',
    description:
      'Seagonia Hotel — Your Corner by the Sea. A boutique 58-room hotel in Pogonia village near Paleros, on the Ionian coast of Greece.',
  })

  return (
    <>
      {/* ────────────────────────────────────────────
          SECTION 1 — Full-Screen Hero
          ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HOTEL_IMAGES.hero})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-display text-white tracking-wide sm:tracking-widest"
          >
            SEAGONIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-xl font-light text-white/80 mt-4"
          >
            Your Corner by the Sea
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-8 h-8 text-white/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 2 — Introduction
          ──────────────────────────────────────────── */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Text — 60% */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Eyebrow>Welcome</Eyebrow>
              <h2 className="font-serif text-heading text-navy mt-4 leading-tight">
                A Peaceful Retreat by the Ionian Sea
              </h2>
              <p className="font-sans text-lg text-charcoal/70 leading-relaxed mt-6 max-w-xl">
                Seagonia Hotel is a peaceful retreat set in a serene natural
                environment, offering everything you need for a comfortable and
                rejuvenating stay. Designed with a focus on simplicity and
                harmony, the spaces are thoughtfully decorated using natural
                materials and soothing earthy tones.
              </p>
            </motion.div>

            {/* Image — 40% */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <img
                src={HOTEL_IMAGES.entrance}
                alt="Seagonia Hotel entrance"
                className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 3 — Location Teaser (Parallax)
          ──────────────────────────────────────────── */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{ backgroundImage: `url(${HOTEL_IMAGES.palerosBay})` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Eyebrow light>The Area</Eyebrow>
            <h2 className="font-serif text-heading text-white mt-4">
              Pogonia, Paleros &amp; The Little Ionian
            </h2>

            {/* Counters */}
            <div className="flex flex-wrap justify-center gap-10 lg:gap-20 mt-10">
              {locationStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-sub text-white">{stat.value}</p>
                  <p className="font-sans text-sm text-white/70 mt-1 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/area"
              className="inline-block mt-10 font-sans text-sm font-medium text-gold-light tracking-wide hover:text-white transition-colors"
            >
              Explore the Area &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 4 — Rooms Preview
          ──────────────────────────────────────────── */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Eyebrow>Accommodation</Eyebrow>
            <h2 className="font-serif text-heading text-navy mt-4">
              58 Rooms by the Sea
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {featuredRooms.map((room, i) => (
              <motion.div
                key={room.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-navy mt-5">
                  {room.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 mt-2">
                  {room.description}
                </p>
                <Link
                  to={`/rooms/${room.slug}`}
                  className="inline-block mt-3 font-sans text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                >
                  Discover &rarr;
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link
              to="/rooms"
              className="inline-block px-8 py-3 border border-navy text-navy font-sans text-sm font-medium tracking-wide rounded-full hover:bg-navy hover:text-white transition-all duration-300"
            >
              View All Rooms
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 5 — Experiences Grid
          ──────────────────────────────────────────── */}
      <section className="bg-ivory py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Eyebrow>Experiences</Eyebrow>
            <h2 className="font-serif text-heading text-navy mt-4">
              Discover the Ionian
            </h2>
          </motion.div>

          {/* 2x3 masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {experienceGrid.map((exp, i) => (
              <motion.div
                key={exp.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  i % 3 === 1 ? 'row-span-1 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-500 flex items-center justify-center">
                  <span className="font-serif text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-4">
                    {exp.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link
              to="/experiences"
              className="inline-block px-8 py-3 border border-navy text-navy font-sans text-sm font-medium tracking-wide rounded-full hover:bg-navy hover:text-white transition-all duration-300"
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 6 — Dining Teaser
          ──────────────────────────────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HOTEL_IMAGES.galiaRooftop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Eyebrow light>Dining</Eyebrow>
            <h2 className="font-serif text-heading text-white mt-4">
              Gali&agrave; Rooftop Restaurant
            </h2>
            <p className="font-sans text-lg text-white/80 leading-relaxed mt-6 max-w-xl mx-auto">
              Our Mediterranean restaurant set on the upper floor, open to
              sweeping views of the pool, Paleros bay, and the Acarnanian
              mountains.
            </p>
            <Link
              to="/dining"
              className="inline-block mt-8 font-sans text-sm font-medium text-gold-light tracking-wide hover:text-white transition-colors"
            >
              Explore Dining &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 7 — Testimonials
          ──────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-heading text-white">
              What Our Guests Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-navy-light rounded-2xl p-8"
              >
                <Quote className="w-8 h-8 text-gold mb-5" />
                <p className="font-sans text-white/90 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="font-sans font-medium text-gold">{t.name}</p>
                  <p className="font-sans text-white/50 text-sm mt-1">
                    {t.country}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 8 — Contact CTA
          ──────────────────────────────────────────── */}
      <section className="bg-cream py-24 lg:py-36">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-heading text-navy">
              Plan Your Stay
            </h2>
            <p className="font-sans text-lg text-charcoal/60 mt-4">
              We would love to hear from you
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to="/contact"
                className="inline-block px-8 py-3 border border-navy text-navy font-sans text-sm font-medium tracking-wide rounded-full hover:bg-navy hover:text-white transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                to="/book"
                className="inline-block px-8 py-3 bg-gold text-white font-sans text-sm font-medium tracking-wide rounded-full hover:bg-gold-dark transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
