-- Seed Hotel Data from constants/hotel.js
-- Run this after migrations to populate initial data

-- ============================================
-- HOTEL SETTINGS
-- ============================================

INSERT INTO hotel_settings (
    id,
    name,
    tagline,
    description,
    village,
    near_city,
    region,
    country,
    latitude,
    longitude,
    phone,
    email,
    address,
    instagram_url,
    facebook_url,
    total_rooms
) VALUES (
    gen_random_uuid(),
    'Seagonia',
    'Your Corner by the Sea',
    'A boutique hotel nestled in the serene village of Pogonia, overlooking the crystal-clear waters of Paleros. A timeless retreat where the Ionian Sea meets Greek hospitality.',
    'Pogonia',
    'Paleros',
    'Aitoloakarnania',
    'Greece',
    38.7833,
    20.8833,
    '+302643041736',
    'welcome@seagonia.com',
    'Pogonia, Paleros 300 12, Greece',
    'https://www.instagram.com/seagoniahotel',
    'https://www.facebook.com/seagoniahotel',
    58
);

-- ============================================
-- GALLERY CATEGORIES
-- ============================================

INSERT INTO gallery_categories (id, name, slug, display_order) VALUES
(gen_random_uuid(), 'All', 'all', 0),
(gen_random_uuid(), 'Hotel', 'hotel', 1),
(gen_random_uuid(), 'Rooms', 'rooms', 2),
(gen_random_uuid(), 'Pool', 'pool', 3),
(gen_random_uuid(), 'Dining', 'dining', 4),
(gen_random_uuid(), 'Experiences', 'experiences', 5);

-- ============================================
-- AMENITIES (16 total)
-- ============================================

INSERT INTO amenities (id, name, icon, description, display_order) VALUES
(gen_random_uuid(), 'Pool', 'Waves', 'Heated outdoor pool with stunning sea views', 1),
(gen_random_uuid(), 'Beach', 'Umbrella', 'Private beach access just 80m away', 2),
(gen_random_uuid(), 'Restaurant', 'UtensilsCrossed', 'Galià rooftop restaurant with mediterranean cuisine', 3),
(gen_random_uuid(), 'Bar & Lounge', 'Wine', 'Seagonia Lounge with cocktails and light bites', 4),
(gen_random_uuid(), 'Free WiFi', 'Wifi', 'High-speed internet throughout the hotel', 5),
(gen_random_uuid(), 'Parking', 'ParkingCircle', 'Free on-site parking for guests', 6),
(gen_random_uuid(), 'Spa & Wellness', 'Sparkles', 'PURE Spa with massage and treatments', 7),
(gen_random_uuid(), 'Fitness', 'Dumbbell', 'Outdoor fitness area with Technogym equipment', 8),
(gen_random_uuid(), 'Yoga', 'HeartPulse', 'Outdoor yoga deck with sea views', 9),
(gen_random_uuid(), 'Swimming', 'Waves', 'Open water swimming at nearby beach', 10),
(gen_random_uuid(), 'Boat Trips', 'Ship', 'Island hopping tours to 7 Ionian islands', 11),
(gen_random_uuid(), 'Cooking Classes', 'ChefHat', 'Traditional Greek cooking at our farm', 12),
(gen_random_uuid(), 'Beekeeping', 'Leaf', 'Honey harvesting experience', 13),
(gen_random_uuid(), 'Hiking', 'Mountain', 'Trails through olive groves and ancient ruins', 14),
(gen_random_uuid(), 'Farm to Table', 'Sprout', 'Fresh produce from our organic farm', 15),
(gen_random_uuid(), 'Yacht Club', 'Anchor', 'Partnership with local Yacht Club restaurant', 16);

-- ============================================
-- ROOMS (6 types A-F)
-- ============================================

INSERT INTO rooms (id, room_type, name, slug, description, highlight, count, floor, max_guests, bed_options, image_url, is_featured, display_order) VALUES

-- Type A: Garden Room
(gen_random_uuid(), 'A', 'Garden Room', 'garden-room',
'Nestled on the ground floor, these serene rooms open directly onto a lush private garden. Wake to birdsong and step outside into your own green sanctuary. Perfect for those who love a connection with nature.',
'Private Garden', 16, 'Ground Floor', 2,
ARRAY['King Bed', 'Twin Beds'],
'/images/hotel/img-027.jpg', false, 1),

-- Type B: Swim-Up Room
(gen_random_uuid(), 'B', 'Swim-Up Room', 'swim-up-room',
'Step from your private terrace straight into the crystal-clear pool. These ground-floor rooms offer effortless pool access, blending indoor comfort with outdoor luxury. Your personal aquatic escape awaits.',
'Private Pool Access', 12, 'Ground Floor', 2,
ARRAY['King Bed', 'Twin Beds'],
'/images/hotel/img-030.jpg', true, 2),

-- Type C: Accessible Garden Room
(gen_random_uuid(), 'C', 'Accessible Garden Room', 'accessible-garden-room',
'Thoughtfully designed for accessibility, these ground-floor rooms combine comfort with full mobility support. Featuring a private garden terrace, they offer independence and serenity for all guests.',
'Fully Accessible with Garden', 3, 'Ground Floor', 2,
ARRAY['King Bed', 'Twin Beds'],
'/images/hotel/img-027.jpg', false, 3),

-- Type D: Balcony Room
(gen_random_uuid(), 'D', 'Balcony Room', 'balcony-room',
'Elevated on the first floor, these rooms open onto spacious balconies with sweeping views of the Ionian Sea and surrounding mountains. Watch the sunset over the bay from your private perch.',
'Sea & Mountain Views', 23, '1st Floor', 2,
ARRAY['King Bed', 'Twin Beds'],
'/images/hotel/img-029.jpg', true, 4),

-- Type E: Terrace Suite
(gen_random_uuid(), 'E', 'Terrace Suite', 'terrace-suite',
'Spread out in these generous first-floor suites featuring expansive private terraces. Ideal for families or those seeking extra space, these suites blend comfort with breathtaking panoramas.',
'Spacious Private Terrace', 3, '1st Floor', 2,
ARRAY['King Bed', 'Twin Beds'],
'/images/hotel/img-029.jpg', false, 5),

-- Type F: Seagonia Suite
(gen_random_uuid(), 'F', 'Seagonia Suite', 'seagonia-suite',
'The crown jewel of Seagonia. This premium two-room suite on the first floor accommodates up to four guests with style. Featuring a separate living area and a sweeping terrace, it''s your private sanctuary by the sea.',
'Premium Two-Room Suite', 1, '1st Floor', 4,
ARRAY['King Bed + Sofa Bed', 'Twin Beds + Sofa Bed'],
'/images/hotel/img-028.jpg', true, 6);

-- ============================================
-- EXPERIENCES (6 total)
-- ============================================

INSERT INTO experiences (id, name, description, image_url, icon, display_order) VALUES

(gen_random_uuid(), 'Boat Trips to Ionian Islands',
'Sail the crystalline waters of the Ionian Sea to seven stunning islands: Lefkada, Meganisi, Kalamos, Kastos, Ithaca, Kefalonia, and Skorpios. Discover hidden coves, turquoise lagoons, and charming seaside villages.',
'/images/hotel/img-073.jpg', 'Ship', 1),

(gen_random_uuid(), 'Cooking Classes',
'At our farm in Paleros, we offer hands-on cooking classes where you''ll learn to make traditional Greek dishes from scratch. Roll phyllo dough, craft dolmades, and master authentic recipes passed down through generations.',
'/images/hotel/img-055.jpg', 'ChefHat', 2),

(gen_random_uuid(), 'Outdoor Massage & PURE Spa',
'At Seagonia, relaxation is a key part of your stay. Unwind with outdoor massages overlooking the sea, or retreat to our PURE Spa for rejuvenating treatments in a tranquil setting.',
'/images/hotel/img-062.jpg', 'Sparkles', 3),

(gen_random_uuid(), 'Fitness & Yoga',
'We offer a peaceful outdoor shaded area equipped with Technogym machines and free weights. Start your day with yoga on our dedicated deck, surrounded by the sounds of nature and sea.',
'/images/hotel/img-071.jpg', 'Dumbbell', 4),

(gen_random_uuid(), 'Open Water Swimming',
'Just 80 meters from the hotel, a stunning 500-meter-long sandy beach awaits. Crystal-clear shallow waters make it ideal for swimming, paddling, and water sports. Bring your goggles and explore.',
'/images/hotel/img-013.jpg', 'Waves', 5),

(gen_random_uuid(), 'History & Hiking',
'Pogonia is a destination where you can fully embrace a perfect balance of sea and mountain. Hike through ancient olive groves, explore Byzantine ruins, and discover hidden trails with panoramic views.',
'/images/hotel/img-076.jpg', 'Mountain', 6);

-- ============================================
-- TESTIMONIALS (3 guest quotes)
-- ============================================

INSERT INTO testimonials (id, quote, name, country, display_order) VALUES

(gen_random_uuid(),
'Waking up to the sound of the Ionian Sea just steps from our room was pure magic. The swim-up room exceeded all our expectations.',
'Sophie & Laurent', 'France', 1),

(gen_random_uuid(),
'Paleros is one of Greece''s best-kept secrets, and Seagonia is the perfect base to explore it. The staff made us feel like family.',
'James W.', 'United Kingdom', 2),

(gen_random_uuid(),
'The farm-to-table breakfast, the boat trips to hidden islands, the sunsets from our balcony — everything was unforgettable. We will be back.',
'Anna & Markus', 'Germany', 3);

-- ============================================
-- PAGE CONTENT (9 pages)
-- ============================================

INSERT INTO page_content (id, page_name, hero_title, hero_subtitle, section_1_title, section_1_text) VALUES

(gen_random_uuid(), 'home',
'SEAGONIA',
'Your Corner by the Sea',
'Welcome to Seagonia',
'Seagonia Hotel is a peaceful retreat set in a serene natural environment, offering everything you need for a comfortable and rejuvenating stay. Designed with a focus on simplicity and harmony, the spaces are thoughtfully decorated using natural materials and soothing earthy tones.'),

(gen_random_uuid(), 'area',
'The Area',
'Pogonia, Paleros & The Little Ionian',
'Pogonia Village',
'Seagonia Hotel boasts a prime location in the serene village of Pogonia, perched on the edge of the stunning Paleros Bay. This peaceful corner of Greece offers the perfect blend of seaside tranquility and proximity to vibrant coastal towns.'),

(gen_random_uuid(), 'hotel',
'The Hotel',
'A Peaceful Retreat by the Sea',
'About Seagonia',
'Built with natural materials and decorated in soothing earthy tones, Seagonia Hotel is designed to be a peaceful retreat where simplicity meets comfort. Every detail is crafted to help you unwind and reconnect with nature.'),

(gen_random_uuid(), 'dining',
'Dining at Seagonia',
'Mediterranean Flavors & Farm-to-Table Freshness',
'Galià Rooftop Restaurant',
'Galià is our mediterranean restaurant set on the upper floor, offering breathtaking views over Paleros Bay. Enjoy fresh, locally-sourced ingredients transformed into elegant dishes that celebrate Greek and Mediterranean cuisine.'),

(gen_random_uuid(), 'experiences',
'Experiences',
'Activities, Wellness & Adventure',
'Discover Seagonia',
'From boat trips to hidden islands, to cooking classes at our organic farm, to outdoor yoga with sea views — Seagonia offers a rich tapestry of experiences designed to enrich your stay.');

-- ============================================
-- CMS TEXTS (Sample editable texts)
-- ============================================

INSERT INTO texts (id, key, value, label, page) VALUES
(gen_random_uuid(), 'home_hero_title', 'SEAGONIA', 'Home Hero Title', 'home'),
(gen_random_uuid(), 'home_hero_subtitle', 'Your Corner by the Sea', 'Home Hero Subtitle', 'home'),
(gen_random_uuid(), 'footer_tagline', 'A boutique hotel in Pogonia, Paleros', 'Footer Tagline', 'global');

-- ============================================
-- CMS SECTIONS (Sample section visibility)
-- ============================================

INSERT INTO sections (id, key, label, page, is_visible, sort_order) VALUES
(gen_random_uuid(), 'home_hero', 'Hero Section', 'home', true, 1),
(gen_random_uuid(), 'home_intro', 'Introduction', 'home', true, 2),
(gen_random_uuid(), 'home_location', 'Location Teaser', 'home', true, 3),
(gen_random_uuid(), 'home_rooms', 'Featured Rooms', 'home', true, 4),
(gen_random_uuid(), 'home_experiences', 'Experiences Grid', 'home', true, 5),
(gen_random_uuid(), 'home_dining', 'Dining Teaser', 'home', true, 6),
(gen_random_uuid(), 'home_testimonials', 'Testimonials', 'home', true, 7),
(gen_random_uuid(), 'home_cta', 'Contact CTA', 'home', true, 8);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE 'Seagonia hotel data seeded successfully!';
    RAISE NOTICE 'Created: hotel settings, 6 rooms, 16 amenities, 6 experiences, 3 testimonials, 5 page contents';
END $$;
