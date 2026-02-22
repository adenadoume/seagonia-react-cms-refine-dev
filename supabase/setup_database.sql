-- ============================================
-- SEAGONIA HOTEL CMS - COMPLETE DATABASE SETUP
-- ============================================
-- This file combines all migrations and seed data
-- Run this in Supabase SQL Editor or via psql
-- ============================================

-- STEP 1: Create Schema (from 001_initial_schema.sql)
-- ============================================

-- Editable text content
CREATE TABLE IF NOT EXISTS texts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    label TEXT,
    page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Image uploads
CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    label TEXT,
    page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Section visibility and ordering
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    page TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotel settings and contact info
CREATE TABLE IF NOT EXISTS hotel_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Seagonia',
    tagline TEXT DEFAULT 'Your Corner by the Sea',
    description TEXT,
    village TEXT DEFAULT 'Pogonia',
    near_city TEXT DEFAULT 'Paleros',
    region TEXT DEFAULT 'Aitoloakarnania',
    country TEXT DEFAULT 'Greece',
    latitude DECIMAL(10, 8) DEFAULT 38.7833,
    longitude DECIMAL(11, 8) DEFAULT 20.8833,
    phone TEXT DEFAULT '+302643041736',
    email TEXT DEFAULT 'welcome@seagonia.com',
    address TEXT DEFAULT 'Pogonia, Paleros 300 12, Greece',
    instagram_url TEXT,
    facebook_url TEXT,
    total_rooms INTEGER DEFAULT 58,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room types
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_type TEXT NOT NULL CHECK (room_type IN ('A', 'B', 'C', 'D', 'E', 'F')),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    highlight TEXT,
    count INTEGER DEFAULT 1,
    floor TEXT,
    max_guests INTEGER DEFAULT 2,
    bed_options TEXT[],
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room-Amenity relationship
CREATE TABLE IF NOT EXISTS room_amenities (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (room_id, amenity_id)
);

-- Experiences
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    icon TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    name TEXT,
    country TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery categories
CREATE TABLE IF NOT EXISTS gallery_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery images
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    cloudinary_public_id TEXT,
    category_id UUID REFERENCES gallery_categories(id) ON DELETE SET NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page content
CREATE TABLE IF NOT EXISTS page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name TEXT UNIQUE NOT NULL,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image_url TEXT,
    section_1_title TEXT,
    section_1_text TEXT,
    section_1_image_url TEXT,
    section_2_title TEXT,
    section_2_text TEXT,
    section_2_image_url TEXT,
    section_3_title TEXT,
    section_3_text TEXT,
    section_3_image_url TEXT,
    extra_content JSONB,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    is_spam BOOLEAN DEFAULT false,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_texts_page ON texts(page);
CREATE INDEX IF NOT EXISTS idx_images_page ON images(page);
CREATE INDEX IF NOT EXISTS idx_sections_page ON sections(page);
CREATE INDEX IF NOT EXISTS idx_sections_sort_order ON sections(sort_order);
CREATE INDEX IF NOT EXISTS idx_rooms_published ON rooms(is_published);
CREATE INDEX IF NOT EXISTS idx_rooms_slug ON rooms(slug);
CREATE INDEX IF NOT EXISTS idx_amenities_published ON amenities(is_published);
CREATE INDEX IF NOT EXISTS idx_experiences_published ON experiences(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON gallery_images(is_published);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_texts_updated_at ON texts;
CREATE TRIGGER update_texts_updated_at BEFORE UPDATE ON texts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_images_updated_at ON images;
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hotel_settings_updated_at ON hotel_settings;
CREATE TRIGGER update_hotel_settings_updated_at BEFORE UPDATE ON hotel_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_rooms_updated_at ON rooms;
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_amenities_updated_at ON amenities;
CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_categories_updated_at ON gallery_categories;
CREATE TRIGGER update_gallery_categories_updated_at BEFORE UPDATE ON gallery_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_images_updated_at ON gallery_images;
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON newsletter_subscribers;
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- STEP 2: Row Level Security (from 002_row_level_security.sql)
-- ============================================

ALTER TABLE texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS texts_public_read ON texts;
DROP POLICY IF EXISTS images_public_read ON images;
DROP POLICY IF EXISTS sections_public_read ON sections;
DROP POLICY IF EXISTS hotel_settings_public_read ON hotel_settings;
DROP POLICY IF EXISTS rooms_public_read ON rooms;
DROP POLICY IF EXISTS amenities_public_read ON amenities;
DROP POLICY IF EXISTS room_amenities_public_read ON room_amenities;
DROP POLICY IF EXISTS experiences_public_read ON experiences;
DROP POLICY IF EXISTS testimonials_public_read ON testimonials;
DROP POLICY IF EXISTS gallery_categories_public_read ON gallery_categories;
DROP POLICY IF EXISTS gallery_images_public_read ON gallery_images;
DROP POLICY IF EXISTS page_content_public_read ON page_content;
DROP POLICY IF EXISTS contact_public_insert ON contact_messages;
DROP POLICY IF EXISTS newsletter_public_insert ON newsletter_subscribers;
DROP POLICY IF EXISTS texts_staff_all ON texts;
DROP POLICY IF EXISTS images_staff_all ON images;
DROP POLICY IF EXISTS sections_staff_all ON sections;
DROP POLICY IF EXISTS hotel_settings_staff_all ON hotel_settings;
DROP POLICY IF EXISTS rooms_staff_all ON rooms;
DROP POLICY IF EXISTS amenities_staff_all ON amenities;
DROP POLICY IF EXISTS room_amenities_staff_all ON room_amenities;
DROP POLICY IF EXISTS experiences_staff_all ON experiences;
DROP POLICY IF EXISTS testimonials_staff_all ON testimonials;
DROP POLICY IF EXISTS gallery_categories_staff_all ON gallery_categories;
DROP POLICY IF EXISTS gallery_images_staff_all ON gallery_images;
DROP POLICY IF EXISTS page_content_staff_all ON page_content;
DROP POLICY IF EXISTS contact_messages_staff_all ON contact_messages;
DROP POLICY IF EXISTS newsletter_subscribers_staff_all ON newsletter_subscribers;

-- Public read policies
CREATE POLICY texts_public_read ON texts FOR SELECT USING (true);
CREATE POLICY images_public_read ON images FOR SELECT USING (true);
CREATE POLICY sections_public_read ON sections FOR SELECT USING (true);
CREATE POLICY hotel_settings_public_read ON hotel_settings FOR SELECT USING (is_published = true);
CREATE POLICY rooms_public_read ON rooms FOR SELECT USING (is_published = true);
CREATE POLICY amenities_public_read ON amenities FOR SELECT USING (is_published = true);
CREATE POLICY room_amenities_public_read ON room_amenities FOR SELECT USING (true);
CREATE POLICY experiences_public_read ON experiences FOR SELECT USING (is_published = true);
CREATE POLICY testimonials_public_read ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY gallery_categories_public_read ON gallery_categories FOR SELECT USING (true);
CREATE POLICY gallery_images_public_read ON gallery_images FOR SELECT USING (is_published = true);
CREATE POLICY page_content_public_read ON page_content FOR SELECT USING (is_published = true);
CREATE POLICY contact_public_insert ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY newsletter_public_insert ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Staff helper function
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Staff full access policies
CREATE POLICY texts_staff_all ON texts FOR ALL USING (is_staff());
CREATE POLICY images_staff_all ON images FOR ALL USING (is_staff());
CREATE POLICY sections_staff_all ON sections FOR ALL USING (is_staff());
CREATE POLICY hotel_settings_staff_all ON hotel_settings FOR ALL USING (is_staff());
CREATE POLICY rooms_staff_all ON rooms FOR ALL USING (is_staff());
CREATE POLICY amenities_staff_all ON amenities FOR ALL USING (is_staff());
CREATE POLICY room_amenities_staff_all ON room_amenities FOR ALL USING (is_staff());
CREATE POLICY experiences_staff_all ON experiences FOR ALL USING (is_staff());
CREATE POLICY testimonials_staff_all ON testimonials FOR ALL USING (is_staff());
CREATE POLICY gallery_categories_staff_all ON gallery_categories FOR ALL USING (is_staff());
CREATE POLICY gallery_images_staff_all ON gallery_images FOR ALL USING (is_staff());
CREATE POLICY page_content_staff_all ON page_content FOR ALL USING (is_staff());
CREATE POLICY contact_messages_staff_all ON contact_messages FOR ALL USING (is_staff());
CREATE POLICY newsletter_subscribers_staff_all ON newsletter_subscribers FOR ALL USING (is_staff());

-- Storage bucket setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('hotel-images', 'hotel-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS hotel_images_public_read ON storage.objects;
DROP POLICY IF EXISTS hotel_images_staff_insert ON storage.objects;
DROP POLICY IF EXISTS hotel_images_staff_update ON storage.objects;
DROP POLICY IF EXISTS hotel_images_staff_delete ON storage.objects;

CREATE POLICY hotel_images_public_read ON storage.objects FOR SELECT USING (bucket_id = 'hotel-images');
CREATE POLICY hotel_images_staff_insert ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');
CREATE POLICY hotel_images_staff_update ON storage.objects FOR UPDATE USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');
CREATE POLICY hotel_images_staff_delete ON storage.objects FOR DELETE USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

-- STEP 3: Seed Data (from seed_hotel_data.sql)
-- Note: This part continues in the next section...
