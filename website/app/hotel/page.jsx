import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('hotel')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'The Hotel',
      description: seo.seo_description || content?.hero_subtitle || 'About Seagonia Hotel — our story and sustainable Greek hospitality on the Ionian coast.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'The Hotel' } }
}

export { default } from '../../components/pages/HotelClient'
