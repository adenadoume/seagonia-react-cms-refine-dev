-- Page Content Seed — uses upsert to avoid duplicate key errors
-- Run this in Supabase SQL Editor

INSERT INTO page_content (
    page_name,
    hero_title,
    hero_subtitle,
    hero_image_url,
    section_1_title,
    section_1_text,
    section_1_image_url,
    section_2_title,
    section_3_title,
    extra_content,
    is_published
) VALUES (
    'home',
    'SEAGONIA',
    'Your Corner by the Sea',
    '/images/hotel/img-000.jpg',
    'A Peaceful Retreat by the Ionian Sea',
    'Seagonia Hotel is a peaceful retreat set in a serene natural environment, offering everything you need for a comfortable and rejuvenating stay. Designed with a focus on simplicity and harmony, the spaces are thoughtfully decorated using natural materials and soothing earthy tones.',
    '/images/hotel/img-028.jpg',
    '58 Rooms by the Sea',
    'Discover the Ionian',
    '{
        "intro_eyebrow": "Welcome",
        "accommodation_eyebrow": "Accommodation",
        "experiences_eyebrow": "Experiences",
        "dining_eyebrow": "Dining",
        "dining_heading": "Galià Rooftop Restaurant",
        "dining_body": "Our Mediterranean restaurant set on the upper floor, open to sweeping views of the pool, Paleros bay, and the Acarnanian mountains.",
        "cta_heading": "Plan Your Stay",
        "cta_subheading": "We would love to hear from you"
    }',
    true
)
ON CONFLICT (page_name) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    hero_image_url = EXCLUDED.hero_image_url,
    section_1_title = EXCLUDED.section_1_title,
    section_1_text = EXCLUDED.section_1_text,
    section_1_image_url = EXCLUDED.section_1_image_url,
    section_2_title = EXCLUDED.section_2_title,
    section_3_title = EXCLUDED.section_3_title,
    extra_content = EXCLUDED.extra_content,
    is_published = EXCLUDED.is_published;

INSERT INTO page_content (page_name, hero_title, hero_subtitle, hero_image_url, is_published)
VALUES
    ('rooms',       'Our Rooms',                              '58 rooms across 6 unique types, each thoughtfully designed for comfort and tranquility by the Ionian Sea.', '/images/hotel/img-004.jpg', true),
    ('gallery',     'Gallery',                                'A glimpse into life at Seagonia Hotel.',                                                                    '/images/hotel/img-003.jpg', true),
    ('amenities',   'Hotel Amenities & Experiences',          'From pool to spa, farm to table, every comfort is within reach.',                                           '/images/hotel/img-000.jpg', true),
    ('experiences', 'Experiences',                            'Explore unique experiences at Seagonia Hotel on the Ionian coast of Greece.',                                '/images/hotel/img-035.jpg', true),
    ('dining',      'Dining at Seagonia',                     'From rooftop Mediterranean cuisine to poolside cocktails.',                                                  '/images/hotel/img-038.jpg', true),
    ('area',        'Pogonia, Paleros & The Little Ionian',   'Discover the beauty of our corner of Greece.',                                                              '/images/hotel/img-001.jpg', true),
    ('hotel',       'About Seagonia',                         'A boutique retreat on the Ionian coast.',                                                                   '/images/hotel/img-017.jpg', true)
ON CONFLICT (page_name) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    hero_image_url = EXCLUDED.hero_image_url,
    is_published = EXCLUDED.is_published;
