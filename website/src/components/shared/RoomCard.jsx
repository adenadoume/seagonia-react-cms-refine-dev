import { Link } from 'react-router-dom';

export default function RoomCard({ room, featured = false }) {
  const { slug, name, shortDesc, size, guests, beds, amenities = [], images = [], type } = room;

  return (
    <div className={`card group ${featured ? 'text-lg' : ''}`}>
      {/* Image container */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'aspect-[3/2]' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Guests / Size badge — bottom left */}
        <div className="absolute bottom-0 left-0 bg-black/60 text-white text-sm px-3 py-1.5 rounded-tr-md">
          {guests} Guests | {size}
        </div>

        {/* Room type badge — top right */}
        {type && (
          <div className="absolute top-3 right-3 bg-sea text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {type}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-serif ${featured ? 'text-2xl' : 'text-xl'} text-stone`}>
          {name}
        </h3>

        {shortDesc && (
          <p className="text-stone/70 text-sm mt-1 line-clamp-2">{shortDesc}</p>
        )}

        {/* Amenity pills */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="bg-sand/40 text-stone text-xs px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-4">
          <Link
            to={`/rooms/${slug}`}
            className="text-sea underline underline-offset-2 text-sm hover:text-sea/80 transition-colors"
          >
            View Room
          </Link>
          <Link
            to={`/book?room=${slug}`}
            className="btn-primary text-sm px-4 py-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
