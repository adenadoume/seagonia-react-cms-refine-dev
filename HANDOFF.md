# Seagonia Hotel CMS — Project Handoff

## Project Overview
Boutique hotel website (Seagonia Hotel, Pogonia near Paleros, Greece) with:
- **Public website** — React + Vite + Tailwind at `/website` (port 3000)
- **Admin panel** — Custom React + Vite + Tailwind at `/admin` (port 5174)
- **Database** — Supabase project `pnjfxostbiscwihpatjk`
- **Images** — 77 local images at `website/public/images/hotel/img-001.jpg` … `img-077.jpg`
- **Deployment** — Vercel, Root Directory: `website`, Framework: Vite

⚠️ **DO NOT migrate to Next.js** — was attempted, reverted. SEO is handled via `useSEO` hook (sets title, description, OG tags dynamically). Google crawls JS fine for a hotel site.

⚠️ **DO NOT add vite-plugin-prerender** — pages fetch from Supabase at runtime; prerender would capture loading skeletons, not content. No SEO benefit, real build risk.

---

## Current State — COMPLETED ✅

### Website
- All pages wired to Supabase (hero image, title, subtitle, SEO fields)
- `useSEO` hook sets title + meta description + OG + Twitter tags per page
- SEO fields (seo_title, seo_description, seo_og_image) editable in admin → Pages
- Stored in `page_content.extra_content` JSONB
- Footer wired to `hotel_settings`
- framer-motion v12, React 19, react-router-dom v7

### SEO Files (added 2026-03-13 — zero build risk)
- `website/index.html` — static OG + Twitter fallback tags (for WhatsApp/FB/LinkedIn which don't run JS) + JSON-LD Hotel schema (Google rich results)
- `website/public/sitemap.xml` — all 11 static routes, auto-copied to `dist/` by Vite
- `website/public/robots.txt` — allows all crawlers, points to sitemap
- **⚠️ Update domain** in `index.html` (3 OG/Twitter/JSON-LD urls) and `sitemap.xml` (all locs) when final domain is confirmed (currently `seagonia.vercel.app`)
- **⚠️ Update OG image** `og:image` / `twitter:image` in `index.html` — currently `img-000.jpg`, swap to best hero photo

### Admin Panel (dark theme, slate-900/800)
- **Dashboard** — stats cards (rooms, messages, subscribers, gallery count)
- **Pages** — hero fields + SEO section (gold border) + custom sections per page
- **Rooms** — full CRUD + ImagePicker
- **Gallery** — full CRUD + ImagePicker + category filter
- **Testimonials** — full CRUD
- **Amenities** — full CRUD
- **Experiences** — full CRUD + ImagePicker
- **Settings** — hotel_settings (phone, email, address, social links)
- **Messages** — contact form inbox (read + status)
- **Newsletter** — subscriber list

### Admin CSS utilities (admin/src/index.css)
```css
.btn-edit    — gold border, hover gold text
.btn-delete  — red border, hover red bg
.badge-published / .badge-draft
.input / .label / .card
```

### ImagePicker component
- `admin/src/components/ImagePicker.jsx`
- Grid of 77 local hotel images, filter by number, gold border on selected
- Used in: Rooms, Gallery, Experiences, Pages (hero + SEO og image + custom sections)

### Custom Sections (admin → Pages)
- Types: `text`, `image_text`, `image`
- Stored in `extra_content.custom_sections` array
- Admin can add/reorder/remove sections
- **TODO: website does not yet render custom_sections** ← NEXT TASK

---

## Next Features (in order)

### 1. Render custom_sections on website pages ← IN PROGRESS
Each page reads `extra_content.custom_sections` and renders below the main content.
Section types: `text` (heading + body), `image_text` (image left/right + text), `image` (full-width image + caption)

### 2. Header/Footer/Body Script Injection
Reminder from AI — implement in admin Settings or dedicated Scripts page:
- **Google Tag Manager** (single GTM container tag, replaces individual tags)
- **Google Analytics** (via GTM or direct GA4 script)
- **Google Ads** conversion tracking
- **Google Maps API key** (for contact/area page map embed)
- **reCAPTCHA v3** (for contact form)
- **Cookiebot** (EU cookie consent banner)

Store scripts in `hotel_settings` or new `site_scripts` table as:
```json
{ "head": "...", "body_start": "...", "body_end": "..." }
```
Inject via `useEffect` in website root or via `index.html` template vars in Vite.

---

## Supabase Tables
```
hotel_settings      — hotel name, contact, social, total_rooms
rooms               — 6 types (A-F), slug, image_url, is_featured, bed_options[]
amenities           — name, icon (Lucide name), description
experiences         — name, description, image_url
testimonials        — quote, name, country, display_order
gallery_categories  — name, slug
gallery_images      — image_url, category_id, room_id, title
page_content        — one row per page, extra_content JSONB
texts               — key-value editable text pairs
contact_messages    — from contact form
newsletter_subscribers
```

### extra_content JSONB shape (page_content)
```json
{
  "seo_title": "",
  "seo_description": "",
  "seo_og_image": "",
  "custom_sections": [
    { "id": "uuid", "type": "text", "heading": "", "body": "" },
    { "id": "uuid", "type": "image_text", "image_url": "", "heading": "", "body": "", "image_position": "left" },
    { "id": "uuid", "type": "image", "image_url": "", "caption": "" }
  ],
  "intro_eyebrow": "", "accommodation_eyebrow": "", ...
}
```

---

## Environment Variables
### Website (Vercel + `website/.env.local`)
```
VITE_SUPABASE_URL=https://pnjfxostbiscwihpatjk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuamZ4b3N0YmlzY3dpaHBhdGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTQ5NjMsImV4cCI6MjA4NzM3MDk2M30.caORqFAIgNQNwO9SbhXIwuMWiOiV2WB-pbdT2rLa-58
VITE_HOTEL_PHONE=+302643041736
VITE_HOTEL_EMAIL=welcome@seagonia.com
VITE_HOTEL_ADDRESS=Pogonia, Paleros 300 12, Greece
```

### Admin (`admin/.env`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name    ← get from Cloudinary dashboard top-left
VITE_CLOUDINARY_UPLOAD_PRESET=seagonia-admin  ← must be Unsigned
VITE_DEPLOY_HOOK=https://api.vercel.com/...   ← Vercel → Settings → Git → Deploy Hooks
```

### Cloudinary setup (for gallery image uploads)
1. Log in at cloudinary.com → Dashboard → copy **Cloud name**
2. Settings → Upload → Upload presets → **Add upload preset**
3. Name: `seagonia-admin`, Signing mode: **Unsigned** → Save
4. Paste cloud name into `admin/.env` → `VITE_CLOUDINARY_CLOUD_NAME`
5. No API secret needed — unsigned uploads work from the browser directly
⚠️ If upload preset is Signed, uploads will fail with 400 error

---

## Key File Paths
```
/website/src/
  lib/supabase.js          ← Supabase client + hotelAPI queries
  hooks/useSupabase.js     ← React Query hooks
  hooks/useSEO.js          ← Sets title + meta + OG tags
  pages/                   ← All pages wired to Supabase
  constants/hotel.js       ← Static fallback data
/admin/src/
  pages/PagesEditor.jsx    ← Home + generic page editor with SEO + custom sections
  pages/RoomsAdmin.jsx
  pages/GalleryAdmin.jsx
  pages/SettingsAdmin.jsx
  components/ImagePicker.jsx
  hooks/useAdmin.js        ← All admin React Query mutations
```
# Admin panel
The admin panel is local only — it's not deployed to Vercel (only /website is deployed).

To access admin:

Locally: cd admin && npm run dev → opens at http://localhost:5174
Web (anywhere): Not deployed yet — you'd need to deploy the /admin folder separately to Vercel (as a second project) with Supabase auth protecting it

# FINAL URL NOTE
Note: When you get your real domain, update WEBSITE_BASE in admin/src/components/ImagePicker.jsx to match.

QUESTIN: OTHER UPDATES WHEN HAVE FINAL URL?