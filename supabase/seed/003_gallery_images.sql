-- Gallery Images Seed — all 77 local hotel images
-- Run in Supabase SQL Editor after seed_hotel_data.sql
-- Categories: hotel, rooms, pool, dining, experiences

-- Clear existing gallery images (safe to re-run)
DELETE FROM gallery_images;

-- Insert all 77 images using category slugs via subquery
INSERT INTO gallery_images (id, image_url, title, category_id, display_order, is_published)
SELECT
  gen_random_uuid(),
  img.image_url,
  img.title,
  (SELECT id FROM gallery_categories WHERE slug = img.category_slug LIMIT 1),
  img.display_order,
  true
FROM (VALUES
  -- Hotel (exterior, lobby, common areas, grounds)
  ('/images/hotel/img-000.jpg', 'Seagonia Hotel',          'hotel', 1),
  ('/images/hotel/img-001.jpg', 'Hotel Exterior',          'hotel', 2),
  ('/images/hotel/img-002.jpg', 'Hotel Grounds',           'hotel', 3),
  ('/images/hotel/img-003.jpg', 'Garden Terrace',          'hotel', 4),
  ('/images/hotel/img-004.jpg', 'Hotel Entrance',          'hotel', 5),
  ('/images/hotel/img-005.jpg', 'Lobby',                   'hotel', 6),
  ('/images/hotel/img-006.jpg', 'Common Area',             'hotel', 7),
  ('/images/hotel/img-007.jpg', 'Hotel View',              'hotel', 8),
  ('/images/hotel/img-008.jpg', 'Sea View',                'hotel', 9),
  ('/images/hotel/img-009.jpg', 'Sunset View',             'hotel', 10),
  ('/images/hotel/img-010.jpg', 'Hotel Garden',            'hotel', 11),
  ('/images/hotel/img-011.jpg', 'Paleros Bay',             'hotel', 12),
  ('/images/hotel/img-012.jpg', 'Hotel Terrace',           'hotel', 13),
  ('/images/hotel/img-014.jpg', 'Seagonia Lounge',         'hotel', 14),
  ('/images/hotel/img-015.jpg', 'Hotel at Night',          'hotel', 15),
  ('/images/hotel/img-016.jpg', 'Ionian View',             'hotel', 16),

  -- Rooms (interiors, balconies, bathrooms)
  ('/images/hotel/img-017.jpg', 'Garden Room',             'rooms', 1),
  ('/images/hotel/img-018.jpg', 'Swim-Up Room',            'rooms', 2),
  ('/images/hotel/img-019.jpg', 'Balcony Room',            'rooms', 3),
  ('/images/hotel/img-020.jpg', 'Room Interior',           'rooms', 4),
  ('/images/hotel/img-021.jpg', 'Room Bathroom',           'rooms', 5),
  ('/images/hotel/img-022.jpg', 'Room Balcony',            'rooms', 6),
  ('/images/hotel/img-023.jpg', 'Terrace Suite',           'rooms', 7),
  ('/images/hotel/img-024.jpg', 'Seagonia Suite',          'rooms', 8),
  ('/images/hotel/img-025.jpg', 'Suite Living Area',       'rooms', 9),
  ('/images/hotel/img-026.jpg', 'Room Details',            'rooms', 10),
  ('/images/hotel/img-027.jpg', 'Garden Room View',        'rooms', 11),
  ('/images/hotel/img-028.jpg', 'Seagonia Suite View',     'rooms', 12),
  ('/images/hotel/img-029.jpg', 'Balcony Sea View',        'rooms', 13),
  ('/images/hotel/img-030.jpg', 'Swim-Up Terrace',         'rooms', 14),
  ('/images/hotel/img-031.jpg', 'Room Amenities',          'rooms', 15),

  -- Pool (pools, swim-up, water areas)
  ('/images/hotel/img-032.jpg', 'Main Pool',               'pool', 1),
  ('/images/hotel/img-033.jpg', 'Pool Area',               'pool', 2),
  ('/images/hotel/img-034.jpg', 'Pool View',               'pool', 3),
  ('/images/hotel/img-035.jpg', 'Pool Terrace',            'pool', 4),
  ('/images/hotel/img-036.jpg', 'Swim-Up Pool',            'pool', 5),
  ('/images/hotel/img-037.jpg', 'Pool Sunset',             'pool', 6),
  ('/images/hotel/img-038.jpg', 'Pool Lounge',             'pool', 7),
  ('/images/hotel/img-039.jpg', 'Pool at Night',           'pool', 8),
  ('/images/hotel/img-040.jpg', 'Beach Access',            'pool', 9),
  ('/images/hotel/img-041.jpg', 'Sandy Beach',             'pool', 10),
  ('/images/hotel/img-042.jpg', 'Sea Swimming',            'pool', 11),

  -- Dining (restaurant, food, bar)
  ('/images/hotel/img-043.jpg', 'Galià Restaurant',        'dining', 1),
  ('/images/hotel/img-044.jpg', 'Rooftop Dining',          'dining', 2),
  ('/images/hotel/img-045.jpg', 'Mediterranean Cuisine',   'dining', 3),
  ('/images/hotel/img-046.jpg', 'Fresh Breakfast',         'dining', 4),
  ('/images/hotel/img-047.jpg', 'Restaurant View',         'dining', 5),
  ('/images/hotel/img-048.jpg', 'Bar & Lounge',            'dining', 6),
  ('/images/hotel/img-049.jpg', 'Cocktails',               'dining', 7),
  ('/images/hotel/img-050.jpg', 'Farm to Table',           'dining', 8),
  ('/images/hotel/img-051.jpg', 'Greek Cuisine',           'dining', 9),
  ('/images/hotel/img-052.jpg', 'Dining Terrace',          'dining', 10),
  ('/images/hotel/img-053.jpg', 'Sunset Dinner',           'dining', 11),
  ('/images/hotel/img-054.jpg', 'Fresh Produce',           'dining', 12),
  ('/images/hotel/img-055.jpg', 'Cooking Class',           'dining', 13),

  -- Experiences (activities, spa, boat, hiking, yoga)
  ('/images/hotel/img-056.jpg', 'Boat Trip',               'experiences', 1),
  ('/images/hotel/img-057.jpg', 'Ionian Islands',          'experiences', 2),
  ('/images/hotel/img-058.jpg', 'Lefkada Island',          'experiences', 3),
  ('/images/hotel/img-059.jpg', 'Hidden Cove',             'experiences', 4),
  ('/images/hotel/img-060.jpg', 'Yoga Deck',               'experiences', 5),
  ('/images/hotel/img-061.jpg', 'Morning Yoga',            'experiences', 6),
  ('/images/hotel/img-062.jpg', 'Outdoor Massage',         'experiences', 7),
  ('/images/hotel/img-063.jpg', 'PURE Spa',                'experiences', 8),
  ('/images/hotel/img-064.jpg', 'Wellness',                'experiences', 9),
  ('/images/hotel/img-065.jpg', 'Fitness Area',            'experiences', 10),
  ('/images/hotel/img-066.jpg', 'Technogym',               'experiences', 11),
  ('/images/hotel/img-067.jpg', 'Hiking Trail',            'experiences', 12),
  ('/images/hotel/img-068.jpg', 'Olive Grove',             'experiences', 13),
  ('/images/hotel/img-069.jpg', 'Farm Visit',              'experiences', 14),
  ('/images/hotel/img-070.jpg', 'Beekeeping',              'experiences', 15),
  ('/images/hotel/img-071.jpg', 'Group Fitness',           'experiences', 16),
  ('/images/hotel/img-072.jpg', 'Water Sports',            'experiences', 17),
  ('/images/hotel/img-073.jpg', 'Island Hopping',          'experiences', 18),
  ('/images/hotel/img-074.jpg', 'Snorkeling',              'experiences', 19),
  ('/images/hotel/img-075.jpg', 'Sunset Sailing',          'experiences', 20),
  ('/images/hotel/img-076.jpg', 'Mountain View Hike',      'experiences', 21)

) AS img(image_url, title, category_slug, display_order);

DO $$
BEGIN
  RAISE NOTICE 'Gallery seeded: 77 images across 5 categories (hotel/rooms/pool/dining/experiences)';
END $$;
