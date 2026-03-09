import { useState } from 'react'

// All local hotel images: img-001.jpg through img-077.jpg
const LOCAL_IMAGES = Array.from({ length: 77 }, (_, i) => {
  const n = String(i + 1).padStart(3, '0')
  return `/images/hotel/img-${n}.jpg`
})

/**
 * ImagePicker
 * Props:
 *   value      — current image URL string
 *   onChange   — called with new URL string
 *   label      — optional label text
 */
export default function ImagePicker({ value, onChange, label = 'Image' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = search
    ? LOCAL_IMAGES.filter((url) => url.includes(search))
    : LOCAL_IMAGES

  function pick(url) {
    onChange(url)
    setOpen(false)
    setSearch('')
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/hotel/img-XXX.jpg or https://..."
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 text-xs border border-slate-600 rounded text-slate-300 hover:border-gold hover:text-gold transition-colors whitespace-nowrap"
        >
          Browse
        </button>
      </div>

      {/* Preview */}
      {value && (
        <img
          src={value}
          alt=""
          className="mt-2 h-28 rounded object-cover border border-slate-700"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-[780px] max-h-[80vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <h2 className="text-white font-semibold">Pick an Image</h2>
              <button
                type="button"
                onClick={() => { setOpen(false); setSearch('') }}
                className="text-slate-400 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-slate-700">
              <input
                className="input"
                placeholder="Filter by number (e.g. 028)…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <p className="text-slate-500 text-xs mt-1">{filtered.length} images</p>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-4 grid grid-cols-6 gap-2">
              {filtered.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => pick(url)}
                  className={`group relative aspect-square rounded overflow-hidden border-2 transition-colors ${
                    value === url ? 'border-gold' : 'border-transparent hover:border-gold/60'
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    onError={(e) => { e.target.parentElement.style.display = 'none' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {url.split('/').pop()}
                  </div>
                  {value === url && (
                    <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-700 flex justify-between items-center">
              <p className="text-slate-500 text-xs">
                {value ? `Selected: ${value.split('/').pop()}` : 'No image selected'}
              </p>
              <button
                type="button"
                onClick={() => { setOpen(false); setSearch('') }}
                className="btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
