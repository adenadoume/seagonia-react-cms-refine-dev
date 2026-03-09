import { useState } from 'react'
import {
  useAdminGallery,
  useAdminGalleryCategories,
  useUpdateGalleryImage,
  useCreateGalleryImage,
  useDeleteGalleryImage,
} from '../hooks/useAdmin'

const empty = { image_url: '', title: '', description: '', category_id: '', display_order: 0, is_published: true }

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

  const filtered = images
    ? filterCat === 'all' ? images : images.filter((img) => img.category?.slug === filterCat)
    : []

  if (isLoading) return <div className="p-8 text-gray-400">Loading...</div>

  if (view !== 'list') {
    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-gray-400 hover:text-gray-600 text-sm mb-6 block">
          ← Back to Gallery
        </button>
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {view === 'edit' ? 'Edit Image' : 'Add Image'}
        </h1>

        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="label">Image URL</label>
            <input className="input" value={form.image_url} onChange={(e) => set('image_url', e.target.value)} required placeholder="/images/hotel/img-XXX.jpg" />
            {form.image_url && (
              <img src={form.image_url} alt="" className="mt-2 h-32 rounded object-cover" onError={(e) => e.target.style.display = 'none'} />
            )}
          </div>
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
                <span className="text-sm text-gray-700">Published</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={update.isPending || create.isPending} className="btn-primary">
              {update.isPending || create.isPending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setView('list')} className="btn-secondary">Cancel</button>
            {saved && <span className="text-green-600 text-sm">Saved</span>}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Gallery</h1>
        <button onClick={startCreate} className="btn-primary">+ Add Image</button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${filterCat === 'all' ? 'bg-gold text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          All ({images?.length ?? 0})
        </button>
        {categories?.filter(c => c.slug !== 'all').map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setFilterCat(cat.slug)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${filterCat === cat.slug ? 'bg-gold text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            {cat.name} ({images?.filter(i => i.category?.slug === cat.slug).length ?? 0})
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((img) => (
          <div key={img.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={img.image_url}
                alt={img.title || ''}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-600 truncate">{img.title || img.description || '—'}</p>
              <p className="text-xs text-gray-400">{img.category?.name || 'Uncategorised'}</p>
              <div className="flex gap-2 mt-1">
                <button onClick={() => startEdit(img)} className="text-gold text-xs hover:underline">Edit</button>
                <button onClick={() => handleDelete(img.id)} className="text-red-500 text-xs hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-16">No images in this category</div>
      )}
    </div>
  )
}
