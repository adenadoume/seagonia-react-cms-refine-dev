import { useState } from 'react'
import {
  useAdminRooms,
  useUpdateRoom,
  useCreateRoom,
  useDeleteRoom,
} from '../hooks/useAdmin'

const empty = {
  name: '', room_type: 'A', slug: '', description: '', highlight: '',
  count: 1, floor: '', max_guests: 2, bed_options: ['King Bed', 'Twin Beds'],
  image_url: '', is_featured: false, is_published: true, display_order: 0,
}

const roomTypes = ['A', 'B', 'C', 'D', 'E', 'F']

export default function RoomsAdmin() {
  const { data: rooms, isLoading } = useAdminRooms()
  const update = useUpdateRoom()
  const create = useCreateRoom()
  const del = useDeleteRoom()

  const [view, setView] = useState('list')
  const [form, setForm] = useState(empty)
  const [saved, setSaved] = useState(false)

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function startEdit(item) {
    setForm({ ...item, bed_options: item.bed_options || [] })
    setView('edit')
    setSaved(false)
  }

  function startCreate() { setForm(empty); setView('create'); setSaved(false) }

  async function handleSave(e) {
    e.preventDefault()
    // Parse bed_options from comma-separated string if it's a string
    const payload = {
      ...form,
      bed_options: typeof form.bed_options === 'string'
        ? form.bed_options.split(',').map(s => s.trim()).filter(Boolean)
        : form.bed_options,
    }
    if (view === 'edit') await update.mutateAsync(payload)
    else await create.mutateAsync(payload)
    setSaved(true)
    setTimeout(() => { setSaved(false); setView('list') }, 1000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this room type?')) return
    await del.mutateAsync(id)
  }

  if (isLoading) return <div className="p-8 text-gray-400">Loading...</div>

  if (view !== 'list') {
    const bedStr = Array.isArray(form.bed_options) ? form.bed_options.join(', ') : form.bed_options

    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-gray-400 hover:text-gray-600 text-sm mb-6 block">
          ← Back to Rooms
        </button>
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {view === 'edit' ? `Edit — ${form.name}` : 'New Room Type'}
        </h1>

        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Room Type</label>
              <select className="input" value={form.room_type} onChange={(e) => set('room_type', e.target.value)}>
                {roomTypes.map(t => <option key={t} value={t}>Type {t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="label">Slug (URL key)</label>
            <input className="input" value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="garden-room" />
          </div>

          <div>
            <label className="label">Highlight (short tagline)</label>
            <input className="input" value={form.highlight || ''} onChange={(e) => set('highlight', e.target.value)} placeholder="Private Garden" />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea className="input" rows={4} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div>
            <label className="label">Image URL</label>
            <input className="input" value={form.image_url || ''} onChange={(e) => set('image_url', e.target.value)} placeholder="/images/hotel/img-XXX.jpg" />
            {form.image_url && (
              <img src={form.image_url} alt="" className="mt-2 h-24 rounded object-cover" onError={(e) => e.target.style.display = 'none'} />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Count</label>
              <input className="input" type="number" value={form.count} onChange={(e) => set('count', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="label">Max Guests</label>
              <input className="input" type="number" value={form.max_guests} onChange={(e) => set('max_guests', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="label">Display Order</label>
              <input className="input" type="number" value={form.display_order} onChange={(e) => set('display_order', parseInt(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label">Floor</label>
            <input className="input" value={form.floor || ''} onChange={(e) => set('floor', e.target.value)} placeholder="Ground Floor" />
          </div>

          <div>
            <label className="label">Bed Options (comma separated)</label>
            <input
              className="input"
              value={bedStr}
              onChange={(e) => set('bed_options', e.target.value)}
              placeholder="King Bed, Twin Beds"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} />
              <span className="text-sm text-gray-700">Featured on Home</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
              <span className="text-sm text-gray-700">Published</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={update.isPending || create.isPending} className="btn-primary">
              {update.isPending || create.isPending ? 'Saving...' : 'Save Room'}
            </button>
            <button type="button" onClick={() => setView('list')} className="btn-secondary">Cancel</button>
            {saved && <span className="text-green-600 text-sm">Saved</span>}
            {(update.isError || create.isError) && <span className="text-red-600 text-sm">Error saving</span>}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Rooms</h1>
        <button onClick={startCreate} className="btn-primary">+ Add Room</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 text-gray-500 font-medium">Type</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Name</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Highlight</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Count</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Order</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Featured</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs bg-gray-50 text-center w-12">{room.room_type}</td>
                <td className="px-4 py-3 font-medium">{room.name}</td>
                <td className="px-4 py-3 text-gray-500">{room.highlight}</td>
                <td className="px-4 py-3 text-gray-500">{room.count}</td>
                <td className="px-4 py-3 text-gray-500">{room.display_order}</td>
                <td className="px-4 py-3">
                  {room.is_featured && <span className="badge-published">Featured</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={room.is_published ? 'badge-published' : 'badge-draft'}>
                    {room.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(room)} className="text-gold hover:underline text-xs">Edit</button>
                  <button onClick={() => handleDelete(room.id)} className="text-red-500 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms?.length === 0 && <div className="text-center text-gray-400 py-12">No rooms yet</div>}
      </div>
    </div>
  )
}
