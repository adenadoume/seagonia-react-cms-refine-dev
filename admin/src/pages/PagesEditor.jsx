import { useState, useEffect } from 'react'
import { useAdminAllPageContent, useAdminPageContent, useUpdatePageContent } from '../hooks/useAdmin'
import ImagePicker from '../components/ImagePicker'

const PAGE_LABELS = {
  home: 'Home',
  rooms: 'Accommodation',
  gallery: 'Gallery',
  amenities: 'Amenities',
  experiences: 'Activities',
  dining: 'Dining',
  area: 'Area',
  hotel: 'The Hotel',
  'ionian-escape': 'Ionian Escape',
  wellness: 'Wellness',
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
    exp_1_title: extra.exp_1_title || 'Boat Trips',
    exp_1_image: extra.exp_1_image || '',
    exp_2_title: extra.exp_2_title || 'Cooking Classes',
    exp_2_image: extra.exp_2_image || '',
    exp_3_title: extra.exp_3_title || 'Yoga & Wellness',
    exp_3_image: extra.exp_3_image || '',
    exp_4_title: extra.exp_4_title || 'Spa & Massage',
    exp_4_image: extra.exp_4_image || '',
    exp_5_title: extra.exp_5_title || 'Hiking & History',
    exp_5_image: extra.exp_5_image || '',
    exp_6_title: extra.exp_6_title || 'Wine & Dining',
    exp_6_image: extra.exp_6_image || '',
    dining_eyebrow: extra.dining_eyebrow || 'Dining',
    dining_heading: extra.dining_heading || '',
    dining_body: extra.dining_body || '',
    dining_image: extra.dining_image || '',
    area_image: extra.area_image || '',
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
        exp_1_title: ex.exp_1_title || 'Boat Trips',
        exp_1_image: ex.exp_1_image || '',
        exp_2_title: ex.exp_2_title || 'Cooking Classes',
        exp_2_image: ex.exp_2_image || '',
        exp_3_title: ex.exp_3_title || 'Yoga & Wellness',
        exp_3_image: ex.exp_3_image || '',
        exp_4_title: ex.exp_4_title || 'Spa & Massage',
        exp_4_image: ex.exp_4_image || '',
        exp_5_title: ex.exp_5_title || 'Hiking & History',
        exp_5_image: ex.exp_5_image || '',
        exp_6_title: ex.exp_6_title || 'Wine & Dining',
        exp_6_image: ex.exp_6_image || '',
        dining_eyebrow: ex.dining_eyebrow || 'Dining',
        dining_heading: ex.dining_heading || '',
        dining_body: ex.dining_body || '',
        dining_image: ex.dining_image || '',
        area_image: ex.area_image || '',
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
        exp_1_title: form.exp_1_title,
        exp_1_image: form.exp_1_image,
        exp_2_title: form.exp_2_title,
        exp_2_image: form.exp_2_image,
        exp_3_title: form.exp_3_title,
        exp_3_image: form.exp_3_image,
        exp_4_title: form.exp_4_title,
        exp_4_image: form.exp_4_image,
        exp_5_title: form.exp_5_title,
        exp_5_image: form.exp_5_image,
        exp_6_title: form.exp_6_title,
        exp_6_image: form.exp_6_image,
        dining_eyebrow: form.dining_eyebrow,
        dining_heading: form.dining_heading,
        dining_body: form.dining_body,
        dining_image: form.dining_image,
        area_image: form.area_image,
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-000.jpg" />
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
        <ImagePicker label="Image" value={form.section_1_image_url} onChange={(v) => set('section_1_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-028.jpg" />
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
        <p className="text-slate-500 text-xs pt-2">Experience Grid Items (6 tiles)</p>
        {[
          { n: 1, fallback: 'img-073' },
          { n: 2, fallback: 'img-055' },
          { n: 3, fallback: 'img-034' },
          { n: 4, fallback: 'img-036' },
          { n: 5, fallback: 'img-076' },
          { n: 6, fallback: 'img-048' },
        ].map(({ n, fallback }) => (
          <div key={n} className="bg-slate-700/50 rounded p-4 space-y-3">
            <p className="text-slate-400 text-xs font-semibold">Item {n}</p>
            <div>
              <label className="label">Title</label>
              <input className="input" value={form[`exp_${n}_title`]} onChange={(e) => set(`exp_${n}_title`, e.target.value)} />
            </div>
            <ImagePicker label="Image" value={form[`exp_${n}_image`]} onChange={(v) => set(`exp_${n}_image`, v)} fallbackSrc={`https://seagonia.vercel.app/images/hotel/${fallback}.jpg`} />
          </div>
        ))}
      </section>

      {/* Area teaser */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Area Teaser Section</h3>
        <ImagePicker label="Background Image" value={form.area_image} onChange={(v) => set('area_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-001.jpg" />
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
        <ImagePicker label="Background Image" value={form.dining_image} onChange={(v) => set('dining_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-038.jpg" />
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
        <ImagePicker label="OG Share Image (shown when sharing on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-000.jpg" />
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
    galia_image_1: extra.galia_image_1 || '',
    galia_image_2: extra.galia_image_2 || '',
    galia_image_3: extra.galia_image_3 || '',
    lounge_eyebrow: extra.lounge_eyebrow || 'ALL-DAY DINING',
    lounge_heading: extra.lounge_heading || 'Seagonia Lounge',
    lounge_body: extra.lounge_body || '',
    lounge_image_1: extra.lounge_image_1 || '',
    lounge_image_2: extra.lounge_image_2 || '',
    lounge_image_3: extra.lounge_image_3 || '',
    lounge_image_4: extra.lounge_image_4 || '',
    farm_eyebrow: extra.farm_eyebrow || 'FROM OUR LAND',
    farm_heading: extra.farm_heading || 'Farm to Table',
    farm_body: extra.farm_body || '',
    farm_image_1: extra.farm_image_1 || '',
    farm_image_2: extra.farm_image_2 || '',
    farm_image_3: extra.farm_image_3 || '',
    farm_image_4: extra.farm_image_4 || '',
    yacht_eyebrow: extra.yacht_eyebrow || 'PALEROS HARBOUR',
    yacht_heading: extra.yacht_heading || 'Yacht Club',
    yacht_body: extra.yacht_body || '',
    yacht_image_1: extra.yacht_image_1 || '',
    yacht_image_2: extra.yacht_image_2 || '',
    yacht_image_3: extra.yacht_image_3 || '',
    yacht_image_4: extra.yacht_image_4 || '',
    yacht_image_5: extra.yacht_image_5 || '',
    yacht_image_6: extra.yacht_image_6 || '',
    cooking_eyebrow: extra.cooking_eyebrow || 'HANDS-ON',
    cooking_heading: extra.cooking_heading || 'Cooking Classes',
    cooking_body: extra.cooking_body || '',
    cooking_image_1: extra.cooking_image_1 || '',
    cooking_image_2: extra.cooking_image_2 || '',
    beekeeping_eyebrow: extra.beekeeping_eyebrow || 'EXPERIENCE',
    beekeeping_heading: extra.beekeeping_heading || 'Honey Harvesting & Beekeeping',
    beekeeping_body: extra.beekeeping_body || '',
    beekeeping_image_1: extra.beekeeping_image_1 || '',
    beekeeping_image_2: extra.beekeeping_image_2 || '',
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
        galia_image_1: ex.galia_image_1 || '',
        galia_image_2: ex.galia_image_2 || '',
        galia_image_3: ex.galia_image_3 || '',
        lounge_eyebrow: ex.lounge_eyebrow || 'ALL-DAY DINING',
        lounge_heading: ex.lounge_heading || 'Seagonia Lounge',
        lounge_body: ex.lounge_body || '',
        lounge_image_1: ex.lounge_image_1 || '',
        lounge_image_2: ex.lounge_image_2 || '',
        lounge_image_3: ex.lounge_image_3 || '',
        lounge_image_4: ex.lounge_image_4 || '',
        farm_eyebrow: ex.farm_eyebrow || 'FROM OUR LAND',
        farm_heading: ex.farm_heading || 'Farm to Table',
        farm_body: ex.farm_body || '',
        farm_image_1: ex.farm_image_1 || '',
        farm_image_2: ex.farm_image_2 || '',
        farm_image_3: ex.farm_image_3 || '',
        farm_image_4: ex.farm_image_4 || '',
        yacht_eyebrow: ex.yacht_eyebrow || 'PALEROS HARBOUR',
        yacht_heading: ex.yacht_heading || 'Yacht Club',
        yacht_body: ex.yacht_body || '',
        yacht_image_1: ex.yacht_image_1 || '',
        yacht_image_2: ex.yacht_image_2 || '',
        yacht_image_3: ex.yacht_image_3 || '',
        yacht_image_4: ex.yacht_image_4 || '',
        yacht_image_5: ex.yacht_image_5 || '',
        yacht_image_6: ex.yacht_image_6 || '',
        cooking_eyebrow: ex.cooking_eyebrow || 'HANDS-ON',
        cooking_heading: ex.cooking_heading || 'Cooking Classes',
        cooking_body: ex.cooking_body || '',
        cooking_image_1: ex.cooking_image_1 || '',
        cooking_image_2: ex.cooking_image_2 || '',
        beekeeping_eyebrow: ex.beekeeping_eyebrow || 'EXPERIENCE',
        beekeeping_heading: ex.beekeeping_heading || 'Honey Harvesting & Beekeeping',
        beekeeping_body: ex.beekeeping_body || '',
        beekeeping_image_1: ex.beekeeping_image_1 || '',
        beekeeping_image_2: ex.beekeeping_image_2 || '',
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
        galia_image_1: form.galia_image_1,
        galia_image_2: form.galia_image_2,
        galia_image_3: form.galia_image_3,
        lounge_eyebrow: form.lounge_eyebrow,
        lounge_heading: form.lounge_heading,
        lounge_body: form.lounge_body,
        lounge_image_1: form.lounge_image_1,
        lounge_image_2: form.lounge_image_2,
        lounge_image_3: form.lounge_image_3,
        lounge_image_4: form.lounge_image_4,
        farm_eyebrow: form.farm_eyebrow,
        farm_heading: form.farm_heading,
        farm_body: form.farm_body,
        farm_image_1: form.farm_image_1,
        farm_image_2: form.farm_image_2,
        farm_image_3: form.farm_image_3,
        farm_image_4: form.farm_image_4,
        yacht_eyebrow: form.yacht_eyebrow,
        yacht_heading: form.yacht_heading,
        yacht_body: form.yacht_body,
        yacht_image_1: form.yacht_image_1,
        yacht_image_2: form.yacht_image_2,
        yacht_image_3: form.yacht_image_3,
        yacht_image_4: form.yacht_image_4,
        yacht_image_5: form.yacht_image_5,
        yacht_image_6: form.yacht_image_6,
        cooking_eyebrow: form.cooking_eyebrow,
        cooking_heading: form.cooking_heading,
        cooking_body: form.cooking_body,
        cooking_image_1: form.cooking_image_1,
        cooking_image_2: form.cooking_image_2,
        beekeeping_eyebrow: form.beekeeping_eyebrow,
        beekeeping_heading: form.beekeeping_heading,
        beekeeping_body: form.beekeeping_body,
        beekeeping_image_1: form.beekeeping_image_1,
        beekeeping_image_2: form.beekeeping_image_2,
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-038.jpg" />
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
        <ImagePicker label="Image 1 (main large)" value={form.galia_image_1} onChange={(v) => set('galia_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-038.jpg" />
        <ImagePicker label="Image 2 (small left)" value={form.galia_image_2} onChange={(v) => set('galia_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-037.jpg" />
        <ImagePicker label="Image 3 (small right)" value={form.galia_image_3} onChange={(v) => set('galia_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-041.jpg" />
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
        <ImagePicker label="Image 1 (top left)" value={form.lounge_image_1} onChange={(v) => set('lounge_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-017.jpg" />
        <ImagePicker label="Image 2 (top right)" value={form.lounge_image_2} onChange={(v) => set('lounge_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-042.jpg" />
        <ImagePicker label="Image 3 (bottom left)" value={form.lounge_image_3} onChange={(v) => set('lounge_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-041.jpg" />
        <ImagePicker label="Image 4 (bottom right)" value={form.lounge_image_4} onChange={(v) => set('lounge_image_4', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-043.jpg" />
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
        <ImagePicker label="Image 1 (lettuce)" value={form.farm_image_1} onChange={(v) => set('farm_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-044.jpg" />
        <ImagePicker label="Image 2 (flowers)" value={form.farm_image_2} onChange={(v) => set('farm_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-046.jpg" />
        <ImagePicker label="Image 3 (tractor)" value={form.farm_image_3} onChange={(v) => set('farm_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-045.jpg" />
        <ImagePicker label="Image 4 (field)" value={form.farm_image_4} onChange={(v) => set('farm_image_4', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-054.jpg" />
      </section>

      {/* Yacht Club */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Yacht Club</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.yacht_eyebrow} onChange={(e) => set('yacht_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.yacht_heading} onChange={(e) => set('yacht_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.yacht_body} onChange={(e) => set('yacht_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (main large)" value={form.yacht_image_1} onChange={(v) => set('yacht_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-049.jpg" />
        <ImagePicker label="Image 2 (row 2 left)" value={form.yacht_image_2} onChange={(v) => set('yacht_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-048.jpg" />
        <ImagePicker label="Image 3 (row 2 right)" value={form.yacht_image_3} onChange={(v) => set('yacht_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-051.jpg" />
        <ImagePicker label="Image 4 (row 3 left)" value={form.yacht_image_4} onChange={(v) => set('yacht_image_4', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-050.jpg" />
        <ImagePicker label="Image 5 (row 3 center)" value={form.yacht_image_5} onChange={(v) => set('yacht_image_5', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-039.jpg" />
        <ImagePicker label="Image 6 (row 3 right)" value={form.yacht_image_6} onChange={(v) => set('yacht_image_6', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-048.jpg" />
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
        <ImagePicker label="Image 1 (making phyllo)" value={form.cooking_image_1} onChange={(v) => set('cooking_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-055.jpg" />
        <ImagePicker label="Image 2 (baked result)" value={form.cooking_image_2} onChange={(v) => set('cooking_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-059.jpg" />
      </section>

      {/* Beekeeping */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Honey Harvesting & Beekeeping</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.beekeeping_eyebrow} onChange={(e) => set('beekeeping_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.beekeeping_heading} onChange={(e) => set('beekeeping_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.beekeeping_body} onChange={(e) => set('beekeeping_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (beekeeper)" value={form.beekeeping_image_1} onChange={(v) => set('beekeeping_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-060.jpg" />
        <ImagePicker label="Image 2 (honeycomb)" value={form.beekeeping_image_2} onChange={(v) => set('beekeeping_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-061.jpg" />
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
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-038.jpg" />
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
    welcome_image: extra.welcome_image || '',
    pool_heading: extra.pool_heading || 'Pool & Multipurpose Room',
    pool_body: extra.pool_body || '',
    pool_image: extra.pool_image || '',
    aerial_image_1: extra.aerial_image_1 || '',
    aerial_image_2: extra.aerial_image_2 || '',
    aerial_caption: extra.aerial_caption || '80 metres from the beach, surrounded by nature',
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
        welcome_image: ex.welcome_image || '',
        pool_heading: ex.pool_heading || 'Pool & Multipurpose Room',
        pool_body: ex.pool_body || '',
        pool_image: ex.pool_image || '',
        aerial_image_1: ex.aerial_image_1 || '',
        aerial_image_2: ex.aerial_image_2 || '',
        aerial_caption: ex.aerial_caption || '80 metres from the beach, surrounded by nature',
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
        welcome_image: form.welcome_image,
        pool_heading: form.pool_heading,
        pool_body: form.pool_body,
        pool_image: form.pool_image,
        aerial_image_1: form.aerial_image_1,
        aerial_image_2: form.aerial_image_2,
        aerial_caption: form.aerial_caption,
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-028.jpg" />
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
        <ImagePicker label="Image" value={form.welcome_image} onChange={(v) => set('welcome_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-015.jpg" />
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
        <ImagePicker label="Pool Image" value={form.pool_image} onChange={(v) => set('pool_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-031.jpg" />
      </section>

      {/* Aerial Views Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Aerial Views Section</h3>
        <ImagePicker label="Image 1 (aerial beach)" value={form.aerial_image_1} onChange={(v) => set('aerial_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-016.jpg" />
        <ImagePicker label="Image 2 (bird's eye)" value={form.aerial_image_2} onChange={(v) => set('aerial_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-017.jpg" />
        <div>
          <label className="label">Caption</label>
          <input className="input" value={form.aerial_caption} onChange={(e) => set('aerial_caption', e.target.value)} />
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
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-028.jpg" />
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
    location_image: extra.location_image || '',
    explore_eyebrow: extra.explore_eyebrow || 'Explore',
    explore_heading: extra.explore_heading || 'The Little Ionian',
    explore_body: extra.explore_body || '',
    explore_image: extra.explore_image || '',
    village_eyebrow: extra.village_eyebrow || 'VILLAGE',
    village_heading: extra.village_heading || 'Pogonia',
    village_body: extra.village_body || '',
    village_image_1: extra.village_image_1 || '',
    village_image_2: extra.village_image_2 || '',
    village_image_3: extra.village_image_3 || '',
    paleros_eyebrow: extra.paleros_eyebrow || 'Nearby Town',
    paleros_heading: extra.paleros_heading || 'Paleros',
    paleros_body: extra.paleros_body || '',
    paleros_image_1: extra.paleros_image_1 || '',
    paleros_image_2: extra.paleros_image_2 || '',
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
        location_image: ex.location_image || '',
        explore_eyebrow: ex.explore_eyebrow || 'Explore',
        explore_heading: ex.explore_heading || 'The Little Ionian',
        explore_body: ex.explore_body || '',
        explore_image: ex.explore_image || '',
        village_eyebrow: ex.village_eyebrow || 'VILLAGE',
        village_heading: ex.village_heading || 'Pogonia',
        village_body: ex.village_body || '',
        village_image_1: ex.village_image_1 || '',
        village_image_2: ex.village_image_2 || '',
        village_image_3: ex.village_image_3 || '',
        paleros_eyebrow: ex.paleros_eyebrow || 'Nearby Town',
        paleros_heading: ex.paleros_heading || 'Paleros',
        paleros_body: ex.paleros_body || '',
        paleros_image_1: ex.paleros_image_1 || '',
        paleros_image_2: ex.paleros_image_2 || '',
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
        location_image: form.location_image,
        explore_eyebrow: form.explore_eyebrow,
        explore_heading: form.explore_heading,
        explore_body: form.explore_body,
        explore_image: form.explore_image,
        village_eyebrow: form.village_eyebrow,
        village_heading: form.village_heading,
        village_body: form.village_body,
        village_image_1: form.village_image_1,
        village_image_2: form.village_image_2,
        village_image_3: form.village_image_3,
        paleros_eyebrow: form.paleros_eyebrow,
        paleros_heading: form.paleros_heading,
        paleros_body: form.paleros_body,
        paleros_image_1: form.paleros_image_1,
        paleros_image_2: form.paleros_image_2,
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-001.jpg" />
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
        <ImagePicker label="Image" value={form.location_image} onChange={(v) => set('location_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-001.jpg" />
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
        <ImagePicker label="Image" value={form.explore_image} onChange={(v) => set('explore_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-003.jpg" />
      </section>

      {/* Village (Pogonia) Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Village (Pogonia) Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.village_eyebrow} onChange={(e) => set('village_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.village_heading} onChange={(e) => set('village_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.village_body} onChange={(e) => set('village_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (village from above)" value={form.village_image_1} onChange={(v) => set('village_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-005.jpg" />
        <ImagePicker label="Image 2 (beach with sunbeds)" value={form.village_image_2} onChange={(v) => set('village_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-006.jpg" />
        <ImagePicker label="Image 3 (taverna sea view)" value={form.village_image_3} onChange={(v) => set('village_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-007.jpg" />
      </section>

      {/* Paleros Section */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Paleros Section</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.paleros_eyebrow} onChange={(e) => set('paleros_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.paleros_heading} onChange={(e) => set('paleros_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.paleros_body} onChange={(e) => set('paleros_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (promenade)" value={form.paleros_image_1} onChange={(v) => set('paleros_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-010.jpg" />
        <ImagePicker label="Image 2 (wine & dining)" value={form.paleros_image_2} onChange={(v) => set('paleros_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-011.jpg" />
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
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-001.jpg" />
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

// ─── Experiences page form ────────────────────────────────
function ExperiencesForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const [form, setForm] = useState({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    wellness_eyebrow: extra.wellness_eyebrow || 'WELLNESS',
    wellness_heading: extra.wellness_heading || 'Outdoor Massage & PURE Spa',
    wellness_body: extra.wellness_body || '',
    wellness_image_1: extra.wellness_image_1 || '',
    wellness_image_2: extra.wellness_image_2 || '',
    fitness_eyebrow: extra.fitness_eyebrow || 'MOVEMENT',
    fitness_heading: extra.fitness_heading || 'Outdoor Shaded & Indoor Fitness',
    fitness_body: extra.fitness_body || '',
    fitness_image_1: extra.fitness_image_1 || '',
    fitness_image_2: extra.fitness_image_2 || '',
    fitness_image_3: extra.fitness_image_3 || '',
    beach_eyebrow: extra.beach_eyebrow || 'THE BEACH',
    beach_heading: extra.beach_heading || 'Open Water Swimming',
    beach_body: extra.beach_body || '',
    beach_image: extra.beach_image || '',
    boating_eyebrow: extra.boating_eyebrow || 'EXPLORE',
    boating_heading: extra.boating_heading || 'Explore the Ionian Islands by Boat',
    boating_body: extra.boating_body || '',
    boating_image_1: extra.boating_image_1 || '',
    boating_image_2: extra.boating_image_2 || '',
    boating_image_3: extra.boating_image_3 || '',
    boating_image_4: extra.boating_image_4 || '',
    hiking_eyebrow: extra.hiking_eyebrow || 'ADVENTURE',
    hiking_heading: extra.hiking_heading || 'History & Hiking',
    hiking_intro: extra.hiking_intro || '',
    hiking_bullet_1: extra.hiking_bullet_1 || '',
    hiking_bullet_2: extra.hiking_bullet_2 || '',
    hiking_image_1: extra.hiking_image_1 || '',
    hiking_image_2: extra.hiking_image_2 || '',
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
        wellness_eyebrow: ex.wellness_eyebrow || 'WELLNESS',
        wellness_heading: ex.wellness_heading || 'Outdoor Massage & PURE Spa',
        wellness_body: ex.wellness_body || '',
        wellness_image_1: ex.wellness_image_1 || '',
        wellness_image_2: ex.wellness_image_2 || '',
        fitness_eyebrow: ex.fitness_eyebrow || 'MOVEMENT',
        fitness_heading: ex.fitness_heading || 'Outdoor Shaded & Indoor Fitness',
        fitness_body: ex.fitness_body || '',
        fitness_image_1: ex.fitness_image_1 || '',
        fitness_image_2: ex.fitness_image_2 || '',
        fitness_image_3: ex.fitness_image_3 || '',
        beach_eyebrow: ex.beach_eyebrow || 'THE BEACH',
        beach_heading: ex.beach_heading || 'Open Water Swimming',
        beach_body: ex.beach_body || '',
        beach_image: ex.beach_image || '',
        boating_eyebrow: ex.boating_eyebrow || 'EXPLORE',
        boating_heading: ex.boating_heading || 'Explore the Ionian Islands by Boat',
        boating_body: ex.boating_body || '',
        boating_image_1: ex.boating_image_1 || '',
        boating_image_2: ex.boating_image_2 || '',
        boating_image_3: ex.boating_image_3 || '',
        boating_image_4: ex.boating_image_4 || '',
        hiking_eyebrow: ex.hiking_eyebrow || 'ADVENTURE',
        hiking_heading: ex.hiking_heading || 'History & Hiking',
        hiking_intro: ex.hiking_intro || '',
        hiking_bullet_1: ex.hiking_bullet_1 || '',
        hiking_bullet_2: ex.hiking_bullet_2 || '',
        hiking_image_1: ex.hiking_image_1 || '',
        hiking_image_2: ex.hiking_image_2 || '',
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
        wellness_eyebrow: form.wellness_eyebrow,
        wellness_heading: form.wellness_heading,
        wellness_body: form.wellness_body,
        wellness_image_1: form.wellness_image_1,
        wellness_image_2: form.wellness_image_2,
        fitness_eyebrow: form.fitness_eyebrow,
        fitness_heading: form.fitness_heading,
        fitness_body: form.fitness_body,
        fitness_image_1: form.fitness_image_1,
        fitness_image_2: form.fitness_image_2,
        fitness_image_3: form.fitness_image_3,
        beach_eyebrow: form.beach_eyebrow,
        beach_heading: form.beach_heading,
        beach_body: form.beach_body,
        beach_image: form.beach_image,
        boating_eyebrow: form.boating_eyebrow,
        boating_heading: form.boating_heading,
        boating_body: form.boating_body,
        boating_image_1: form.boating_image_1,
        boating_image_2: form.boating_image_2,
        boating_image_3: form.boating_image_3,
        boating_image_4: form.boating_image_4,
        hiking_eyebrow: form.hiking_eyebrow,
        hiking_heading: form.hiking_heading,
        hiking_intro: form.hiking_intro,
        hiking_bullet_1: form.hiking_bullet_1,
        hiking_bullet_2: form.hiking_bullet_2,
        hiking_image_1: form.hiking_image_1,
        hiking_image_2: form.hiking_image_2,
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-073.jpg" />
      </section>

      {/* Wellness */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Outdoor Massage & PURE Spa</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.wellness_eyebrow} onChange={(e) => set('wellness_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.wellness_heading} onChange={(e) => set('wellness_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.wellness_body} onChange={(e) => set('wellness_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (outdoor massage)" value={form.wellness_image_1} onChange={(v) => set('wellness_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-036.jpg" />
        <ImagePicker label="Image 2 (PURE Spa interior)" value={form.wellness_image_2} onChange={(v) => set('wellness_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-062.jpg" />
      </section>

      {/* Fitness */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Outdoor Shaded & Indoor Fitness</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.fitness_eyebrow} onChange={(e) => set('fitness_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.fitness_heading} onChange={(e) => set('fitness_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.fitness_body} onChange={(e) => set('fitness_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (outdoor fitness pavilion)" value={form.fitness_image_1} onChange={(v) => set('fitness_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-071.jpg" />
        <ImagePicker label="Image 2 (yoga group)" value={form.fitness_image_2} onChange={(v) => set('fitness_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-034.jpg" />
        <ImagePicker label="Image 3 (indoor gym)" value={form.fitness_image_3} onChange={(v) => set('fitness_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-072.jpg" />
      </section>

      {/* Open Water Swimming */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Open Water Swimming</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.beach_eyebrow} onChange={(e) => set('beach_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.beach_heading} onChange={(e) => set('beach_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.beach_body} onChange={(e) => set('beach_body', e.target.value)} />
        </div>
        <ImagePicker label="Image" value={form.beach_image} onChange={(v) => set('beach_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-015.jpg" />
      </section>

      {/* Boat Trips */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Explore by Boat</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.boating_eyebrow} onChange={(e) => set('boating_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.boating_heading} onChange={(e) => set('boating_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Body text</label>
          <textarea className="input" rows={4} value={form.boating_body} onChange={(e) => set('boating_body', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (island cliff beach)" value={form.boating_image_1} onChange={(v) => set('boating_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-073.jpg" />
        <ImagePicker label="Image 2 (island village)" value={form.boating_image_2} onChange={(v) => set('boating_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-074.jpg" />
        <ImagePicker label="Image 3 (dramatic coast)" value={form.boating_image_3} onChange={(v) => set('boating_image_3', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-075.jpg" />
        <ImagePicker label="Image 4 (Vathiavali beach)" value={form.boating_image_4} onChange={(v) => set('boating_image_4', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-012.jpg" />
      </section>

      {/* History & Hiking */}
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">History & Hiking</h3>
        <div>
          <label className="label">Eyebrow label</label>
          <input className="input" value={form.hiking_eyebrow} onChange={(e) => set('hiking_eyebrow', e.target.value)} />
        </div>
        <div>
          <label className="label">Heading</label>
          <input className="input" value={form.hiking_heading} onChange={(e) => set('hiking_heading', e.target.value)} />
        </div>
        <div>
          <label className="label">Intro paragraph</label>
          <textarea className="input" rows={3} value={form.hiking_intro} onChange={(e) => set('hiking_intro', e.target.value)} />
        </div>
        <div>
          <label className="label">Bullet 1</label>
          <textarea className="input" rows={3} value={form.hiking_bullet_1} onChange={(e) => set('hiking_bullet_1', e.target.value)} />
        </div>
        <div>
          <label className="label">Bullet 2</label>
          <textarea className="input" rows={3} value={form.hiking_bullet_2} onChange={(e) => set('hiking_bullet_2', e.target.value)} />
        </div>
        <ImagePicker label="Image 1 (hiking panoramic)" value={form.hiking_image_1} onChange={(v) => set('hiking_image_1', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-076.jpg" />
        <ImagePicker label="Image 2 (ancient ruins)" value={form.hiking_image_2} onChange={(v) => set('hiking_image_2', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-008.jpg" />
      </section>

      {/* SEO */}
      <section className="bg-slate-800 border border-gold/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wide">SEO — Search Engine</h3>
        <p className="text-slate-500 text-xs">Overrides what Google shows. Leave blank to use the hero title/subtitle as fallback.</p>
        <div>
          <label className="label">SEO Title <span className="text-slate-600 normal-case font-normal">(~60 chars)</span></label>
          <input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder="e.g. Experiences at Seagonia Hotel — Ionian Coast" />
          {form.seo_title && <p className={`text-xs mt-1 ${form.seo_title.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_title.length}/60 chars</p>}
        </div>
        <div>
          <label className="label">SEO Description <span className="text-slate-600 normal-case font-normal">(~155 chars)</span></label>
          <textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} placeholder="e.g. Explore unique experiences at Seagonia Hotel — wellness, fitness, boat trips, hiking and more." />
          {form.seo_description && <p className={`text-xs mt-1 ${form.seo_description.length > 155 ? 'text-amber-400' : 'text-slate-500'}`}>{form.seo_description.length}/155 chars</p>}
        </div>
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-073.jpg" />
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
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-000.jpg" />
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
        <ImagePicker label="OG Share Image (shown when shared on social / WhatsApp)" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} fallbackSrc="https://seagonia.vercel.app/images/hotel/img-000.jpg" />
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

// ─── Ionian Escape page form ──────────────────────────────
function IonianEscapeForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const makeState = (ex) => ({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    intro_body: ex.intro_body || '',
    intro_image_1: ex.intro_image_1 || '',
    intro_image_2: ex.intro_image_2 || '',
    intro_image_3: ex.intro_image_3 || '',
    tulio_eyebrow: ex.tulio_eyebrow || 'OUR FLEET',
    tulio_heading: ex.tulio_heading || 'Tulio Abbate',
    tulio_body: ex.tulio_body || '',
    tulio_image_1: ex.tulio_image_1 || '',
    tulio_image_2: ex.tulio_image_2 || '',
    tulio_image_3: ex.tulio_image_3 || '',
    ribco_eyebrow: ex.ribco_eyebrow || 'OUR FLEET',
    ribco_heading: ex.ribco_heading || 'The Ribco',
    ribco_body: ex.ribco_body || '',
    ribco_image_1: ex.ribco_image_1 || '',
    ribco_image_2: ex.ribco_image_2 || '',
    scorpion_eyebrow: ex.scorpion_eyebrow || 'OUR FLEET',
    scorpion_heading: ex.scorpion_heading || 'The Scorpion Rib',
    scorpion_body: ex.scorpion_body || '',
    scorpion_image_1: ex.scorpion_image_1 || '',
    scorpion_image_2: ex.scorpion_image_2 || '',
    destinations_eyebrow: ex.destinations_eyebrow || 'EXPLORE',
    destinations_heading: ex.destinations_heading || 'The Destinations',
    destinations_body: ex.destinations_body || '',
    destinations_image_1: ex.destinations_image_1 || '',
    destinations_image_2: ex.destinations_image_2 || '',
    destinations_image_3: ex.destinations_image_3 || '',
    destinations_image_4: ex.destinations_image_4 || '',
    destinations_image_5: ex.destinations_image_5 || '',
    destinations_image_6: ex.destinations_image_6 || '',
    seo_title: ex.seo_title || '',
    seo_description: ex.seo_description || '',
    seo_og_image: ex.seo_og_image || '',
  })
  const [form, setForm] = useState(() => makeState(extra))
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])
  useEffect(() => { if (data) { setForm(makeState(data.extra_content || {})); setCustomSections((data.extra_content || {}).custom_sections || []) } }, [data])
  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }
  function handleSubmit(e) {
    e.preventDefault()
    const { hero_title, hero_subtitle, hero_image_url, seo_title, seo_description, seo_og_image, ...rest } = form
    onSave({ id: data.id, hero_title, hero_subtitle, hero_image_url, extra_content: { ...(data.extra_content || {}), ...rest, seo_title, seo_description, seo_og_image, custom_sections: customSections } })
  }

  const FB = 'https://seagonia.vercel.app/images/ionian'
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hero Section</h3>
        <div><label className="label">Page Title</label><input className="input" value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} /></div>
        <div><label className="label">Subtitle</label><textarea className="input" rows={2} value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} /></div>
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc={`${FB}/ie-coast-aerial.jpg`} />
      </section>

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Introduction</h3>
        <div><label className="label">Body Text</label><textarea className="input" rows={5} value={form.intro_body} onChange={(e) => set('intro_body', e.target.value)} /></div>
        <ImagePicker label="Image 1" value={form.intro_image_1} onChange={(v) => set('intro_image_1', v)} fallbackSrc={`${FB}/ie-coast-aerial.jpg`} />
        <ImagePicker label="Image 2" value={form.intro_image_2} onChange={(v) => set('intro_image_2', v)} fallbackSrc={`${FB}/ie-beach-1.jpg`} />
        <ImagePicker label="Image 3" value={form.intro_image_3} onChange={(v) => set('intro_image_3', v)} fallbackSrc={`${FB}/ie-crystal-water.jpg`} />
      </section>

      {[
        { key: 'tulio', label: 'Tulio Abbate', imgs: ['tulio_image_1','tulio_image_2','tulio_image_3'], fbs: ['ie-tulio-above','ie-tulio-speeding','ie-tulio-cliff'] },
        { key: 'ribco', label: 'The Ribco', imgs: ['ribco_image_1','ribco_image_2'], fbs: ['ie-ribco-front','ie-ribco-above'] },
        { key: 'scorpion', label: 'The Scorpion Rib', imgs: ['scorpion_image_1','scorpion_image_2'], fbs: ['ie-scorpion-speed','ie-scorpion-side'] },
      ].map(({ key, label, imgs, fbs }) => (
        <section key={key} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</h3>
          <div><label className="label">Eyebrow</label><input className="input" value={form[`${key}_eyebrow`]} onChange={(e) => set(`${key}_eyebrow`, e.target.value)} /></div>
          <div><label className="label">Heading</label><input className="input" value={form[`${key}_heading`]} onChange={(e) => set(`${key}_heading`, e.target.value)} /></div>
          <div><label className="label">Body Text</label><textarea className="input" rows={4} value={form[`${key}_body`]} onChange={(e) => set(`${key}_body`, e.target.value)} /></div>
          {imgs.map((imgKey, i) => (
            <ImagePicker key={imgKey} label={`Image ${i+1}`} value={form[imgKey]} onChange={(v) => set(imgKey, v)} fallbackSrc={`${FB}/${fbs[i]}.jpg`} />
          ))}
        </section>
      ))}

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">The Destinations</h3>
        <div><label className="label">Eyebrow</label><input className="input" value={form.destinations_eyebrow} onChange={(e) => set('destinations_eyebrow', e.target.value)} /></div>
        <div><label className="label">Heading</label><input className="input" value={form.destinations_heading} onChange={(e) => set('destinations_heading', e.target.value)} /></div>
        <div><label className="label">Body Text</label><textarea className="input" rows={4} value={form.destinations_body} onChange={(e) => set('destinations_body', e.target.value)} /></div>
        {['ie-dest-egremni','ie-dest-taverna','ie-dest-village','ie-dest-bay-aerial','ie-dest-beach-aerial','ie-boat-wake'].map((fb, i) => (
          <ImagePicker key={i} label={`Image ${i+1}`} value={form[`destinations_image_${i+1}`]} onChange={(v) => set(`destinations_image_${i+1}`, v)} fallbackSrc={`${FB}/${fb}.jpg`} />
        ))}
      </section>

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">SEO</h3>
        <div><label className="label">SEO Title</label><input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} /></div>
        <div><label className="label">SEO Description</label><textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} /></div>
        <ImagePicker label="OG Image" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded text-sm font-medium disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-emerald-400 text-sm">✓ Saved</span>}
      </div>
    </form>
  )
}

// ─── Wellness page form ───────────────────────────────────
function WellnessForm({ data, onSave, saving, saved }) {
  const extra = data?.extra_content || {}
  const makeState = (ex) => ({
    hero_title: data?.hero_title || '',
    hero_subtitle: data?.hero_subtitle || '',
    hero_image_url: data?.hero_image_url || '',
    intro_eyebrow: ex.intro_eyebrow || 'WELLNESS',
    intro_heading: ex.intro_heading || 'A Place to Restore',
    intro_body: ex.intro_body || '',
    intro_image_1: ex.intro_image_1 || '',
    intro_image_2: ex.intro_image_2 || '',
    intro_image_3: ex.intro_image_3 || '',
    massage_eyebrow: ex.massage_eyebrow || 'OUTDOOR SPA',
    massage_heading: ex.massage_heading || 'Massage',
    massage_body: ex.massage_body || '',
    massage_image_1: ex.massage_image_1 || '',
    massage_image_2: ex.massage_image_2 || '',
    gym_eyebrow: ex.gym_eyebrow || 'FITNESS',
    gym_heading: ex.gym_heading || 'Gym',
    gym_body: ex.gym_body || '',
    gym_image_1: ex.gym_image_1 || '',
    gym_image_2: ex.gym_image_2 || '',
    yoga_eyebrow: ex.yoga_eyebrow || 'MINDFULNESS',
    yoga_heading: ex.yoga_heading || 'Yoga Dome',
    yoga_body: ex.yoga_body || '',
    yoga_image: ex.yoga_image || '',
    spa_eyebrow: ex.spa_eyebrow || 'OFF-SITE',
    spa_heading: ex.spa_heading || 'Pure Paleros Bay Spa',
    spa_body: ex.spa_body || '',
    spa_image_1: ex.spa_image_1 || '',
    spa_image_2: ex.spa_image_2 || '',
    spa_image_3: ex.spa_image_3 || '',
    seo_title: ex.seo_title || '',
    seo_description: ex.seo_description || '',
    seo_og_image: ex.seo_og_image || '',
  })
  const [form, setForm] = useState(() => makeState(extra))
  const [customSections, setCustomSections] = useState(extra.custom_sections || [])
  useEffect(() => { if (data) { setForm(makeState(data.extra_content || {})); setCustomSections((data.extra_content || {}).custom_sections || []) } }, [data])
  function set(field, value) { setForm((f) => ({ ...f, [field]: value })) }
  function handleSubmit(e) {
    e.preventDefault()
    const { hero_title, hero_subtitle, hero_image_url, seo_title, seo_description, seo_og_image, ...rest } = form
    onSave({ id: data.id, hero_title, hero_subtitle, hero_image_url, extra_content: { ...(data.extra_content || {}), ...rest, seo_title, seo_description, seo_og_image, custom_sections: customSections } })
  }

  const FB = 'https://seagonia.vercel.app/images/wellness'
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hero Section</h3>
        <div><label className="label">Page Title</label><input className="input" value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} /></div>
        <div><label className="label">Subtitle</label><textarea className="input" rows={2} value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} /></div>
        <ImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => set('hero_image_url', v)} fallbackSrc={`${FB}/w-candle-massage.jpg`} />
      </section>

      {[
        { key: 'intro', label: 'Introduction', imgs: ['intro_image_1','intro_image_2','intro_image_3'], fbs: ['w-candle-massage','w-stones','w-couple-massage'], hasEyebrow: true },
        { key: 'massage', label: 'Massage', imgs: ['massage_image_1','massage_image_2'], fbs: ['w-hot-towel','w-massage-1'], hasEyebrow: true },
        { key: 'gym', label: 'Gym', imgs: ['gym_image_1','gym_image_2'], fbs: ['w-gym-1','w-gym-2'], hasEyebrow: true },
      ].map(({ key, label, imgs, fbs }) => (
        <section key={key} className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</h3>
          <div><label className="label">Eyebrow</label><input className="input" value={form[`${key}_eyebrow`]} onChange={(e) => set(`${key}_eyebrow`, e.target.value)} /></div>
          <div><label className="label">Heading</label><input className="input" value={form[`${key}_heading`]} onChange={(e) => set(`${key}_heading`, e.target.value)} /></div>
          <div><label className="label">Body Text</label><textarea className="input" rows={4} value={form[`${key}_body`]} onChange={(e) => set(`${key}_body`, e.target.value)} /></div>
          {imgs.map((imgKey, i) => (
            <ImagePicker key={imgKey} label={`Image ${i+1}`} value={form[imgKey]} onChange={(v) => set(imgKey, v)} fallbackSrc={`${FB}/${fbs[i]}.jpg`} />
          ))}
        </section>
      ))}

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Yoga Dome</h3>
        <div><label className="label">Eyebrow</label><input className="input" value={form.yoga_eyebrow} onChange={(e) => set('yoga_eyebrow', e.target.value)} /></div>
        <div><label className="label">Heading</label><input className="input" value={form.yoga_heading} onChange={(e) => set('yoga_heading', e.target.value)} /></div>
        <div><label className="label">Body Text</label><textarea className="input" rows={4} value={form.yoga_body} onChange={(e) => set('yoga_body', e.target.value)} /></div>
        <ImagePicker label="Image" value={form.yoga_image} onChange={(v) => set('yoga_image', v)} fallbackSrc={`${FB}/w-yoga-dome.jpg`} />
      </section>

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pure Paleros Bay Spa</h3>
        <div><label className="label">Eyebrow</label><input className="input" value={form.spa_eyebrow} onChange={(e) => set('spa_eyebrow', e.target.value)} /></div>
        <div><label className="label">Heading</label><input className="input" value={form.spa_heading} onChange={(e) => set('spa_heading', e.target.value)} /></div>
        <div><label className="label">Body Text</label><textarea className="input" rows={4} value={form.spa_body} onChange={(e) => set('spa_body', e.target.value)} /></div>
        <ImagePicker label="Image 1" value={form.spa_image_1} onChange={(v) => set('spa_image_1', v)} fallbackSrc={`${FB}/w-spa-lounge.jpg`} />
        <ImagePicker label="Image 2" value={form.spa_image_2} onChange={(v) => set('spa_image_2', v)} fallbackSrc={`${FB}/w-facial.jpg`} />
        <ImagePicker label="Image 3" value={form.spa_image_3} onChange={(v) => set('spa_image_3', v)} fallbackSrc={`${FB}/w-spa-massage.jpg`} />
      </section>

      <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">SEO</h3>
        <div><label className="label">SEO Title</label><input className="input" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} /></div>
        <div><label className="label">SEO Description</label><textarea className="input" rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} /></div>
        <ImagePicker label="OG Image" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} />
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded text-sm font-medium disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-emerald-400 text-sm">✓ Saved</span>}
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

  if (pageName === 'experiences') {
    return (
      <ExperiencesForm
        data={data}
        onSave={handleSave}
        saving={update.isPending}
        saved={saved}
      />
    )
  }

  if (pageName === 'ionian-escape') {
    return (
      <IonianEscapeForm
        data={data}
        onSave={handleSave}
        saving={update.isPending}
        saved={saved}
      />
    )
  }

  if (pageName === 'wellness') {
    return (
      <WellnessForm
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
        const order = ['home', 'rooms', 'gallery', 'amenities', 'experiences', 'dining', 'area', 'hotel', 'ionian-escape', 'wellness']
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
