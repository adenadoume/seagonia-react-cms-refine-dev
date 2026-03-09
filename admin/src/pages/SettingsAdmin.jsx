import { useState, useEffect } from 'react'
import { useAdminSettings, useUpdateSettings } from '../hooks/useAdmin'

export default function SettingsAdmin() {
  const { data, isLoading } = useAdminSettings()
  const update = useUpdateSettings()
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSave(e) {
    e.preventDefault()
    await update.mutateAsync(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (isLoading) return <div className="p-8 text-slate-400">Loading...</div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-semibold text-white mb-6">Hotel Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Identity</h2>
          <div>
            <label className="label">Hotel Name</label>
            <input className="input" value={form.name || ''} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" value={form.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input" rows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
          </div>
          <div>
            <label className="label">Total Rooms</label>
            <input className="input" type="number" value={form.total_rooms || ''} onChange={(e) => set('total_rooms', parseInt(e.target.value))} />
          </div>
        </section>

        <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</h2>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email || ''} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" value={form.address || ''} onChange={(e) => set('address', e.target.value)} />
          </div>
        </section>

        <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Social</h2>
          <div>
            <label className="label">Instagram URL</label>
            <input className="input" value={form.instagram_url || ''} onChange={(e) => set('instagram_url', e.target.value)} />
          </div>
          <div>
            <label className="label">Facebook URL</label>
            <input className="input" value={form.facebook_url || ''} onChange={(e) => set('facebook_url', e.target.value)} />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={update.isPending} className="btn-primary">
            {update.isPending ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && <span className="text-green-400 text-sm">Saved</span>}
          {update.isError && <span className="text-red-400 text-sm">Error saving</span>}
        </div>
      </form>
    </div>
  )
}
