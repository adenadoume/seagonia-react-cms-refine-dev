import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function TextSection({ section }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="max-w-3xl mx-auto text-center"
    >
      {section.heading && (
        <h2 className="font-serif text-heading text-charcoal mb-6">{section.heading}</h2>
      )}
      {section.body && (
        <p className="text-charcoal/70 leading-relaxed whitespace-pre-line">{section.body}</p>
      )}
    </motion.div>
  )
}

function ImageTextSection({ section }) {
  const isRight = section.image_position === 'right'
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`grid md:grid-cols-2 gap-12 items-center ${isRight ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      {section.image_url && (
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={section.image_url}
            alt={section.heading || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        {section.heading && (
          <h2 className="font-serif text-sub text-charcoal mb-4">{section.heading}</h2>
        )}
        {section.body && (
          <p className="text-charcoal/70 leading-relaxed whitespace-pre-line">{section.body}</p>
        )}
      </div>
    </motion.div>
  )
}

function ImageSection({ section }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {section.image_url && (
        <div className="aspect-[16/7] overflow-hidden rounded-lg">
          <img
            src={section.image_url}
            alt={section.caption || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {section.caption && (
        <p className="text-center text-sm text-charcoal/50 mt-3 italic">{section.caption}</p>
      )}
    </motion.div>
  )
}

export default function CustomSections({ sections }) {
  if (!sections?.length) return null

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto space-y-20">
        {sections.map((section) => {
          if (section.type === 'text') return <TextSection key={section.id} section={section} />
          if (section.type === 'image_text') return <ImageTextSection key={section.id} section={section} />
          if (section.type === 'image') return <ImageSection key={section.id} section={section} />
          return null
        })}
      </div>
    </section>
  )
}
