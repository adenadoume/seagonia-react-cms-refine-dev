import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('dining')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'Dining',
      description: seo.seo_description || content?.hero_subtitle || 'Galia rooftop restaurant, farm-to-table cuisine and cooking classes on the Ionian coast.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'Dining' } }
}

export { default } from '../../components/pages/DiningClient'
