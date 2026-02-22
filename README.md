# Seagonia Hotel CMS - Refine.dev + Supabase

A production-ready hotel content management system combining **CMS capabilities** (editable texts, images, sections) with a **rich hotel data model** (rooms, amenities, experiences, testimonials).

## 🏗️ Architecture

```
├── admin/          → Refine.dev admin panel (staff use)
├── website/        → Public hotel website (React + Vite)
├── supabase/       → Database schema + RLS policies
└── docs/           → Documentation
```

**Stack:**
- **Frontend**: React 18 + Vite + TailwindCSS + Framer Motion
- **Admin**: Refine.dev (CRUD framework)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Images**: Cloudinary CDN
- **Deploy**: Vercel (frontend + admin) + Supabase Cloud

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Supabase account (free tier)
- Cloudinary account (free tier)

### 2. Setup Supabase Project

```bash
# Create new Supabase project at https://supabase.com
# Copy connection strings from Settings > API

# Run migrations
cd supabase
psql <SUPABASE_CONNECTION_STRING> < migrations/001_initial_schema.sql
psql <SUPABASE_CONNECTION_STRING> < migrations/002_row_level_security.sql
```

### 3. Seed Initial Data

```bash
# Import hotel data from constants
node supabase/seed/import_hotel_data.js
```

### 4. Setup Website

```bash
cd website
npm install

# Create .env file
cp .env.example .env

# Add Supabase credentials
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Run locally
npm run dev
```

### 5. Setup Admin Panel

```bash
cd admin
npm install

# Create .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Run admin
npm run dev
```

---

## 📊 Database Schema

### CMS Core Tables (from claude.md spec)

| Table | Purpose |
|-------|---------|
| `texts` | Editable page texts |
| `images` | Uploaded/managed images |
| `sections` | Show/hide/reorder page sections |

### Hotel-Specific Tables

| Table | Purpose |
|-------|---------|
| `hotel_settings` | Hotel info, contact, social |
| `rooms` | 6 room types (A-F) |
| `amenities` | 16 amenities with icons |
| `room_amenities` | Many-to-many room ↔ amenity |
| `experiences` | 6 activities (boat, spa, cooking, etc.) |
| `testimonials` | Guest quotes |
| `gallery_categories` | Image categories |
| `gallery_images` | 77+ hotel photos |
| `page_content` | Per-page hero/section texts |
| `contact_messages` | Form submissions |
| `newsletter_subscribers` | Email list |

---

## 🛡️ Security

**Row Level Security (RLS):**
- ✅ Public: READ published content
- ✅ Staff (authenticated): FULL access to all content
- ✅ Public: INSERT contact forms + newsletter
- ✅ Staff: Manage all CRUD operations

**Authentication:**
- Supabase Auth with email/password
- JWT tokens for API access
- Admin panel requires login

---

## 🎨 Admin Panel Features

Built with **Refine.dev** for rapid CRUD operations:

### Resources (CRUD interfaces)
- **Rooms** - Edit descriptions, images, amenities, pricing
- **Amenities** - Add/edit/delete hotel amenities
- **Experiences** - Manage activities
- **Testimonials** - Guest quotes
- **Gallery** - Upload/organize/categorize images
- **Page Content** - Edit hero texts, sections
- **Texts** - Inline text editing
- **Sections** - Toggle visibility, reorder
- **Contact Messages** - View/respond to inquiries
- **Newsletter** - Manage subscribers

### Features
- ✅ Image upload to Cloudinary with preview
- ✅ Drag-and-drop section reordering
- ✅ Show/hide sections toggle
- ✅ Rich text editor for descriptions
- ✅ Real-time preview
- ✅ Multi-language support (future)

---

## 🌐 Website Features

### Pages
1. **Home** - Hero, intro, location, rooms preview, experiences, dining, testimonials
2. **Area** - Pogonia, Paleros, Little Ionian islands
3. **Hotel** - About, facilities, pool
4. **Rooms** - 6 room types with details
5. **Room Detail** - Individual room pages
6. **Dining** - Restaurants, cooking classes, farm-to-table
7. **Experiences** - Activities (spa, fitness, boat trips, hiking)
8. **Gallery** - Filterable photo gallery
9. **Contact** - Form + map

### Animations
- Framer Motion scroll animations
- Parallax images
- Staggered grid reveals
- Counter animations
- Page transitions

---

## 📂 Folder Structure

```
seagonia-react-cms-refine-dev/
├── admin/
│   ├── src/
│   │   ├── App.tsx              (Refine config)
│   │   ├── providers/
│   │   │   ├── authProvider.ts  (Supabase auth)
│   │   │   └── dataProvider.ts  (Supabase data)
│   │   ├── pages/
│   │   │   ├── rooms/           (Room CRUD)
│   │   │   ├── gallery/         (Image upload)
│   │   │   └── ...
│   │   └── components/
│   ├── package.json
│   └── .env.example
├── website/
│   ├── src/
│   │   ├── pages/               (9 pages)
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── supabase.js      (Supabase client)
│   │   └── hooks/
│   │       └── useSupabase.js   (React Query hooks)
│   ├── public/
│   ├── package.json
│   └── .env.example
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_row_level_security.sql
│   └── seed/
│       ├── import_hotel_data.js
│       └── sample_data.sql
├── docs/
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── API.md
└── README.md
```

---

## 🚢 Deployment

### Website (Vercel)
```bash
cd website
vercel --prod
```

### Admin Panel (Vercel)
```bash
cd admin
vercel --prod
```

### Database (Supabase)
- Already hosted on Supabase Cloud
- Free tier: 500MB database, 1GB file storage, 50GB bandwidth

### Images (Cloudinary)
- Free tier: 25GB storage, 25GB bandwidth
- Auto-optimization + CDN

---

## 🔑 Environment Variables

### Website (.env)
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_CLOUDINARY_CLOUD_NAME=your-cloud
VITE_HOTEL_PHONE=+302643041736
VITE_HOTEL_EMAIL=welcome@seagonia.com
VITE_HOTEL_ADDRESS=Pogonia, Paleros 300 12, Greece
```

### Admin (.env)
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_CLOUDINARY_CLOUD_NAME=your-cloud
VITE_CLOUDINARY_API_KEY=...
VITE_CLOUDINARY_API_SECRET=...
```

---

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed setup instructions
- **[Deployment](docs/DEPLOYMENT.md)** - Production deployment guide
- **[API Reference](docs/API.md)** - Supabase API endpoints
- **[Database Schema](supabase/migrations/)** - SQL schema files

---

## 🧪 Testing

```bash
# Website
cd website
npm run test

# Admin
cd admin
npm run test

# E2E
npm run test:e2e
```

---

## 🤝 Contributing

This is a portfolio project. See [CLAUDE.md](../claude.md) for the overall architecture strategy.

---

## 📝 License

MIT

---

## 🔗 Links

- **Live Website**: https://seagonia.vercel.app
- **Admin Panel**: https://admin-seagonia.vercel.app
- **GitHub**: https://github.com/adenadoume/seagonia-react-cms-refine-dev
- **Original Site**: https://github.com/adenadoume/seagonia

---

**Built with:**
React • Vite • Tailwind • Framer Motion • Refine.dev • Supabase • Cloudinary • Vercel
