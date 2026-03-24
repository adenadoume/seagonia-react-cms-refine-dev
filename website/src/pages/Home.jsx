import CustomSections from '../components/shared/CustomSections'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Quote, ChevronDown } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import { useRooms, useTestimonials, usePageContent } from '../hooks/useSupabase'

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
  const { data: pageContent } = usePageContent('home')
  const { data: testimonials } = useTestimonials()
  const { data: allRooms } = useRooms()

  // Use page_content fields with fallbacks to static text
  const extra = pageContent?.extra_content || {}
  const heroTitle = pageContent?.hero_title || 'SEAGONIA'
  const heroSubtitle = pageContent?.hero_subtitle || 'Your Corner by the Sea'
  const heroImage = pageContent?.hero_image_url || HOTEL_IMAGES.hero
  const introEyebrow = extra.intro_eyebrow || 'Welcome'
  const introHeading = pageContent?.section_1_title || 'A Peaceful Retreat by the Ionian Sea'
  const introBody = pageContent?.section_1_text || 'Seagonia Hotel is a peaceful retreat set in a serene natural environment, offering everything you need for a comfortable and rejuvenating stay. Designed with a focus on simplicity and harmony, the spaces are thoughtfully decorated using natural materials and soothing earthy tones.'
  const introImage = pageContent?.section_1_image_url || HOTEL_IMAGES.entrance

  const accomEyebrow = extra.accommodation_eyebrow || 'Accommodation'
  const accomHeading = pageContent?.section_2_title || '58 Rooms by the Sea'

  const expEyebrow = extra.experiences_eyebrow || 'Experiences'
  const expHeading = pageContent?.section_3_title || 'Discover the Ionian'

  const diningEyebrow = extra.dining_eyebrow || 'Dining'
  const diningHeading = extra.dining_heading || 'Galià Rooftop Restaurant'
  const diningBody = extra.dining_body || 'Our Mediterranean restaurant set on the upper floor, open to sweeping views of the pool, Paleros bay, and the Acarnanian mountains.'

  const ctaHeading = extra.cta_heading || 'Plan Your Stay'
  const ctaSubheading = extra.cta_subheading || 'We would love to hear from you'

  const areaImage = extra.area_image || HOTEL_IMAGES.palerosBay
  const diningImage = extra.dining_image || HOTEL_IMAGES.galiaRooftop

  // Featured rooms — up to 3
  const featuredRooms = allRooms?.filter((r) => r.is_featured).slice(0, 3) || []

  // Experience grid — titles and images editable from admin
  const experienceGrid = [
    { title: extra.exp_1_title || 'Boat Trips', image: extra.exp_1_image || HOTEL_IMAGES.islandBeach },
    { title: extra.exp_2_title || 'Cooking Classes', image: extra.exp_2_image || HOTEL_IMAGES.cookingClass },
    { title: extra.exp_3_title || 'Yoga & Wellness', image: extra.exp_3_image || HOTEL_IMAGES.yogaGroup },
    { title: extra.exp_4_title || 'Spa & Massage', image: extra.exp_4_image || HOTEL_IMAGES.massage },
    { title: extra.exp_5_title || 'Hiking & History', image: extra.exp_5_image || HOTEL_IMAGES.hikingView },
    { title: extra.exp_6_title || 'Wine & Dining', image: extra.exp_6_image || HOTEL_IMAGES.sunsetDining },
  ]

  useSEO({
    title: extra.seo_title || 'Boutique Hotel in Paleros',
    description: extra.seo_description || 'Seagonia Hotel — Your Corner by the Sea. A boutique 58-room hotel in Pogonia village near Paleros, on the Ionian coast of Greece.',
    ogImage: extra.seo_og_image,
  })

  return (
    <>
      {/* ────────────────────────────────────────────
          SECTION 1 — Full-Screen Hero
          ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-display text-white tracking-wide sm:tracking-widest"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-xl font-light text-white/80 mt-4"
          >
            {heroSubtitle}
          </motion.p>

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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Eyebrow>{introEyebrow}</Eyebrow>
              <h2 className="font-serif text-heading text-navy mt-4 leading-tight">
                {introHeading}
              </h2>
              <p className="font-sans text-lg text-charcoal/70 leading-relaxed mt-6 max-w-xl">
                {introBody}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <img
                src={introImage}
                alt="Seagonia Hotel entrance"
                className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 3 — Location Teaser
          ──────────────────────────────────────────── */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{ backgroundImage: `url(${areaImage})` }}
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
            <Eyebrow>{accomEyebrow}</Eyebrow>
            <h2 className="font-serif text-heading text-navy mt-4">
              {accomHeading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {featuredRooms.map((room, i) => (
              <motion.div
                key={room.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-navy mt-5">
                  {room.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 mt-2">
                  {room.highlight}
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
            <Eyebrow>{expEyebrow}</Eyebrow>
            <h2 className="font-serif text-heading text-navy mt-4">
              {expHeading}
            </h2>
          </motion.div>

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
          style={{ backgroundImage: `url(${diningImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Eyebrow light>{diningEyebrow}</Eyebrow>
            <h2 className="font-serif text-heading text-white mt-4">
              {diningHeading}
            </h2>
            <p className="font-sans text-lg text-white/80 leading-relaxed mt-6 max-w-xl mx-auto">
              {diningBody}
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
          SECTION 7 — Testimonials (hidden, to be added later)
          ──────────────────────────────────────────── */}
      {false && <section className="bg-navy py-24 lg:py-36">
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
            {testimonials?.map((t, i) => (
              <motion.div
                key={t.id}
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
      </section>}

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
              {ctaHeading}
            </h2>
            <p className="font-sans text-lg text-charcoal/60 mt-4">
              {ctaSubheading}
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
      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
