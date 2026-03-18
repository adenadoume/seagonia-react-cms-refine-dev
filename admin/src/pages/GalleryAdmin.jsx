import { useState, useRef, useCallback, useEffect } from 'react'
import ImagePicker from '../components/ImagePicker'
import {
  useAdminGallery,
  useAdminGalleryCategories,
  useUpdateGalleryImage,
  useCreateGalleryImage,
  useDeleteGalleryImage,
} from '../hooks/useAdmin'

const PAGE_SIZE = 20
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const WEBSITE_BASE = 'https://seagonia.vercel.app'

function resolveUrl(url) {
  if (!url) return url
  if (url.startsWith('http')) return url
  return `${WEBSITE_BASE}${url}`
}

const empty = { image_url: '', title: '', description: '', category_id: '', display_order: 0, is_published: true }

async function uploadToCloudinary(file) {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', UPLOAD_PRESET)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.secure_url
}

export default function GalleryAdmin() {
  const { data: images, isLoading } = useAdminGallery()
  const { data: categories } = useAdminGalleryCategories()
  const update = useUpdateGalleryImage()
  const create = useCreateGalleryImage()
  const del = useDeleteGalleryImage()

  const [view, setView] = useState('list')
  const [form, setForm] = useState(empty)
  const [filterCat, setFilterCat] = useState('all')
  const [saved, setSaved] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const sentinelRef = useRef(null)
  const fileInputRef = useRef(null)

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function startEdit(item) {
    setForm({ ...item, category_id: item.category_id || '' })
    setView('edit')
    setSaved(false)
  }

  function startCreate() { setForm(empty); setView('create'); setSaved(false) }

  async function handleSave(e) {
    e.preventDefault()
    const payload = { ...form, category_id: form.category_id || null }
    if (view === 'edit') await update.mutateAsync(payload)
    else await create.mutateAsync(payload)
    setSaved(true)
    setTimeout(() => { setSaved(false); setView('list') }, 1000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this image?')) return
    await del.mutateAsync(id)
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    setUploadError(null)
    try {
      for (const file of files) {
        const url = await uploadToCloudinary(file)
        await create.mutateAsync({
          image_url: url,
          title: file.name.replace(/\.[^.]+$/, ''),
          category_id: filterCat !== 'all' ? categories?.find(c => c.slug === filterCat)?.id || null : null,
          display_order: 0,
          is_published: true,
        })
      }
    } catch (err) {
      setUploadError('Upload failed — check Cloudinary preset settings')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const filtered = images
    ? filterCat === 'all' ? images : images.filter((img) => img.category?.slug === filterCat)
    : []

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reset visible count when filter changes
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [filterCat])

  // Infinite scroll via IntersectionObserver
  const observerRef = useRef(null)
  const sentinel = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount((n) => n + PAGE_SIZE)
      }
    })
    observerRef.current.observe(node)
  }, [hasMore])

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  if (view !== 'list') {
    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-200 text-sm mb-6 block">
          ← Back to Gallery
        </button>
        <h1 className="text-xl font-semibold text-white mb-6">
          {view === 'edit' ? 'Edit Image' : 'Add Image'}
        </h1>

        <form onSubmit={handleSave} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <ImagePicker label="Image" value={form.image_url} onChange={(v) => set('image_url', v)} />
          <div>
            <label className="label">Title / Alt text</label>
            <input className="input" value={form.title || ''} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category_id} onChange={(e) => set('category_id', e.target.value)}>
              <option value="">— No category —</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Display Order</label>
              <input className="input" type="number" value={form.display_order} onChange={(e) => set('display_order', parseInt(e.target.value))} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
                <span className="text-sm text-slate-300">Published</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={update.isPending || create.isPending} className="btn-primary">
              {update.isPending || create.isPending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setView('list')} className="btn-secondary">Cancel</button>
            {saved && <span className="text-green-400 text-sm">Saved</span>}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-white">Gallery</h1>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary text-sm"
          >
            {uploading ? 'Uploading...' : '↑ Upload'}
          </button>
          <button onClick={startCreate} className="btn-primary">+ Add</button>
        </div>
      </div>

      {uploadError && (
        <div className="mb-4 px-4 py-2 bg-red-900/40 border border-red-700 rounded text-red-300 text-sm">
          {uploadError}
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${filterCat === 'all' ? 'bg-gold text-white' : 'border border-slate-600 text-slate-400 hover:bg-slate-700'}`}
        >
          All ({images?.length ?? 0})
        </button>
        {categories?.filter(c => c.slug !== 'all').map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setFilterCat(cat.slug)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${filterCat === cat.slug ? 'bg-gold text-white' : 'border border-slate-600 text-slate-400 hover:bg-slate-700'}`}
          >
            {cat.name} ({images?.filter(i => i.category?.slug === cat.slug).length ?? 0})
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {visible.map((img) => (
          <div key={img.id} className="group relative bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <div className="aspect-square overflow-hidden bg-slate-700">
              <img
                src={resolveUrl(img.image_url)}
                alt={img.title || ''}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-slate-300 truncate">{img.title || img.description || '—'}</p>
              <p className="text-xs text-slate-500">{img.category?.name || 'Uncategorised'}</p>
              <div className="flex gap-1.5 mt-1.5">
                <button onClick={() => startEdit(img)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(img.id)} className="btn-delete">Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinel} className="py-8 text-center text-slate-500 text-sm">
          Loading more…
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center text-slate-400 py-16">No images in this category</div>
      )}

      {!hasMore && filtered.length > 0 && (
        <p className="text-center text-slate-600 text-xs py-6">
          Showing all {filtered.length} images
        </p>
      )}
    </div>
  )
}
