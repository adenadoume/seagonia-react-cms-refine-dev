import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('rooms')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'Our Rooms',
      description: seo.seo_description || content?.hero_subtitle || 'Explore 58 rooms across 6 unique types at Seagonia Hotel on the Ionian coast of Greece.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'Our Rooms' } }
}

export { default } from '../../components/pages/RoomsClient'
