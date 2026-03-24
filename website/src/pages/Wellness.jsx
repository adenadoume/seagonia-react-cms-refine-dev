import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import { usePageContent } from '../hooks/useSupabase'
import CustomSections from '../components/shared/CustomSections'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Wellness() {
  const { data: content } = usePageContent('wellness')
  const extra = content?.extra_content || {}

  const heroImage = content?.hero_image_url || HOTEL_IMAGES.massage
  const heroTitle = content?.hero_title || 'Wellness'
  const heroSubtitle = content?.hero_subtitle || 'Restore Body & Mind'

  // Intro
  const introEyebrow = extra.intro_eyebrow || 'WELLNESS'
  const introHeading = extra.intro_heading || 'A Place to Restore'
  const introBody = extra.intro_body || `At Seagonia, relaxation and wellness are at the heart of the experience, with an outdoor spa area, a fully equipped indoor gym, and a peaceful yoga dome for rejuvenation. For an extra indulgence, a luxurious off-site spa just minutes from the hotel offers treatments that soothe the body and mind.`
  const introImage1 = extra.intro_image_1 || HOTEL_IMAGES.pureSpa
  const introImage2 = extra.intro_image_2 || HOTEL_IMAGES.massage
  const introImage3 = extra.intro_image_3 || HOTEL_IMAGES.facialTreatment

  // Massage
  const massageEyebrow = extra.massage_eyebrow || 'OUTDOOR SPA'
  const massageHeading = extra.massage_heading || 'Massage'
  const massageBody = extra.massage_body || `Experience ultimate relaxation with outdoor massages and treatments in a secluded space surrounded by nature at Seagonia Hotel. Gentle breezes and the peaceful natural setting create the perfect atmosphere to unwind and rejuvenate body and mind.`
  const massageImage1 = extra.massage_image_1 || HOTEL_IMAGES.massage
  const massageImage2 = extra.massage_image_2 || HOTEL_IMAGES.facialTreatment

  // Gym
  const gymEyebrow = extra.gym_eyebrow || 'FITNESS'
  const gymHeading = extra.gym_heading || 'Gym'
  const gymBody = extra.gym_body || `The hotel's indoor gym is fully equipped with Technogym equipment and weights, providing everything needed for a complete workout. Guests can maintain their fitness routine while enjoying the convenience of being right on the premises.`
  const gymImage1 = extra.gym_image_1 || HOTEL_IMAGES.gym
  const gymImage2 = extra.gym_image_2 || HOTEL_IMAGES.outdoorFitness

  // Yoga Dome
  const yogaEyebrow = extra.yoga_eyebrow || 'MINDFULNESS'
  const yogaHeading = extra.yoga_heading || 'Yoga Dome'
  const yogaBody = extra.yoga_body || `The serene yoga dome at Seagonia is available all day, offering a tranquil space for stretching, meditation, and mindful practice. It's an ideal spot to reconnect with yourself and embrace calmness during your stay.`
  const yogaImage = extra.yoga_image || HOTEL_IMAGES.yogaGroup

  // Pure Paleros Bay Spa
  const spaEyebrow = extra.spa_eyebrow || 'OFF-SITE'
  const spaHeading = extra.spa_heading || 'Pure Paleros Bay Spa'
  const spaBody = extra.spa_body || `For a truly indulgent experience, the offsite spa, just minutes from the hotel, offers a full range of treatments and wellness therapies. Guests can immerse themselves in luxury and leave feeling completely refreshed and revitalized.`
  const spaImage1 = extra.spa_image_1 || HOTEL_IMAGES.pureSpa
  const spaImage2 = extra.spa_image_2 || HOTEL_IMAGES.facialTreatment
  const spaImage3 = extra.spa_image_3 || HOTEL_IMAGES.massage

  useSEO({
    title: extra.seo_title || 'Wellness',
    description: extra.seo_description || 'Discover wellness at Seagonia Hotel — outdoor massage, Technogym fitness, yoga dome, and the Pure Paleros Bay Spa on the Ionian coast of Greece.',
    ogImage: extra.seo_og_image,
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[55vh] min-h-[420px] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-hero font-semibold">{heroTitle}</h1>
          {heroSubtitle && <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">{heroSubtitle}</p>}
        </motion.div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{introEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {introHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{introBody}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={introImage1} alt="Wellness at Seagonia" className="w-full h-64 object-cover" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={introImage2} alt="Massage treatment" className="w-full h-48 object-cover" />
                </motion.div>
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={introImage3} alt="Spa treatment" className="w-full h-48 object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Massage */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img src={massageImage1} alt="Massage therapy" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img src={massageImage2} alt="Spa treatment" className="w-full h-64 object-cover" />
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{massageEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {massageHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{massageBody}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gym */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{gymEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {gymHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{gymBody}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={gymImage1} alt="Indoor Technogym" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={gymImage2} alt="Outdoor fitness" className="w-full h-64 object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Yoga Dome */}
      <section className="section-padding bg-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-gold text-xs font-sans font-semibold uppercase tracking-eyebrow mb-4">{yogaEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-white leading-tight">
                {yogaHeading}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mt-6">{yogaBody}</p>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg"
            >
              <img src={yogaImage} alt="Yoga dome at Seagonia" className="w-full h-[420px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pure Paleros Bay Spa */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img src={spaImage1} alt="Pure Paleros Bay Spa" className="w-full h-64 object-cover" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                  <img src={spaImage2} alt="Spa treatment room" className="w-full h-48 object-cover" />
                </motion.div>
                <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                  <img src={spaImage3} alt="Wellness treatment" className="w-full h-48 object-cover" />
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{spaEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {spaHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{spaBody}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
