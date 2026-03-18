import { useState, useRef, useCallback, useEffect } from 'react'
import { useAdminGallery } from '../hooks/useAdmin'

const WEBSITE_BASE = 'https://seagonia.vercel.app'
const PAGE_SIZE = 30

const LOCAL_IMAGES = Array.from({ length: 77 }, (_, i) => {
  const n = String(i + 1).padStart(3, '0')
  return `${WEBSITE_BASE}/images/hotel/img-${n}.jpg`
})

function resolveUrl(url) {
  if (!url) return url
  if (url.startsWith('http')) return url
  return `${WEBSITE_BASE}${url}`
}

export default function ImagePicker({ value, onChange, label = 'Image' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('local')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { data: galleryImages } = useAdminGallery()

  const galleryUrls = (galleryImages || []).map((img) => resolveUrl(img.image_url)).filter(Boolean)
  const allLocal = LOCAL_IMAGES
  const allGallery = [...new Set(galleryUrls)]

  const pool = tab === 'local' ? allLocal : allGallery
  const filtered = search ? pool.filter((url) => url.toLowerCase().includes(search.toLowerCase())) : pool
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const resolvedValue = resolveUrl(value)

  // Reset count when tab or search changes
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [tab, search])

  // Infinite scroll
  const observerRef = useRef(null)
  const sentinel = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) setVisibleCount((n) => n + PAGE_SIZE)
    })
    observerRef.current.observe(node)
  }, [hasMore])

  function pick(url) {
    onChange(url)
    setOpen(false)
    setSearch('')
  }

  function handleOpen() {
    // Switch to gallery tab if current value is a gallery/cloudinary image
    if (value && value.startsWith('http') && !value.includes('vercel.app')) setTab('gallery')
    else setTab('local')
    setSearch('')
    setVisibleCount(PAGE_SIZE)
    setOpen(true)
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /images/hotel/img-XXX.jpg"
        />
        <button
          type="button"
          onClick={handleOpen}
          className="px-3 py-2 text-xs border border-slate-600 rounded text-slate-300 hover:border-gold hover:text-gold transition-colors whitespace-nowrap"
        >
          Browse
        </button>
      </div>

      {/* Preview */}
      {value && (
        <img
          src={resolvedValue}
          alt=""
          className="mt-2 h-28 rounded object-cover border border-slate-700"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-[820px] max-h-[85vh] flex flex-col shadow-2xl">
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

            {/* Tabs */}
            <div className="flex gap-1 px-5 pt-3 border-b border-slate-700">
              <button
                type="button"
                onClick={() => { setTab('local'); setSearch('') }}
                className={`px-4 py-2 text-xs font-medium rounded-t transition-colors ${tab === 'local' ? 'bg-gold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Hotel Photos ({allLocal.length})
              </button>
              <button
                type="button"
                onClick={() => { setTab('gallery'); setSearch('') }}
                className={`px-4 py-2 text-xs font-medium rounded-t transition-colors ${tab === 'gallery' ? 'bg-gold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Gallery ({allGallery.length})
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-slate-700">
              <input
                className="input"
                placeholder={tab === 'local' ? 'Filter by number (e.g. 028)…' : 'Filter by filename…'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <p className="text-slate-500 text-xs mt-1">
                {filtered.length} images{hasMore ? ` — showing ${visible.length}` : ''}
              </p>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-6 gap-2">
                {visible.map((url) => {
                  const isSelected = resolvedValue === url
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() => pick(url)}
                      className={`group relative aspect-square rounded overflow-hidden border-2 transition-colors ${
                        isSelected ? 'border-gold' : 'border-transparent hover:border-gold/60'
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
                      {isSelected && (
                        <div className="absolute inset-0 bg-gold/30 flex items-center justify-center">
                          <span className="text-white text-lg font-bold drop-shadow">✓</span>
                        </div>
                      )}
                    </button>
                  )
                })}

                {filtered.length === 0 && (
                  <div className="col-span-6 text-center text-slate-500 py-8 text-sm">No images found</div>
                )}
              </div>

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div ref={sentinel} className="py-6 text-center text-slate-500 text-xs">
                  Loading more…
                </div>
              )}
              {!hasMore && filtered.length > 0 && (
                <p className="text-center text-slate-600 text-xs py-4">All {filtered.length} images shown</p>
              )}
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
