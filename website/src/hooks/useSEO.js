import { useEffect } from 'react'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const useSEO = ({ title, description, ogImage } = {}) => {
  useEffect(() => {
    const siteName = 'Seagonia Hotel'
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Your Retreat by the Sea`

    document.title = fullTitle

    setMeta('description', description)

    // Open Graph
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:site_name', siteName, 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')

    // Twitter card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    if (ogImage) setMeta('twitter:image', ogImage)
  }, [title, description, ogImage])
}

export default useSEO
