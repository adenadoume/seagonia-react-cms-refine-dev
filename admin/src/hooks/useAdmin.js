import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

// ─── ROOMS ───────────────────────────────────────────────
export function useAdminRooms() {
  return useQuery({
    queryKey: ['admin', 'rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('rooms').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}

export function useCreateRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('rooms').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}

export function useDeleteRoom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('rooms').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'rooms'] }),
  })
}

// ─── AMENITIES ───────────────────────────────────────────
export function useAdminAmenities() {
  return useQuery({
    queryKey: ['admin', 'amenities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('amenities')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateAmenity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('amenities').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'amenities'] }),
  })
}

export function useCreateAmenity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('amenities').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'amenities'] }),
  })
}

export function useDeleteAmenity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('amenities').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'amenities'] }),
  })
}

// ─── EXPERIENCES ─────────────────────────────────────────
export function useAdminExperiences() {
  return useQuery({
    queryKey: ['admin', 'experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('experiences').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'experiences'] }),
  })
}

export function useCreateExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('experiences').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'experiences'] }),
  })
}

export function useDeleteExperience() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('experiences').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'experiences'] }),
  })
}

// ─── TESTIMONIALS ────────────────────────────────────────
export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('testimonials').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] }),
  })
}

export function useCreateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('testimonials').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] }),
  })
}

export function useDeleteTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] }),
  })
}

// ─── GALLERY ─────────────────────────────────────────────
export function useAdminGallery() {
  return useQuery({
    queryKey: ['admin', 'gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*, category:gallery_categories(name, slug)')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useAdminGalleryCategories() {
  return useQuery({
    queryKey: ['admin', 'gallery_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('display_order', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateGalleryImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('gallery_images').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'gallery'] }),
  })
}

export function useCreateGalleryImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (fields) => {
      const { error } = await supabase.from('gallery_images').insert([fields])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'gallery'] }),
  })
}

export function useDeleteGalleryImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'gallery'] }),
  })
}

// ─── PAGE CONTENT ────────────────────────────────────────
export function useAdminPageContent(pageName) {
  return useQuery({
    queryKey: ['admin', 'page_content', pageName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', pageName)
        .single()
      if (error && error.code !== 'PGRST116') throw error
      return data
    },
    enabled: !!pageName,
  })
}

export function useAdminAllPageContent() {
  return useQuery({
    queryKey: ['admin', 'page_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('id, page_name, hero_title, is_published')
        .order('page_name')
      if (error) throw error
      return data
    },
  })
}

export function useUpdatePageContent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('page_content').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'page_content'] })
    },
  })
}

// ─── HOTEL SETTINGS ──────────────────────────────────────
export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin', 'hotel_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotel_settings')
        .select('*')
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useUpdateSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { error } = await supabase.from('hotel_settings').update(fields).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'hotel_settings'] }),
  })
}

// ─── CONTACT MESSAGES ────────────────────────────────────
export function useAdminMessages() {
  return useQuery({
    queryKey: ['admin', 'contact_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useUpdateMessageStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'contact_messages'] }),
  })
}

// ─── NEWSLETTER ──────────────────────────────────────────
export function useAdminNewsletter() {
  return useQuery({
    queryKey: ['admin', 'newsletter'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

// ─── DASHBOARD STATS ─────────────────────────────────────
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [rooms, messages, testimonials, gallery] = await Promise.all([
        supabase.from('rooms').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      ])
      return {
        rooms: rooms.count ?? 0,
        newMessages: messages.count ?? 0,
        testimonials: testimonials.count ?? 0,
        gallery: gallery.count ?? 0,
      }
    },
  })
}
