import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = true, light = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={centered ? 'text-center' : ''}
    >
      {eyebrow && (
        <p
          className={`font-sans font-semibold text-xs uppercase tracking-eyebrow mb-4 ${
            light ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {eyebrow}
        </p>
      )}

      {title && (
        <h2
          className={`font-serif text-3xl md:text-4xl lg:text-heading font-semibold leading-tight ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`font-sans text-lg md:text-xl mt-5 max-w-2xl leading-relaxed ${
            light ? 'text-white/70' : 'text-charcoal/70'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
