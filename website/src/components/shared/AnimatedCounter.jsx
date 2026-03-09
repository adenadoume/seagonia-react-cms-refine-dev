import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedCounter({ end, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // ms
    const steps = 60
    const increment = end / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      // Ease-out: decelerate towards end
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(eased * end)
      setCount(current)

      if (step >= steps) {
        setCount(end)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <span className="font-serif text-5xl md:text-6xl font-semibold text-gold tabular-nums">
        {count}
        {suffix && <span className="text-3xl md:text-4xl ml-0.5">{suffix}</span>}
      </span>
      {label && (
        <span className="font-sans text-sm text-charcoal/70 mt-2 tracking-wide">
          {label}
        </span>
      )}
    </motion.div>
  )
}
