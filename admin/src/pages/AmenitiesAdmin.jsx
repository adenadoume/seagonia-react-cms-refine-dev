import { useState } from 'react'
import {
  useAdminAmenities,
  useUpdateAmenity,
  useCreateAmenity,
  useDeleteAmenity,
} from '../hooks/useAdmin'

const empty = { name: '', icon: '', description: '', display_order: 0, is_published: true }

export default function AmenitiesAdmin() {
  const { data: amenities, isLoading } = useAdminAmenities()
  const update = useUpdateAmenity()
  const create = useCreateAmenity()
  const del = useDeleteAmenity()

  const [view, setView] = useState('list')
  const [form, setForm] = useState(empty)
  const [saved, setSaved] = useState(false)

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function startEdit(item) { setForm(item); setView('edit'); setSaved(false) }
  function startCreate() { setForm(empty); setView('create'); setSaved(false) }

  async function handleSave(e) {
    e.preventDefault()
    if (view === 'edit') await update.mutateAsync(form)
    else await create.mutateAsync(form)
    setSaved(true)
    setTimeout(() => { setSaved(false); setView('list') }, 1000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this amenity?')) return
    await del.mutateAsync(id)
  }

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  if (view !== 'list') {
    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-200 text-sm mb-6 block">
          ← Back to Amenities
        </button>
        <h1 className="text-xl font-semibold text-white mb-6">
          {view === 'edit' ? 'Edit Amenity' : 'New Amenity'}
        </h1>

        <form onSubmit={handleSave} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div>
            <label className="label">Icon (Lucide name, e.g. Waves, Umbrella)</label>
            <input className="input" value={form.icon || ''} onChange={(e) => set('icon', e.target.value)} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input" rows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-white">Amenities</h1>
        <button onClick={startCreate} className="btn-primary">+ Add Amenity</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Icon</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Description</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Order</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {amenities?.map((a) => (
              <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium text-slate-200">{a.name}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{a.icon}</td>
                <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{a.description}</td>
                <td className="px-4 py-3 text-slate-400">{a.display_order}</td>
                <td className="px-4 py-3">
                  <span className={a.is_published ? 'badge-published' : 'badge-draft'}>
                    {a.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(a)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(a.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {amenities?.length === 0 && <div className="text-center text-slate-400 py-12">No amenities yet</div>}
      </div>
    </div>
  )
}
