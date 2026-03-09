import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROOMS, PLACEHOLDER_IMAGES } from '../../constants/hotel';
import RoomCard from '../shared/RoomCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function RoomHighlights() {
  const featured = ROOMS.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.2em] text-xs font-sans text-sea font-semibold mb-3">
            Accommodations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone">
            Our Rooms &amp; Suites
          </h2>
          <p className="mt-4 text-stone/60 max-w-xl mx-auto">
            Each room is thoughtfully designed to bring the beauty of the Ionian Sea indoors.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featured.map((room) => (
            <motion.div key={room.id} variants={itemVariants}>
              <RoomCard room={{
                ...room,
                images: [PLACEHOLDER_IMAGES[room.image]],
                shortDesc: room.highlight,
                guests: `${room.maxGuests}`,
                size: room.floor,
                beds: room.bedOptions.join(' / '),
              }} featured />
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link to="/rooms" className="btn-outline-dark">
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
