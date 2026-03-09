import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('amenities')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'Amenities & Experiences',
      description: seo.seo_description || content?.hero_subtitle || 'Discover the facilities at Seagonia Hotel — pool, spa, farm-to-table dining and water sports.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'Amenities & Experiences' } }
}

export { default } from '../../components/pages/AmenitiesClient'
