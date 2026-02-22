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

export default function Dining() {
  useSEO({
    title: 'Dining',
    description:
      'Discover the dining experiences at Seagonia Hotel — from Galia rooftop restaurant to farm-to-table cuisine, cooking classes, and beekeeping on the Ionian coast.',
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HOTEL_IMAGES.galiaRooftop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-hero font-semibold">
            Dining
          </h1>
        </motion.div>
      </section>

      {/* Galia Rooftop Restaurant */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">ROOFTOP DINING</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Gali&agrave; Restaurant
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                Gali&agrave; is our mediterranean restaurant set on the upper floor of the
                hotel, open to sweeping views of the pool, Paleros bay, and the
                Acarnanian mountains. The space is bathed in natural light during the
                day and glows softly in the evening as the sun sets over the water.
                The menu draws inspiration from the coasts of the Mediterranean,
                offering fresh, seasonal dishes that highlight local produce and
                mediterranean flavors.
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
                  src={HOTEL_IMAGES.galiaRooftop}
                  alt="Galia rooftop restaurant"
                  className="w-full h-72 lg:h-80 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.galiaView}
                    alt="View from Galia restaurant"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.shrimpPasta}
                    alt="Mediterranean cuisine"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seagonia Lounge */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 order-2 lg:order-1"
            >
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.loungeAerial}
                  alt="Seagonia Lounge aerial view"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.cheesePlatter}
                  alt="Cheese and bread platter"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.shrimpPasta}
                  alt="Shrimp orzo pasta"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.cocktail}
                  alt="Signature cocktail"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow mb-4">ALL-DAY DINING</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Seagonia Lounge
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                Our Seagonia Lounge is the perfect daytime retreat, offering an
                abundant breakfast buffet followed by a delightful Mediterranean lunch
                and a selection of light snacks. The Pool Bar, open all day, serves
                specialty coffee, nourishing smoothies made with farm-fresh fruits and
                vegetables, protein-rich blends, and healthy treats entirely free of
                gluten and refined sugar. In the afternoon and into the evening, enjoy
                a curated wine list, refreshing cocktails, savory snacks, and generous
                platters for two.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farm to Table */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="columns-2 gap-4 space-y-4"
            >
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={HOTEL_IMAGES.farmLettuce}
                  alt="Fresh lettuce from our farm"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={HOTEL_IMAGES.farmFlowers}
                  alt="Zucchini flowers harvest"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={HOTEL_IMAGES.farmTractor}
                  alt="Farm with tractor"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={HOTEL_IMAGES.farmField}
                  alt="Farm field panoramic"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">FROM OUR LAND</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Farm to Table
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                Food is at the heart of everything we do &mdash; it nourishes,
                connects, and reflects who we are. At Seagonia Hotel, we&apos;re
                deeply committed to offering our guests the very best, without ever
                losing touch with our roots. That&apos;s why we&apos;ve established
                our own farm in the region, where we grow a variety of vegetables,
                herbs, fruits, and raise our own poultry and eggs. This farm-to-table
                approach allows us to supply our restaurants &mdash; both within the
                hotel and across the area &mdash; with the freshest, most authentic
                ingredients possible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Yacht Club */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">PALEROS HARBOUR</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Yacht Club
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                For an authentic greek culinary experience we highly recommend Yacht
                Club which is located at the port of Paleros. The Yacht Club fuses
                organic vegetables from its farm, local ingredients and PDO products
                of the area, to create mouthwatering traditional dishes in a
                sophisticated environment.
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
                  src={HOTEL_IMAGES.outdoorDining}
                  alt="Yacht Club outdoor dining"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.sunsetDining}
                    alt="Sunset dining at the harbour"
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.foodSteak}
                    alt="Grilled steak"
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.foodDolmades}
                    alt="Dolmades"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.foodPide}
                    alt="Pide flatbread"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={HOTEL_IMAGES.sunsetDining}
                    alt="Evening dining"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cooking Classes */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-4">HANDS-ON</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              Cooking Classes
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
              src={HOTEL_IMAGES.farmField}
              alt="Farm field in Paleros"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 text-lg leading-relaxed max-w-4xl mx-auto text-center"
          >
            At our farm in Paleros, we offer hands-on cooking classes that bring you
            closer to the land and the local traditions. You&apos;ll begin by
            harvesting fresh, seasonal produce straight from our fields. Then,
            alongside local women from Paleros, you&apos;ll learn to prepare
            traditional Greek recipes passed down through generations. It&apos;s a
            warm, authentic experience that connects you to the flavors and stories of
            the region. Best of all, you&apos;ll get to enjoy the meal you&apos;ve
            cooked &mdash; and take it with you to savor later.
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          >
            <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
              <img
                src={HOTEL_IMAGES.cookingClass}
                alt="Making phyllo dough"
                className="w-full h-64 md:h-72 object-cover"
              />
            </motion.div>
            <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
              <img
                src={HOTEL_IMAGES.cookingResult}
                alt="Baked pastry result"
                className="w-full h-64 md:h-72 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Beekeeping */}
      <section className="section-padding bg-ivory">
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
                  src={HOTEL_IMAGES.beekeeping}
                  alt="Beekeeper at hives with sea view"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={HOTEL_IMAGES.honeycomb}
                  alt="Honeycomb closeup"
                  className="w-full h-52 lg:h-60 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">EXPERIENCE</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                Honey Harvesting &amp; Beekeeping
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                During your stay at Seagonia in Paleros, you can immerse yourself in
                the world of beekeeping and honey harvesting at our hives. Guided by a
                local beekeeper, you&apos;ll learn about the fascinating life of bees
                and how they produce their golden treasure. You&apos;ll suit up, visit
                our hives, and even taste fresh honey straight from the comb.
                It&apos;s a sweet, hands-on experience that connects you to nature and
                local tradition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
