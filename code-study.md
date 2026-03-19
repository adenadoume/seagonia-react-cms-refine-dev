# Code Study — Boutique Hotel Website + CMS

> A growing tutorial and reference document for the patterns used in this project.
> New sections are added here whenever new code patterns are built or when asked.
> Each section explains *why* the pattern exists, *how* it works, and shows real examples from the codebase.

---

## Table of Contents

1. [TanStack Query — Data Fetching Hooks](#1-tanstack-query--data-fetching-hooks)
2. [Supabase CRUD — Admin Mutations](#2-supabase-crud--admin-mutations)
3. [Content Fallback Pattern](#3-content-fallback-pattern)
4. [Page Content with extra_content JSONB](#4-page-content-with-extra_content-jsonb)
5. [ImagePicker Component](#5-imagepicker-component)
6. [resolveUrl — Image URL Normalization](#6-resolveurl--image-url-normalization)
7. [useSEO Hook — Dynamic Meta Tags](#7-useseo-hook--dynamic-meta-tags)
8. [useAuth — Supabase Authentication](#8-useauth--supabase-authentication)
9. [Framer Motion — Animation Patterns](#9-framer-motion--animation-patterns)
10. [CustomSections — CMS-Driven Layout Blocks](#10-customsections--cms-driven-layout-blocks)
11. [IntersectionObserver — Infinite Scroll](#11-intersectionobserver--infinite-scroll)
12. [Cloudinary — Browser Image Upload](#12-cloudinary--browser-image-upload)
13. [DeployButton — Vercel Webhook Trigger](#13-deploybutton--vercel-webhook-trigger)
14. [JSON Export/Import — Backup & Restore](#14-json-exportimport--backup--restore)

---

## 1. TanStack Query — Data Fetching Hooks

### Why
TanStack Query (React Query) handles all async data fetching. It gives us: automatic caching, background refetching, loading/error states, and mutations with optimistic updates — without writing any of that manually.

### How it works
Every Supabase query is wrapped in a `useQuery` hook. The `queryKey` is a unique identifier that React Query uses for caching and invalidation.

### Pattern

```js
// website/src/hooks/useSupabase.js
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

// Read a single page's content
export function usePageContent(pageName) {
  return useQuery({
    queryKey: ['page_content', pageName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', pageName)
        .single()
      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  })
}

// Read all rooms (published only)
export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_published', true)
        .order('display_order')
      if (error) throw error
      return data ?? []
    },
  })
}
```

### Usage in a page component

```jsx
function RoomsPage() {
  const { data: rooms, isLoading, isError } = useRooms()

  if (isLoading) return <Spinner />
  if (isError) return <p>Failed to load rooms</p>

  return rooms.map(room => <RoomCard key={room.id} room={room} />)
}
```

### Key concepts
- `queryKey` arrays: `['rooms']` vs `['rooms', roomId]` — more specific keys = separate cache entries
- `staleTime`: how long before data is considered stale and refetched in background
- `data ?? []`: always return a safe default to avoid `.map()` errors on null

---

## 2. Supabase CRUD — Admin Mutations

### Why
The admin panel needs to create, update, and delete records. TanStack Query's `useMutation` handles this and lets us invalidate the cache after a change so the UI refreshes automatically.

### Pattern

```js
// admin/src/hooks/useAdmin.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

// READ
export function useAdminRooms() {
  return useQuery({
    queryKey: ['admin_rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms').select('*').order('display_order')
      if (error) throw error
      return data ?? []
    },
  })
}

// CREATE
export function useCreateRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { data, error } = await supabase.from('rooms').insert(fields).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_rooms'] }),
  })
}

// UPDATE
export function useUpdateRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('rooms').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_rooms'] }),
  })
}

// DELETE
export function useDeleteRoom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('rooms').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_rooms'] }),
  })
}
```

### Usage in admin page

```jsx
function RoomsAdmin() {
  const { data: rooms } = useAdminRooms()
  const create = useCreateRoom()
  const update = useUpdateRoom()
  const del = useDeleteRoom()

  async function handleSave(form) {
    if (form.id) {
      await update.mutateAsync(form)
    } else {
      await create.mutateAsync(form)
    }
  }

  return (
    <>
      <button disabled={create.isPending}>Save</button>
      {create.isError && <p>Error: {create.error.message}</p>}
    </>
  )
}
```

### Key concepts
- `onSuccess: () => queryClient.invalidateQueries(...)` — after a mutation, tell React Query to refetch that data
- `mutateAsync` vs `mutate`: `mutateAsync` returns a promise (use with `await`), `mutate` is fire-and-forget
- `isPending` — true while the mutation is running, use to disable buttons

---

## 3. Content Fallback Pattern

### Why
The website must render correctly even if Supabase is down, the data hasn't been entered yet, or the page is viewed locally without a Supabase connection. Every content variable has a hardcoded default.

### Pattern

```js
// In any page component:
const { data: pageContent } = usePageContent('dining')
const extra = pageContent?.extra_content ?? {}

// Every field: Supabase value || hardcoded fallback
const heroTitle    = pageContent?.hero_title     || 'Dining'
const heroImage    = pageContent?.hero_image_url || HOTEL_IMAGES.galiaRooftop

const galiaHeading = extra.galia_heading || 'Galià Rooftop Restaurant'
const galiaBody    = extra.galia_body    || 'Overlooking the bay with panoramic views...'
const galiaImage1  = extra.galia_image_1 || HOTEL_IMAGES.galiaRooftop
```

### Why `?? {}` instead of `|| {}`
```js
const extra = pageContent?.extra_content ?? {}
//                                       ^^
// ?? (nullish coalescing) only falls back for null/undefined
// || would also fall back for 0, false, "" — which could erase valid data
```

### Nested optional chaining
```js
// Safe even if pageContent is null/undefined
const value = pageContent?.extra_content?.some_field || 'default'

// Equivalent to:
const value = (pageContent && pageContent.extra_content && pageContent.extra_content.some_field) || 'default'
```

---

## 4. Page Content with extra_content JSONB

### Why
Each page (home, dining, experiences, etc.) needs different fields. Instead of creating separate tables for each page, all per-page fields are stored as a single JSONB column `extra_content` in the `page_content` table.

### Database structure

```
page_content table:
  id              UUID
  page_name       TEXT  ('home', 'dining', 'hotel', ...)
  hero_title      TEXT  -- shared across all pages
  hero_subtitle   TEXT
  hero_image_url  TEXT
  section_1_title TEXT  -- used differently per page
  section_1_text  TEXT
  section_1_image_url TEXT
  section_2_title TEXT
  section_3_title TEXT
  extra_content   JSONB  -- page-specific fields as JSON object
  seo_title       TEXT
  seo_description TEXT
  is_published    BOOLEAN
```

### Reading extra_content in a page

```js
const { data: pageContent } = usePageContent('dining')
const extra = pageContent?.extra_content ?? {}

// Any key stored in the JSON is accessible directly
const heading = extra.galia_heading || 'Default'
const image   = extra.galia_image_1 || HOTEL_IMAGES.galiaRooftop
```

### Writing extra_content in admin

```js
// In PagesEditor — the form stores all fields in a flat object
const [form, setForm] = useState({})

// Load existing data
useEffect(() => {
  if (page) {
    setForm({
      hero_title: page.hero_title || '',
      hero_image_url: page.hero_image_url || '',
      // Spread extra_content fields flat into the form
      ...(page.extra_content ?? {}),
    })
  }
}, [page])

// Update any field
function set(field, value) {
  setForm(f => ({ ...f, [field]: value }))
}

// On save — split back into top-level fields + extra_content
async function handleSave() {
  const { hero_title, hero_subtitle, hero_image_url,
          section_1_title, section_1_text, section_1_image_url,
          section_2_title, section_3_title, ...extra } = form

  await update.mutateAsync({
    id: page.id,
    hero_title, hero_subtitle, hero_image_url,
    section_1_title, section_1_text, section_1_image_url,
    section_2_title, section_3_title,
    extra_content: extra,
  })
}
```

### Key insight
The form uses a **flat object** for all fields (both top-level and extra_content fields). On save, it destructures the known top-level fields out and packs everything else back into `extra_content`. This makes the form simple — just `form.galia_heading` everywhere.

---

## 5. ImagePicker Component

### Why
Editors need to pick images for page sections without typing URLs manually. The ImagePicker is a modal with two tabs: hotel static images (77 JPGs from `public/images/hotel/`) and uploaded gallery images from Supabase/Cloudinary.

### Props

```jsx
<ImagePicker
  label="Hero Image"
  value={form.hero_image_url}          // current URL (or empty string)
  onChange={(url) => set('hero_image_url', url)}
  fallbackSrc={HOTEL_IMAGES.hero}      // shown as preview when value is empty
/>
```

- `value` — the stored URL (can be relative like `/images/hotel/img-001.jpg` or absolute)
- `onChange` — called with the full absolute URL when user picks an image
- `fallbackSrc` — what to preview when `value` is empty, labeled "default"

### How it selects and previews

```js
const resolvedValue = resolveUrl(value)          // convert relative → absolute
const effectiveSrc = resolvedValue || resolveUrl(fallbackSrc)
const isUsingFallback = !value && !!fallbackSrc  // show "default" badge

// Preview logic:
// - If value is set: show value image
// - If value is empty but fallbackSrc is set: show fallback with "default" label
// - If both empty: show nothing
```

### Infinite scroll inside the modal

```js
const PAGE_SIZE = 30
const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

// IntersectionObserver watches a sentinel div at the bottom of the grid
const sentinel = useCallback((node) => {
  if (observerRef.current) observerRef.current.disconnect()
  if (!node) return
  observerRef.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setVisibleCount(n => n + PAGE_SIZE)
    }
  })
  observerRef.current.observe(node)
}, [hasMore])

// Attach to a div at the bottom of the image grid:
{hasMore && <div ref={sentinel}>Loading more…</div>}
```

---

## 6. resolveUrl — Image URL Normalization

### Why
Images can be stored in three formats:
1. Relative: `/images/hotel/img-001.jpg` — works on the website but breaks in admin (different origin)
2. Absolute website URL: `https://YOUR_WEBSITE.vercel.app/images/hotel/img-001.jpg`
3. Cloudinary: `https://res.cloudinary.com/...`

The admin runs at a different URL than the website, so relative paths don't load. `resolveUrl()` converts relative paths to absolute by prepending `WEBSITE_BASE`.

### Implementation

```js
const WEBSITE_BASE = 'https://YOUR_WEBSITE.vercel.app'

function resolveUrl(url) {
  if (!url) return url
  if (url.startsWith('http')) return url           // already absolute, return as-is
  return `${WEBSITE_BASE}${url}`                   // prepend base to relative path
}
```

### Usage
```js
// In ImagePicker and GalleryAdmin:
const resolvedSrc = resolveUrl(img.image_url)
// '/images/hotel/img-001.jpg' → 'https://YOUR_WEBSITE.vercel.app/images/hotel/img-001.jpg'
// 'https://res.cloudinary.com/...' → unchanged
```

---

## 7. useSEO Hook — Dynamic Meta Tags

### Why
React SPAs have one `index.html`. For SEO, each page needs different `<title>`, `<meta description>`, and OG tags. The `useSEO` hook updates them dynamically in `useEffect` whenever a page renders.

### Full implementation

```js
// website/src/hooks/useSEO.js
import { useEffect } from 'react'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const useSEO = ({ title, description, ogImage } = {}) => {
  useEffect(() => {
    const siteName = '[YOUR_HOTEL_NAME]'
    const fullTitle = title
      ? `${title} | ${siteName}`
      : `${siteName} — [YOUR_TAGLINE]`

    document.title = fullTitle
    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:site_name', siteName, 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    if (ogImage) setMeta('twitter:image', ogImage)
  }, [title, description, ogImage])
}

export default useSEO
```

### Usage in any page

```js
// At the top of the page component (after data is loaded):
const extra = pageContent?.extra_content ?? {}

useSEO({
  title: extra.seo_title || 'Rooms',
  description: extra.seo_description || 'Browse our room types.',
  ogImage: extra.seo_og_image,   // optional — skipped if empty
})
```

### How `setMeta` works
- Looks for an existing `<meta>` tag with the given `name` or `property` attribute
- If found: updates its `content`
- If not found: creates it and appends to `<head>`
- This is safe to call multiple times — it never creates duplicates

---

## 8. useAuth — Supabase Authentication

### Why
The admin panel is password-protected. `useAuth` wraps Supabase's auth session into a React hook so any component can check if the user is logged in.

### Full implementation

```js
// admin/src/hooks/useAuth.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { user, loading, signIn, signOut }
}
```

### ProtectedRoute in App.jsx

```jsx
function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-navy" />   // blank while checking
  if (!user) return <Navigate to="/login" replace />              // redirect if not logged in
  return <Outlet />                                               // render children if logged in
}

// In your router:
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="rooms" element={<RoomsAdmin />} />
    {/* ... all other admin routes */}
  </Route>
</Route>
<Route path="/login" element={<Login />} />
```

### Admin Supabase client
The admin uses `persistSession: true` so the user stays logged in after page refresh:

```js
// admin/src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: true } }
)
```

---

## 9. Framer Motion — Animation Patterns

### Why
Framer Motion adds scroll-triggered entrance animations to sections and images. The website uses consistent `fadeIn`, `fadeUp`, `fadeLeft`, `fadeRight` variants for a unified feel.

### Variant definitions (reused everywhere)

```js
// Define once per file (or in a shared constants file):
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
```

### Scroll-triggered section (viewport detection)

```jsx
import { motion } from 'framer-motion'

<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}   // trigger when 20% of section is visible
>
  <motion.h2 variants={fadeUp}>Section Title</motion.h2>
  <motion.p variants={fadeUp}>Body text.</motion.p>
  <motion.img variants={fadeRight} src={image} />
</motion.section>
```

### Key props
- `initial="hidden"` — start in the hidden state
- `whileInView="visible"` — animate to visible when scrolled into view
- `viewport={{ once: true }}` — only animate once, not every time you scroll past
- `viewport={{ amount: 0.2 }}` — trigger when 20% of the element is visible

### Page-load animation (hero)

```jsx
// Hero animates immediately on page load (no scroll trigger):
<motion.h1
  variants={fadeIn}
  initial="hidden"
  animate="visible"   // ← "animate" not "whileInView"
>
  {heroTitle}
</motion.h1>
```

---

## 10. CustomSections — CMS-Driven Layout Blocks

### Why
Editors need to add one-off content blocks to any page without a code deploy. `custom_sections` is a JSON array in `extra_content` that stores editor-defined content blocks.

### Data structure (stored in extra_content.custom_sections)

```json
[
  {
    "id": "abc123",
    "type": "text",
    "title": "Special Offer",
    "body": "Book 3 nights, get the 4th free."
  },
  {
    "id": "def456",
    "type": "image_text",
    "title": "New Arrival",
    "body": "Our new suite is now available.",
    "image": "https://YOUR_WEBSITE.vercel.app/images/hotel/img-031.jpg",
    "imagePosition": "left"
  },
  {
    "id": "ghi789",
    "type": "image",
    "image": "https://res.cloudinary.com/..."
  }
]
```

### CustomSections component (website side)

```jsx
// website/src/components/shared/CustomSections.jsx
export default function CustomSections({ sections }) {
  if (!sections?.length) return null
  return (
    <div className="space-y-16">
      {sections.map(section => {
        if (section.type === 'text') return <TextBlock key={section.id} {...section} />
        if (section.type === 'image_text') return <ImageTextBlock key={section.id} {...section} />
        if (section.type === 'image') return <ImageBlock key={section.id} {...section} />
        return null
      })}
    </div>
  )
}
```

### Usage in page

```jsx
// At the bottom of every page:
<CustomSections sections={extra.custom_sections} />
```

### Admin editor (in PagesEditor)
The admin has an array editor: add/remove/reorder sections with ↑↓ buttons, pick type from a dropdown, fill in title/body/image with ImagePicker.

---

## 11. IntersectionObserver — Infinite Scroll

### Why
Loading all 77+ images at once in a grid causes slow page load and memory issues. Infinite scroll loads images in batches of 20-30 as the user scrolls down.

### Pattern (used in GalleryAdmin and ImagePicker)

```js
const PAGE_SIZE = 20
const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
const observerRef = useRef(null)

const allItems = data ?? []
const visible = allItems.slice(0, visibleCount)
const hasMore = visibleCount < allItems.length

// "sentinel" ref — attaches to a div at the bottom of the list
const sentinel = useCallback((node) => {
  // Disconnect previous observer if it exists
  if (observerRef.current) observerRef.current.disconnect()
  if (!node) return

  observerRef.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setVisibleCount(n => n + PAGE_SIZE)
    }
  })
  observerRef.current.observe(node)
}, [hasMore])   // recreate when hasMore changes

// Reset when filter changes:
useEffect(() => { setVisibleCount(PAGE_SIZE) }, [activeCategory])
```

### JSX

```jsx
<div className="grid grid-cols-4 gap-2">
  {visible.map(item => <ImageCard key={item.id} item={item} />)}
</div>

{hasMore && (
  <div ref={sentinel} className="py-8 text-center text-slate-400 text-sm">
    Loading more…
  </div>
)}
{!hasMore && allItems.length > 0 && (
  <p className="text-center text-slate-600 text-xs py-4">
    All {allItems.length} images shown
  </p>
)}
```

### Why `useCallback` with `[hasMore]` dependency
The sentinel ref callback is recreated whenever `hasMore` changes. This is necessary because the IntersectionObserver closure captures `hasMore` at creation time. If you don't recreate it, the observer always uses the initial `hasMore = true` value and never stops loading.

---

## 12. Cloudinary — Browser Image Upload

### Why
Hotel staff needs to upload new images from the admin panel without FTP or developer help. Cloudinary's unsigned upload preset allows direct browser-to-Cloudinary uploads with no server needed.

### Upload function

```js
// admin/src/pages/GalleryAdmin.jsx
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

async function uploadToCloudinary(file) {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', UPLOAD_PRESET)   // must be "Unsigned" in Cloudinary settings

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: fd }
  )

  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
  const json = await res.json()
  return json.secure_url   // e.g. "https://res.cloudinary.com/yourcloud/image/upload/v123/abc.jpg"
}
```

### Multi-file upload handler

```jsx
async function handleFiles(e) {
  const files = Array.from(e.target.files)
  setUploading(true)
  try {
    for (const file of files) {
      const url = await uploadToCloudinary(file)
      await create.mutateAsync({ image_url: url, is_published: true })
    }
  } finally {
    setUploading(false)
    e.target.value = ''   // reset file input so same file can be re-selected
  }
}

// File input (hidden, triggered by button):
<input
  type="file"
  multiple
  accept="image/*"
  className="hidden"
  ref={fileInputRef}
  onChange={handleFiles}
/>
<button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
  {uploading ? 'Uploading…' : 'Upload Images'}
</button>
```

### Unsigned vs Signed presets
- **Unsigned**: no API secret needed, upload directly from browser. Use for admin tools where you control who has access.
- **Signed**: requires server-side signature. Use for public-facing upload forms.

---

## 13. DeployButton — Vercel Webhook Trigger

### Why
When content changes in the admin (new images, text edits), the website Vercel deployment needs to rebuild to pick up the changes. A Deploy Button in the admin POSTs to a Vercel Deploy Hook URL, triggering a rebuild without touching git.

### Implementation

```jsx
// admin/src/components/Layout.jsx
const DEPLOY_HOOK = import.meta.env.VITE_DEPLOY_HOOK

export function DeployButton() {
  const [status, setStatus] = useState('idle')  // idle | loading | done | error

  async function handleDeploy() {
    if (!DEPLOY_HOOK) return
    setStatus('loading')
    try {
      await fetch(DEPLOY_HOOK, { method: 'POST' })
      setStatus('done')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <button onClick={handleDeploy} disabled={status === 'loading'} className="btn-secondary">
      {status === 'idle'    && '↑ Deploy Site'}
      {status === 'loading' && 'Deploying…'}
      {status === 'done'    && '✓ Triggered'}
      {status === 'error'   && '✗ Failed'}
    </button>
  )
}
```

### Setup
1. Vercel Dashboard → your website project → Settings → Git → Deploy Hooks
2. Create hook named "Admin CMS"
3. Copy the URL
4. Set `VITE_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...` in admin Vercel env vars
5. **Never paste the hook URL in chat** — it's a secret. Regenerate if exposed.

---

## 14. JSON Export/Import — Backup & Restore

### Why
Hotel staff could accidentally delete content. JSON export creates a full snapshot of all database tables that can be restored in one click.

### Export — fetch all tables and trigger download

```js
async function exportAllData() {
  // Fetch all 9 tables in parallel
  const [settings, rooms, gallery, amenities, experiences, testimonials, pages, newsletter, messages] =
    await Promise.all([
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

  const backup = { exported_at: new Date().toISOString(), settings, rooms, gallery, ... }

  // Trigger browser download
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `hotel-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
```

### Import — read file and upsert all tables

```js
async function handleImport(e) {
  const file = e.target.files[0]
  if (!file) return
  const text = await file.text()
  const backup = JSON.parse(text)

  // upsert: insert if new, update if id already exists
  if (backup.rooms?.length) {
    await supabase.from('rooms').upsert(backup.rooms, { onConflict: 'id' })
  }
  if (backup.gallery?.length) {
    // Strip joined category object before upserting (it's not a column)
    const rows = backup.gallery.map(({ category, ...r }) => r)
    await supabase.from('gallery_images').upsert(rows, { onConflict: 'id' })
  }
  // ... repeat for each table
}
```

### Key concept: upsert with `onConflict: 'id'`
- If a row with that `id` exists → **update** it
- If no row with that `id` exists → **insert** it
- This means import is safe to run multiple times — idempotent

---

*This document grows as new patterns are built. Ask for a new section to be added at any time.*
