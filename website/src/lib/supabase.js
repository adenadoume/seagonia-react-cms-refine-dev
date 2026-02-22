import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false, // Website is public, no need for session persistence
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
})

// ============================================
// HOTEL DATA QUERIES
// ============================================

export const hotelAPI = {
  // Get hotel settings
  async getSettings() {
    const { data, error } = await supabase
      .from('hotel_settings')
      .select('*')
      .eq('is_published', true)
      .single()

    if (error) throw error
    return data
  },

  // Get all rooms
  async getRooms() {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        room_amenities (
          amenity:amenities (*)
        )
      `)
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get single room by slug
  async getRoom(slug) {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        room_amenities (
          amenity:amenities (*)
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) throw error
    return data
  },

  // Get all amenities
  async getAmenities() {
    const { data, error } = await supabase
      .from('amenities')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get all experiences
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get all testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get gallery images
  async getGalleryImages(categorySlug = null) {
    let query = supabase
      .from('gallery_images')
      .select(`
        *,
        category:gallery_categories (name, slug),
        room:rooms (name, slug)
      `)
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (categorySlug && categorySlug !== 'all') {
      query = query.eq('gallery_categories.slug', categorySlug)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  // Get gallery categories
  async getGalleryCategories() {
    const { data, error } = await supabase
      .from('gallery_categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get page content
  async getPageContent(pageName) {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_name', pageName)
      .eq('is_published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null
      }
      throw error
    }
    return data
  },

  // Get editable text by key
  async getText(key) {
    const { data, error } = await supabase
      .from('texts')
      .select('value')
      .eq('key', key)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data?.value
  },

  // Get section visibility
  async getSections(page) {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('page', page)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Submit contact form
  async submitContactForm(formData) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'new',
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, is_active: true }])
      .select()
      .single()

    if (error) {
      // Handle duplicate email error gracefully
      if (error.code === '23505') {
        throw new Error('This email is already subscribed')
      }
      throw error
    }
    return data
  },
}

export default supabase
