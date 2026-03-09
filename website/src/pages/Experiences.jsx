import { motion } from 'framer-motion'
import useSEO from '../hooks/useSEO'
import { HOTEL_IMAGES } from '../constants/hotel'
import SectionHeader from '../components/shared/SectionHeader'

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

const heroImages = [
  { src: HOTEL_IMAGES.sunsetDining, alt: 'Sunset dining' },
  { src: HOTEL_IMAGES.islandBeach, alt: 'Island beach' },
  { src: HOTEL_IMAGES.massage, alt: 'Outdoor massage' },
  { src: HOTEL_IMAGES.foodBurrata, alt: 'Burrata salad' },
  { src: HOTEL_IMAGES.yogaGroup, alt: 'Yoga group session' },
  { src: HOTEL_IMAGES.hikingView, alt: 'Hiking panoramic view' },
]

export default function Experiences() {
  useSEO({
    title: 'Experiences',
    description:
      'Explore unique experiences at Seagonia Hotel — wellness, fitness, open water swimming, boat trips, hiking and more on the Ionian coast of Greece.',
  })

  return (
    <>
      {/* Hero - Mosaic Grid */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          {heroImages.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-navy/55" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-hero font-semibold text-white">
            Experiences
          </h1>
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
                  src={HOTEL_IMAGES.massage}
                  alt="Outdoor massage"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.pureSpa}
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
              <p className="eyebrow mb-4">WELLNESS</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Outdoor Massage &amp; PURE Spa
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                At Seagonia, relaxation is a key part of your stay. Unwind with a
                soothing outdoor massage in our specially designed, covered space for
                two, surrounded by nature. For a more complete experience, visit our
                nearby PURE spa, which features three dedicated rooms offering a
                variety of body and facial treatments, as well as personalized
                massages tailored to your needs.
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
              <p className="eyebrow mb-4">MOVEMENT</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Outdoor Shaded &amp; Indoor Fitness
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                At Seagonia, we offer a peaceful outdoor shaded area designed for yoga
                practice, pilates and fitness, allowing you to connect with your body
                and mind in a natural, calming environment. Surrounded by greenery and
                fresh air, it&apos;s the perfect space to start your day with gentle
                movement or unwind with evening stretches. For those who are
                interested in a more vigorous form of exercise, our indoor gym is
                fully equipped with high-quality Technogym machines to support your
                training needs.
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
                  src={HOTEL_IMAGES.outdoorFitness}
                  alt="Outdoor shaded fitness pavilion"
                  className="w-full h-52 lg:h-60 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.yogaGroup}
                    alt="Yoga group session"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.gym}
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
            <p className="eyebrow mb-4">THE BEACH</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              Open Water Swimming
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
              src={HOTEL_IMAGES.openWaterSwim}
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
            Just 80 meters from the hotel, a stunning 500-meter-long sandy beach
            invites you to swim in the open Ionian Sea. With shallow, clear waters and
            a relaxed atmosphere, it&apos;s the perfect spot for swimming practice or
            a calming day by the beach. The prevailing winds are northwestern from the
            shore which create lake conditions to train and monitor your swimming
            performance.
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
            <p className="eyebrow mb-4">EXPLORE</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              Explore the Ionian Islands by Boat
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 text-lg leading-relaxed max-w-4xl mx-auto text-center mb-12"
          >
            Seagonia Hotel can be the perfect starting point for a once-in-a-lifetime
            adventure with Ionian Escape. From the beach that is located just 80m from
            Seagonia, you can embark on an unforgettable boat trip to the nearby
            magical islands of Lefkada, Meganisi, Ithaki, Kalamos, Kastos, and Atokos.
            Their skilled skippers and top-quality boats will guide you through the
            Ionian Sea to some of the most breathtaking destinations. You&apos;ll have
            the chance to swim in crystal-clear waters and visit world-famous beaches
            like Egremni.
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { src: HOTEL_IMAGES.islandBeach, alt: 'Island cliff beach' },
              { src: HOTEL_IMAGES.islandVillage, alt: 'Island village' },
              { src: HOTEL_IMAGES.islandCoast, alt: 'Dramatic coast with yacht' },
              { src: HOTEL_IMAGES.vathiavali, alt: 'Vathiavali beach' },
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
                  src={HOTEL_IMAGES.hikingView}
                  alt="Hiking mountain panoramic view"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.ancientRuins}
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
              <p className="eyebrow mb-4">ADVENTURE</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                History &amp; Hiking
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                Pogonia is a destination where you can fully embrace a perfect balance
                of culture, adventure, and relaxation. Whether you&apos;re exploring
                ancient sites, hiking through stunning landscapes, or indulging in
                rejuvenating spa treatments, there&apos;s something for everyone.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
                  <p className="text-charcoal/70 text-lg leading-relaxed">
                    Start your day with one of the organized hiking tours. You can
                    hike to the archaeological site of Sterna, where breathtaking
                    views of Lefkada, the Ionian Sea, and Preveza await.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
                  <p className="text-charcoal/70 text-lg leading-relaxed">
                    Immerse yourself in the region&apos;s rich archaeological history
                    with a visit to Ancient Paleros. Explore the ancient ruins and
                    learn about the area&apos;s fascinating past.
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
