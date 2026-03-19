# Seagonia Hotel — Complete Website + CMS Blueprint

> This document is a complete technical blueprint for rebuilding the Seagonia Hotel website and admin CMS from scratch. It contains every architectural decision, pattern, schema, and configuration needed to reproduce the system identically.

---

## 1. Project Overview

**What this is:** A boutique hotel website for Seagonia Hotel (Pogonia, near Paleros, Ionian Sea, Greece) paired with a custom headless CMS admin panel.

**Two separate Vite React SPAs:**

- `website/` — public-facing hotel website (port 3000 in dev)
- `admin/` — password-protected content management panel (port 5174 in dev)

**Core philosophy:**
- No SSR, no Next.js. Pure Vite React SPAs deployed on Vercel.
- Supabase is the backend for all content (database + auth).
- Cloudinary handles image uploads from the admin.
- 77 curated hotel images (`img-001.jpg` through `img-077.jpg`) live in `website/public/images/hotel/` and are served statically.
- Every piece of content has a hardcoded fallback so the site renders perfectly even if Supabase returns nothing.
- The admin editor stores content to Supabase; the website reads from Supabase at runtime. No rebuild needed for content changes.

**Hotel details:**
- Name: Seagonia (Sea + Gonia = Sea Corner)
- Tagline: "Your Corner by the Sea"
- Location: Pogonia village, near Paleros, Aitoloakarnania, Ionian Sea, Greece
- Coordinates: lat 38.7833, lng 20.8833
- 58 rooms across 6 room types (A–F)
- GitHub repo: `git@github.com:adenadoume/seagonia-react-cms-refine-dev.git`

---

## 2. Tech Stack (Exact Versions)

### Website (`website/package.json`)

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.47.10",
    "@tanstack/react-query": "^5.62.12",
    "axios": "^1.13.5",
    "framer-motion": "^12.34.0",
    "lucide-react": "^0.570.0",
    "react": "^19.2.0",
    "react-day-picker": "^9.13.2",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.24",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "vite": "^7.3.1"
  }
}
```

### Admin (`admin/package.json`)

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@tanstack/react-query": "^5.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.4",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^7.3.1"
  }
}
```

Note: Admin uses React 18 and react-router-dom v6. Website uses React 19 and react-router-dom v7. Admin does NOT use framer-motion.

### Backend Services

- **Supabase** — auth (email/password), PostgreSQL database, no storage buckets used
- **Cloudinary** — image uploads from admin (unsigned preset `seagonia-admin`)
- **Vercel** — deployment for both apps (two separate Vercel projects)
- **Google Fonts** — Cormorant Garamond + Outfit loaded in `index.html`

---

## 3. Folder Structure

```
seagonia-react-cms-refine-dev/
│
├── vercel.json                    # Root Vercel config (used when deploying from repo root)
│
├── website/                       # Public hotel website
│   ├── index.html                 # Entry HTML: OG tags, JSON-LD schema, Google Fonts
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js         # Design tokens: colors, fonts, spacing, font sizes
│   ├── postcss.config.js
│   ├── public/
│   │   ├── images/hotel/          # 77 static hotel images: img-001.jpg … img-077.jpg
│   │   │                          # Also img-000.jpg used as OG fallback image
│   │   ├── sitemap.xml            # 11 static routes, auto-copied to dist/ by Vite
│   │   └── robots.txt             # Allows all crawlers, points to sitemap
│   └── src/
│       ├── main.jsx               # React root, QueryClientProvider wrapper
│       ├── App.jsx                # BrowserRouter + all routes + ScrollToTop
│       ├── index.css              # Tailwind directives + custom component classes
│       ├── constants/
│       │   └── hotel.js           # HOTEL, ROOMS, AMENITIES, EXPERIENCES, HOTEL_IMAGES constants
│       ├── lib/
│       │   └── supabase.js        # Supabase client + hotelAPI query functions
│       ├── hooks/
│       │   ├── useSupabase.js     # TanStack Query hooks wrapping hotelAPI
│       │   └── useSEO.js          # Sets document.title + meta tags per page
│       ├── pages/
│       │   ├── Home.jsx           # Full-page hero + 7 sections
│       │   ├── Rooms.jsx          # Room grid from Supabase
│       │   ├── RoomDetail.jsx     # Single room by slug
│       │   ├── Amenities.jsx      # Amenities grid
│       │   ├── Dining.jsx         # 6 dining/food sections
│       │   ├── Experiences.jsx    # 5 experience sections
│       │   ├── Gallery.jsx        # Filtered gallery + lightbox
│       │   ├── Area.jsx           # Location + islands + beaches
│       │   ├── Hotel.jsx          # About the hotel + stats + facilities
│       │   ├── Location.jsx       # Map / directions page
│       │   ├── Contact.jsx        # Contact form → contact_messages table
│       │   └── Book.jsx           # Booking page
│       └── components/
│           ├── layout/
│           │   ├── Header.jsx     # Fixed nav, transparent → white on scroll
│           │   ├── Footer.jsx     # Brand + links + contact + newsletter + social
│           │   └── MobileMenu.jsx # Slide-in mobile nav
│           └── shared/
│               ├── CustomSections.jsx    # Renders extra_content.custom_sections
│               ├── RoomCard.jsx          # Room card with image + details
│               ├── SectionHeader.jsx     # Eyebrow + title + optional subtitle
│               ├── ImageLightbox.jsx     # Fullscreen image viewer with prev/next
│               ├── AnimatedCounter.jsx   # Counts up when in view
│               ├── ImageReveal.jsx       # Clip-path reveal on scroll
│               └── ParallaxImage.jsx     # Parallax scroll effect
│
└── admin/                         # CMS admin panel
    ├── vercel.json                # Admin Vercel config: SPA rewrites
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js         # gold, navy, cream colors
    ├── postcss.config.js
    └── src/
        ├── main.jsx               # React root + QueryClientProvider
        ├── App.jsx                # Routes: /login + protected layout
        ├── index.css              # Admin CSS utilities (btn-*, input, label, card, badge-*, th, td)
        ├── lib/
        │   └── supabase.js        # Admin Supabase client (with auth session persistence)
        ├── hooks/
        │   ├── useAuth.js         # Supabase auth hook (user, signOut)
        │   └── useAdmin.js        # All React Query hooks for admin CRUD
        ├── components/
        │   ├── Layout.jsx         # Sidebar nav + DeployButton component
        │   └── ImagePicker.jsx    # Image selection modal (hotel photos + gallery)
        └── pages/
            ├── Login.jsx          # Email/password sign-in
            ├── Dashboard.jsx      # Stats: rooms, new messages, testimonials, gallery count
            ├── PagesEditor.jsx    # Per-page content editor with SEO + custom sections
            ├── RoomsAdmin.jsx     # Full CRUD for rooms table
            ├── GalleryAdmin.jsx   # Gallery CRUD + Cloudinary upload + infinite scroll
            ├── TestimonialsAdmin.jsx
            ├── AmenitiesAdmin.jsx
            ├── ExperiencesAdmin.jsx
            ├── SettingsAdmin.jsx  # hotel_settings form + JSON backup/import + Deploy button
            ├── MessagesAdmin.jsx  # Contact form inbox
            └── NewsletterAdmin.jsx
```

---

## 4. Supabase Database Schema

Supabase project ID: `pnjfxostbiscwihpatjk`

### SQL CREATE TABLE Statements

```sql
-- Hotel-wide settings (single row)
CREATE TABLE hotel_settings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT,
  tagline       TEXT,
  description   TEXT,
  phone         TEXT,
  email         TEXT,
  address       TEXT,
  instagram_url TEXT,
  facebook_url  TEXT,
  total_rooms   INTEGER DEFAULT 58,
  is_published  BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Room types (6 types: A–F)
CREATE TABLE rooms (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  type          TEXT,           -- 'A', 'B', 'C', 'D', 'E', 'F'
  description   TEXT,
  highlight     TEXT,           -- short tagline e.g. "Private Garden"
  floor         TEXT,           -- "Ground Floor" or "1st Floor"
  max_guests    INTEGER DEFAULT 2,
  bed_options   TEXT[],         -- ARRAY e.g. ARRAY['King Bed', 'Twin Beds']
  image_url     TEXT,
  is_featured   BOOLEAN DEFAULT false,
  is_published  BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Amenities (icon name = lucide-react component name)
CREATE TABLE amenities (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  icon          TEXT,           -- Lucide icon name e.g. 'Waves', 'Umbrella'
  description   TEXT,
  is_published  BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Experiences (for admin Experiences section)
CREATE TABLE experiences (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT,
  image_url     TEXT,
  icon          TEXT,           -- Lucide icon name
  is_published  BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Guest testimonials
CREATE TABLE testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote         TEXT NOT NULL,
  name          TEXT NOT NULL,
  country       TEXT,
  is_published  BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Gallery categories (e.g. 'rooms', 'pool', 'dining', 'experiences', 'area')
CREATE TABLE gallery_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Gallery images (Cloudinary URLs or local paths)
CREATE TABLE gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     TEXT NOT NULL,
  title         TEXT,
  description   TEXT,
  category_id   UUID REFERENCES gallery_categories(id) ON DELETE SET NULL,
  room_id       UUID REFERENCES rooms(id) ON DELETE SET NULL,
  is_published  BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Per-page content (one row per page)
CREATE TABLE page_content (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name       TEXT UNIQUE NOT NULL, -- 'home', 'rooms', 'gallery', 'amenities',
                                         -- 'dining', 'experiences', 'area', 'hotel'
  hero_title      TEXT,
  hero_subtitle   TEXT,
  hero_image_url  TEXT,
  section_1_title TEXT,
  section_1_text  TEXT,
  section_1_image_url TEXT,
  section_2_title TEXT,
  section_3_title TEXT,
  extra_content   JSONB DEFAULT '{}',  -- see Section 5 for full field reference
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Key-value editable text snippets
CREATE TABLE texts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT UNIQUE NOT NULL,
  value      TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact form submissions
CREATE TABLE contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT,
  email      TEXT,
  phone      TEXT,
  subject    TEXT,
  message    TEXT,
  status     TEXT DEFAULT 'new',  -- 'new', 'read', 'replied'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Junction table for room amenities** (used by `hotelAPI.getRooms` join query):

```sql
CREATE TABLE room_amenities (
  room_id    UUID REFERENCES rooms(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (room_id, amenity_id)
);
```

---

## 5. page_content extra_content JSONB — Complete Field Reference

The `extra_content` column is a JSONB object. Every page uses it for fields beyond the standard `hero_title`, `hero_subtitle`, `hero_image_url` columns. All fields are optional — the website uses hardcoded fallbacks for every one.

### Home page (`page_name = 'home'`)

```json
{
  "intro_eyebrow": "Welcome",
  "accommodation_eyebrow": "Accommodation",
  "experiences_eyebrow": "Experiences",
  "dining_eyebrow": "Dining",
  "dining_heading": "Galià Rooftop Restaurant",
  "dining_body": "Our Mediterranean restaurant...",
  "dining_image": "/images/hotel/img-038.jpg",
  "cta_heading": "Plan Your Stay",
  "cta_subheading": "We would love to hear from you",
  "area_image": "/images/hotel/img-001.jpg",
  "exp_1_title": "Boat Trips",   "exp_1_image": "/images/hotel/img-073.jpg",
  "exp_2_title": "Cooking Classes", "exp_2_image": "/images/hotel/img-055.jpg",
  "exp_3_title": "Yoga & Wellness", "exp_3_image": "/images/hotel/img-034.jpg",
  "exp_4_title": "Spa & Massage",   "exp_4_image": "/images/hotel/img-036.jpg",
  "exp_5_title": "Hiking & History","exp_5_image": "/images/hotel/img-076.jpg",
  "exp_6_title": "Wine & Dining",   "exp_6_image": "/images/hotel/img-048.jpg",
  "seo_title": "Boutique Hotel in Paleros",
  "seo_description": "Seagonia Hotel — Your Corner by the Sea...",
  "seo_og_image": "",
  "custom_sections": []
}
```

Also uses top-level `page_content` columns:
- `hero_title` — "SEAGONIA"
- `hero_subtitle` — "Your Corner by the Sea"
- `hero_image_url` — hero background
- `section_1_title` — intro heading
- `section_1_text` — intro body paragraph
- `section_1_image_url` — intro right-side image
- `section_2_title` — rooms section heading
- `section_3_title` — experiences section heading

### Dining page (`page_name = 'dining'`)

```json
{
  "galia_eyebrow": "ROOFTOP DINING",
  "galia_heading": "Galiá Restaurant",
  "galia_body": "...",
  "galia_image_1": "/images/hotel/img-038.jpg",
  "galia_image_2": "/images/hotel/img-037.jpg",
  "galia_image_3": "/images/hotel/img-041.jpg",

  "lounge_eyebrow": "ALL-DAY DINING",
  "lounge_heading": "Seagonia Lounge",
  "lounge_body": "...",
  "lounge_image_1": "/images/hotel/img-017.jpg",
  "lounge_image_2": "/images/hotel/img-042.jpg",
  "lounge_image_3": "/images/hotel/img-041.jpg",
  "lounge_image_4": "/images/hotel/img-043.jpg",

  "farm_eyebrow": "FROM OUR LAND",
  "farm_heading": "Farm to Table",
  "farm_body": "...",
  "farm_image_1": "/images/hotel/img-044.jpg",
  "farm_image_2": "/images/hotel/img-046.jpg",
  "farm_image_3": "/images/hotel/img-045.jpg",
  "farm_image_4": "/images/hotel/img-054.jpg",

  "cooking_eyebrow": "HANDS-ON",
  "cooking_heading": "Cooking Classes",
  "cooking_body": "...",
  "cooking_image_1": "/images/hotel/img-055.jpg",
  "cooking_image_2": "/images/hotel/img-059.jpg",

  "yacht_eyebrow": "PALEROS HARBOUR",
  "yacht_heading": "Yacht Club",
  "yacht_body": "...",
  "yacht_image_1": "/images/hotel/img-049.jpg",
  "yacht_image_2": "/images/hotel/img-048.jpg",
  "yacht_image_3": "/images/hotel/img-051.jpg",
  "yacht_image_4": "/images/hotel/img-050.jpg",
  "yacht_image_5": "/images/hotel/img-039.jpg",
  "yacht_image_6": "/images/hotel/img-048.jpg",

  "beekeeping_eyebrow": "EXPERIENCE",
  "beekeeping_heading": "Honey Harvesting & Beekeeping",
  "beekeeping_body": "...",
  "beekeeping_image_1": "/images/hotel/img-060.jpg",
  "beekeeping_image_2": "/images/hotel/img-061.jpg",

  "seo_title": "Dining",
  "seo_description": "...",
  "seo_og_image": "",
  "custom_sections": []
}
```

### Experiences page (`page_name = 'experiences'`)

```json
{
  "wellness_eyebrow": "WELLNESS",
  "wellness_heading": "Outdoor Massage & PURE Spa",
  "wellness_body": "...",
  "wellness_image_1": "/images/hotel/img-036.jpg",
  "wellness_image_2": "/images/hotel/img-062.jpg",

  "fitness_eyebrow": "MOVEMENT",
  "fitness_heading": "Outdoor Shaded & Indoor Fitness",
  "fitness_body": "...",
  "fitness_image_1": "/images/hotel/img-071.jpg",
  "fitness_image_2": "/images/hotel/img-034.jpg",
  "fitness_image_3": "/images/hotel/img-072.jpg",

  "beach_eyebrow": "THE BEACH",
  "beach_heading": "Open Water Swimming",
  "beach_body": "...",
  "beach_image": "/images/hotel/img-015.jpg",

  "boating_eyebrow": "EXPLORE",
  "boating_heading": "Explore the Ionian Islands by Boat",
  "boating_body": "...",
  "boating_image_1": "/images/hotel/img-073.jpg",
  "boating_image_2": "/images/hotel/img-074.jpg",
  "boating_image_3": "/images/hotel/img-075.jpg",
  "boating_image_4": "/images/hotel/img-012.jpg",

  "hiking_eyebrow": "ADVENTURE",
  "hiking_heading": "History & Hiking",
  "hiking_intro": "...",
  "hiking_bullet_1": "Start your day with one of the organized hiking tours...",
  "hiking_bullet_2": "Immerse yourself in the region's rich archaeological history...",
  "hiking_image_1": "/images/hotel/img-076.jpg",
  "hiking_image_2": "/images/hotel/img-008.jpg",

  "seo_title": "Experiences",
  "seo_description": "...",
  "seo_og_image": "",
  "custom_sections": []
}
```

### Hotel / About page (`page_name = 'hotel'`)

```json
{
  "welcome_eyebrow": "Welcome",
  "welcome_heading": "About Seagonia",
  "welcome_body": "...",
  "welcome_image": "/images/hotel/img-015.jpg",

  "pool_heading": "Pool & Multipurpose Room",
  "pool_body": "...",
  "pool_image": "/images/hotel/img-031.jpg",

  "aerial_image_1": "/images/hotel/img-016.jpg",
  "aerial_image_2": "/images/hotel/img-017.jpg",
  "aerial_caption": "80 metres from the beach, surrounded by nature",

  "seo_title": "The Hotel",
  "seo_description": "...",
  "seo_og_image": "",
  "custom_sections": []
}
```

### Area page (`page_name = 'area'`)

```json
{
  "location_eyebrow": "Location",
  "location_heading": "The Area",
  "location_body": "...",
  "location_image": "/images/hotel/img-001.jpg",

  "explore_eyebrow": "Explore",
  "explore_heading": "The Little Ionian",
  "explore_body": "...",
  "explore_image": "/images/hotel/img-003.jpg",

  "village_eyebrow": "VILLAGE",
  "village_heading": "Pogonia",
  "village_body": "...",
  "village_image_1": "/images/hotel/img-005.jpg",
  "village_image_2": "/images/hotel/img-006.jpg",
  "village_image_3": "/images/hotel/img-007.jpg",

  "paleros_eyebrow": "Nearby Town",
  "paleros_heading": "Paleros",
  "paleros_body": "...",
  "paleros_image_1": "/images/hotel/img-010.jpg",
  "paleros_image_2": "/images/hotel/img-011.jpg",

  "seo_title": "The Area",
  "seo_description": "...",
  "seo_og_image": "",
  "custom_sections": []
}
```

### Generic pages (rooms, gallery, amenities)

These pages only use the top-level `page_content` columns + the SEO fields in `extra_content`:

```json
{
  "seo_title": "Our Rooms",
  "seo_description": "...",
  "seo_og_image": "",
  "custom_sections": []
}
```

Top-level columns used: `hero_title`, `hero_subtitle`, `hero_image_url`.

### custom_sections array (applies to ALL pages)

```json
"custom_sections": [
  {
    "id": "1234567890",
    "type": "text",
    "heading": "Optional heading",
    "body": "Paragraph text here."
  },
  {
    "id": "0987654321",
    "type": "image_text",
    "heading": "Section heading",
    "body": "Description text.",
    "image_url": "/images/hotel/img-001.jpg",
    "image_position": "left"
  },
  {
    "id": "1122334455",
    "type": "image",
    "image_url": "/images/hotel/img-038.jpg",
    "caption": "Optional caption text"
  }
]
```

---

## 6. Website Architecture

### Routing (App.jsx)

```jsx
<BrowserRouter>
  <ScrollToTop />
  <div className="min-h-screen flex flex-col bg-cream">
    <Header />
    <main className="flex-1">
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/rooms"          element={<Rooms />} />
        <Route path="/rooms/:slug"    element={<RoomDetail />} />
        <Route path="/amenities"      element={<Amenities />} />
        <Route path="/area"           element={<Area />} />
        <Route path="/hotel"          element={<Hotel />} />
        <Route path="/dining"         element={<Dining />} />
        <Route path="/experiences"    element={<Experiences />} />
        <Route path="/gallery"        element={<Gallery />} />
        <Route path="/location"       element={<Location />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/book"           element={<Book />} />
      </Routes>
    </main>
    <Footer />
  </div>
</BrowserRouter>
```

`ScrollToTop` is a component that calls `window.scrollTo(0, 0)` on every `pathname` change via `useEffect`.

### Data Fetching Pattern (useSupabase.js)

All data fetching uses TanStack Query v5 with 5-minute stale time. Pattern:

```js
// Example from useSupabase.js
export const usePageContent = (pageName) => {
  return useQuery({
    queryKey: ['page-content', pageName],
    queryFn: () => hotelAPI.getPageContent(pageName),
    enabled: !!pageName,
    staleTime: 5 * 60 * 1000,  // 5 minutes
  })
}
```

All available hooks:
- `useHotelSettings()` — hotel_settings table
- `useRooms()` — all published rooms ordered by display_order
- `useRoom(slug)` — single room by slug
- `useAmenities()` — all published amenities
- `useExperiences()` — all published experiences
- `useTestimonials()` — all published testimonials
- `useGalleryImages(categorySlug?)` — gallery images, optionally filtered
- `useGalleryCategories()` — gallery categories (10 min stale time)
- `usePageContent(pageName)` — one page row by page_name
- `useText(key)` — single value from texts table
- `useContactForm()` — mutation to insert into contact_messages
- `useNewsletterSubscribe()` — mutation to insert into newsletter_subscribers

The `hotelAPI` object in `website/src/lib/supabase.js` contains the raw async functions. The Supabase client is configured with `persistSession: false` (public website, no auth) and realtime limited to 2 events/second.

### SEO Pattern (useSEO hook)

Every page calls `useSEO` near the top of the component body:

```js
useSEO({
  title: extra.seo_title || 'Default Page Title',
  description: extra.seo_description || 'Default description.',
  ogImage: extra.seo_og_image,  // may be undefined — skipped if falsy
})
```

The hook runs a `useEffect` that:
1. Sets `document.title` to `"${title} | Seagonia Hotel"` (or the full site tagline if no title)
2. Sets `<meta name="description">` content
3. Sets `<meta property="og:title">`, `og:description`, `og:site_name`
4. Sets `<meta property="og:image">` only if `ogImage` is truthy
5. Sets `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`

Meta elements are created if they don't exist, updated if they do.

### Page Pattern

Every page follows this exact structure:

```jsx
// 1. Import hooks and constants
import { usePageContent } from '../hooks/useSupabase'
import { HOTEL_IMAGES } from '../constants/hotel'
import useSEO from '../hooks/useSEO'
import CustomSections from '../components/shared/CustomSections'

export default function SomePage() {
  // 2. Fetch page content from Supabase
  const { data: content } = usePageContent('pagename')

  // 3. Extract extra_content with empty object fallback
  const extra = content?.extra_content || {}

  // 4. Extract all fields with fallbacks
  const heroTitle    = content?.hero_title     || 'Default Title'
  const heroSubtitle = content?.hero_subtitle  || ''
  const heroImage    = content?.hero_image_url || HOTEL_IMAGES.someDefault
  const eyebrow      = extra.some_eyebrow      || 'SECTION LABEL'
  const heading      = extra.some_heading      || 'Default Heading'
  const body         = extra.some_body         || 'Default paragraph text.'
  const image        = extra.some_image        || HOTEL_IMAGES.someDefault

  // 5. Set page SEO
  useSEO({
    title: extra.seo_title || 'Page Title',
    description: extra.seo_description || 'Default SEO description.',
    ogImage: extra.seo_og_image,
  })

  // 6. Return JSX with Framer Motion animations
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[50vh] ...">...</section>

      {/* Content sections */}
      <section className="section-padding bg-cream">...</section>

      {/* Always last: custom sections from CMS */}
      <CustomSections sections={extra.custom_sections} />
    </>
  )
}
```

### Animation Patterns (Framer Motion v12)

All animations use `whileInView` with `viewport={{ once: true }}` so they trigger once as elements enter the viewport. Pages define these variants locally (copy-pasted, not imported from a shared file):

```js
// Fade up (most common — used for text blocks, cards)
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}
// Usage: custom={i} on each item for staggered delay

// Simple fade in (hero images, full-screen sections)
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

// Fade from left (left-side content blocks)
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Fade from right (right-side content blocks)
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Stagger container (wraps child elements)
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}
```

Applied:

```jsx
// Standard whileInView pattern
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>

// Stagger parent + children
<motion.div
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.div variants={fadeLeft}>...</motion.div>
  <motion.div variants={fadeUp}>...</motion.div>
  <motion.div variants={fadeRight}>...</motion.div>
</motion.div>

// Hero on mount (animate not whileInView)
<motion.h1
  variants={fadeIn}
  initial="hidden"
  animate="visible"
>
```

### Design System

#### Colors (website/tailwind.config.js)

```js
colors: {
  navy:     { DEFAULT: '#1A1F3D', light: '#2A3058' },
  gold:     { DEFAULT: '#C9A96E', light: '#E8D5A3', dark: '#A8884D' },
  cream:    { DEFAULT: '#FAF8F3' },
  ivory:    { DEFAULT: '#F5F0E8' },
  charcoal: { DEFAULT: '#2D2D2D' },
}
```

Usage pattern for alternating sections: `bg-cream` → `bg-ivory` → `bg-cream` → `bg-ivory`, with `bg-navy` for the testimonials dark section.

#### Font Families

```js
fontFamily: {
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans:  ['Outfit', 'system-ui', 'sans-serif'],
}
```

Loaded via Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
```

Body default: `font-sans font-light text-charcoal bg-cream`, 18px, 1.8 line-height.
Headings default: `font-serif font-normal`.

#### Custom Font Sizes

```js
fontSize: {
  'display': ['6rem',  { lineHeight: '1.05', letterSpacing: '0.04em' }],
  'hero':    ['4.5rem',{ lineHeight: '1.1',  letterSpacing: '0.03em' }],
  'heading': ['3.5rem',{ lineHeight: '1.15' }],
  'sub':     ['2.5rem',{ lineHeight: '1.2'  }],
}
```

#### Custom Spacing

```js
spacing: {
  '18': '4.5rem',   // h-18
  '22': '5.5rem',   // h-22 (nav height desktop)
  '30': '7.5rem',   // py-30
  '36': '9rem',
}
```

#### Custom Letter Spacing

```js
letterSpacing: {
  'eyebrow': '0.2em',  // tracking-eyebrow
}
```

#### CSS Component Classes (website/src/index.css)

```css
.btn-primary {
  /* bg-gold text-white px-8 py-3.5 font-sans font-medium text-sm tracking-wider uppercase
     hover:bg-gold-dark transition-all duration-300 */
}

.btn-outline {
  /* border border-white/60 text-white px-8 py-3.5 — for use on dark backgrounds */
}

.btn-outline-dark {
  /* border border-navy text-navy px-8 py-3.5 — for use on light backgrounds */
}

.section-padding {
  /* px-6 sm:px-10 lg:px-20 py-20 lg:py-30 */
}

.eyebrow {
  /* font-sans font-medium text-xs uppercase tracking-eyebrow text-gold */
}

.card {
  /* bg-white overflow-hidden */
}
```

---

## 7. Website Pages — Complete Section Breakdown

### Home (`/`)

Data: `usePageContent('home')`, `useRooms()` (featured only), `useTestimonials()`

Sections:
1. **Full-screen hero** — hero_image_url background, hero_title (SEAGONIA), hero_subtitle, bouncing ChevronDown
2. **Introduction** — 5/5-col grid: text (eyebrow + section_1_title + section_1_text) left, section_1_image_url right
3. **Location teaser** — parallax bg (area_image), stats (80m beach / 3km Paleros / 7 islands), link to /area
4. **Rooms preview** — section_2_title heading, grid of up to 3 featured rooms (is_featured=true), "View All Rooms" button
5. **Experiences grid** — section_3_title heading, 6-image mosaic (exp_1 through exp_6), hover reveals title
6. **Dining teaser** — dining_image background, dining_eyebrow + dining_heading + dining_body
7. **Testimonials** — navy bg, grid of testimonials from testimonials table (quote + name + country)
8. **CTA** — cta_heading + cta_subheading, "Get in Touch" + "Book Now" buttons
9. **CustomSections** — extra_content.custom_sections rendered last

### Rooms (`/rooms`)

Data: `useRooms()`, `usePageContent('rooms')`

Sections:
1. **Page hero** — 40vh, hero_image_url, hero_title, hero_subtitle
2. **Room grid** — 3-col grid, RoomCard component for each published room
3. **Loading skeleton** — 6-card pulse animation while loading
4. **CustomSections**

RoomCard shows: image, name, highlight, link to `/rooms/:slug`, is_featured badge.

### RoomDetail (`/rooms/:slug`)

Data: `useRoom(slug)` — fetches single room with joined amenities

Displays: full-width image, room name, highlight, description, amenities list, bed options, max guests, floor. Back link to /rooms.

### Amenities (`/amenities`)

Data: `useAmenities()`, `usePageContent('amenities')`

Sections:
1. **Page hero** — hero fields
2. **Amenities grid** — icon (Lucide) + name + description cards
3. **CustomSections**

### Dining (`/dining`)

Data: `usePageContent('dining')`

Sections (all content from extra_content):
1. **Page hero** — 50vh
2. **Galiá Restaurant** — text left, image mosaic right (galia_image_1/2/3)
3. **Seagonia Lounge** — 4-image grid left, text right (lounge_image_1/2/3/4)
4. **Farm to Table** — masonry 2-col left, text right (farm_image_1/2/3/4)
5. **Yacht Club** — text left, multi-image right (yacht_image_1 through yacht_image_6)
6. **Cooking Classes** — centered heading, 2-col image grid (cooking_image_1/2)
7. **Beekeeping** — 2 images left, text right (beekeeping_image_1/2)
8. **CustomSections**

### Experiences (`/experiences`)

Data: `usePageContent('experiences')`

Sections:
1. **Mosaic hero** — 3x2 grid of 6 static images with navy overlay (no hero_image_url used)
2. **Wellness** — images left, text right (wellness_image_1/2)
3. **Fitness** — text left, 3-image right (fitness_image_1/2/3)
4. **Open Water Swimming** — centered heading, full-width image (beach_image), centered body
5. **Boat Trips** — centered heading, body text, 4-col image grid (boating_image_1/2/3/4)
6. **History & Hiking** — 2 images left, text right with bullet list (hiking_image_1/2, hiking_bullet_1/2)
7. **CustomSections**

### Gallery (`/gallery`)

Data: `useGalleryCategories()`, `useGalleryImages()`, `usePageContent('gallery')`

Sections:
1. **Page hero** — 40vh
2. **Category filter buttons** — from gallery_categories, active = gold bg
3. **Image grid** — 4-col masquee grid, Framer Motion AnimatePresence for filter transitions, aspect-square tiles
4. **Lightbox** — ImageLightbox component, prev/next nav, click to open
5. **CustomSections**

Client-side filtering: `allImages.filter(img => img.category?.slug === activeFilter)`

### Area (`/area`)

Data: `usePageContent('area')`

Sections:
1. **Page hero** — 50vh
2. **The Area** — text + image (location_eyebrow/heading/body/image)
3. **The Little Ionian** — image + text with island pills (explore_eyebrow/heading/body/image)
4. **Pogonia** — SectionHeader + 3-col image grid + body text (village_image_1/2/3)
5. **Paleros** — large harbor image + text + 2 inline images (paleros_image_1/2)
6. **Nearby Beaches** — 3-card grid (Vathiavali, Varko Bay, Gerakas) — static data
7. **Getting Here** — 3 travel mode cards (Car/Ferry/Plane) — static data
8. **Get Directions** — button linking to Google Maps with hotel coords
9. **Distances table** — static km values
10. **CustomSections**

### Hotel/About (`/hotel`)

Data: `usePageContent('hotel')`

Sections:
1. **Page hero** — 50vh
2. **About** — text + image (welcome_eyebrow/heading/body/image)
3. **At a Glance** — 4 AnimatedCounter stats (58 rooms, 4 pools, 3 dining, 500m beach)
4. **Facilities** — 4 cards with Lucide icons (Accommodation/Pools/F&B/Activities)
5. **Pool & Multipurpose Room** — full-width image (pool_image) + centered text
6. **Aerial Views** — 2-col image grid (aerial_image_1/2) + aerial_caption italic
7. **CustomSections**

### Contact (`/contact`)

Form fields: name, email, phone, subject, message
On submit: `useContactForm()` mutation → inserts into contact_messages with status='new'

### Book (`/book`)

Booking page — typically a redirect or booking widget embed.

---

## 8. Admin Panel Architecture

### Layout

```
┌────────────────────────────────────────────────────┐
│ Sidebar (w-48, bg-navy)  │ Main content (flex-1)   │
│                          │ bg-slate-900             │
│ SEAGONIA (gold text)     │                          │
│ Admin (white/40)         │                          │
│                          │                          │
│ Primary nav:             │                          │
│ • Dashboard              │                          │
│ • Pages                  │                          │
│ • Rooms                  │                          │
│ • Gallery                │                          │
│ • Testimonials           │                          │
│ • Amenities              │                          │
│ • Experiences            │                          │
│ • Settings               │                          │
│ ─────────────────        │                          │
│ • Messages               │                          │
│ • Newsletter             │                          │
│                          │                          │
│ user@email.com           │                          │
│ Sign out                 │                          │
└────────────────────────────────────────────────────┘
```

Active nav item: `bg-gold text-white`. Inactive: `text-white/70 hover:text-white hover:bg-white/10`.

### Admin Routes (App.jsx)

```
/login      → Login page (unprotected)
/           → Layout (protected) with Outlet
  /         → Dashboard
  /pages    → PagesEditor
  /rooms    → RoomsAdmin
  /gallery  → GalleryAdmin
  /testimonials → TestimonialsAdmin
  /amenities    → AmenitiesAdmin
  /experiences  → ExperiencesAdmin
  /settings     → SettingsAdmin
  /messages     → MessagesAdmin
  /newsletter   → NewsletterAdmin
```

Route protection: `useAuth()` hook checks Supabase session. If no user, redirect to `/login`.

### Admin Pages

#### Dashboard
Stats cards (from `useAdminStats()`):
- Total rooms
- New messages (status='new')
- Published testimonials
- Total gallery images

Uses `Promise.all` with `.select('id', { count: 'exact', head: true })` queries.

#### PagesEditor (`/pages`)

Two-level layout: page selector list on left, form on right.

Pages available: home, rooms, gallery, amenities, experiences, dining, area, hotel (displayed as "About").

Each page has a custom form component:
- **HomeForm** — full form with hero fields + all extra_content fields + 6 experience grid items + SEO section + CustomSections editor
- **DiningForm** — all dining section fields + SEO + CustomSections
- **ExperiencesForm** — all experiences section fields + SEO + CustomSections
- **HotelForm** — welcome/pool/aerial fields + SEO + CustomSections
- **AreaForm** — location/explore/village/paleros fields + SEO + CustomSections
- **GenericPageForm** — hero fields only + SEO + CustomSections (used for rooms, gallery, amenities)

Every form has a gold-bordered SEO section at bottom with seo_title, seo_description, seo_og_image (ImagePicker).

Save flow: `useUpdatePageContent()` mutation → `supabase.from('page_content').update(fields).eq('id', id)`

CustomSections editor in each form: add/remove/reorder with ↑↓ buttons, type selector (Text Block / Image + Text / Image Only), ImagePicker for images.

#### RoomsAdmin

Full CRUD. Fields: name, slug, type (A/B/C/D/E/F), description, highlight, floor, max_guests, bed_options (text array — comma-separated input), image_url (ImagePicker), is_featured, is_published, display_order.

#### GalleryAdmin

- **List view** — thumbnail grid (5-col), infinite scroll (20 per page), IntersectionObserver sentinel
- **Filter** — category buttons (all + each category)
- **Upload button** — `<input type="file" multiple>` → `uploadToCloudinary()` → `create.mutateAsync()`
- **Create/Edit form** — ImagePicker, title, category select, display_order, is_published

Cloudinary upload function:
```js
async function uploadToCloudinary(file) {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', UPLOAD_PRESET)  // must be Unsigned
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: fd }
  )
  const data = await res.json()
  return data.secure_url
}
```

#### TestimonialsAdmin, AmenitiesAdmin, ExperiencesAdmin

Standard list + create/edit form pattern. ImagePicker on Experiences. Amenities uses icon (Lucide name text input).

#### SettingsAdmin

Form for hotel_settings: name, tagline, description, total_rooms, phone, email, address, instagram_url, facebook_url.

**Backup section:**
- Export button: fetches all tables, creates JSON blob, triggers download as `seagonia-backup-YYYY-MM-DD.json`
- Import button: reads JSON file, uses `supabase.upsert()` on each table with `{ onConflict: 'id' }`
- Deploy button (`DeployButton` component from Layout.jsx): POST to `VITE_DEPLOY_HOOK` URL

#### MessagesAdmin

Table view of contact_messages ordered by created_at desc. Columns: date, name, email, subject, status badge. Can update status (new → read → replied) via `useUpdateMessageStatus()`.

#### NewsletterAdmin

Table view of newsletter_subscribers ordered by created_at desc.

### ImagePicker Component (admin/src/components/ImagePicker.jsx)

The most important shared admin component. Opens a modal for image selection.

```
Props:
  value      — current image URL (string)
  onChange   — callback(url: string)
  label      — field label text (default: 'Image')
  fallbackSrc — shown as preview when value is empty, labeled "default"
```

**Tabs:**
- **Hotel Photos** — 77 local images loaded as `${WEBSITE_BASE}/images/hotel/img-001.jpg` through `img-077.jpg` (starts at 001, not 000 — img-000.jpg is used as OG only)
- **Gallery** — all images from `useAdminGallery()`, URLs resolved via `resolveUrl()`

```js
const WEBSITE_BASE = 'https://seagonia.vercel.app'

// Generates array of 77 URLs
const LOCAL_IMAGES = Array.from({ length: 77 }, (_, i) => {
  const n = String(i + 1).padStart(3, '0')
  return `${WEBSITE_BASE}/images/hotel/img-${n}.jpg`
})

function resolveUrl(url) {
  if (!url) return url
  if (url.startsWith('http')) return url
  return `${WEBSITE_BASE}${url}`  // converts relative paths to absolute
}
```

**Infinite scroll:** Shows 30 images at a time (PAGE_SIZE = 30). IntersectionObserver on a sentinel div loads 30 more when reached.

**Auto-tab switching:** If current value starts with `http` and is NOT a vercel.app URL (i.e. it's a Cloudinary URL), modal opens on Gallery tab. Otherwise opens on Hotel Photos tab.

**Selection highlight:** Selected image gets gold border (`border-gold`) + gold overlay + white checkmark `✓`.

**Search:** Text filter on URL — for local images users type part of the number (e.g. "028").

**IMPORTANT:** Update `WEBSITE_BASE` constant when the final domain is known.

### Admin Data Pattern (useAdmin.js)

All CRUD follows this exact pattern — shown for Rooms as example:

```js
// READ
export function useAdminRooms() {
  return useQuery({
    queryKey: ['admin', 'rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

// UPDATE
export function useUpdateRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('rooms').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}

// CREATE
export function useCreateRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('rooms').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}

// DELETE
export function useDeleteRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('rooms').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}
```

Pattern: every mutation invalidates its query key on success. Saving feedback via local `saved` state + `setTimeout`.

### Admin CSS Utilities (admin/src/index.css)

```css
/* Buttons */
.btn-primary   { bg-gold text-white hover:bg-amber-600 — px-4 py-2 text-sm rounded }
.btn-secondary { border border-slate-600 text-slate-300 hover:bg-slate-700 }
.btn-danger    { text-red-400 hover:bg-red-900/30 }
.btn-edit      { px-3 py-1.5 text-xs border border-slate-600 rounded text-slate-300 hover:border-gold hover:text-gold }
.btn-delete    { px-3 py-1.5 text-xs border border-red-900/60 rounded text-red-400 hover:bg-red-900/20 hover:border-red-500 }

/* Form elements */
.input         { w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white
                 placeholder-slate-400 focus:outline-none focus:border-gold }
.label         { block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1 }

/* Containers */
.card          { bg-slate-800 border border-slate-700 rounded-lg }
.section-card  { bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4 }

/* Status badges */
.badge-published { px-2 py-0.5 rounded text-xs font-semibold bg-green-900/50 text-green-400 }
.badge-draft     { bg-slate-700 text-slate-400 }
.badge-new       { bg-blue-900/50 text-blue-400 }
.badge-read      { bg-slate-700 text-slate-400 }

/* Table classes */
.th            { px-4 py-3 text-slate-400 font-medium text-left }
.td            { px-4 py-3 text-slate-300 }
.tr            { border-b border-slate-700/50 hover:bg-slate-700/30 }
```

---

## 9. Key Patterns and Decisions

### Content Fallback Pattern

Every single content variable in every page component has a hardcoded fallback. The site renders fully without Supabase:

```js
const heroTitle   = content?.hero_title     || 'SEAGONIA'
const heroImage   = content?.hero_image_url || HOTEL_IMAGES.hero
const eyebrow     = extra.intro_eyebrow     || 'Welcome'
const heading     = pageContent?.section_1_title || 'A Peaceful Retreat by the Ionian Sea'
```

This means:
- The site can be demoed locally without any Supabase data
- A Supabase outage does not break the site
- New page fields are safe to add in admin before website code is updated

### Image URL Pattern

**Three types of image URLs exist in the system:**

1. **Local/relative** — `/images/hotel/img-001.jpg` (used as fallback defaults in constants/hotel.js, stored this way in Supabase)
2. **Absolute local** — `https://seagonia.vercel.app/images/hotel/img-001.jpg` (how ImagePicker stores picks from Hotel Photos tab)
3. **Cloudinary** — `https://res.cloudinary.com/CLOUD_NAME/image/upload/...` (uploads from Gallery admin)

The website renders all three correctly because `<img src>` handles both relative and absolute URLs.

The `resolveUrl()` function in `ImagePicker.jsx` and `GalleryAdmin.jsx` converts relative URLs to absolute for display in the admin (which runs at a different origin):

```js
function resolveUrl(url) {
  if (!url) return url
  if (url.startsWith('http')) return url
  return `${WEBSITE_BASE}${url}`
}
```

### Custom Sections

Stored as an array in `extra_content.custom_sections`. The `CustomSections` component (`website/src/components/shared/CustomSections.jsx`) renders them below the main page content:

```jsx
export default function CustomSections({ sections }) {
  if (!sections?.length) return null
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto space-y-20">
        {sections.map((section) => {
          if (section.type === 'text')       return <TextSection key={section.id} section={section} />
          if (section.type === 'image_text') return <ImageTextSection key={section.id} section={section} />
          if (section.type === 'image')      return <ImageSection key={section.id} section={section} />
          return null
        })}
      </div>
    </section>
  )
}
```

Section renderers:
- `TextSection` — centered max-w-3xl, heading (font-serif text-heading) + body (whitespace-pre-line)
- `ImageTextSection` — 2-col grid, image (aspect-[4/3]) + text, `image_position: 'right'` reverses order
- `ImageSection` — full-width aspect-[16/7] image + optional italic caption

### Header Behavior

Fixed header (`z-50`). Transparent with white text when `window.scrollY <= 50`. White background with navy text and box-shadow when scrolled. Transition `duration-500`. Desktop: logo left, nav center-right, language toggle + Book Now CTA right. Mobile: hamburger triggers MobileMenu slide-in.

### Footer

Wired to `useHotelSettings()` with fallbacks to `HOTEL` constants and env vars. Three columns: brand + newsletter form, quick links, contact + social. Newsletter form calls `subscribeNewsletter(email)` API function (not the hook). Bottom strip with copyright + Privacy/Cookie policy links.

### DeployButton (admin/src/components/Layout.jsx)

POSTs to `VITE_DEPLOY_HOOK`. Shown in sidebar area and also in SettingsAdmin Backup section. Only renders if env var is set. States: idle / loading / done (4s) / error (4s).

---

## 10. Environment Variables

### Website (`website/.env.local`)

```
VITE_SUPABASE_URL=https://pnjfxostbiscwihpatjk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_HOTEL_PHONE=+302643041736
VITE_HOTEL_EMAIL=welcome@seagonia.com
VITE_HOTEL_ADDRESS=Pogonia, Paleros 300 12, Greece
```

These are also set in Vercel project environment variables for production builds.

### Admin (`admin/.env`)

```
VITE_SUPABASE_URL=https://pnjfxostbiscwihpatjk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=seagonia-admin
VITE_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
```

Note: Admin Supabase client uses `persistSession: true` (unlike website which uses `false`) to maintain login state.

---

## 11. Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Dashboard → top-left shows your **Cloud name** — copy it
3. Settings → Upload → Upload presets tab → **Add upload preset**
4. Set:
   - Preset name: `seagonia-admin`
   - Signing mode: **Unsigned** (critical — signed presets require server-side signing)
5. Save
6. Add `VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name` to `admin/.env`
7. Add `VITE_CLOUDINARY_UPLOAD_PRESET=seagonia-admin` to `admin/.env`

If upload preset is Signed, the upload will return HTTP 400. No API secret is needed for unsigned uploads from the browser.

---

## 12. Supabase Setup

### Creating the Project

1. Create project at [supabase.com](https://supabase.com)
2. Note the **Project URL** and **anon key** from Settings → API
3. Run the SQL from Section 4 in the Supabase SQL Editor

### Authentication

1. Supabase Dashboard → Authentication → Settings
2. Enable **Email** provider
3. Create admin user: Authentication → Users → Invite user → enter admin email
4. Set a password: Authentication → Users → click user → Update password
5. URL Configuration: Authentication → URL Configuration → add admin app URL to "Redirect URLs" (e.g. `https://your-admin.vercel.app`)

### Row Level Security (RLS)

The website uses the anon key (public read-only). Recommended RLS setup:

```sql
-- Allow public read on all public tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published rooms"
  ON rooms FOR SELECT USING (is_published = true);

-- Repeat for: amenities, experiences, testimonials, gallery_images,
--             gallery_categories, page_content, hotel_settings, texts

-- Allow public insert on contact forms
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact"
  ON contact_messages FOR INSERT WITH CHECK (true);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Admin operations require authenticated user
-- (admin uses same anon key but with Supabase auth session)
-- For full security, create service role policies for admin writes
```

Simplest approach for a private hotel site: disable RLS on all tables (Supabase project is protected by knowing the anon key, and the admin is protected by auth).

### Seed Data

Insert one row into `hotel_settings`:

```sql
INSERT INTO hotel_settings (name, tagline, description, phone, email, address, instagram_url, facebook_url, total_rooms)
VALUES (
  'Seagonia Hotel',
  'Your Corner by the Sea',
  'A boutique hotel nestled in the serene village of Pogonia...',
  '+302643041736',
  'welcome@seagonia.com',
  'Pogonia, Paleros 300 12, Greece',
  'https://www.instagram.com/seagoniahotel',
  'https://www.facebook.com/seagoniahotel',
  58
);
```

Insert one row per page into `page_content`:

```sql
INSERT INTO page_content (page_name, is_published) VALUES
  ('home', true),
  ('rooms', true),
  ('gallery', true),
  ('amenities', true),
  ('dining', true),
  ('experiences', true),
  ('area', true),
  ('hotel', true);
```

---

## 13. Deployment

### Website (Vercel Project 1)

**Vercel project settings:**
- Framework: Vite
- Root Directory: `website`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

OR use the root-level `vercel.json` if deploying from repo root:

```json
{
  "buildCommand": "cd website && npm install && npm run build",
  "outputDirectory": "website/.next",
  "installCommand": "echo skip",
  "framework": null
}
```

Note: The root `vercel.json` has `outputDirectory: "website/.next"` which is a leftover from a reverted Next.js migration — this should be corrected to `"website/dist"` for a proper Vite build.

**Environment variables** (set in Vercel dashboard):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_HOTEL_PHONE`
- `VITE_HOTEL_EMAIL`
- `VITE_HOTEL_ADDRESS`

### Admin (Vercel Project 2)

The admin is a **separate Vercel project** connected to the same GitHub repo. Set Root Directory to `admin/` in the Vercel project settings.

The `admin/vercel.json` handles SPA routing:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

The `rewrites` rule is critical — without it, direct navigation to `/pages`, `/rooms`, etc. returns 404.

**Environment variables** (set in admin Vercel project):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_DEPLOY_HOOK`

### Deploy Hook Setup

1. Website Vercel project → Settings → Git → Deploy Hooks
2. Create hook named "Admin Trigger", branch "main"
3. Copy the hook URL
4. Set as `VITE_DEPLOY_HOOK` in admin Vercel env vars
5. The Deploy button in admin Settings will POST to this URL, triggering a website rebuild

### Git Workflow

```bash
# Always use SSH remote to avoid credential prompts
git remote set-url origin git@github.com:adenadoume/seagonia-react-cms-refine-dev.git

# Push to main triggers both Vercel projects to rebuild
git push origin main
```

---

## 14. SEO Implementation

### Static SEO (index.html)

`website/index.html` contains static fallbacks for social sharing platforms (Facebook, WhatsApp, LinkedIn) that don't execute JavaScript:

- Open Graph tags: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`, `og:locale`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **JSON-LD Hotel schema** for Google Rich Results:
  - `@type: "Hotel"` with name, description, url, image
  - `address` with PostalAddress, addressLocality (Pogonia), addressRegion, addressCountry (GR)
  - `geo` GeoCoordinates (lat 38.785, lng 20.876)
  - `numberOfRooms: 58`
  - `starRating: 4`
  - `amenityFeature` array (pool, beach, restaurant, wifi, spa)

### Dynamic SEO (useSEO hook)

Each page updates `document.title` and meta tags on mount. See Section 6 for full implementation.

### Sitemap and Robots

`website/public/sitemap.xml` — 11 routes with priorities. Auto-copied to `dist/` by Vite (files in `public/` are copied verbatim).

`website/public/robots.txt` — `Allow: /` for all crawlers, `Sitemap: https://seagonia.vercel.app/sitemap.xml`.

**When final domain is known, update:**
1. `website/index.html` — 3 URLs (og:image, og:url, JSON-LD url + image)
2. `website/public/sitemap.xml` — all 11 `<loc>` entries
3. `admin/src/components/ImagePicker.jsx` — `WEBSITE_BASE` constant
4. `admin/src/pages/GalleryAdmin.jsx` — `WEBSITE_BASE` constant

---

## 15. What NOT To Do (Learned Lessons)

### DO NOT migrate to Next.js

The project was migrated to Next.js and reverted (commit `7e9fdb3`). The issues:
- React Router doesn't work in Next.js App Router
- Framer Motion requires `'use client'` on every animated component
- Supabase SSR auth complexity
- The SEO benefit is minimal for a hotel site — Google crawls JavaScript fine

### DO NOT add vite-plugin-prerender

Pages fetch content from Supabase at runtime. Pre-rendering captures the loading skeleton state, not the actual content. Zero SEO benefit, real build risk.

### Always use SSH git remote

```bash
# Not this:
git remote set-url origin https://github.com/adenadoume/seagonia-react-cms-refine-dev.git

# This:
git remote set-url origin git@github.com:adenadoume/seagonia-react-cms-refine-dev.git
```

---

## 16. Planned Features (Not Yet Implemented)

### Script Injection (next priority)

Store scripts in `hotel_settings` or new `site_scripts` table:

```json
{
  "head": "<script>...(GTM head snippet)...</script>",
  "body_start": "<noscript>...(GTM noscript)...</noscript>",
  "body_end": ""
}
```

Inject in website root `App.jsx` or `main.jsx` via `useEffect`. Supports:
- Google Tag Manager
- Google Analytics 4
- Google Ads conversion tracking
- Google Maps API key
- reCAPTCHA v3
- Cookiebot / EU cookie consent

---

## 17. Replication Instructions

### Step 1: Create Supabase Project

1. Go to supabase.com → New Project
2. SQL Editor → run all CREATE TABLE statements from Section 4
3. Insert seed data (hotel_settings row + 8 page_content rows) from Section 12
4. Create admin user in Authentication → Users
5. Note Project URL and anon key

### Step 2: Create Two Vite React Apps

```bash
mkdir seagonia && cd seagonia
npm create vite@latest website -- --template react
npm create vite@latest admin -- --template react
```

### Step 3: Install Dependencies

```bash
# Website
cd website
npm install @supabase/supabase-js @tanstack/react-query framer-motion lucide-react react-router-dom react-day-picker axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Admin
cd ../admin
npm install @supabase/supabase-js @tanstack/react-query react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 4: Copy the Design System

**website/tailwind.config.js** — exact colors, fonts, font sizes, spacing, letter spacing from Section 6.

**website/src/index.css** — exact component classes: `.btn-primary`, `.btn-outline`, `.btn-outline-dark`, `.section-padding`, `.eyebrow`, `.card`.

**admin/tailwind.config.js** — gold, navy, cream only.

**admin/src/index.css** — all admin utility classes from Section 8.

Add Google Fonts to `website/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet">
```

### Step 5: Set Up Static Images

Put 77+ hotel images in `website/public/images/hotel/`:
- `img-000.jpg` — OG fallback image
- `img-001.jpg` through `img-077.jpg` — hotel images

The `HOTEL_IMAGES` object in `constants/hotel.js` maps semantic names to these paths.

### Step 6: Build the Website

1. Create `src/constants/hotel.js` with HOTEL, ROOMS, AMENITIES, HOTEL_IMAGES constants
2. Create `src/lib/supabase.js` with Supabase client + hotelAPI functions
3. Create `src/hooks/useSupabase.js` with all Query hooks
4. Create `src/hooks/useSEO.js`
5. Create `src/components/layout/Header.jsx` and `Footer.jsx`
6. Create `src/components/shared/CustomSections.jsx`, `RoomCard.jsx`, `SectionHeader.jsx`, `ImageLightbox.jsx`
7. Create all page components following the page pattern from Section 6
8. Wire `App.jsx` with all routes

### Step 7: Build the Admin

1. Create `src/lib/supabase.js` with admin Supabase client (persistSession: true)
2. Create `src/hooks/useAuth.js` and `src/hooks/useAdmin.js`
3. Create `src/components/Layout.jsx` (sidebar + DeployButton)
4. Create `src/components/ImagePicker.jsx`
5. Create all admin page components
6. Wire `App.jsx` with auth protection and routes

### Step 8: Configure Cloudinary

Follow Section 11.

### Step 9: Deploy Website to Vercel

1. Push repo to GitHub
2. Connect Vercel to GitHub repo
3. Set Root Directory = `website`, Framework = Vite
4. Add environment variables
5. Deploy

### Step 10: Deploy Admin as Separate Vercel Project

1. Create new Vercel project from same GitHub repo
2. Set Root Directory = `admin`
3. The `admin/vercel.json` handles build config and SPA rewrites
4. Add environment variables including VITE_DEPLOY_HOOK
5. Add admin URL to Supabase allowed redirect URLs
6. Deploy

---

## 18. Quick Reference Card

| Thing | Value |
|---|---|
| Supabase project ID | `pnjfxostbiscwihpatjk` |
| GitHub repo | `git@github.com:adenadoume/seagonia-react-cms-refine-dev.git` |
| Website URL | `https://seagonia.vercel.app` |
| Admin dev port | `5174` |
| Website dev port | `3000` (default Vite) |
| Image count | 77 (img-001 to img-077) + img-000 for OG |
| ImagePicker WEBSITE_BASE | `https://seagonia.vercel.app` — update when domain changes |
| GalleryAdmin WEBSITE_BASE | Same — update when domain changes |
| index.html OG URLs | 3 occurrences of `seagonia.vercel.app` — update when domain changes |
| sitemap.xml | 11 `<loc>` entries — update when domain changes |
| Cloudinary preset name | `seagonia-admin` (must be Unsigned) |
| Admin sidebar width | `w-48` (192px) |
| Gold color | `#C9A96E` |
| Navy color | `#1A1F3D` (website) / `#1a2744` (admin) |
| Cream color | `#FAF8F3` |
| Serif font | Cormorant Garamond |
| Sans font | Outfit |
