import { useState } from 'react'
import {
  useAdminRooms,
  useUpdateRoom,
  useCreateRoom,
  useDeleteRoom,
} from '../hooks/useAdmin'
import ImagePicker from '../components/ImagePicker'

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

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  if (view !== 'list') {
    const bedStr = Array.isArray(form.bed_options) ? form.bed_options.join(', ') : form.bed_options

    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-200 text-sm mb-6 block">
          ← Back to Rooms
        </button>
        <h1 className="text-xl font-semibold text-white mb-6">
          {view === 'edit' ? `Edit — ${form.name}` : 'New Room Type'}
        </h1>

        <form onSubmit={handleSave} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
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

          <ImagePicker label="Image" value={form.image_url || ''} onChange={(v) => set('image_url', v)} />

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
              <span className="text-sm text-slate-300">Featured on Home</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
              <span className="text-sm text-slate-300">Published</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={update.isPending || create.isPending} className="btn-primary">
              {update.isPending || create.isPending ? 'Saving...' : 'Save Room'}
            </button>
            <button type="button" onClick={() => setView('list')} className="btn-secondary">Cancel</button>
            {saved && <span className="text-green-400 text-sm">Saved</span>}
            {(update.isError || create.isError) && <span className="text-red-400 text-sm">Error saving</span>}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-white">Rooms</h1>
        <button onClick={startCreate} className="btn-primary">+ Add Room</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="px-4 py-3 text-slate-400 font-medium">Type</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Highlight</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Count</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Order</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Featured</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room) => (
              <tr key={room.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 font-mono text-xs bg-slate-700/50 text-center w-12 text-slate-300">{room.room_type}</td>
                <td className="px-4 py-3 font-medium text-slate-200">{room.name}</td>
                <td className="px-4 py-3 text-slate-400">{room.highlight}</td>
                <td className="px-4 py-3 text-slate-400">{room.count}</td>
                <td className="px-4 py-3 text-slate-400">{room.display_order}</td>
                <td className="px-4 py-3">
                  {room.is_featured && <span className="badge-published">Featured</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={room.is_published ? 'badge-published' : 'badge-draft'}>
                    {room.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(room)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(room.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms?.length === 0 && <div className="text-center text-slate-400 py-12">No rooms yet</div>}
      </div>
    </div>
  )
}
