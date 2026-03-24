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

export default function Dining() {
  const { data: content } = usePageContent('dining')
  const extra = content?.extra_content || {}
  const heroImage = content?.hero_image_url || HOTEL_IMAGES.galiaRooftop
  const heroTitle = content?.hero_title || 'Dining'
  const heroSubtitle = content?.hero_subtitle || ''

  const galiaEyebrow = extra.galia_eyebrow || 'ROOFTOP DINING'
  const galiaHeading = extra.galia_heading || 'Galiá Restaurant'
  const galiaBody = extra.galia_body || `Galiá is our mediterranean restaurant set on the upper floor of the hotel, open to sweeping views of the pool, Paleros bay, and the Acarnanian mountains. The space is bathed in natural light during the day and glows softly in the evening as the sun sets over the water. The menu draws inspiration from the coasts of the Mediterranean, offering fresh, seasonal dishes that highlight local produce and mediterranean flavors.`
  const loungeEyebrow = extra.lounge_eyebrow || 'ALL-DAY DINING'
  const loungeHeading = extra.lounge_heading || 'Seagonia Lounge'
  const loungeBody = extra.lounge_body || `Our Seagonia Lounge is the perfect daytime retreat, offering an abundant breakfast buffet followed by a delightful Mediterranean lunch and a selection of light snacks. The Pool Bar, open all day, serves specialty coffee, nourishing smoothies made with farm-fresh fruits and vegetables, protein-rich blends, and healthy treats entirely free of gluten and refined sugar. In the afternoon and into the evening, enjoy a curated wine list, refreshing cocktails, savory snacks, and generous platters for two.`
  const farmEyebrow = extra.farm_eyebrow || 'FROM OUR LAND'
  const farmHeading = extra.farm_heading || 'Farm to Table'
  const farmBody = extra.farm_body || `Food is at the heart of everything we do — it nourishes, connects, and reflects who we are. At Seagonia Hotel, we're deeply committed to offering our guests the very best, without ever losing touch with our roots. That's why we've established our own farm in the region, where we grow a variety of vegetables, herbs, fruits, and raise our own poultry and eggs. This farm-to-table approach allows us to supply our restaurants — both within the hotel and across the area — with the freshest, most authentic ingredients possible.`
  const cookingEyebrow = extra.cooking_eyebrow || 'HANDS-ON'
  const cookingHeading = extra.cooking_heading || 'Cooking Classes'
  const cookingBody = extra.cooking_body || `At our farm in Paleros, we offer hands-on cooking classes that bring you closer to the land and the local traditions. You'll begin by harvesting fresh, seasonal produce straight from our fields. Then, alongside local women from Paleros, you'll learn to prepare traditional Greek recipes passed down through generations. It's a warm, authentic experience that connects you to the flavors and stories of the region. Best of all, you'll get to enjoy the meal you've cooked — and take it with you to savor later.`

  const galiaImage1 = extra.galia_image_1 || HOTEL_IMAGES.galiaRooftop
  const galiaImage2 = extra.galia_image_2 || HOTEL_IMAGES.galiaView
  const galiaImage3 = extra.galia_image_3 || HOTEL_IMAGES.shrimpPasta

  const loungeImage1 = extra.lounge_image_1 || HOTEL_IMAGES.loungeAerial
  const loungeImage2 = extra.lounge_image_2 || HOTEL_IMAGES.cheesePlatter
  const loungeImage3 = extra.lounge_image_3 || HOTEL_IMAGES.shrimpPasta
  const loungeImage4 = extra.lounge_image_4 || HOTEL_IMAGES.cocktail

  const farmImage1 = extra.farm_image_1 || HOTEL_IMAGES.farmLettuce
  const farmImage2 = extra.farm_image_2 || HOTEL_IMAGES.farmFlowers
  const farmImage3 = extra.farm_image_3 || HOTEL_IMAGES.farmTractor
  const farmImage4 = extra.farm_image_4 || HOTEL_IMAGES.farmField

  const yachtEyebrow = extra.yacht_eyebrow || 'PALEROS HARBOUR'
  const yachtHeading = extra.yacht_heading || 'Yacht Club'
  const yachtBody = extra.yacht_body || `For an authentic greek culinary experience we highly recommend Yacht Club which is located at the port of Paleros. The Yacht Club fuses organic vegetables from its farm, local ingredients and PDO products of the area, to create mouthwatering traditional dishes in a sophisticated environment.`
  const yachtImage1 = extra.yacht_image_1 || HOTEL_IMAGES.outdoorDining
  const yachtImage2 = extra.yacht_image_2 || HOTEL_IMAGES.sunsetDining
  const yachtImage3 = extra.yacht_image_3 || HOTEL_IMAGES.foodSteak
  const yachtImage4 = extra.yacht_image_4 || HOTEL_IMAGES.foodDolmades
  const yachtImage5 = extra.yacht_image_5 || HOTEL_IMAGES.foodPide
  const yachtImage6 = extra.yacht_image_6 || HOTEL_IMAGES.sunsetDining

  const cookingImage1 = extra.cooking_image_1 || HOTEL_IMAGES.cookingClass
  const cookingImage2 = extra.cooking_image_2 || HOTEL_IMAGES.cookingResult

  const naturalBitesEyebrow = extra.natural_bites_eyebrow || 'POOL BAR'
  const naturalBitesHeading = extra.natural_bites_heading || 'Natural Bites'
  const naturalBitesBody = extra.natural_bites_body || `Our Pool Bar serves specialty coffee, nourishing smoothies made with farm-fresh fruits and vegetables, protein-rich blends, and healthy treats entirely free of gluten and refined sugar. Open all day, it is the ideal spot to recharge between swims or unwind as the afternoon light softens over the pool.`
  const naturalBitesImage1 = extra.natural_bites_image_1 || HOTEL_IMAGES.cocktail
  const naturalBitesImage2 = extra.natural_bites_image_2 || HOTEL_IMAGES.foodBurrata

  useSEO({
    title: extra.seo_title || 'Dining',
    description: extra.seo_description || 'Discover the dining experiences at Seagonia Hotel — from Galia rooftop restaurant to farm-to-table cuisine, cooking classes, and the Natural Bites pool bar on the Ionian coast.',
    ogImage: extra.seo_og_image,
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
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

      {/* Natural Bites — Pool Bar */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">{naturalBitesEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {naturalBitesHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {naturalBitesBody}
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={naturalBitesImage1} alt="Natural Bites pool bar" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
                <img src={naturalBitesImage2} alt="Healthy bites" className="w-full h-64 object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
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
              <p className="eyebrow mb-4">{galiaEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {galiaHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {galiaBody}
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
                  src={galiaImage1}
                  alt="Galia rooftop restaurant"
                  className="w-full h-72 lg:h-80 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={galiaImage2}
                    alt="View from Galia restaurant"
                    className="w-full h-44 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={galiaImage3}
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
                  src={loungeImage1}
                  alt="Seagonia Lounge aerial view"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                <img
                  src={loungeImage2}
                  alt="Cheese and bread platter"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                <img
                  src={loungeImage3}
                  alt="Shrimp orzo pasta"
                  className="w-full h-44 object-cover"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg">
                <img
                  src={loungeImage4}
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
              <p className="eyebrow mb-4">{loungeEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {loungeHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {loungeBody}
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
                  src={farmImage1}
                  alt="Fresh lettuce from our farm"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={farmImage2}
                  alt="Zucchini flowers harvest"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeLeft} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={farmImage3}
                  alt="Farm with tractor"
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-lg break-inside-avoid">
                <img
                  src={farmImage4}
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
              <p className="eyebrow mb-4">{farmEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {farmHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {farmBody}
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
              <p className="eyebrow mb-4">{yachtEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
                {yachtHeading}
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mt-6">
                {yachtBody}
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
                  src={yachtImage1}
                  alt="Yacht Club outdoor dining"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={yachtImage2}
                    alt="Sunset dining at the harbour"
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={yachtImage3}
                    alt="Grilled steak"
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={yachtImage4}
                    alt="Dolmades"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={yachtImage5}
                    alt="Pide flatbread"
                    className="w-full h-32 object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="overflow-hidden rounded-lg">
                  <img
                    src={yachtImage6}
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
            <p className="eyebrow mb-4">{cookingEyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-heading font-semibold text-navy leading-tight">
              {cookingHeading}
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-charcoal/70 text-lg leading-relaxed max-w-4xl mx-auto text-center"
          >
            {cookingBody}
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
                src={cookingImage1}
                alt="Making phyllo dough"
                className="w-full h-64 md:h-72 object-cover"
              />
            </motion.div>
            <motion.div variants={fadeRight} className="overflow-hidden rounded-lg">
              <img
                src={cookingImage2}
                alt="Baked pastry result"
                className="w-full h-64 md:h-72 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
