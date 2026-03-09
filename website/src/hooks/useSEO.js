import { useEffect } from 'react'

/**
 * useSEO - Sets document title and meta description for the current page.
 *
 * @param {Object} options
 * @param {string} options.title       - Page title. Appended with " | Seagonia Hotel".
 * @param {string} options.description - Meta description content.
 */
const useSEO = ({ title, description } = {}) => {
  useEffect(() => {
    const siteName = 'Seagonia Hotel'

    // Update document title
    if (title) {
      document.title = `${title} | ${siteName}`
    } else {
      document.title = `${siteName} — Your Corner by the Sea`
    }

    // Update or create meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }
  }, [title, description])
}

export default useSEO
