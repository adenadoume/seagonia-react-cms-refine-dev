import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('area')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'The Area',
      description: seo.seo_description || content?.hero_subtitle || 'Explore Pogonia village and the Ionian coast — Paleros, Lefkada and nearby islands.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'The Area' } }
}

export { default } from '../../components/pages/AreaClient'
