import { useState } from 'react'
import {
  useAdminTestimonials,
  useUpdateTestimonial,
  useCreateTestimonial,
  useDeleteTestimonial,
} from '../hooks/useAdmin'

const empty = { quote: '', name: '', country: '', display_order: 0, is_published: true }

export default function TestimonialsAdmin() {
  const { data: testimonials, isLoading } = useAdminTestimonials()
  const update = useUpdateTestimonial()
  const create = useCreateTestimonial()
  const del = useDeleteTestimonial()

  const [view, setView] = useState('list') // 'list' | 'edit' | 'create'
  const [form, setForm] = useState(empty)
  const [saved, setSaved] = useState(false)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function startEdit(item) {
    setForm(item)
    setView('edit')
    setSaved(false)
  }

  function startCreate() {
    setForm(empty)
    setView('create')
    setSaved(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (view === 'edit') await update.mutateAsync(form)
    else await create.mutateAsync(form)
    setSaved(true)
    setTimeout(() => { setSaved(false); setView('list') }, 1000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this testimonial?')) return
    await del.mutateAsync(id)
  }

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  if (view !== 'list') {
    return (
      <div className="p-8 max-w-2xl">
        <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-200 text-sm mb-6 block">
          ← Back to Testimonials
        </button>
        <h1 className="text-xl font-semibold text-white mb-6">
          {view === 'edit' ? 'Edit Testimonial' : 'New Testimonial'}
        </h1>

        <form onSubmit={handleSave} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <label className="label">Quote</label>
            <textarea className="input" rows={4} value={form.quote} onChange={(e) => set('quote', e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Guest Name</label>
              <input className="input" value={form.name || ''} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div>
              <label className="label">Country</label>
              <input className="input" value={form.country || ''} onChange={(e) => set('country', e.target.value)} />
            </div>
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
        <h1 className="text-xl font-semibold text-white">Testimonials</h1>
        <button onClick={startCreate} className="btn-primary">+ Add Testimonial</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="px-4 py-3 text-slate-400 font-medium">Quote</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Country</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Order</th>
              <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials?.map((t) => (
              <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 max-w-xs truncate text-slate-300">{t.quote}</td>
                <td className="px-4 py-3 text-slate-300">{t.name}</td>
                <td className="px-4 py-3 text-slate-400">{t.country}</td>
                <td className="px-4 py-3 text-slate-400">{t.display_order}</td>
                <td className="px-4 py-3">
                  <span className={t.is_published ? 'badge-published' : 'badge-draft'}>
                    {t.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button onClick={() => startEdit(t)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials?.length === 0 && (
          <div className="text-center text-slate-400 py-12">No testimonials yet</div>
        )}
      </div>
    </div>
  )
}
