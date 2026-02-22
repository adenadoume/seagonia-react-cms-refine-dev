import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxImage({ src, alt, overlay = false, children, height = '70vh' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image moves slower than scroll — parallax offset
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <motion.img
        src={src}
        alt={alt || ''}
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] object-cover"
      />

      {/* Dark gradient overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/60" />
      )}

      {/* Optional overlay content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}
    </div>
  )
}
