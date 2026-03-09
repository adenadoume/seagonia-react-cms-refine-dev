'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { hotelAPI } from '../lib/supabase'

// ============================================
// QUERY HOOKS (for fetching data)
// ============================================

export const useHotelSettings = () => {
  return useQuery({
    queryKey: ['hotel-settings'],
    queryFn: hotelAPI.getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: hotelAPI.getRooms,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRoom = (slug) => {
  return useQuery({
    queryKey: ['room', slug],
    queryFn: () => hotelAPI.getRoom(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAmenities = () => {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: hotelAPI.getAmenities,
    staleTime: 5 * 60 * 1000,
  })
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: hotelAPI.getExperiences,
    staleTime: 5 * 60 * 1000,
  })
}

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: hotelAPI.getTestimonials,
    staleTime: 5 * 60 * 1000,
  })
}

export const useGalleryImages = (categorySlug = null) => {
  return useQuery({
    queryKey: ['gallery-images', categorySlug],
    queryFn: () => hotelAPI.getGalleryImages(categorySlug),
    staleTime: 5 * 60 * 1000,
  })
}

export const useGalleryCategories = () => {
  return useQuery({
    queryKey: ['gallery-categories'],
    queryFn: hotelAPI.getGalleryCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes (rarely changes)
  })
}

export const usePageContent = (pageName) => {
  return useQuery({
    queryKey: ['page-content', pageName],
    queryFn: () => hotelAPI.getPageContent(pageName),
    enabled: !!pageName,
    staleTime: 5 * 60 * 1000,
  })
}

export const useText = (key) => {
  return useQuery({
    queryKey: ['text', key],
    queryFn: () => hotelAPI.getText(key),
    enabled: !!key,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSections = (page) => {
  return useQuery({
    queryKey: ['sections', page],
    queryFn: () => hotelAPI.getSections(page),
    enabled: !!page,
    staleTime: 5 * 60 * 1000,
  })
}

// ============================================
// MUTATION HOOKS (for submitting data)
// ============================================

export const useContactForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: hotelAPI.submitContactForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] })
    },
  })
}

export const useNewsletterSubscribe = () => {
  return useMutation({
    mutationFn: hotelAPI.subscribeNewsletter,
  })
}
