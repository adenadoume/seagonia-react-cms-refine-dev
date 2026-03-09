import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { HOTEL, PLACEHOLDER_IMAGES } from '../../constants/hotel'

// Free Pexels video - luxury hotel pool/sea ambiance (replace with own footage later)
const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/4186274/4186274-uhd_2560_1440_30fps.mp4'

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback background image (shows while video loads) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PLACEHOLDER_IMAGES.hero})` }}
      />

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Centered content */}
      <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase tracking-[0.3em] text-xs sm:text-sm font-sans text-sand-light"
        >
          Pogonia, Paleros &mdash; Ionian Sea
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.1]"
        >
          {HOTEL.tagline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6 text-white/85 leading-relaxed font-light"
        >
          A boutique hotel of 58 rooms beside the crystal-clear waters of the Ionian Sea, where nature, simplicity, and authentic Greek hospitality come together.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <Link to="/rooms" className="btn-outline text-sm sm:text-base">
            Discover Rooms
          </Link>
          <Link to="/book" className="btn-primary text-sm sm:text-base">
            Book Now
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
      >
        <ChevronDown size={28} strokeWidth={1} />
      </motion.div>
    </section>
  )
}
