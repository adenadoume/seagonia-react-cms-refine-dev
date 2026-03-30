import CustomSections from '../components/shared/CustomSections'
import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'
import { usePageContent } from '../hooks/useSupabase'

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

export default function Experiences() {
  const { data: content } = usePageContent('experiences')
  const extra = content?.extra_content || {}

  const heroImage = content?.hero_image_url || HOTEL_IMAGES.sunsetDining
  const heroTitle = content?.hero_title || 'Activities'
  const heroSubtitle = content?.hero_subtitle || ''

  const wellnessEyebrow = extra.wellness_eyebrow || 'WELLNESS'
  const wellnessHeading = extra.wellness_heading || 'Outdoor Massage & PURE Spa'
  const wellnessBody = extra.wellness_body || `At Seagonia, relaxation is a key part of your stay. Unwind with a soothing outdoor massage in our specially designed, covered space for two, surrounded by nature. For a more complete experience, visit our nearby PURE spa, which features three dedicated rooms offering a variety of body and facial treatments, as well as personalized massages tailored to your needs.`
  const wellnessImage1 = extra.wellness_image_1 || HOTEL_IMAGES.massage
  const wellnessImage2 = extra.wellness_image_2 || HOTEL_IMAGES.pureSpa

  const fitnessEyebrow = extra.fitness_eyebrow || 'MOVEMENT'
  const fitnessHeading = extra.fitness_heading || 'Outdoor Shaded & Indoor Fitness'
  const fitnessBody = extra.fitness_body || `At Seagonia, we offer a peaceful outdoor shaded area designed for yoga practice, pilates and fitness, allowing you to connect with your body and mind in a natural, calming environment. Surrounded by greenery and fresh air, it's the perfect space to start your day with gentle movement or unwind with evening stretches. For those who are interested in a more vigorous form of exercise, our indoor gym is fully equipped with high-quality Technogym machines to support your training needs.`
  const fitnessImage1 = extra.fitness_image_1 || HOTEL_IMAGES.outdoorFitness
  const fitnessImage2 = extra.fitness_image_2 || HOTEL_IMAGES.yogaGroup
  const fitnessImage3 = extra.fitness_image_3 || HOTEL_IMAGES.gym

  const beachEyebrow = extra.beach_eyebrow || 'THE BEACH'
  const beachHeading = extra.beach_heading || 'Open Water Swimming'
  const beachBody = extra.beach_body || `Just 80 meters from the hotel, a stunning 500-meter-long sandy beach invites you to swim in the open Ionian Sea. With shallow, clear waters and a relaxed atmosphere, it's the perfect spot for swimming practice or a calming day by the beach. The prevailing winds are northwestern from the shore which create lake conditions to train and monitor your swimming performance.`
  const beachImage = extra.beach_image || HOTEL_IMAGES.openWaterSwim

  const boatingEyebrow = extra.boating_eyebrow || 'EXPLORE'
  const boatingHeading = extra.boating_heading || 'Explore the Ionian Islands by Boat'
  const boatingBody = extra.boating_body || `Seagonia Hotel can be the perfect starting point for a once-in-a-lifetime adventure with Ionian Escape. From the beach that is located just 80m from Seagonia, you can embark on an unforgettable boat trip to the nearby magical islands of Lefkada, Meganisi, Ithaki, Kalamos, Kastos, and Atokos. Their skilled skippers and top-quality boats will guide you through the Ionian Sea to some of the most breathtaking destinations. You'll have the chance to swim in crystal-clear waters and visit world-famous beaches like Egremni.`
  const boatingImage1 = extra.boating_image_1 || HOTEL_IMAGES.islandBeach
  const boatingImage2 = extra.boating_image_2 || HOTEL_IMAGES.islandVillage
  const boatingImage3 = extra.boating_image_3 || HOTEL_IMAGES.islandCoast
  const boatingImage4 = extra.boating_image_4 || HOTEL_IMAGES.vathiavali

  const hikingEyebrow = extra.hiking_eyebrow || 'ADVENTURE'
  const hikingHeading = extra.hiking_heading || 'History & Hiking'
  const hikingIntro = extra.hiking_intro || `Pogonia is a destination where you can fully embrace a perfect balance of culture, adventure, and relaxation. Whether you're exploring ancient sites, hiking through stunning landscapes, or indulging in rejuvenating spa treatments, there's something for everyone.`
  const hikingBullet1 = extra.hiking_bullet_1 || `Start your day with one of the organized hiking tours. You can hike to the archaeological site of Sterna, where breathtaking views of Lefkada, the Ionian Sea, and Preveza await.`
  const hikingBullet2 = extra.hiking_bullet_2 || `Immerse yourself in the region's rich archaeological history with a visit to Ancient Paleros. Explore the ancient ruins and learn about the area's fascinating past.`
  const hikingImage1 = extra.hiking_image_1 || HOTEL_IMAGES.hikingView
  const hikingImage2 = extra.hiking_image_2 || HOTEL_IMAGES.ancientRuins

  useSEO({
    title: extra.seo_title || 'Experiences',
    description: extra.seo_description || 'Explore unique experiences at Seagonia Hotel — wellness, fitness, open water swimming, boat trips, hiking and more on the Ionian coast of Greece.',
    ogImage: extra.seo_og_image,
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-navy/55" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-hero font-semibold text-white">
            {heroTitle}
          </h1>
          {heroSubtitle && <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">{heroSubtitle}</p>}
        </motion.div>
      </section>

      {/* Outdoor Massage & PURE Spa */}
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
                <img
                  src={wellnessImage1}
                  alt="Outdoor massage"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={wellnessImage2}
                  alt="PURE Spa interior"
                  className="w-full h-48 lg:h-56 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{wellnessEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {wellnessHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {wellnessBody}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fitness */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{fitnessEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {fitnessHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {fitnessBody}
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img
                  src={fitnessImage1}
                  alt="Outdoor shaded fitness pavilion"
                  className="w-full h-52 lg:h-60 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={fitnessImage2}
                    alt="Yoga group session"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={fitnessImage3}
                    alt="Indoor Technogym"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Water Swimming */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-4">{beachEyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              {beachHeading}
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg mb-10"
          >
            <img
              src={beachImage}
              alt="Open water swimming at the beach"
              className="w-full h-64 md:h-80 lg:h-[28rem] object-cover"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 text-lg leading-relaxed max-w-4xl mx-auto text-center"
          >
            {beachBody}
          </motion.p>
        </div>
      </section>

      {/* Boat Trips */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-4">{boatingEyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              {boatingHeading}
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 text-lg leading-relaxed max-w-4xl mx-auto text-center mb-12"
          >
            {boatingBody}
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { src: boatingImage1, alt: 'Island cliff beach' },
              { src: boatingImage2, alt: 'Island village' },
              { src: boatingImage3, alt: 'Dramatic coast with yacht' },
              { src: boatingImage4, alt: 'Vathiavali beach' },
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="overflow-hidden rounded-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History & Hiking */}
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
                <img
                  src={hikingImage1}
                  alt="Hiking mountain panoramic view"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={hikingImage2}
                  alt="Ancient ruins archaeological site"
                  className="w-full h-48 lg:h-56 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{hikingEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {hikingHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {hikingIntro}
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
                  <p className="text-charcoal/70 text-lg leading-relaxed">
                    {hikingBullet1}
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
                  <p className="text-charcoal/70 text-lg leading-relaxed">
                    {hikingBullet2}
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
