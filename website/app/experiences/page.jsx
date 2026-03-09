import { hotelAPI } from '../../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('experiences')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || content?.hero_title || 'Experiences',
      description: seo.seo_description || content?.hero_subtitle || 'Sailing, hiking, spa, yoga, cooking classes and more at Seagonia Hotel on the Ionian coast.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch { return { title: 'Experiences' } }
}

export { default } from '../../components/pages/ExperiencesClient'
