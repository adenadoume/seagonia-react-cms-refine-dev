import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { usePageContent } from '../hooks/useSupabase'
import CustomSections from '../components/shared/CustomSections'

const IE = '/images/ionian'

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

export default function IonianEscape() {
  const { data: content } = usePageContent('ionian-escape')
  const extra = content?.extra_content || {}

  const heroImage = content?.hero_image_url || `${IE}/ie-coast-aerial.jpg`
  const heroTitle = content?.hero_title || 'Ionian Escape'
  const heroSubtitle = content?.hero_subtitle || 'Explore the Ionian Sea by Boat'

  // Intro section
  const introBody = extra.intro_body || `Seagonia Hotel can be the perfect starting point for a once-in-a-lifetime adventure with Ionian Escape. From the beach that is located just 80m from Seagonia, you can embark on an unforgettable boat trip to the nearby magical islands of Lefkada, Meganisi, Ithaki, Kalamos, Kastos, and Atokos. Their skilled skippers and the three top-quality boats will guide you through the Ionian Sea to some of the most breathtaking destinations. You'll have the chance to swim in crystal-clear waters and visit world-famous beaches. Apart from refreshing swims and scenic landscapes, you will indulge in fresh, local cuisine at seaside restaurants, where you can enjoy a delicious lunch while overlooking the pristine waters.`
  const introImage1 = extra.intro_image_1 || `${IE}/ie-coast-aerial.jpg`
  const introImage2 = extra.intro_image_2 || `${IE}/ie-beach-1.jpg`
  const introImage3 = extra.intro_image_3 || `${IE}/ie-crystal-water.jpg`

  // Tulio Abbate
  const tulioEyebrow = extra.tulio_eyebrow || 'OUR FLEET'
  const tulioHeading = extra.tulio_heading || 'Tulio Abbate'
  const tulioBody = extra.tulio_body || `A very spacious boat with a good sized wrap around sofa provides the perfect setting for seeing the amazing and colourful small Ionian Islands. The Tullio Abbate 42 offers a large big teak swimming platform for sunbathing, and a large bimini sunshade for shade from the midday sun.`
  const tulioImage1 = extra.tulio_image_1 || `${IE}/ie-tulio-above.jpg`
  const tulioImage2 = extra.tulio_image_2 || `${IE}/ie-tulio-speeding.jpg`
  const tulioImage3 = extra.tulio_image_3 || `${IE}/ie-tulio-cliff.jpg`

  // The Ribco
  const ribcoEyebrow = extra.ribco_eyebrow || 'OUR FLEET'
  const ribcoHeading = extra.ribco_heading || 'The Ribco'
  const ribcoBody = extra.ribco_body || `The RIBCO boat is the perfect choice for a comfortable and stylish day at sea, accommodating up to 8 people with ease. Equipped with amenities such as a toilet, shower, and spacious seating, it offers both convenience and luxury for exploring the Ionian waters.`
  const ribcoImage1 = extra.ribco_image_1 || `${IE}/ie-ribco-front.jpg`
  const ribcoImage2 = extra.ribco_image_2 || `${IE}/ie-ribco-above.jpg`

  // Scorpion Rib
  const scorpionEyebrow = extra.scorpion_eyebrow || 'OUR FLEET'
  const scorpionHeading = extra.scorpion_heading || 'The Scorpion Rib'
  const scorpionBody = extra.scorpion_body || `Scorpion has refined the RIB into the perfect blend of form and function; its elegant look and luxurious comfort, combined with their rugged, all-weather capabilities and safety, makes it the undisputed first choice of all boating enthusiasts around the world.`
  const scorpionImage1 = extra.scorpion_image_1 || `${IE}/ie-scorpion-speed.jpg`
  const scorpionImage2 = extra.scorpion_image_2 || `${IE}/ie-scorpion-side.jpg`

  // Destinations
  const destEyebrow = extra.destinations_eyebrow || 'EXPLORE'
  const destHeading = extra.destinations_heading || 'The Destinations'
  const destBody = extra.destinations_body || `With Ionian Escape boats, you can explore the most magical spots of the Ionian Sea, from Lefkada and the world-famous beaches of Egremni and Porto Katsiki to the mythical Ithaca, Astos, the island of the tycoon Onasis, Atokos, Meganissi, Kalamos, and countless charming small islands. Discover crystal-clear waters, picturesque harbors, and beautiful beaches, perfect for swimming, sightseeing, and enjoying a leisurely lunch by the sea.`
  const destImage1 = extra.destinations_image_1 || `${IE}/ie-dest-egremni.jpg`
  const destImage2 = extra.destinations_image_2 || `${IE}/ie-dest-taverna.jpg`
  const destImage3 = extra.destinations_image_3 || `${IE}/ie-dest-village.jpg`
  const destImage4 = extra.destinations_image_4 || `${IE}/ie-dest-bay-aerial.jpg`
  const destImage5 = extra.destinations_image_5 || `${IE}/ie-dest-beach-aerial.jpg`
  const destImage6 = extra.destinations_image_6 || `${IE}/ie-boat-wake.jpg`

  useSEO({
    title: extra.seo_title || 'Ionian Escape',
    description: extra.seo_description || 'Explore the Ionian Sea with Ionian Escape boat trips from Seagonia Hotel — discover Lefkada, Meganisi, Ithaki, and more magical islands.',
    ogImage: extra.seo_og_image,
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[55vh] min-h-[420px] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-navy/50" />
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
              className="lg:sticky lg:top-32"
            >
              <p className="text-charcoal/70 text-lg leading-relaxed">{introBody}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={introImage1} alt="Ionian island coast" className="w-full h-72 object-cover" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={introImage2} alt="Beach" className="w-full h-48 object-cover" />
                </motion.div>
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={introImage3} alt="Crystal clear water" className="w-full h-48 object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tulio Abbate */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{tulioEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {tulioHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{tulioBody}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={tulioImage1} alt="Tulio Abbate boat" className="w-full h-64 object-cover" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={tulioImage2} alt="Boat at sea" className="w-full h-48 object-cover" />
                </motion.div>
                <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                  <img src={tulioImage3} alt="Ionian island" className="w-full h-48 object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Ribco */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 order-last lg:order-first"
            >
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img src={ribcoImage1} alt="Ribco boat" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img src={ribcoImage2} alt="Ribco at sea" className="w-full h-64 object-cover" />
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{ribcoEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {ribcoHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{ribcoBody}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Scorpion Rib */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{scorpionEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {scorpionHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">{scorpionBody}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={scorpionImage1} alt="Scorpion Rib boat" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={scorpionImage2} alt="Scorpion Rib at speed" className="w-full h-64 object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Destinations */}
      <section className="section-padding bg-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-sans font-semibold uppercase tracking-eyebrow mb-4">{destEyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-white leading-tight">
              {destHeading}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">{destBody}</p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[destImage1, destImage2, destImage3, destImage4, destImage5, destImage6].map((src, i) => (
              <motion.div key={i} variants={fadeUp} className="overflow-hidden rounded-lg aspect-[4/3]">
                <img src={src} alt={`Destination ${i + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
