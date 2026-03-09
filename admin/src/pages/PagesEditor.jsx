import { useState, useEffect } from 'react'
import { useAdminAllPageContent, useAdminPageContent, useUpdatePageContent } from '../hooks/useAdmin'
import ImagePicker from '../components/ImagePicker'

const PAGE_LABELS = {
  home: 'Home',
  rooms: 'Rooms',
  gallery: 'Gallery',
  amenities: 'Amenities',
  experiences: 'Experiences',
  dining: 'Dining',
  area: 'Area',
  hotel: 'About',
}

const SECTION_TYPES = [
  { value: 'text', label: 'Text Block' },
  { value: 'image_text', label: 'Image + Text' },
  { value: 'image', label: 'Image Only' },
]

// ─── Custom Sections editor ───────────────────────────────
function CustomSections({ sections, onChange }) {
  function addSection() {
    const id = Date.now().toString()
    onChange([...sections, { id, type: 'text', heading: '', body: '', image_url: '' }])
  }

  function updateSection(id, field, value) {
    onChange(sections.map((s) => s.id === id ? { ...s, [field]: value } : s))
  }

  function removeSection(id) {
    onChange(sections.filter((s) => s.id !== id))
  }

  function moveUp(idx) {
    if (idx === 0) return
    const next = [...sections]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  function moveDown(idx) {
    if (idx === sections.length - 1) return
    const next = [...sections]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => (
        <div key={sec.id} className="bg-slate-800 border border-slate-600 rounded-lg p-5 space-y-4">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select
                className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-gold"
                value={sec.type}
                onChange={(e) => updateSection(sec.id, 'type', e.target.value)}
              >
                {SECTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <span className="text-slate-500 text-xs">Section {idx + 1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="px-2 py-1 text-xs border border-slate-600 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors">
                ↑
              </button>
              <button type="button" onClick={() => moveDown(idx)}
                disabled={idx === sections.length - 1}
                className="px-2 py-1 text-xs border border-slate-600 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors">
                ↓
              </button>
              <button type="button" onClick={() => removeSection(sec.id)} className="btn-delete">
                Remove
              </button>
            </div>
          </div>

          {/* Heading — all types except image-only */}
          {sec.type !== 'image' && (
            <div>
              <label className="label">Heading</label>
              <input className="input" value={sec.heading || ''} onChange={(e) => updateSection(sec.id, 'heading', e.target.value)} placeholder="Section heading" />
            </div>
          )}

          {/* Body — text and image+text */}
          {(sec.type === 'text' || sec.type === 'image_text') && (
            <div>
              <label className="label">Body text</label>
              <textarea className="input" rows={4} value={sec.body || ''} onChange={(e) => updateSection(sec.id, 'body', e.target.value)} placeholder="Section content..." />
            </div>
          )}

          {/* Image — image and image+text */}
          {(sec.type === 'image' || sec.type === 'image_text') && (
            <ImagePicker label="Image" value={sec.image_url || ''} onChange={(v) => updateSection(sec.id, 'image_url', v)} />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-gold hover:text-gold text-sm transition-colors"
      >
        + Add Section
      </button>
    </div>
  )
}

// ─── Home page form — full section editing ───────────────
function HomeForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    section_1_title: data?.section_1_title || '',
    section_1_text: data?.section_1_text || '',
    section_1_image_url: data?.section_1_image_url || '',
    section_2_title: data?.section_2_title || '',
    section_3_title: data?.section_3_title || '',
    intro_eyebrow: extra.intro_eyebrow || 'Welcome',
    accommodation_eyebrow: extra.accommodation_eyebrow || 'Accommodation',
    experiences_eyebrow: extra.experiences_eyebrow || 'Experiences',
    dining_eyebrow: extra.dining_eyebrow || 'Dining',
    dining_heading: extra.dining_heading || '',
    dining_body: extra.dining_body || '',
    cta_heading: extra.cta_heading || 'Plan Your Stay',
    cta_subheading: extra.cta_subheading || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        section_1_title: data.section_1_title || '',
        section_1_text: data.section_1_text || '',
        section_1_image_url: data.section_1_image_url || '',
        section_2_title: data.section_2_title || '',
        section_3_title: data.section_3_title || '',
        intro_eyebrow: ex.intro_eyebrow || 'Welcome',
        accommodation_eyebrow: ex.accommodation_eyebrow || 'Accommodation',
        experiences_eyebrow: ex.experiences_eyebrow || 'Experiences',
        dining_eyebrow: ex.dining_eyebrow || 'Dining',
        dining_heading: ex.dining_heading || '',
        dining_body: ex.dining_body || '',
        cta_heading: ex.cta_heading || 'Plan Your Stay',
        cta_subheading: ex.cta_subheading || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      section_1_title: form.section_1_title,
      section_1_text: form.section_1_text,
      section_1_image_url: form.section_1_image_url,
      section_2_title: form.section_2_title,
      section_3_title: form.section_3_title,
      extra_content: {
        ...(data.extra_content || {}),
        intro_eyebrow: form.intro_eyebrow,
        accommodation_eyebrow: form.accommodation_eyebrow,
        experiences_eyebrow: form.experiences_eyebrow,
        dining_eyebrow: form.dining_eyebrow,
        dining_heading: form.dining_heading,
        dining_body: form.dining_body,
        cta_heading: form.cta_heading,
        cta_subheading: form.cta_subheading,
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Introduction */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Introduction Section</h3>
        <div>
          <label className="label">Eyebrow label (small text above heading)</label>
          <input className="input" value={form.intro_eyebrow} onChange={(e) => set('intro_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.section_1_title} onChange={(e) => set('section_1_title', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.section_1_text} onChange={(e) => set('section_1_text', e.target.value)} />
        </div>
        <ImagePicker label="Image" value={form.section_1_image_url} onChange={(v) => set('section_1_image_url', v)} />
      </section>

      {/* Accommodation */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Accommodation Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.accommodation_eyebrow} onChange={(e) => set('accommodation_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.section_2_title} onChange={(e) => set('section_2_title', e.target.value)} />
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Experiences Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.experiences_eyebrow} onChange={(e) => set('experiences_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.section_3_title} onChange={(e) => set('section_3_title', e.target.value)} />
        </div>
      </section>

      {/* Dining */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dining Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.dining_eyebrow} onChange={(e) => set('dining_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.dining_heading} onChange={(e) => set('dining_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={3} value={form.dining_body} onChange={(e) => set('dining_body', e.target.value)} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Call to Action (bottom)</h3>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.cta_heading} onChange={(e) => set('cta_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Subheading</label>
          <input className="input" value={form.cta_subheading} onChange={(e) => set('cta_subheading', e.target.value)} />
        </div>
      </section>

      {/* Custom sections */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Custom Sections</h3>
        <CustomSections sections={customSections} onChange={setCustomSections} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && <span className="text-green-400 text-sm">Saved</span>}
      </div>
    </form>
  )
}

// ─── Generic page form (hero + custom sections) ───────────
function GenericPageForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      ...form,
      extra_content: {
        ...(data.extra_content || {}),
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hero Section</h3>
        <div>
          <label className="label">Page Title</label>
          <input className="input" value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} />
        </div>
        <div>
          <label className="label">Subtitle / Description</label>
          <textarea className="input" rows={2} value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} />
        </div>
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} />
      </section>

      {/* Custom sections */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Page Sections</h3>
        <CustomSections sections={customSections} onChange={setCustomSections} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && <span className="text-green-400 text-sm">Saved</span>}
      </div>
    </form>
  )
}

// ─── Page detail panel ───────────────────────────────────
function PageDetail({ pageName }) {
  const { data, isLoading } = useAdminPageContent(pageName)
  const update = useUpdatePageContent()
  const [saved, setSaved] = useState(false)

  async function handleSave(payload) {
    await update.mutateAsync(payload)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (isLoading) return <div className="p-6 text-slate-400">Loading...</div>
  if (!data) return <div className="p-6 text-slate-400">No content found for this page. Run the seed SQL first.</div>

  if (pageName === 'home') {
    return (
      <HomeForm
        data={data}
        onSave={handleSave}
        saving={update.isPending}
        saved={saved}
      />
    )
  }

  return (
    <GenericPageForm
      data={data}
      onSave={handleSave}
      saving={update.isPending}
      saved={saved}
    />
  )
}

// ─── Main Pages Editor ────────────────────────────────────
export default function PagesEditor() {
  const { data: pages } = useAdminAllPageContent()
  const [selected, setSelected] = useState('home')

  const pageList = pages
    ? pages.sort((a, b) => {
        const order = ['home', 'rooms', 'gallery', 'amenities', 'experiences', 'dining', 'area', 'hotel']
        return order.indexOf(a.page_name) - order.indexOf(b.page_name)
      })
    : Object.keys(PAGE_LABELS).map(k => ({ page_name: k }))

  return (
    <div className="flex min-h-full">
      {/* Page list sidebar */}
      <aside className="w-44 border-r border-slate-700 bg-slate-800/50 flex-shrink-0 py-6">
        <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Pages</h2>
        <nav className="space-y-0.5 px-2">
          {pageList.map((page) => (
            <button
              key={page.page_name}
              onClick={() => setSelected(page.page_name)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selected === page.page_name
                  ? 'bg-gold text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {PAGE_LABELS[page.page_name] || page.page_name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Editor area */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-xl font-semibold text-white mb-1">
          {PAGE_LABELS[selected] || selected} Page
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Changes are saved to Supabase and appear live on the website.
        </p>

        <PageDetail pageName={selected} />
      </div>
    </div>
  )
}
