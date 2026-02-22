import { Link } from 'react-router-dom';
import { BadgePercent, HeartHandshake, CalendarCheck } from 'lucide-react';

const BENEFITS = [
  {
    icon: BadgePercent,
    title: 'Best Rate Guarantee',
    desc: 'Book directly with us for the best available rate, guaranteed.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    desc: 'Direct communication with our team for a tailored experience.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Cancellation',
    desc: 'Plans change. Enjoy flexible booking modifications.',
  },
];

export default function WhyDirectBook() {
  return (
    <section className="section-padding text-center">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <p className="uppercase tracking-[0.2em] text-xs font-sans text-sea font-semibold mb-3">
          Book Direct
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-stone mb-4">
          Why Book Directly With Us?
        </h2>
        <p className="text-stone/60 max-w-xl mx-auto mb-12">
          Skip the middleman. When you book directly you get more for less.
        </p>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card flex flex-col items-center text-center p-8"
            >
              <div className="w-14 h-14 rounded-full bg-sea/10 flex items-center justify-center mb-5">
                <Icon size={28} strokeWidth={1.5} className="text-sea" />
              </div>
              <h3 className="font-serif text-xl text-stone mb-3">{title}</h3>
              <p className="text-sm text-stone/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/book" className="btn-primary">
          Book Direct
        </Link>
      </div>
    </section>
  );
}
