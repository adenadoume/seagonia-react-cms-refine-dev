import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('gallery')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'Gallery',
      description: seo.seo_description || content?.hero_subtitle || 'Browse photos of Seagonia Hotel — rooms, pool, dining, beach and experiences on the Ionian coast.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'Gallery' } }
}

export { default } from '../../components/pages/GalleryClient'
