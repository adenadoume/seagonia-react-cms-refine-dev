-- Row Level Security (RLS) Policies
-- Ensures staff can edit, public can only read

-- ============================================
-- ENABLE RLS ON ALL TABLES
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

-- ============================================
-- PUBLIC READ ACCESS (for website)
-- ============================================

-- CMS tables - public can read
CREATE POLICY "texts_public_read" ON texts FOR SELECT USING (true);
CREATE POLICY "images_public_read" ON images FOR SELECT USING (true);
CREATE POLICY "sections_public_read" ON sections FOR SELECT USING (true);

-- Hotel tables - public can read published items only
CREATE POLICY "hotel_settings_public_read" ON hotel_settings FOR SELECT USING (is_published = true);
CREATE POLICY "rooms_public_read" ON rooms FOR SELECT USING (is_published = true);
CREATE POLICY "amenities_public_read" ON amenities FOR SELECT USING (is_published = true);
CREATE POLICY "room_amenities_public_read" ON room_amenities FOR SELECT USING (true);
CREATE POLICY "experiences_public_read" ON experiences FOR SELECT USING (is_published = true);
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "gallery_categories_public_read" ON gallery_categories FOR SELECT USING (true);
CREATE POLICY "gallery_images_public_read" ON gallery_images FOR SELECT USING (is_published = true);
CREATE POLICY "page_content_public_read" ON page_content FOR SELECT USING (is_published = true);

-- Contact/newsletter - public can insert (submit forms)
CREATE POLICY "contact_public_insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ============================================
-- STAFF FULL ACCESS (for admin panel)
-- ============================================

-- Helper function: Check if user is authenticated staff
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user is authenticated
    RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CMS tables - staff can do everything
CREATE POLICY "texts_staff_all" ON texts FOR ALL USING (is_staff());
CREATE POLICY "images_staff_all" ON images FOR ALL USING (is_staff());
CREATE POLICY "sections_staff_all" ON sections FOR ALL USING (is_staff());

-- Hotel tables - staff can do everything
CREATE POLICY "hotel_settings_staff_all" ON hotel_settings FOR ALL USING (is_staff());
CREATE POLICY "rooms_staff_all" ON rooms FOR ALL USING (is_staff());
CREATE POLICY "amenities_staff_all" ON amenities FOR ALL USING (is_staff());
CREATE POLICY "room_amenities_staff_all" ON room_amenities FOR ALL USING (is_staff());
CREATE POLICY "experiences_staff_all" ON experiences FOR ALL USING (is_staff());
CREATE POLICY "testimonials_staff_all" ON testimonials FOR ALL USING (is_staff());
CREATE POLICY "gallery_categories_staff_all" ON gallery_categories FOR ALL USING (is_staff());
CREATE POLICY "gallery_images_staff_all" ON gallery_images FOR ALL USING (is_staff());
CREATE POLICY "page_content_staff_all" ON page_content FOR ALL USING (is_staff());
CREATE POLICY "contact_messages_staff_all" ON contact_messages FOR ALL USING (is_staff());
CREATE POLICY "newsletter_subscribers_staff_all" ON newsletter_subscribers FOR ALL USING (is_staff());

-- ============================================
-- STORAGE BUCKET FOR IMAGES
-- ============================================

-- Create storage bucket for uploaded images
INSERT INTO storage.buckets (id, name, public)
VALUES ('hotel-images', 'hotel-images', true)
ON CONFLICT DO NOTHING;

-- Public can read images from storage
CREATE POLICY "hotel_images_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'hotel-images');

-- Staff can upload/update/delete images
CREATE POLICY "hotel_images_staff_insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

CREATE POLICY "hotel_images_staff_update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

CREATE POLICY "hotel_images_staff_delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');
