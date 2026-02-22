import { Link } from 'react-router-dom';
import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Wind,
  Coffee,
  Sunset,
  Umbrella,
  Sailboat,
  Bike,
  ShowerHead,
  Tv,
  Star,
  Globe,
  Shield,
} from 'lucide-react';
import { AMENITIES } from '../../constants/hotel';

// Map icon name strings to actual lucide components
const ICON_MAP = {
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Wind,
  Coffee,
  Sunset,
  Umbrella,
  Sailboat,
  Bike,
  ShowerHead,
  Tv,
  Star,
  Globe,
  Shield,
};

function AmenityIcon({ name }) {
  const Icon = ICON_MAP[name] || Star;
  return <Icon size={26} strokeWidth={1.5} className="text-sea" />;
}

export default function AmenitiesStrip() {
  const displayed = AMENITIES.slice(0, 8);

  return (
    <section className="section-padding bg-sand-light">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.2em] text-xs font-sans text-sea font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone">Hotel Amenities</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayed.map((amenity) => (
            <div
              key={amenity.id || amenity.icon}
              className="flex flex-col items-center text-center group cursor-default
                         transition-transform duration-300 ease-out
                         hover:-translate-y-1"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-3">
                <AmenityIcon name={amenity.icon} />
              </div>

              <p className="font-semibold text-stone text-sm leading-snug">{amenity.label}</p>

              {amenity.desc && (
                <p className="text-xs text-stone/60 mt-1 leading-snug">{amenity.desc}</p>
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link to="/amenities" className="btn-outline">
            View All Amenities
          </Link>
        </div>
      </div>
    </section>
  );
}
