// Seagonia Hotel Constants
// Name: Seagonia (Sea + Gonia = Sea Corner)
// Location: Pogonia village, near Paleros, Aitoloakarnania, Ionian Sea, Greece

export const HOTEL = {
  name: 'Seagonia',
  tagline: 'Your Corner by the Sea',
  location: {
    village: 'Pogonia',
    nearCity: 'Paleros',
    region: 'Aitoloakarnania',
    sea: 'Ionian Sea',
    country: 'Greece',
    coords: {
      lat: 38.7833,
      lng: 20.8833,
    },
  },
  contact: {
    phone: import.meta.env.VITE_HOTEL_PHONE,
    email: import.meta.env.VITE_HOTEL_EMAIL,
    address: import.meta.env.VITE_HOTEL_ADDRESS,
  },
  social: {
    instagram: 'https://www.instagram.com/seagoniahotel',
    facebook: 'https://www.facebook.com/seagoniahotel',
  },
  totalRooms: 58,
}

export const ROOMS = [
  {
    id: 'garden-room',
    type: 'A',
    name: 'Garden Room',
    slug: 'garden-room',
    count: 16,
    floor: 'Ground Floor',
    maxGuests: 2,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Private Garden',
    description:
      'Nestled on the ground floor, these serene rooms open directly onto a lush private garden. Wake to birdsong and step outside into your own green sanctuary. Perfect for those who love a connection with nature.',
    amenities: [
      'Private Garden',
      'Outdoor Sitting Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
    ],
    image: 'roomGarden',
  },
  {
    id: 'swim-up-room',
    type: 'B',
    name: 'Swim-Up Room',
    slug: 'swim-up-room',
    count: 12,
    floor: 'Ground Floor',
    maxGuests: 2,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Private Pool Access',
    description:
      'Step from your room directly into the pool. These exclusive ground-floor rooms offer unrivalled access to the water, blending indoor comfort with an outdoor aquatic lifestyle. Ideal for those who want to make every moment count.',
    amenities: [
      'Direct Pool Access',
      'Outdoor Sitting Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
    ],
    image: 'roomSwimUp',
  },
  {
    id: 'accessible-room',
    type: 'C',
    name: 'Accessible Garden Room',
    slug: 'accessible-room',
    count: 3,
    floor: 'Ground Floor',
    maxGuests: 2,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Fully Accessible with Garden',
    description:
      'Thoughtfully designed for all guests, these ground-floor rooms combine full accessibility with the tranquillity of a private garden. Every detail has been considered to ensure comfort and ease without compromise.',
    amenities: [
      'Private Garden',
      'Fully Accessible Design',
      'Outdoor Sitting Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
    ],
    image: 'roomGarden',
  },
  {
    id: 'balcony-room',
    type: 'D',
    name: 'Balcony Room',
    slug: 'balcony-room',
    count: 23,
    floor: '1st Floor',
    maxGuests: 2,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Sea & Mountain Views',
    description:
      'Elevated on the first floor with a private balcony, these rooms invite you to soak in panoramic views of the Ionian Sea and surrounding mountains. Sip your morning coffee as the sun rises over the water — a vista you will never tire of.',
    amenities: [
      'Private Balcony',
      'Sea & Mountain Views',
      'Outdoor Sitting Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
    ],
    image: 'roomBalcony',
  },
  {
    id: 'terrace-suite',
    type: 'E',
    name: 'Terrace Suite',
    slug: 'terrace-suite',
    count: 3,
    floor: '1st Floor',
    maxGuests: 2,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Spacious Private Terrace',
    description:
      'Generous in space and spirit, these first-floor suites feature expansive private terraces — an outdoor living room in the sky. Enjoy al fresco dining, evening cocktails, or simply stargazing above the Ionian coast.',
    amenities: [
      'Spacious Private Terrace',
      'Outdoor Sitting & Dining Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
    ],
    image: 'roomTerrace',
  },
  {
    id: 'seagonia-suite',
    type: 'F',
    name: 'Seagonia Suite',
    slug: 'seagonia-suite',
    count: 1,
    floor: '1st Floor',
    maxGuests: 4,
    bedOptions: ['King Bed', 'Twin Beds'],
    highlight: 'Premium Two-Room Suite',
    description:
      'The pinnacle of Seagonia hospitality. This singular premium suite spans two rooms on the first floor, offering the ultimate in space, privacy and luxury for up to four guests. Every indulgence has been curated for those who expect nothing less than the finest.',
    amenities: [
      'Two-Room Suite',
      'Private Terrace',
      'Panoramic Sea View',
      'Outdoor Sitting & Dining Area',
      'King Bed or Twin Beds',
      'A/C & Heating',
      '50" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Kettle',
      'Hair Dryer',
      'Iron & Ironing Board',
      'Safe',
      'Free WiFi',
      'Reading Lights',
      'Premium Amenities',
    ],
    image: 'roomSuite',
    featured: true,
  },
]

// Icon names correspond to lucide-react icon component names
export const AMENITIES = [
  {
    id: 'pool',
    name: 'Swimming Pool',
    icon: 'Waves',
    description: 'Central heated pool + 3 swim-up pools',
  },
  {
    id: 'beach',
    name: 'Beach Access',
    icon: 'Umbrella',
    description: 'Sandy beach just 80m away, 500m long',
  },
  {
    id: 'restaurant',
    name: 'Galià Restaurant',
    icon: 'UtensilsCrossed',
    description: 'Rooftop Mediterranean dining',
  },
  {
    id: 'lounge',
    name: 'Seagonia Lounge',
    icon: 'Coffee',
    description: 'Breakfast buffet & Mediterranean lunch',
  },
  {
    id: 'pool-bar',
    name: 'Pool Bar',
    icon: 'Wine',
    description: 'All-day drinks & snacks',
  },
  {
    id: 'gym',
    name: 'Technogym Fitness',
    icon: 'Dumbbell',
    description: 'Indoor gym + outdoor shaded fitness',
  },
  {
    id: 'massage',
    name: 'Outdoor Massage',
    icon: 'Heart',
    description: 'Covered massage space for two',
  },
  {
    id: 'yoga',
    name: 'Yoga & Pilates',
    icon: 'Flower2',
    description: 'Outdoor shaded area',
  },
  {
    id: 'swimming',
    name: 'Open Water Swimming',
    icon: 'Waves',
    description: '500m beach, calm Ionian waters',
  },
  {
    id: 'boat',
    name: 'Boat Excursions',
    icon: 'Ship',
    description: 'Ionian islands trips via Ionian Escape',
  },
  {
    id: 'cooking',
    name: 'Cooking Classes',
    icon: 'ChefHat',
    description: 'Farm-to-table hands-on classes',
  },
  {
    id: 'beekeeping',
    name: 'Beekeeping',
    icon: 'Bug',
    description: 'Honey harvesting experience',
  },
  {
    id: 'parking',
    name: 'Free Parking',
    icon: 'ParkingCircle',
    description: 'Private on-site parking',
  },
  {
    id: 'wifi',
    name: 'Free WiFi',
    icon: 'Wifi',
    description: 'High-speed throughout',
  },
  {
    id: 'farm',
    name: 'Farm to Table',
    icon: 'Leaf',
    description: 'Own farm supplying restaurants',
  },
  {
    id: 'spa',
    name: 'PURE Spa',
    icon: 'Sparkles',
    description: 'Nearby wellness center with 3 treatment rooms',
  },
]

export const EXPERIENCES = [
  {
    id: 'boat-trips',
    name: 'Boat Trips to Ionian Islands',
    description:
      'Sail the crystalline waters of the Ionian Sea and discover the legendary islands of Lefkada, Meganisi and beyond. Arrange your journey through our partner Ionian Escape.',
    image: 'boatTrip',
    icon: 'Ship',
  },
  {
    id: 'cooking-classes',
    name: 'Cooking Classes & Farm Experience',
    description:
      'Learn the secrets of Greek cuisine with hands-on cooking classes using ingredients harvested from our own farm. A farm-to-table experience unlike any other.',
    image: 'cooking',
    icon: 'ChefHat',
  },
  {
    id: 'hiking',
    name: 'Hiking & Ancient Paleros',
    description:
      'Explore the rugged trails around Pogonia and discover the ancient ruins of Paleros. History, nature and breathtaking views await at every turn.',
    image: 'hiking',
    icon: 'Map',
  },
  {
    id: 'open-water',
    name: 'Open Water Swimming',
    description:
      'The 500-metre sandy beach just 80 metres from the hotel offers calm, clear Ionian waters ideal for open water swimming at any level.',
    image: 'beach',
    icon: 'Waves',
  },
  {
    id: 'wellness',
    name: 'Wellness & Spa',
    description:
      'Restore body and mind with outdoor yoga and pilates sessions, covered massage treatments for two, or a visit to the nearby PURE Spa wellness centre.',
    image: 'spa',
    icon: 'Sparkles',
  },
  {
    id: 'gastronomy',
    name: 'Wine & Gastronomy',
    description:
      'Dine at the Galià rooftop restaurant and savour Mediterranean cuisine paired with fine Greek wines, all with sweeping views of the Ionian coast.',
    image: 'restaurant',
    icon: 'Wine',
  },
]

// Real images extracted from OIK105 SEAGONIA HOTEL PDF
const IMG = '/images/hotel'

export const HOTEL_IMAGES = {
  // Hero & Hotel Exterior
  hero: `${IMG}/img-000.jpg`,              // Pool facade with sunbeds — main hero
  heroAlt: `${IMG}/img-038.jpg`,           // Pool facade alternate angle
  entrance: `${IMG}/img-028.jpg`,          // Hotel entrance with SEAGONIA sign
  poolArea: `${IMG}/img-031.jpg`,          // Pool area multipurpose view with trailing plants
  poolDeck: `${IMG}/img-000.jpg`,          // Pool with deck and umbrellas

  // Aerial & Location
  palerosBay: `${IMG}/img-001.jpg`,        // Paleros Bay aerial with labels
  pogoniaCoast: `${IMG}/img-002.jpg`,      // Pogonia coast aerial with labels
  littleIonian: `${IMG}/img-003.jpg`,      // Little Ionian islands aerial
  pogoniaPanorama: `${IMG}/img-004.jpg`,   // Pogonia bay panoramic
  pogoniaVillage: `${IMG}/img-005.jpg`,    // Pogonia village from above
  pogoniaBeach: `${IMG}/img-006.jpg`,      // Pogonia beach with sunbeds
  tavernaView: `${IMG}/img-007.jpg`,       // Restaurant terrace/taverna
  palerosHarbor: `${IMG}/img-009.jpg`,     // Paleros harbor aerial
  palerosPromenade: `${IMG}/img-010.jpg`,  // Paleros taverna promenade
  palerosWineDining: `${IMG}/img-011.jpg`, // Women dining at harbor
  hotelInPogonia: `${IMG}/img-015.jpg`,    // Hotel in Pogonia from distance
  hotelAerialBeach: `${IMG}/img-016.jpg`,  // Aerial top-down of beach area
  hotelBirdseye: `${IMG}/img-017.jpg`,     // Top-down aerial of hotel building

  // Nearby Beaches
  vathiavali: `${IMG}/img-012.jpg`,        // Vathiavali beach aerial - turquoise
  varkoBay: `${IMG}/img-013.jpg`,          // Varko Bay aerial
  gerakas: `${IMG}/img-014.jpg`,           // Gerakas beach

  // Room Interiors & Renders
  roomBalcony: `${IMG}/img-028.jpg`,       // Type D room interior with balcony and mountain view
  roomSwimUp: `${IMG}/img-029.jpg`,        // Type B swim-up room with pool and daybed
  roomSwimUpExterior: `${IMG}/img-030.jpg`,// Swim-up pool corridor exterior
  roomGarden: `${IMG}/img-027.jpg`,        // Room exterior with garden patios
  roomExteriorBalconies: `${IMG}/img-031.jpg`, // Building exterior with balconies (page 17)
  roomSuite: `${IMG}/img-028.jpg`,         // Suite entrance render

  // F&B - Galià Rooftop
  galiaRooftop: `${IMG}/img-038.jpg`,      // Galià rooftop render (similar to hero)
  galiaView: `${IMG}/img-037.jpg`,         // View from Galià over bay

  // F&B - Seagonia Lounge
  loungeAerial: `${IMG}/img-017.jpg`,      // Lounge aerial view
  cheesePlatter: `${IMG}/img-042.jpg`,     // Cheese & bread platter
  shrimpPasta: `${IMG}/img-041.jpg`,       // Shrimp orzo pasta
  cocktail: `${IMG}/img-043.jpg`,          // Cocktail

  // F&B - Food
  foodPide: `${IMG}/img-039.jpg`,          // Pide/flatbread with prosciutto
  foodBurrata: `${IMG}/img-035.jpg`,       // Burrata tomato salad
  foodDolmades: `${IMG}/img-050.jpg`,      // Dolmades with yogurt
  foodSteak: `${IMG}/img-051.jpg`,         // Grilled steak

  // Farm to Table
  farmLettuce: `${IMG}/img-044.jpg`,       // Fresh lettuce in field
  farmFlowers: `${IMG}/img-046.jpg`,       // Zucchini flowers harvest
  farmField: `${IMG}/img-054.jpg`,         // Farm field panoramic
  farmTractor: `${IMG}/img-045.jpg`,       // Farm with tractor

  // Dining
  outdoorDining: `${IMG}/img-049.jpg`,     // Yacht Club outdoor dining table
  sunsetDining: `${IMG}/img-048.jpg`,      // Sunset harbor dining

  // Cooking Classes
  cookingClass: `${IMG}/img-055.jpg`,      // Woman making phyllo dough
  cookingResult: `${IMG}/img-059.jpg`,     // Baked pastry result

  // Beekeeping
  beekeeping: `${IMG}/img-060.jpg`,        // Beekeeper at hives with sea view
  honeycomb: `${IMG}/img-061.jpg`,         // Honeycomb closeup

  // Spa & Wellness
  massage: `${IMG}/img-036.jpg`,           // Massage therapy
  pureSpa: `${IMG}/img-062.jpg`,           // PURE Spa interior
  facialTreatment: `${IMG}/img-065.jpg`,   // Facial treatment

  // Fitness
  outdoorFitness: `${IMG}/img-071.jpg`,    // Outdoor shaded fitness pavilion
  yogaGroup: `${IMG}/img-034.jpg`,         // Yoga group session on deck
  gym: `${IMG}/img-072.jpg`,              // Indoor Technogym

  // Open Water Swimming
  openWaterSwim: `${IMG}/img-015.jpg`,     // Beach with swimming markers

  // Boat Trips & Islands
  islandBeach: `${IMG}/img-073.jpg`,       // Island cliff beach
  islandVillage: `${IMG}/img-074.jpg`,     // Island village/taverna
  islandCoast: `${IMG}/img-075.jpg`,       // Dramatic coast with yacht

  // Hiking
  hikingView: `${IMG}/img-076.jpg`,        // Hiking mountain panoramic view
  ancientRuins: `${IMG}/img-008.jpg`,      // Archaeological site

  // Floor Plans
  floorplanGround: `${IMG}/img-019.jpg`,   // Ground floor plan
  floorplan1st: `${IMG}/img-018.jpg`,      // 1st floor plan
}

// Legacy aliases for backward compatibility with existing components
export const PLACEHOLDER_IMAGES = {
  hero: HOTEL_IMAGES.hero,
  pool: HOTEL_IMAGES.poolDeck,
  seaView: HOTEL_IMAGES.pogoniaPanorama,
  roomGarden: HOTEL_IMAGES.roomGarden,
  roomSwimUp: HOTEL_IMAGES.roomSwimUp,
  roomBalcony: HOTEL_IMAGES.roomBalcony,
  roomTerrace: HOTEL_IMAGES.roomSwimUpExterior,
  roomSuite: HOTEL_IMAGES.roomSuite,
  restaurant: HOTEL_IMAGES.galiaRooftop,
  breakfast: HOTEL_IMAGES.cheesePlatter,
  ionian: HOTEL_IMAGES.littleIonian,
  beach: HOTEL_IMAGES.pogoniaBeach,
  yoga: HOTEL_IMAGES.yogaGroup,
  spa: HOTEL_IMAGES.pureSpa,
  cooking: HOTEL_IMAGES.cookingClass,
  fitness: HOTEL_IMAGES.gym,
  boatTrip: HOTEL_IMAGES.islandBeach,
  hiking: HOTEL_IMAGES.hikingView,
}
