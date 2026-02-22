# Seagonia CMS - Setup Instructions

## Quick Start Guide

Follow these steps to get your Seagonia Hotel CMS up and running:

---

## 1. Database Setup (Supabase)

### Option A: Using Supabase SQL Editor (Recommended - Easiest)

1. Go to your Supabase project: https://supabase.com/dashboard/project/pnjfxostbiscwihpatjk
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of each file in order:
   - First: `supabase/migrations/001_initial_schema.sql`
   - Second: `supabase/migrations/002_row_level_security.sql`
   - Third: `supabase/seed/seed_hotel_data.sql`
5. Click **Run** after pasting each file
6. You should see success messages for each

### Option B: Using Command Line (Advanced)

```bash
# Get your Supabase connection string from:
# Dashboard > Project Settings > Database > Connection string (URI)

cd supabase

# Run migrations
psql "your-connection-string-here" < migrations/001_initial_schema.sql
psql "your-connection-string-here" < migrations/002_row_level_security.sql

# Seed data
psql "your-connection-string-here" < seed/seed_hotel_data.sql
```

---

## 2. Create Admin User

You need to create a user account to access the admin panel:

1. Go to: https://supabase.com/dashboard/project/pnjfxostbiscwihpatjk/auth/users
2. Click **Add User** > **Create new user**
3. Enter email and password (you'll use this to login to admin panel)
4. Click **Create user**

**Save these credentials** - you'll need them to login!

---

## 3. Install Dependencies

### Website Dependencies

```bash
cd website
npm install
```

### Admin Panel Dependencies

```bash
cd ../admin
npm install
```

---

## 4. Run Locally

### Start the Website

```bash
cd website
npm run dev
```

Website will run at: http://localhost:5173

### Start the Admin Panel

```bash
cd admin
npm run dev
```

Admin panel will run at: http://localhost:5174

---

## 5. Login to Admin Panel

1. Open http://localhost:5174
2. Login with the email/password you created in step 2
3. You should see the Seagonia CMS dashboard with all resources

---

## 6. Verify Everything Works

### Check the Website:
- Open http://localhost:5173
- You should see the Seagonia homepage (currently using static data)
- All pages should load without errors

### Check the Admin Panel:
- Open http://localhost:5174 and login
- Click on **Rooms** - you should see 6 room types
- Click on **Amenities** - you should see 16 amenities
- Click on **Experiences** - you should see 6 experiences
- Click on **Testimonials** - you should see 3 testimonials

---

## 7. Environment Variables

Already configured in `.env` files:

### Website (website/.env)
- ✅ Supabase URL: `https://pnjfxostbiscwihpatjk.supabase.co`
- ✅ Supabase Anon Key: (configured)
- ✅ Cloudinary: `dvgmbgqge`

### Admin (admin/.env)
- ✅ Supabase URL: `https://pnjfxostbiscwihpatjk.supabase.co`
- ✅ Supabase Anon Key: (configured)
- ✅ Cloudinary: `dvgmbgqge` with API key

---

## Troubleshooting

### "Error: Missing Supabase environment variables"
- Check that `.env` files exist in both `website/` and `admin/` folders
- Make sure the files are named exactly `.env` (not `.env.txt` or `.env.example`)

### "Authentication required" error in admin panel
- Make sure you created a user in Supabase Auth (Step 2)
- Check that you're using the correct email/password

### Tables not found
- Make sure you ran all 3 SQL files in order (Step 1)
- Check Supabase Table Editor to verify tables were created

### No data showing in admin panel
- Make sure you ran the seed script (seed_hotel_data.sql)
- Check Supabase Table Editor > `rooms` table - should have 6 rows

---

## Next Steps

Once everything is running:

1. **Test admin editing** - Edit a room name and see it update
2. **Update website to use Supabase API** - Currently the website uses static data from constants/hotel.js. We need to update it to fetch from Supabase
3. **Upload images to Cloudinary** - The 77 hotel images need to be migrated
4. **Deploy to Vercel** - Deploy both website and admin panel

---

## Quick Reference

### URLs
- **Supabase Dashboard**: https://supabase.com/dashboard/project/pnjfxostbiscwihpatjk
- **Local Website**: http://localhost:5173
- **Local Admin**: http://localhost:5174

### Credentials
- **Supabase URL**: `https://pnjfxostbiscwihpatjk.supabase.co`
- **Cloudinary Cloud**: `dvgmbgqge`
- **Admin Login**: (email/password you created)

---

Need help? Check the main [README.md](README.md) for full documentation.
