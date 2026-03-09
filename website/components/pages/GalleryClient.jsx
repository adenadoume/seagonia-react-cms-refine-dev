'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HOTEL_IMAGES } from '../../constants/hotel'
import ImageLightbox from '../../components/shared/ImageLightbox'
import { useGalleryImages, useGalleryCategories, usePageContent } from '../../hooks/useSupabase'

export default function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { data: categories } = useGalleryCategories()
  const { data: allImages, isLoading, isError } = useGalleryImages()
  const { data: content } = usePageContent('gallery')

  const heroImage = content?.hero_image_url || HOTEL_IMAGES.littleIonian
  const heroTitle = content?.hero_title || 'Gallery'
  const heroSubtitle = content?.hero_subtitle || ''

  const filtered =
    !allImages
      ? []
      : activeFilter === 'all'
      ? allImages
      : allImages.filter((img) => img.category?.slug === activeFilter)

  const filteredUrls = filtered.map((img) => img.image_url)

  function openLightbox(index) {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative h-[40vh] min-h-[320px] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">{heroTitle}</h1>
          {heroSubtitle && <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">{heroSubtitle}</p>}
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories?.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat.slug
                    ? 'bg-gold text-white'
                    : 'bg-cream/50 text-charcoal hover:bg-cream'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-stone/10 rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-charcoal/60 py-20">
              Unable to load gallery. Please try again.
            </p>
          )}

          {/* Image Grid */}
          {!isLoading && !isError && (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={img.image_url}
                      alt={img.title || img.description || 'Seagonia Hotel'}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={filteredUrls}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % filteredUrls.length)
        }
        onPrev={() =>
          setLightboxIndex(
            (prev) => (prev - 1 + filteredUrls.length) % filteredUrls.length
          )
        }
      />
    </>
  )
}
