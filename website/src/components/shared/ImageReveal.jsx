import { motion } from 'framer-motion'

export default function ImageReveal({ src, alt, className = '', aspectRatio = '4/3' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}
