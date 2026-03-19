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
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
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
    seo_title: extra.seo_title || '',
    seo_description: extra.seo_description || '',
    seo_og_image: extra.seo_og_image || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
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
        seo_title: ex.seo_title || '',
        seo_description: ex.seo_description || '',
        seo_og_image: ex.seo_og_image || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
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
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_og_image: form.seo_og_image,
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero */}
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

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides the page title and description shown in Google. Leave blank to use the page heading as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(shown in Google, ~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. Seagonia Hotel — Boutique Hotel in Paleros, Greece" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(shown in Google, ~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. A boutique 58-room hotel in Pogonia village overlooking the Ionian Sea near Paleros, Greece." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when sharing on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
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

// ─── Dining page form ─────────────────────────────────────
function DiningForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    galia_eyebrow: extra.galia_eyebrow || 'ROOFTOP DINING',
    galia_heading: extra.galia_heading || 'Galiá Restaurant',
    galia_body: extra.galia_body || '',
    lounge_eyebrow: extra.lounge_eyebrow || 'ALL-DAY DINING',
    lounge_heading: extra.lounge_heading || 'Seagonia Lounge',
    lounge_body: extra.lounge_body || '',
    farm_eyebrow: extra.farm_eyebrow || 'FROM OUR LAND',
    farm_heading: extra.farm_heading || 'Farm to Table',
    farm_body: extra.farm_body || '',
    cooking_eyebrow: extra.cooking_eyebrow || 'HANDS-ON',
    cooking_heading: extra.cooking_heading || 'Cooking Classes',
    cooking_body: extra.cooking_body || '',
    seo_title: extra.seo_title || '',
    seo_description: extra.seo_description || '',
    seo_og_image: extra.seo_og_image || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
        galia_eyebrow: ex.galia_eyebrow || 'ROOFTOP DINING',
        galia_heading: ex.galia_heading || 'Galiá Restaurant',
        galia_body: ex.galia_body || '',
        lounge_eyebrow: ex.lounge_eyebrow || 'ALL-DAY DINING',
        lounge_heading: ex.lounge_heading || 'Seagonia Lounge',
        lounge_body: ex.lounge_body || '',
        farm_eyebrow: ex.farm_eyebrow || 'FROM OUR LAND',
        farm_heading: ex.farm_heading || 'Farm to Table',
        farm_body: ex.farm_body || '',
        cooking_eyebrow: ex.cooking_eyebrow || 'HANDS-ON',
        cooking_heading: ex.cooking_heading || 'Cooking Classes',
        cooking_body: ex.cooking_body || '',
        seo_title: ex.seo_title || '',
        seo_description: ex.seo_description || '',
        seo_og_image: ex.seo_og_image || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
      extra_content: {
        ...(data.extra_content || {}),
        galia_eyebrow: form.galia_eyebrow,
        galia_heading: form.galia_heading,
        galia_body: form.galia_body,
        lounge_eyebrow: form.lounge_eyebrow,
        lounge_heading: form.lounge_heading,
        lounge_body: form.lounge_body,
        farm_eyebrow: form.farm_eyebrow,
        farm_heading: form.farm_heading,
        farm_body: form.farm_body,
        cooking_eyebrow: form.cooking_eyebrow,
        cooking_heading: form.cooking_heading,
        cooking_body: form.cooking_body,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_og_image: form.seo_og_image,
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero */}
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

      {/* Galiá Restaurant */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Galiá Restaurant</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.galia_eyebrow} onChange={(e) => set('galia_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.galia_heading} onChange={(e) => set('galia_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.galia_body} onChange={(e) => set('galia_body', e.target.value)} />
        </div>
      </section>

      {/* Seagonia Lounge */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Seagonia Lounge</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.lounge_eyebrow} onChange={(e) => set('lounge_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.lounge_heading} onChange={(e) => set('lounge_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.lounge_body} onChange={(e) => set('lounge_body', e.target.value)} />
        </div>
      </section>

      {/* Farm to Table */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Farm to Table</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.farm_eyebrow} onChange={(e) => set('farm_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.farm_heading} onChange={(e) => set('farm_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.farm_body} onChange={(e) => set('farm_body', e.target.value)} />
        </div>
      </section>

      {/* Cooking Classes */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Cooking Classes</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.cooking_eyebrow} onChange={(e) => set('cooking_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.cooking_heading} onChange={(e) => set('cooking_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.cooking_body} onChange={(e) => set('cooking_body', e.target.value)} />
        </div>
      </section>

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides what Google shows. Leave blank to use the hero title/subtitle as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. Dining at Seagonia Hotel — Galiá Restaurant & Lounge" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. Discover the dining experiences at Seagonia Hotel." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
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

// ─── Hotel (About) page form ──────────────────────────────
function HotelForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    welcome_eyebrow: extra.welcome_eyebrow || 'Welcome',
    welcome_heading: extra.welcome_heading || 'About Seagonia Hotel',
    welcome_body: extra.welcome_body || '',
    pool_heading: extra.pool_heading || 'Pool & Multipurpose Room',
    pool_body: extra.pool_body || '',
    seo_title: extra.seo_title || '',
    seo_description: extra.seo_description || '',
    seo_og_image: extra.seo_og_image || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
        welcome_eyebrow: ex.welcome_eyebrow || 'Welcome',
        welcome_heading: ex.welcome_heading || 'About Seagonia Hotel',
        welcome_body: ex.welcome_body || '',
        pool_heading: ex.pool_heading || 'Pool & Multipurpose Room',
        pool_body: ex.pool_body || '',
        seo_title: ex.seo_title || '',
        seo_description: ex.seo_description || '',
        seo_og_image: ex.seo_og_image || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
      extra_content: {
        ...(data.extra_content || {}),
        welcome_eyebrow: form.welcome_eyebrow,
        welcome_heading: form.welcome_heading,
        welcome_body: form.welcome_body,
        pool_heading: form.pool_heading,
        pool_body: form.pool_body,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_og_image: form.seo_og_image,
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero */}
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

      {/* Welcome Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Welcome Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.welcome_eyebrow} onChange={(e) => set('welcome_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.welcome_heading} onChange={(e) => set('welcome_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.welcome_body} onChange={(e) => set('welcome_body', e.target.value)} />
        </div>
      </section>

      {/* Pool & Multipurpose Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pool & Multipurpose Section</h3>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.pool_heading} onChange={(e) => set('pool_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.pool_body} onChange={(e) => set('pool_body', e.target.value)} />
        </div>
      </section>

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides what Google shows. Leave blank to use the hero title/subtitle as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. Seagonia Hotel — Boutique Hotel in Paleros, Greece" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. Discover Seagonia Hotel — 58 rooms, 4 pools, rooftop dining on the Ionian coast." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
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

// ─── Area page form ───────────────────────────────────────
function AreaForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    location_eyebrow: extra.location_eyebrow || 'Location',
    location_heading: extra.location_heading || 'The Area',
    location_body: extra.location_body || '',
    explore_eyebrow: extra.explore_eyebrow || 'Explore',
    explore_heading: extra.explore_heading || 'The Little Ionian',
    explore_body: extra.explore_body || '',
    seo_title: extra.seo_title || '',
    seo_description: extra.seo_description || '',
    seo_og_image: extra.seo_og_image || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
        location_eyebrow: ex.location_eyebrow || 'Location',
        location_heading: ex.location_heading || 'The Area',
        location_body: ex.location_body || '',
        explore_eyebrow: ex.explore_eyebrow || 'Explore',
        explore_heading: ex.explore_heading || 'The Little Ionian',
        explore_body: ex.explore_body || '',
        seo_title: ex.seo_title || '',
        seo_description: ex.seo_description || '',
        seo_og_image: ex.seo_og_image || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
      extra_content: {
        ...(data.extra_content || {}),
        location_eyebrow: form.location_eyebrow,
        location_heading: form.location_heading,
        location_body: form.location_body,
        explore_eyebrow: form.explore_eyebrow,
        explore_heading: form.explore_heading,
        explore_body: form.explore_body,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_og_image: form.seo_og_image,
        custom_sections: customSections,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero */}
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

      {/* Location Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Location Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.location_eyebrow} onChange={(e) => set('location_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.location_heading} onChange={(e) => set('location_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.location_body} onChange={(e) => set('location_body', e.target.value)} />
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Explore Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.explore_eyebrow} onChange={(e) => set('explore_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.explore_heading} onChange={(e) => set('explore_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.explore_body} onChange={(e) => set('explore_body', e.target.value)} />
        </div>
      </section>

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides what Google shows. Leave blank to use the hero title/subtitle as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. The Area — Seagonia Hotel near Paleros, Ionian Coast" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. Discover the area around Seagonia Hotel in Pogonia, near Paleros." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
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
    seo_title: extra.seo_title || '',
    seo_description: extra.seo_description || '',
    seo_og_image: extra.seo_og_image || '',
  })
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])

  useEffect(() => {
    if (data) {
      const ex = data.extra_content || {}
      setForm({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image_url: data.hero_image_url || '',
        seo_title: ex.seo_title || '',
        seo_description: ex.seo_description || '',
        seo_og_image: ex.seo_og_image || '',
      })
      setCustomSections(ex.custom_sections || [])
    }
  }, [data])

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      id: data.id,
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
      hero_image_url: form.hero_image_url,
      extra_content: {
        ...(data.extra_content || {}),
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_og_image: form.seo_og_image,
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

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides what Google shows. Leave blank to use the hero title/subtitle as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. Rooms at Seagonia Hotel — Ionian Coast, Greece" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. Explore our 58 rooms across 6 unique types overlooking the Ionian Sea." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
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

  if (pageName === 'dining') {
    return (
      <DiningForm
        data={data}
        onSave={handleSave}
        saving={update.isPending}
        saved={saved}
      />
    )
  }

  if (pageName === 'hotel') {
    return (
      <HotelForm
        data={data}
        onSave={handleSave}
        saving={update.isPending}
        saved={saved}
      />
    )
  }

  if (pageName === 'area') {
    return (
      <AreaForm
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
