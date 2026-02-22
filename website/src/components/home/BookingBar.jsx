import { useState } from 'react';

function toDateInputValue(date) {
  return date.toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return toDateInputValue(d);
}

export default function BookingBar() {
  const today = toDateInputValue(new Date());
  const tomorrow = addDays(today, 1);

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  function handleCheckinChange(e) {
    const val = e.target.value;
    setCheckin(val);
    // Ensure checkout is at least checkin + 1
    if (checkout <= val) {
      setCheckout(addDays(val, 1));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const base = import.meta.env.VITE_WEBHOTELIER_URL || '#';
    const params = new URLSearchParams({
      checkin,
      checkout,
      rooms: '1',
      adults: String(guests),
    });
    window.open(`${base}?${params.toString()}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="relative z-20 -mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Check-in */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone/60 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkin}
                min={today}
                onChange={handleCheckinChange}
                className="w-full border border-stone/20 rounded-lg px-3 py-2 text-stone focus:outline-none focus:ring-2 focus:ring-sea/40"
                required
              />
            </div>

            {/* Check-out */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone/60 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkout}
                min={addDays(checkin, 1)}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full border border-stone/20 rounded-lg px-3 py-2 text-stone focus:outline-none focus:ring-2 focus:ring-sea/40"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone/60 mb-1">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full border border-stone/20 rounded-lg px-3 py-2 text-stone focus:outline-none focus:ring-2 focus:ring-sea/40 bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="w-full md:w-auto">
              <button type="submit" className="btn-primary w-full md:w-auto whitespace-nowrap">
                Check Availability
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
