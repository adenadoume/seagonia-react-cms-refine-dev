# Seagonia Hotel CMS — Project Handoff

## Project Overview
Boutique hotel website (Seagonia Hotel, Pogonia near Paleros, Greece) with:
- **Public website** — React + Vite + Tailwind at `/website`
- **Admin panel** — currently Refine + Ant Design at `/admin` (to be rebuilt)
- **Database** — Supabase (PostgreSQL)
- **Images** — Cloudinary (`dvgmbgqge`) + local `/images/hotel/` folder
- **Supabase project** — `https://supabase.com/dashboard/project/pnjfxostbiscwihpatjk`

---

## Current State

### Website Wiring — COMPLETED ✅
All pages now pull live data from Supabase instead of static constants.

**Files modified:**
- `website/src/main.jsx` — Added `QueryClientProvider` (React Query)
- `website/src/pages/Home.jsx` — Uses `usePageContent('home')`, `useTestimonials()`, `useRooms()` (featured)
- `website/src/pages/Rooms.jsx` — Uses `useRooms()`
- `website/src/pages/RoomDetail.jsx` — Uses `useRoom(slug)`, `useHotelSettings()`
- `website/src/pages/Gallery.jsx` — Uses `useGalleryImages()`, `useGalleryCategories()`
- `website/src/pages/Amenities.jsx` — Uses `useAmenities()`, `useExperiences()`

**Files NOT yet wired (editorial/complex layout, deferred):**
- `Experiences.jsx` — Very complex per-section editorial layout, needs `page_content` extra_content JSON
- `Dining.jsx` — Similar editorial layout
- `Area.jsx` — Similar editorial layout
- `Hotel.jsx` — Similar editorial layout

**New seed file created:**
- `supabase/seed/002_page_content.sql` — Run this in Supabase SQL Editor to populate page_content table

### Data Layer — Already Built ✅
- `website/src/lib/supabase.js` — Supabase client + `hotelAPI` with all queries
- `website/src/hooks/useSupabase.js` — React Query hooks for all tables

---

## How page_content Works (Home page)
The `page_content` table uses named columns + `extra_content` JSONB:

```
section_1_title     → Intro heading ("A Peaceful Retreat...")
section_1_text      → Intro body paragraph
section_1_image_url → Intro image
section_2_title     → Accommodation heading ("58 Rooms by the Sea")
section_3_title     → Experiences heading ("Discover the Ionian")
extra_content JSONB → {
  intro_eyebrow, accommodation_eyebrow, experiences_eyebrow,
  dining_eyebrow, dining_heading, dining_body,
  cta_heading, cta_subheading
}
```

All fields have hardcoded fallbacks so the website works even before seeding.

---

## Admin Panel — REBUILT ✅
**Decision:** Throw away Refine + Ant Design admin. Build custom React admin.

**Style reference:** `/Users/nucintosh/PYTHON/containers-claude` — clean table views, colored badges, stat cards. NO Ant Design, NO Refine. Pure Tailwind.

**Agreed tech stack for new admin:**
- React + Vite + Tailwind (no Refine, no Ant Design)
- Supabase JS + React Query
- Supabase Auth for login
- Hotel brand palette: cream/gold/navy

**Admin sections planned:**
```
Sidebar (text only, no icons)
Dashboard        — overview stats
Pages            — edit page_content JSON (form fields per page, not raw JSON)
Rooms            — table → edit/create
Gallery          — grid → upload/delete
Testimonials     — table → edit/create
Amenities        — table → edit/create
Experiences      — table → edit/create
Settings         — hotel name, phone, email, social
Messages         — contact form inbox (read-only)
Newsletter       — subscriber list
```

**Key UX decision:** End user never sees raw JSON. Each page section has labeled form fields that serialize to JSON on save.

**Separate app** — runs on port 5174, separate Vercel project from website.

---

## Images Strategy
- Local images served from `website/public/images/hotel/img-XXX.jpg` (77 images)
- Cloudinary cloud: `dvgmbgqge` — set up for future uploads
- Gallery images in Supabase `gallery_images` table have `image_url` field
- Rooms have `image_url` field in Supabase
- **TODO:** Migrate images to Cloudinary and update Supabase URLs

---

## Next.js Migration Decision
**Agreed:** Migrate public website to Next.js 14 (App Router) for SEO.
- Same Supabase data layer — just change env var prefix `VITE_` → `NEXT_PUBLIC_`
- Use ISR (Incremental Static Regeneration) for rooms/pages
- Keep admin as separate React app
- **DO AFTER** admin rebuild is complete

---

## Supabase Tables
```
hotel_settings      — hotel name, contact, social, total_rooms
rooms               — 6 types (A-F), slug, image_url, is_featured, bed_options[]
amenities           — name, icon (Lucide name), description
room_amenities      — join table rooms↔amenities
experiences         — name, description, image_url
testimonials        — quote, name, country, display_order
gallery_categories  — name, slug (all/hotel/rooms/pool/dining/experiences)
gallery_images      — image_url, category_id, room_id, title
page_content        — one row per page (home/rooms/gallery/etc), extra_content JSONB
texts               — key-value editable text pairs
sections            — section visibility/ordering per page
contact_messages    — from contact form
newsletter_subscribers
```

---

## Environment Variables
### Website (`website/.env`)
```
VITE_SUPABASE_URL=https://pnjfxostbiscwihpatjk.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=dvgmbgqge
```
### Admin (`admin/.env`)
```
VITE_SUPABASE_URL=https://pnjfxostbiscwihpatjk.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=dvgmbgqge
VITE_CLOUDINARY_API_KEY=...
```

---

## Immediate Next Steps
1. **Run seed SQL** — Go to Supabase SQL Editor, run `supabase/seed/002_page_content.sql`
2. **Test website** — `cd website && npm run dev` — all pages should now load live data
3. **Rebuild admin** — Start fresh React + Tailwind admin (throw away Refine)
4. **Wire remaining pages** — Experiences, Dining, Area, Hotel (editorial pages)
5. **Images** — Migrate to Cloudinary, update image_url in Supabase
6. **Next.js migration** — After admin is done

---

## Key File Paths
```
/Users/nucintosh/PYTHON/OIK105 SEAGONIA/seagonia-react-cms-refine-dev/
├── website/src/
│   ├── lib/supabase.js          ← Supabase client + hotelAPI queries
│   ├── hooks/useSupabase.js     ← React Query hooks (all tables)
│   ├── pages/Home.jsx           ← WIRED ✅
│   ├── pages/Rooms.jsx          ← WIRED ✅
│   ├── pages/RoomDetail.jsx     ← WIRED ✅
│   ├── pages/Gallery.jsx        ← WIRED ✅
│   ├── pages/Amenities.jsx      ← WIRED ✅
│   └── constants/hotel.js       ← Static fallback data (keep, used as fallbacks)
├── admin/                        ← TO BE REBUILT
├── supabase/
│   ├── migrations/001_initial_schema.sql
│   ├── migrations/002_row_level_security.sql
│   └── seed/
│       ├── seed_hotel_data.sql  ← Run first
│       └── 002_page_content.sql ← Run second (NEW)
└── SETUP_INSTRUCTIONS.md
```
