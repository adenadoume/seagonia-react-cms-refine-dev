import { useState, useEffect, useRef } from 'react'
import { useAdminSettings, useUpdateSettings, useAdminRooms, useAdminGallery, useAdminAmenities, useAdminExperiences, useAdminTestimonials, useAdminAllPageContent, useAdminNewsletter } from '../hooks/useAdmin'
import { supabase } from '../lib/supabase'
import { DeployButton } from '../components/Layout'

async function exportAllData() {
  const [settings, rooms, gallery, amenities, experiences, testimonials, pages, newsletter, messages] = await Promise.all([
    supabase.from('hotel_settings').select('*').single().then(r => r.data),
    supabase.from('rooms').select('*').then(r => r.data),
    supabase.from('gallery_images').select('*, category:gallery_categories(name,slug)').then(r => r.data),
    supabase.from('amenities').select('*').then(r => r.data),
    supabase.from('experiences').select('*').then(r => r.data),
    supabase.from('testimonials').select('*').then(r => r.data),
    supabase.from('page_content').select('*').then(r => r.data),
    supabase.from('newsletter_subscribers').select('*').then(r => r.data),
    supabase.from('contact_messages').select('*').then(r => r.data),
  ])

  const backup = {
    exported_at: new Date().toISOString(),
    settings, rooms, gallery, amenities, experiences, testimonials, pages, newsletter, messages,
  }

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `seagonia-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function SettingsAdmin() {
  const { data, isLoading } = useAdminSettings()
  const update = useUpdateSettings()
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const importRef = useRef(null)

  async function handleExport() {
    setExporting(true)
    try { await exportAllData() } finally { setExporting(false) }
  }

  async function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!confirm('This will overwrite existing data with the backup file. Are you sure?')) {
      e.target.value = ''; return
    }
    setImporting(true)
    setImportResult(null)
    try {
      const text = await file.text()
      const backup = JSON.parse(text)

      if (backup.settings) {
        const { id, ...fields } = backup.settings
        await supabase.from('hotel_settings').update(fields).eq('id', id)
      }
      if (backup.rooms?.length) {
        await supabase.from('rooms').upsert(backup.rooms, { onConflict: 'id' })
      }
      if (backup.gallery?.length) {
        const rows = backup.gallery.map(({ category, ...r }) => r)
        await supabase.from('gallery_images').upsert(rows, { onConflict: 'id' })
      }
      if (backup.amenities?.length) {
        await supabase.from('amenities').upsert(backup.amenities, { onConflict: 'id' })
      }
      if (backup.experiences?.length) {
        await supabase.from('experiences').upsert(backup.experiences, { onConflict: 'id' })
      }
      if (backup.testimonials?.length) {
        await supabase.from('testimonials').upsert(backup.testimonials, { onConflict: 'id' })
      }
      if (backup.pages?.length) {
        await supabase.from('page_content').upsert(backup.pages, { onConflict: 'id' })
      }
      setImportResult('✓ Restored successfully')
    } catch (err) {
      setImportResult('✗ Import failed — invalid backup file')
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }

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

      {/* Backup & Deploy */}
      <section className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Backup & Deploy</h2>
        <p className="text-slate-500 text-sm mb-4">Export all content to JSON. Import to restore a previous backup.</p>
        <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <div className="flex gap-3 flex-wrap items-center">
          <button type="button" onClick={handleExport} disabled={exporting} className="btn-secondary">
            {exporting ? 'Exporting…' : '↓ Export'}
          </button>
          <button type="button" onClick={() => importRef.current?.click()} disabled={importing} className="btn-secondary">
            {importing ? 'Restoring…' : '↑ Import'}
          </button>
          <DeployButton />
          {importResult && (
            <span className={importResult.startsWith('✓') ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>
              {importResult}
            </span>
          )}
        </div>
      </section>
    </div>
  )
}
