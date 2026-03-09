import { hotelAPI } from '../lib/supabase'

export async function generateMetadata() {
  try {
    const content = await hotelAPI.getPageContent('home')
    const seo = content?.extra_content || {}
    return {
      title: seo.seo_title || 'Boutique Hotel in Paleros, Greece',
      description: seo.seo_description || 'Seagonia Hotel — 58 rooms overlooking the Ionian Sea in Pogonia village, near Paleros, Greece.',
      ...(seo.seo_og_image && { openGraph: { images: [{ url: seo.seo_og_image }] } }),
    }
  } catch {
    return { title: 'Boutique Hotel in Paleros, Greece', description: 'Seagonia Hotel on the Ionian coast of Greece.' }
  }
}

export { default } from '../components/pages/HomeClient'
